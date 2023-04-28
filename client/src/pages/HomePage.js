import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
import AuthorCard from '../components/AuthorCard';
const config = require('../config.json');

export default function HomePage() {
  const [recipeOfTheDay, setRecipeOfTheDay] = useState({});
  const [appUser, setAppUser] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState(null);


  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/random`)
      .then(res => res.json())
      .then(resJson => setRecipeOfTheDay(resJson));

      fetch(`http://${config.server_host}:${config.server_port}/user`)
      .then(res => res.text())
      .then(resText => setAppUser(resText));
  }, []);

  // Here, we define the columns of the "Top Recipes" table. The recipeColumns variable is an array (in order)
  // of objects with each object representing a column. Each object has a "field" property representing
  // what data field to display from the raw data, "headerName" property representing the column label,
  // and an optional renderCell property which given a row returns a custom JSX element to display in the cell.
  const recipeColumns = [
    {
      field: 'Name',
      headerName: 'Recipe Name',
      //renderCell: (row) => <Link onClick={() => setSelectedRecipeId(row.RecipeId)}>{row.Name}</Link> // A Link component is used just for formatting purposes
      renderCell: (row) => <NavLink to={`/recipe/${row.RecipeId}`}>{row.Name}</NavLink> // A NavLink component is used to create a link to the recipe page
    },
    {
      field: 'AuthorName',
      headerName: 'Author Name',
      renderCell: (row) => <Link onClick={() => [setSelectedAuthorId(row.AuthorId), setSelectedAuthorName(row.AuthorName)]} >{row.AuthorName}</Link> // A Link component is used just for formatting purposes
    },
    {
      field: 'RecipeCategory',
      headerName: 'Recipe Category'
    },
    {
      field: 'AverageRating',
      headerName: 'Average Rating'
    },
    {
      field: 'TotalLikes',
      headerName: 'Total User Likes'
    },
  ];

  const username = window.sessionStorage.getItem("username");

  return (
    <Container>
      {/* SongCard is a custom component that we made. selectedSongId && <SongCard .../> makes use of short-circuit logic to only render the SongCard if a non-null song is selected */}
      {/* {selectedRecipeId && <RecipeCard recipeId={selectedRecipeId} handleClose={() => setSelectedRecipeId(null)} />} */}
      {selectedAuthorId && <AuthorCard authorId={selectedAuthorId} authorName={selectedAuthorName} handleClose={() => setSelectedAuthorId(null)} />}
      <h2>Check out this featured recipe:&nbsp;
        {/*<Link onClick={() => setSelectedRecipeId(recipeOfTheDay.RecipeId)}>{recipeOfTheDay.Name}</Link> */}
        <NavLink to={`/recipe/${recipeOfTheDay.RecipeId}`}>{recipeOfTheDay.Name}</NavLink>
      </h2>
      <Divider />
      <h2>Top Recipes</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/top_recipes`} columns={recipeColumns} />
      <p>Logged in as user: {username}</p>
    </Container>
  );
};