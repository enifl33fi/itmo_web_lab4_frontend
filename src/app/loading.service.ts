import { Injectable } from '@angular/core';
import {defer, finalize, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private prepare<T>(beforeFunc: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
      beforeFunc();
      return source;
    })
  }

  private indicate<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
      this.prepare(() => indicator.next(true)),
      finalize(() => indicator.next(false))
    )
  }

  handleLoading<T>(loadingSubj?: Subject<boolean>): (source: Observable<T>) => Observable<T> {
    if (loadingSubj) {
      return (source: Observable<T>): Observable<T> => source.pipe(
        this.indicate(loadingSubj)
      )
    }
    return (source: Observable<T>): Observable<T> => source;
  }
}
