import { io } from 'socket.io-client';

const socket = io('http://localhost:1999');

export default socket;