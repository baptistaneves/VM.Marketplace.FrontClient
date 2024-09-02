import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/users/loginRequest';
import { BaseService } from '../base.service';
import { AuthenticationResultDto } from 'src/app/models/users/authenticationResultDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

    constructor(private http: HttpClient,
              private router: Router) { 
                
      super(); 
  }

    public login(login: LoginRequest): Observable<AuthenticationResultDto> {
        let response = this.http
            .post(this.UrlServiceV1 + 'login/fazer-login', login, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

  logOut() {
    this.LocalStorage.cleanLocalUserData();
    this.router.navigate(['/'])
  }

}
