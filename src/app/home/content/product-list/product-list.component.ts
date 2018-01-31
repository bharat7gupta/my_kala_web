import { getFilters } from './../../reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { CheckoutService } from './../../../core/services/checkout.service';
import { CheckoutActions } from './../../../checkout/actions/checkout.actions';
import { AppState } from './../../../interfaces';
import { Store } from '@ngrx/store';
import { Product } from './../../../core/models/product';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products;
  @Input('filters') selectedFilters;
  @Input() toggleLayout;

  constructor(
    private checkoutService: CheckoutService,
    private store: Store<AppState>,
    private checkoutActions: CheckoutActions) { }

  ngOnInit() { }

  getFilteredProducts() {
    let searchKeys = Object.keys(this.selectedFilters);
    if(searchKeys.length===0) {
      return this.products;
    } else {
      return this.products.filter((product) => {
        let sKeys = Object.keys(this.selectedFilters);
        let valid = true;

        for(var i=0; i<sKeys.length; i++) {
          let terms = this.selectedFilters[sKeys[i]];
          if(terms.length===0) 
            break;

          let index = terms.indexOf( product.attributes[sKeys[i]].toString().toLowerCase() );
          valid = valid && (index >= 0);
        }

        return valid;
      });
    }
  }

  getProductImageUrl(url) {
    return environment.API_ENDPOINT + url;
  }

  addToCart(product: Product) {
    const variant_id = product.master.id;
    this.store.dispatch(this.checkoutActions.addToCart(variant_id));
  }

  getMargin() {
    return this.toggleLayout.size === 'COZY' ? '0 15px 20px 0' : '0 80px 20px 0';
  }

  trackByFn(index, item) {
    return index;
  }

}
