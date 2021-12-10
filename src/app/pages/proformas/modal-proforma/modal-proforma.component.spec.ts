import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProformaComponent } from './modal-proforma.component';

describe('ModalProformaComponent', () => {
  let component: ModalProformaComponent;
  let fixture: ComponentFixture<ModalProformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
