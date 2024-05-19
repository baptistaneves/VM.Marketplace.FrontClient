import { Component, OnInit } from '@angular/core';

//Data Get
import { payout } from './data';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss'],
})

// Payout Component
export class PayoutComponent implements OnInit {
  payouts: any;

  constructor() { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //Fetch Data
    this.payouts = payout;
  }
}
