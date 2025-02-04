import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../base.service';
import { CreateProductTrackingRequest } from 'src/app/models/products/CreateProductTrackingRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductTrackingService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  reportInsights(id:string) : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "productTracking/obter-insights-por-produto-id/" + id, this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  reportInsightsDaily(id: string, date: Date) : Observable<any>{

    let params = new HttpParams(); 
  
    params = params.append('id', id);
    params = params.append('date', date.toDateString());
    
    return this.http
      .get<any>(
        this.UrlServiceV1 + "productTracking/obter-insights-diario",
        { 
          params, 
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
      .pipe(catchError(super.serviceError));
  }

  add(productTracking: CreateProductTrackingRequest) : Observable<any>{
    let response = this.http
        .post<any>(this.UrlServiceV1 + "productTracking/adicionar-insights", productTracking, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }
 
}