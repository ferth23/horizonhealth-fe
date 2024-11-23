/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : dailyTestDate-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 19/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 obtenerFechaTest() del servicio de dailyTest
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 19/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface DailyTestDateResponse {
  fechaTestDiario: Date;
}