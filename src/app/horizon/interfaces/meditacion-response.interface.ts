/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : meditacion-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 13/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 getMeditaciones() del servicio de meditacion
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 13/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface MeditacionResponse {
  id_meditacionPre:  number;
  id_usuario:        number;
  tiempo_meditacion: number;
  fecha_sesion:      Date;
}
