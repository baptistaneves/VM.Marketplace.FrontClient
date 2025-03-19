import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignmodalComponent } from '../signmodal/signmodal.component';
import { LocalStorageUtils } from 'src/app/utils/localStorageUtils';
import { ProductService } from 'src/app/services/products/product.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

// Footer Component
export class FooterComponent implements OnInit {

  formData!: UntypedFormGroup;
  submitted = false;

  public LocalStorage = new LocalStorageUtils();
  loggedInUser:any;

  productsQuantity: any;
  providersQuantity: any;

  constructor(public formBuilder: UntypedFormBuilder,
              private modalService: NgbModal,
              private productService: ProductService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loggedInUser = this.LocalStorage.getUser();
    // Validation
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required]],
    });

    this.getProductsQuantity();
    this.getProvidersQuantity();

  }

  getProductsQuantity() {
    this.productService.getProductsQuantity().subscribe(response => {
      this.productsQuantity = response.data;
    })
  }

  getProvidersQuantity() {
    this.userService.getProvidersQuantity().subscribe(response => {
      this.providersQuantity = response.data;
    })
  }

  /**
  * Returns form
  */
  get form() {
    return this.formData.controls;
  }

  /**
      * Open modal
      */
    openModal() {
      this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
    }
    
  subscribe() {
    this.submitted = true
  }

}
