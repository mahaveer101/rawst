import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Form16Service } from './form16.service';

@Component({
  selector: 'app-form16',
  templateUrl: './form16.component.html',
  styleUrls: ['./form16.component.scss'],
  animations: egretAnimations
})
export class Form16Component implements OnInit {
  filePartA: File;
  fileNamePartA: any;
  errorMessagePartA = '';
  filePartB: File;
  fileNamePartB: any;
  errorMessagePartB = '';

  constructor(
    private form16Service: Form16Service
  ) { }

  ngOnInit(): void {
  }

  onfileChangedFormA(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.filePartA = selectedFile;
      this.fileNamePartA = selectedFile.name;
    }
  }

  removeSelectedFilePartA() {
    this.filePartA = null;
    this.fileNamePartA = null;
  }

  submitForm16FormA() {
    this.errorMessagePartA = '';
    this.form16Service.submitForm16FormA(this.filePartA).subscribe({
      next: () => {
        this.filePartA = null;
        this.fileNamePartA = null;
      }, 
      error: (error) => {
        this.errorMessagePartA = error?.error?.message;
      }
    });
  }

  onfileChangedFormB(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.filePartB = selectedFile;
      this.fileNamePartB = selectedFile.name;
    }
  }

  removeSelectedFilePartB() {
    this.filePartB = null;
    this.fileNamePartB = null;
  }

  submitForm16FormB() {
    this.errorMessagePartB = '';
    this.form16Service.submitForm16FormB(this.filePartB).subscribe({
      next: () => {
        this.filePartB = null;
        this.fileNamePartB = null;
      }, 
      error: (error) => {
        this.errorMessagePartB = error?.error?.message;
      }
    });
  }
}
