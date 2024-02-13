import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Product } from '../classes/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  products = JSON.parse(localStorage.getItem("compareItem")) || [];

  constructor(private _toastr: ToastrService) { }

  // get Compare List items
  getItems(): Observable<Product[]> {
    return of(this.products);
  }
  hasProducts(product: Product): boolean {
    let item = this.products.find((item: Product) => item.id === product.id);
    return item !== undefined;
  }

  addToCompare(product: Product) {
    if (!this.hasProducts(product)) {
      if (this.products.length < 4) {
        this.products.push(product);
        localStorage.setItem("compareItem", JSON.stringify(this.products));
        this._toastr.success("Product has been added in compare list !!", "Compare List");
      } else {
        this._toastr.warning("You can add maximum 4 products in compare list !!", "Compare List");
      }
    } else {
      this._toastr.warning("This Product already added in your Compare List !!", "Compare List");
    }
  }
  
  removeFromCompare(product: Product) {
    let index = this.products.indexOf(product);
    if (index > -1) {
      this.products.splice(index, 1);
      localStorage.setItem("compareItem", JSON.stringify(this.products));
    }
  }
}
