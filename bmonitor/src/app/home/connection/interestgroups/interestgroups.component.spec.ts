import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestgroupsComponent } from './interestgroups.component';

describe('InterestgroupsComponent', () => {
  let component: InterestgroupsComponent;
  let fixture: ComponentFixture<InterestgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestgroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
