import {Component, Input, Inject} from 'angular2/core';
import {User, Song} from '../../api';
import {MusicService} from '../../providers/music.service';
const config = require('../../config.json');

@Component({
  selector: 'moon-song-item-list',
  template: require('./song.item.list.html'),
  styles: [require('./song.item.list.css')]
})
export class SongItemList {
  @Input() private song: Song;
  private serverUrl: string;

  constructor(@Inject(MusicService) private musicService: MusicService) {
    this.serverUrl = config.serverUrl;
  }

  getCoverUrl(): string {
    return `${this.serverUrl}${this.song.coverUrl}`;
  }

  getArtistUrl(): string {
    return `${this.serverUrl}${this.song.artistUrl}`;
  }

  play() {
    this.musicService.addSong(this.song);
    this.musicService.songIndex = this.musicService.songList.length - 1;
    this.musicService.playNow();
  }

  addToQueue() {
    this.musicService.addSong(this.song);
  }
}
