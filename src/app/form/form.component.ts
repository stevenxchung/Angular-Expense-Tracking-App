import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Expense } from '../expense.model';
import { ToastrService } from 'ngx-toastr';
// Import animations
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [
    trigger('formDB', [
        transition('* => *', [
            query(':enter', style({ opacity: 0}), {optional: true}),

            // Animation when adding an element to the list
            query(':enter', stagger('300ms', [
              animate('.6s ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
                style({opacity: 1, transform: 'translateY(0)', offset: 1}),

              ]))
            ]), {optional: true}),

            // Animation when removing an element from the list
            query(':leave', stagger('300ms', [
              animate('.6s ease-in', keyframes([
                style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
                style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),

              ]))
            ]), {optional: true})
        ])
    ])
  ]
})
export class FormComponent implements OnInit {
  // Use expenseList to store objects in an array
  expenseList: Expense[];

  constructor(private dataService: DataService, private toastr: ToastrService) { }

  // Called after data-bound properties of a directive are initialized
  ngOnInit() {
    // On app load, will grab data from the firebase database "expenses" and load them onto the Expense[] array
    let x = this.dataService.getData();
    x.snapshotChanges().subscribe(item => {
      this.expenseList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;
        this.expenseList.push(y as Expense);
        this.expenseList.sort((a, b) => +new Date(b.timeStamp) - +new Date(a.timeStamp));
      });
    });
    this.resetForm();
  }

  // Add expense to recent expenses
  onSubmit(expenseForm: NgForm) {
    if (expenseForm.value.$key == null) {
      this.dataService.insertExpense(expenseForm.value);
    } else {
      this.dataService.updateExpense(expenseForm.value);
    }
    this.resetForm(expenseForm);
    this.toastr.success('Submitted Successfully', 'Expense Form');
    console.log("Success!");
  }

  // Reset form to empty or null values
  resetForm(expenseForm?: NgForm) {
    if (expenseForm !== null) {
      expenseForm.reset();
      this.dataService.selectedExpense = {
        $key: null,
        expenseGroup: '',
        expenseName: '',
        expenseAmount: null,
        timeStamp: ''
      }
    }
  }

  // Edit Entry
  onEdit(expense: Expense) {
    // Use Object.assign() to make a copy of object (prevents modifying original data in real-time due to two-way-binding)
    this.dataService.selectedExpense = Object.assign({}, expense);
  }

  // Remove and item from the list
  onDelete(key: string) {
    if (confirm("Are you sure you want to delete this entry?") == true) {
      this.dataService.deleteExpense(key);
      this.toastr.warning('Deleted Successfully', 'Expense Form');
    }
  }

}
