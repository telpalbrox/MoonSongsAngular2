/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {Login} from './login/login';
import {LoginService} from './login/providers/login.service';
import {Nav} from './nav/nav';
import {AuthService} from './providers/auth.service';
import {Songs} from './songs/songs';
import {SongsService} from './providers/songs.service';
import {MusicService} from './providers/music.service';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    ...FORM_PROVIDERS,
    LoginService,
    AuthService,
    SongsService,
    MusicService
  ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive, Nav ],
  pipes: [],
  template: `
    <header>
      <moon-nav></moon-nav>
    </header>

    <main class="container">
      <div class="row">
        <router-outlet></router-outlet>
      </div>
    </main>

    <footer class="container">
      <div class="row col-md-12">
        <span class="pull-left">Moon Songs Angular 2</span>
      </div>
    </footer>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/songs', component: Songs, name: 'Songs' },
  { path: '/**', redirectTo: ['Home'] }
])
export class App {
  constructor() { }
}
