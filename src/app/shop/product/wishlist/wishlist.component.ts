import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.interface';
import { CartService } from 'src/app/shared/service/cart.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistItems: Product[] = [];
  constructor(private _wishlistService: WishlistService, private _productsService: ProductsService, private _cartService: CartService) { }

  ngOnInit(): void {
    this._wishlistService.getItems().subscribe(res => {
      this.wishlistItems = res;
    });
  }
  removeItem(product: Product) {
    this._wishlistService.removeFromWishlist(product);
  }
  addToCart(product: Product) {
    this._cartService.addToCart(product);
    this._wishlistService.removeFromWishlist(product);
  }

}
