import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AddHouseRentComponent } from '../add-house-rent/add-house-rent.component';
import { AddTaxSavingComponent } from '../add-tax-saving/add-tax-saving.component';
import { EditTaxDeclarationFormComponent } from '../edit-tax-declaration-form/edit-tax-declaration-form.component';
import { TaxService } from './tax.service';
import { CurrencyPipe } from '@angular/common';
import { FilesService } from 'app/shared/services/files/files.service';
@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
  providers: [CurrencyPipe],
  animations: egretAnimations
})
export class TaxComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  response: any;
  houseRentResponse: any;
  myTaxResponse: any;
  grossEarnings = {
    headers: [],
    data: []
  };
  monthlyTaxData = {
    headers: [],
    data: []
  };
  taxSavings: any;
  houseRent: any;
  taxSavingOptions: any;
  myTaxSavingOptions: any;
  myTaxSlab: any;
  taxSavingDisplayedColumns = [
    'saving_year',
    'option_name',
    'description',
    'amount',
    'approveAmount',
    'documents',
    'status',
    'actions'
  ];
  taxSavingOptionsDisplayedColumns = [
    'option_name',
    'description',
    'max_limit'
  ];
  houseRentDisplayedColumns = [
    'rent',
    'from_year_month',
    'to_year_month',
    'city',
    'financial_year',
    'users_house_rent_docs_records'
  ];
  myTaxSavingDisplayedColumns = [
    'option_name',
    'description',
    'amount'
  ];
  myTaxSlabDisplayColumns = [
    'income_slab',
    'tax'
  ];
  errorMessage = '';
  constructor(
    private taxService: TaxService,
    public dialog: MatDialog,
    private cp: CurrencyPipe,
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
    this.tabChanged({ index: 0 });
  }

  tabChanged(event) {
    if (event.index === 0) {
      this.getMyTaxDetails();
    } else {
      this.getTaxDetails();
      this.getHouseRentDetails();
    }
  }

  getTaxDetails() {
    this.taxService.getTaxDetails().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.taxSavings = new MatTableDataSource(response.tax_saving);
      this.taxSavings.paginator = this.paginator;
      this.taxSavingOptions = new MatTableDataSource(response.tax_saving_options);
    });
  }

  viewDocument(url) {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,left=200,width=500,height=500");
  }

  public toFloat(value: string): number {
    if (!value) {
      return 0;
    }
    return parseFloat(value.replace(/,/g, ''));
  }

  editDeclaration(rowData) {
    console.log(rowData);
    const dialogRef = this.dialog.open(EditTaxDeclarationFormComponent,
      {
        width: '500px',
        data: rowData
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getTaxDetails();
      }
    });
  }
  addTaxDeclaration() {
    const dialogRef = this.dialog.open(AddTaxSavingComponent,
      {
        width: '500px',
        data: this.response
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getTaxDetails();
      }
    });
  }

  addHouseRent() {
    const dialogRef = this.dialog.open(AddHouseRentComponent,
      {
        width: '500px',
        data: this.response
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getHouseRentDetails();
      }
    });
  }

  getHouseRentDetails() {
    this.taxService.getHouseRentDetails().subscribe((response: any) => {
      this.houseRentResponse = structuredClone(response);
      this.houseRent = new MatTableDataSource(response.users_house_rent);
      this.houseRent.paginator = this.paginator;
    });
  }

  getMyTaxDetails() {
    this.taxService.getMyTaxDetails().subscribe((response: any) => {
      this.myTaxResponse = structuredClone(response);
      this.grossEarnings = this.getPreparedGrossEarnings(response?.monthly_salary || {});
      this.myTaxSavingOptions = new MatTableDataSource(response.savings);
      this.myTaxSlab = new MatTableDataSource(response.tax_data);
      this.monthlyTaxData = this.getMonthlyTaxData(response?.monthly_tax_data || {})
    });
  }

  getPreparedGrossEarnings(monthly_salary) {
    const salaryBreakups = [
      {
        text: 'Basic',
        key: 'basic'
      },
      {
        text: 'HRA',
        key: 'hra'
      },
      {
        text: 'Conveyance',
        key: 'conv'
      },
      {
        text: 'Other',
        key: 'other'
      }
    ];

    const grossEarnings = {
      headers: ['Breakup', ...Object.keys(monthly_salary)],
      data: []
    };

    for (let each of salaryBreakups) {
      let eachType = [each.text];
      for (let eachKey in monthly_salary) {
        if (eachKey !== 'Total') {
          let eachObj = monthly_salary[eachKey];
          eachType.push(this.cp.transform(this.toFloat(eachObj[each.key]), 'INR', 'symbol'));
        }
      }
      eachType.push(this.cp.transform(monthly_salary.Total[each.key], 'INR', 'symbol'));
      grossEarnings.data.push(eachType);
    }
    return grossEarnings;
  }

  getMonthlyTaxData(monthly_tax_data) {
    return ({
      headers: [...Object.keys(monthly_tax_data)],
      data: [...Object.keys(monthly_tax_data).map(key => monthly_tax_data[key])]
    });
  }

  downloadForm16PartA() {
    this.errorMessage='';
    this.taxService.getForm16PartADownloadData().subscribe({
      next: (response: any) => {
        if (response.file) {
          this.filesService.downloadFile(response?.file, `form16_part-A`);
        }
        else {
          this.errorMessage = 'Form-16 part A is not available';
        }

      }
    })
  }

  downloadForm16PartB() {
    this.errorMessage = '';
    this.taxService.getForm16PartBDownloadData().subscribe({
      next: (response: any) => {
        if (response.file) {
          this.filesService.downloadFile(response?.file, `form16_part-B`);
        }
        else {
          this.errorMessage = 'Form-16 Part B is not available';
        }
      }
    })
  }
}