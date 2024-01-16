import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { OfficeWorkTimeService } from './office-work-time.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-office-work-time',
  templateUrl: './office-work-time.component.html',
  styleUrls: ['./office-work-time.component.scss'],
  animations: egretAnimations
})
export class OfficeWorkTimeComponent implements OnInit {
  employeeShiftTimingList:any;
  errorMessage: '';
  fileList: File[] = [];
  listOfFiles: any[] = [];
  response:any;
  shiftDate = new Date();
  displayedColumns=[
    'empNo',
    'empName',
    'shiftStartTime',
    'shiftEndTime',
    'weekOff'
  ];
  
   Date = new Date();

  dateFilter = (date: Date): boolean => {
    const today = new Date();
    return date >= today;
  }

  constructor(
    private fb: FormBuilder,
    private officeWorkTimeService: OfficeWorkTimeService
  ) { }

  ngOnInit(): void {
    this.getRosterDetailsByDate(this.shiftDate);
  }  

  saveOfficeWorkTime() {
    this.errorMessage = '';
    this.officeWorkTimeService.submitOfficeWorkTime(this.fileList).subscribe({
      next: (response:any) => {
        this.fileList = [];
        this.listOfFiles = [];
        this.employeeShiftTimingList = new MatTableDataSource(response?.data?.user_roster || []);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
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

  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
  }

  onChangeShiftDate() {
    this.getRosterDetailsByDate(this.shiftDate);
  }

  getRosterDetailsByDate(shiftDate) {
    this.officeWorkTimeService.getRosterDetailsByDate(shiftDate).subscribe({
      next: (response:any) => {
        this.employeeShiftTimingList = new MatTableDataSource(response?.user_roster || []);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    })
  }
}
