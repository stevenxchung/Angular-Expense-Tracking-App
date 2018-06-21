import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // Initialize types
  itemCount: number;
  expenseName: string;
  expenseAmount: number;
  formDB = [];

  constructor(private dataService: DataService) { }

  // Called after data-bound properties of a directive are initialized
  ngOnInit() {
    this.itemCount = this.formDB.length;
    this.dataService.expense.subscribe(res => this.formDB = res);
    this.dataService.updateDB(this.formDB);
  }

  // Add expense (just the name for now) to recent expenses
  addExpense() {
    this.formDB.unshift(this.expenseName);
    this.itemCount = this.formDB.length;
    this.dataService.updateDB(this.formDB);
  }

}
