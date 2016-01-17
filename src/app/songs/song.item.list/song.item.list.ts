import {Component, Input} from 'angular2/core';
import {User, Song} from '../../api';
const config = require('../../config.json');

@Component({
  selector: 'moon-song-item-list',
  template: require('./song.item.list.html'),
  styles: [require('./song.item.list.css')]
})
export class SongItemList {
  @Input() private song: Song;
  private serverUrl: string;

  constructor() {
    this.serverUrl = config.serverUrl;
  }

  getCoverUrl(): string {
    return `${this.serverUrl}${this.song.coverUrl}`;
  }

  getArtistUrl(): string {
    return `${this.serverUrl}${this.song.artistUrl}`;
  }
}
