import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {
  msg: string = "Are you sure you want to delete this entry?";
  yesButton: string = "Yes";
  noButton: string = "No";

  constructor(@Inject(MAT_DIALOG_DATA) private data: {msg: string, yesButton: string, noButton: string}, private matDialogRef: MatDialogRef<DeleteConfirmationComponent>) {
    if (this.data.msg != null && this.data.msg != undefined) {
      this.msg = this.data.msg;
    }

    if (this.data.yesButton != null && this.data.yesButton != undefined) {
      this.yesButton = this.data.yesButton;
    }

    if (this.data.noButton != null && this.data.noButton != undefined) {
      this.noButton = this.data.noButton;
    }
  }

  // True = yes was pressed, false = no was pressed
  CloseDialog(type: boolean) {
    if (type) {
      this.matDialogRef.close(true);
    }
    else {
      this.matDialogRef.close(false);
    }
  }
}
