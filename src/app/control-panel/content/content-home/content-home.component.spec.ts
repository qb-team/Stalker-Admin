import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHomeComponent } from './content-home.component';
import {By} from '@angular/platform-browser';

describe('ContentHomeComponent', () => {
  let component: ContentHomeComponent;
  let fixture: ComponentFixture<ContentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentHomeComponent);
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
