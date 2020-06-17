import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {Map, ZoomAnimEvent, MapOptions, LeafletMouseEvent, tileLayer, latLng} from 'leaflet';

@Component({
  selector: 'app-osm-map-content',
  templateUrl: './osm-map-content.component.html',
  styleUrls: ['./osm-map-content.component.css']
})
export class OsmMapContentComponent implements OnInit,  OnDestroy {

  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Output() Click$: EventEmitter<LeafletMouseEvent> = new EventEmitter();
  @Input() options: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 1,
      maxZoom: 19,
      minZoom: 8.5,
      detectRetina: true,
    })],
    zoom: 1,
    center: latLng(42.471967891443384, 13.573022878267201)
  };
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
  onMapClick(e: LeafletMouseEvent) {
    this.Click$.emit(e);
  }
}
