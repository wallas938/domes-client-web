import {Component, OnInit} from '@angular/core';
import {ClientGetDTO} from "../../models/client";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {ClientSelectors} from "../../../store/selectors/client.selectors";
import {RouterSelectors} from "../../../store/selectors/router.selectors";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  client: ClientGetDTO | undefined;
  currentPath: string | undefined;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select(ClientSelectors.selectClient).subscribe(value => {
      this.client = value;
    })
    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      this.currentPath = value;
    })
  }
}
