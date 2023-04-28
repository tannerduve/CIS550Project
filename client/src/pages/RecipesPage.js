import { useEffect, useState } from 'react';
import AuthorCard from '../components/AuthorCard';
import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function RecipesPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [Name, setName] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState(null);
  const [Description, setDescription] = useState('');

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/recipes`)
      .then(res => res.json())
      .then(resJson => setSelectedRecipeId(resJson));
  }, []);

  const columns = [
    {field: 'Name',
      headerName: 'Recipe Name',
      renderCell: (row) => <NavLink to={`/recipe/${row.RecipeId}`}>{row.Name}</NavLink> // A NavLink component is used to create a link to the recipe page
    },
    {
      field: 'AuthorName',
      headerName: 'Author Name',
      renderCell: (row) => <Link onClick={() => [setSelectedAuthorId(row.AuthorId), setSelectedAuthorName(row.AuthorName)]} >{row.AuthorName}</Link> // A Link component is used just for formatting purposes
    },
    { field: 'Description', headerName: 'Description' },
    { field: 'CookTime', headerName: 'Cook Time' },
    { field: 'PrepTime', headerName: 'Prep Time' },
    { field: 'TotalTime', headerName: 'Total Time' },
    { field: 'SaturatedFatContent', headerName: 'Saturated Fat Content' },
    { field: 'CholesterolContent', headerName: 'Cholesterol Content' },
    { field: 'SodiumContent', headerName: 'Sodium Content' },
    { field: 'CarbohydrateContent', headerName: 'Carbohydrate Content' },
    { field: 'FiberContent', headerName: 'Fiber Content' },
    { field: 'SugarContent', headerName: 'Sugar Content' },
    { field: 'ProteinContent', headerName: 'Protein Content' },
    { field: 'RecipeServings', headerName: 'Recipe Servings' },
    { field: 'RecipeYield', headerName: 'Recipe Yield' },
    { field: 'RecipeInstructions', headerName: 'Recipe Instructions' },
    { field: 'RecipeCategory', headerName: 'Recipe Category' },
    { field: 'AverageRating', headerName: 'Average Rating' },
    { field: 'TotalLikes', headerName: 'Total User Likes' },
  ]

  return (
    <Container>
      <h2>Recipes</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/recipes`} columns={columns} />
    </Container>
  );
}