import { Component, Inject, OnInit } from '@angular/core';
import { Client } from '../model/Client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-edit',
  imports:[FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent  implements OnInit{
 client: Client;

  constructor(
    public dialogREf: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {client : Client},
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
      this.client = this.data.client ? Object.assign({}, this.data.client) : new Client();
  }
  onSave() {
    this.clientService.saveClient(this.client).subscribe(() => {
      this.dialogREf.close();
    });
  }
  onClose() {
    this.dialogREf.close();


}
}