import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SensorModel } from '../../../Interfaces/SensorModel';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HubModel } from '../../../Interfaces/HubModel';

@Component({
  selector: 'app-upsert-sensor',
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatFormFieldModule, MatIcon, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './upsert-sensor.component.html',
  styleUrl: './upsert-sensor.component.scss'
})
export class UpsertSensorComponent {
  HubFormGroup: FormGroup = this.fb.group({
    Hub: new FormControl(null, [Validators.required]),
    Type: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
  });

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UpsertSensorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sensor: SensorModel, hubId: string, isAssign: boolean }) {
    if (this.data != null && this.data != undefined) {
      if (!this.data.isAssign) {
        this.assignValues();
      }
    }
  }

  assignValues() {
    this.HubFormGroup.get("Type")?.setValue(this.data.sensor.typeName);
  }

  SaveChanges() {
    if (this.data.isAssign) {
      // Call service to assign user to a hub
    }
    else {
      // Call service to update room name on hub
    }

    console.log("Room name: " + this.HubFormGroup.get("RoomName")?.value);
  }

  CloseDialog() {
    this.matDialogRef.close();
  }

  CompareValues(collectionItem: SensorModel, formControlItem: SensorModel): boolean {
    return formControlItem != undefined ? (collectionItem == formControlItem ? true : false) : false;
  }

  CompareMacValues(collectionItem: SensorModel, formControlItem: SensorModel): boolean {
    return formControlItem != undefined ? (collectionItem.mac == formControlItem.mac ? true : false) : false;
  }

  GetErrorMessage(control: AbstractControl): string {
    if (control.hasError("required")) {
      return "Field must be filled";
    }
    else if (control.hasError("minlength")) {
      return "Must be atleast 2 characters";
    }
    else if (control.hasError("maxlength")) {
      return "Must be less than 255 characters";
    }
    else {
      return "";
    }
  }
}
