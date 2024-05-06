import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../model/User';
import { Firestore, collection, collectionData, deleteDoc, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  firestore: Firestore = inject(Firestore);
  db = getFirestore();
  collectionName = 'Users';

  constructor(private http: HttpClient) { }

  getAll() {
    // return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {withCredentials: true});
    return collectionData(collection(this.firestore, this.collectionName)) as Observable<User[]>;
  }

  delete(id: string) {
    // return this.http.delete('http://localhost:5000/app/deleteUser?id=' + id, {withCredentials: true});
    return deleteDoc(doc(this.db, this.collectionName, id));
  }

  create(user: User, id: string) {
    // return addDoc(collection(this.firestore, this.collectionName), user);
    user.id = id;
    return setDoc(doc(this.db, this.collectionName, id), user);
  }
}
