import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../validators/validators';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent {
  public myForm: FormGroup = this.fb.group ({
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
    password: [ '', [ Validators.required, Validators.minLength ( 10 ) ] ],
  })

  constructor ( private fb: FormBuilder ) { }

  isValidField ( field: string ) {
    // TODO
  }

  onSubmit () {
    this.myForm.markAllAsTouched ();
  }
}
