// tslint:disable
import { async, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MenuFunctionalityComponent } from './menu-functionality.component';
import { Router } from '@angular/router';

@Injectable()
class MockDataService {}

@Injectable()
class MockRouter {
  navigate() {};
  navigateByUrl(url: string) { return url; }
}

describe('MenuFunctionalityComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        MenuFunctionalityComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(MenuFunctionalityComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MenuFunctionalityComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {

    component.ngOnInit();

  });

  it('should run #updateContent()', async () => {
    component.router = component.router || {};
    const spy = spyOn(component.router, 'navigateByUrl');
    component.ds = component.ds || {};
    component.ds.getActiveContent = {
      emit: function() {}
    };
    component.updateContent({
      target: {
        innerHTML: {}
      }
    });
    expect(component.router.navigateByUrl).toHaveBeenCalled();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/Content-panel/Panel/[object Object]'  );
  });

  it('should tag span to contain "Tracciamento"', () => {
    expect(fixture.debugElement.query(By.css('#span1')).nativeElement.innerText).toContain('Tracciamento');
  });

  it('should tag span to contain "Monitoraggio utenti"', () => {
    expect(fixture.debugElement.query(By.css('#l1')).nativeElement.innerText).toContain('Monitoraggio utenti');
  });

  it('should tag span to contain "Informazioni sull\'organizzazione"', () => {
    expect(fixture.debugElement.query(By.css('#l2')).nativeElement.innerText).toContain('Informazioni sull\'organizzazione');
  });

  it('should call updateContent in "Tracciamento"', async(() => {
    spyOn(component, 'updateContent');
    const createButton = fixture.debugElement.query(By.css('#span1'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.updateContent).toHaveBeenCalled();
  }));

  it('should call updateContent in "Monitoraggio utenti"', async(() => {
    spyOn(component, 'updateContent');
    const createButton = fixture.debugElement.query(By.css('#l1'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.updateContent).toHaveBeenCalled();
  }));

  it('should call updateContent in "Informazioni sull\'organizzazione"', async(() => {
    spyOn(component, 'updateContent');
    const createButton = fixture.debugElement.query(By.css('#l2'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.updateContent).toHaveBeenCalled();
  }));

});
