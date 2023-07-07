import {HttpErrorResponse} from "@angular/common/http";
import {Injectable, OnDestroy} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, EMPTY, map, mergeMap, Subscription} from "rxjs";
import * as fromApp from "src/store/reducers/index"
import {AuthService} from "../../app/services/auth.service";
import {AnimalService} from "../../app/services/animal/animal.service";
import {AnimalActions} from "../actions/animal.action";
import {Category, Specie} from "../../app/models/animal";

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
      mergeMap(({pageNumber}) => {
        return this.animalService.getAnimals(pageNumber, '').pipe(
          map(((data: any) => AnimalActions.GetAnimalsSucceeded({payload: data.animals})))
        )
      }),
      catchError((err: HttpErrorResponse) => {
        this.store.dispatch(AnimalActions.GetAnimalsFailed({error: err}))
        return EMPTY
      })))

  getAnimalsBySearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.GetAnimalsBySearchStart),
      mergeMap(({pageNumber, searchValue}) => {
        return this.animalService.getAnimals(pageNumber, searchValue).pipe(
          map(((data: any) => AnimalActions.GetAnimalsBySearchSucceeded({payload: data.animals, searchValue: searchValue})))
        )
      }),
      catchError((err: HttpErrorResponse) => {
        this.store.dispatch(AnimalActions.GetAnimalsBySearchFailed({error: err}))
        return EMPTY
      })))

  getSpecies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.GetSpeciesByCategoryStart),
      mergeMap((data) => {
        return this.animalService.getSpecies(data.category.id).pipe(
          map((species: Specie[]) => {
            return AnimalActions.GetSpeciesByCategorySucceeded({payload: species})
          })
        )
      }),
      catchError((err: HttpErrorResponse) => {
        this.store.dispatch(AnimalActions.GetSpeciesByCategoryFailed({error: err}))
        return EMPTY
      })))

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.GetCategoriesStart),
      mergeMap((data) => {
        return this.animalService.getCategories().pipe(
          map((categories: Category[]) => {
            return AnimalActions.GetCategoriesSucceeded({payload: categories})
          })
        )
      }),
      catchError((err: HttpErrorResponse) => {
        this.store.dispatch(AnimalActions.GetCategoriesFailed({error: err}))
        return EMPTY
      })))
}
