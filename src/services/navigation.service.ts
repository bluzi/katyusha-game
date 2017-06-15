import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class NavigationService {
    private _currentPage: Observable<NavigationRequest>;
    private _pageSubscriber: Subscriber<NavigationRequest>;

    constructor() {
        this._currentPage = new Observable<NavigationRequest>(subscriber => this._pageSubscriber = subscriber);
    }

    getCurrentPage(): Observable<NavigationRequest> {
        return this._currentPage;
    }

    navigateTo(page: Component, args?: any) {
        this._pageSubscriber.next({
            page,
            args
        });
    }
}

export interface NavigationRequest {
    page: Component,
    args: any
}
