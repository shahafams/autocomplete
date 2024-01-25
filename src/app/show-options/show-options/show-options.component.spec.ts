import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOptionsComponent } from './show-options.component';

describe('ShowOptionsComponent', () => {
  let component: ShowOptionsComponent;
  let fixture: ComponentFixture<ShowOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected option and update localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('City1,City2');
    spyOn(localStorage, 'setItem');

    const emittedOption = 'City3';
    component.getOptions(emittedOption);

    expect(localStorage.getItem).toHaveBeenCalledWith('viewedOptions');
    expect(localStorage.setItem).toHaveBeenCalledWith('viewedOptions', 'City1,City2,City3');

    component.updatetOption.subscribe((option) => {
      expect(option).toEqual(emittedOption);
    });
  });

  it('should emit selected option and update localStorage with empty existing items', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    const emittedOption = 'City1';
    component.getOptions(emittedOption);

    expect(localStorage.getItem).toHaveBeenCalledWith('viewedOptions');
    expect(localStorage.setItem).toHaveBeenCalledWith('viewedOptions', 'City1');

    component.updatetOption.subscribe((option) => {
      expect(option).toEqual(emittedOption);
    });
  });

  it('should not update localStorage if the option is already present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('City1,City2');
    spyOn(localStorage, 'setItem');

    const existingOption = 'City1';
    component.getOptions(existingOption);

    expect(localStorage.getItem).toHaveBeenCalledWith('viewedOptions');
    expect(localStorage.setItem).not.toHaveBeenCalled();

    component.updatetOption.subscribe((option) => {
      expect(option).toEqual(existingOption);
    });
  });
});
