import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule
  ]
})
export class DefaultModalComponent {
  constructor(public dialogRef: MatDialogRef<DefaultModalComponent>){}
}
