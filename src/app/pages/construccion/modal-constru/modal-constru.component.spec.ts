import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConstruComponent } from './modal-constru.component';

describe('ModalConstruComponent', () => {
  let component: ModalConstruComponent;
  let fixture: ComponentFixture<ModalConstruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConstruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConstruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
