import { Component, output } from '@angular/core';

@Component({
  selector : 'meditacion-pop-up',
  templateUrl : './meditacion-pop-up.component.html',
  styleUrl : './meditacion-pop-up.component.css'
})
export class MeditacionPopUpComponent {
  public onStart = output <number> ();
  public onCancel = output <boolean> ();
  public value_spinner : number = 1;

  public start () : void {
    this.onStart.emit ( this.value_spinner );
  }

  public cancel () : void {
    this.onCancel.emit ( true );
  }

  public changeSpinnerValue ( flag : string ) {
    if ( ( flag == 'minus' && this.value_spinner == 1 ) || ( flag == 'plus' && this.value_spinner == 10 ) ) return;
    this.value_spinner = flag == 'plus' ? this.value_spinner += 1 : this.value_spinner -= 1;
  }
}
