import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CustomerData } from '../../interfaces/customerData';

@Component({
  selector: 'app-customer-form-details',
  templateUrl: './customer-form-details.component.html',
  styleUrls: ['./customer-form-details.component.scss'],
})
export class CustomerFormDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CustomerData) {}
}
