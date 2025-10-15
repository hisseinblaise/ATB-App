import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    ReactiveFormsModule,
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
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(
    private router: Router,
    private navCtr: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fb: FormBuilder, private userService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.checkStorage();
  }
  async checkStorage() {
    const seen = await Preferences.get({ key: this.INTRO_KEY });
    console.log('🚀 ~ file: login.page.ts:51 ~ checkStorage ~ seen:', seen);
    this.introSeen = seen.value === 'true';
  }
  get f() {
  return this.loginForm.controls;
}

  async doLogin() {
    if (!this.loginForm.valid) return;

    const email = this.f['email'].value;
    const password = this.f['password'].value;

    const loading = await this.loadingCtrl.create({
      message: 'Connexion en cours...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // Appel API login via AuthService
      const res: any = await this.userService.login(email, password).toPromise();

      // Si login réussi
      this.errorMessage = '';
      this.successMessage = res.message || 'Connexion réussie';
      console.log('Connexion réussie', res);

      await this.navCtr.navigateRoot('/app');
    } catch (err: any) {
      // Gestion des erreurs (email non trouvé, mot de passe incorrect)
      this.errorMessage = err.error?.error || err.error?.message || 'Erreur de connexion';
      this.successMessage = '';
      console.error('Erreur de connexion', err);
    } finally {
      await loading.dismiss();
    }
  }

  onFinish() {
    console.log('onFinish');
    this.introSeen = true;
    Preferences.set({ key: this.INTRO_KEY, value: 'true' });
  }

  seeIntroAgain = () => {
    this.introSeen = false;
    Preferences.remove({ key: this.INTRO_KEY });
  };
}

  



