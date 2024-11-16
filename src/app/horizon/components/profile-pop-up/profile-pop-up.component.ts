import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { UserResponse } from 'src/app/auth/interfaces/user-response.interface';
import { UserService } from 'src/app/auth/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'profile-pop-up',
  templateUrl: './profile-pop-up.component.html',
  styleUrl: './profile-pop-up.component.css'
})
export class ProfilePopUpComponent implements AfterViewInit {
  private user_service = inject ( UserService );
  private router = inject ( Router );
  private location = inject ( Location );
  private changeDetector = inject ( ChangeDetectorRef );
  private user_id : string | null = "";
  public user !: UserResponse;
  public user_name_label : string = "John Doe";
  public user_pic : string = "placeholder-avatar.png";
  public onHide = output < boolean > ();
  private premium : string | null = "";
  public suscribe_text : string = "Suscribirse";

  constructor () {
    this.user_id = localStorage.getItem ( 'user' );
    this.premium = localStorage.getItem ( 'premium' );
    this.getUserById ();
  }

  ngAfterViewInit(): void {
    if ( this.premium === "1" ) {
      this.name.nativeElement.style.color = "gold";
      this.suscribe_text = "Cancelar Suscripción";
      this.changeDetector.detectChanges ();
    }
  }

  @ViewChild ( 'user_name', { static: true } )
  name !: ElementRef < HTMLParagraphElement >;

  getUserById () {
    this.user_service.getUserById ( this.user_id ).subscribe ( {
      next: ( res ) => {
        this.user = res[0];
        this.user_name_label = this.user.nombre;
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

  async goToSubscribe () {
    if ( this.premium === "0" ) {
      this.router.navigateByUrl ( 'horizon-health/suscription' );
    } else if ( this.premium === "1" ) {
      const result = Swal.fire ( {
        title: "¿Deseas cancelar tu suscripción?",
        text: "Al aceptar, tus beneficios se revocarán de manera inmediata",
        icon: "warning",
        iconColor: "#ea4e06",
        showCancelButton: true,
        cancelButtonColor: "#808080",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#ea4e06",
        confirmButtonText: "Aceptar"
      } );

      if ( (await result).isConfirmed ) {
        this.user_service.cancelarSuscripcion ( this.user_id ).subscribe ( {
          next: () => {
            Swal.fire ( {
              title: "¡Tu suscripción ha sido cancelada!",
              icon: "success",
              iconColor: "#52EA0C",
              showCancelButton: false,
              showConfirmButton: false
            } );

            localStorage.removeItem ( 'premium' );
            localStorage.setItem ( 'premium', "0" );
            this.location.go ( this.location.path() );
            window.location.reload();
          },
          error: ( message => Swal.fire ( 'Error', message, 'error' ) )
        } );
      }
    }
    this.hideOptions();
  }

  logOut () {
    this.router.navigateByUrl ( 'horizon-health/auth/log-in' );
  }

  hideOptions () {
    this.onHide.emit ( true );
  }
}
