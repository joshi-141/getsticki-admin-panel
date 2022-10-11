import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueGroupsComponent } from './venue-groups.component';

describe('VenueGroupsComponent', () => {
  let component: VenueGroupsComponent;
  let fixture: ComponentFixture<VenueGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
