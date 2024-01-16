import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { SalaryBreakupService } from '../salary-breakup/salary-breakup.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-salary-breakup-form',
  templateUrl: './add-salary-breakup-form.component.html',
  styleUrls: ['./add-salary-breakup-form.component.scss']
})
export class AddSalaryBreakupFormComponent implements OnInit {

  salaryBreakupForm: FormGroup;
  errorMessage: any;
  users = [];
  filteredUsers: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddSalaryBreakupFormComponent>,
    private salaryBreakupService: SalaryBreakupService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.createSalaryBreakupForm();
    this.setDefaultData(this.data);
    this.filteredUsers = this.salaryBreakupForm.get('user').valueChanges.pipe(
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
      option?.name?.toLowerCase().includes(filterValue) ||
      option?.emp_no?.toLowerCase().includes(filterValue) 
    );
  }

  displayFn(user): string {
    return user && user.name && user.emp_no ? `${user.name}-${user.emp_no}` : '';
  }

  createSalaryBreakupForm() {
    this.salaryBreakupForm = this.fb.group({
      user: ['', Validators.required],
      beneficiaryAcNo: ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      beneficiaryName: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      ifscNo: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      bankName: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      basic: ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      hra: ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      conveyance: ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      other: ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      pfStatus: [false, Validators.required],
      pf: [''],
      esic: [''],
      lwf: [25, [Validators.required, Validators.pattern(regExps.digitsPattern)]],
    });
  }

  setDefaultData(dropdownData) {
    this.users = dropdownData.users || [];
  }

  onSubmitSalaryBreakupFrom() {
    this.errorMessage = '';
    this.salaryBreakupService.submitSalaryBreakupForm(this.salaryBreakupForm.value).subscribe(res => {
      this.dialogRef.close(true);
    }, error => {
      this.errorMessage = error?.error?.message;
    });
  }

  calculatePf() {
    const basic = +this.salaryBreakupForm.get('basic').value;
    if (basic <= 15000) {
      const pf = (basic / 100 * 12).toFixed(2);
      this.salaryBreakupForm.get('pf').setValue(pf);
    } else {
      this.salaryBreakupForm.get('pf').setValue(1800);
    }
  }

  calculateESIC() {
    const basic = +this.salaryBreakupForm.get('basic').value;
    const hra = +this.salaryBreakupForm.get('hra').value;
    const conveyance = +this.salaryBreakupForm.get('conveyance').value;
    const other = +this.salaryBreakupForm.get('other').value;
    const total = basic + hra + conveyance + other;
    if (total <= 21000) {
      const esic = (total / 100 * 0.75).toFixed(2);
      this.salaryBreakupForm.get('esic').setValue(esic);
    } else {
      this.salaryBreakupForm.get('esic').setValue(0);
    }
  }
}
