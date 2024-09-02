import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../base.service';
import { Comment } from 'src/app/models/comments/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getById(id:string) : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "comments/obter-comentario-por-id/" + id, this.GetHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getAllCommentsByProductId(id:string) : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "comments/obter-comentarios-por-produto-id/" + id, this.GetHeaderJson())
          .pipe(catchError(super.serviceError));
  }


  add(comment: Comment) : Observable<any>{
    let response = this.http
        .post<FormData>(this.UrlServiceV1 + "comments/criar-comentario", comment, this.GetHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }


  remove(id: string) : Observable<any>{
    let response = this.http
        .delete<any>(this.UrlServiceV1 + "comments/remover-comentario/" + id, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }
 
}