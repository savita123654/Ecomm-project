import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  constructor(private apiservice: ApisService) { }
  addProductForm: FormGroup;
  productAdded: boolean = false;

  onSubmit(form: FormGroup): any {
    console.log(form.value);
    this.apiservice.addProducts(form.value).subscribe((result) => {
      if (result) {
        this.productAdded = true;
        // this.addProductForm.reset();
        this.initAddForm();
      }
      setTimeout(() => {
        this.productAdded = false;
      }, 3000);

    });
  }

  initAddForm() {
    this.addProductForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      color: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl('https://www.ineedamobile.com/wp-content/uploads/2019/03/iphone-x-600x598.png')
    })
  }
  ngOnInit() {
    this.initAddForm()

  }
}
