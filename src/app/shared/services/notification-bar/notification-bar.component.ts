import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationBarService } from './notification-bar.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  public count = 0;
  constructor(
    public snackbarRef: MatSnackBarRef<NotificationBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private notificationBar: NotificationBarService
  ) { }

  ngOnInit(): void {
    this.count = this.data.length;
  }

  removeItem(index, item) {
    this.count = this.count - 1;
    if (this.count === 0) this.snackbarRef.dismiss();
    this.notificationBar.removeNotification(item);
  }
}
