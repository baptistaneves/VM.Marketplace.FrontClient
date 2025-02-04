import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Light Box
import { Lightbox } from 'ngx-lightbox';
// Data Get
import { review, mockups } from './data';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductDto } from 'src/app/models/products/productDto';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductFilter } from 'src/app/models/products/productFilter';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CommentService } from 'src/app/services/comments/comment.service';
import { Comment } from 'src/app/models/comments/comment';
import { ToastrService } from 'ngx-toastr';

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
  commentForm: FormGroup;
  submitted = false;
  errors: any = [];

  // review Form
  reviewForm!: UntypedFormGroup;
  rsubmit = false;

  product: ProductDto;
  productsDto: ProductDto[];
  comments: Comment[];
  commentModel: Comment;
  productFilter = new ProductFilter();
  productImageUrlStaticFile: string = environment.apiUrlProductStaticFilesv1;

  showContactInfo: boolean = false;

  productId: string;

  constructor(private lightbox: Lightbox, 
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private productService: ProductService,
              private commentService: CommentService,
              private toastr: ToastrService,
              config: NgbModalConfig,
              private modalService: NgbModal) {

    this.product = this.route.snapshot.data['product'].data;

    config.backdrop = 'static';
		config.keyboard = false;
    
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
      { label: this.product.categoryName, link: '/categoria/'+this.product.categoryName },
      { label: this.product.name, active: true, link: '#' }
    ];

    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.product = this.route.snapshot.data['product'].data;
    });

    this.listProducts(this.productFilter);
    this.listComments(this.product.id);

    this.initializeForm();
  }

  initializeForm() {
    this.commentForm = this.formBuilder.group({
      text: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required]],
      userPhoneNumber: [''],
    });
  }

  AddComment() {
    if (this.commentForm.dirty && this.commentForm.valid) {
      this.commentModel = Object.assign({}, this.commentModel, this.commentForm.value);

      this.commentModel.productId = this.product.id;

      this.commentService.add(this.commentModel)
      .subscribe(
          response => {
            this.handleSuccess(response);
          },
          error => {this.handleFailure(error)}
      );
    }
  }

  handleSuccess(response: any) {
    this.commentForm.reset();
    this.errors = [];

    this.listComments(this.product.id);

    this.toastr.success('Comentário adicionado com Sucesso!', 'Adicionado!!!');
  }

  handleFailure(fail: any){
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
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

  listProducts(filter: ProductFilter) {

    filter.pageSize = 4;
    filter.category = this.product.categoryName;

    this.productService.getAll(filter).subscribe(response => {
      this.productsDto = response.data.items;
    })
  }

  listComments(productId:string) {
    this.commentService.getAllCommentsByProductId(productId).subscribe(response => {
      this.comments = response.data;
    })
  }

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


  showContactDetailsInfo() {
    Swal.fire({
      title: 'Atenção!',
      text: 'Não transfira valores ou levante dinheiro para o fornecedor sem verificar a veracidade do produto e do vendedor. Tenha cuidado com as Burlas. O Mercado de Saúde não se responsabiliza por perdas na negociação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Sim, Entedido!',
      cancelButtonText: 'Não, cancelar!',
    }).then(result => {
      if (result.value) {
        this.showContactInfo = true;
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Não concordou com os termos :)',
          icon: 'info',
          confirmButtonColor: 'rgb(3, 142, 220)',
          confirmButtonText: 'Ok!',
        })
      }
    });
  }

  open(content) {
		this.modalService.open(content);
	}
}
