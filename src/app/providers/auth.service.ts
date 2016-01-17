import {Injectable, Inject} from 'angular2/core';
import {Headers} from 'angular2/http';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {User} from '../api';

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper;

  constructor() {
    this.jwtHelper = new JwtHelper();
  }

  saveUser(token: string) {
    localStorage.setItem('token', token);
  }

  getUser(): User {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return this.jwtHelper.decodeToken(token);
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

  getAuthHeader(): Headers {
    const token = this.getToken();
    if (token) {
      return new Headers({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return null;
    }
  }
}
