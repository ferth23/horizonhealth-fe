import { Component } from '@angular/core';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {

  emotionSelected(emotion: string) {
    console.log("Emoción seleccionada: ", emotion);
    // cerrar
  }

}