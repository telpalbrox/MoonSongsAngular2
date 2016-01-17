import {Component, OnInit, Inject} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {User, Song} from '../api';
import {SongsService} from '../providers/songs.service';
import {SongItemList} from './song.item.list/song.item.list';

@Component({
  selector: 'moon-songs',
  template: require('./songs.html'),
  directives: [SongItemList]
})
export class Songs implements OnInit {
  private songs: Song[];
  constructor(@Inject(SongsService) private songsService: SongsService) { }

  ngOnInit() {
    this.songsService.getAll()
      .then(songs => this.songs = songs)
      .catch(error => console.error(error));
  }
}
