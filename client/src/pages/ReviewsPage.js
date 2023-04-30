import { useEffect, useState } from 'react';
import AuthorCard from '../components/AuthorCard';
import LazyTable from '../components/LazyTable';
import { Button, Divider, Container, Grid, Link, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
const config = require('../config.json');

export default function ReviewsPage() {
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState(null);
  const [RecipeName, setRecipeName] = useState('');
  const [AuthorName, setAuthorName] = useState('');
  const [Review, setReview] = useState('');
  const [Rating, setRating] = useState('');
  const [All, setAll] = useState(false);

  const username = window.sessionStorage.getItem("username");

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/reviews`)
      .then(res => res.json())
      .then(resJson => {
        const reviewsWithId = resJson.map((review) => ({ id: review.ReviewId, ...review}));
        setData(reviewsWithId)
      });
  }, []);

  const review = () => {
    fetch(`http://${config.server_host}:${config.server_port}/reviews?RecipeName=${RecipeName}` + 
    `&AuthorName=${AuthorName}&Review=${Review}&Rating=${Rating}&All=${All}`)
      .then(res => res.json())
      .then(resJson => {
        const reviewsWithId = resJson.map((review) => ({ id: review.ReviewId, ...review}));
        setData(reviewsWithId)
      });
  }

  const columns = [
    {
      field: 'Name', headerName: 'Recipe Name', width: 200, renderCell: (params) => (
      <NavLink to={`/recipe/${params.row.RecipeId}`}>{params.value}</NavLink>
      //<Link onClick={() => setSelectedRecipeId(params.row.RecipeId)}>{params.value}</Link>
    )},
    {
      field: 'AuthorName', headerName: 'Author Name', width: 150,
      renderCell: (params) => (<Link onClick={() => [setSelectedAuthorId(params.row.AuthorId), setSelectedAuthorName(params.row.AuthorName)]}>{params.value}</Link>)
    },
    {field: 'Review', headerName: 'Review', width: 700},
    {field: 'Rating', headerName: 'Rating', width: 150}
  ];

  const authorColumns = [
    {
      field: 'AuthorName', headerName: 'Author Name', 
      renderCell: (row) => <Link onClick={() => [setSelectedAuthorId(row.AuthorId), setSelectedAuthorName(row.AuthorName)]}>{row.AuthorName}</Link>
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
       {selectedAuthorId && <AuthorCard authorId={selectedAuthorId} authorName={selectedAuthorName} handleClose={() => [setSelectedAuthorId(null), setSelectedAuthorName(null)]} />}
        <h2>Reviews</h2>
        <Grid container spacing={2}>
  <Grid item xs={6}>
    <TextField label='Recipe Name' value={RecipeName} onChange={(e) => setRecipeName(e.target.value)} style={{ width: "100%" }}/>
  </Grid>
  <Grid item xs={6}>
    <TextField label='Author Name' value={AuthorName} onChange={(e) => setAuthorName(e.target.value)} style={{ width: "100%" }}/>
  </Grid>
  <Grid item xs={6}>
    <TextField label='Review Keyword(s)' value={Review} onChange={(e) => setReview(e.target.value)} style={{ width: "100%" }}/>
  </Grid>
  <Grid item xs={6}>
    <TextField label='Rating' value={Rating} onChange={(e) => setRating(e.target.value)} style={{ width: "100%" }}/>
  </Grid>
  <Grid item xs={12}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
    <Button variant="contained" color="primary" onClick={() => review()} style={{ display: 'flex', justifyContent: 'center' }}>
  Find Reviews!
</Button>
<Button variant="contained" color="primary" onClick={() => {setAll(true); review();}} style={{ display: 'flex', justifyContent: 'center' }}>
  Find Reviews ALL!
</Button>
    </div>
  </Grid>
</Grid>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
    <Divider />
      <h2>Top Authors</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/top_authors`} columns={authorColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]} />
    <Divider />
    <p>Logged in as user: {username}</p>
     </Container>
  );

}