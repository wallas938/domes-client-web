import {HttpErrorResponse} from "@angular/common/http";
import {Injectable, OnDestroy} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, map, of, Subscription, switchMap, tap} from "rxjs";
import {ClientService} from "../../app/services/client/client.service";
import * as fromApp from "src/store/reducers/index"
import {ClientActions} from "src/store/actions/client.actions"
import {ClientPostDTO} from "../../app/models/client";

@Injectable()
export class ClientEffects implements OnDestroy {

  allSubscriptions = new Subscription();

  constructor(private actions$: Actions,
              private clientService: ClientService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }

  postOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(ClientActions.PostClientStart),
      switchMap(({clientPostDTO}) => this.clientService.postClient(clientPostDTO)
        .pipe(map((clientGetDTO) => {
            console.log(clientGetDTO)
          }),
          switchMap(() => of(ClientActions.PostClientSucceeded())),
          catchError((error) => of(ClientActions.PostClientFailed(error)))
        ))
    ));

}
