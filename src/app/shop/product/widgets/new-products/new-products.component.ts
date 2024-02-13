import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.interface';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {
  products: Product[] = [];
  slideProducts = [];

  constructor(public _productServices: ProductsService) { }

  ngOnInit(): void {
    this._productServices.getProducts().subscribe(res => {
      this.products = res;

      let items = res;

      while (items.length > 0) {
        this.slideProducts.push(items.splice(0, 3));
      }

    });


  }

}
