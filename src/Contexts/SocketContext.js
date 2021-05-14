// import React, { createContext } from 'react';
// import { API_BASE_ORIGIN } from '../utils/API_URLS';
// const socketIo = require('socket.io-client');
// let socket;

// export const SocketContext = createContext();

// export const SocketProvider = props => {
//   socket = socketIo.connect(`${API_BASE_ORIGIN}`, {
//     transports: ['websocket']
//   });

//   socket.on('connect', function() {
//     console.log(`Hurrah Socket ${socket.id} Connected on Client`);
//   });
//   socket.on('reqReturnOrder', function(data) {
//     console.log('return order triggered');
//     console.log('data', data);
//   });

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {props.children}
//     </SocketContext.Provider>
//   );
// };
