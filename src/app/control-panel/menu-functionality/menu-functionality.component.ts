/*
* A side-menu that offers all the functionalities available for the administrator on the current organization
*/
import {Component, EventEmitter, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-functionality',
  templateUrl: './menu-functionality.component.html',
  styleUrls: ['./menu-functionality.component.css']
})
export class MenuFunctionalityComponent implements OnInit {

  constructor(private ds: DataService, private router: Router ) { }

  ngOnInit(): void {
    this.ds.activeContent = new EventEmitter<string>();
  }

  /*
  * Subscribes to the service 'DataService' to retrive the actual specific-component to be showed
  */
  updateContent(click: any) {
    this.router.navigateByUrl('/Content-panel/Panel/' + click.target.innerHTML);
    this.ds.activeContent.emit(click.target.innerHTML);
  }
}
