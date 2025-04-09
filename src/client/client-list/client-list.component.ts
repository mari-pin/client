import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../model/Client';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from '../../app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog) { 
   
  }
  
  createClient() {    
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data: Client[]) => {
      this.dataSource.data = data;
    });
   
  }

}

