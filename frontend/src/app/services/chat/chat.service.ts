import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { share } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  private url = 'http://localhost:3000'; // your server local path
  private onSubject = new Subject<any>();
  public changes = this.onSubject.asObservable().pipe(share());


  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
    this.start();
  }
  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
}

private storageEventListener(event: StorageEvent) {
  if (event.storageArea == localStorage) {
      let v;
      try {
          v = JSON.parse(event.newValue);
      } catch (e) {
          v = event.newValue;
      }
      this.onSubject.next({key: event.key, value: v});
  }
}

  watchStorage(key: string): Observable<string> {
    console.log(`Watching localStorage for changes to key '${key}'`);

    const handler = (event: StorageEvent) => {
      console.log("insidde handeler");
      
      if (event.storageArea === localStorage && event.key === key) {
        console.log(`Found key '${key}' in localStorage`);
       // observer.next(event.newValue);
      } else {
        console.log(`Did not find key '${key}' in localStorage`);
      }
    };
    window.addEventListener('storage', handler);
    return new Observable((observer) => {
     
      window.addEventListener('storage', handler);
      console.log(`Added storage event listener for key '${key}'`);
      return () => {
        window.removeEventListener('storage', handler);
        console.log(`Removed storage event listener for key '${key}'`);
      };
    });
  }


setChats(data)
{
   localStorage.setItem("data", JSON.stringify(data));
}

  joinRoom(data): void {
    this.socket.emit('join', data);
  }

  sendMessage(data): void {
    this.socket.emit('message', data);
  }

  sendMessageToGroup(data)
  {
    this.socket.emit('groupMessage', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }


    
  getGroupsMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new group message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }


  getStorage() {
    const storage: string = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  getStorageGroup()
  {
    const storage: string = localStorage.getItem('groupChat');
    console.log(storage ? JSON.parse(storage) : []);
    return storage ? JSON.parse(storage) : [];
  }

  setStorageGroups(data)
  {
    localStorage.setItem('groupChat', JSON.stringify(data));
  }

  setStorage(data) {
    console.log("setStorage",data);  
    localStorage.setItem('chats', JSON.stringify(data));
  }

 
}
