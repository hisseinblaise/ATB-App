import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import {
  NavController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

import { IntroComponent } from '../../components/intro/intro.component';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFooter,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
    RouterLink,
    IonIcon,
    IntroComponent,
  ],
})
export class LoginPage implements OnInit {
  introSeen = true;
  INTRO_KEY = 'intro-seen';

  email = '';
  password = '';

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkStorage();
  }

  // 🔹 Vérifie si l’intro a déjà été vue
  async checkStorage() {
    const seen = await Preferences.get({ key: this.INTRO_KEY });
    this.introSeen = seen.value === 'true';
  }

  // 🔹 Login utilisateur
  async doLogin() {
    if (!this.email || !this.password) {
      this.showToast('Veuillez remplir tous les champs', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Connexion...',
      spinner: 'crescent',
    });
    await loading.present();

    this.authService.login(this.email, this.password).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showToast('Connexion réussie 🎉', 'success');
        this.navCtrl.navigateRoot('/dashboard');
      },
      error: async (err) => {
        await loading.dismiss();
        const msg =
          err.error?.message || 'Échec de la connexion. Vérifiez vos identifiants.';
        this.showToast(msg, 'danger');
      },
    });
  }

  // 🔹 Méthode utilitaire pour afficher les toasts
  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
    });
    toast.present();
  }

  // 🔹 Quand l’intro est terminée
  onFinish() {
    this.introSeen = true;
    Preferences.set({ key: this.INTRO_KEY, value: 'true' });
  }

  // 🔹 Pour revoir l’intro
  seeIntroAgain() {
    this.introSeen = false;
    Preferences.remove({ key: this.INTRO_KEY });
  }
}

  

