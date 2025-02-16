import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  private firstDayOfSeason = 21;
  private firstMonthOfSummer = Month.June;
  private lastMonthOfSummer = Month.September;

  constructor() { }

  public isSummer(summer: Date): boolean {
    if (this.isCompleteSummerMonth(summer)) {
      return true;
    }
    if (summer.getMonth() == this.firstMonthOfSummer && summer.getDate() >= this.firstDayOfSeason) {
      return true;
    }
    if (summer.getMonth() == this.lastMonthOfSummer && summer.getDate() < this.firstDayOfSeason) {
      return true;
    }
    return false;
  }

  private isCompleteSummerMonth(summer: Date) {
    return summer.getMonth() > this.firstMonthOfSummer && summer.getMonth() < this.lastMonthOfSummer;
  }

  public turnOff(date: Date) {
    date.setMinutes(45);
    if (this.isSummer(date)){
      date.setHours(0);
    } else {
      date.setHours(23);
    }
    return date;
  }

}

enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

