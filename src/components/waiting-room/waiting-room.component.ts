import { AuthService } from './../../services/auth.service';
import { HomeComponent } from 'components/home/home.component';
import { RoomService } from './../../services/room.service';
import { Observable } from 'rxjs/Observable';
import { Room } from './../../models/room.model';
import { Component, OnInit } from '@angular/core';
import { UserState } from '../../models/member-state-change.model';
import { SocketService } from 'services/socket.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'app-waiting-room',
    templateUrl: 'waiting-room.component.html',
    styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {
    private room: Room;
    private isMine: boolean;

    constructor(private socketService: SocketService, private roomService: RoomService,
        private navigation: NavigationService, private auth: AuthService) {
        this.roomService.listenToMembers().subscribe(event => {
            console.log(`User ${event.user} has ` + (event.state === UserState.Connected ? 'joined' : 'left'));
            this.room = event.room;
            this.refreshLeadership();
        });
    }

    ngOnInit(): void {
        this.refreshLeadership();
    }

    private refreshLeadership() {
        this.isMine = this.room.leaderId === this.auth.accessToken;
    }

    startGame() {

    }

    async leave() {
        await this.roomService.leave();
        this.navigation.navigateTo(HomeComponent);
    }
}
