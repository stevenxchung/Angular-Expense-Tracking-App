import { Injectable } from '@angular/core';
// Allow data sharing between components
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable()

export class DataService {

  private dB = new BehaviorSubject<any>(
    [
      {expenseGroup: "Food", expenseName: "New Water", expenseAmount: 89.99, timeStamp: "1993-09-29"},
      {expenseGroup: "Utilities", expenseName: "Water", expenseAmount: 69.99, timeStamp: "1993-09-29"},
      {expenseGroup: "Gas", expenseName: "Gas", expenseAmount: 18.75, timeStamp: "1993-09-30"},
      {expenseGroup: "Utilities", expenseName: "Internet", expenseAmount: 49.99, timeStamp: "1993-10-01"},
      {expenseGroup: "Gas", expenseName: "Gas", expenseAmount: 21.50, timeStamp: "1993-10-10"},
      {expenseGroup: "Utilities", expenseName: "Electric", expenseAmount: 150.35, timeStamp: "1993-10-05"},
      {expenseGroup: "Gas", expenseName: "Gas", expenseAmount: 24.52, timeStamp: "1993-10-18"}
    ]
  );
  expense = this.dB.asObservable();

  constructor() { }

  updateDB(data) {
    this.dB.next(data)
  }

}
