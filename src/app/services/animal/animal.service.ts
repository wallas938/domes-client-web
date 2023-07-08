import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {environment} from "../../../env/environment";
import {AnimalGetDTO, AnimalSearchQuery, Category, Specie} from "../../models/animal";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private animalUrl = environment.apiURL + '/animals';
  private specieUrl = environment.apiURL + '/species';
  private categoryUrl = environment.apiURL + '/categories';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  getAnimals(pageNumber: number, searchValue: string): Observable<AnimalGetDTO[]> {
    // return this.http.get<AnimalGetDTO[]>(`${this.animalUrl}/search?minPrice=${animalSearchQuery.minPrice}&maxPrice=${animalSearchQuery.maxPrice}&minAge=${animalSearchQuery.minAge}&maxAge=${animalSearchQuery.maxAge}&categoryName=${animalSearchQuery.category.name && animalSearchQuery.category.name !== 'ALL' ? animalSearchQuery.category.name : ''}&specieName=${animalSearchQuery.specie.name && animalSearchQuery.specie.name !== 'ALL'? animalSearchQuery.specie.name : ''}&pageNumber=${animalSearchQuery.pageNumber}&pageSize=`,
    return this.http.get<AnimalGetDTO[]>(`${this.animalUrl}?pageNumber=${pageNumber}&pageSize=10&specieName=${searchValue}`,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }

  getSpecies(): Observable<Specie[]> {
    return this.http.get<Specie[]>(`${this.specieUrl}`,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }

  getSpeciesByCategory(categoryId: string): Observable<Specie[]> {
    return this.http.get<Specie[]>(`${this.specieUrl}/${categoryId}`,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
    // .pipe(map((value: Specie[]) => value.map((value => value.name))))
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryUrl}`,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }
}
