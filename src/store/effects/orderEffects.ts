import {HttpErrorResponse} from "@angular/common/http";
import {Injectable, OnDestroy} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, EMPTY, map, mergeMap, of, pipe, Subscription, switchMap, tap} from "rxjs";
import {ClientService} from "../../app/services/client/client.service";
import * as fromApp from "src/store/reducers/index"
import {ClientActions} from "src/store/actions/client.actions"
import {AuthService} from "../../app/services/auth.service";
import {AuthenticationActions} from "../actions/authentication.actions";
import {OrderActions} from "../actions/order.action";
import {OrderService} from "../../app/services/order/order.service";
import {AnimalActions} from "../actions/animal.action";
import {Specie} from "../../app/models/animal";

@Injectable()
export class OrderEffects implements OnDestroy {

  allSubscriptions = new Subscription();

  constructor(private actions$: Actions,
              private orderService: OrderService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }

  postOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.PostOrderStart),
      switchMap(({order}) => {
          return this.orderService.postOrder(order).pipe(
            switchMap((orderGetDTO) => {
              return of(OrderActions.PostOrderSucceeded({order: orderGetDTO}));
            }),
            catchError((err: HttpErrorResponse) => {
              this.store.dispatch(ClientActions.GetClientFailed({error: {...err, message: "Erreur Serveur"}})) // Ajouter dans l'effect de l'authentication le refreshAction
              return EMPTY
            })
          )
        }
      )
    )
  );

}
