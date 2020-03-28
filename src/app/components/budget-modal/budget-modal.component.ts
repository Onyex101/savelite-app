import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.scss'],
})
export class BudgetModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<BudgetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  public closeMe() {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
