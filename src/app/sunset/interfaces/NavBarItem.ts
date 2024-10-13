/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : NavBarItem.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 02/10/2024
 * Descripción   : Interface para delimitar los atributos necesarios para crear
 *                 un item del NavBar
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 02/10/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 *
 * 12/10/2024    Humberto Medina Santos    Se añadieron espaciados
 * ---------------------------------------------------------------------------- */

export interface NavBarItem {
  name : string;
  route ?: string;
  section ?: string;
}
