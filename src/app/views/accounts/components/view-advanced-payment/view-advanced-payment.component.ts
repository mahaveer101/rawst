import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-advanced-payment',
  templateUrl: './view-advanced-payment.component.html',
  styleUrls: ['./view-advanced-payment.component.scss']
})
export class ViewAdvancedPaymentComponent implements OnInit {
installmentRecords :any;
displayedColumns=[
  'installment_month',
  'installment_amount',
  'status'
]
  constructor(
    public dialogRef: MatDialogRef<ViewAdvancedPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
    this.installmentRecords =this.data
  }

}
