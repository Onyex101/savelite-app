import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from './../../pages/validation';
// import * as moment from 'moment';

@Component({
  selector: 'app-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.scss'],
})
export class BudgetModalComponent implements OnInit {

  title: string;
  newBudget: boolean;
  budgetForm: FormGroup;
  info: any;
  errorMessage = ErrorMessages.budgetError;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BudgetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data.edit) {
      this.newBudget = false;
      this.info = data.details;
      this.title = 'Edit Budget';
    } else {
      this.newBudget = true;
      this.title = 'New Budget';
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.budgetForm = this.formBuilder.group({
      budgetName: ['', Validators.compose([
        Validators.required,
      ])],
      budget: [, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
      ])],
    });
    if (!this.newBudget) {
      this.budgetForm.controls.budgetName.setValue(this.info.budgetName);
      this.budgetForm.controls.budget.setValue(this.info.budget);
    }
  }

  closeMe() {
    this.budgetForm.reset();
    this.dialogRef.close();
  }

  submitBudget() {
    if (this.budgetForm.valid) {
      this.dialogRef.close(this.budgetForm.value);
    }
  }

}
