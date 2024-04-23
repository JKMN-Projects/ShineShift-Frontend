import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertSensorComponent } from './upsert-sensor.component';

describe('UpsertSensorComponent', () => {
  let component: UpsertSensorComponent;
  let fixture: ComponentFixture<UpsertSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpsertSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
