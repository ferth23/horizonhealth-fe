/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : user-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 12/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 getUserById() del servicio de user
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 12/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface UserResponse {
  id_usuario:              number;
  nombre:                  string;
  correo:                  string;
  contrasena:              string;
  fecha_de_creacion:       Date;
  fecha_de_ultimo_ingreso: Date;
  premium:                 number;
  foto_perfil:             string;
}

