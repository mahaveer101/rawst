import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { matchValidatorForPassword } from 'app/shared/validators/custom-password.validator';
import { bloodGroupTypes } from '../../constants/employee-list-constants';
import { EmployeeListService } from '../employee-list/employee-list.service';
import { Observable, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.scss']
})
export class AddEmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  genderList = [];
  roles = [];
  userTypes = [];
  departments = [];
  designations = [];
  managers = [];
  bloodGroupTypes = bloodGroupTypes;
  errorMessage = '';
  filteredManagers: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeFormComponent>,
    private employeeListService: EmployeeListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.createEmployeeForm();
    if (this.data.defaultData) {
      this.setDefaultData(this.data.defaultData);
    }
    this.filteredManagers = this.employeeForm.get('parent').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterManagers(name as string) : this.managers.slice();
      }),
    );
  }

  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      empNo: ['', [Validators.required]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(regExps.phonePattern), Validators.pattern('[0-9]{10}')
      ]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.required,
        Validators.pattern(regExps.password),
        matchValidatorForPassword('confirmPassword', true)
        ]],
      confirmPassword: ['',
        [Validators.required,
        matchValidatorForPassword('password')
        ]],
      roleId: ['', Validators.required],
      fatherName: ['', Validators.required],
      aadharCard: ['', [Validators.required,Validators.pattern(regExps.digitsPattern)]],
      panCard: ['', [Validators.required,Validators.pattern(regExps.alphaNumeric)]],
      parent: ['', Validators.required],
      userType: ['', Validators.required],
      departmentId: ['', Validators.required],
      doj: ['', Validators.required],
      designationId: ['', Validators.required],
      gender: ['', Validators.required],
      streetAddress: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      city: ['', Validators.required],
      state: ['', [Validators.required,Validators.pattern(regExps.alphabetic)]],
      country: ['', [Validators.required,Validators.pattern(regExps.alphabetic)]],
      education: ['',[Validators.required,Validators.pattern(regExps.alphabetic)]],
      bloodGroup: ['', Validators.required]
    });
  }

  private _filterManagers(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.managers.filter(option => 
      option?.name?.toLowerCase().includes(filterValue)
    );
  }

  displayFn(manager): string {
    return manager && manager.name ? `${manager.name}` : '';
  }

  setDefaultData(dropdownData) {
    this.roles = dropdownData.role || [];
    this.userTypes = dropdownData.user_type || [];
    this.managers = dropdownData.user_list || [];
    this.departments = dropdownData.departments || [];
    this.genderList = dropdownData.user_gender || [];
  }

  onChangeDepartment(event) {
    this.designations = this.departments.find(each => each.id === event.value)?.designations;
    this.employeeForm.get('designationId').setValue('');
  }

  onSubmitEmployeeForm() {
    this.errorMessage = '';
    this.employeeListService.submitEmployeeForm(this.employeeForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

  getStateCityAndCountry() {
    const pincode = this.employeeForm.get('pincode').value;
    this.employeeListService.getStateCityAndCountryByPincode(pincode).subscribe({
      next: (response) => {
        this.employeeForm.get('city').setValue(response.city);
        this.employeeForm.get('country').setValue(response.country);
        this.employeeForm.get('state').setValue(response.state);
      }
    });
  }
}
