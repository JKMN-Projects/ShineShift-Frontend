import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SensorModel } from '../../../Interfaces/Models/SensorModel';
import { SensorService } from '../../../Services/sensor.service';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AssignSensorRequest } from '../../../Interfaces/DTO/assign-sensor-request';

@Component({
  selector: 'app-assign-sensor',
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatFormFieldModule, MatIcon, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './assign-sensor.component.html',
  styleUrl: './assign-sensor.component.scss'
})
export class AssignSensorComponent {
  SensorFormGroup: FormGroup = this.fb.group({
    Sensor: new FormControl(null, [Validators.required])
  });

  sensors$ = this.sensorService.sensors$;

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<AssignSensorComponent>, private sensorService: SensorService,
    @Inject(MAT_DIALOG_DATA) public data: { hubId: number }) {
    this.sensorService.getUnassignedSensors();
  }

  SaveChanges() {
    let temp: AssignSensorRequest = {hubId: this.data.hubId, sensorId: (this.SensorFormGroup.get("Sensor")?.value as SensorModel).id};

    this.sensorService.assignSensor(temp);

    this.CloseDialog();
  }

  CloseDialog() {
    this.matDialogRef.close();
  }

  CompareValues(collectionItem: SensorModel, formControlItem: SensorModel): boolean {
    return formControlItem != undefined ? (collectionItem.id == formControlItem.id ? true : false) : false;
  }

  GetErrorMessage(control: AbstractControl): string {
    if (control.hasError("required")) {
      return "Field must be filled";
    }
    else {
      return "";
    }
  }
}
