import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {SolarService} from '../solar.service';
import {LightService} from '../light.service';

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

  constructor(private solarService: SolarService,
              private lightService: LightService) {
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
  }

}

