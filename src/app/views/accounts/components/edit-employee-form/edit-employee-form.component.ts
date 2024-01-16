import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { bloodGroupTypes } from '../../constants/employee-list-constants';
import { EmployeeListService } from '../employee-list/employee-list.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-edit-employee-form',
  templateUrl: './edit-employee-form.component.html',
  styleUrls: ['./edit-employee-form.component.scss']
})
export class EditEmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  genderList = [];
  roles = [];
  userTypes = [];
  departments = [];
  designations = [];
  managers = [];
  timezones = [];
  bloodGroupTypes = bloodGroupTypes;
  errorMessage = '';
  filteredTimezones: Observable<any[]>;
  filteredManagers: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeListService: EmployeeListService
  ) {
  }

  ngOnInit(): void {
    this.createEmployeeForm();
    if (this.data.defaultData) {
      this.setDefaultData(this.data.defaultData);
    }
    if (this.data.rowData) {
      this.setSavedFormData(this.data.rowData);
    }
    this.filteredTimezones = this.employeeForm.get('timezone').valueChanges.pipe(
      startWith(''),
      map(value => {
        return value ? this._filter(value as string) : this.timezones.slice();
      }),
    );

    this.filteredManagers = this.employeeForm.get('parent').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterManagers(name as string) : this.managers.slice();
      }),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.timezones.filter(option => option?.toLowerCase().includes(filterValue));
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

  getManager(id) {
    return this.managers.find(each => each.id === id);
  }

  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      empNo: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      aadharCard: ['',  [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      panCard: ['',  [Validators.required,Validators.pattern(regExps.alphaNumeric)]],
      phoneNumber: ['', [Validators.required,
      Validators.pattern(regExps.phonePattern),
      Validators.pattern('[0-9]{10}')]],
      dob: ['', [Validators.required]],
      dateOfRelieving: [null],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', Validators.required],
      doj: ['', Validators.required],
      parent: ['', Validators.required],
      userType: ['', Validators.required],
      departmentId: ['', Validators.required],
      designationId: ['', Validators.required],
      gender: ['', Validators.required],
      streetAddress: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required,Validators.pattern(regExps.alphabetic)]],
      country: ['',  [Validators.required,Validators.pattern(regExps.alphabetic)]],
      education: ['',  [Validators.required,Validators.pattern(regExps.alphabeticHyphan)]],
      bloodGroup: ['', [Validators.required]],
      timezone: ['', [ Validators.required ]]
    });
  }

  setSavedFormData(rowData) {
    this.employeeForm.get('name').setValue(rowData.name);
    this.employeeForm.get('empNo').setValue(rowData.emp_no);
    this.employeeForm.get('fatherName').setValue(rowData.father_name);
    this.employeeForm.get('aadharCard').setValue(rowData.aadhar_card);
    this.employeeForm.get('panCard').setValue(rowData.pan_card);
    this.employeeForm.get('phoneNumber').setValue(rowData.phone);
    this.employeeForm.get('dob').setValue(new Date(rowData.dob));
    this.employeeForm.get('email').setValue(rowData.email);
    this.employeeForm.get('roleId').setValue(parseFloat(rowData.role_id));
    this.employeeForm.get('doj').setValue(new Date(rowData.doj));
    this.employeeForm.get('parent').setValue(this.getManager(parseFloat(rowData.parent_id)));
    this.employeeForm.get('userType').setValue(parseFloat(rowData.user_type));
    this.employeeForm.get('departmentId').setValue(rowData.department_id);
    this.employeeForm.get('designationId').setValue(rowData.designation_id);
    const genderFound = this.genderList.find(each => each === rowData.gender);
    if (genderFound) {
      this.employeeForm.get('gender').setValue(rowData.gender);
    }
    this.employeeForm.get('streetAddress').setValue(rowData.street_address);
    this.employeeForm.get('pincode').setValue(rowData.pincode);
    this.employeeForm.get('city').setValue(rowData.city);
    this.employeeForm.get('state').setValue(rowData.state);
    this.employeeForm.get('country').setValue(rowData.country);
    this.employeeForm.get('education').setValue(rowData.education);
    const bloodgroupFound = this.bloodGroupTypes.find(each => each.value ===  rowData.blood_group) 
    if (bloodgroupFound) {
      this.employeeForm.get('bloodGroup').setValue(rowData.blood_group);  
    }
    this.employeeForm.get('timezone').setValue(rowData.timezone);
  }

  setDefaultData(dropdownData) {
    this.roles = dropdownData.role || [];
    this.userTypes = dropdownData.user_type || [];
    this.managers = dropdownData.user_list || [];
    this.departments = dropdownData.departments || [];
    this.designations = dropdownData.designations || [];
    this.genderList = dropdownData.user_gender || [];
    this.timezones = dropdownData.time_zones || [];
  }

  onChangeDepartment(event) {
    this.designations = this.departments.find(each => each.id === event.value)?.designations;
    this.employeeForm.get('designationId').setValue('');
  }

  onSubmitEmployeeForm() {
    this.errorMessage = '';
    this.employeeListService.updateEmployee(this.employeeForm.value, this.data.rowData).subscribe({
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
