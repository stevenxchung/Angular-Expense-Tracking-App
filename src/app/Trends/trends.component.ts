import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  // Use expenseList to store objects in an array
  expenseList: Expense[];

  // New array format for the trend plot
  arr = [
    {data: [], label: 'Food [$]'},
    {data: [], label: 'Gas [$]'},
    {data: [], label: 'Utilities [$]'},
    {data: [], label: 'Other [$]'}
  ];
  dateDB = [];

  constructor(private router: Router, public dataService: DataService) { }

  ngOnInit() {
    // Grab data from Firebase
    var x = this.dataService.getData();
    x.snapshotChanges().subscribe(item => {
      this.expenseList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;
        this.expenseList.push(y as Expense);
      });
      // Debug Chart.js rendering
      console.log("Inside subscribe " + this.expenseList);
      // Build chart
      buildChart(this.expenseList);
      // Resort array
      this.expenseList.sort((a, b) => +new Date(b.timeStamp) - +new Date(a.timeStamp));
    });

    // This will break down each object in the expenseList array and push into a new array format
    let buildChart = (e) => {
      // Sort by date
      this.expenseList.sort((a, b) => +new Date(a.timeStamp) - +new Date(b.timeStamp));
      // console.log(this.expenseList);

      // Add dates, do not duplicate
      this.expenseList.map(e => {
        // Check if timestamp already exists, if not add to DB
        if (this.dateDB.indexOf(e.timeStamp) === -1)
          this.dateDB.push(e.timeStamp)
      });

      // Loop through each element in the arr database
      for (var x = 0; x < this.arr.length; x++) {
        // Loop through each element in dateDB (sorted)
        for (var y = 0; y < this.dateDB.length; y++) {
          // Prefill the data arrays
          this.arr[x].data.push(0);
          // Loop through each element in expenses
          for (var z = 0; z < this.expenseList.length; z++) {
            // Check if the label matches
            if (this.expenseList[z].expenseGroup === this.arr[x].label) {
              // Check if the timestamp matches
              if (this.expenseList[z].timeStamp === this.dateDB[y]) {
                this.arr[x].data[y] = this.expenseList[z].expenseAmount;
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
      // Check outcome
      console.log(this.arr);
    }

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
