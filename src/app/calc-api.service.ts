import { Injectable } from '@angular/core';
import {CalculationService} from "./calculation.service";
import {Subject} from "rxjs";
import {LoadingService} from "./loading.service";
import {CheckRequest, Result} from "./dto/resultDto";

@Injectable({
  providedIn: 'root'
})
export class CalcApiService {

  constructor(private calculationService: CalculationService,
              private loadingService: LoadingService) { }

  results: Result[] = [];

  loadResults(loadingSubj?: Subject<boolean>): void {
    this.calculationService.getHistory().pipe(
        this.loadingService.handleLoading(loadingSubj)
    ).subscribe(data => {
      if (data) {
        this.results = data.results;
      }
    })
  }

  check(req: CheckRequest,
        dotDrawFunc?: (arg: Result) => void,
        loadingSubj?: Subject<boolean>): void {
    this.calculationService.checkResult(req)
        .pipe(this.loadingService.handleLoading(loadingSubj))
        .subscribe(data => {
          if (data) {
            this.results = [...this.results, data];
            if (dotDrawFunc) {
              dotDrawFunc(data);
            }
          }
        })
  }
}
