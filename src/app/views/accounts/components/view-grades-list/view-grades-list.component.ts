import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { GradesListService } from '../grades-list/grades-list.service';

@Component({
  selector: 'app-view-grades-list',
  templateUrl: './view-grades-list.component.html',
  styleUrls: ['./view-grades-list.component.scss'],
  animations: egretAnimations
})
export class ViewGradesListComponent implements OnInit {
  gradesData: any;
  userId = null;
  gradesSalaryList: any;
  feedbackForm: FormGroup;
  grades = [];
  departments = [];
  designations = [];
  errorMessage = '';
  newSalaryHike = {
    year: null,
    date: new Date(),
    grade: '',
    percentage: null,
    flat: null,
    designation: '',
    previousSal: null,
    newSal: null
  };

  displayedColumns = [
    'hike_year',
    'hike_date',
    'grade',
    'percentage',
    'designation',
    'salary'
  ];

  qualities = [
    {
      controlName: 'team_work',
      name: 'Team Work'
    },
    {
      controlName: 'productivity',
      name: 'Productivity'
    },
    {
      controlName: 'technical_skills',
      name: 'Technical Skills'
    },
    {
      controlName: 'creativity',
      name: 'Creativity'
    },
    {
      controlName: 'punctuality',
      name: 'Punctuality'
    },
    {
      controlName: 'independent_work',
      name: 'Independent Work'
    },
    {
      controlName: 'attendance',
      name: 'Attendance'
    }
  ];

  constructor(
    private gradesListService: GradesListService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.feedbackForm = this.fb.group({
      type: new FormControl('percentage', Validators.required),
      grade: new FormControl('', Validators.required),
      department_id: new FormControl('', Validators.required),
      designation_id: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.addBehaviourControls();
    this.route.queryParams
      .subscribe(params => {
        this.userId = params['id'] || '';
        if (this.userId) {
          this.getGradesData(this.userId);
        }
      });
    this.newSalaryHike.year = new Date().getFullYear();
  }

  addBehaviourControls() {
    for (const each of this.qualities) {
      this.feedbackForm.addControl(each.controlName, new FormControl('', Validators.required));
    }
  }

  getGradesData(id) {
    this.gradesListService.getUserGradeDeatils(id).subscribe({
      next: (res: any) => {
        this.gradesData = res;
        this.gradesSalaryList = new MatTableDataSource(res?.user_list?.salary_hikes || []);
        this.departments = res?.departments || [];
        this.designations = res?.designations || [];
        this.grades = res?.grades || [];
        this.feedbackForm.get('department_id').setValue(res?.user_list?.department_id);
        this.feedbackForm.get('designation_id').setValue(res?.user_list?.designation_id);
        this.newSalaryHike.previousSal = this.gradesData?.user_list?.current_salary || 0;
        this.onChangeDesignation({ value: res?.user_list?.designation_id});
      }
    });
  }

  getDesignation(id) {
    return this.gradesData?.designations?.find(each => each?.id === id)?.name;
  }

  onChangeGrade(event) {
    const grade = this.grades.find(each => each.slug === event.value);
    this.newSalaryHike.grade = grade?.name;
    this.newSalaryHike.percentage = grade?.percentage;
    this.newSalaryHike.newSal = (parseFloat(this.newSalaryHike.previousSal) +
      (parseFloat(this.newSalaryHike.previousSal) / 100 * parseFloat(this.newSalaryHike.percentage))).toFixed(2);
  }

  onChangeDepartment(event) {
    this.designations = this.departments.find(each => each.id === event.value)?.designations;
    this.feedbackForm.get('designation_id').setValue('');
  }

  onChangeDesignation(event) {
    const designation = this.designations.find(each => each.id === event.value);
    this.newSalaryHike.designation = designation?.name || designation?.designation_name || '';
  }

  onSubmitFeedbackForm() {
    this.errorMessage = '';
    this.gradesListService.submitFeedback(this.userId, this.feedbackForm.value).subscribe({
      next: () => {
        this.router.navigate(['/accounts/grades-list']);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

  onChangeAppraisalType(event) {
    this.newSalaryHike.newSal = 0;
    if (event.value === 'percentage') {
      this.feedbackForm.addControl('grade', new FormControl('', Validators.required));
      this.feedbackForm.removeControl('basic');
      this.feedbackForm.removeControl('hra');
      this.feedbackForm.removeControl('conv');
      this.feedbackForm.removeControl('other');
    } else {
      this.feedbackForm.removeControl('grade');
      this.feedbackForm.addControl('basic', new FormControl('', Validators.required));
      this.feedbackForm.addControl('hra', new FormControl('', Validators.required));
      this.feedbackForm.addControl('conv', new FormControl('', Validators.required));
      this.feedbackForm.addControl('other', new FormControl('', Validators.required));
    }
  }

  onChangeFlatSal() {
    this.newSalaryHike.previousSal = this.gradesData?.user_list?.current_salary || 0;
    const newSal = 
      +this.feedbackForm.get('basic')?.value +
      +this.feedbackForm.get('hra')?.value +
      +this.feedbackForm.get('conv')?.value +
      +this.feedbackForm.get('other')?.value;
    this.newSalaryHike.flat = newSal;
    this.newSalaryHike.newSal = newSal;
  }
}
