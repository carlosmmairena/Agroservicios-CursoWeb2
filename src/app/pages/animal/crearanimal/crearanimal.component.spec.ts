import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearanimalComponent } from './crearanimal.component';

describe('CrearanimalComponent', () => {
  let component: CrearanimalComponent;
  let fixture: ComponentFixture<CrearanimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearanimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearanimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
