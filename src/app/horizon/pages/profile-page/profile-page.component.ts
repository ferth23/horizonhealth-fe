import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  selectedOption: string = 'edit-profile';

  selectOption( option: string ) {
    this.selectedOption = option;
  }
}
