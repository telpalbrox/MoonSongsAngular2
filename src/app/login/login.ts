import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Inject} from 'angular2/core';
import {LoginService} from './providers/login.service';
import {AuthenticateResponse} from '../api';
import {Response} from 'angular2/http';
import { Router } from 'angular2/router';

@Component({
  selector: 'moon-login',
  template: require('./login.html')
})
export class Login {
  private userName: string = '';
  private password: string = '';
  private error: string = '';

  constructor(
    @Inject(LoginService) private loginService: LoginService,
    @Inject(Router) private router: Router
  ) { }

  onSubmit() {
    this.loginService.login(this.userName, this.password)
      .then((response: AuthenticateResponse) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/');
      })
      .catch((error: Response) => {
        if (error.status === 400) {
          this.error = 'Invalid user or password';
        } else {
          this.error = 'Unexpected error';
        }
      });
  }
}
