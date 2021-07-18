import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../store/app.reducer';
import authActions from '../auth/store';
import recipesActions from '../recipes/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.store.dispatch(new recipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new recipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new authActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
