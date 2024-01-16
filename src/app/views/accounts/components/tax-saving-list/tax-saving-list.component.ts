import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AddTaxSavingFormComponent } from '../add-tax-saving-form/add-tax-saving-form.component';
import { TaxSavingListService } from './tax-saving-list.service';
import { TaxSavingApproveComponent } from '../tax-saving-approve/tax-saving-approve.component';
import { AddHouseRentComponent } from '../add-house-rent/add-house-rent.component';
import { AddHouseRentDocumentComponent } from '../add-house-rent-document/add-house-rent-document.component';

@Component({
  selector: 'app-tax-saving-list',
  templateUrl: './tax-saving-list.component.html',
  styleUrls: ['./tax-saving-list.component.scss'],
  animations: egretAnimations
})
export class TaxSavingListComponent implements OnInit {
  @ViewChild('taxPaginator') taxPaginator: MatPaginator;
  @ViewChild('houseRentPaginator') houseRentPaginator: MatPaginator;
  taxSavingList: any;
  houseRentList: any;
  response: any;
  houseRentResponse: any;
  errorMessage: '';
  searchValue: any;
  displayedColumns = [
    'user_id',
    'saving_type',
    'saving_year',
    'amount',
    'approveAmount',
    'documents',
    'status',
    'actions'
  ];

  displayedColumnsHouseRent =[
    'user_name',
    'rent',
    'from_year_month',
    'to_year_month',
    'city',
    'finacial_year',
    'documents',
    'actions'
  ]

  constructor(
    private taxSavingListService: TaxSavingListService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tabChanged({ index: 0 });
  }

  tabChanged(event) {
    if (event.index === 0) {
      this.getTaxSavingList();
    } else {
      this.getHouseRentList()
    }
  }

  getTaxSavingList() {
    this.taxSavingListService.getTaxSavingList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.taxSavingList = new MatTableDataSource(response.tax_saving);
      this.taxSavingList.paginator = this.taxPaginator;
    });
  }

  getHouseRentList() {
    this.taxSavingListService.getHouseRentList().subscribe((houseRentResponse: any) => {
      this.houseRentResponse = structuredClone(houseRentResponse);
      this.houseRentList = new MatTableDataSource(houseRentResponse.users_house_rent);
      this.houseRentList.paginator = this.houseRentPaginator;
    });
  }

  viewDocument(url) {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,left=200,width=500,height=500");
  }

  viewDocumentHouseRent(url) {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,left=200,width=500,height=500");
  }

  addTaxSaving() {
    const dialogRef = this.dialog.open(AddTaxSavingFormComponent,
      {
        width: '500px',
        data: this.response || {}
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getTaxSavingList();
      }
    });
  }

  addHouseRent() {
    const dialogRef = this.dialog.open(AddHouseRentComponent,
      {
        width: '500px',
        data: {
          users: this.response.users || [],
          isAdd: true
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getHouseRentList();
      }
    });
  }

  updateHouseRent(rowData) {
    const dialogRef = this.dialog.open(AddHouseRentComponent,
      {
        width: '500px',
        data: {
          users: this.response.users || [],
          rowData,
          isEdit: true
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getHouseRentList();
      }
    });
  }

  onSearchValue() {
    this.taxSavingListService.getTaxSavingSearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.taxSavingList = new MatTableDataSource(response.tax_saving);
        this.taxSavingList.paginator = this.taxPaginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onHouseRentSearchValue() {
    this.taxSavingListService.getHouseRentSearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.houseRentList = new MatTableDataSource(response);
        this.houseRentList.paginator = this.houseRentPaginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getTaxSavingList();
  }

  clearHouseRentSearchValue() {
    this.searchValue = '';
    this.getHouseRentList();
  }

  getUser(id) {
    const user = this.response.users_house_rent.find(each => +each.id === +id);
    return user?.name;
  }

  updateStatus(row) {
    const dialogRef = this.dialog.open(TaxSavingApproveComponent,
      {
        width: '500px',
        data: {
          row,
          isApprove: true
        }
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getTaxSavingList();
    });
  }

  updateAmount(row) {
    const dialogRef = this.dialog.open(TaxSavingApproveComponent,
      {
        width: '500px',
        data: {
          row,
          isEdit: true
        }
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getTaxSavingList();
    });
  }

  openRejectConfirmation(taxSavingId: string, templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.taxSavingListService.updateTaxSavingRejectStatus(taxSavingId).subscribe({
          next: (response: any) => {
            this.getTaxSavingList();
          }
        })
      }
    });
  }

  updateHouseRentDocument(rowData){
    const dialogRef = this.dialog.open(AddHouseRentDocumentComponent,
      {
        width: '500px',
        data: {
           rowData     
        }
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getHouseRentList();
    });
  }

}
