/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : frase-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 13/11/2024
 * Descripción   : Interface para mapear la respuesta que da las peticiones http
 *                 getFrase() y getFrasePremium() del servicio de enseñanza
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 13/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface FraseResponse {
  frase: string;
  autor: string;
}

