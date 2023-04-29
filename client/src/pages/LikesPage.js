import { useEffect, useState } from 'react';
import AuthorCard from '../components/AuthorCard';
import LazyTable from '../components/LazyTable';
import { Container, Divider, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
const config = require('../config.json');

export default function LikesPage() {
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const username = window.sessionStorage.getItem("username");

  useEffect(() => {
   fetch(`http://${config.server_host}:${config.server_port}/likes?Username=${username}`)
      .then(res => res.json())
      .then(resJson => {
        const recipesWithId = resJson.map((recipe) => ({ id: recipe.RecipeId, ...recipe }));
        setData(recipesWithId);
      });
  }, [username]);

  const columns = [
    {
      field: 'Name', headerName: 'Recipe Name', width: 300, renderCell: (params) => (
        <NavLink to={`/recipes/${params.row.RecipeId}`}>{params.value}</NavLink>
      )
    },
    { field: 'TotalTime', headerName: 'Total Time (minutes)', width: 200 },
    { field: 'Description', headerName: 'Description', width: 700 }
  ];

  return (
    <Container>
      <h2>Likes</h2>
      <Divider />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
      <p>Logged in as user: {username}</p>
    </Container>
  );
}
