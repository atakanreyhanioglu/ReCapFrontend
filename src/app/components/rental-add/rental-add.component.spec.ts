import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAddComponent } from './rental-add.component';

describe('RentalAddComponent', () => {
  let component: RentalAddComponent;
  let fixture: ComponentFixture<RentalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
