import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User as _User } from '../model/User';
import { Auth, User, UserInfo, createUserWithEmailAndPassword, deleteUser, getAdditionalUserInfo, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // fireAuth: Auth = inject(Auth);

  constructor(private http: HttpClient, private fireAuth: Auth) { }

  // login
  login(email: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // return this.http.post('http://localhost:5000/app/login', body, {headers: headers, withCredentials: true});
    return signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  register(user: _User) {
    return createUserWithEmailAndPassword(this.fireAuth, user.email, user.password);
  }

  logout() {
    return this.http.post('http://localhost:5000/app/logout', {}, { withCredentials: true, responseType: 'text' });
  }

  checkAuth(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, (user) => {
        if (user) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
}
