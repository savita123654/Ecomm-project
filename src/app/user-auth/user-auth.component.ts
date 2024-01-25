import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUp, cart } from '../data-type';
import { UserLoginService } from '../services/user-login.service';
import { utilsService } from '../services/utils.service';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  isLoginUser = false;
  loginFailed = '';
  constructor(private fb: FormBuilder,
    private loginService: UserLoginService,
    private utilsService: utilsService,
    private apiService: ApisService) {

  }
  onSubmit(form: any) {
    this.utilsService.markFormTouched(this.loginForm)
    if (form.invalid) {
      return;
    }

    if (this.isLoginUser) {
      this.loginService.userSignup(form.value);
    } else {
      this.loginService.userLogin(form.value);
      this.loginService.isLoginError.subscribe((res) => {
        if (res) {
          this.loginFailed = "Please enter the correct email and password!";
        } else {
          this.locatToRemoteCart();
          console.log("no error")
        }
      })
    }
  }
  loginFormIn() {
    this.isLoginUser = !this.isLoginUser;
  }

  get f() { return this.loginForm.controls; }


  ngOnInit() {
    this.loginService.reloadUser();
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    this.signUpForm = this.fb.group({
      name: [''],
      email: [""],
      password: ['']
    })

  }

  locatToRemoteCart() {
    let localCartValue: any[] = JSON.parse(localStorage.getItem("localCart"));
    let user = JSON.parse(localStorage.getItem('users'));
    let userId = user && user[0].id;
    if (localCartValue) {

      localCartValue.forEach((product, index) => {
        let cartValue: cart = {
          ...product,
          productId: product.id,
          userId: userId
        }
        delete cartValue.id;
        setTimeout(() => {
          this.apiService.addTocart(cartValue).subscribe((result) => {
            if (result) {
              console.log("local cart value is added")
            }
          })
        }, 500);
        if (localCartValue?.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      })
    }
    //getcart items
    setTimeout(() => {
      this.apiService.getCartItems(userId);
    }, 2000);
  }
}
