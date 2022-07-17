import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public basepath='http://localhost:5000/auth'

  constructor( private http:HttpClient) { 
  }
  login(data){
    return this.http.post(this.basepath+'/login',data);
  }
  register(data){
    return this.http.post(this.basepath+'/register',data);
  }
}
