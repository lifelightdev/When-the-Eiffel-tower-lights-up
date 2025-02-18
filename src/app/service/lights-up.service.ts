import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightsUpService {

  constructor() {
  }

  public lightsUp(sunset: Date | undefined, turnOff: Date | undefined) {
    let listOfLightsUp: Date[] = [];
    if (sunset !== undefined && turnOff !== undefined) {
      let year = sunset.getFullYear();
      let month = sunset.getMonth();
      let day = sunset.getDate();
      let hoursSunset = sunset.getHours();
      let hoursTurnOff = turnOff.getHours();
      if (sunset.getDate() != turnOff.getDate()) {
        for (let i = hoursSunset + 1; i <= 23; i++) {
          listOfLightsUp.push(new Date(year, month, day, i, 0));
        }
        listOfLightsUp.push(new Date(year, month, day + 1, 0, 0));
        listOfLightsUp.push(new Date(year, month, day + 1, 1, 0));
      } else {
        for (let i = hoursSunset + 1; i <= hoursTurnOff; i++) {
          listOfLightsUp.push(new Date(year, month, day, i, 0));
        }
        listOfLightsUp.push(new Date(year, month, day + 1, 0, 0));
      }
    }
    return listOfLightsUp;
  }
}
