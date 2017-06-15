import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { MemberStateChange } from '../models/member-state-change.model';
import { SocketService } from 'services/socket.service';


@Injectable()
export class RoomService {

    constructor(private socket: SocketService) { }

    getCurrentRoom(): Promise<Room> {
        return this.socket.emit('getCurrentRoom')
            .once<Room>('get-current-room-response');
    }

    create(): Promise<Room> {
        return this.socket.emit('createRoom')
            .once<Room>('create-room-response');
    }

    join(roomId: string): Promise<Room> {
        return this.socket.emit('joinRoom', roomId)
            .once<Room>('join-room-response');
    }

    leave(): Promise<void> {
        return this.socket.emit('leaveRoom')
            .once<void>('leave-room-response');
    }

    listenToMembers(): Observable<MemberStateChange> {
        return this.socket.on('member-state-changed');
    }
}
