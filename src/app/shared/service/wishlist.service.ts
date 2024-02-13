import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Product } from '../classes/product.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  products = JSON.parse(localStorage.getItem("wishlistItem")) || [];

  constructor(private _toastr: ToastrService) { }

  // get Wishlist items
  getItems(): Observable<Product[]> {
    return of(this.products);
  }

  hasProducts(product: Product): boolean {
    let item = this.products.find((item: Product) => item.id === product.id);
    return item !== undefined;
  }

  // hasProducts(product: Product) {
  //   let item = this.products.find((item: Product) => item.id === product.id);
  //   return item ;
  // }

  addToWishlist(product: Product) {
    if (!this.hasProducts(product)) {
      this.products.push(product);
      localStorage.setItem("wishlistItem", JSON.stringify(this.products));
      this._toastr.success("Product has been added in wishlist !!", "Wishlist");
    } else {
      this._toastr.warning("This Product already added in your wishlist !!", "Wishlist");
    }
  }
  removeFromWishlist(product: Product) {
    let index = this.products.indexOf(product);
    if (index > -1) {
      this.products.splice(index, 1);
      localStorage.setItem("wishlistItem", JSON.stringify(this.products));
    }
  }
}
