/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : editar-perfil.component.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 12/11/2024
 * Descripción   : Lógica del componente Survey PopUp
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 14/11/2024    María Torres Herrera      Se añadió el método 'onSubmit()', el
 *                                         cual valida que todas las preguntas
 *                                         tengan respuesta, y guarda en la base
 *                                         de datos la puntuación obtenida
 *
 * 24/10/2024    María Torres Herrera      Se añadió el método 'confirmChanges()'
 * ---------------------------------------------------------------------------- */

import { Component, inject, output } from '@angular/core';
import { Answers } from '../../interfaces/survey-answers.interface';
import Swal from 'sweetalert2'
import { TestService } from '../../services/test.service';
import { UserService } from 'src/app/auth/services/user.service';
import { UserResponse } from 'src/app/auth/interfaces/user-response.interface';

@Component({
  selector: 'survey-pop-up',
  templateUrl: './survey-pop-up.component.html',
  styleUrl: './survey-pop-up.component.css'
})

export class SurveyPopUpComponent {
  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
    this.isPremium = localStorage.getItem ( 'premium' );
  }

  private test_service = inject ( TestService );
  private user_service = inject ( UserService );
  private user_id !: string | null;
  private creation_date: Date | null = null;
  private isPremium : string | null;
  private user !: UserResponse;

  // * Objeto para guardar las respuestas de las preguntas
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

  // * Método que revisa si debe aparecer el Pop Up
  checkPopUpVisibility () {
    const today = new Date();

    if ( this.creation_date ) {
      const creationDate = new Date ( this.creation_date );
      const daysSinceCreation = Math.floor ( ( today.getTime() - creationDate.getTime () ) / ( 1000 * 60 * 60 * 24 ) );

      if ( daysSinceCreation % 7 === 0 ) {
        this.onHide.emit ( false );
      }
    }
  }

  // * Obtiene la fecha de creación de la cuenta de usuario
  getCreationDate () {
    this.user_service.getUserById ( this.user_id ).subscribe({
      next: ( user ) => {
        this.user = user[0];
        this.creation_date = this.user.fecha_de_creacion;
        this.checkPopUpVisibility();
      },
      error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    });
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

    const totalScore: number = Object.values( this.answers ).reduce( ( sum, value ) => sum + ( value as number ) , 0 );
    const averageScore: number = Math.round ( totalScore / Object.keys( this.answers ).length );

    this.test_service.guardarPuntaje ( this.user_id, averageScore ).subscribe ( {
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


    // * Desaparece el Pop Up
    this.onHide.emit ( true );
  }
}
