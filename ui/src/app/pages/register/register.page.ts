import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFooter,
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import {
  NavController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFooter,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonInput,
    IonButtons,
    IonBackButton,
  ],
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private _location: Location
  ) {}

  ngOnInit() {}

  async doRegister() {
    if (this.password !== this.confirmPassword) {
      const toast = await this.toastCtrl.create({
        message: "Les mots de passe ne correspondent pas.",
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Inscription en cours...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      
      const toast = await this.toastCtrl.create({
        message: 'Compte créé avec succès !',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
      this.navCtrl.navigateRoot('/verifyemail');
    } catch (err) {
      const toast = await this.toastCtrl.create({
        message: 'Erreur lors de l’inscription.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    } finally {
      await loading.dismiss();
    }
  }
}
