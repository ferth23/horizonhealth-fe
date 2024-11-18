/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : lectura-response.interface.ts
 * Autor         : Humberto Medina Santos
 * Fecha         : 13/11/2024
 * Descripción   : Interface para mapear la respuesta que da la petición http
 *                 getLectura() del servicio de lectura
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 13/11/2024    Humberto Medina Santos    Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */

export interface LecturaResponse {
  id_lectura:          number;
  titulo:              string;
  lectura:             string;
  genero:              string;
  longitud:            string;
  año:                 number;
  autor:               string;
  genero_secundario_1: string;
  genero_secundario_2: string;
}

