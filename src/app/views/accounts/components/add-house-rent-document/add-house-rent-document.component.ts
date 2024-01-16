import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxSavingListService } from '../tax-saving-list/tax-saving-list.service';

@Component({
  selector: 'app-add-house-rent-document',
  templateUrl: './add-house-rent-document.component.html',
  styleUrls: ['./add-house-rent-document.component.scss']
})
export class AddHouseRentDocumentComponent implements OnInit {

  errorMessage = '';
  fileList: File[] = [];
  listOfFiles: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddHouseRentDocumentComponent>,
    private taxSavingListService: TaxSavingListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChanged(event:any){
    for(var i=0; i<= event.target.files.length - 1; i++){
      var selectedFile = event.target.files[i];
      if(this.listOfFiles.indexOf(selectedFile.name) === -1){
        this.fileList.push(selectedFile);
        this.listOfFiles.push(selectedFile.name);
      }
    }
  }

  removeSelectedFile(index: number){
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
  }


  submitDocumentUploadForm() {
    this.errorMessage= '';
    this.taxSavingListService.submitUploadDocument(this.data.rowData.id, this.fileList).subscribe({
      next: () => {
        this.listOfFiles = [];
        this.fileList = [];
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
