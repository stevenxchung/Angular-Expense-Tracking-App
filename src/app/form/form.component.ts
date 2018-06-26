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
  group: string;
  name: string = 'Water';
  amount: number = 69.99;
  date: string = '1993-09-29';
  formDB = [];

  public newExp: Expense;

  constructor(private dataService: DataService) { }

  // Called after data-bound properties of a directive are initialized
  ngOnInit() {
    this.itemCount = this.formDB.length;
    this.dataService.expense.subscribe(res => this.formDB = res);
    this.dataService.updateDB(this.formDB);
  }

  // Add expense to recent expenses
  addExpense() {
    // Create a new object
    this.newExp = new Expense();
    // Set the group, name, and amount for this new object equal to what is submitted on the form
    this.newExp.expenseGroup = this.group;
    this.newExp.expenseName = this.name;
    this.newExp.expenseAmount = this.amount;
    // Date of actual purchase
    this.newExp.timeStamp = this.date;


    // Add the newly created object to the formDB array
    this.formDB.unshift(this.newExp);
    console.log(this.formDB);

    // Reset values after submit
    this.name = '';
    this.amount = 0;
    this.itemCount = this.formDB.length;
    this.dataService.updateDB(this.formDB);
  }

}
// Expense blueprint
export class Expense {
  expenseGroup: string;
  expenseName: string;
  expenseAmount: number;
  timeStamp: string;
}
