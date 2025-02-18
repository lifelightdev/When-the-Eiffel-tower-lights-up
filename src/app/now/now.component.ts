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
  public lightsUp: Date[] | undefined;

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
  }

  private refresh() {
    this.clock = new Date();
    this.lightsUp = this.lightUpService.lightsUp(this.sunset, this.turnOff);
  }

}

