import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Data Get
import { cart } from './data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

/**
 * Cart Component
 */
export class CartComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  carts: any;

  // review Form
  reviewForm!: UntypedFormGroup;
  rsubmit = false;
  total: any = 0;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //Fetch Data
    this.carts = cart
    this.carts.forEach((element: any) => {
      this.total += parseFloat(element.price)
    });

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Market', link: '/' },
      { label: 'Cart', active: true, link: '/cart' }
    ];

    /**
     * Form Validatyion
     */
    this.reviewForm = this.formBuilder.group({
      promocode: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get rform() { return this.reviewForm.controls; }

  /**
  * Form submit
  */
  reviewSubmit() {
    this.rsubmit = true;
    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }
  }

  //remove cart
  removecart(i: any) {
    this.total -= parseFloat(this.carts[i].price)
    this.carts.splice(i, 1)
  }

  //clear cart
  clearcart() {
    this.carts = []
    this.total = 0
  }

}
