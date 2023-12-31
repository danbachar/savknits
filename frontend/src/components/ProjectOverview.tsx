import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "../entities/project";
import { CreateProjectDialog } from "./CreateProjectDialog";
import useMediaQuery from '@mui/material/useMediaQuery';

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
        fetch("/api/project", {
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

    const isXS = useMediaQuery('(max-width:600px)');

    return <Grid container justifyContent="center" columnGap={6} rowSpacing={2} direction="row">
        {projects.map((project, index) => {
            const mainPhoto = project.photos.find(photo => !!photo.featured);

            if (!mainPhoto) {
                return <Grid item xs={12}><Typography gutterBottom variant="h5" component="span">No main picture per project name ${project.name}!</Typography></Grid>;
            }

            return (
                <Grid item xs={5} md={4} lg={3} key={project.name + "" + index}>
                    <Card>
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
            )
        })}
        {
            <Grid item xs={5} md={4} lg={3} key="createNew">
                <Card>
                    <CardActions>
                        <Grid container>
                            <Grid justifyContent="center" justifyItems="center" justifySelf="center">
                                <IconButton onClick={handleStartNewProjectClick}>
                                    <AddCircleIcon style={{ fontSize: isXS ? 140 : 307, color: 'gray' }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        }
        <CreateProjectDialog isOpen={isStartNewProjectDialogOpen} handleStartNewProjectDialogClose={handleStartNewProjectDialogClose} />
    </Grid>
}