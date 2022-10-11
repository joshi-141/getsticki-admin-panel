import { Injectable } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Injectable()
export class Notification {
    constructor(
        private _notifications: NotificationsService,
    ) { }

    notification(title: string, content: string, type: any) {
        this._notifications.create(title, content, type === "error" ? NotificationType.Error : NotificationType.Success);
    }                    
 
}


