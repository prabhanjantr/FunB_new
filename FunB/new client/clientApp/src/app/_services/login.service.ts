import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

private _registerurl = environment.api + environment.register;
private _loginurl = environment.api+environment.login;


  constructor(private http: HttpClient)  {}
  RegisterUser(formData: any):Observable<any>
  {
    return this.http.post(this._registerurl,formData,httpOptions) ; 
    //return this.http.post("http://localhost:64542/api/Account/Register",formData,httpOptions);
  }
  LoginUser(formData:any):Observable<any>
  {
    return this.http.post(this._loginurl,formData,httpOptions) ; 
  }

}
