import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentComponent } from './content.component';
import {DataService} from '../../services/data.service';
import {By} from '@angular/platform-browser';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tag div to contain tag "router-outlet"', () => {
    expect(fixture.debugElement.query(By.css('#wrapper')).nativeElement.innerHTML).toContain('router-outlet');
  });
});
