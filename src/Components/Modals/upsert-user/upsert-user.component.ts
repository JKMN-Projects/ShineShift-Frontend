import { Component, Inject } from '@angular/core';
import { UserModel } from '../../../Interfaces/UserModel';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-upsert-user',
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatFormFieldModule, MatIcon, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './upsert-user.component.html',
  styleUrl: './upsert-user.component.scss'
})
export class UpsertUserComponent {
  UserFormGroup: FormGroup = this.fb.group({
    Username: new FormControl(null, [Validators.required, Validators.email]),
    Role: new FormControl(null, [Validators.required])
  });

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UpsertUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {username: string, role: string}) {
    if (this.data != null && this.data != undefined) {
      this.assignInitialValues();
    }
  }

  assignInitialValues() {
    this.UserFormGroup.get("Username")?.setValue(this.data?.username);
    this.UserFormGroup.get("Role")?.setValue(this.data?.role);
  }

  CompareValues(collectionItem: string, formControlItem: string): boolean {
    return formControlItem != undefined ? (collectionItem == formControlItem ? true : false) : false;
  }

  SaveChanges() {
    // Call service and create object of type HubModel as parameter
    let temp: UserModel = {id: 0, username: this.UserFormGroup.get("Username")?.value, role: this.UserFormGroup.get("Role")?.value}
    console.log("Username: " + this.UserFormGroup.get("Username")?.value);
    console.log("Role: " + this.UserFormGroup.get("Role")?.value);
    console.log(temp);
  }

  CloseDialog() {
    this.matDialogRef.close();
  }

  GetErrorMessage(control: AbstractControl): string {
    if (control.hasError("required")) {
      return "Field must be filled";
    }
    else if (control.hasError("email")) {
      return "Must be a valid email";
    }
    else {
      return "";
    }
  }
}
