import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/shared/classes/cart-items.interface';
import { Product } from 'src/app/shared/classes/product.interface';
import { CartService } from 'src/app/shared/service/cart.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  shoppingCartItems: CartItem[] = [];

  constructor(private _cartService: CartService, private _productsService: ProductsService) { }

  ngOnInit(): void {
    this._cartService.getItems().subscribe(res => {
      this.shoppingCartItems = res;
    });
  }
  increment(product: Product, quantity: number = 1) {
    this._cartService.updateCartItem(product, quantity);
  }
  decrement(product: Product, quantity: number = -1) {
    this._cartService.updateCartItem(product, quantity);
  }
  removeItem(product: CartItem) {
    this._cartService.removeFromCart(product);
  }

  getTotalAmt() : Observable<number>{
    return this._cartService.getTotalAmount();
  }
}
