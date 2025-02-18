import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NowComponent} from './now.component';
import {AppComponent} from "../app.component";
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {SolarService} from '../service/solar.service';
import {of} from "rxjs";
import {SunPosition} from '../sun-position';
import {LightService} from '../service/light.service';

describe('NowComponent', () => {
  let component: NowComponent;
  let fixture: ComponentFixture<NowComponent>;
  const dateNow = new Date(2024, 5, 14, 18, 0) // Il est 18h00 le 14 juin 2024
  const sunsetDate = of(new SunPosition(new Date(2024, 5, 14, 21, 44)));
  const mockSolarService = {
    findSunPositionAtEiffelTower: jest.fn(() => sunsetDate),
  } as Partial<SolarService>;
  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(dateNow);
    await TestBed.configureTestingModule({
      imports: [NowComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: SolarService, useValue: mockSolarService},
        LightService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(NowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render date and time now', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const result = dateNow.toLocaleDateString("en", {weekday: "long"}) + ' ' +
      dateNow.getDate() + ' ' +
      dateNow.toLocaleString("en", {month: "long"}) + ' ' +
      dateNow.getFullYear() + ' et il est ' +
      dateNow.getHours() + 'h' +
      dateNow.getMinutes();
    expect(compiled.querySelector('#clock')?.textContent).toContain('Nous sommes le ' + result);
  });

  it('should render time of sunset in the Eiffel tower', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#sunset')?.textContent).toContain('Aujourd\'hui le soleil se couche à 21h44 sur la tour Eiffel');
  });

  it('should turn off at 23h45 today', () => {
    const fixture = TestBed.createComponent(NowComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#turnOff')?.textContent).toContain('Aujourd\'hui la tour Eiffel s\'éteint à 23h45.');
  });

  it('should light up at 22h00 22h00, 23h00 et 0h00 today', () => {
    const fixture = TestBed.createComponent(NowComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#lightUp')?.textContent).toContain('Aujourd\'hui la tour Eiffel va scintiller à 22h00, 23h00 et 0h00.');
  });

});
