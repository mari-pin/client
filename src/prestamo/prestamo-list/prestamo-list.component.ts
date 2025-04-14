import { Component, OnInit } from '@angular/core';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Prestamo } from '../model/Prestamo';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/services/client.service';
import { PrestamoService } from '../service/prestamo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DialogConfirmationComponent } from '../../app/core/dialog-confirmation/dialog-confirmation.component';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { Pageable } from '../../app/core/model/page/Pageable';

@Component({
  selector: 'app-prestamo-list',
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatTableModule, 
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    DatePipe

  ],
  templateUrl: './prestamo-list.component.html',
  styleUrl: './prestamo-list.component.scss'
})
export class PrestamoListComponent implements OnInit {
   

    games:Game[];
    clients:Client[];

    filterClient:Client;
    filterGame:Game;
    filterDate: Date;


    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    dataSource = new MatTableDataSource<Prestamo>();

    displayedColumns: string[] = ['id', 'nameclient', 'namegame', 'initDate', 'endDate', 'action'];

    constructor(
      private prestamoService: PrestamoService,
      private clientService: ClientService,
      private gameService: GameService,
      public dialog: MatDialog
      ) { }
     

  ngOnInit(): void {

    this.loadPage();
    this.clientService.getClients().subscribe(clients => this.clients = clients);
    this.gameService.getGames().subscribe(games => this.games = games)
    }
    
    loadPage(event?: PageEvent) {

      const pageable: Pageable = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{ property: 'id', direction: 'ASC' }]
      }
      if(event != null){
        pageable.pageNumber = event.pageIndex;
        pageable.pageSize = event.pageSize;
      }

      const clientId = this.filterClient != null ? this.filterClient.id : null;
      const gameId = this.filterGame != null ? this.filterGame.id : null;

      this.prestamoService.getPrestamos(pageable, clientId, gameId, this.filterDate).subscribe((data)=>{
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });
  
  }
  onCleanFilter(): void{
    this.filterClient = null;
    this.filterGame = null;
    this.filterDate = null;
    this.onSearch();
  }
  onSearch(): void{
    this.loadPage();
  }
  createPrestamo() {
    const dialogRef = this.dialog.open(PrestamoEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  deletePrestamo(prestamo: Prestamo) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
         title: "Eliminar préstamo",
          description: `¿Está seguro de eliminar el préstamo ${prestamo.id}?` 
        }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.prestamoService.deletePrestamo(prestamo.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });

}
}