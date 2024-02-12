import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { cart, products } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularProductlist: undefined | products[] = [];
  productList: undefined | products[];
  customNum: number = 1;
  produtDetals: undefined | products;
  // removeCart: boolean = false;
  selectedIndex: any = '';
  selectedProduct: number;
  cartData: any;
  constructor(private apiService: ApisService) { }

  getPopularProducts() {
    this.apiService.getPopularProducts().subscribe((res) => {
      if (res) {
        this.popularProductlist = res;
      }
    })
  }

  getProuctList() {
    this.apiService.getTrendyProducts().subscribe((res: any) => {
      if (res) {
        this.productList = res;
      }
    })
  }

  addItems(type, idx, product) {

    this.productList.forEach((ele, index) => {
      if (idx === index) {
        this.produtDetals = ele;
        this.selectedIndex = index;
      }
    })
    if (type == 'add' && this.customNum < 20) {
      this.customNum += 1;
    } else if (type == 'minus' && this.customNum > 1) {
      this.customNum -= 1;
    }
    this.produtDetals.quantity = this.customNum;
  }

  addToCart(product: products, i) {
    this.produtDetals = product;
    this.produtDetals.quantity = this.customNum;
    this.productList.forEach((ele, index) => {
      if (i === index) {
        this.selectedProduct = i;
        product.disabled = true
        if (!localStorage.getItem('users')) {
          this.apiService.localAddCart(this.produtDetals);
          // this.removeCart = true;

        } else if (localStorage.getItem('users')) {
          let localData = JSON.parse(localStorage.getItem('users'))[0];
          let userId = localData && localData.id;
          let cartDatas: cart = {
            ...this.produtDetals,
            productId: this.produtDetals?.id,
            userId
          }

          delete cartDatas.id;
          this.apiService.addTocart(cartDatas).subscribe((result) => {
            if (result) {
              this.apiService.getCartItems(userId);
              // this.removeCart = true;
            }
          })
        }
      }
    })
  }

  removeCartItem(product, index) {
    let productId = product.id;
    if (!localStorage.getItem('users')) {
      this.apiService.removeCart(productId);
      product.disabled = false;
    } else {
      this.cartData.forEach(ele => {
        if (ele.productId == productId) {
          this.apiService.removeToCart(ele.id).subscribe((res) => {
            if (res) {
              let localData = JSON.parse(localStorage.getItem('users'));
              let userId = localData && localData[0].id;
              this.apiService.getCartItems(userId);
              product.disabled = false;
            }
          })
        }
      })
    }
  }

  ngOnInit(): void {
    this.getPopularProducts();
    this.getProuctList();
    let localData = JSON.parse(localStorage.getItem('users'));
    if (localData) {
      let userId = localData && localData[0].id;
      this.apiService.getCartItems(userId);
      this.apiService.cartItems.subscribe((res: any) => {
        if (res) {
          this.cartData = res;
          if (this.productList?.length) {
            this.productList.forEach((ele, index) => {
              res.forEach((item: products, itemIndex) => {
                if (item.productId === ele.id) {
                  ele.disabled = true;
                }
              });
            })
          }
        }
      })
    }

  }

}
