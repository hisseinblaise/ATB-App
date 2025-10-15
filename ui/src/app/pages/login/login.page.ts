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
  introSeen = false;
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

  this.userService.login(email, password).subscribe({
    next: res => {
      this.errorMessage = '';
      this.successMessage = res.message || 'Connexion réussie';
      console.log('Connexion réussie', res);
    },
    error: (err: any) => {
      this.errorMessage = err.error.error || err.error.message || 'Erreur de connexion';
      this.successMessage = '';
      console.error('Erreur de connexion', err);
    }
  });
    // create loading spinner
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
      spinner: 'crescent',
    });
    await loading.present(); // present loading spinner

    try {
      console.log('doLogin');
      // simulate login (api call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // this.router.navigate(['app']);
      this.navCtr.navigateRoot('/app');
    } finally {
      await loading.dismiss(); // dismiss loading spinner
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

  



