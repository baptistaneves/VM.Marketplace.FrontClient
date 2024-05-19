import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { cart } from '../cart/data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})

// Checkout Component
export class CheckoutComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  // creditcard Form
  billingForm!: UntypedFormGroup;
  bsubmit = false;
  name: any;
  number: any;
  cvc: any;
  expiry: any;
  orders: any;
  subtotal: any = 0;
  total: any = 0;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Market', link: '/cart' },
      { label: 'Checkout', active: true, link: '/checkout' },
    ];

    /**
     * Form Validatyion
     */
    this.billingForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      company: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });

    // Fetch Data
    this.orders = cart
    this.orders.forEach((element: any) => {
      this.subtotal += parseFloat(element.price)
    });
    this.total = (this.subtotal + 9.30).toFixed(2)
    this.subtotal = this.subtotal.toFixed(2)

    // set decimal point to small
    setTimeout(() => {
      document.querySelectorAll(".price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        e.innerHTML = txt[0] + ".<small>" + txt[1] + "</small>"
      })
    }, 0);
  }

  // convenience getter for easy access to form fields
  get rform() {
    return this.billingForm.controls;
  }

  /**
   * Form submit
   */
  reviewSubmit() {
    this.bsubmit = true;
    // stop here if form is invalid
    if (this.billingForm.invalid) {
      return;
    }
  }

  /**
   * Bill Submit
   */
  billSubmit() {
    this.bsubmit = true;
    // stop here if form is invalid
    if (this.billingForm.invalid) {
      return;
    }
  }
}
