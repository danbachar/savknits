import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import CircularIntegration from './CircularIntegration';

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function CreateProjectDialog(props: { isOpen: boolean, handleStartNewProjectDialogClose: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pattern, setPattern] = useState<any>();
  const [photo, setPhoto] = useState<any>();
  let isDone = new Promise(() => {});

  const handleClose = () => {
    props.handleStartNewProjectDialogClose();
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  }

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  }

  const handlePatternPathChange = (event: any) => {
    const { files } = event.target as HTMLInputElement;

    if (files && files.length > 0) {
      setPattern(files[0]);
    }
  }

  const handlePhotoPathChange = (event: any) => {
    const { files } = event.target as HTMLInputElement;

    if (files && files.length > 0) {
      setPhoto(files[0]);
    }
  }

  const handleSend = () => {
    const formData = new FormData();
    formData.append('mainPattern', pattern);
    formData.append('mainPhoto', photo);
    formData.append('name', name);
    formData.append('description', description);
    fetch("/api/project", {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
      },
      body: formData
    }).then((newProject) => {
      // TODO: add new project to list
      isDone = new Promise((res, _) => res(true));
      props.handleStartNewProjectDialogClose();
    }).catch((err) => {
      isDone = new Promise((_, rej) => rej(false));
      console.error(`Couldn't start a new project: ${err}`);
    })
  };

  const fullScreen = useMediaQuery('(max-width:600px)');

  return <Dialog open={props.isOpen} onClose={handleClose} fullScreen={fullScreen} fullWidth={!fullScreen} maxWidth={"sm"}>
    <DialogTitle>
      <Grid container justifyContent="space-between">
        <Typography gutterBottom variant="subtitle1" textAlign={"left"}>
          Start a new project
        </Typography>
        <IconButton onClick={handleClose}>
            <CloseIcon />
        </IconButton>
      </Grid>
    </DialogTitle>
    <DialogContent>
      <Grid container direction="column">
        <Grid item>
          <TextField autoFocus margin="dense" id="name" label="Name" type="text" value={name} onChange={handleNameChange} fullWidth variant="standard" />
        </Grid>
        <Grid item>
          <TextField margin="dense" id="description" label="Description" type="text" value={description} onChange={handleDescriptionChange} fullWidth variant="standard" />
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Pattern
              <VisuallyHiddenInput type="file" onChange={handlePatternPathChange}/>
            </Button>
          </Grid>
          <Grid item>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Photo
              <VisuallyHiddenInput type="file" onChange={handlePhotoPathChange}/>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <CircularIntegration text="Start new project" handleClick={handleSend} isDone={isDone} />
    </DialogActions>
  </Dialog>;
}