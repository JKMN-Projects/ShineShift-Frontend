import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubViewComponent } from './hub-view.component';

describe('HubViewComponent', () => {
  let component: HubViewComponent;
  let fixture: ComponentFixture<HubViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
