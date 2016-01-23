import {Component, Inject, OnInit, OnDestroy} from 'angular2/core';
import {MusicService} from '../providers/music.service';
import {ProgressComponent} from './directives/moon.progress';
import {MinutesPipe} from './pipes/minutes';

@Component({
  selector: 'moon-player',
  template: require('./moon.player.html'),
  styles: [require('./moon.player.css')],
  directives: [ProgressComponent],
  pipes: [MinutesPipe]
})
export class MoonPlayer implements OnInit, OnDestroy {
  private time = 0;
  private duration = 0;
  private intervalId: number;
  constructor(@Inject(MusicService) private musicService: MusicService) { }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.time = this.musicService.getTime();
      this.duration = this.musicService.getDuration();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  onChangeTime(time: number) {
    this.musicService.setTime(time);
  }
}
