// tslint:disable
import { TestBed } from '@angular/core/testing';
import {Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf} from 'rxjs';
import { ContentComponent } from './content.component';
import {By} from '@angular/platform-browser';

@Injectable()
class MockDataService {}

fdescribe('ContentComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ContentComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: []
    }).overrideComponent(ContentComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });
});
