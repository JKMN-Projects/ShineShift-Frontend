import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertHubComponent } from './upsert-hub.component';

describe('UpsertHubComponent', () => {
  let component: UpsertHubComponent;
  let fixture: ComponentFixture<UpsertHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertHubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpsertHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
