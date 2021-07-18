import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import authActions from './auth/store';

import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new authActions.AutoLogin());
  }
}
