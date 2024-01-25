import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  isLoginError = new EventEmitter(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignup(data: SignUp) {
    return this.http.post('http://localhost:3000/users',
      data,
      { observe: 'response' }).subscribe((res) => {
        if (res) {
          localStorage.setItem("users", JSON.stringify(res.body));
          this.router.navigate(['/'])
        }
      });
  }

  reloadUser() {
    if (localStorage.getItem("users")) {
      this.router.navigate(['/'])
    }

  }

  userLogin(data: Login) {
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).
      subscribe((result: any) => {
        if (result.body && result.body.length) {
          localStorage.setItem("users", JSON.stringify(result.body));
          this.router.navigate(['/']);
          this.isLoginError.emit(false);

        } else {
          this.isLoginError.emit(true);
        }
      })
  }
}
