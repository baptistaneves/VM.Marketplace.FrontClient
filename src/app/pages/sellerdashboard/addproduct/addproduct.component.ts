import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Data Get
import { CategoryService } from 'src/app/services/categories/category.service';
import { CreateProductRequest } from 'src/app/models/products/createProductRequest';
import { ProductService } from 'src/app/services/products/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})

// Addproduct Component
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;
  submitted = false;

  categories: any;
  errors: any = [];
  createProductModel: CreateProductRequest = new CreateProductRequest();

  imagemForm: any;
  imagemNome: string;

  descriptionEditor: Editor;
  especificationEditor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private productService: ProductService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {

    this.descriptionEditor = new Editor();
    this.especificationEditor = new Editor();

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    this.initializeForm();
    this.listCategories();
  }

  initializeForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.minLength(1)]],
      categoryId: ['', [Validators.required]],
      technicalSpecifications: [''], 
      promotionalPrice: [0, [Validators.minLength(1)]],
      isMedicine: [false],
      ExpiryDate: [null]
    });
  
  }  
 
  listCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response.data;
    });
  }


  get form() {
    return this.productForm.controls;
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

  /**
   * Save product
   */
  AddProduct() {
    if (this.productForm.dirty && this.productForm.valid) {
      this.createProductModel = Object.assign({}, this.createProductModel, this.productForm.value);

      let formdata = new FormData();
  
      formdata.append('product', JSON.stringify(this.createProductModel));

      if(this.imagemForm && this.imagemNome) {
        formdata.append('imageFile', this.imagemForm, this.imagemNome);
      }

       this.productService.add(formdata)
       .subscribe(
           response => {
             this.handleSuccess(response);
           },
           error => {this.handleFailure(error)}
       );

    }
  }

  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    this.imagemForm =  this.files[0];
    this.imagemNome =  this.files[0].name;
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  handleSuccess(response: any) {
    this.productForm.reset();
    this.errors = [];

    this.router.navigate(['/product']);
    this.toastr.success('Produto adicionado com Sucesso!', 'Adicionado!!!');
  }

  handleFailure(fail: any){
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  ngOnDestroy(): void {
    this.descriptionEditor.destroy();
    this.especificationEditor.destroy();

  }

}
