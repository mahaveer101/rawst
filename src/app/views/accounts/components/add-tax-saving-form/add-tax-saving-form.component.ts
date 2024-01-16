import { Component, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxSavingListService } from '../tax-saving-list/tax-saving-list.service';
import { regExps } from 'app/shared/constants/regexps';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-tax-saving-form',
  templateUrl: './add-tax-saving-form.component.html',
  styleUrls: ['./add-tax-saving-form.component.scss']
})
export class AddTaxSavingFormComponent implements OnInit {

  fileList: File[] = [];
  listOfFiles: any[] = [];
  isLoading = false;

  taxSavingForm: FormGroup;
  users = [];
  taxSavingOptions = [];
  taxSavingYears = [
    '2022-2023',
    '2023-2024', 
    '2024-2025'];
  errorMessage = '';
  filteredUsers: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTaxSavingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taxSavingListService: TaxSavingListService
  ) { }

  ngOnInit(): void {
    this.createTaxSavingForm();
    this.setDefaultData(this.data);
    this.filteredUsers = this.taxSavingForm.get('user').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.users.slice();
      }),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(option => 
      option?.name?.toLowerCase().includes(filterValue) 
    );
  }

  displayFn(user): string {
    return user && user.name ? `${user.name}` : ''; 
  }

  createTaxSavingForm() {
    this.taxSavingForm = this.fb.group({
      user: ['', Validators.required],
      savingType: ['', Validators.required],
      savingYear: ['', Validators.required],
      amount: ['',[Validators.pattern(regExps.digitsPattern)]]
    });
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

  setDefaultData(dropdownData) {
    this.users = dropdownData.users || [];
    this.taxSavingOptions = dropdownData.tax_saving_options || [];
  }
  
  onSubmitTaxSavingForm() {
    this.errorMessage = '';
    this.taxSavingListService.submitTaxSavingForm(this.taxSavingForm.value, this.fileList).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
