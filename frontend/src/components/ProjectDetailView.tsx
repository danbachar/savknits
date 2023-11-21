import { Button, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../entities/Project.entity";
import { pdfjs } from 'react-pdf';
import CustomImageList from "./CustomImageList";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function ProjectDetailView() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/project/${id}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
            }
        })
            .then(response => response.json())
            .then(data => setProject(data))
    }, [id]);

    return project == null ?
        <Grid item>
            <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                Project not found
            </Typography>
        </Grid> : <>
            <Grid item>
                <Typography gutterBottom variant="h6" component="div" textAlign={"left"}>
                    {project.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="pre" textAlign={"left"}>
                    {project.description}
                </Typography>
                <CustomImageList images={project.photos} />
                <Typography gutterBottom variant="h6" component="div" textAlign={"left"}>
                    Pattern
                </Typography>
                {
                    project.patterns.sort((a, b) => a.featured ? -1 : b.featured ? 1 : 0).map(pattern => (
                        <Link href={pattern.filename}
                            download={pattern.filename}
                            target="_blank"
                            rel="noreferrer">
                            <Button component="label" variant="contained" startIcon={<PictureAsPdfIcon />}>
                                {pattern.name}
                            </Button>
                        </Link>
                    ))
                }
            </Grid>
        </>;
}
