export interface UserResponse {
  id_usuario:              number;
  nombre:                  string;
  correo:                  string;
  contrasena:              string;
  fecha_de_creacion:       Date;
  fecha_de_ultimo_ingreso: Date;
  premium:                 number;
  foto_perfil:             string;
}

