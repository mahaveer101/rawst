import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EditAssetsComponent } from '../edit-assets/edit-assets.component';
import { AssetsListService } from '../assets-list/assets-list.service';

@Component({
  selector: 'app-view-assets-details',
  templateUrl: './view-assets-details.component.html',
  styleUrls: ['./view-assets-details.component.scss']
})
export class ViewAssetsDetailsComponent implements OnInit {
  assets: any = [];
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewAssetsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private assetsListService: AssetsListService
  ) { }

  ngOnInit(): void {
    this.getUserAssets();
  }

  getUserAssets() {
    this.assetsListService.getAssetsDeatils(this.data?.userId).subscribe({
      next: (response: any) => {
        this.assets = response?.users_assets || [];
      }
    })
  }

  viewDocument(url) {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,left=200,width=500,height=500");
  }

  editAsset(asset) {
    const editDialogRef = this.dialog.open(EditAssetsComponent,
      {
        width: '600px',
        data: {
          selectedAsset: asset,
          userId: this.data.userId
        }
      }
    );
    editDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getUserAssets();
      }
    });
  }
}
