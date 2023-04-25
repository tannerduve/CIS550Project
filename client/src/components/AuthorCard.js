import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Link, Modal, Divider } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { NavLink } from 'react-router-dom';
import LazyTable from '../components/LazyTable';

import { formatDuration } from '../helpers/formatter';
const config = require('../config.json');

// SongCard is a modal (a common example of a modal is a dialog window).
// Typically, modals will conditionally appear (specified by the Modal's open property)
// but in our implementation whether the Modal is open is handled by the parent component
// (see HomePage.js for example), since it depends on the state (selectedSongId) of the parent
export default function RecipeCard({ authorId, handleClose }) {
  const [recipeData, setRecipeData] = useState({});
  const [authorData, setAuthorData] = useState({});
  const [recipeDisplay, setRecipeDisplay] = useState(true);
  const [reviewDisplay, setReviewDisplay] = useState(false);


  // TODO (TASK 20): fetch the song specified in songId and based on the fetched album_id also fetch the album data
  // Hint: you need to both fill in the callback and the dependency array (what variable determines the information you need to fetch?)
  // Hint: since the second fetch depends on the information from the first, try nesting the second fetch within the then block of the first (pseudocode is provided)
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/author/${authorId}`)
      .then(res => res.json())
      .then(resJson => setAuthorData(resJson))
  }, [authorId]);

  const chartData = [
    { name: 'Danceability', value: recipeData.danceability },
    { name: 'Energy', value: recipeData.energy },
    { name: 'Valence', value: recipeData.valence },
  ];

  const handleDisplayChange = () => {
    setReviewDisplay(!recipeDisplay);
  };

  const recipeColumns = [
    {
      field: 'Name',
      headerName: 'Recipe Name',
      //renderCell: (row) => <Link onClick={() => setSelectedRecipeId(row.RecipeId)}>{row.Name}</Link> // A Link component is used just for formatting purposes
      renderCell: (row) => <NavLink to={`/recipe/${row.RecipeId}`}>{row.Name}</NavLink> // A NavLink component is used to create a link to the recipe page
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

  const reviewColumns = [
    {
      field: 'Name', headerName: 'Recipe Name', width: 200, 
      renderCell: (row) => <NavLink to={`/recipe/${row.RecipeId}`}>{row.Name}</NavLink>
    },
    {field: 'Review', headerName: 'Review', width: 800},
    {field: 'Rating', headerName: 'Rating', width: 150}
  ];

  return (
    <Modal
      open={true}
      onClose={handleClose}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        p={3}
        style={{ background: 'white', borderRadius: '16px', border: '2px solid #000', width: 600 }}
      >
        <h1>{authorData.AuthorName}</h1>
        <h2>Author Name: {authorData.AuthorName}</h2>
        <ButtonGroup>
          <Button disabled={recipeDisplay} onClick={handleDisplayChange}>Recipes</Button>
          <Button disabled={!recipeDisplay} onClick={handleDisplayChange}>Reviews</Button>
        </ButtonGroup>
        <div style={{ margin: 20 }}>
          { // This ternary statement returns a BarChart if barRadar is true, and a RadarChart otherwise
            recipeDisplay
              ? (
                <ResponsiveContainer height={250}>
                  <Divider />
                  <h2>All Author Recipes</h2>
                  {/*<LazyTable route={`http://${config.server_host}:${config.server_port}/author/?AuthorId=${authorData.AuthorId}`} columns={recipeColumns} /> */}
                  <Divider />
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer height={250}>
                  <Divider />
                  <h2>All Author Recipe Reviews</h2>
                  {/* <LazyTable route={`http://${config.server_host}:${config.server_port}/reviews?&AuthorName=${authorData.AuthorName}`} columns={reviewColumns} /> */}
                  <Divider />
                </ResponsiveContainer>
              )
          }
        </div>
        <Button onClick={handleClose} style={{ left: '50%', transform: 'translateX(-50%)' }} >
          Close
        </Button>
      </Box>
    </Modal>
  );
}