import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useSocket } from '../context/SocketProvider';
import ReactPlayer from 'react-player';
import Peer from '../service/Peer';

const Room = () => {
    const socket = useSocket();

    const [socketId, setSocketid] = useState('');
    const [user, setUser] = useState('');
    const [myStream, setMyStream] = useState('');
    const [remoteStream,setRemoteStream] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabled2, setIsDisabled2] = useState(false);

    // to disable the make a call button 
    const handleClick = () => {
        handleCallUser();
        setIsDisabled(true);
    };
    // to disable the make a stream button 
    const handleClick2 = () => {
        handleCallUser2();
        setIsDisabled2(true);
    };

    // the first person get to know about the joinning of second person 
    const handleUserJoined = ({ email, userName, id }) => {
        console.log(`${userName} joined the room`);
        setSocketid(id);
        setUser(userName);
    };

    // first person initiates the call to the second person
    const handleCallUser = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const offer = await Peer.getOffer();
        socket.emit("user:call", { to: socketId, offer })
        setMyStream(stream);
    };

    // second person receives the call and answers it
    const handleIncommingCall = async ({ from, offer }) => {
        setSocketid(from);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log("Incomming call from", from, offer);
        const answer = await Peer.getAnswer(offer);
        socket.emit("call:accepted",{to:from,answer})
        setMyStream(stream);
    };


    // to send the streams to each others 
    const sendStreams  =()=>{
        for (const track of myStream.getTracks()) {
            Peer.peer.addTrack(track, myStream);
        }
    };

    // second person accepts the call and starts sharing their stream
    const handleCallAccepted = async ({from,answer})=>{
       Peer.setLocalDescription(answer);
       console.log("Call accepted from");
       sendStreams();
    };
   
    const handleNegoNeeded = async ()=>{
        const offer = await Peer.getOffer();
        socket.emit("peer:nego:needed",{offer,to:socketId})
    };

    const handleNegoNeededIncomming = async ({from,offer})=>{
        const answer = await Peer.getAnswer(offer);
        socket.emit("peer:nego:done",{to:from,answer})
    };

    const handleNegoNeededFinal = async ({answer})=>{
      await Peer.setLocalDescription(answer)
    }

   // handling eventlisteners
   useEffect(()=>{
       Peer.peer.addEventListener('negotiationneeded',handleNegoNeeded);
       return ()=>{
        Peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded);
    }
   })

    useEffect(()=>{
      Peer.peer.addEventListener('track', async ev =>{
        const remoteStream = ev.streams;
        setRemoteStream(remoteStream[0]);
      })
    },[]);


    // to handle the incoming and user joined events
    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('incomming:call', handleIncommingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoNeededIncomming);
        socket.on('peer:nego:final', handleNegoNeededFinal);
        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('incomming:call', handleIncommingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoNeededIncomming);
            socket.off('peer:nego:final', handleNegoNeededFinal);
        }
    }, [socket, handleUserJoined]);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
                <Container component="main" maxWidth="md">
                    <Typography component="h1" variant="h3" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                        Room Page
                    </Typography>
                    <Typography component="h3" variant="h5" sx={{ textAlign: 'center', color: socketId ? 'green' : 'red' }}>
                        {socketId ? `Connected with ${user}` : "No one in the room"}
                    </Typography>
                  <Box sx={{display:'flex',justifyContent:'space-evenly'}}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2% 0 3% 0', borderRadius: '20px' }}>
                        {myStream &&
                            <ReactPlayer url={myStream}
                                playing
                                muted
                                height="200px"
                                width="300px"
                            />}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2% 0 3% 0', borderRadius: '20px' }}>
                        {remoteStream &&
                            <ReactPlayer url={remoteStream}
                                playing
                                muted
                                height="200px"
                                width="300px"
                            />}
                    </Box>
                  </Box>
                    {socketId && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                            <Button
                                onClick={handleClick}
                                variant="contained"
                                disabled={isDisabled}
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
                                Make a Call
                            </Button>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                      {myStream &&
                        <Button onClick={sendStreams}
                                variant="contained"
                                disabled={isDisabled2}
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
                        Send Streams
                        </Button>}
                    </Box>

                </Container>
            </Box>
        </>
    )
}

export default Room