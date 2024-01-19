import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent {
  updateProductForm: UntypedFormGroup;
  productDetails: any;
  productId;
  constructor(private route: ActivatedRoute, private router: Router, private fb: UntypedFormBuilder, private apiService: ApisService) { }

  onSubmit(form: FormGroup) {
    this.apiService.editProduct(this.productId, form.value).subscribe((res) => {
      if (res) {
        console.log("product updated successfully!");
        this.router.navigate(['seller-home'])
      }
    })
  }
  getProductDetails(id) {
    this.apiService.getProduct(id).subscribe((res) => {
      if (res) {
        this.productDetails = res;
        this.initupdateForm();
      }
    })
  }

  initupdateForm() {
    this.updateProductForm = this.fb.group({
      name: [this.productDetails.name || ''],
      price: [this.productDetails.price || null],
      color: [this.productDetails.color || null],
      category: [this.productDetails.category || null],
      description: [this.productDetails.description || null],
      image: ['https://www.ineedamobile.com/wp-content/uploads/2019/03/iphone-x-600x598.png']
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(this.productId);
    this.updateProductForm.patchValue(this.productDetails)
  }
}
