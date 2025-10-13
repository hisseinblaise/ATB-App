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
  constructor(private _location: Location) {}

  ngOnInit() {}

  doRegister() {
    console.log('doRegister');
    this._location.back()
  }
}
