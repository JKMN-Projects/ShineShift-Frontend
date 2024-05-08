import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { HubModel } from '../../../Interfaces/Models/HubModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HubService } from '../../../Services/hub.service';
import { AssignHubToUserRequest } from '../../../Interfaces/DTO/assign-hub-request';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-upsert-hub',
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatFormFieldModule, MatIcon, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './upsert-hub.component.html',
  styleUrl: './upsert-hub.component.scss'
})
export class UpsertHubComponent {
  HubFormGroup: FormGroup = this.fb.group({
    Mac: new FormControl(null, [Validators.required]),
    RoomName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
  });

  hubs$ = this.hubService.unassignedHubs$;

  isAdmin = false;

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UpsertHubComponent>, private hubService: HubService, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string, hubId: number, mac: string, roomName: string, isAdmin: boolean }, private authService: AuthenticationService) {
    this.hubService.getUnassignedHubs();

    this.isAdmin = this.data.isAdmin;

    if (this.data != null && this.data != undefined) {
      if (!this.isAdmin) {
        this.assignInitialValuesSupport();
      }
    }
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
    if (this.isAdmin) {
      let request: AssignHubToUserRequest = {
        userid: this.data.userId,
        hubId: (this.HubFormGroup.get("Mac")?.value as HubModel).id
      };

      this.hubService.assignHubToUser(request);
    }
    else {
      this.HubFormGroup.get("Mac")?.enable();

      let request: HubModel = {
        id: this.data.hubId,
        mac: this.HubFormGroup.get("Mac")?.value,
        roomName: this.HubFormGroup.get("RoomName")?.value
      };

      this.hubService.updateHub(request);
    }

    this.CloseDialog();
  }

  CloseDialog() {
    this.matDialogRef.close();
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
