import { Component, ViewChild } from '@angular/core';
import { UserModel } from '../../../Interfaces/Models/UserModel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UpsertUserComponent } from '../../Modals/upsert-user/upsert-user.component';
import { DeleteConfirmationComponent } from '../../Modals/delete-confirmation/delete-confirmation.component';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatMenuModule, MatIcon, MatButtonModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {
  displayedColumns: string[] = ['id', 'username', 'role', 'options'];
  dataSource = new MatTableDataSource<UserModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private matDialog: MatDialog, private router: Router, private userService: UserService) {
    this.userService.getUserList();

    this.userService.users$.subscribe(x => {
      this.dataSource.data = x;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  redirectToUserDetails(row: UserModel) {
    this.router.navigateByUrl("UserDetails", {state: {data: " (" + row.role + ") " + row.username, id: row.id}});
  }

  createUser() {
    this.matDialog.open(UpsertUserComponent, {
      disableClose: true,
      data: null
    });
  }

  updateUser(row: UserModel) {
    this.matDialog.open(UpsertUserComponent, {
      disableClose: true,
      data: {
        username: row.username,
        role: row.role
      }
    });
  }

  deleteUser(row: UserModel) {
    this.matDialog.open(DeleteConfirmationComponent, {
      data: {
        msg: "Are you sure you want to delete " + row.username + "?"
      }
    }).afterClosed().subscribe(x => {
      if (x) {
        // Call service to delete the user
      }
    });
  }
}

// const ELEMENT_DATA: UserModel[] = [
//   {id: 1, username: 'user1@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 2, username: 'user2@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 3, username: 'user3@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 4, username: 'user4@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 5, username: 'user5@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 6, username: 'user6@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 7, username: 'user7@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 8, username: 'user8@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 9, username: 'user9@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 10, username: 'user10@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 11, username: 'user11@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 12, username: 'user12@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 13, username: 'user13@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 14, username: 'user14@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 15, username: 'user15@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 16, username: 'user16@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 17, username: 'user17@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 18, username: 'user18@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 19, username: 'user19@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 20, username: 'user20@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 21, username: 'user21@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 22, username: 'user22@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 23, username: 'user23@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 24, username: 'user24@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 25, username: 'user25@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 26, username: 'user26@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 27, username: 'user27@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 28, username: 'user28@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 29, username: 'user29@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 30, username: 'user30@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 31, username: 'user31@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 32, username: 'user32@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 33, username: 'user33@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 34, username: 'user34@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 35, username: 'user35@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 36, username: 'user36@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 37, username: 'user37@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 38, username: 'user38@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 39, username: 'user39@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 40, username: 'user40@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 41, username: 'user41@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 42, username: 'user42@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 43, username: 'user43@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 44, username: 'user44@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 45, username: 'user45@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 46, username: 'user46@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 47, username: 'user47@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 48, username: 'user48@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 49, username: 'user49@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'},
//   {id: 50, username: 'user50@test.com', role: Math.random() < 0.5 ? 'Support' : 'Admin'}
// ];
