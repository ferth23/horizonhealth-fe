/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : survey-answers-interface.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 14/11/2024
 * Descripción   : Interface para delimitar los atributos necesarios para crear
 *                 un objeto de las preguntas del test semanal para usuarios premium
 *                 de Horizon Health
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 14/11/2024    María Torres Herrera      Se creó la interface y sus propiedades
 * ---------------------------------------------------------------------------- */
export interface Answers {
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
  q5: number | null;
  q6: number | null;
  q7: number | null;
  q8: number | null;
  q9: number | null;
  q10: number | null;
}
