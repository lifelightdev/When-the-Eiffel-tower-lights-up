import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {SolarService} from '../service/solar.service';
import {LightService} from '../service/light.service';
import {LightsUpService} from '../service/lights-up.service';

@Component({
  selector: 'app-now',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './now.component.html',
  styleUrl: './now.component.css'
})
export class NowComponent implements OnInit {

  public clock = new Date();
  public sunset: Date | undefined;
  public turnOff: Date | undefined;
  public lightsUp: String = "";

  constructor(private solarService: SolarService,
              private lightService: LightService,
              private lightUpService: LightsUpService) {
  }

  ngOnInit(): void {
    this.turnOff = this.lightService.turnOff(new Date());
    setInterval(() => this.refresh(), 1000);
    this.solarService.findSunPositionAtEiffelTower().subscribe(data => {
      this.sunset = data.results?.sunset;
    });
    this.findLightsUp();
  }

  private refresh() {
    this.clock = new Date();
    this.findLightsUp();
  }

  private findLightsUp() {
    const listOfLightsUp: Date[] = this.lightUpService.lightsUp(this.sunset, this.turnOff);
    let i =0;
      for (let hour of listOfLightsUp) {
        if (i === 0) {
          this.lightsUp = hour.getHours().toString() + 'h00';
        } else {
          this.lightsUp = this.lightsUp + hour.getHours().toString() + 'h00';
        }
        if (i === listOfLightsUp.length - 1) {
          this.lightsUp = this.lightsUp + '.';
        } else if (i === listOfLightsUp.length - 2) {
          this.lightsUp = this.lightsUp + ' et ';
        } else {
          this.lightsUp = this.lightsUp + ', ';
        }
        i++;
      }

  }
}

