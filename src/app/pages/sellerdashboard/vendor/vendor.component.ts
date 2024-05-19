import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';

//Fetch data
import { vendorproduct } from './data';
import { cart } from '../../cart/data';
import { favorites } from '../../account/favorites/data';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})

// Vendor Component
export class VendorComponent implements OnInit {
  products: any;
  messageForm!: UntypedFormGroup;
  submitted = false;

  constructor(private formbuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //form validation
    this.messageForm = this.formbuilder.group({
      message: ['', [Validators.required]],
    });

    //fetch data
    this.products = vendorproduct;

    //set decimal point ti small
    setTimeout(() => {
      document.querySelectorAll('.price').forEach((e) => {
        let txt = e.innerHTML.split('.');
        e.innerHTML = txt[0] + '.<small>' + txt[1] + '</small>';
      });
    }, 0);
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.messageForm.controls;
  }

  //form submit

  sendmsg() {
    if (this.messageForm.valid) { }
    this.submitted = true;
  }

  //add to cart
  addcart(id: any) {
    cart.push(this.products[id]);
  }

  //add to favorite
  addfavorite(id: any) {
    favorites.push(this.products[id]);
  }
}
