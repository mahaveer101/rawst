import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftsService } from '../shifts/shifts.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-update-shifts',
  templateUrl: './add-update-shifts.component.html',
  styleUrls: ['./add-update-shifts.component.scss']
})
export class AddUpdateShiftsComponent implements OnInit {
  userShiftForm: FormGroup;
  errorMessage = '';
  users = [];
  company_shifts = [];
  name = "Create";
  shifts = [];
  filteredUsers: Observable<any[]>;
  filteredShifts: Observable<any[]>;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUpdateShiftsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shiftsService: ShiftsService
  ) { }

  ngOnInit(): void {
    this.createUserShiftTimeForm();
    this.setDefaultData();
    let name = '';
    let shift_name = '';
    if (this.data.isEdit) {
      this.name = 'Update';
      this.userShiftForm.get('shift').setValue(this.data.rowData?.shift);
      this.userShiftForm.get('user').setValue(this.data.rowData?.user);
      name = this.data.rowData?.user;
      shift_name = this.data.rowData?.shift;
    }
    this.filteredUsers = this.userShiftForm.get('user').valueChanges.pipe(
      startWith(name),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.users.slice();
      }),
    );

    this.filteredShifts = this.userShiftForm.get('shift').valueChanges.pipe(
      startWith(shift_name),
      map(value => {
        const shift_name = typeof value === 'string' ? value : value?.shift_name;
        return shift_name ? this._filterShift(shift_name as string) : this.company_shifts.slice();
      }),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(option => option?.name?.toLowerCase().includes(filterValue));
  }

  private _filterShift(value: string): string[] {
    const shiftFilterValue = value.toLowerCase();
    return this.company_shifts.filter(option => option?.shift_name?.toLowerCase().includes(shiftFilterValue));
  }

  displayFn(user): string {
    return user && user.name ? user.name : '';
  }

  displayFnShift(shift): string {
    return shift && shift.shift_name ? shift.shift_name : '';
  }

  createUserShiftTimeForm() {
    this.userShiftForm = this.fb.group({
      user: ['', Validators.required],
      shift: ['', Validators.required]
    });
  }

  setDefaultData() {
    this.company_shifts = this.data.defaultData?.company_shifts || [];
    this.users = this.data.defaultData?.users || [];
  }

  onSubmitUserShiftForm() {
    this.errorMessage = '';
    if (this.data.isAdd) {
      this.shiftsService.submitUserShiftsForm(this.userShiftForm.value).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message;
        }
      });
    } else {
      this.shiftsService.updateUserShiftsForm(this.userShiftForm.value, this.data.rowData).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message;
        }
      });
    }
    
  }
}

