import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://localhost:3000/user';


  registration(inputdata: any) {
    console.log(inputdata);
    return this.http.post(this.apiurl, inputdata)
  }

  getById(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }

  getAll() {
    return this.http.get(this.apiurl);
  }


  updateUser(code: any, inputData: any) {
    return this.http.put(this.apiurl + '/' + code, inputData);
  }


  isLoggedIn() {
    return sessionStorage.getItem('userName') != null;
  }

getUserRole(){
  return sessionStorage.getItem('userRole') != null? sessionStorage.getItem('userRole')?.toString():'';
}

getAllRole(){
  return this.http.get('http://localhost:3000/role')
}

}
