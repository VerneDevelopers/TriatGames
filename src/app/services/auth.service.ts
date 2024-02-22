import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  UserCredential
} from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { IUsuario } from '../interfaces/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth,private firestore: Firestore) {

  }
  getUserProfile():Observable<IUsuario>  {
    const user = this.auth.currentUser!;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef) as Observable<IUsuario>;
    
  }


  async saveProfile(name: string) {
    try {
      const user = this.auth.currentUser!;
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        "id": user.uid, // "id" : "user.uid
        "email" : user.email,
        "name": name
      });
      return true;
    } catch (e) {
      return null;
    }
  }

  getUid() {
    try {
      return this.auth.currentUser?.uid;
    }
    catch (e) {
      //  console.log(e);
      return null;
    }
  }

  async register(email: string, password: string,name:string): Promise<UserCredential | null> {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.saveProfile(name)
      return user;
    } catch (e) {
      //  console.log('ha fallado el registro',e);
      return null;
    }
  }

  async login(email: string, password: string): Promise<UserCredential | null> {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      //   console.log('ha fallado el login',e);
      return null;
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (e) {
      //  console.log(e);     
    }
  }

  logout() {
    try {
      return signOut(this.auth);
    }
    catch (e) {
      // console.log(e);
      return Promise<void>;
    }
  }

  //Código añadido por Ale para borrado de cuenta
  eliminarCuenta() {
    const user = this.auth.currentUser;
    if (user) {
      user.delete()
        .then(() => {
          console.log('Cuenta eliminada exitosamente.');
        })
        .catch((error) => {
          console.error('Error al eliminar la cuenta:', error.message);
        });
    } else {
      console.error('No hay un usuario autenticado.');
    }
  }
}

