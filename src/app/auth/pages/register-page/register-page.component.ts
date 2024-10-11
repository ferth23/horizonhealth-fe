import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group ({
    fullName: [ '', [ Validators.required, Validators.pattern ( customValidators.firstNameAndLastNamePattern ) ]] ,
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
    password: [ '', [ Validators.required, Validators.minLength ( 10 ) ] ],
    confirmPassword: [ '', [ Validators.required ] ]
  })

  constructor ( private fb: FormBuilder ) { }

  isValidField ( field: string ) {
    // TODO
  }

  onSubmit () {
    this.myForm.markAllAsTouched ();
  }
}
