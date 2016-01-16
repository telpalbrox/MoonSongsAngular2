const jwtDecode = require('jwt-decode');
import {Injectable, Inject} from 'angular2/core';
import {User} from '../api';

@Injectable()
export class AuthService {
  saveUser(token: string) {
    localStorage.setItem('token', token);
  }

  getUser(): User {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}
