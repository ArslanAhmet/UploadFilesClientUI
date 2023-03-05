import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AssetItem } from '../model/asset-item';
import { AssetDataService, AssetsDataSource } from '../services';
import { RecordChangeDataService } from '../services/record-changes-data-service';
import { RecordChangesDataSource } from '../services/record-changes-data-source';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './record-changes-modal.component.html',
  styleUrls: ['./record-changes-modal.component.css']
})
export class RecordChangesDialogComponent implements OnInit {
  eventID: number;
  name: string;
  recordChangesData!: RecordChangesDataSource;
  displayedColumns = ['eventID', 'name', 'value'];

  // constructor(
  //   private recordChangeService: RecordChangeDataService,
  //   private dialogRef: MatDialogRef<RecordChangesDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) private record: AssetItem) {

  //   this.eventID = record.eventID;
  //   this.name = record.eventType;
  // }

  constructor(
    private recordChangeService: RecordChangeDataService,
    private dialogRef: MatDialogRef<RecordChangesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private record: AssetItem) {

    this.eventID = record.eventID;
    this.name = record.eventType;
  }

  ngOnInit(): void {

    this.recordChangesData = new RecordChangesDataSource(this.recordChangeService);
    this.recordChangesData.loadRecordChanges(this.eventID, this.name);
  }
  close() {
    this.dialogRef.close();
  }
  dismiss() {
    this.dialogRef.close(null);
  }
}

