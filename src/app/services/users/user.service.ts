import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../base.service';
import { CreateUserSellerRequest } from 'src/app/models/users/createUserSellerRequest';
import { UpdateUserSellerRequest } from 'src/app/models/users/updateUserSellerRequest';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getById(id:string) : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "users/obter-usuario-por-id/" + id, this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getProvidersQuantity() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "users/obter-quantidade-de-fornecedores/", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getCurrentUser() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "users/obter-dados-do-usuario-logado", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }


  add(user: CreateUserSellerRequest) : Observable<any>{
    let response = this.http
        .post<CreateUserSellerRequest>(this.UrlServiceV1 + "users/criar-conta", user, this.GetHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  addBusinessLicense(lincense: FormData) : Observable<any>{
    let response = this.http
        .put<FormData>(this.UrlServiceV1 + "users/enviar-alvara-comercial", lincense, this.GetHeaderFormData())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  removeBusinessLicense() : Observable<any>{
    let response = this.http
        .delete(this.UrlServiceV1 + "users/remover-alvara-comercial", this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(user: UpdateUserSellerRequest) : Observable<any>{
    let response = this.http
        .put<UpdateUserSellerRequest>(this.UrlServiceV1 + "users/actualizar-dados-da-minha-conta", user, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }
 
}
