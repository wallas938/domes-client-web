import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers';
import {LayoutActions} from 'src/store/actions/layout.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private store: Store<fromApp.AppState>) {
  }

  closeMenu() {
    this.store.dispatch(LayoutActions.MobileMenuClosed())
  }
}
