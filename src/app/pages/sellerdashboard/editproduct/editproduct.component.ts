import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

import { Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';
import { ImageFile } from 'src/app/models/products/ImageFile';
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

  imageSrc: string | ArrayBuffer | null = null;

  imagesSrc: string[] = [null, null, null];
  fileImages: ImageFile[] = [];

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

    this.breadCrumbItems = [
      { label: 'Inicio', link: '/' },
      { label: 'Produtos', link: '/produtos' },
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

  UpdateProduct() {
    if (this.productForm.valid) {

      this.updateProductModel = Object.assign({}, this.updateProductModel, this.productForm.value);
      this.updateProductModel.id = this.product.id;
      this.updateProductModel.mainPhoto = this.product.mainPhoto;
   
      if(this.fileImages.length > 0) {
        this.updateProductModel.fileImages = this.fileImages;
      }

       this.productService.update(this.updateProductModel)
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
      
      this.updateProductModel.fileName =  file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateProductModel.base64 = reader.result?.toString().split(',')[1] || null;
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeExistingFile(fileName: string) {
    this.product.fileImages =this.product.fileImages.filter(fileImage => fileImage.fileName !== fileName);
    
    let newFileImage = new ImageFile(
      null,
      fileName,
      0
    );

    this.fileImages.push(newFileImage);
  }

  removeFile(index: any) {
    this.imagesSrc[index] = null;
    this.fileImages = this.fileImages.filter(fileImage => fileImage.index !== index);
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
