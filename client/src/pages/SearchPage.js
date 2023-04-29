import { useEffect, useState } from 'react';
import AuthorCard from '../components/AuthorCard';
import { Button, Typography, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const config = require('../config.json');

export default function SearchPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [CookTime, setCookTime] = useState([0, 100]);
  const [PrepTime, setPrepTime] = useState([0, 960]);
  const [TotalTime, setTotalTime] = useState([0, 990]);
  const [SaturatedFatContent, setSaturatedFatContent] = useState([0, 841.9]);
  const [CholesterolContent, setCholesterolContent] = useState([0, 9167.2]);
  const [SodiumContent, setSodiumContent] = useState([0, 704129.6]);
  const [CarbohydrateContent, setCarbohydrateContent] = useState([0, 4320.9]);
  const [FiberContent, setFiberContent] = useState([0, 835.7]);
  const [SugarContent, setSugarContent] = useState([0, 3623.9]);
  const [ProteinContent, setProteinContent] = useState([0, 1802.9]);
  const [RecipeServings, setRecipeServings] = useState([0, 360]);
  const [RecipeYield, setRecipeYield] = useState([0, 100]);
  const [IngredientsCount, setIngredientsCount] = useState([0, 39]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const username = window.sessionStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/search`)
      .then(res => res.json())
      .then(resJson => {
        const recipesWithId = resJson.map((recipe) => ({ id: recipe.RecipeId, ...recipe }));
        setData(recipesWithId);
      });
  }, []);

  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/search?Name=${Name}` +
      `&Description=${Description}` +
      `&CookTime_low=${CookTime[0]}&CookTime_high=${CookTime[1]}` +
      `&PrepTime_low=${PrepTime[0]}&PrepTime_high=${PrepTime[1]}` +
      `&TotalTime_low=${TotalTime[0]}&TotalTime_high=${TotalTime[1]}` +
      `&SaturatedFatContent_low=${SaturatedFatContent[0]}&SaturatedFatContent_high=${SaturatedFatContent[1]}` +
      `&CholesterolContent_low=${CholesterolContent[0]}&CholesterolContent_high=${CholesterolContent[1]}` +
      `&SodiumContent_low=${SodiumContent[0]}&SodiumContent_high=${SodiumContent[1]}` +
      `&CarbohydrateContent_low=${CarbohydrateContent[0]}&CarbohydrateContent_high=${CarbohydrateContent[1]}` +
      `&FiberContent_low=${FiberContent[0]}&FiberContent_high=${FiberContent[1]}` +
      `&SugarContent_low=${SugarContent[0]}&SugarContent_high=${SugarContent[1]}` +
      `&ProteinContent_low=${ProteinContent[0]}&ProteinContent_high=${ProteinContent[1]}` +
      `&RecipeServings_low=${RecipeServings[0]}&RecipeServings_high=${RecipeServings[1]}` +
      `&RecipeYield_low=${RecipeYield[0]}&RecipeYield_high=${RecipeYield[1]}` +
      `&IngredientsCount_low=${IngredientsCount[0]}&IngredientsCount_high=${IngredientsCount[1]}` 
    )
      .then(res => res.json())
      .then(resJson => {
        const recipesWithId = resJson.map((recipe) => ({ id: recipe.RecipeId, ...recipe}));
        setData(recipesWithId);
      });
  }

  const addLike = async (recipeId) => {
    const username = window.sessionStorage.getItem("username");
    if (username != null) {
      try {
        const response = await fetch(`http://${config.server_host}:${config.server_port}/newlike`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, RecipeID: recipeId })
        });
        console.log(response);
        console.log(username);

        if (response && response.ok) {
          window.sessionStorage.setItem("username", username);
          const message = await response.text();
          setError(null);
          setMessage(message);
          setTimeout(() => setMessage(null), 3000);
          //navigate('/likes');
        } else {
          const error = await response.text();
          setMessage(null);
          setError(error);
          setTimeout(() => setError(null), 3000);
        }
      } catch (error) {
        console.log(error);
        setError('Failed to fetch');
      }

    }
  }

  const columns = [
    {
      field: 'like',
      headerName: 'Like',
      width: 100,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => addLike(params.row.RecipeId)}>Like</Button>
      ),
    },
    { field: 'Name', headerName: 'Name', width: 250, renderCell: (params) => (
        <NavLink to={`/recipe/${params.row.RecipeId}`}>{params.value}</NavLink>
    ) },
    { field: 'Description', headerName: 'Description', width: 400},
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
    { field: 'IngredientsCount', headerName: 'Ingredients Count' },
  ]

  return (
    <Container>
      {/* {selectedRecipeId && <AuthorCard authorId={selectedRecipeId} handleClose={() => setSelectedRecipeId(null)} />} */}
      <h2>Search Recipes</h2>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <TextField label='Name' value={Name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={10}>
          <TextField label='Description' value={Description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={2.4}>
          <p>Cook Time (in minutes)</p>
          <Slider
            value={CookTime}
            min={0}
            max={100}
            step={5}
            onChange={(e, newValue) => setCookTime(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Prep Time (in minutes) </p>
          <Slider
            value={PrepTime}
            min={0}
            max={960}
            step={5}
            onChange={(e, newValue) => setPrepTime(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Total Time (in minutes)</p>
          <Slider
            value={TotalTime}
            min={0}
            max={990}
            step={5}
            onChange={(e, newValue) => setTotalTime(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Saturated Fat Content</p>
          <Slider
            value={SaturatedFatContent}
            min={0}
            max={841.9}
            step={10}
            onChange={(e, newValue) => setSaturatedFatContent(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Carbohydrate Content</p>
          <Slider
            value={CarbohydrateContent}
            min={0}
            max={4320.9}
            step={100}
            onChange={(e, newValue) => setCarbohydrateContent(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Sugar Content</p>
          <Slider
            value={SugarContent}
            min={0}
            max={3623.9}
            step={100}
            onChange={(e, newValue) => setSugarContent(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Protein Content</p>
          <Slider
            value={ProteinContent}
            min={0}
            max={1802.9}
            step={50}
            onChange={(e, newValue) => setProteinContent(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Recipe Servings</p>
          <Slider
            value={RecipeServings}
            min={0}
            max={360}
            step={1}
            onChange={(e, newValue) => setRecipeServings(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Recipe Yield</p>
          <Slider
            value={RecipeYield}
            min={0}
            max={100}
            step={1}
            onChange={(e, newValue) => setRecipeYield(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={2.4}>
          <p>Ingredients Count</p>
          <Slider
            value={IngredientsCount}
            min={0}
            max={39}
            step={1}
            onChange={(e, newValue) => setIngredientsCount(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
      </Grid>
      <p></p>
      <Button variant="contained" color="primary" onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Find Recipes!
      </Button>
      <p></p>
      {error && (
          <Typography variant="body1" color="error" align="center" gutterBottom>
            {error}
          </Typography>
      )}
      {
        message && (
          <Typography variant="body1" color="green" align="center" gutterBottom>
            {message}
          </Typography>
      )}
      <p></p>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
      <p>Logged in as user: {username}</p>
    </Container>
  );
}