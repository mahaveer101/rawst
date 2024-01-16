import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxSavingListService } from '../tax-saving-list/tax-saving-list.service';
import { Observable, map, startWith } from 'rxjs';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

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
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddHouseRentComponent implements OnInit {

  houseRentForm: FormGroup;
  userTypes: [];
  financialYears = [
    '2022-2023',
    '2023-2024',
    '2024-2025'
  ];
  name = 'Add';
  errorMessage = '';
  fileList: File[] = [];
  listOfFiles: any[] = [];
  filteredUsers: Observable<any[]>;
  users = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHouseRentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taxSavingListService: TaxSavingListService
  ) { }

  ngOnInit(): void {
    this.createAllHouseRentForm();
    if (this.data.isAdd) {
      this.setDefaultData(this.data);
      this.houseRentForm.addControl('user', new FormControl('', Validators.required));
      this.filteredUsers = this.houseRentForm.get('user').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.users.slice();
        }),
      );
    }
    
    if (this.data.isEdit) {
      this.name = "Update";
      this.houseRentForm.get('rent').setValue(this.data?.rowData?.rent);
      this.houseRentForm.get('from_year_month').setValue(moment(this.data?.rowData?.from_year_month));
      this.houseRentForm.get('to_year_month').setValue(moment(this.data?.rowData?.to_year_month));
      this.houseRentForm.get('address').setValue(this.data?.rowData?.address);
      this.houseRentForm.get('city').setValue(this.data?.rowData?.city);
      this.houseRentForm.get('financial_year').setValue(this.data?.rowData?.financial_year);
    }
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

  createAllHouseRentForm() {
    this.houseRentForm = this.fb.group({
      rent: ['', Validators.required],
      from_year_month: [null, Validators.required],
      to_year_month: [null, Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      financial_year: ['', Validators.required],
    });
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

  setDefaultData(dropdownData) {
    this.users = dropdownData.users || [];
  }

  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
  }

  setMonthAndYearForFrom(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.houseRentForm.get('from_year_month')?.value || moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.houseRentForm.get('from_year_month').setValue(ctrlValue);
    datepicker.close();
  }

  setMonthAndYearForTo(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.houseRentForm.get('to_year_month')?.value || moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.houseRentForm.get('to_year_month').setValue(ctrlValue);
    datepicker.close();
  }

  onSubmitHouseRentForm() {
    this.errorMessage = '';
    if (this.data.isAdd) {
      this.taxSavingListService.submitAllHouseRentForm(this.houseRentForm.value, this.fileList).subscribe(res => {
        this.dialogRef.close(true);
      }, error => {
        this.errorMessage = error?.error?.message;
      });
    } else {
      this.taxSavingListService.updateAllHouseRentForm(this.data.rowData.id, this.houseRentForm.value).subscribe(res => {
        this.dialogRef.close(true);
      }, error => {
        this.errorMessage = error?.error?.message;
      });
    }
  }
}