import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ProfileService } from '../profile.service';
import { Expense } from '../expense.model';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  // Object store
  profileList: Profile[];
  expenseList: Expense[];

  // Initial total values for food, gas, utilities, and other expenses respectively
  arr = [0, 0, 0, 0];

  constructor(private router: Router, public dataService: DataService, public profileService: ProfileService) { }

  ngOnInit() {
    // Load profiles
    // On app load, will grab data from the firebase database "profiles" and load them onto the Profile[] array
    let summaryX1 = this.profileService.getData();
    summaryX1.snapshotChanges().subscribe(item => {
      this.profileList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;
        this.profileList.push(y as Profile);
      });
      this.onSelect('Demo Expenses');
      console.log(this.profileList);
    });
  }

  onSelect(profileName) {
    console.log("onSelect Triggered!");
    // Must reset array
    this.arr = [0, 0, 0, 0];

    // Grab data from Firebase
    let summaryX2 = this.dataService.getData(profileName);
    summaryX2.snapshotChanges().subscribe(item => {
      this.expenseList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;
        this.expenseList.push(y as Expense);
        this.expenseList.sort((a, b) => +new Date(b.timeStamp) - +new Date(a.timeStamp));
      });
      // Debug Chart.js rendering
      // console.log("Inside subscribe " + this.expenseList);
      buildArr(this.expenseList); // Strange resize render bug here
    });

    // Debug Chart.js rendering
    // setTimeout(() => {
    //   console.log("Delayed expenseList " + this.expenseList);
    //   console.log("Delayed this.arr " + this.arr);
    // }, 5000);

    let buildArr = (x) => {
      // Loop through the expenses database
      for (var i = 0; i < x.length; i++) {
        // If the expenseGroup in object 'i' matches, add that expense amount
        // to a particular slot in the arr above
        if (x[i].expenseGroup === "Food [$]") {
          this.arr[0] += x[i].expenseAmount;
        } else if (x[i].expenseGroup === "Gas [$]") {
          this.arr[1] += x[i].expenseAmount;
        } else if (x[i].expenseGroup === "Utilities [$]") {
          this.arr[2] += x[i].expenseAmount;
        } else {
          this.arr[3] += x[i].expenseAmount;
        }
      }
      // Check outcome
      // console.log("Inside BuildArr() " + this.arr);
    }

    // Debug Chart.js rendering
    // console.log("Non-delayed expenseList " + this.expenseList);
    // console.log("Non-delayed this.arr " + this.arr);

    // Change dataset on click, add delay to allow array to process
    setTimeout(() => {
      let _doughnutChartData:Array<any> = new Array(this.doughnutChartData.length);
      for (let i = 0; i < this.doughnutChartData.length; i++) {
          _doughnutChartData[i] = this.arr[i];
        }
      this.doughnutChartData = _doughnutChartData;
    }, 100);
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

  public randomize():void {
    let _doughnutChartData:Array<any> = new Array(this.doughnutChartData.length);
    for (let i = 0; i < this.doughnutChartData.length; i++) {
        _doughnutChartData[i] = Math.floor((Math.random() * 100) + 1);
      }
    this.doughnutChartData = _doughnutChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
