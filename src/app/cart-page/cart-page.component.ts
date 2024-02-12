import { Component } from '@angular/core';
import { faArrowAltCircleLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApisService } from '../services/apis.service';
import { pricesummary, products } from '../data-type';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  trash = faTrash;
  leftArrow = faArrowAltCircleLeft;
  cartItems: products[] = [];
  itemValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  priceSummary: pricesummary = {
    price: 0,
    discount: 0,
    tax: 0,
    devliveryCharge: 0,
    total: 0
  };
  selectedQuantity: number;

  constructor(private apiService: ApisService, private router: Router) { }

  removeTocart(cartId) {
    if (this.cartItems.length) {
      this.apiService.removeToCart(cartId).subscribe((res) => {
        if (res) {
          let localData = JSON.parse(localStorage.getItem('users'));
          let userId = localData && localData[0].id;
          this.getCartItems()
        }
      })
    } else {
      this.router.navigate(['/'])
    }
  }

  onChange(value, item) {
    let user = JSON.parse(localStorage.getItem('users'));
    let userId = user && user[0].id;
    const inputData = {
      ...item,
      quantity: +value
    }
    this.apiService.updateQuantity(item.id, inputData).subscribe((res) => {
      if (res) {
        this.getCartItems();
      }
    })
  }

  getCartItems() {
    let user = JSON.parse(localStorage.getItem('users'));
    let userId = user && user[0].id;
    this.apiService.getCartItems(userId);
    this.apiService.cartItems.subscribe((res) => {
      if (res) {
        this.cartItems = res;
        this.calculatePrice()
      }
    })

  }
  calculatePrice() {
    let price = 0;
    this.cartItems.forEach(item => {
      if (item.quantity)
        price = price + (+item.price * item.quantity);
    })
    this.priceSummary.price = price;
    this.priceSummary.discount = price / 10;
    this.priceSummary.tax = price / 5;
    this.priceSummary.devliveryCharge = 100;
    this.priceSummary.total = price - price / 10 + price / 5 + 100;
    if (this.cartItems.length === 0) {
      this.router.navigate(['/'])
    }
  }
  checkout() {
    this.router.navigate(['checkout'])
  }

  ngOnInit() {
    this.getCartItems();
  }
}
