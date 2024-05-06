import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonItem, IonButton, IonText, IonInput, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonLabel, IonText, IonButton, IonItem, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonInput, IonSpinner, CommonModule, FormsModule]
})
export class LoginPage {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(private router: Router , private authService: AuthService, private toastController: ToastController) { }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.email && this.password) {
        this.errorMessage = '';
        this.authService.login(this.email, this.password).subscribe({
          next: (data) => {
            if (data) {
              // navigation
              this.isLoading = false;
              this.presentToast('Successfully logged in.');
            }
          }, error: (err) => {
            console.log(err);
            this.isLoading = false;
            this.presentToast(err);
          },
        });
      } else {
        this.isLoading = false;
        this.errorMessage = 'Form is empty.';
        this.presentToast(this.errorMessage);
      }
    }, 1500);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

}
