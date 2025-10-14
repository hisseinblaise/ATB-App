import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // add CUSTOM_ELEMENTS_SCHEMA (enables to swiper-container in template)
})
export class IntroComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  async finishIntro() {
    console.log('Finish Intro');
    this.finish.emit();
  }
}
