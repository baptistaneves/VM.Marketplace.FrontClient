import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

import { Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';
import { CreateProductRequest } from 'src/app/models/products/createProductRequest';
import { ProductDto } from 'src/app/models/products/productDto';
import { UpdateProductRequest } from 'src/app/models/products/updateProductRequest';
import { CategoryService } from 'src/app/services/categories/category.service';
import { ProductService } from 'src/app/services/products/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html'
})
export class EditproductComponent implements OnInit{
  
  breadCrumbItems!: Array<{}>;
  _album: Array<any> = [];

  productForm: FormGroup;
  product: ProductDto;
  submitted = false;

  categories: any;
  errors: any = [];
  updateProductModel: UpdateProductRequest = new UpdateProductRequest();
  productImageUrlStaticFile: string = environment.apiUrlProductStaticFilesv1;

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

  constructor(private lightbox: Lightbox,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private productService: ProductService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  

    this.product = this.route.snapshot.data['product'].data;
    this.loadImage();
  }

  ngOnInit(): void {

    this.descriptionEditor = new Editor();
    this.especificationEditor = new Editor();

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Inicio', link: '/' },
      { label: 'Produtos', link: '/product' },
      { label: 'Editar Produto', active: true }
    ];

    this.listCategories();
    this.initializeForm();
    this.fillForm(this.product);
  }

  loadImage() {
    for (let i = 1; i <= 1; i++) {
      const src = this.productImageUrlStaticFile + '/' + this.product.mainPhoto;
      const caption = this.product.name;
      const thumb = this.productImageUrlStaticFile + '/' + this.product.mainPhoto;
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this._album.push(album);
    }
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

  fillForm(product:ProductDto) {
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      technicalSpecifications: product.technicalSpecifications, 
      promotionalPrice: product.promotionalPrice,
      isMedicine: product.isMedicine,
      ExpiryDate: product.expiryDate
    });
  }

  getProductById(id:string) {
    this.productService.getById(id).subscribe(response => {
      this.product = response.data;
    })
  }

  listCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response.data;
    });
  }


  get form() {
    return this.productForm.controls;
  }

  /**
   * Save product
   */
  UpdateProduct() {
    if (this.productForm.dirty && this.productForm.valid) {

      this.updateProductModel = Object.assign({}, this.updateProductModel, this.productForm.value);
      this.updateProductModel.id = this.product.id;
      this.updateProductModel.mainPhoto = this.product.mainPhoto;

      let formdata = new FormData();
  
      formdata.append('product', JSON.stringify(this.updateProductModel));

      if(this.imagemForm && this.imagemNome) {
        formdata.append('imageFile', this.imagemForm, this.imagemNome);
      }

      this.productService.update(formdata)
      .subscribe(
          response => {
            this.handleSuccess(response);
          },
          error => {this.handleFailure(error)}
      );
    }
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
    this.toastr.success('Produto actualizado com Sucesso!', 'Actualizado!!!');
  }

  handleFailure(fail: any){
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

    /**
  * Open lightbox
  */
    openImage(index: any): void {
      this.lightbox.open(this._album, index, { disableScrolling: true, centerVertically: true, showZoom: true });
    }

    ngOnDestroy(): void {
      this.descriptionEditor.destroy();
      this.especificationEditor.destroy();
  
    }
  
}
