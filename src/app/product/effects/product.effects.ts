import 'rxjs/add/operator/mergeMap';

import { Product } from './../../core/models/product';
import { ProductActions } from './../actions/product-actions';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { ProductService } from './../../core/services/product.service';
// import { ProductDummyService } from './../../core/services/product-dummy.service';
import { Action } from '@ngrx/store';


@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
              private productService: ProductService,
              private productActions: ProductActions) { }

  // tslint:disable-next-line:member-ordering
  @Effect()
    GetAllProducts$: Observable<Action> = this.actions$
    .ofType(ProductActions.GET_ALL_PRODUCTS)
    .switchMap((action: any) => this.productService.getProducts(action.productType))
    .mergeMap((data: any) => {
      let attributes = data.attributes;
      let attrOrder = data.order;
      let taxonomies = [];
      
      Object.keys(attributes)
        .forEach((key) => {
          let taxons = [];
          Object.keys(attributes[key]).forEach((tKey) => taxons.push({ name: tKey, count:  attributes[key][tKey]}));
          taxonomies.push({ name: key, taxons:  taxons });
        });

      taxonomies.sort(function(t1, t2) { return attrOrder[t1.name] - attrOrder[t2.name]; });

      return [
        this.productActions.getAllTaxonomiesSuccess({taxonomies: taxonomies}),
        this.productActions.getAllProductsSuccess({products: data.products})
      ]
    });

  // @Effect()
  //   GetAllTaxonomies$: Observable<Action> = this.actions$
  //   .ofType(ProductActions.GET_ALL_TAXONOMIES)
  //   .switchMap((action: any) => this.productService.getTaxonomies())
  //   .map((data: any) => this.productActions.getAllTaxonomiesSuccess({taxonomies: data}));

  @Effect()
  GetProductDetail$: Observable<Action> = this.actions$
    .ofType(ProductActions.GET_PRODUCT_DETAIL)
    .switchMap((action: any) => this.productService.getProduct(action.payload))
    .map((data: any) => this.productActions.getProductDetailSuccess(data));
}
