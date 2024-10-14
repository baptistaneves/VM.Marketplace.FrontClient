import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/pages/cart/data';
import { category } from './data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { SignmodalComponent } from '../signmodal/signmodal.component';
import { LocalStorageUtils } from 'src/app/utils/localStorageUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

// Header Component
export class HeaderComponent implements OnInit {
  
  public isCollapsed = true;
  cartproduct: any;
  allcategories: any;

  loginPassfield!: boolean;

  loginForm!: UntypedFormGroup;
  submitted = false;

  queryFilter:string;

  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  SignupForm!: UntypedFormGroup;
  submit = false;

  public LocalStorage = new LocalStorageUtils();
  loggedInUser:any;

  constructor(
    private modalService: NgbModal, 
    private formBuilder: UntypedFormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.setDataToInputFilter();
    this.loggedInUser = this.LocalStorage.getUser();

    this.allcategories = category;
    this.cartproduct = cart;

    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    /**
     * Form Validatyion
     */
    this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  
  setDataToInputFilter() {
    const storedValue =  this.LocalStorage.getFilterData();
    if (storedValue) {
      this.queryFilter = storedValue;
    }
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
  }

    /**
   * Password Hide/Show
   */
    toggleLoginPassField() {
      this.loginPassfield = !this.loginPassfield;
    }

  //------------------ Sign In Form ---------------------//
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

   // convenience getter for easy access to form fields
   get fa() { return this.SignupForm.controls; }


  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  }

  /**
   * Form submit
   */
  SignupSubmit() {
    this.submit = true;

    // stop here if form is invalid
    if (this.SignupForm.invalid) {
      return;
    }
  }

   /**
 * Password Hide/Show
 */
   togglesignupPassfield() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }

  /**
    * Open modal
    */
  openModal() {
    // this.submitted = false;
    this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
  }

  onKeyUp(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    this.queryFilter = target.value; 

    if (this.queryFilter.trim() === '')   {
      this.LocalStorage.removeFilterData();
    } 
    else  {
      this.LocalStorage.saveFilterData(this.queryFilter);
    }

    this.onSearch();
  }

  onSearch(): void  {
      this.router.navigate(['/pesquisar',this.queryFilter]);
  }

  /**
  * Password Hide/Show
  */
  togglesignupCPassfield() {
    this.signupCPassfield = !this.signupCPassfield;
  }

  logOut() {
    this.LocalStorage.cleanLocalUserData();
    this.router.navigate(['/']);
  }

}
