import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageListComponent } from './car-image-list.component';

describe('CarImageListComponent', () => {
  let component: CarImageListComponent;
  let fixture: ComponentFixture<CarImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
