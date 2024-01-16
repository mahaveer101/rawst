import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxService } from '../tax/tax.service';
import * as _moment from 'moment';
import { Moment} from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};

@Component({
  selector: 'app-add-house-rent',
  templateUrl: './add-house-rent.component.html',
  styleUrls: ['./add-house-rent.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddHouseRentComponent implements OnInit {

  houseRentForm: FormGroup;
  financialYears = [
    '2022-2023',
    '2023-2024',
    '2024-2025'
  ];
  errorMessage = '';
  fileList: File[] = [];
  listOfFiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHouseRentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taxService: TaxService
  ) { }

  ngOnInit(): void {
    this.createHouseRentForm();
  }

  createHouseRentForm() {
    this.houseRentForm = this.fb.group({
      rent: ['', Validators.required],
      from_year_month: [moment(), Validators.required],
      to_year_month: [moment(), Validators.required],
      address: ['', Validators.required], 
      city: ['', Validators.required], 
      financial_year: ['', Validators.required], 
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

  setMonthAndYearForFrom(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.houseRentForm.get('from_year_month').value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.houseRentForm.get('from_year_month').setValue(ctrlValue);
    datepicker.close();
  }

  setMonthAndYearForTo(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.houseRentForm.get('to_year_month').value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.houseRentForm.get('to_year_month').setValue(ctrlValue);
    datepicker.close();
  }

  onSubmitHouseRentForm() {
    this.errorMessage = '';
    this.taxService.submitHouseRentForm(this.houseRentForm.value, this.fileList).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }


}
