import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { observable, Observable, Subject } from 'rxjs';
import { Department } from '../model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentList = new Subject<Department[]>();
  departments!: Department[];


  server = 'http://localhost:3000/';
  constructor(
    private http: HttpClient
  ) {
  }


  getDepartment() {
    return this.http.get<Department[]>(this.server + 'department').subscribe(
      data => {
        this.departments = data;
        this.departmentList.next(data);
      }
    );
  }

  addDepartment() {
    let d = {
      name: "管理部",
      sort: 6,
      printSort: null
    }

    return this.http.post<Department>(this.server + 'department', d).subscribe(
      (department: Department) => {
        this.departments.push(department);
        this.departmentList.next(this.departments);
      }
    );
  }

}
