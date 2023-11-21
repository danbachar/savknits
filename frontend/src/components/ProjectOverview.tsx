import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { CreateProjectDialog } from "./create-project.dialog";
import { Link } from "react-router-dom";
import { Project } from "../entities/project.entity";

export default function ProjectOverview() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isStartNewProjectDialogOpen, setIsStartNewProjectDialogOpen] = useState<boolean>(false);

    const handleStartNewProjectClick = () => {
        handleStartNewProjectDialogOpen()
    };

    const handleStartNewProjectDialogOpen = () => {
        setIsStartNewProjectDialogOpen(true);
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/project", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
            }
        })
            .then(response => response.json())
            .then(data => setProjects(data));
    }, [isStartNewProjectDialogOpen])

    const handleStartNewProjectDialogClose = () => {
        setIsStartNewProjectDialogOpen(false);
    }



    return <Grid container justifyContent="center" columnGap={6} rowSpacing={2} direction="row">
        {projects.map((project, index) => { 
            const mainPhoto = project.photos.find(photo => !!photo.featured);

            if (!mainPhoto) {
                return <Grid item xs={12}><Typography gutterBottom variant="h5" component="span">No main picture per project name ${project.name}!</Typography></Grid>;
            }

            return (
            <Grid item xs={5} md={4} lg={3} key={project.name + "" + index}>
                <Card sx={{ width: 200 }}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={mainPhoto.filename}
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
                        <Link to={"/project/" + project.id}>
                            <Button size="small">More</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        )})}
        {
            <Grid item xs={5} md={4} lg={3} key="createNew">
                <Card sx={{ width: 200, height: 340 }}>
                    <CardActions>
                        <IconButton onClick={handleStartNewProjectClick}>
                            <AddCircleIcon style={{ fontSize: 200, color: 'gray' }} />
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        }
        <CreateProjectDialog isOpen={isStartNewProjectDialogOpen} handleStartNewProjectDialogClose={handleStartNewProjectDialogClose} />
    </Grid>
}