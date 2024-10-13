/* ----------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : validators.ts
 * Autor         : María Fernanda Torres Herrera
 * Fecha         : 08/10/2024
 * Descripción   : Validaciones para los formularios de inicio de sesión y registro
 *
 * Modificaciones:
 * Fecha         Modificado por            Descripción
 * 11/10/2024    María Torres Herrera      Se mejoró el patrón
 *                                         'firstNameAndLastNamePattern'
 * ---------------------------------------------------------------------------- */

export const firstNameAndLastNamePattern: string = '^(?:\w+\s?){1,5}$';

export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
