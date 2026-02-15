import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { connect, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private eventObservables = new Map<string, Observable<unknown>>();

  connect(token: string, callback?: Function): void {
    if (this.socket?.connected) return;

    this.socket = connect(environment.socketUrl, {
      transports: ['websocket'],
      withCredentials: true,
      query: {
        token,
      },
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      if (callback) callback();
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.eventObservables.clear();
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.eventObservables.clear();
  }

  emit(event: string, ...data: unknown[]): void {
    this.socket?.emit(event, ...data);
  }

  listen<T>(event: string): Observable<T> {
    if (!this.eventObservables.has(event)) {

      const observable$ = new Observable<T>((observer) => {
        const handler = (data: T) => {
          observer.next(data);
        };

        this.socket?.on(event, handler);

        return () => {
          this.socket?.off(event, handler);
        };
      }).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );

      this.eventObservables.set(event, observable$);
    }

    return this.eventObservables.get(event) as Observable<T>;
  }
}
