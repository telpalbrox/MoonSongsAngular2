import {Component, Input, Inject, ElementRef, OnChanges, EventEmitter, Output} from 'angular2/core';
import * as _ from 'lodash';

@Component({
  selector: 'moon-progress',
  template: require('./moon.progress.html'),
  styles: [require('./moon.progress.css')]
})
export class ProgressComponent implements OnChanges {
  @Input() private duration: number;
  @Input() private time: number;
  @Output() private changeTime: EventEmitter<number>;
  private dragging: boolean;
  private songPercentage: number;
  private element: HTMLElement;
  private draggingPosition: boolean;

  constructor(@Inject(ElementRef) element) {
    this.element = element.nativeElement;
    this.dragging = false;
    this.draggingPosition = false;
    this.songPercentage = 0;
    this.changeTime = new EventEmitter();
  }

  ngOnChanges() {
    if (this.isPlayable() && this.dragging === false) {
      this.songPercentage = this.time / this.duration * 100;
    }
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    if (!this.isPlayable()) {
      return;
    }
    let clickOffset: number;
    const eventTarget = <HTMLElement>event.target;
    if (eventTarget.id === 'position') {
      this.draggingPosition = true;
      clickOffset = eventTarget.offsetLeft;
    } else {
      clickOffset = event.layerX;
    }
    this.dragging = true;
    this.songPercentage = this.getSongPercentage(clickOffset);
  }

  onMouseUp() {
    event.preventDefault();
    if (!this.isPlayable() || this.dragging === false) {
      return;
    }
    this.changeTime.emit(this.duration * this.songPercentage / 100);
    this.dragging = false;
    this.draggingPosition = false;
  }

  onDrag(event: MouseEvent) {
    event.preventDefault();
    if (this.isPlayable() && this.draggingPosition === true) {
      let clickOffset: number;
      const eventTarget = <HTMLElement>event.target;
      if (eventTarget.id === 'position') {
        clickOffset = eventTarget.offsetLeft;
      } else {
        clickOffset = event.layerX;
      }
      this.songPercentage = this.getSongPercentage(clickOffset);
    }
  }

  private isPlayable(): boolean {
    return _.isFinite(this.duration) && _.isFinite(this.time);
  }

  private getSongPercentage(clickLayerX: number): number {
    const clickElement = <HTMLElement>this.element.querySelector('#progress-click');
    const clickWidth = clickElement.offsetWidth;
    return clickLayerX / clickWidth * 100;
  }
}
