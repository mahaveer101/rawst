import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationBarComponent } from './notification-bar.component';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { urlConstants } from 'app/shared/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationBarService {
  public snackbarRef;
  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private userService: UserService
  ) {
  }

  showNotifications(notifications) {
    if (this.snackbarRef) {
      this.snackbarRef.dismiss();
      this.snackbarRef = undefined;
    }
    if (notifications.length > 0) {
      this.snackbarRef = this.snackBar.openFromComponent(NotificationBarComponent, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackbar',
        data: notifications
      });
    }
  }

  removeNotification(item) {
    const payload = {
      id: [item.id],
      browser_id: this.userService.getBrowerId()
    }
    this.apiService.put(urlConstants.clearNotifications, payload).subscribe({
      next: (response) => {}
    });
  }
}
