export const SocketEvent = {
  join_queue: 'join_queue',
  call_accept: 'call:accept',
  call_reject: 'call:reject',
} as const;

export const SocketEventListner = {
  queued: 'queued',
  assigning: 'assigning',
  queue_position: 'queue_position',
  call_connected: 'call_connected',
} as const;

export interface QueuePosition {
  position: number;
}

export interface CallConnected {
  status: 'RINGING' | 'ON_CALL' | 'ENDED' | 'REJECTED';
  [key: string]: unknown;
}

