import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-edit-acc',
  templateUrl: './edit-acc.component.html',
  styleUrls: ['./edit-acc.component.scss'],
})
export class EditAccComponent implements OnInit {

  constructor(
    // tslint:disable-next-line: variable-name
    private _bottomSheetRef: MatBottomSheetRef<EditAccComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    console.log('data', data);
  }

  ngOnInit() {}

  dismiss(): void {
    this._bottomSheetRef.dismiss();
  }

  save(): void {
    this._bottomSheetRef.dismiss(this.data);
  }
}
