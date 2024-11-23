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
 *
 * 20/11/2024    María Torres Herrera      Se añadió la función 'passwordMatchValidator'
 *                                         para validar que las contraseñas coincidan,
 *                                         y el patrón para la contraseña
 * ---------------------------------------------------------------------------- */

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const firstNameAndLastNamePattern: string = '^[A-Za-zÀ-ÿ]+(?:\\s[A-Za-zÀ-ÿ]+){1,3}$';

//export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

export const passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

export const passwordMatchValidator: ValidatorFn = ( control: AbstractControl ): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
}
