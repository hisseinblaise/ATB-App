import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Router } from '@angular/router';

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
    CommonModule,
    ReactiveFormsModule
  ],
})
export class RegisterPage implements OnInit {
  // ✅ propriété pour gérer la visibilité
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

  }

  doRegister() {
    console.log('doRegister called');

    if (!this.registerForm.valid) {
      console.log("Le formulaire est invalide.");

      return
    };

    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    console.log('Form Values:', { email, password, confirmPassword });

    if (password !== confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      this.successMessage = '';
      return;
    }

    this.authService.register(email, password, confirmPassword).subscribe({
      next: res => {
        this.errorMessage = '';
        this.successMessage = res.message || 'Inscription réussie';
        console.log('Inscription réussie', res);
      },
      error: err => {
        this.errorMessage = err.error.error || err.error.message || 'Erreur serveur';
        this.successMessage = '';
        console.error('Erreur inscription', err);
      }
    });
  }
}