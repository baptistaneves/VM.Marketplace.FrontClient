import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { notification, paymentcards } from './data';

// Sweet Alert
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/users/user.service';
import { UserDto } from 'src/app/models/users/userDto';
import { UpdateUserSellerRequest } from 'src/app/models/users/updateUserSellerRequest';
import { ToastrService } from 'ngx-toastr';
import { CityService } from 'src/app/services/cities/city.service';
import { StateService } from 'src/app/services/states/state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

// Setting Component
export class SettingComponent implements OnInit {

  userForm: FormGroup;
  licenseForm: FormGroup;

  cardForm!: UntypedFormGroup;
  masterSelected!: boolean;
  submitted = false;
  allnotification: any;
  allpayment: any;

  errors: any = [];
  userData: UserDto = new UserDto();
  updateUserModel: UpdateUserSellerRequest;
  cities: any;
  states: any;

  imagemForm: any;
  imagemNome: string;

  licenseImageUrlStaticFile: string = environment.apiUrlLicensesStaticFilesv1;


  constructor(private modalService: NgbModal,
     private formBuilder: FormBuilder,
     private userService: UserService,
     private cityService: CityService,
     private stateService: StateService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    this.listStates();
    this.listCities();
    this.initializeUserForm();
    this.initializeLicenseForm();
    this.getCurrentUserData();
  }

  listCities() {
    this.cityService.getAll().subscribe(response => {
      this.cities = response.data
    });
  }

  listStates() {
    this.stateService.getAll().subscribe(response => {
      this.states = response.data;
    });
 }

  getCurrentUserData() {
    this.userService.getCurrentUser()
    .subscribe(user => {
      console.log(user.data);
      this.userData = user.data;
      this.fillUserForm(user.data);
    }, error => {

    })
  }

  initializeUserForm() {
    this.userForm = this.formBuilder.group({
      id: [''],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

  }

  initializeLicenseForm() {
    this.licenseForm = this.formBuilder.group({ })
  }

  fillUserForm(user: UserDto) {
    console.log(user)
    this.userForm.patchValue({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      city: user.city,
      state: user.state,
      address: user.address
    });
  }

  update() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.updateUserModel = Object.assign({}, this.updateUserModel, this.userForm.value);

      this.userService.update(this.updateUserModel)
      .subscribe(
          response => {
            this.handleSuccess(response);
          },
          error => {this.handleFailure(error)}
      );
    }
  }

  handleSuccess(response: any) {
      this.userForm.reset();
      this.errors = [];
      
      location.reload();
      this.toastr.success('Dados actualizados com Sucesso!', 'Bem vindo!!!');
  }

  handleRemoveSuccess(response: any) {
    Swal.fire(
      { 
        title: 'Removido!',
         text: 'A sua licença foi removida.', 
         confirmButtonColor: '#364574',
          icon: 'success', }).then(result => {
      if (result.value) {
        location.reload();
      }
    });;
}

  handleFailure(fail: any){
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }


  /**
  * Form data get
  */
  get form() {
    return this.cardForm.controls;
  }

  get f() {
    return this.userForm.controls;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.allnotification.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  /**
  * Open modal
  * @param content modal content
  */

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: false });
  }

  remove() {
    Swal.fire({
      title: 'Você tem certeza ?',
      text: 'Você quer realmente remover a sua licença ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'rgb(243, 78, 78)',
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim, Remover!'
    }).then(result => {
      if (result.value) {
        this.removeLicense();
      }
    });
  }

  removeLicense() {
    this.userService.removeBusinessLicense()
      .subscribe(
          response => {
            this.handleRemoveSuccess(response);
          },
          error => {this.handleFailure(error)}
      );
  }

  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    this.imagemForm =  this.files[0];
    this.imagemNome =  this.files[0].name;
  }

  addLicense() {
    if(this.imagemForm && this.imagemNome){

      let formdata = new FormData();
  
      formdata.append('imageFile', this.imagemForm, this.imagemNome);

      this.userService.addBusinessLicense(formdata)
      .subscribe(
          response => {
            this.handleSuccess(response);
          },
          error => {this.handleFailure(error)}
      );
    }
    else {
      this.errors.push('Por favor, selecione o arquivo');
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

}
