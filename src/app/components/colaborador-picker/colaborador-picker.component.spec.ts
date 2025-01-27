import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorPickerComponent } from './colaborador-picker.component';

describe('ColaboradorPickerComponent', () => {
  let component: ColaboradorPickerComponent;
  let fixture: ComponentFixture<ColaboradorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboradorPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboradorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
