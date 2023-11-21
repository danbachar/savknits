import CssBaseline from '@mui/material/CssBaseline';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import ProjectOverview from './components/ProjectOverview';
import ProjectDetailView from './components/ProjectDetailView';

function App() {

  return (
    <CssBaseline>
      <Grid container direction="column" justifyContent="center">
        <Grid container direction="row" justifyContent="center">
          <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
            Sav Knits
          </Typography>
        </Grid>
        <Router>
          <Routes>
              <Route path="/" element={<ProjectOverview />} />
              <Route path="/project/:id" element={<ProjectDetailView />} />
            </Routes>
        </Router>
      </Grid>
    </CssBaseline>
  );
}

export default App;
