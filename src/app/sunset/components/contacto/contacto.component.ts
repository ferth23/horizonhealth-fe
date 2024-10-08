import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  constructor ( private formBuilder:FormBuilder ) { }

  contactForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    correo: [''],
    celular: [''],
    mensaje: ['']
  })

  onSubmit() {
    /*if (this.contactForm.valid) {
      console.log(this.contactForm.value );
    } else {
      console.log('El formulario no es válido');
    }*/
  }
}


