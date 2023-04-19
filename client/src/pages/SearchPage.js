import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { formatDuration } from '../helpers/formatter';
const config = require('../config.json');

export default function SearchPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [CookTime, setCookTime] = useState([0, 11358720]);
  const [PrepTime, setPrepTime] = useState([0, 525600]);
  const [TotalTime, setTotalTime] = useState([0, 11394720]);
  const [SaturatedFatContent, setSaturatedFatContent] = useState([0, 841.9]);
  const [CholesterolContent, setCholesterolContent] = useState([0, 9167.2]);
  const [SodiumContent, setSodiumContent] = useState([0, 704129.6]);
  const [CarbohydrateContent, setCarbohydrateContent] = useState([0, 4320.9]);
  const [FiberContent, setFiberContent] = useState([0, 835.7]);
  const [SugarContent, setSugarContent] = useState([0, 3623.9]);
  const [ProteinContent, setProteinContent] = useState([0, 1802.9]);
  const [RecipeServings, setRecipeServings] = useState([0, 32767]);
  const [RecipeYield, setRecipeYield] = useState([0, 100]);
  const [IngredientsCount, setIngredientsCount] = useState([0, 39]);
}