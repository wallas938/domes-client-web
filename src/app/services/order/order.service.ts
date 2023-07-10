import {Injectable} from '@angular/core';
import {environment} from "../../../env/environment";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {OrderGetDTO, OrderPostDTO} from "../../models/order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = environment.apiURL + '/orders';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  postOrder(order: OrderPostDTO): Observable<OrderGetDTO> {
    return this.http.post<OrderGetDTO>(`${this.orderUrl}`, order,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }
}
