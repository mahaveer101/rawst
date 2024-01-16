import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { GradesListService } from './grades-list.service';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss'],
  animations: egretAnimations
})
export class GradesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  response: any;
  gradesList: any;
  displayedColumns = [
    'emp_no',
    'name',
    'phone',
    'designation_name',
    'actions'
  ];

  constructor(
    private gradesListService: GradesListService,
    private router: Router
  ) { }

  getGradesList() {
    this.gradesListService.getGradesList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.gradesList = new MatTableDataSource(response.user_list);
      this.gradesList.paginator = this.paginator;
    });
  }

  viewGradesDetails(id) {
    this.router.navigate(['/accounts/grades-view'], {
      queryParams: {
        id
      }
    });
  }

  ngOnInit(): void {
    this.getGradesList();
  }

}
