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
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Role: new FormControl(null, [Validators.required])
  });

  roles$ = this.userService.roles$;

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UpsertUserComponent>, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data: { email: string, role: string }) {
    this.userService.getRoles();

    if (this.data != null && this.data != undefined) {
      this.assignInitialValues();
    }
  }

  assignInitialValues() {
    this.UserFormGroup.get("Email")?.setValue(this.data?.email);
    this.UserFormGroup.get("Role")?.setValue(this.CompareValues());
  }

  CompareValues(): number {
    if (this.data.role == 'Support') {
      return 1;
    }
    else if (this.data.role == 'Admin') {
      return 2;
    }

    return 0;
  }

  GetDisplayValue(): string {
    if (this.UserFormGroup.get("Role")?.value == 1) {
      return 'Support';
    }
    else if (this.UserFormGroup.get("Role")?.value == 2) {
      return 'Admin';
    }

    return '';
  }

  SaveChanges() {
    let temp: CreateUserRequest = { email: this.UserFormGroup.get("Email")?.value, roleId: this.UserFormGroup.get("Role")?.value };

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
