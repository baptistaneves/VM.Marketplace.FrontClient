import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Light Box
import { Lightbox } from 'ngx-lightbox';
// Data Get
import { review, mockups } from './data';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})

// Single Component
export class SingleComponent implements OnInit {

  currentRate = 4;
  breadCrumbItems!: Array<{}>;
  _album: Array<any> = [];
  reviews: any;
  mockups: any;
  // Comment Form
  commentForm!: UntypedFormGroup;
  submitted = false;

  // review Form
  reviewForm!: UntypedFormGroup;
  rsubmit = false;

  constructor(private lightbox: Lightbox, private formBuilder: UntypedFormBuilder) {
    for (let i = 1; i <= 3; i++) {
      const src = 'assets/img/marketplace/single/0' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'assets/img/marketplace/single/0' + i + '.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this._album.push(album);
    }
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    this.reviews = review
    this.mockups = mockups
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Market', link: '/single' },
      { label: 'Single Item', active: true, link: '/single' }
    ];

    /**
     * Form Validatyion
     */
    this.commentForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    /**
     * Form Validatyion
     */
    this.reviewForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      review: ['', [Validators.required]],
    });
  }

  /**
  * Swiper setting
  */
  config = {
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: false, // If you want fixed slide widths, set this to false
    centerMode: false, // Set to true for centered slides
    centerPadding: '25px', // Adjust this value as needed for spaceBetween
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // convenience getter for easy access to form fields
  get form() { return this.commentForm.controls; }

  /**
  * Form submit
  */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }
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

  /**
  * Open lightbox
  */
  openImage(index: any): void {
    this.lightbox.open(this._album, index, { disableScrolling: true, centerVertically: true, showZoom: true });
  }

  // Set Lience
  setlicence(id: any) {
    document.querySelectorAll('.accordion-collapse').forEach((element: any) => {
      element.classList.remove('show')
    })
    document.getElementById(id)?.classList.add('show')
  }
}
