import {HttpErrorResponse} from "@angular/common/http";
import {Injectable, OnDestroy} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, EMPTY, map, mergeMap, of, pipe, Subscription, switchMap, tap} from "rxjs";
import {ClientService} from "../../app/services/client/client.service";
import * as fromApp from "src/store/reducers/index"
import {ClientActions} from "src/store/actions/client.actions"
import {ClientGetDTO, ClientPostDTO} from "../../app/models/client";
import {AuthService} from "../../app/services/auth.service";
import {AuthenticationTokenResponse} from "../../app/models/authentication";
import {AuthenticationActions} from "../actions/authentication.actions";
import {AnimalService} from "../../app/services/animal/animal.service";
import {AnimalActions} from "../actions/animal.action";

@Injectable()
export class AnimalEffects implements OnDestroy {

  allSubscriptions = new Subscription();

  constructor(private actions$: Actions,
              private animalService: AnimalService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }

  getAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.GetAnimalsStart),
      mergeMap((data) => {
        return this.animalService.getAnimals(data.batch, 10).pipe(
          map(((data: any) => AnimalActions.GetAnimalsSucceeded({payload: data.animals})))
        )
      }),
      catchError((err: HttpErrorResponse) => {
        this.store.dispatch(AnimalActions.GetAnimalsFailed({error: err}))
        return EMPTY
      })))
}
