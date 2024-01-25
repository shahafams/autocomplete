import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-show-options',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './show-options.component.html',
  styleUrl: './show-options.component.css'
})
export class ShowOptionsComponent {
  @Input() options: string[] = [];
  @Input() text: string = '';

  @Output() updatetOption = new EventEmitter<string>();

  getOptions(option: string): void {
    const items = localStorage.getItem('viewedOptions')?.split(',');
    if(items) {
      if(!items.includes(option)){
        localStorage.setItem('viewedOptions', [...items, option].toString());
      }
    } else {
      localStorage.setItem('viewedOptions', [option].toString());
    }
    this.updatetOption.emit(option);
  }
}
