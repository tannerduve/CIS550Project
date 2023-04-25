import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import LazyTable from '../components/LazyTable';
import { Container, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
const config = require('../config.json');

export default function LikesPage(props) {
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/users/${props.match.params.Username}/likes`)
      .then(res => res.json())
      .then(resJson => {
        const recipesWithId = resJson.map((recipe) => ({ id: recipe.RecipeId, ...recipe }));
        setData(recipesWithId);
      });
  }, [props.match.params.Username]);

  const columns = [
    {
      field: 'Name', headerName: 'Name', width: 300, renderCell: (params) => (
        <NavLink to={`/recipes/${params.row.RecipeId}`}>{params.value}</NavLink>
      )
    },
    { field: 'TotalTime', headerName: 'Total Time (minutes)', width: 200 },
    { field: 'Description', headerName: 'Description', width: 700 }
  ];

  return (
    <Container>
      {selectedRecipeId && <RecipeCard recipeId={selectedRecipeId} handleClose={() => setSelectedRecipeId(null)} />}
      <h2>Likes</h2>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
      <Divider />
    </Container>
  );
}
