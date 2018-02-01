import { Router } from '@angular/router';
import { SearchActions } from './../../home/reducers/search.actions';
import { getTotalCartItems } from './../../checkout/reducers/selectors';
import { Component, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces';
import { getAuthStatus } from '../../auth/reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from '../../auth/actions/auth.actions';
import { HttpService } from '../../core/services/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  // isAuthenticated: Observable<boolean>;
  // totalCartItems: Observable<number>;
  // taxonomies$: Observable<any>;
  productTypes = [];
  remProductTypes = [];
  selectedProductType: string;
  showRemProdTypes: boolean = false;
  
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private authActions: AuthActions,
    private searchActions: SearchActions,
    private router: Router,
    private http: HttpService,
    private cdr: ChangeDetectorRef
  ) {
    // this.taxonomies$ = this.store.select(getTaxonomies);
  }

  ngOnInit() {
    // this.store.dispatch(this.authActions.authorize());
    // this.isAuthenticated = this.store.select(getAuthStatus);
    // this.totalCartItems = this.store.select(getTotalCartItems);

    // this.http.get("/on15x")
    this.http.get("/products/productTypes")
      .subscribe((data) => {
          this.productTypes = data.json().slice(0, 5);
          this.remProductTypes = data.json().slice(5);
          this.selectedProductType = this.productTypes[0];
          this.router.navigate(['products/' + this.selectedProductType]);
          this.cdr.detectChanges();
      });
  }

  selectProductType(type) {
    // this.store.dispatch(this.searchActions.addFilter(type));
    this.selectedProductType = type;
    this.router.navigate(['products/' + type]);
  }

  showRemProductTypes() {
    this.showRemProdTypes = !this.showRemProdTypes;
  }

}
