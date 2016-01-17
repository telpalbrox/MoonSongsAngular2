import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {CanActivate} from 'angular2/router';
import {Song} from '../api';
import {AuthService} from './auth.service';

const config = require('../config.json');

@Injectable()
export class SongsService {
  private endpointUrl: string;
  constructor(
    @Inject(Http) private http: Http,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.endpointUrl = config.endpointUrl;
  }

  getAll(): Promise<Song[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpointUrl}/songs`, { headers: this.authService.getAuthHeader() })
        .map(res => res.json())
        .subscribe(
          response => resolve(response),
          error => reject(error)
        );
    });
  }
}
