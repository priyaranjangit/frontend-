import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/shared/classes/cart-items.interface';
import { CartService } from 'src/app/shared/service/cart.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(private translate: TranslateService, private _cartService: CartService , 
    public _productsService: ProductsService ) { }

  ngOnInit(): void {
    this._cartService.getItems().subscribe(res => {
      this.cartItems = res;
    });
  }

  getTotal(): Observable<number> {
    return this._cartService.getTotalAmount();
  }

  removeItem(item: CartItem) {
    this._cartService.removeFromCart(item);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

}
