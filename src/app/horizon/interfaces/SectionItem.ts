/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : SectionItem.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 10/10/2024
 * Descripción   : Interface para delimitar los atributos necesarios para crear
 *                 un item de preview de cada sección en la pantalla principal
 *                 de Horizon Health
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 10/10/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface SectionItem {
  img_src: string;
  img_alt: string;
  title: string;
  text: string;
  background_color: string;
  font_color: string;
  button_color: string;
  section_route: string;
}
