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
  arr = [
    {data: [], label: 'Food'},
    {data: [], label: 'Gas'},
    {data: [], label: 'Utilities'},
    {data: [], label: 'Other'}
  ];
  itemDB = [];
  priceDB = [];
  dateDB = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.expense.subscribe(res => this.expenses = res);
    // console.log(this.expenses);
    // Create separate arrays for each item, price, and date
    // (might be a better way to do this, open to suggestions)
    this.expenses.map(e => this.itemDB.push(e.expenseName));
    this.expenses.map(e => this.priceDB.push(e.expenseAmount));

    // Sort by date
    this.expenses.sort((a, b) => +new Date(a.timeStamp) - +new Date(b.timeStamp));
    console.log(this.expenses);

    // Add dates, do not duplicate
    this.expenses.map(e => {
      // Check if timestamp already exists, if not add to DB
      if (this.dateDB.indexOf(e.timeStamp) === -1)
        this.dateDB.push(e.timeStamp)
    });

    // Loop through each element in the arr database
    for (var k = 0; k < this.arr.length; k++) {
      // Loop through each element in dateDB (sorted)
      for (var i = 0; i < this.dateDB.length; i++) {
        // Prefill the data arrays
        this.arr[k].data.push(0);
        // Loop through each element in expenses
        for (var j = 0; j < this.expenses.length; j++) {
          // Check if the label matches
          if (this.expenses[j].expenseGroup === this.arr[k].label) {
            // Check if the timestamp matches
            if (this.expenses[j].timeStamp === this.dateDB[i]) {
              this.arr[k].data[i] = this.expenses[j].expenseAmount;
            } else {
              continue;
            }
          } else {
            // Else, continue to the next expense
            continue;
          }
        }
      }
    }
    console.log(this.arr);

  }

  // Add line chart from ng2-charts
  public lineChartData:Array<any> = this.arr;

  public lineChartLabels:Array<any> = this.dateDB;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // Green
      backgroundColor: 'rgba(0,255,0,0.25)',
      borderColor: 'rgba(0,255,0,1)',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Red
      backgroundColor: 'rgba(255,0,0,0.25)',
      borderColor: 'rgba(255,0,0,1)',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // Blue
      backgroundColor: 'rgba(0,0,255,0.25)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Violet
      backgroundColor: 'rgba(127,0,255,0.25)',
      borderColor: 'rgba(127,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
