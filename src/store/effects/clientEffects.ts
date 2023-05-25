import {HttpErrorResponse} from "@angular/common/http";
import {Injectable, OnDestroy} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, EMPTY, map, of, pipe, Subscription, switchMap, tap} from "rxjs";
import {ClientService} from "../../app/services/client/client.service";
import * as fromApp from "src/store/reducers/index"
import {ClientActions} from "src/store/actions/client.actions"
import {ClientGetDTO, ClientPostDTO} from "../../app/models/client";
import {AuthService} from "../../app/services/auth.service";
import {AuthenticationTokenResponse} from "../../app/models/authentication";
import {AuthenticationActions} from "../actions/authentication.actions";

@Injectable()
export class ClientEffects implements OnDestroy {

  allSubscriptions = new Subscription();

  constructor(private actions$: Actions,
              private clientService: ClientService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }

  signup$ = createEffect(
    () => this.actions$.pipe(
      ofType(ClientActions.PostClientStart),
      switchMap(({clientPostDTO}) => this.clientService.postClient(clientPostDTO)
        .pipe(map((clientGetDTO) => {
            this.store.dispatch(ClientActions.PostClientSucceeded({clientGetDTO}))
          }),
          switchMap((clientGetDTO) => of(AuthenticationActions.GetAuthenticationTokenFromSignupStart({clientPostDTO}))),
          catchError((err: HttpErrorResponse) => {
            this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromSignupFailed({error: err})) // Ajouter dans l'effect de l'authentication le refreshAction
            return EMPTY
          })),
      )));


  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(ClientActions.GetClientStart),
      switchMap(value => this.clientService.getClient(value.email)),
      map(clientGetDTO => ClientActions.GetClientSucceeded({clientGetDTO})),
      catchError((err: HttpErrorResponse) => {
        this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromSignupFailed({error: err}))
        return EMPTY
      })
    )
  )

  // signup$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(ClientActions.PostClientStart),
  //     switchMap(({clientPostDTO}) => this.clientService.postClient(clientPostDTO).pipe(
  //       switchMap(clientGetDTO => {
  //           this.store.dispatch(ClientActions.PostClientSucceeded({clientGetDTO}))
  //           return this.authService.login({email: clientGetDTO.email, password: clientGetDTO.password}).pipe(
  //             map(authenticationTokenResponse => AuthenticationActions.GetAuthenticationTokenSucceeded(
  //               {authenticationTokenResponse: authenticationTokenResponse})
  //             ),
  //             catchError((err: HttpErrorResponse) => {
  //               this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFailed({error: err})) // Ajouter dans l'effect de l'authentication le refreshAction
  //               return EMPTY
  //             })
  //           )
  //         },
  //       ),
  //       catchError((err: HttpErrorResponse) => {
  //         this.store.dispatch(ClientActions.PostClientFailed({error: err}))
  //         return EMPTY
  //       })),
  //     )));
}
