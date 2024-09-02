import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../base.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "categories/obter-categorias", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }
 
}
