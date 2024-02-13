import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/classes/product.interface';
import { ProductsService } from 'src/app/shared/service/products.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  allItems: Product[] = [];
  products: Product[] = [];
  items: Product[] = [];

  colors: any[] = [];
  brands: any[] = [];

  brandFilters: any[] = [];
  colorFilters: any[] = [];

  isMen: boolean = true;
  finished: boolean = true;

  constructor(private route: ActivatedRoute, private _productsService: ProductsService) {
    this.route.params.subscribe(params => {
      let category = params['category'];
      if (category === 'men') {
        this.isMen = true;
      } else {
        this.isMen = false;
      }

      this._productsService.getProductByCategory(category).subscribe(res => {
        this.allItems = res;
        this.products = res.slice(0, 8);
        this.items = this.products;

        this.getBrands(res);
        this.getColors(res);
      });
    });
  }

  ngOnInit(): void {
  }

  getBrands(products: Product[]) {
    let uniqueBrands = [];// normal array
    let itemBrands = [];// object of array

    products.map((product) => {
      if (product.tags) {
        product.tags.map((tag) => {
          let index = uniqueBrands.indexOf(tag);
          if (index === -1) {
            uniqueBrands.push(tag);
          }
        });
      }
    });

    for (let i = 0; i < uniqueBrands.length; i++) {
      itemBrands.push({ brand: uniqueBrands[i] });
    }

    this.brands = itemBrands;
  }
  getColors(products: Product[]) {
    let uniqueColors = [];// normal array
    let itemColors = [];// object of array

    products.map((product) => {
      if (product.colors) {
        product.colors.map((color) => {
          let index = uniqueColors.indexOf(color);
          if (index === -1) {
            uniqueColors.push(color);
          }
        });
      }
    });

    for (let i = 0; i < uniqueColors.length; i++) {
      itemColors.push({ color: uniqueColors[i] });
    }

    this.colors = itemColors;
  }

  updateBrandFilters(brands: any[]) {
    this.brandFilters = brands;
  }
  updateColorFilters(colors: any[]) {
    this.colorFilters = colors;
  }

  updatePriceFilter(price: any[]) {
    let filterItems: any[] = [];
    this.products.filter((product: Product) => {
      if (product.salePrice >= price[0] && product.salePrice <= price[1]) {
        filterItems.push(product);
      }
    });
    this.items = filterItems;
  }

  filterItems(): Product[] {
    let itemData = this.items.filter((item: Product) => {

      let Colors: boolean = this.colorFilters.reduce((prev, curr) => {
        //match color
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      }, true);

      let Brands: boolean = this.brandFilters.reduce((prev, curr) => {
        //match color
        if (item.tags) {
          if (item.tags.includes(curr)) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      }, true);

      return Colors && Brands;
    });

    return itemData;
  }

  changeLayout(columnSize: number) {
    if (columnSize === 2) {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-xl-6 col-grid-box");
    } else if (columnSize === 3) {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-xl-4 col-grid-box");
    } else if (columnSize === 4) {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-xl-3 col-grid-box");
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-xl-2 col-grid-box");
    }
  }

  onScroll() {
    let lastKey = this.allItems[this.allItems.length - 1]['id']; // get product id of last record of products
    let currentKey = this.products[this.products.length - 1]['id']; // get product id of currentlty binded last record of products

    if (lastKey != currentKey) {
      this.finished = false;
    } else {
      this.finished = true;
    }

    if (this.products.length < this.allItems.length) {
      for (let i = this.products.length; i < this.products.length + 4; i++) {
        if (this.allItems[i] == undefined) {
          return true;
        }
        this.products.push(this.allItems[i]);
      }
    }
    return true;

  }
}
