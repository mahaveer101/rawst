import { Component, OnInit , TemplateRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EditUserAddressComponent } from '../edit-user-address/edit-user-address.component';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { UserProfileService } from './user-profile.service';
import { UpdatProfileImageComponent } from '../updat-profile-image/updat-profile-image.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: egretAnimations
})
export class UserProfileComponent implements OnInit {
  response: any;
  userDetails: any;

  constructor(
    public jwtAuth: JwtAuthService,
    private userProfileService: UserProfileService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMyProfile();
  }

  getMyProfile() {
    this.userProfileService.getMyProfile().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.userDetails = response.user;
      this.jwtAuth.setProfilePic(this.userDetails?.details?.profile_pic || '', true);
    });
  }

  editUserProfile() {
    const dialogRef = this.dialog.open(EditUserProfileComponent,
      {
        width: '500px',
        data: this.userDetails?.details || {}
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getMyProfile();
      }
    });
  }

  editUserAddress() {
    const dialogRef = this.dialog.open(EditUserAddressComponent,
      {
        width: '500px',
        data: this.userDetails?.address || {}
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getMyProfile();
      }
    });
  }

  editProfileProfile() {
    const dialogRef = this.dialog.open(UpdatProfileImageComponent,
      {
        width: '500px',
        data: this.userDetails?.details || []
      });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getMyProfile();
      }
    });
  }

 
  openConfirmation(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.userProfileService.deleteProfilePic().subscribe(res => {
          this.getMyProfile();
        });
      }
    });
  }

}
