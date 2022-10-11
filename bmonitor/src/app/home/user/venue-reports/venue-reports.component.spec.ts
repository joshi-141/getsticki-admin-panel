import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueReportsComponent } from './venue-reports.component';

describe('VenueReportsComponent', () => {
  let component: VenueReportsComponent;
  let fixture: ComponentFixture<VenueReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
