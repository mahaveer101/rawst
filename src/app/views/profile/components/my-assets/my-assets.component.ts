import { Component, OnInit } from '@angular/core';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { MyAssetsService } from './my-assets.service';

@Component({
  selector: 'app-my-assets',
  templateUrl: './my-assets.component.html',
  styleUrls: ['./my-assets.component.scss']
})
export class MyAssetsComponent implements OnInit {

  assets: any;

  constructor(
    public jwtAuth: JwtAuthService,
    private myAssetService: MyAssetsService
  ) { }

  ngOnInit(): void {
    this.getMyAssets();
  }

  getMyAssets() {
    this.myAssetService.getMyAssets(this.jwtAuth?.user.id).subscribe({
      next: (response: any) => {
        this.assets = response?.users_assets || [];
      }
    });
  }

  viewDocument(url) {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,left=200,width=500,height=500");
  }

}
