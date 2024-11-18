/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : password-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 12/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 cambiarContrasena() del servicio de user
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 12/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface PasswordResponse {
  message : string;
}
