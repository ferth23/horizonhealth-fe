/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : lectura.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente Lectura
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 22/10/2024    Humberto Medina Santos    Se crearon las variables con las que se
 *                                         va a mostrar todo lo referente a la lectura
 * ---------------------------------------------------------------------------- */

import { Component, signal } from '@angular/core';

@Component ( {
  selector : 'lectura',
  templateUrl : './lectura.component.html',
  styleUrl : './lectura.component.css'
} )
export class LecturaComponent {

  // * Declaración de variables que serán mostradas en el html
  public reading_text = signal < string > ( "Viví así, solo, sin alguien con quien poder hablar verdaderamente, hasta hace seis años cuando tuve una avería en el Sahara. Algo se había estropeado en el motor de mi avión. Como viajaba sin mecánico ni pasajero alguno, me dispuse a realizar yo sólo, una reparación difícil. Era para mí una cuestión de vida o muerte pues apenas tenía agua pura como para ocho días. \n\nLa primera noche me dormí sobre la arena, a unas mil millas de distancia del lugar habitado más próximo. Estaba más aislado que un náufrago en Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum malesuada purus sit amet mollis euismod. Vivamus vulputate vel velit sollicitudin aliquam. Mauris molestie ipsum vel turpis fringilla sollicitudin. Donec ultricies elit enim, eget pretium nisl tincidunt vitae. Nulla vel lorem ultrices, pulvinar lorem sed, vulputate quam. Maecenas lectus turpis, congue id nunc vitae, scelerisque tristique dui. Vivamus rhoncus tortor id lectus consequat, semper vehicula eros rhoncus. Praesent tristique nibh eros, vel pretium felis cursus id. Duis auctor ipsum non nulla mollis, nec maximus augue imperdiet." );
  public reading_title = signal < string > ( "El Principito" );
  public reading_author = signal < string > ( "Antoine de Saint-Exupéry" );
  public reading_year = signal < number > ( 1943 );
  public reading_genres = signal < string [] > ( [ "Infantil", "Fábula", "Poesía", "Ficción", "Aventura" ] );
}
