import { Injectable } from '@angular/core';
// Allow data sharing between components
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// Expense model
import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // private dB = new BehaviorSubject<any>(
  //   [
  //     {expenseGroup: "Food [$]", expenseName: "New Water", expenseAmount: 89.99, timeStamp: "1993-09-29"},
  //     {expenseGroup: "Utilities [$]", expenseName: "Water", expenseAmount: 69.99, timeStamp: "1993-09-29"},
  //     {expenseGroup: "Gas [$]", expenseName: "Gas", expenseAmount: 18.75, timeStamp: "1993-09-30"},
  //     {expenseGroup: "Utilities [$]", expenseName: "Internet", expenseAmount: 49.99, timeStamp: "1993-10-01"},
  //     {expenseGroup: "Gas [$]", expenseName: "Gas", expenseAmount: 21.50, timeStamp: "1993-10-10"},
  //     {expenseGroup: "Utilities [$]", expenseName: "Electric", expenseAmount: 150.35, timeStamp: "1993-10-05"},
  //     {expenseGroup: "Gas [$]", expenseName: "Gas", expenseAmount: 24.52, timeStamp: "1993-10-18"},
  //     {expenseGroup: "Other [$]", expenseName: "Concert", expenseAmount: 175.42, timeStamp: "1993-11-10"}
  //   ]
  // );
  // expense = this.dB.asObservable();

  expenseList: AngularFireList<any>;
  selectedExpense: Expense = new Expense();
  constructor(private firebase: AngularFireDatabase) { }

  // READ
  getData() {
    this.expenseList = this.firebase.list('expenses');
    return this.expenseList;
  }

  // CREATE
  insertExpense(expense: Expense) {
    this.expenseList.push({
      expenseGroup: expense.expenseGroup,
      expenseName: expense.expenseName,
      expenseAmount: expense.expenseAmount,
      timeStamp: expense.timeStamp
    });
  }

  // UPDATE
  updateExpense(expense: Expense) {
    this.expenseList.update(expense.$key,
      {
        expenseGroup: expense.expenseGroup,
        expenseName: expense.expenseName,
        expenseAmount: expense.expenseAmount,
        timeStamp: expense.timeStamp
      });
  }

  // DELETE
  deleteExpense($key: string) {
    this.expenseList.remove($key);
  }

  // updateDB(data) {
  //   this.dB.next(data)
  // }

}
