/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : ejerciciosPre-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 13/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 getEjercicioPremium() del servicio de ejercicicos
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 13/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface EjerciciosPreResponse {
  id_ejercicioPre:         number;
  rutinaPre:               string;
  tiempoPre:               number;
  completado_ejercicioPre: number;
  descripcionPre:          string;
}
