import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../entities/project";
import CustomImageList from "./CustomImageList";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from "./create-project.dialog";

export default function ProjectDetailView() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [photo, setPhoto] = useState<any>();
    const [name, setName] = useState<string>("");

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

    const handlePhotoPathChange = (event: any) => {
        const { files } = event.target as HTMLInputElement;

        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
    }

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    }

    const handleSend = () => {
        const formData = new FormData();
        console.log(photo);
        formData.append('name', name);
        formData.append('filename', photo.name);
        formData.append('photo', photo);
        fetch(`http://localhost:3000/api/project/${id}`, {
            method: 'PATCH',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => setProject(data)).catch((err) => {
                console.error(`Couldn't update project: ${err}`);
            })
    };

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
                <Typography gutterBottom variant="h6" component="div" textAlign={"left"}>
                    Add Progress
                </Typography>
                <TextField autoFocus margin="dense" id="name" label="Name" type="text" value={name} onChange={handleNameChange} fullWidth variant="standard" />
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Photo
                    <VisuallyHiddenInput type="file" onChange={handlePhotoPathChange} />
                </Button>
                <Button onClick={handleSend}>Submit</Button>
            </Grid>
        </>;
}
