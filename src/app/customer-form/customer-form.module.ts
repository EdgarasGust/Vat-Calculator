import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CustomerFormRoutingModule } from './customer-form-routing.module';
import { CustomerFormComponent } from './customer-form.component';
import { CustomerFormDetailsComponent } from './customer-form-details/customer-form-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerFormComponent, CustomerFormDetailsComponent],
  imports: [
    CommonModule,
    CustomerFormRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class CustomerFormModule {}
