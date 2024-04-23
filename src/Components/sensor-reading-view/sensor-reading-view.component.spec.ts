import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorReadingViewComponent } from './sensor-reading-view.component';

describe('SensorReadingViewComponent', () => {
  let component: SensorReadingViewComponent;
  let fixture: ComponentFixture<SensorReadingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorReadingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorReadingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
