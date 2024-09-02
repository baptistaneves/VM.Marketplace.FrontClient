import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../base.service';
@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "cities/obter-municipios", this.GetHeaderJson())
          .pipe(catchError(super.serviceError));
  }
 
}
