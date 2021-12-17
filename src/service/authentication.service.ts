import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) { }
  
  loginUser(email: string, password: string,) {
    const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    debugger
    return this.http.post<any>(`https://strapi-test.promactinfo.com/auth/local`, {
      identifier: email,
      password: password
    }, httpOptions)
      .pipe(map(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        if (user) {
          debugger
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          debugger
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
  
  logout() {
    debugger
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
