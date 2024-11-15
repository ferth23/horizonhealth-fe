import { Component, inject, output } from '@angular/core';
import { Answers } from '../../interfaces/survey-answers.interface';
import Swal from 'sweetalert2'
import { TestService } from '../../services/test.service';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'survey-pop-up',
  templateUrl: './survey-pop-up.component.html',
  styleUrl: './survey-pop-up.component.css'
})

export class SurveyPopUpComponent {
  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
  }

  private test_service = inject ( TestService );
  private user_service = inject ( UserService );
  private user_id !: string | null;

  answers: Answers = {
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
    q9: null,
    q10: null,
  };

  getCreationDate () {
    this.user_service.
  }

  // * Variable para controlar cuando desaparece el Pop Up
  public onHide = output <boolean> ();

  // * Método que guarda las respuestas del test dadas por el usuaruo y calcula su promedio
  onSubmit () {
    for ( const key in this.answers ) {
      if ( this.answers [ key as keyof Answers ] === null ) {
        Swal.fire ({
          title: "¡Ocurrió un error!",
          text: "Debe responder todas las preguntas",
          icon: 'error',
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false
        });

        return;
      }
    }

    const totalScore = Object.values( this.answers ).reduce( ( sum, value ) => sum + ( value as number ) , 0 );
    const averageScore = Math.round ( totalScore / Object.keys( this.answers ).length );

    this.test_service.guardarPuntaje ( this.user_id, averageScore.toString() ).subscribe ( {
      next: () => {
        Swal.fire ({
          title: "¡Test terminado!",
          text: "Sus respuestas han sido guardadas",
          icon: 'success',
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false
        });
      },
      error: ( message  => Swal.fire ( 'Error al guardar el puntaje', message, 'error' ) )
    } );


    // * Desaparezca el Pop Up
    this.onHide.emit(true);
  }
}
