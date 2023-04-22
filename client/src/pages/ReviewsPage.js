import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
const config = require('../config.json');

export default function ReviewsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_authors`)
      .then(res => res.json())
      .then(resJson => {
        const recipesWithId = resJson.map((recipe) => ({ id: recipe.RecipeId, ...recipe }));
        setData(recipesWithId);
      });
  }, []);

  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/search?Name=${Name}` +
      `&Description=${Description}` 
    )
      .then(res => res.json())
      .then(resJson => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const recipesWithId = resJson.map((recipe) => ({ id: recipe.RecipeId, ...recipe}));
        setData(recipesWithId);
      });
  }

  const columns = [
    { field: 'Name', headerName: 'Name', width: 250, renderCell: (params) => (
        <Link onClick={() => setSelectedRecipeId(params.row.RecipeId)}>{params.value}</Link>
    ) },
    { field: 'Description', headerName: 'Description', width: 400}
  ]

  return (
    <Container>
      <h2>Search Reviews</h2>
        <Grid item xs={10}>
          <TextField label='Name' value={Name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={10}>
          <TextField label='Description' value={Description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
     </Container>
  );

}