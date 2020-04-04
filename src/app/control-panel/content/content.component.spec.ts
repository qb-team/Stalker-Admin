// tslint:disable
import { TestBed } from '@angular/core/testing';
import {Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf} from 'rxjs';
import { ContentComponent } from './content.component';
import { DataService } from '../../services/data.service';
import {By} from '@angular/platform-browser';

@Injectable()
class MockDataService {}

describe('ContentComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ContentComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    }).overrideComponent(ContentComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.ds = component.ds || {};
    component.ds.getOrganization = observableOf({});
    component.ds.getActiveContent = observableOf({});
    component.ngOnInit();

  });

  it('should tag div to contain tag "router-outlet"', () => {
    expect(fixture.debugElement.query(By.css('#wrapper')).nativeElement.innerHTML).toContain('router-outlet');
  });
});
