import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApisService } from '../services/apis.service';
import { cart, orderData, products } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  shippingForm: FormGroup;
  totalPrice: number | undefined;

  cartData: cart[] | undefined;
  orderedMsg: string = '';
  constructor(private fb: FormBuilder, private apiService: ApisService, private router: Router) { }

  onSubmit(form: FormGroup) {
    let user = JSON.parse(localStorage.getItem('users'));
    let userId = user && user[0].id;
    if (this.totalPrice) {
      const inputData: orderData = {
        ...form.value,
        totalPrice: this.totalPrice,
        userId: userId
      }
      if (this.cartData?.length) {
        this.cartData?.forEach((item) => {
          setTimeout(() => {
            if (item.id)
              this.apiService.deleteCartItems(item?.id);
          }, 2000)

        });
      }

      this.apiService.orderNow(inputData).subscribe((res) => {
        if (res) {
          this.orderedMsg = "your order is placed!"
          this.initShippingForm();
          setTimeout(() => {
            this.router.navigate(['my-orders']);
            this.orderedMsg = ""
          }, 3000)

        } else {
          console.log("something went wrong!")
        }
      })

    }
  }

  initShippingForm() {
    this.shippingForm = this.fb.group({
      email: [''],
      address: [''],
      contact: ['']
    });

  }

  ngOnInit() {
    //initiate the shippingForm
    this.initShippingForm();
    let user = JSON.parse(localStorage.getItem('users'));
    let userId = user && user[0].id;
    this.apiService.getCartItems(userId);
    this.apiService.cartItems.subscribe((res) => {
      if (res) {
        this.cartData = res;
        let price = 0;

        res.forEach(item => {
          if (item.quantity)
            price = price + (+item.price * item.quantity);
        })
        this.totalPrice = price - price / 10 + price / 5 + 100;
      }
    })
  }
}
