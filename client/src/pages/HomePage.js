import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
import RecipeCard from '../components/RecipeCard';
const config = require('../config.json');

export default function HomePage() {
  const [recipeOfTheDay, setRecipeOfTheDay] = useState({});
  const [appUser, setAppUser] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

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
      renderCell: (row) => <Link onClick={() => setSelectedRecipeId(row.RecipeId)}>{row.Name}</Link> // A Link component is used just for formatting purposes
      //renderCell: (row) => <NavLink to={`/recipe/${row.RecipeId}`}>{row.RecipeName}</NavLink> // A NavLink component is used to create a link to the recipe page
    },
    {
      field: 'AuthorName',
      headerName: 'Author Name',
      renderCell: (row) => <NavLink to={`/author/${row.AuthorId}`}>{row.AuthorName}</NavLink> // A NavLink component is used to create a link to the author page
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

  // TODO (TASK 15): define the columns for the top albums (schema is Album Title, Plays), where Album Title is a link to the album page
  // Hint: this should be very similar to songColumns defined above, but has 2 columns instead of 3
  const authorColumns = [
    {
      field: 'AuthorId',
      headerName: 'Author ID',
    },
    {
      field: 'AuthorName',
      headerName: 'Author Name'
    },
    {
      field: 'AverageRecipeRating',
      headerName: 'Average Recipe Rating'
    },
    {
      field: 'TotalRecipeLikes',
      headerName: 'Total Recipe Likes'
    },
  ];

  return (
    <Container>
      {/* SongCard is a custom component that we made. selectedSongId && <SongCard .../> makes use of short-circuit logic to only render the SongCard if a non-null song is selected */}
      {selectedRecipeId && <RecipeCard recipeId={selectedRecipeId} handleClose={() => setSelectedRecipeId(null)} />}
      <h2>Check out your recipe of the day:&nbsp;
        <Link onClick={() => setSelectedRecipeId(recipeOfTheDay.RecipeId)}>{recipeOfTheDay.Name}</Link>
      </h2>
      <Divider />
      <h2>Top Recipes</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/top_recipes`} columns={recipeColumns} />
      <Divider />
      <h2>Top Authors</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/top_authors`} columns={authorColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]} />
      <Divider />
      {/* TODO (TASK 16): add a h2 heading, LazyTable, and divider for top albums. Set the LazyTable's props for defaultPageSize to 5 and rowsPerPageOptions to [5, 10] */}
      {/* TODO (TASK 17): add a paragraph (<p>text</p>) that displays the value of your author state variable from TASK 13 */}
      <p>{appUser}</p>
    </Container>
  );
};