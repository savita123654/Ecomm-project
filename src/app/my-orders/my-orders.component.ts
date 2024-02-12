import { Component } from '@angular/core';
import { faCartPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';
import { orderData } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  cartIcon = faCartPlus;
  trash = faTrash;
  myOrders: orderData[] | undefined;
  constructor(private apiService: ApisService, private router: Router) { }

  cancelOrder(id: number | undefined) {
    this.apiService.cancelOrder(id).subscribe((res: orderData[]) => {
      if (res) {
        console.log("item deleted");
        this.getOrders();
      }
    })
  }
  getOrders() {
    let user = JSON.parse(localStorage.getItem('users'));
    let userId = user && user[0].id;
    this.apiService.getOrders(userId).subscribe((res: any) => {
      if (res) {

        this.myOrders = res;
      }
    })
  }
  ngOnInit() {
    this.getOrders()
  }
}
