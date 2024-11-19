/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : actividadPre-response.interface.ts.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 13/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 getActividadPremium() del servicio de actividades
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 13/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface ActividadPreResponse {
  id_actividadPre:     number;
  nombre_actividadPre: string;
  descripcionPre:      string;
  tiempo_actividadPre: number;
}
