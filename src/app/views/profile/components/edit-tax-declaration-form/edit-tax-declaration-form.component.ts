import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { TaxService } from '../tax/tax.service';

@Component({
  selector: 'app-edit-tax-declaration-form',
  templateUrl: './edit-tax-declaration-form.component.html',
  styleUrls: ['./edit-tax-declaration-form.component.scss'],
  animations: egretAnimations
})
export class EditTaxDeclarationFormComponent implements OnInit {

  taxDeclarationDetails:any;
  errorMessage = '';
  fileList: File[] = [];
  listOfFiles: any[] = [];

  constructor(
    private taxService: TaxService,
    public dialogRef: MatDialogRef<EditTaxDeclarationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.taxDeclarationDetails = this.data;
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

  onSubmitTaxDeclaration() {
    this.errorMessage = '';
    this.taxService.submitTaxDeclaration(this.taxDeclarationDetails?.id, this.fileList).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
