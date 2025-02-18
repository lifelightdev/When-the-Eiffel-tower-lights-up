import { TestBed } from '@angular/core/testing';

import { LightsUpService } from './lights-up.service';

describe('LightsUpService', () => {
  let service: LightsUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightsUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should lights up in winter',() =>{
    const sunset = new Date(2024, 1, 15, 18, 12);
    const turnOff = new Date(2024, 1, 15, 23, 45);
    const result: Date[] = [];
    result.push(new Date(2024, 1, 15, 19, 0));
    result.push(new Date(2024, 1, 15, 20, 0));
    result.push(new Date(2024, 1, 15, 21, 0));
    result.push(new Date(2024, 1, 15, 22, 0));
    result.push(new Date(2024, 1, 15, 23, 0));
    result.push(new Date(2024, 1, 16, 0, 0));
    expect(service.lightsUp(sunset, turnOff)).toEqual(result);
  });

  it('should lights up in summer',() =>{
    const sunset = new Date(2024, 6, 15, 21, 23);
    const turnOff = new Date(2024, 6, 16, 0, 45);
    const result: Date[] = [];
    result.push(new Date(2024, 6, 15, 22, 0));
    result.push(new Date(2024, 6, 15, 23, 0));
    result.push(new Date(2024, 6, 16, 0, 0));
    result.push(new Date(2024, 6, 16, 1, 0));
    expect(service.lightsUp(sunset, turnOff)).toEqual(result);
  });
});
