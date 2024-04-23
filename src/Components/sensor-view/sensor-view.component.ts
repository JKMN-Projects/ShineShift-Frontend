import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { SensorModel } from '../../Interfaces/SensorModel';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sensor-view',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatTabsModule, MatMenuModule, MatIcon],
  templateUrl: './sensor-view.component.html',
  styleUrl: './sensor-view.component.scss'
})
export class SensorViewComponent {
  displayedColumns: string[] = ['id', 'mac', 'typeName', 'options'];
  assignedDataSource = new MatTableDataSource<SensorModel>(ELEMENT_DATA);
  unassignedDataSource = new MatTableDataSource<SensorModel>(ELEMENT_DATA);

  @ViewChild("assigned") assignedPaginator!: MatPaginator;
  @ViewChild("unassigned") unassignedPaginator!: MatPaginator;

  ngAfterViewInit() {
    this.assignedDataSource.paginator = this.assignedPaginator;
    this.unassignedDataSource.paginator = this.unassignedPaginator;
  }
}

const ELEMENT_DATA: SensorModel[] = [
  {id: 1, mac: '00:0a:95:9d:68:16', typeName: 'Photoresistor'},
  {id: 2, mac: '00:24:d7:1f:9b:42', typeName: 'Photoresistor'},
  {id: 3, mac: '00:1e:8f:45:af:cd', typeName: 'Photoresistor'},
  {id: 4, mac: '00:12:34:56:78:90', typeName: 'Photoresistor'},
  {id: 5, mac: '00:de:ad:be:ef:00', typeName: 'Photoresistor'},
  {id: 6, mac: '00:1a:11:22:33:44', typeName: 'Photoresistor'},
  {id: 7, mac: '00:aa:bb:cc:dd:ee', typeName: 'Photoresistor'},
  {id: 8, mac: '00:55:66:77:88:99', typeName: 'Photoresistor'},
  {id: 9, mac: '00:77:88:99:aa:bb', typeName: 'Photoresistor'},
  {id: 10, mac: '00:ff:ee:dd:cc:bb', typeName: 'Photoresistor'},
  {id: 11, mac: '00:ab:cd:ef:12:34', typeName: 'Photoresistor'},
  {id: 12, mac: '00:01:23:45:67:89', typeName: 'Photoresistor'},
  {id: 13, mac: '00:98:76:54:32:10', typeName: 'Photoresistor'},
  {id: 14, mac: '00:23:45:67:89:ab', typeName: 'Photoresistor'},
  {id: 15, mac: '00:cd:ef:ab:12:34', typeName: 'Photoresistor'},
  {id: 16, mac: '00:a1:b2:c3:d4:e5', typeName: 'Photoresistor'},
  {id: 17, mac: '00:11:22:33:44:55', typeName: 'Photoresistor'},
  {id: 18, mac: '00:89:ab:cd:ef:01', typeName: 'Photoresistor'},
  {id: 19, mac: '00:66:55:44:33:22', typeName: 'Photoresistor'},
  {id: 20, mac: '00:ca:fe:ba:be:10', typeName: 'Photoresistor'},
  {id: 21, mac: '00:21:43:65:87:09', typeName: 'Photoresistor'},
  {id: 22, mac: '00:fe:dc:ba:98:76', typeName: 'Photoresistor'},
  {id: 23, mac: '00:56:78:90:12:34', typeName: 'Photoresistor'},
  {id: 24, mac: '00:90:12:34:56:78', typeName: 'Photoresistor'},
  {id: 25, mac: '00:dd:cc:bb:aa:ff', typeName: 'Photoresistor'},
  {id: 26, mac: '00:67:89:ab:cd:ef', typeName: 'Photoresistor'},
  {id: 27, mac: '00:ab:cd:ef:ab:cd', typeName: 'Photoresistor'},
  {id: 28, mac: '00:fe:dc:ba:98:76', typeName: 'Photoresistor'},
  {id: 29, mac: '00:aa:bb:cc:dd:ee', typeName: 'Photoresistor'},
  {id: 30, mac: '00:55:44:33:22:11', typeName: 'Photoresistor'},
  {id: 31, mac: '00:ef:be:ad:de:ad', typeName: 'Photoresistor'},
  {id: 32, mac: '00:1a:2b:3c:4d:5e', typeName: 'Photoresistor'},
  {id: 33, mac: '00:5a:6b:7c:8d:9e', typeName: 'Photoresistor'},
  {id: 34, mac: '00:ab:cd:ef:12:34', typeName: 'Photoresistor'},
  {id: 35, mac: '00:98:76:54:32:10', typeName: 'Photoresistor'},
  {id: 36, mac: '00:01:23:45:67:89', typeName: 'Photoresistor'},
  {id: 37, mac: '00:a1:b2:c3:d4:e5', typeName: 'Photoresistor'},
  {id: 38, mac: '00:11:22:33:44:55', typeName: 'Photoresistor'},
  {id: 39, mac: '00:89:ab:cd:ef:01', typeName: 'Photoresistor'},
  {id: 40, mac: '00:66:55:44:33:22', typeName: 'Photoresistor'},
  {id: 41, mac: '00:ca:fe:ba:be:10', typeName: 'Photoresistor'},
  {id: 42, mac: '00:21:43:65:87:09', typeName: 'Photoresistor'},
  {id: 43, mac: '00:fe:dc:ba:98:76', typeName: 'Photoresistor'},
  {id: 44, mac: '00:56:78:90:12:34', typeName: 'Photoresistor'},
  {id: 45, mac: '00:90:12:34:56:78', typeName: 'Photoresistor'},
  {id: 46, mac: '00:dd:cc:bb:aa:ff', typeName: 'Photoresistor'},
  {id: 47, mac: '00:67:89:ab:cd:ef', typeName: 'Photoresistor'},
  {id: 48, mac: '00:ab:cd:ef:ab:cd', typeName: 'Photoresistor'},
  {id: 49, mac: '00:fe:dc:ba:98:76', typeName: 'Photoresistor'},
  {id: 50, mac: '00:aa:bb:cc:dd:ee', typeName: 'Photoresistor'}
];
