import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.interface';
import { CartService } from 'src/app/shared/service/cart.service';
import { CompareService } from 'src/app/shared/service/compare.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  compareItems: Product[] = [];
  constructor(private _compareService: CompareService, public _productsService: ProductsService, private _cartService: CartService) { }

  ngOnInit(): void {
    this._compareService.getItems().subscribe(res => {
      this.compareItems = res;
      debugger;
    });
  }
  removeItem(product: Product) {
    this._compareService.removeFromCompare(product);
  }

  addToCart(product: Product, quantity: number = 1) {
    this._cartService.addToCart(product, quantity);
  }
}
