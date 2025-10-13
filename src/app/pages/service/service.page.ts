import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSearchbar,
  IonItem,
} from '@ionic/angular/standalone';

interface ServiceItem {
  id: string;
  title: string;
  excerpt: string;
  description?: string;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonSearchbar,
    IonItem,
  ],
})
export class ServicePage implements OnInit {
  services: ServiceItem[] = [];
  searchText = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Données fictives - à remplacer par appel à une API réelle
    this.services = [
      {
        id: 's1',
        title: 'Développement mobile',
        excerpt: 'Applications hybrides Ionic/Angular.',
      },
      {
        id: 's2',
        title: 'UI/UX Design',
        excerpt: 'Design moderne, responsive et accessible.',
      },
      {
        id: 's3',
        title: 'Maintenance',
        excerpt: 'Suivi, support et évolutions continues.',
      },
    ];
  }

  onSearch(event: CustomEvent): void {
    this.searchText = event.detail?.value?.toLowerCase() ?? '';
  }

  get filteredServices(): ServiceItem[] {
    return this.services.filter(
      (s) =>
        s.title.toLowerCase().includes(this.searchText) ||
        s.excerpt.toLowerCase().includes(this.searchText)
    );
  }

  openDetail(service: ServiceItem): void {
    // Navigation vers une page détail (à créer plus tard)
    this.router.navigate(['/service', service.id]);
  }
}
