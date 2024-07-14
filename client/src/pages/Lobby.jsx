// pages/Lobby.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { useSocket } from '../context/SocketProvider';

const Lobby = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');

    const socket = useSocket();
    const navigate = useNavigate();

    const handleJoinRoom = (data) => {
        const { email, roomNumber } = data;
        navigate(`/room/${roomNumber}`);
    };
    
    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket]);

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit("room:join", { userName, email, roomNumber });
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh', marginTop: '-5%' }}>
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5" sx={{ mt: 4, textAlign: 'center' }}>
                    Lobby Screen
                </Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                name="userName"
                                autoComplete="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="roomNumber"
                                label="Room Number"
                                name="roomNumber"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    background: 'black',
                                    color: 'white',
                                    fontWeight: '500',
                                    '&:hover': {
                                        background: 'black',
                                        color: 'orange',
                                    },
                                }}
                            >
                                Join Room
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Lobby;
