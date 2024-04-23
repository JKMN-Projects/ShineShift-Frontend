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

@Component({
  selector: 'app-upsert-hub',
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatFormFieldModule, MatIcon, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './upsert-hub.component.html',
  styleUrl: './upsert-hub.component.scss'
})
export class UpsertHubComponent {
  regex: string = "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$";

  HubFormGroup: FormGroup = this.fb.group({
    Mac: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
    RoomName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
  });

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UpsertHubComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {mac: string, roomName: string}) {
    if (this.data != null && this.data != undefined) {
      this.assignInitialValues();
    }
  }

  assignInitialValues() {
    this.HubFormGroup.get("Mac")?.setValue(this.data?.mac);
    this.HubFormGroup.get("RoomName")?.setValue(this.data?.roomName);
  }

  SaveChanges() {
    // Call service and create object of type HubModel as parameter
    let temp: HubModel = {mac: this.HubFormGroup.get("Mac")?.value, roomName: this.HubFormGroup.get("RoomName")?.value}
    console.log("Mac: " + this.HubFormGroup.get("Mac")?.value);
    console.log("Room name: " + this.HubFormGroup.get("RoomName")?.value);
    console.log(temp);
  }

  CloseDialog() {
    this.matDialogRef.close();
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
