import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {LayoutActions} from "../../../store/actions/layout.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertMessageComponent} from "../../shared/components/alert-message/alert-message.component";
import {AuthenticationSelectors} from "../../../store/selectors/authentication.selectors";
import {AuthenticationActions} from "../../../store/actions/authentication.actions";
import {AnimalSelectors} from "../../../store/selectors/animal.selectors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.HOME == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    });

    this.store.select(AuthenticationSelectors.selectConnectionStatus).subscribe(firstConnection => {
      if (firstConnection == false) {
        this.showSnackBar({
          message: "Vous êtes maintenant connecter",
          style: {color: "green", textAlign: "center", fontWeight: "bold"}
        });
        this.store.dispatch(AuthenticationActions.ResetFirstConnection());
      }
    });
  }

  showSnackBar(data: { message: string, style: any }) {
    this._snackBar.openFromComponent(AlertMessageComponent, {
      data: data,
      horizontalPosition: "center",
      politeness: "polite"
    });
  }

  ngOnDestroy(): void {
  }
}
