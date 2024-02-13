import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/classes/order.interface';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  orderDetails: Order;

  constructor(private _orderService: OrderService, public _productsService: ProductsService) { }

  ngOnInit(): void {
    this.orderDetails = this._orderService.getOrderItens();
  }

}
