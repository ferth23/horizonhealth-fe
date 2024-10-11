import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../validators/validators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  private fb = inject ( FormBuilder );
  private router = inject ( Router );

  public myForm: FormGroup = this.fb.group ({
    fullName: [ '', [ Validators.required, Validators.pattern ( customValidators.firstNameAndLastNamePattern ) ]] ,
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
    password: [ '', [ Validators.required, Validators.minLength ( 10 ) ] ],
    confirmPassword: [ '', [ Validators.required ] ]
  });

  register () {
    const { name, email, password } = this.myForm.value;

    // this.authService.register ( name, email, password )
    //   .subscribe ( {
    //     next: () => this.router.navigateByUrl ( 'horizon-health' ),
    //     error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    //   } );
  }
}
