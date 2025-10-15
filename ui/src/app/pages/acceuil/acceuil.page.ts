import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { IonRouterLink } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
  standalone: true,
  imports: [
    // IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,CommonModule,
    FormsModule,
    IonicModule,
    IonRouterLink,
    RouterLink
]
})
export class AcceuilPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
