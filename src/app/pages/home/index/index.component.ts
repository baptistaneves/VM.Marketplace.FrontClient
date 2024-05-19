import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// Data Get
import { feature, seller, service, blog, recent } from './data';
import { cart } from '../../cart/data';
import { favorites } from '../../account/favorites/data';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

// Index Component
export class IndexComponent implements OnInit {
  featureproduct: any;
  sellerproduct: any;
  services: any;
  blogproduct: any;
  recentproduct: any;
  currentRate: any = 4;
  selectedcategory: any;
  searchTerm: any;

  constructor(public router: Router) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    this.selectedcategory = 'All categories';
    this.featureproduct = feature;
    this.sellerproduct = seller;
    this.services = service;
    this.blogproduct = blog;
    this.recentproduct = recent;

    //set decimal point to small
    setTimeout(() => {
      document.querySelectorAll('.price').forEach((e) => {
        let txt = e.innerHTML.split('.');
        e.innerHTML = txt[0] + '.<small>' + txt[1] + '</small>';
      });
    }, 0);
  }

  /**
   * Swiper setting
   */
  config = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          dots: true,
        },
      },
    ],
  };

  // Seller
  seller = {
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          dots: false,
        },
      },
    ],
  }

  // Blog
  blog = {

    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  //add product in cart
  addcart(id: any) {
    cart.push(this.featureproduct[id]);
  }

  //add product in favorite
  recentaddfavorite(id: any) {
    favorites.push(this.recentproduct[id]);
  }

  fetureaddfavorite(id: any) {
    favorites.push(this.featureproduct[id]);
  }

  selleraddfavorite(id: any) {
    favorites.push(this.sellerproduct[id]);
  }

  catchange(category: any) {
    this.selectedcategory = category;
  }
}
