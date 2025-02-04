import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Data Get
import { CategoryService } from 'src/app/services/categories/category.service';
import { CreateProductRequest } from 'src/app/models/products/createProductRequest';
import { ProductService } from 'src/app/services/products/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { ImageFile } from 'src/app/models/products/ImageFile';

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
  fileImages: ImageFile[] = [];
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

  imageSrc: string | ArrayBuffer | null = null;

  imagesSrc: string[] = [null, null, null];

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

  files: File[] = [];

  AddProduct() {
    if (this.productForm.dirty && this.productForm.valid) {
      this.createProductModel = Object.assign({}, this.createProductModel, this.productForm.value);

      if(this.fileImages.length > 0) {
        this.createProductModel.fileImages = this.fileImages;
      }

      this.productService.add(this.createProductModel)
      .subscribe(
            response => {
              this.handleSuccess(response);
            },
            error => {this.handleFailure(error)}
      );

    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) {
      
      this.createProductModel.fileName =  file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.createProductModel.base64 = reader.result?.toString().split(',')[1] || null;
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onImagesSelect(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.addImageToFileList(reader, file.name, index);
        this.imagesSrc[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addImageToFileList(reader: FileReader, name: string, ind: any) {
    if (!this.fileImages.some(x => x.fileName === name)) {

      let newFileImage = new ImageFile(
        reader.result?.toString().split(',')[1] || null,
        name,
        ind
      );

      this.fileImages.push(newFileImage);

    } else {
      console.log('Arquivo já existe na lista:', name);
    }
  }
  

  removeFile(index: any) {
    this.imagesSrc[index] = null;
    this.fileImages = this.fileImages.filter(fileImage => fileImage.index !== index);
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
