import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelComponent } from './control-panel.component';
import {AuthenticationService} from './services/authentication.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {By} from '@angular/platform-browser';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ ControlPanelComponent ],
      providers: [ AngularFireAuth ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create tag app-menubar', () => {
    expect(fixture.debugElement.query(By.css('.container-fluid')).nativeElement.innerHTML).toContain('app-menubar');
  });

  it('should create tag app-content', () => {
    expect(fixture.debugElement.query(By.css('.container-fluid')).nativeElement.innerHTML).toContain('app-content');
  });

  it('should create tag app-menu-functionality', () => {
    expect(fixture.debugElement.query(By.css('.container-fluid')).nativeElement.innerHTML).toContain('app-menu-functionality');
  });
});
