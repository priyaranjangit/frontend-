import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/shared/classes/cart-items.interface';
import { CartService } from 'src/app/shared/service/cart.service';
import { Global } from 'src/app/shared/service/global';
import { HttpService } from 'src/app/shared/service/http.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  checkOutItems: CartItem[] = [];
  orderDetails: any[] = [];
  amount: number;
  totalAmount: number;
  shippingAmount: number = 40;
  handler: any = null;

  constructor(public _productsService: ProductsService, private _httpService: HttpService,
    private _fb: FormBuilder, private _toastr: ToastrService,
    private _cartService: CartService, private _orderService: OrderService) { }

  createRegForm() {
    this.checkoutForm = this._fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],
      amount: [0]
    });
  }

  ngOnInit(): void {
    this.createRegForm();
    this._cartService.getItems().subscribe(res => {
      this.checkOutItems = res;
    });

    this.getTotal().subscribe(res => {
      this.amount = res;
      this.totalAmount = res + this.shippingAmount;
    });

  }

  getTotal(): Observable<number> {
    return this._cartService.getTotalAmount();
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_IMfLDyTjBvG9AK7MNtHntboG00XQFgMOiE',//Need to change
          locale: 'auto',
          token: function () {
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

  onSubmit(formData: any) {
    if (this.checkoutForm.invalid) {
      return;
    }

    let allItems = [];
    for (let i = 0; i < this.checkOutItems.length; i++) {
      allItems[i] = {
        ProductId: this.checkOutItems[i].product.id,
        Quantity: this.checkOutItems[i].quantity,
        Size: '',
        Color: '',
        Price: this.checkOutItems[i].product.price,
        Discount: this.checkOutItems[i].product.discount
      }
    }

    let obj = {
      id: 0,
      firstname: formData.value.firstname,
      lastname: formData.value.lastname,
      phone: formData.value.phone,
      email: formData.value.email,
      address: formData.value.address,
      country: formData.value.country,
      town: formData.value.town,
      state: formData.value.state,
      postalcode: formData.value.postalcode,
      amount: this.amount,
      shippingAmount: 40,
      paymentTypeId: 1,
      items: allItems,
      payment: null
    }


    let saveData = (obj) => this._httpService.post(Global.BASE_API_PATH + "PaymentMaster/Save/", obj).subscribe(objdata => {
      if (objdata.isSuccess) {
        this._cartService.clearAllItemFromnCart();
        this._toastr.success("Payment done successfully!", "Payment Master");
        let orderDetails = {
          product: this.checkOutItems,
          shippingDetails: obj,
          orderId: objdata.data.orderId,
          totalAmount: this.totalAmount,
          expectedDate: objdata.data.expecteddate,
          paymentDate: objdata.data.paymentDate
        };
        this._orderService.createOrder(orderDetails);
        this.checkoutForm.reset();
      } else {
        this._toastr.error(objdata.errors[0], "Payment Master");
      }
    });


    // For Payment here
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_IMfLDyTjBvG9AK7MNtHntboG00XQFgMOiE', //Need to change
      locale: 'auto',
      token: function (token: any) {
        let objPayment = { tokenId: token.id, amount: obj.amount + obj.shippingAmount, description: "Shopping with sahosoft mall-18-Dec-2021" };
        console.log(token);
        obj.payment = objPayment;
        saveData(obj);
      }
    });

    handler.open({
      name: 'Sahosoft Mall',
      description: 'ecommerce',
      country: 'INDIA',
      currency: 'INR',
      amount: this.totalAmount * 100
    });


    // this._httpService.post(Global.BASE_API_PATH + "PaymentMaster/Save/", obj).subscribe(objdata => {
    //   if (objdata.isSuccess) {
    //     this._toastr.success("Payment done successfully!", "Payment Master");
    //   } else {
    //     this._toastr.error(objdata.errors[0], "Payment Master");
    //   }
    // });


  }
}


