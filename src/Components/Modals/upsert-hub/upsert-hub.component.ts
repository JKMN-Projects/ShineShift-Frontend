import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { HubModel } from '../../../Interfaces/HubModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserModel } from '../../../Interfaces/UserModel';
import { UserHubModel } from '../../../Interfaces/UserHubModel';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-upsert-hub',
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatFormFieldModule, MatIcon, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './upsert-hub.component.html',
  styleUrl: './upsert-hub.component.scss'
})
export class UpsertHubComponent {
  regex: string = "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$";

  HubFormGroup: FormGroup = this.fb.group({
    Mac: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
    RoomName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    User: new FormControl(null, [Validators.required])
  });

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UpsertHubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, mac: string, roomName: string, isAdmin: boolean}) {
    if (this.data != null && this.data != undefined) {
      if (this.data.isAdmin) {
        this.assignInitialValuesAdmin();
      }
      else {
        this.assignInitialValuesSupport();
      }
    }
  }

  assignInitialValuesAdmin() {
    let temp: UserHubModel = {userId: this.data.id, hubMac: this.data.mac};
    this.HubFormGroup.get("User")?.setValue(temp);
  }

  assignInitialValuesSupport() {
    this.HubFormGroup.get("RoomName")?.setValue(this.data.roomName);
    this.HubFormGroup.get("Mac")?.setValue(this.data.mac);
    this.HubFormGroup.get("Mac")?.disable();
  }

  MacSelectionChange(row: HubModel) {
    this.HubFormGroup.get("RoomName")?.setValue(row.roomName);
  }

  SaveChanges() {
    if (this.data.isAdmin) {
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

  CompareValues(collectionItem: UserHubModel, formControlItem: UserHubModel): boolean {
    return formControlItem != undefined ? (collectionItem.userId == formControlItem.userId ? true : false) : false;
  }

  CompareMacValues(collectionItem: HubModel, formControlItem: HubModel): boolean {
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
    else if (control.hasError("pattern")) {
      return "Must be a valid mac address";
    }
    else {
      return "";
    }
  }
}
