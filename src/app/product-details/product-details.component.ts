import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { cart, products } from '../data-type';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  customNum: number = 1;
  produtDetals: products | undefined;
  removeCart: boolean = false;
  cartData: products;
  constructor(private route: ActivatedRoute,
    private apiService: ApisService,
    private router: Router) { }

  addItems(type) {
    if (type == 'add' && this.customNum < 20) {
      this.customNum += 1;
    } else if (type == 'minus' && this.customNum > 1) {
      this.customNum -= 1;
    }
  }

  addToCart(product: products) {
    this.produtDetals.quantity = this.customNum;
    if (!localStorage.getItem('users')) {
      this.apiService.localAddCart(this.produtDetals);
      this.removeCart = true;

    } else if (localStorage.getItem('users')) {
      let localData = JSON.parse(localStorage.getItem('users'))[0];
      let userId = localData && localData.id;
      let cartDatas: cart = {
        ...this.produtDetals,
        productId: this.produtDetals.id,
        userId
      }
      delete cartDatas.id;
      this.apiService.addTocart(cartDatas).subscribe((result) => {
        if (result) {
          this.apiService.getCartItems(userId);
          this.removeCart = true;
        }
      })
    }
  }

  removeToCart(productId) {
    if (!localStorage.getItem('users')) {
      this.apiService.removeCart(productId);
      this.removeCart = false;
    } else {
      this.apiService.removeToCart(this.cartData?.id).subscribe((res) => {
        if (res) {
          let localData = JSON.parse(localStorage.getItem('users'));
          let userId = localData && localData[0].id;
          this.apiService.getCartItems(userId);
          console.log("removed from cart");
        }
      })
    }

    this.removeCart = false;

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('productId');
    id && this.apiService.getProduct(id).subscribe((result: any) => {
      this.produtDetals = result;
    });

    //removeCart
    let cartItems = JSON.parse(localStorage.getItem('localCart'));
    if (id && cartItems) {
      cartItems = cartItems.filter((item: products) => id == item.id.toString());
      if (cartItems.length) {
        this.removeCart = true
      } else {
        this.removeCart = false;
      }
    }
    let localData = JSON.parse(localStorage.getItem('users'));
    if (localData) {
      let userId = localData && localData[0].id;
      this.apiService.getCartItems(userId);
      this.apiService.cartItems.subscribe((res) => {
        if (res) {
          let items = res.filter((item: products) => id == item.productId.toString());
          if (items.length) {
            this.cartData = items[0]
            this.removeCart = true;
          }
        }
      })
    }

  }

}
