import { Component, OnInit } from '@angular/core';
import { product } from './data';

// Sweet Alert
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductDto } from 'src/app/models/products/productDto';
import { ToastrService } from 'ngx-toastr';
import { ProductFilter } from 'src/app/models/products/productFilter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

// Product Component
export class ProductComponent implements OnInit {
  productsDto: ProductDto[] = [];

  sortfilter: any;
  isDesc: boolean = false;

  errors: any = [];

  filter = new ProductFilter();
  productImageUrlStaticFile: string = environment.apiUrlProductStaticFilesv1;


  constructor(private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    this.listProduct(this.filter);
    
    //Fetch Data
    this.sortfilter = 'title';

  }

  listProduct(filter: ProductFilter) {
    this.productService.getAll(filter).subscribe(response => {
      this.productsDto = response.data.items;
    });
  }

  removeProduct(id:string) {
    this.productService.remove(id)  .subscribe(
      sucesso => { this.handleSuccessRemove() },
      erros => { this.handleFailure(erros) }
    );
  }


  handleSuccessRemove() {
    this.errors = [];

    Swal.fire({ title: 'Excluido!', text: 'O produto foi excluido com sucesso.', confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', });
    this.listProduct(this.filter);
  }

  handleFailure(fail: any){
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  removeproduct(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Este produto será removido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Sim, Remover!',
      cancelButtonText: 'Não, cancelar!',
    }).then(result => {
      if (result.value) {
        this.removeProduct(id);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Remoção do produto cancelada :)',
          icon: 'info',
          confirmButtonColor: 'rgb(3, 142, 220)',
          confirmButtonText: 'Ok!',
        })
      }
    });
  }

  // Sort
  filtering() {
    
  }

}
