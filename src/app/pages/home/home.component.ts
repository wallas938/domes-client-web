import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {LayoutActions} from "../../../store/actions/layout.actions";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.HOME == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    });

    this.route.fragment.subscribe(value => {
      // if (value?.toLowerCase() === 'home') {
      //   console.log(value)
      //   this.router.navigate(['home'], {fragment: 'home', preserveFragment: true}).then(r => {
      //   });
      // }
    })
  }

  ngOnDestroy(): void {
  }
}
