import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  logInOutline,
  personCircleOutline,
  checkmarkDoneOutline,
  add,
  mailOutline,
  informationCircleOutline,
  briefcaseOutline,
  homeOutline,
  mail,
  send,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      logInOutline,
      personCircleOutline,
      checkmarkDoneOutline,
      add,
      mailOutline,
      informationCircleOutline,
      briefcaseOutline,
      homeOutline,
      mail,
      send,
    });
  }
}
