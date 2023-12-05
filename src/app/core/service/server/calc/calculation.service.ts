import { Injectable } from '@angular/core';
import {environment} from "../../../../global/enviroment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AlertApiService} from "../../../../alert-api.service";
import {catchError, map, Observable, of} from "rxjs";
import {CheckRequest, CheckResponse, HistoryResponse, Result} from "../../../../model/dto/resultDto";

const CALC_URL: string = `${environment.apiUrl}/calc`
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CalculationService {


  constructor(private http: HttpClient,
              private alertApiService: AlertApiService) {
  }

  getHistory(): Observable<HistoryResponse | null> {
    return this.http.get<HistoryResponse>(`${CALC_URL}/history`)
        .pipe(
            catchError(err => {
            this.handleError(err);
            return of(null)
        }))
  }

  checkResult(req: CheckRequest): Observable<Result | null> {
      return this.http.post<CheckResponse>(`${CALC_URL}/check`, req, httpOptions)
          .pipe(
              map(res => res.checkedResult),
              catchError(err => {
              this.handleError(err);
              return of(null)
          }))
  }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        if (error.status == 0) {
            this.handleConnectionError();
        } else {
            this.alertApiService.showError(error.statusText, error.message);
        }
    }

    private handleConnectionError() {
        this.alertApiService.showError("Connection error", "Can't connect with server");
    }

}
