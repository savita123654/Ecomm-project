import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  userData: any = [];
  input: any;
  inputValue: any;
  searchedResults: any = [];
  constructor(private router: Router, private apiService: ApisService) { }

  logOut() {
    localStorage.removeItem("sellerData");
    this.router.navigate(['/'])
  }

  getUserData() {
    this.userData = JSON.parse(localStorage.getItem("sellerData"));
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

  hideSearch() {
    this.searchedResults = undefined
  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('sellerData') && val.url.includes('seller')) {
          this.menuType = "seller";
          this.getUserData();
        } else {
          this.menuType = "default"
        }
      }
    })
  }

}
