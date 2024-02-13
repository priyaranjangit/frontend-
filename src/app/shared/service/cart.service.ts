import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItem } from '../classes/cart-items.interface';
import 'rxjs/add/operator/map';
import { Product } from '../classes/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = JSON.parse(localStorage.getItem("cartItem")) || [];
  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(private _toastr: ToastrService) { }

  // get cart items
  getItems(): Observable<CartItem[]> {
    return of(this.products);
  }

  // Get Total amount of Cart Items
  getTotalAmount(): Observable<number> {
    return this.cartItems.map(() => {
      return this.products.reduce((total: number, item: CartItem) => {
        return total + (item.product.price * item.quantity)
      },0);
    });
  }

  // Add To Cart
  addToCart(product: Product, qty: number = 1) {
    let item: CartItem ;

    // If Product already exists in Cart list (Update quantity in Cart list)
    let hasItem = this.products.find((item: CartItem, index: number) => {
      if (item.product.id === product.id) {
        // let Qty = this.products[index].quantity + qty;
        let Qty = item.quantity + qty;

        let stock = this.calculateStockCounts(item,qty);

        if (Qty != 0 && stock) {
          this.products[index].quantity = Qty;
          localStorage.setItem("cartItem", JSON.stringify(this.products));
          this._toastr.success("This item already added in cart so item quantity has been increased !!", "Cart");
        }
        return true;
      }
      return false;
    });

    // If item does not exists (add new item in cart list)
    if(!hasItem){
      item = {product : product,quantity : qty};
      this.products.push(item);
      localStorage.setItem("cartItem", JSON.stringify(this.products));
      this._toastr.success("Product has been added in cart !!", "Cart");
    }
  }

updateCartItem(product: Product, qty: number = 1) {
 return this.products.find((item: CartItem, index: number) => {
    if (item.product.id === product.id) {
      // let Qty = this.products[index].quantity + qty;
      let Qty = item.quantity + qty;

      let stock = this.calculateStockCounts(item,qty);

      if (Qty != 0 && stock) {
        this.products[index].quantity = Qty;
        localStorage.setItem("cartItem", JSON.stringify(this.products));
      }
    }
  });
}


  calculateStockCounts(product: CartItem, quantity: number) {
    let qty = product.quantity + quantity;
    let stock = product.product.stock;

    if (stock < qty) {
      this._toastr.error("You cannot add mnore item in cart !!", "Cart");
      return false;
    }
    return true;
  }

  removeFromCart(product : CartItem){
    let index =  this.products.indexOf(product);
    if(index > -1){
      this.products.splice(index,1);
      localStorage.setItem("cartItem", JSON.stringify(this.products));
    }
  }

  clearAllItemFromnCart(){
    this.products.splice(0,this.products.length);
    localStorage.setItem("cartItem", JSON.stringify(this.products));
  }

}
