import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../validators/validators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent {
  private fb = inject ( FormBuilder );
  private router = inject ( Router );

  public myForm: FormGroup = this.fb.group ({
    email: [ '', [ Validators.required, Validators.pattern ( customValidators.emailPattern ) ] ],
    password: [ '', [ Validators.required, Validators.minLength ( 10 ) ] ],
  });

  login () {
    const { email, password } = this.myForm.value;

    // this.authService.login ( email, password )
    //   .subscribe ( {
    //     next: () => this.router.navigateByUrl ( 'horizon-health' ),
    //     error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    //   } );
  }
}
