import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class HashService {
  async hashString ( value : string ) : Promise < string > {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt ( saltRounds );
    return bcrypt.hash ( value, salt );
  }
}
