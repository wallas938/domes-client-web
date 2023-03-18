import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers';
import {LayoutActions} from 'src/store/actions/layout.actions';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {selectRouterUrl} from "../../../../../store/selectors/router.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  DOMES_BASE_PATHS=DOMES_BASE_PATHS
  currentPath: Observable<string>;
  constructor(private store: Store<fromApp.AppState>) {
    this.currentPath = this.store.select(selectRouterUrl)
  }

  closeMenu() {
    this.store.dispatch(LayoutActions.MobileMenuClosed())
  }
}
