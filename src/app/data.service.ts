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

}
