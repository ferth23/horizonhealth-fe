/* -------------------------------------------------------------------------------
 * HorizonHealth
 * 
 * Archivo       : contacto.component.ts
 * Autor         : Layla Vanessa González Martínez
 * Fecha         : 30/09/2024
 * Descripción   : Aquí se controla la lógica del formulario de contacto. 
 *                 Define los campos que el usuario debe completar y gestiona
 *                 el envío de la información.
 * 
 * Modificaciones:
 * Fecha         Modificado por     Descripción
 * 30/09/2024    Layla González     Creación del formulario y el método para
 *                                  enviarlo (únicamente la declaración).
 * ---------------------------------------------------------------------------- */

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  constructor ( private formBuilder:FormBuilder ) { }

  // * Se declara el formulario
  contactForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    correo: [''],
    celular: [''],
    mensaje: ['']
  })

  // * Método para enviar el formulario
  onSubmit() {

  }
}


