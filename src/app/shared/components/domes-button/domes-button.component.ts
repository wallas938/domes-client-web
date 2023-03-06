import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-domes-button',
  templateUrl: './domes-button.component.html',
  styleUrls: ['./domes-button.component.scss']
})
export class DomesButtonComponent {

  @Input() link: string | undefined;

}
