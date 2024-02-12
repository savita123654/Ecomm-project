import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  userData: any = [];
  sellerData: any = [];
  input: any;
  inputValue: any;
  searchedResults: any = [];
  cartCount: number = 0;
  constructor(private router: Router, private apiService: ApisService, private userService: UserLoginService) { }

  logOut() {
    localStorage.removeItem("sellerData");
    this.router.navigate(['/'])
  }

  logoutUser() {
    localStorage.removeItem("users");
    this.router.navigate(['/user-auth']);
    this.apiService.cartItems.emit([])
  }

  getUserData() {
    this.sellerData = JSON.parse(localStorage.getItem("sellerData"));
  }

  searchProducts(input: KeyboardEvent) {
    if (input) {
      const element = input.target as HTMLInputElement;
      this.apiService.searchProducts(element.value).subscribe((res: any) => {
        if (res.length > 5) {
          res.length = 5;
        }
        this.searchedResults = res;
      })
    }
  }

  redirectToDetails(id) {
    this.router.navigate([`/product-details/${id}`]);
  }

  submitsearch(val: string) {
    this.router.navigate([`search/${val}`]);


  }

  hideSearch() {
    this.searchedResults = undefined
  }

  selectMenuType() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('sellerData') && val.url.includes('seller')) {
          this.menuType = "seller";
          this.getUserData();
        } else if (localStorage.getItem('users')) {
          this.menuType = "user";
          this.userData = JSON.parse(localStorage.getItem('users'));
          this.apiService.getCartItems(this.userData[0].id);
        } else {
          this.menuType = "default"
        }
      }
    })
  }

  getCartCount() {
    if (localStorage.getItem('localCart')) {
      let localCartData = JSON.parse(localStorage.getItem('localCart'));
      this.cartCount = localCartData.length;

    }
    this.apiService.cartItems.subscribe((res) => {
      this.cartCount = res.length;
    })

  }

  ngOnInit(): void {
    this.selectMenuType();
    this.getCartCount();

  }


}
