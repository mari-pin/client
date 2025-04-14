import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PrestamoService } from '../service/prestamo.service';
import { ClientService } from '../../client/services/client.service';
import { GameService } from '../../game/game.service';
import { Prestamo } from '../model/Prestamo';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client';



@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    

  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  templateUrl: './prestamo-edit.component.html',
  styleUrls: ['./prestamo-edit.component.scss']
})
export class PrestamoEditComponent implements OnInit {

 @ViewChild('dateStartPiquer') dateStartPiquer: MatDatepicker<Date>;
 @ViewChild('dateEndPiquer') dateEndPiquer: MatDatepicker<Date>;

 prestamo : Prestamo;
 games: Game[];
 clients: Client[];

 erroMessage: String;
 error:boolean = false;

  
  constructor(
    public dialogRef: MatDialogRef<PrestamoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prestamoService: PrestamoService, 
    private clientService: ClientService,
    private gameService: GameService,
   
  ){}
  ngOnInit(): void {
    this.prestamo = this.data.prestamo ? Object.assign({}, this.data.prestamo) : new Prestamo();

    this.gameService.getGames().subscribe((games)=>{this.games = games});
    if(this.prestamo.game){
      const gameFilter = this.games.find(game=>game.id === this.data.game.id);
      if(gameFilter){
        this.prestamo.game = gameFilter[0];
    }
  }

  
this.clientService.getClients().subscribe((clients)=>{this.clients = clients});
if(this.prestamo.client){
  const clientFilter = this.clients.find(client=>client.id === this.data.client.id);
  if(clientFilter){
    this.prestamo.client = clientFilter[0];
  }

}


}

onSave() {
 this.prestamoService.savePrestamo(this.prestamo).subscribe({
  next:(result)=>{
    this.dialogRef.close(result);
  },
  error:(error)=>{
    this.error = true;
    this.erroMessage = error.error.error;
  
   console.log(this.erroMessage);
  }
 });


}

onClose(){
  this.dialogRef.close();
}
}