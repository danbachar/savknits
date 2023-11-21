import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { Stack, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, Grid, Card, CardActions, CardContent, CardMedia, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Project } from './entities/project.entity';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateProjectDialog from './components/create-project.dialog';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);


  useEffect(() => {
    fetch("http://localhost:3000/api/project", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
      }
    })
      .then(response => response.json())
      .then(data => setProjects(data));
  }, [isDialogOpen])

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  }

  const handleClick = () => {
    console.log("handling click");
    handleDialogOpen()
  };

  projects.push(new Project("", "hello world", "description", ["https://i.scdn.co/image/ab67616d0000b2730ef79e0bae0c61a52e68b238"], ["pattern"], "https://i.scdn.co/image/ab67616d0000b2730ef79e0bae0c61a52e68b238", "pattern"));

  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Grid container direction="row" justifyContent="center">
          <Typography gutterBottom variant="h5" component="div">
            My Collection
          </Typography>
        </Grid>
        <Grid container justifyContent="center" columnGap={6} rowSpacing={2} direction="row">
          {projects.map((project, index) => (
            <Grid item xs={5} md={4} lg={3} key={project.name + "" + index}>
              <Card sx={{ width: 200 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={project.mainPhoto}
                  title={project.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {
            <Grid item xs={5} md={4} lg={3} key="createNew">
              <Card sx={{ width: 200, height: 340 }}>
                <CardActions>
                  <IconButton onClick={handleClick}>
                    <AddCircleIcon style={{ fontSize: 200, color: 'gray' }} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          }
        </Grid>
      </Grid>
      <CreateProjectDialog isOpen={isDialogOpen} handleDialogClose={handleDialogClose} />
    </>
  );
}

export default App;
