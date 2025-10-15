import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,

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
  image: string;
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
   
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
 
    IonSearchbar,

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
        excerpt: 'Applications hybrides performantes avec Ionic et Angular',
        image: 'assets/images/1.webp'

      },
      {
        id: 's2',
        title: 'UI/UX Design',
        excerpt: 'Des interfaces modernes, intuitives et adaptées à tous les écrans.',
        image: 'assets/images/ui.webp'
      },
      {
        id: 's3',
        title: 'Maintenance & support',
        excerpt: 'Surveillance, mises à jour et amélioration continue de vos applications.',
        image: 'assets/images/maintenance.avif'
      },
      {
      id: 's4',
      title: 'Formations Techniques',
      excerpt: 'Ateliers pratiques sur le développement web et mobile.',
      image: 'assets/images/formation.webp'
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
