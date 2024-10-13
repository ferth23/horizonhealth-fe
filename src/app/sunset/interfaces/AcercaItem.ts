/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : AcercaItem.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 04/10/2024
 * Descripción   : Interface para delimitar los atributos necesarios para crear
 *                 un item de la sección de Sobre Nosotros
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 04/10/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

export interface AcercaItem {
  clase : string;
  img_src : string;
  img_alt : string;
  title : string;
  text : string;
}
