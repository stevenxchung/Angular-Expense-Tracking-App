import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Expense } from '../expense.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  // Use expenseList to store objects in an array
  expenseList: Expense[];
  summaryList: any;

  // Initial total values for food, gas, utilities, and other expenses respectively
  arr = [0, 0, 0, 0];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    // Grab data from Firebase
    let x = this.dataService.getData();
    x.snapshotChanges().subscribe(item => {
      this.expenseList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;
        this.expenseList.push(y as Expense);
        this.expenseList.sort((a, b) => +new Date(b.timeStamp) - +new Date(a.timeStamp));
      });
      // console.log(this.expenseList);
    });

    // Loop through the expenses database
    for (var i = 0; i < this.expenseList.length; i++) {
      // If the expenseGroup in object 'i' matches, add that expense amount
      // to a particular slot in the arr above
      if (this.expenseList[i].expenseGroup === "Food [$]") {
        this.arr[0] += this.expenseList[i].expenseAmount;
      } else if (this.expenseList[i].expenseGroup === "Gas [$]") {
        this.arr[1] += this.expenseList[i].expenseAmount;
      } else if (this.expenseList[i].expenseGroup === "Utilities [$]") {
        this.arr[2] += this.expenseList[i].expenseAmount;
      } else {
        this.arr[3] += this.expenseList[i].expenseAmount;
      }
    }
    // Check outcome
    console.log(this.arr);

  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Food [$]', 'Gas [$]', 'Utilities [$]', 'Other [$]'];
  public doughnutChartData:number[] = this.arr;
  public doughnutChartType:string = 'doughnut';

  public doughnutChartColors:Array<any> = [
    {
      // Same colors as on trends component
      backgroundColor: [
        'rgba(0,255,0,0.75)',
        'rgba(255,0,0,0.75)',
        'rgba(0,0,255,0.75)',
        'rgba(127,0,255,0.75)'
      ],
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
