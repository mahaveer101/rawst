import { Component, OnInit, TemplateRef } from '@angular/core';
import { HybrideWorkFromHomeService } from './hybride-work-from-home.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { regExps } from 'app/shared/constants/regexps';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-hybrid-work-from-home',
  templateUrl: './hybrid-work-from-home.component.html',
  styleUrls: ['./hybrid-work-from-home.component.scss']
})
export class HybridWorkFromHomeComponent implements OnInit {
  response: any;
  HybrideWFHForm:any;
  approvalHybrideWFH:any = [];
  appliedHybrideWFH : any = [];
  ApprovalDisplayColumns = [
    'applied_by_user',
    'approve_start_date',
    'approve_end_date',
    'reason',
    'status',
    'actions'
  ];
  appliedDisplayColumns = [
    'approve_start_date',
    'approve_end_date',
    'reason',
    'status'
  ];
  errorMessage:'';

  constructor(
    private fb: FormBuilder,
    private hybrideWorkFromHomeService: HybrideWorkFromHomeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getHybrideWorkFromHome();
  }

  createForm() {
    this.HybrideWFHForm = this.fb.group({
      approvalStartDate: ['', Validators.required],
      approvalEndDate: ['', Validators.required],
      reason: ['', Validators.required,]
    });
  }

  getHybrideWorkFromHome() {
    this.hybrideWorkFromHomeService.getHybrideWorkFromHome().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.approvalHybrideWFH = new MatTableDataSource(response?.wfh_approvals || []);
      this.appliedHybrideWFH = new MatTableDataSource(response?.wfh_request || []);
    });
  }

  applyHybrideWFH() {
    this.errorMessage = '';
    this.hybrideWorkFromHomeService.submitHybrideWFH(this.HybrideWFHForm.value).subscribe({
      next: () => {
        this.HybrideWFHForm.reset();
        this.getHybrideWorkFromHome();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

  openConfirmation(id: string, type: string, templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.hybrideWorkFromHomeService.updateHybridWorkFromHome(id, type).subscribe(() => {
          this.getHybrideWorkFromHome();
        });
      }
    });
  }
}
