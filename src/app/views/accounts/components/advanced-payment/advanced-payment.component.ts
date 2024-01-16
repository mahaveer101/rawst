import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvancedPaymentService } from './advanced-payment.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddAdvancePaymentComponent } from '../add-advance-payment/add-advance-payment.component';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ViewAdvancedPaymentComponent } from '../view-advanced-payment/view-advanced-payment.component';

@Component({
  selector: 'app-advanced-payment',
  templateUrl: './advanced-payment.component.html',
  styleUrls: ['./advanced-payment.component.scss'],
  animations: egretAnimations,
})
export class AdvancedPaymentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  advancedPaymentList = new MatTableDataSource();
  response: any;
  displayedColumns = [
    'payment_to',
    'payment_amount',
    'installment_amount',
    'start_month',
    'actions'
  ];

  constructor(
    private advancedPaymentService: AdvancedPaymentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAdvancedPayment();
  }

  getAdvancedPayment() {
    this.advancedPaymentService.getAdvancedPayment().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.advancedPaymentList = new MatTableDataSource(response?.advance_payments);
      this.advancedPaymentList.paginator = this.paginator;
    });
  }

  getPaymentTo(id) {
    const user = this.response.users.find(each => +each.id === +id);
    return user?.name;
  }

  addAdvancePayment() {
    const dialogRef = this.dialog.open(AddAdvancePaymentComponent,
      {
        width: '500px',
        data: this.response || {}
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAdvancedPayment();
      }
    });
  }

  viewAdvancePaymentDetails(installmentRecords) {
    this.dialog.open(ViewAdvancedPaymentComponent,
      {
        width: '500px',
        data: installmentRecords
      }
    );
  }

  public toFloat(value: string): number {
    if (!value) {
      return 0;
    }
    return parseFloat(value.replace(/,/g, ''));
  }


}