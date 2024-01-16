import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { regExps } from 'app/shared/constants/regexps';
import { RegularizationService } from './regularization.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-regularization',
  templateUrl: './regularization.component.html',
  styleUrls: ['./regularization.component.scss'],
  animations: egretAnimations
})
export class RegularizationComponent implements OnInit {

  regularizationForm: FormGroup;
  response: any;
  appliedRegularization: any;
  approvalRegularization: any;
  appliedDisplayColumns = [
    'apply_date',
    'from_time',
    'to_time',
    'status_name',
    'reason'
  ];

  approvalDisplayColumns = [
    'name',
    'apply_date',
    'from_time',
    'to_time',
    'reason',
    'status_name',
    'actions'
  ];
  errorMessage: '';
  maxDate = new Date();
  rejectionReason = '';
  
  constructor(
    private fb: FormBuilder,
    private regularizationService: RegularizationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getRegularizations();
  }

  createForm() {
    this.regularizationForm = this.fb.group({
      applyDate: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  getRegularizations() {
    this.regularizationService.getRegularization().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.appliedRegularization = new MatTableDataSource(response?.applied_regularization || []);
      this.approvalRegularization = new MatTableDataSource(response?.approval_regularization || []);
    });
  }

  openConfirmation(regularizationId: string, type: string, templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.regularizationService.updateRegularization(regularizationId, type, this.rejectionReason).subscribe(res => {
          this.getRegularizations();
        });
        this.rejectionReason = '';
      }
    });
  }
  
  applyRegularization() {
    this.errorMessage = '';
    this.regularizationService.submitRegularizationApplication(this.regularizationForm.value).subscribe({
      next: () => {
        this.regularizationForm.reset();
        this.getRegularizations();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

  convertTime (time) {
    if (!time) {
      return '';
    }
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) {
      time = time.slice (1);
      time[3] = +time[0] < 12 ? ' AM' : ' PM'; 
      time[0] = +time[0] % 12 || 12;
    }
    return time.join ('');
  }
}
