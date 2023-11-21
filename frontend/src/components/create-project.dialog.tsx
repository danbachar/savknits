import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Select, TextField } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
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

export default function CreateProjectDialog(props: { isOpen: boolean, handleDialogClose: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pattern, setPattern] = useState<any>();
  const [photo, setPhoto] = useState<any>();

  const handleClose = () => {
    props.handleDialogClose();
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
    fetch("http://localhost:3000/api/project", {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
      },
      body: formData
    }).then((newProject) => {
      // TODO: add new project to list
      props.handleDialogClose();
    }).catch((err) => {
      console.error(`Couldn't start a new project: ${err}`);
    })
  };

  return <Dialog open={props.isOpen} onClose={handleClose}>
    <DialogTitle>Start a new project</DialogTitle>
    <DialogContent>
      <Grid container direction="column">
        <Grid item>
          <TextField autoFocus margin="dense" id="name" label="Name" type="text" value={name} onChange={handleNameChange} fullWidth variant="standard" />
        </Grid>
        <Grid item>
          <TextField margin="dense" id="description" label="Description" type="text" value={description} onChange={handleDescriptionChange} fullWidth variant="standard" />
        </Grid>
        <Grid container justifyContent={"space-between"}>
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
      <Button onClick={handleSend}>Start new project</Button>
    </DialogActions>
  </Dialog>;
}