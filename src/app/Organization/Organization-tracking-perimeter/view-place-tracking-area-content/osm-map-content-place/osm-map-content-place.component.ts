import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {Map, ZoomAnimEvent, MapOptions} from 'leaflet';

@Component({
  selector: 'app-osm-map-content-place',
  templateUrl: './osm-map-content-place.component.html',
  styleUrls: ['./osm-map-content-place.component.css']
})
export class OsmMapContentPlaceComponent implements OnInit,  OnDestroy {

  @Output() map2$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom2$: EventEmitter<number> = new EventEmitter();
  @Input() options2: MapOptions;
  private map2: Map;
  private zoom2: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.map2.clearAllEventListeners();
    this.map2.remove();
  }

  onMapReady(map: Map) {
    this.map2 = map;
    this.map2$.emit(map);
    this.zoom2 = map.getZoom();
    this.zoom2$.emit(this.zoom2);
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom2 = e.target.getZoom();
    this.zoom2$.emit(this.zoom2);
  }

}
