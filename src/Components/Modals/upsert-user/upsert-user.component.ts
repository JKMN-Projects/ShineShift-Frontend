import { Component, Inject } from '@angular/core';
import { UserModel } from '../../../Interfaces/Models/UserModel';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../Services/user.service';
import { CreateUserRequest } from '../../../Interfaces/DTO/create-user-request';

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

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UpsertUserComponent>, private userService: UserService,
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
    let temp: CreateUserRequest = {email: this.UserFormGroup.get("Username")?.value};

    this.userService.createUser(temp);

    this.CloseDialog();
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
