/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : lecturaPre-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 13/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 getLecturaPremium() del servicio de lectura
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 13/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface LecturasPreResponse {
  id_lecturaPre:          number;
  tituloPre:              string;
  lecturaPre:             string;
  generoPre:              string;
  longitudPre:            string;
  añoPre:                 number;
  autorPre:               string;
  genero_secundario_1Pre: string;
  genero_secundario_2Pre: string;
}
