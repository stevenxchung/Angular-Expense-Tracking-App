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

  // Add line chart from BriteCharts
  // public singleLineChartData = { "dataByTopic": [{ "topic": -1, "topicName": "Quantity", "dates": [{ "date": "2016-07-31T07:00:00.000Z", "value": 0, "fullDate": "2016-07-31T00:00:00-07:00" }, { "date": "2016-08-01T07:00:00.000Z", "value": 0, "fullDate": "2016-08-01T00:00:00-07:00" }, { "date": "2016-08-02T07:00:00.000Z", "value": 3, "fullDate": "2016-08-02T00:00:00-07:00" }, { "date": "2016-08-03T07:00:00.000Z", "value": 1, "fullDate": "2016-08-03T00:00:00-07:00" }, { "date": "2016-08-04T07:00:00.000Z", "value": 3, "fullDate": "2016-08-04T00:00:00-07:00" }, { "date": "2016-08-05T07:00:00.000Z", "value": 3, "fullDate": "2016-08-05T00:00:00-07:00" }, { "date": "2016-08-06T07:00:00.000Z", "value": 0, "fullDate": "2016-08-06T00:00:00-07:00" }, { "date": "2016-08-07T07:00:00.000Z", "value": 1, "fullDate": "2016-08-07T00:00:00-07:00" }, { "date": "2016-08-08T07:00:00.000Z", "value": 1, "fullDate": "2016-08-08T00:00:00-07:00" }, { "date": "2016-08-09T07:00:00.000Z", "value": 0, "fullDate": "2016-08-09T00:00:00-07:00" }, { "date": "2016-08-10T07:00:00.000Z", "value": 3, "fullDate": "2016-08-10T00:00:00-07:00" }, { "date": "2016-08-11T07:00:00.000Z", "value": 4, "fullDate": "2016-08-11T00:00:00-07:00" }, { "date": "2016-08-12T07:00:00.000Z", "value": 4, "fullDate": "2016-08-12T00:00:00-07:00" }, { "date": "2016-08-13T07:00:00.000Z", "value": 2, "fullDate": "2016-08-13T00:00:00-07:00" }, { "date": "2016-08-14T07:00:00.000Z", "value": 3, "fullDate": "2016-08-14T00:00:00-07:00" }, { "date": "2016-08-15T07:00:00.000Z", "value": 0, "fullDate": "2016-08-15T00:00:00-07:00" }, { "date": "2016-08-16T07:00:00.000Z", "value": 1, "fullDate": "2016-08-16T00:00:00-07:00" }, { "date": "2016-08-17T07:00:00.000Z", "value": 0, "fullDate": "2016-08-17T00:00:00-07:00" }, { "date": "2016-08-18T07:00:00.000Z", "value": 2, "fullDate": "2016-08-18T00:00:00-07:00" }, { "date": "2016-08-19T07:00:00.000Z", "value": 5, "fullDate": "2016-08-19T00:00:00-07:00" }, { "date": "2016-08-20T07:00:00.000Z", "value": 1, "fullDate": "2016-08-20T00:00:00-07:00" }, { "date": "2016-08-21T07:00:00.000Z", "value": 2, "fullDate": "2016-08-21T00:00:00-07:00" }, { "date": "2016-08-22T07:00:00.000Z", "value": 9, "fullDate": "2016-08-22T00:00:00-07:00" }, { "date": "2016-08-23T07:00:00.000Z", "value": 4, "fullDate": "2016-08-23T00:00:00-07:00" }, { "date": "2016-08-24T07:00:00.000Z", "value": 3, "fullDate": "2016-08-24T00:00:00-07:00" }, { "date": "2016-08-25T07:00:00.000Z", "value": 2, "fullDate": "2016-08-25T00:00:00-07:00" }, { "date": "2016-08-26T07:00:00.000Z", "value": 5, "fullDate": "2016-08-26T00:00:00-07:00" }] }] };
  // public singleLineChartConfig = {
  //   properties: {
  //     height: 500,
  //     tooltipThreshold: 600,
  //     grid: 'full',
  //     lineCurve: 'basis',
  //     topicNameLabel: "topic",
  //     dateLabel: "fullDate",
  //     valueLabel: "value",
  //   },
  //   click: this.lineChartClick,
  //   showTooltip: true,
  //   tooltip: {
  //     valueLabel: 'value',
  //     title: 'Quantity Sold'
  //   }
  // };

  // private lineChartClick($ev, d, m) {
  //   console.log($ev, d, m);
  // }

}
