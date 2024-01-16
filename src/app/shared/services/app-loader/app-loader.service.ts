import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppLoaderComponent } from './app-loader.component';

interface Config {
  width?: string
}

@Injectable()
export class AppLoaderService {
  dialogRef: MatDialogRef<AppLoaderComponent>;
  isOpened = false;
  constructor(private dialog: MatDialog) { }

  public open(title: string = 'Please wait', config: Config = {width: '200px'}): Observable<boolean> {
    // if (this.dialog.openDialogs && this.dialog.openDialogs.length > 0) return;
    if (this.isOpened) return;
    this.dialogRef = this.dialog.open(AppLoaderComponent, { disableClose: true, backdropClass: 'light-backdrop'});
    this.dialogRef.updateSize(config.width);
    this.dialogRef.componentInstance.title = title;
    this.isOpened = true;
    return this.dialogRef.afterClosed();
  }

  public close() {
    this.isOpened = false;
    if(this.dialogRef)
      this.dialogRef.close();
  }

  public closeAll() {
    this.isOpened = false;
    if(this.dialog) {
      this.dialog.closeAll();
    }
  }
}
