import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedReportedComponent } from './blocked-reported.component';

describe('BlockedReportedComponent', () => {
  let component: BlockedReportedComponent;
  let fixture: ComponentFixture<BlockedReportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedReportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
