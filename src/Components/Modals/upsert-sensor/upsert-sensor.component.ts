import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SensorModel } from '../../../Interfaces/Models/SensorModel';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HubModel } from '../../../Interfaces/Models/HubModel';
import { SensorService } from '../../../Services/sensor.service';
import { UpdateSensorRequest } from '../../../Interfaces/DTO/update-sensor-request';

@Component({
  selector: 'app-upsert-sensor',
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatFormFieldModule, MatIcon, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './upsert-sensor.component.html',
  styleUrl: './upsert-sensor.component.scss'
})
export class UpsertSensorComponent {
  SensorFormGroup: FormGroup = this.fb.group({
    Type: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
  });

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UpsertSensorComponent>, private sensorService: SensorService,
    @Inject(MAT_DIALOG_DATA) public data: { sensor: SensorModel }) {
    if (this.data != null && this.data != undefined) {
      this.assignValues();
    }
  }

  assignValues() {
    this.SensorFormGroup.get("Type")?.setValue(this.data.sensor.type);
  }

  SaveChanges() {
    let temp: UpdateSensorRequest = { id: this.data.sensor.id, type: this.SensorFormGroup.get("Type")?.value };

    this.sensorService.updateSensor(temp);

    this.CloseDialog();
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
    else {
      return "";
    }
  }
}
