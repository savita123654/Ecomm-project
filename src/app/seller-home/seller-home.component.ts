import { Component } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { products } from '../data-type';
import { faCoffee, faDeleteLeft, faEdit, faRemove, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {
  productList: products[] | undefined = [];
  constructor(private apiService: ApisService, private router: Router) { }
  faCoffee = faTrash;
  faEdit = faEdit;

  deleteProduct(item) {
    this.apiService.deleteProduct(item.id).subscribe((res) => {
      this.getProuctList()
    })
  }

  // editProduct(item) {
  //   this.router.navigate(['seller-update-product'],);
  // }

  getProuctList() {
    this.apiService.getProducts().subscribe((res: any) => {
      if (res) {
        this.productList = res;
      }
    })
  }

  ngOnInit() {
    this.getProuctList()
  }
}
