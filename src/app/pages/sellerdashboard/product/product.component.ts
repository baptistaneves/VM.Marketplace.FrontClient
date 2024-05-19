import { Component, OnInit } from '@angular/core';
import { product } from './data';

// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

// Product Component
export class ProductComponent implements OnInit {
  products: any;
  sortfilter: any;
  isDesc: boolean = false;

  constructor() { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //Fetch Data
    this.products = product;
    this.sortfilter = 'title';

    // set small decimal point
    setTimeout(() => {
      document.querySelectorAll('.price').forEach((e) => {
        let txt = e.innerHTML.split('.');
        e.innerHTML = txt[0] + '.<small>' + txt[1] + '</small>';
      });
    }, 0);
  }

  //remove from products
  removeproduct(id: any) {
    Swal.fire({
      title: 'Are you Sure ?',
      text: 'Are you Sure You want to Remove this Product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          confirmButtonColor: '#364574',
          icon: 'success',
        });
        this.products.splice(id, 1);
      }
    });
  }

  // Sort
  filtering() {
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;
    this.products.sort((a: any, b: any) => {
      if (a[this.sortfilter] < b[this.sortfilter]) {
        return -1 * direction;
      } else if (a[this.sortfilter] > b[this.sortfilter]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
