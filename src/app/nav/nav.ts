import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {RouterActive} from '../directives/router-active';

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

}
