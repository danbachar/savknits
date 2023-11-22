import { Box, Fab, CircularProgress, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";

export default function CircularIntegration(props: { text: string, isDone: Promise<any>, handleClick: () => any }) {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    props.isDone
        .then((val) => setSuccess(val))
        .finally(() => {
            setLoading(false);
        });

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            props.handleClick();
        }
    };

    return (
        <Box sx={{ m: 1, position: 'relative' }}>
            <Button
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}>
                {props.text}
            </Button>
            {loading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
        </Box>
    );
}