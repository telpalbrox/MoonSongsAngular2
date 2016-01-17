import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {RouterActive} from '../directives/router-active';
import {Inject} from 'angular2/core';
import {AuthService} from '../providers/auth.service';
import {User} from '../api';

@Component({
  selector: 'moon-nav',
  template: require('./nav.html'),
  styles: [require('./nav.css')],
  directives: [
    ROUTER_DIRECTIVES,
    RouterActive
  ]
})
export class Nav {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(Router) private router: Router
  ) { }

  getUserName(): string {
    return this.authService.getUser() ? this.authService.getUser().userName : null;
  }

  canListen(): boolean {
    return this.authService.getUser() ? this.authService.getUser().permissions.canListen : false;
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
