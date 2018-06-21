import { Injectable } from '@angular/core';
// Allow data sharing between components
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable()

export class DataService {

  private dB = new BehaviorSubject<any>(['Rent']);
  expense = this.dB.asObservable();

  constructor() { }

  updateDB(data) {
    this.dB.next(data)
  }

}