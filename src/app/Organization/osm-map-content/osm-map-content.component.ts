import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {Map, ZoomAnimEvent, MapOptions} from 'leaflet';

@Component({
  selector: 'app-osm-map-content',
  templateUrl: './osm-map-content.component.html',
  styleUrls: ['./osm-map-content.component.css']
})
export class OsmMapContentComponent implements OnInit,  OnDestroy {

  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Input() options: MapOptions;
  private map: Map;
  private zoom: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.map !== undefined) {
      this.map.clearAllEventListeners();
      this.map.remove();
    }
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

}
