import { TestBed } from '@angular/core/testing';

import { LightService } from './light.service';

describe('LightService', () => {
  let service: LightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should date is in summer', () => {
    let summer = new Date(2024, 6, 14); // 14 Juillet 2024
    expect(service.isSummer(summer)).toBeTruthy();
    summer = new Date(2024, 5, 21); // 21 Juin 2024
    expect(service.isSummer(summer)).toBeTruthy();
    summer = new Date(2024, 8, 20); // 20 Septembre 2024
    expect(service.isSummer(summer)).toBeTruthy();
  });


  it('should date is not in summer', () => {
    let notSummer = new Date(2024, 11, 25); // 25 Décembre 2024
    expect(service.isSummer(notSummer)).toBeFalsy();
    notSummer = new Date(2024, 5, 20); // 20 Juin 2024
    expect(service.isSummer(notSummer)).toBeFalsy();
    notSummer = new Date(2024, 8, 21); // 21 Septembre 2024
    expect(service.isSummer(notSummer)).toBeFalsy();
  });

  it('should turn off at 23h45 normally',() =>{
    const date = new Date(2024, 4, 31, 18, 0) ;// Il est 18h00 le 31 mai 2024
    expect(service.turnOff(date)).toEqual(new Date(2024, 4, 31, 23, 45));
  });

  it('should turn off at 0h45 in holiday',() =>{
    const date = new Date(2024, 6, 31, 18, 0) // Il est 18h00 le 31 juillet 2024
    expect(service.turnOff(date)).toEqual(new Date(2024, 6, 31, 0, 45));
  });

});
