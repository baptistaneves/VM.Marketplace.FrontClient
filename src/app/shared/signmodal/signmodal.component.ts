import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/users/login.service';
import { LoginRequest } from 'src/app/models/users/loginRequest';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { CreateUserSellerRequest } from 'src/app/models/users/createUserSellerRequest';

@Component({
  selector: 'app-signmodal',
  templateUrl: './signmodal.component.html'
})
export class SignmodalComponent implements OnInit {

  public isCollapsed = true;
  formData!: UntypedFormGroup;
  signupformData!:UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType:any;
  submitted = false;
  signupsubmit = false;

  errors: any[] = [];
  returnUrl: string;

  loginForm: FormGroup;
  signUpForm: FormGroup;

  loginModel: LoginRequest;
  createUserModel: CreateUserSellerRequest;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,) {
      
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

  }

  ngOnInit(): void {

    this.initializeLoginForm();
    this.initializeSignUpForm();

  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  initializeSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
  * Close modal
  */
   closemodal() {
    // this.submitted = false;
    this.modalService.dismissAll();
  }

  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType
  }

    /**
   * Password Hide/Show
   */
     togglesignupPassfield() {
      this.signupPassfield = !this.signupPassfield;
    }

  /**
 * Returns form
 */
  get form() {
    return this.loginForm.controls;
  }
  
  /**
 * Returns signup form
 */
   get signupform() {
    return this.signUpForm.controls;
  }

  /**
 * submit signin form
 */

  signup(){
    if(this.signUpForm.dirty && this.signUpForm.valid) {
      this.createUserModel = Object.assign({}, this.createUserModel, this.signUpForm.value);

      this.userService.add(this.createUserModel)
            .subscribe(
              response => { this.handleSuccessAddUser(response) },
              erros => { this.handleFailure(erros) }
            );
    }
  }

  signin() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.loginModel = Object.assign({}, this.loginModel, this.loginForm.value);

      this.loginService.login(this.loginModel)
      .subscribe(
          response => {
            this.handleSuccess(response);
          },
          error => {this.handleFailure(error)}
      );
    }
  }

  handleSuccess(response: any) {
      this.loginForm.reset();
      this.errors = [];

      this.loginService.LocalStorage.saveLocalUserData(response);

      this.closemodal();
      this.toastr.success('Login realizado com Sucesso!', 'Bem vindo!!!');
      this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/minha-conta']);
  }

  handleSuccessAddUser(response: any) {
    this.signUpForm.reset();
    this.errors = [];

    this.loginService.LocalStorage.saveLocalUserData(response.data);

    this.closemodal();
    this.toastr.success('Conta criada com Sucesso!', 'Bem vindo!!!');
    this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/minha-conta']);
  }

  handleFailure(fail: any){
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}