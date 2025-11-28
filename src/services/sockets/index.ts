import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@env';
import { store } from '../../redux';

let socket: Socket | null = null;

type CallEventStatus =
  | 'started'
  | 'ringing'
  | 'answered'
  | 'completed'
  | 'failed'
  | 'rejected'
  | 'unanswered'
  | 'timeout'
  | 'busy';

export type VonageEvent = {
  uuid: string; // callId
  status?: CallEventStatus;
  message?: string;
  conversation_uuid?: string;
  [key: string]: any; // backend sends multiple props
};

/*************************************
 * CONNECT SOCKET
 *************************************/
export const initCallSocket = () => {
  console.log('InitCallSocket runingg...');

  const { auth } = store.getState();
  let token = auth.token;
  socket = io(`${BASE_URL}/?token=${token}`, {
    auth: { token },
    transports: ['websocket'],
  });

  console.log('after socket init runingg...', socket);

  socket.on('connect', () => console.log('📞 Socket Connected'));
  socket.on('disconnect', () => console.log('❌ Socket Disconnected'));
};

/*************************************
 * LISTEN TO BACKEND VONAGE EVENTS
 *************************************/
export const onVonageEvent = (cb: (data: VonageEvent) => void) => {
  socket?.on('vonage-event', (data: VonageEvent) => {
    console.log('📨 VONAGE EVENT => ', data);
    cb(data);
  });
};

/*************************************
 * REMOVE LISTENER WHEN LEAVING SCREEN
 *************************************/
export const cleanupCallSocket = () => {
  socket?.off('vonage-event');
};
