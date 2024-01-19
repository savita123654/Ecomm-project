import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp, products } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApisService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private httpclient: HttpClient, private router: Router) { }
  isLoginError = new EventEmitter(false);
  userSignUp(data: SignUp) {
    this.httpclient.post('http://localhost:3000/seller',
      data,
      { observe: 'response' }).
      subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('sellerData', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        console.warn(result + "result")
      })
  }
  reloadSeller() {
    if (localStorage.getItem("sellerData")) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: Login) {
    this.httpclient.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).
      subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('sellerData', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.log("login failed!");
          this.isLoginError.emit(true);
        }
      })
  }

  addProducts(data: products) {
    return this.httpclient.post('http://localhost:3000/products', data)
  }

  getProducts() {
    return this.httpclient.get('http://localhost:3000/products');
  }

  deleteProduct(id) {
    return this.httpclient.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.httpclient.get(`http://localhost:3000/products/${id}`);
  }

  editProduct(id, data) {
    return this.httpclient.put(`http://localhost:3000/products/${id}`, data);
  }

  getPopularProducts() {
    return this.httpclient.get<products[]>('http://localhost:3000/products?_limit=3');
  }

  getTrendyProducts() {
    return this.httpclient.get<products[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query: any) {
    return this.httpclient.get(`http://localhost:3000/products?q=${query}`);
  }

}
