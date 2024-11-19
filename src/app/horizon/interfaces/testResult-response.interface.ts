/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : testResult-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 13/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 obtenerPuntajes() del servicio de test
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 13/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface TestResultResponse {
  id_test:    number;
  puntaje:    number;
  fecha_test: Date;
}
