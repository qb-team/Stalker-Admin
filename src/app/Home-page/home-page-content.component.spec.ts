import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageContentComponent } from './home-page-content.component';
import {By} from '@angular/platform-browser';

describe('ContentHomeComponent', () => {
  let component: HomePageContentComponent;
  let fixture: ComponentFixture<HomePageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tag h1 to contain "Benvenuto amministratore!"', () => {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerText).toContain('Benvenuto amministratore!');
  });

  it('should not create tag p ', () => {
    expect(fixture.debugElement.query(By.css('p'))).toBeNull();
  });
});
