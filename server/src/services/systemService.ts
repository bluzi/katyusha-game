import { MemberStateChange } from './../../../src/models/member-state-change.model';
import { UserState } from './../enums';
import { log } from './../log';

export function handshake(socket: SocketIO.Socket, accessToken: string) {
    this.users.push({
        accessToken,
        clientId: socket.client.id,
    });

    log('Handshake', accessToken);

    this.rooms
        .filter(room => room.members.some(member => member === accessToken))
        .forEach(room => {
            socket.in(room.roomId).emit('member-state-changed', <MemberStateChange>{
                user: accessToken,
                state: UserState.Connected,
                room,
            });

            log('Sending connection message');
        });

    socket.emit('handshake-response', accessToken);
}
