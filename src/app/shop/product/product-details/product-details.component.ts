import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/classes/product.interface';
import { CartService } from 'src/app/shared/service/cart.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  slideConfig = {
    slidesToShow: 1,
    SlidesToScroll: 1,
    arrows: true,
    fade: true
  }
  slideNavConfig = {
    slidesToShow: 3,
    SlidesToScroll: 1,
    vertical: false,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    asNavFor: '.product-slick'
  }

  product: Product = {};
  products: Product[] = [];
  counter: number = 1;
  selectedSize: any = '';

  constructor(public _productService: ProductsService, private route: ActivatedRoute, private router: Router,
    private _cartService: CartService, private _wishlistService: WishlistService) {
    this.route.params.subscribe(param => {
      let id = param['id'];
      this._productService.getProduct(parseInt(id)).subscribe(res => {
        this.product = res;
      });
    });
  }
  ngOnInit(): void {
    this._productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }
  increment() {
    this.counter += 1;
  }
  decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }
  addToCart(product: Product, quantity: number = 1) {
    this._cartService.addToCart(product, quantity);
  }
  addToWishlist(product: Product) {
    this._wishlistService.addToWishlist(product);
  }
  buyNow(product: Product, quantity: number) {
    if (quantity > 0) {
      this._cartService.addToCart(product, quantity);
      this.router.navigate(['/home/checkout']);
    }
  }

  changeSize(size: any) {
    this.selectedSize = size;
  }

}
