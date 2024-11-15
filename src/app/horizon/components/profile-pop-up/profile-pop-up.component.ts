import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/auth/interfaces/user-response.interface';
import { UserService } from 'src/app/auth/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'profile-pop-up',
  templateUrl: './profile-pop-up.component.html',
  styleUrl: './profile-pop-up.component.css'
})
export class ProfilePopUpComponent {
  private user_service = inject ( UserService );
  private router = inject ( Router );
  private user_id : string | null = "";
  public user !: UserResponse;
  public user_name : string = "John Doe";
  public user_pic : string = "placeholder-avatar.png";
  public onHide = output < boolean > ();

  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
    this.getUserById ();
  }

  getUserById () {
    this.user_service.getUserById ( this.user_id ).subscribe ( {
      next: ( res ) => {
        this.user = res[0];
        this.user_name = this.user.nombre;
        this.user_pic = this.user.foto_perfil;
      },
      error: ( message => Swal.fire ( 'Error', message, 'error' ) )
    } );
  }

  getImage () : string {
    return this.user_pic ? this.user_pic : "placeholder-avatar.png"
  }

  goToProfile () {
    this.router.navigateByUrl ( 'horizon-health/profile' );
  }

  goToSubscribe () {
    this.router.navigateByUrl ( 'horizon-health/suscription' );
    this.hideOptions();
  }

  logOut () {
    this.router.navigateByUrl ( 'horizon-health/auth/log-in' );
  }

  hideOptions () {
    this.onHide.emit ( true );
  }
}
