import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.interface';
import { CartService } from 'src/app/shared/service/cart.service';
import { CompareService } from 'src/app/shared/service/compare.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  variantImage: string;

  constructor(public _productService: ProductsService, private _cartService: CartService,
    private _wishlistService: WishlistService, private _compareService: CompareService) { }

  ngOnInit(): void {
    this.variantImage = this.product.variants.length > 0 ? this.product.variants[0].images : "";
  }

  changeVarient(img: string) {
    this.variantImage = img;
  }

  addToCart(product: Product) {
    this._cartService.addToCart(product);
  }
  addToWishlist(product: Product) {
    this._wishlistService.addToWishlist(product);
  }
  addToCompare(product: Product) {
    this._compareService.addToCompare(product);
  }
}
