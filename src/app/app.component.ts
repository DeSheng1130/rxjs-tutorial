import { Component } from '@angular/core';
import { pipe, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Department } from './model/department.model';
import { DepartmentService } from './services/department.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;

  dAll: Department[] = [];

  dNP: Department[] = [];


  constructor(
    private _departmentService: DepartmentService,

  ) {




    this.subscription = this._departmentService.departmentList.pipe(
    ).subscribe(
      (department: Department[]) => {
        console.log("++++++++++++++++++++++++++++++");
        console.log(department);
        console.log("++++++++++++++++++++++++++++++");
        this.dAll = department;
        this.dNP = this.dAll.filter(
          d => {
            return d.printSort != null
          }
        );
      }
    )



  }


  go() {
    this._departmentService.getDepartment();

  }

  add() {
    this._departmentService.addDepartment();
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }



}
