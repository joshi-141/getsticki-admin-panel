import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVenuesComponent } from './all-venues.component';

describe('AllVenuesComponent', () => {
  let component: AllVenuesComponent;
  let fixture: ComponentFixture<AllVenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
