import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../classes/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderDetails: Order;

  constructor(private router: Router) { }

  createOrder(obj: Order) {
    this.orderDetails = obj;
    this.router.navigate(['/home/checkout/success']);
  }

  getOrderItens(): Order {
    return this.orderDetails;
  }

}
