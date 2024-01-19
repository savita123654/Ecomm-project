import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  myForm: FormGroup;
  loginForm: FormGroup;
  iSloginIn: boolean = false;
  authError: string = "";
  constructor(private apiService: ApisService, private router: Router) { }


  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
    });
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
    this.apiService.reloadSeller();
  }

  loginFormIn() {
    this.iSloginIn = !this.iSloginIn;
  }

  onSubmit(form: FormGroup) {
    if (this.iSloginIn) {
      this.authError = "";
      this.apiService.userLogin(form.value);
      this.apiService.isLoginError.subscribe((isError) => {
        if (isError) {
          this.authError = "Email or Password is not correct!"
        }
      })
    } else {
      this.apiService.userSignUp(form.value);
    }
  }
}
