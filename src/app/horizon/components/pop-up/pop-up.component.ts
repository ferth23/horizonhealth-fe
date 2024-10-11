import { Component, output } from '@angular/core';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  public onHide = output <boolean> ();

  emotionSelected(emotion: string) {
    console.log("Emoción seleccionada: ", emotion);
    this.onHide.emit(true);
  }
}
