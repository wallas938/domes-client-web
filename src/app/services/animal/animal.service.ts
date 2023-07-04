import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {environment} from "../../../env/environment";
import {AnimalGetDTO} from "../../models/animal";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private animalUrl = environment.apiURL + '/animals';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  getAnimals(batch: number, itemSize: number): Observable<AnimalGetDTO[]> {
    return this.http.get<AnimalGetDTO[]>(`${this.animalUrl}?batch=${batch}&itemSize=${itemSize}`,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }
}
