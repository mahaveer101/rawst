import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { regExps } from 'app/shared/constants/regexps';
import { CompOffService } from './comp-off.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comp-off',
  templateUrl: './comp-off.component.html',
  styleUrls: ['./comp-off.component.scss'],
  animations: egretAnimations
})
export class CompOffComponent implements OnInit {
  compOffForm: FormGroup;
  appliedCompOffForm: any;
  approvalCompOffForm: any;
  response: any;

  appliedDisplayColumns = [
    'requestBy',
    'approvedBy',
    'comp_off_date',
    'reason',
    'status'
  ];

  approvalDisplayColumns = [
    'request_by',
    'date',
    'reason',
    'approval_to',
    'status',
    'actions'
  ];
  errorMessage: '';
  rejectionReason = '';
  
    constructor(
    private fb: FormBuilder,
    private compOffService: CompOffService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createCompOffForm();
    this.getCompOff();
  }
  

  createCompOffForm() {
    this.compOffForm = this.fb.group({
      comp_off_date: ['', [Validators.required]],
      reason: ['', Validators.required]
    });
  }

  getCompOff() {
    this.compOffService.getCompOff().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.appliedCompOffForm = new MatTableDataSource(response?.applied_comp_off || []);
      this.approvalCompOffForm = new MatTableDataSource(response?.approval_comp_off || []);

    });
  }

  openConfirmation(compOffId: string, type: string, templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.compOffService.updateCompOff(compOffId, type, this.rejectionReason).subscribe(res => {
          this.getCompOff();
        });
      }
      this.rejectionReason = '';
    });
  }
 

  SaveCompOff() {
    this.errorMessage = '';
    this.compOffService.submitCompOff(this.compOffForm.value).subscribe({
      next: () => {
        this.compOffForm.reset();
        this.getCompOff();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
