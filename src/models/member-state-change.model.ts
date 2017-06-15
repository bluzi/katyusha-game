import { Room } from './room.model';

export class MemberStateChange {
    user: string;
    state: UserState;
    room: Room;
}

export enum UserState {
    Disconnected,
    Connected,
}
