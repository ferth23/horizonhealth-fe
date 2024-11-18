/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : ejercicios-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 13/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 getEjercicio() del servicio de ejercicicos
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 13/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface EjerciciosResponse {
  id_ejercicio:         number;
  rutina:               string;
  tiempo:               number;
  completado_ejercicio: number;
  descripcion:          string;
}

