import { Component, OnInit } from '@angular/core';
import { product } from './data';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})

// Purchase Component
export class PurchaseComponent implements OnInit {

  puchaselist: any;
  sortfilter: any;
  isDesc: boolean = false;

  constructor() { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //fetch data
    this.puchaselist = product
    this.sortfilter = 'title'
  }

  //sort 
  filtering() {
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;

    this.puchaselist.sort((a: any, b: any) => {
      if (a[this.sortfilter] < b[this.sortfilter]) {
        return -1 * direction;
      }
      else if (a[this.sortfilter] > b[this.sortfilter]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  }
}
