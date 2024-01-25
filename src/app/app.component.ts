import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule  } from '@angular/forms'; 

import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AutoCompleteService } from './services/auto-complete.service';
import { ShowOptionsComponent } from './show-options/show-options/show-options.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, ReactiveFormsModule, ShowOptionsComponent, NgIf],
  providers: [AutoCompleteService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  options: string[] = [];
  viewedOptions: string[] = [];
  selectedCity: string='';
  value: FormControl = new FormControl();
  size: number = 0;

  constructor(private autoCompleteService: AutoCompleteService) {
    this.value.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => {
          this.size = value.length;
          this.viewedOptions = [];
          if (this.selectedCity != value && this.size >= 2) {
            const items = localStorage.getItem(value);
            if(items != null) return of(items ? items.split(',') : []);
            return this.autoCompleteService.getAutocomplete(value).pipe(tap(res => {
              localStorage.setItem(value.toLowerCase(), res.toString())}));
          } else {
            return of([]);
          }
        })
      ).subscribe((options) => {
        this.options = options;
      });
  }

  recentlyViewed(): void {
    const items = localStorage.getItem('viewedOptions');
    this.viewedOptions = items? items.split(',') : [];
  }

  updatetOption(option: string): void {
    this.selectedCity = option;
    this.value.setValue(option);
    this.options = [];
  }
}
