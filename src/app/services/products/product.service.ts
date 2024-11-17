import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../base.service';
import { CreateProductRequest } from 'src/app/models/products/createProductRequest';
import { UpdateProductRequest } from 'src/app/models/products/updateProductRequest';
import { ProductFilter } from 'src/app/models/products/productFilter';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getById(id:string) : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "products/obter-produto-por-id/" + id, this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getAll(filter: ProductFilter) : Observable<any>{

    let params = this.getPaginationHeaders(filter.pageNumber, filter.pageSize);
  
    params = params.append('category', filter.category);
    params = params.append('searchTerm', filter.searchTerm);
    
    return this.http
      .get<any>(
        this.UrlServiceV1 + "products/obter-produtos",
        { 
          params, 
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
      .pipe(catchError(super.serviceError));
  }

  getProductsByUser(filter: ProductFilter) : Observable<any>{
    let params = this.getPaginationHeaders(filter.pageNumber, filter.pageSize);
  
    params = params.append('searchTerm', filter.searchTerm);
    
    return this.http
      .get<any>(
        this.UrlServiceV1 + "products/obter-produtos-por-usuario",
        { 
          params, 
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.LocalStorage.getToken()}`
          })
        }
      )
      .pipe(catchError(super.serviceError));
  }

  add(product: FormData) : Observable<any>{
    let response = this.http
        .post<FormData>(this.UrlServiceV1 + "products/adicionar-produto", product, this.GetHeaderFormData())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(product: FormData) : Observable<any>{
    let response = this.http
        .put<FormData>(this.UrlServiceV1 + "products/actualizar-produto", product, this.GetHeaderFormData())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id: string) : Observable<any>{
    let response = this.http
        .delete<any>(this.UrlServiceV1 + "products/remover-produto/" + id, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }
 
}
