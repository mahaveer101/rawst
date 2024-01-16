import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UserService } from 'app/shared/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: []
})
export class NotificationsComponent implements OnInit, OnDestroy {

  @Input() notificPanel;
  notifications = [];

  public notificationSub: Subscription;

  constructor(
    private jwtAuth: JwtAuthService,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.notificationSub = this.jwtAuth.getNotifications().subscribe((response: any) => {
      this.notifications = structuredClone(response);
    });
  }

  clearAll(e) {
    e.preventDefault();
    const payload = {
      id: this.notifications.map(({ id }) => id),
      browser_id: this.userService.getBrowerId()
    }
    this.apiService.put(urlConstants.clearNotifications, payload).subscribe({
      next: (response) => {
        this.notifications = [];
        this.jwtAuth.publishNotifications([]);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSub) {
      this.notificationSub.unsubscribe();
    }
  }
}
