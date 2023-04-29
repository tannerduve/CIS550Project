
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, ButtonGroup, Button, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import AuthorCard from '../components/AuthorCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function RecipeInfoPage() {
  const { RecipeId } = useParams();

  const [recipeData, setRecipeData] = useState([]); // default should actually just be [], but empty object element added to avoid error in template code
  const [reviewData, setReviewData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState(null);
  const [barRadar, setBarRadar] = useState(true);


  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/recipe/${RecipeId}`)
      .then(res => res.json())
      .then(resJson => setRecipeData(resJson));

    //fetch(`http://${config.server_host}:${config.server_port}/recipe_reviews/${RecipeId}`)
      //.then(res => res.json())
      //.then(resJson => setReviewData(resJson));
  }, [RecipeId]);

  const handleGraphChange = () => {
    setBarRadar(!barRadar);
  };

  const chartData = [
    { name: 'Saturated Fat', value: recipeData.SaturatedFatContent },
    { name: 'Carbs', value: recipeData.CarbohydrateContent },
    { name: 'Sugar', value: recipeData.SugarContent },
    { name: 'Protein', value: recipeData.ProteinContent },
    { name: 'Sodium', value: recipeData.SodiumContent },
    { name: 'Fiber', value: recipeData.FiberContent },
    { name: 'Cholesterol', value: recipeData.CholesterolContent },
  ];

  const flexFormat = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };

  return (
    <Container>
        {selectedAuthorId && <AuthorCard authorId={selectedAuthorId} authorName={selectedAuthorName} handleClose={() => [setSelectedAuthorId(null), setSelectedAuthorName(null)]} />}
        <h1 style={{ fontSize: 40 }}>{recipeData.Name}</h1>
        <h2>Author:&nbsp;
            <Link onClick={() => [setSelectedAuthorId(recipeData.AuthorId), setSelectedAuthorName(recipeData.AuthorName)]} >{recipeData.AuthorName}</Link>
        </h2>
        <h3>Released: {formatReleaseDate(recipeData.DatePublished)}</h3>
        <h3>Recipe Category: {recipeData.RecipeCategory}</h3>
        <h3>Nutritional Content: </h3>
        <p></p>
        <ButtonGroup>
            <Button disabled={barRadar} onClick={handleGraphChange}>Bar</Button>
            <Button disabled={!barRadar} onClick={handleGraphChange}>Radar</Button>
        </ButtonGroup>
        <div style={{ margin: 30 }}>
            { // This ternary statement returns a BarChart if barRadar is true, and a RadarChart otherwise
            barRadar
            ? (
                <ResponsiveContainer height={250}>
                    <BarChart
                        data={chartData}
                        layout='vertical'
                        margin={{ left: 40 }}
                    >
                        <XAxis type='number' domain={[0, 1]} />
                        <YAxis type='category' dataKey='name' />
                        <Bar dataKey='value' stroke='#8884d8' fill='#8884d8' />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <ResponsiveContainer height={250}>
                {/* TODO (TASK 21): display the same data as the bar chart using a radar chart */}
                {/* Hint: refer to documentation at https://recharts.org/en-US/api/RadarChart */}
                {/* Hint: note you can omit the <Legend /> element and only need one Radar element, as compared to the sample in the docs */}
                {/*<div>Replace Me</div>*/}
                    <RadarChart outerRadius={100} width={730} height={250} data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey='name' />
                        <PolarRadiusAxis angle={90} domain={[0, 1]} />
                        <Radar dataKey='value' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            )
            }
        </div>
        <p>Prep Time: {recipeData.PrepTime} minutes</p>
        <p>Cook Time: {recipeData.CookTime} minutes</p>
        <p>Total Time: {recipeData.TotalTime} minutes</p>
    </Container>
  );
}