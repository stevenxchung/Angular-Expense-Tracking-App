import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  expenses: any;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.expense.subscribe(res => this.expenses = res);
    // console.log(this.expenses);
  }

}
