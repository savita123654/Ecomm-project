import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { products } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularProductlist: undefined | products[] = [];
  productList: undefined | products[];
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

  ngOnInit(): void {
    this.getPopularProducts();
    this.getProuctList();
  }

}
