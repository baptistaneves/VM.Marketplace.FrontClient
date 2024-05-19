import { Component, OnInit } from '@angular/core';
import { linewithDataChart, OrderCountChart } from './data';
import { ChartType } from './sales.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})

// Sales Component
export class SalesComponent implements OnInit {
  linewithDataChart!: ChartType;
  OrderCountChart!: ChartType;
  basicLineChart: any;

  constructor() { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //fetch data
    this.linewithDataChart = linewithDataChart;
    this.OrderCountChart = OrderCountChart;
  }
}
