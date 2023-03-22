import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerFormDetailsComponent } from './customer-form-details.component';

describe('CustomerFormDetailsComponent', () => {
  let component: CustomerFormDetailsComponent;
  let fixture: ComponentFixture<CustomerFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFormDetailsComponent],
      imports: [MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be defined', () => {
    expect(component.data).toBeDefined();
  });
});
