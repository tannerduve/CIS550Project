import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
import SongCard from '../components/SongCard';
const config = require('../config.json');

export default function HomePage() {
  const [recipeOfTheDay, setRecipeOfTheDay] = useState({});
  const [appAuthor, setAppAuthor] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/random`)
      .then(res => res.json())
      .then(resJson => setRecipeOfTheDay(resJson));

      fetch(`http://${config.server_host}:${config.server_port}/author/name`)
      .then(res => res.text())
      .then(resText => setAppAuthor(resText));
  }, []);

  const recipeColumns = [
   
  ];

};