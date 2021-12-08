import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalveterianriosComponent } from './modalveterianrios.component';

describe('ModalveterianriosComponent', () => {
  let component: ModalveterianriosComponent;
  let fixture: ComponentFixture<ModalveterianriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalveterianriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalveterianriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
