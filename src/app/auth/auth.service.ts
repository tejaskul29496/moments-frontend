import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BACKEND_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(data: any) {
    return this.http.post(this.BACKEND_URL + '/login', data);
  }

  register(data: any) {
    return this.http.post(this.BACKEND_URL + '/register', data);
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
