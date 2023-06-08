import {HttpErrorResponse} from "@angular/common/http";
import {Injectable, OnDestroy} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, EMPTY, map, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {ClientService} from "../../app/services/client/client.service";
import * as fromApp from "src/store/reducers/index"
import {ClientActions} from "src/store/actions/client.actions"
import {ClientPostDTO} from "../../app/models/client";
import {AuthService} from "../../app/services/auth.service";
import {AuthenticationTokenResponse} from "../../app/models/authentication";
import {AuthenticationActions} from "../actions/authentication.actions";

@Injectable()
export class AuthenticationEffects implements OnDestroy {

  allSubscriptions = new Subscription();

  constructor(private actions$: Actions,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }

  getAccessTokenBySignup = createEffect(
    () => this.actions$.pipe(
      ofType(AuthenticationActions.GetAuthenticationTokenFromSignupStart),
      switchMap(({clientPostDTO}) => {
        return this.authService.login({email: clientPostDTO.email, password: clientPostDTO.password}).pipe(
          switchMap((authenticationToken) => {
            this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromSignupSucceeded({authenticationTokenResponse: authenticationToken}))
            return of(AuthenticationActions.GetAuthenticationTokenFromSignupSucceeded({authenticationTokenResponse: authenticationToken}))
          }),
          catchError((err: HttpErrorResponse) => {
            this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromSignupFailed({error: err})) // Ajouter dans l'effect de l'authentication le refreshAction
            return EMPTY
          })
        )
      })
    )
  )

  authenticateClient = createEffect(
    () => this.actions$.pipe(
      ofType(AuthenticationActions.GetAuthenticationTokenFromLoginStart),
      switchMap(({credentials}) => {
        return this.authService.login({email: credentials.email, password: credentials.password}).pipe(
          switchMap((authenticationToken) => {
            localStorage.setItem("token_id", authenticationToken.accessToken);
            this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromLoginSucceeded({authenticationTokenResponse: authenticationToken}))
            return of(ClientActions.GetClientStart({email: credentials.email}))
          }),
          catchError((err: HttpErrorResponse) => {
            if(err.status >= 500) {
              this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromLoginFailed({error: { ...err, message: "Erreur Serveur"}}))
              return EMPTY
            }
            this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromLoginFailed({error: { ...err, message: "Email/Mot de passe erroné"}}))
            return EMPTY
          })
        )
      })
    )
  )

  logout = createEffect(
    () => this.actions$.pipe(
      ofType(AuthenticationActions.LogoutClientStart),
      switchMap(() => {
        this.store.dispatch(AuthenticationActions.LogoutClientSucceeded());
        localStorage.removeItem("token_id");
        return of(ClientActions.Logout())
      }),
    )
  )
}
