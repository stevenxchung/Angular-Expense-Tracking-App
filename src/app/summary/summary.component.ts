import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  expenses: any;
  // Initial total values for food, gas, utilities, and other expenses respectively
  arr = [0, 0, 0, 0];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.expense.subscribe(res => this.expenses = res);
    console.log(this.expenses);

    // Use map() to find the totals for each
    for (var i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].expenseGroup === "Food [$]") {
        this.arr[0] += this.expenses[i].expenseAmount;
      } else if (this.expenses[i].expenseGroup === "Gas [$]") {
        this.arr[1] += this.expenses[i].expenseAmount;
      } else if (this.expenses[i].expenseGroup === "Utilities [$]") {
        this.arr[2] += this.expenses[i].expenseAmount;
      } else {
        this.arr[3] += this.expenses[i].expenseAmount;
      }
    }
    console.log(this.arr);

  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Food [$]', 'Gas [$]', 'Utilities [$]', 'Other [$]'];
  public doughnutChartData:number[] = this.arr;
  public doughnutChartType:string = 'doughnut';

  public doughnutChartColors:Array<any> = [
    {
      backgroundColor: ['rgba(0,255,0,0.75)', 'rgba(255,0,0,0.75)', 'rgba(0,0,255,0.75)', 'rgba(127,0,255,0.75)'],
      borderColor: 'white'
    }
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
