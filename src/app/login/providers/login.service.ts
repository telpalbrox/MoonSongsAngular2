import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {AuthenticateResponse} from '../../api';

const config = require('../../config.json');

@Injectable()
export class LoginService {
  private endpointUrl: string;
  constructor(@Inject(Http) private http: Http) {
    this.endpointUrl = config.endpointUrl;
  }

  login(userName: string, password: string): Promise<AuthenticateResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return new Promise<AuthenticateResponse>((resolve, reject) => {
      this.http.post(`${this.endpointUrl}/authenticate`, JSON.stringify({
          userName,
          password
        }), {headers} )
        .map(res => res.json())
        .subscribe(
          (response: AuthenticateResponse) => resolve(response),
          (error => reject(error))
        );
    });
  }
}
