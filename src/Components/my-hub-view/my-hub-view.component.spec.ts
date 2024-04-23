import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHubViewComponent } from './my-hub-view.component';

describe('MyHubViewComponent', () => {
  let component: MyHubViewComponent;
  let fixture: ComponentFixture<MyHubViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyHubViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyHubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
