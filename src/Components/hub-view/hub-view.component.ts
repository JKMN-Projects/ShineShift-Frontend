import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HubModel } from '../../Interfaces/HubModel';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UpsertHubComponent } from '../Modals/upsert-hub/upsert-hub.component';
import { MatButtonModule } from '@angular/material/button';
import { DeleteConfirmationComponent } from '../Modals/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-hub-view',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatTabsModule, MatMenuModule, MatIcon, MatButtonModule],
  templateUrl: './hub-view.component.html',
  styleUrl: './hub-view.component.scss'
})
export class HubViewComponent {
  displayedColumns: string[] = ['mac', 'roomName', 'options'];
  assignedDataSource = new MatTableDataSource<HubModel>(ELEMENT_DATA);
  unassignedDataSource = new MatTableDataSource<HubModel>(ELEMENT_DATA);

  @ViewChild("assigned") assignedPaginator!: MatPaginator;
  @ViewChild("unassigned") unassignedPaginator!: MatPaginator;

  constructor(private matDialog: MatDialog) {}

  ngAfterViewInit() {
    this.assignedDataSource.paginator = this.assignedPaginator;
    this.unassignedDataSource.paginator = this.unassignedPaginator;
  }

  createNewHub() {
    this.matDialog.open(UpsertHubComponent, {
      disableClose: true,
      data: null
    });
  }

  updateHub(row: HubModel) {
    this.matDialog.open(UpsertHubComponent, {
      disableClose: true,
      data: {
        mac: row.mac,
        roomName: row.roomName
      }
    });
  }

  deleteHub(row: HubModel) {
    this.matDialog.open(DeleteConfirmationComponent, {
      data: {
        msg: "Are you sure you want to delete the hub in" + row.roomName + "?"
      }
    }).afterClosed().subscribe(x => {
      if (x) {
        // Call service to delete the hub
      }
    });
  }
}

const ELEMENT_DATA: HubModel[] = [
  {mac: '00:0a:95:9d:68:16', roomName: 'Class room 1'},
  {mac: '00:24:d7:1f:9b:42', roomName: 'Class room 2'},
  {mac: '00:1e:8f:45:af:cd', roomName: 'Class room 3'},
  {mac: '00:12:34:56:78:90', roomName: 'Class room 4'},
  {mac: '00:de:ad:be:ef:00', roomName: 'Class room 5'},
  {mac: '00:1a:11:22:33:44', roomName: 'Class room 6'},
  {mac: '00:aa:bb:cc:dd:ee', roomName: 'Class room 7'},
  {mac: '00:55:66:77:88:99', roomName: 'Class room 8'},
  {mac: '00:77:88:99:aa:bb', roomName: 'Class room 9'},
  {mac: '00:ff:ee:dd:cc:bb', roomName: 'Class room 10'},
  {mac: '00:ab:cd:ef:12:34', roomName: 'Class room 11'},
  {mac: '00:01:23:45:67:89', roomName: 'Class room 12'},
  {mac: '00:98:76:54:32:10', roomName: 'Class room 13'},
  {mac: '00:23:45:67:89:ab', roomName: 'Class room 14'},
  {mac: '00:cd:ef:ab:12:34', roomName: 'Class room 15'},
  {mac: '00:a1:b2:c3:d4:e5', roomName: 'Class room 16'},
  {mac: '00:11:22:33:44:55', roomName: 'Class room 17'},
  {mac: '00:89:ab:cd:ef:01', roomName: 'Class room 18'},
  {mac: '00:66:55:44:33:22', roomName: 'Class room 19'},
  {mac: '00:ca:fe:ba:be:10', roomName: 'Class room 20'},
  {mac: '00:21:43:65:87:09', roomName: 'Class room 21'},
  {mac: '00:fe:dc:ba:98:76', roomName: 'Class room 22'},
  {mac: '00:56:78:90:12:34', roomName: 'Class room 23'},
  {mac: '00:90:12:34:56:78', roomName: 'Class room 24'},
  {mac: '00:dd:cc:bb:aa:ff', roomName: 'Class room 25'},
  {mac: '00:67:89:ab:cd:ef', roomName: 'Class room 26'},
  {mac: '00:ab:cd:ef:ab:cd', roomName: 'Class room 27'},
  {mac: '00:fe:dc:ba:98:76', roomName: 'Class room 28'},
  {mac: '00:aa:bb:cc:dd:ee', roomName: 'Class room 29'},
  {mac: '00:55:44:33:22:11', roomName: 'Class room 30'},
  {mac: '00:ef:be:ad:de:ad', roomName: 'Class room 31'},
  {mac: '00:1a:2b:3c:4d:5e', roomName: 'Class room 32'},
  {mac: '00:5a:6b:7c:8d:9e', roomName: 'Class room 33'},
  {mac: '00:ab:cd:ef:12:34', roomName: 'Class room 34'},
  {mac: '00:98:76:54:32:10', roomName: 'Class room 35'},
  {mac: '00:01:23:45:67:89', roomName: 'Class room 36'},
  {mac: '00:a1:b2:c3:d4:e5', roomName: 'Class room 37'},
  {mac: '00:11:22:33:44:55', roomName: 'Class room 38'},
  {mac: '00:89:ab:cd:ef:01', roomName: 'Class room 39'},
  {mac: '00:66:55:44:33:22', roomName: 'Class room 40'},
  {mac: '00:ca:fe:ba:be:10', roomName: 'Class room 41'},
  {mac: '00:21:43:65:87:09', roomName: 'Class room 42'},
  {mac: '00:fe:dc:ba:98:76', roomName: 'Class room 43'},
  {mac: '00:56:78:90:12:34', roomName: 'Class room 44'},
  {mac: '00:90:12:34:56:78', roomName: 'Class room 45'},
  {mac: '00:dd:cc:bb:aa:ff', roomName: 'Class room 46'},
  {mac: '00:67:89:ab:cd:ef', roomName: 'Class room 47'},
  {mac: '00:ab:cd:ef:ab:cd', roomName: 'Class room 48'},
  {mac: '00:fe:dc:ba:98:76', roomName: 'Class room 49'},
  {mac: '00:aa:bb:cc:dd:ee', roomName: 'Class room 50'}
];
