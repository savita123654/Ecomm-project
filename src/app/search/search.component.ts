import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { products } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private route: ActivatedRoute, private apiService: ApisService, private router: Router) { }
  searchedItems: undefined | products[] = [];

  productDetails(id) {
    this.router.navigate([`product-details/${id}`]);
  }

  ngOnInit() {
    let query = this.route.snapshot.paramMap.get('query');
    this.apiService.searchProducts(query).subscribe((result: any) => {
      this.searchedItems = result;
    })

  }
}
