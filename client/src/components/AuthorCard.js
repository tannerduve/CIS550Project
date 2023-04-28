import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Link, Modal, Divider, Dialog, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { NavLink } from 'react-router-dom';
import LazyTable from '../components/LazyTable';

import { formatDuration } from '../helpers/formatter';
const config = require('../config.json');

// SongCard is a modal (a common example of a modal is a dialog window).
// Typically, modals will conditionally appear (specified by the Modal's open property)
// but in our implementation whether the Modal is open is handled by the parent component
// (see HomePage.js for example), since it depends on the state (selectedSongId) of the parent
export default function RecipeCard({ authorId, authorName, handleClose }) {
  const [recipeData, setRecipeData] = useState({});
  const [authorData, setAuthorData] = useState({});
  const [recipeDisplay, setRecipeDisplay] = useState(true);
  const [reviewDisplay, setReviewDisplay] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/author/${authorId}`)
      .then(res => res.json())
      .then(resJson => setAuthorData(resJson));
  }, [authorId, authorName]);

  //const chartData = [
    //{ name: 'Danceability', value: recipeData.danceability },
    //{ name: 'Energy', value: recipeData.energy },
    //{ name: 'Valence', value: recipeData.valence },
  //];

  const handleDisplayChange = () => {
    setRecipeDisplay(!recipeDisplay);
  };

  const recipeColumns = [
    {
      field: 'Name',
      headerName: 'Recipe Name',
      //renderCell: (row) => <NavLink to={`/recipe/${row.RecipeId}`}>{row.Name}</NavLink> 
    },
    {
      field: 'RecipeCategory',
      headerName: 'Recipe Category'
    }
  ];

  const reviewColumns = [
    {
      field: 'Name', headerName: 'Recipe Name'
      //renderCell: (row) => <NavLink to={`/recipe/${row.RecipeId}`}>{row.Name}</NavLink>
    },
    {field: 'Review', headerName: 'Review'},
    {field: 'Rating', headerName: 'Rating'}
  ];

  return (
    <Modal
      open={true}
      onClose={handleClose}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      //fullScreen={true}
    >
      <Box
        p={3}
        style={{ background: 'white', borderRadius: '16px', border: '2px solid #000', width: 1000 }}
      >
        <Typography
          component="div"
          sx={{ px: 4, mt: 2, maxHeight: "60vh", overflowY: "auto" }}
        >
          <h1>Author Name: {authorName}</h1>
          <ButtonGroup>
            <Button disabled={recipeDisplay} onClick={handleDisplayChange}>Recipes</Button>
            <Button disabled={!recipeDisplay} onClick={handleDisplayChange}>Reviews</Button>
          </ButtonGroup>
          <div style={{ margin: 20 }}>
          { 
              recipeDisplay
                ? (
                  [<h2>All recipes posted by this author:</h2>,
                  <LazyTable route={`http://${config.server_host}:${config.server_port}/author/${authorId}`} columns={recipeColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]}/>]
                ) : (
                  [<h2>All reviews posted about this author's recipes:</h2>,
                  <LazyTable route={`http://${config.server_host}:${config.server_port}/author_reviews/${authorId}`} columns={reviewColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]}/>]
                )
            }
          </div>
          <Button variant="contained" color="primary" onClick={handleClose} style={{ left: '50%', transform: 'translateX(-50%)' }} >
            Close
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}