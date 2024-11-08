import { Component, inject, signal } from '@angular/core';
import { EnsenanzaService } from '../../services/ensenanza.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ensenanza-page',
  templateUrl: './ensenanza-page.component.html',
  styleUrls: ['./ensenanza-page.component.css']
})
export class EnsenanzaPageComponent {
  constructor () {
    this.user = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );

    if ( this.premium == "0" ) this.getFrase ();
    else this.getFrasePremium ();
  }

  private ensenanza_service = inject ( EnsenanzaService );
  private user : string | null = null;
  private premium : string | null = null;
  public ensenanza = signal < string > ( "" );

  getFrase () {
    this.ensenanza_service.getFrase ( this.user! )
      .subscribe ( {
        next: ( { frase } ) => this.ensenanza.set ( frase ),
        error: ( message => Swal.fire ( 'Error al cargar la enseñanza', message, 'error' ) )
      } );
  }

  getFrasePremium () {
    this.ensenanza_service.getFrasePremium ( this.user! )
      .subscribe ( {
        next: ( { frase } ) => this.ensenanza.set ( frase ),
        error: ( message => Swal.fire ( 'Error al cargar la enseñanza premium', message, 'error' ) )
      } );
  }
}
