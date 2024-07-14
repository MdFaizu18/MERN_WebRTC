import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VideoEnded = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Video Call Ended
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    The video call has ended. Thank you for using our service.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGoBack}
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        fontWeight: '500',
                        '&:hover': {
                            backgroundColor: 'black',
                            color: 'white',
                            boxShadow: '0px 0px 10px rgba(0,0,0,.5)',
                        },
                    }}
                >
                    Go Back to Room
                </Button>
            </Box>
        </Container>
    );
};

export default VideoEnded;
