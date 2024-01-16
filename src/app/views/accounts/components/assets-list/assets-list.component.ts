import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { regExps } from 'app/shared/constants/regexps';
import { ViewAssetsDetailsComponent } from '../view-assets-details/view-assets-details.component';
import { AssetsListService } from './assets-list.service';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss'],
  animations: egretAnimations
})
export class AssetsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  fileList: File[] = [];
  listOfFiles: any[] = [];
  assetsForm: FormGroup;
  errorMessage = '';
  users = [];
  assetsList: any;
  displayedColumns = [
    'name',
    'email',
    'phone',
    'actions'
  ];
  response: any;

  constructor(
    public fb: FormBuilder,
    private assetsListService: AssetsListService,
    public dialog: MatDialog
  ) {
    this.createAssetForm();
  }

  ngOnInit(): void {
    this.getAssetsList();
  }

  createAssetForm() {
    this.assetsForm = this.fb.group({
      user_id: ['', Validators.required],
      asset_name: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      asset_code: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      location: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      category: ['', Validators.required],
      asset_type: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      condition: ['', Validators.required]
    });
  }

  getAssetsList() {
    this.assetsListService.getAssetsList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.assetsList = new MatTableDataSource(response.user_lists || []);
      this.assetsList.paginator = this.paginator;
      this.setDefaultData();
    });
  }

  setDefaultData() {
    this.users = this.response?.users || [];
  }

  saveNewAsset() {
    this.errorMessage = '';
    this.assetsListService.submitAssetApplication(this.assetsForm.value, this.fileList).subscribe({
      next: () => {
        setTimeout(() => {
          this.assetsForm.reset();
        }, 100);
        this.fileList = [];
        this.listOfFiles = [];
        this.getAssetsList();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

  viewAssetsDetails(id) {
    this.dialog.open(ViewAssetsDetailsComponent,
      {
        width: '600px',
        data: {
          userId: id
        }
      }
    );
  }

  onfileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        this.listOfFiles.push(selectedFile.name);
      }
    }
  }

  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
  }
}
