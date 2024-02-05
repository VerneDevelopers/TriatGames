import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  UserCredential
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  getUid() {
    return this.auth.currentUser?.uid;
  }

  async register(email: string, password: string):Promise<UserCredential | null>{
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      console.log('ha fallado el registro',e);
      return null;
    }
  }

  async login( email:string, password :string):Promise<UserCredential | null>  {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      console.log('ha fallado el login',e);
      return null;
    }
  }

  async resetPassword(email: string) {
    try {
       await sendPasswordResetEmail(this.auth, email);
    } catch (e) {
      console.log(e);
      
    }
  }

  logout() {
    try {
      return signOut(this.auth);
    }
    catch (e) {
      console.log(e);
      return Promise<void>;
    }
  }
}
