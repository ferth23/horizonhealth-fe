/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : sobre-nosotros.component.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 01/10/2024
 * Descripción   : Archivo de typescript del componente Sobre Nosotros
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 04/10/2024    Humberto Medina Santos    Se añadió un arreglo con los datos de
 *                                         cada item de la sección para poder
 *                                         iterarlos en el html
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

import { Component, signal } from '@angular/core';
import { AcercaItem } from '../../interfaces/AcercaItem';

@Component ( {
  selector : 'sobre-nosotros',
  templateUrl : './sobre-nosotros.component.html',
  styleUrls : [ './sobre-nosotros.component.css' ]
} )
export class SobreNosotrosComponent {

  // * Información de los items que se mostrarán en el html
  public AcercaItems = signal < AcercaItem [] > ( [
    {
      clase : 'cuidado',
      img_src : 'cuidado-accesible.jpg',
      img_alt : 'Imagen Cuidado Accesible',
      title : 'Cuidado Accesible',
      text : 'Ofrecemos soluciones tecnológicas accesibles y fáciles de usar para que las personas puedan cuidar su salud física y mental.'
    },
    {
      clase : 'futuro',
      img_src : 'futuro-saludable.jpg',
      img_alt : 'Imagen Futuro Saludable',
      title : 'Futuro Saludable',
      text : 'Buscamos que las personas tomen el control de su salud a largo plazo, creando un entorno donde las enfermedades sean cada vez menos comunes.'
    },
    {
      clase : 'innovacion',
      img_src : 'innovacion-tecnologica.jpg',
      img_alt : 'Imagen Innovación Tecnológica',
      title : 'Innovación Tecnológica',
      text : 'Utilizamos datos biométricos y algoritmos avanzados para ofrecer soluciones personalizadas que se adaptan a tus necesidades y anticipan posibles problemas de salud.'
    }
  ] );
}
