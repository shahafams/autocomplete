import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { AutoCompleteService } from './services/auto-complete.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoCompleteService],
      imports: [AppComponent, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update options on value changes with debounce', fakeAsync(() => {
    const response: string[] = ['City1', 'City2'];

    const authService = fixture.debugElement.injector.get(AutoCompleteService);
    spyOn(authService, 'getAutocomplete').and.returnValue(of(response));
    component.value.setValue('Cit');
    
    tick(500);
    fixture.detectChanges();
    expect(component.options).toEqual(response);
  }));
});

