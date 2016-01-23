import {Injectable} from 'angular2/core';
import {Song} from '../api';
const config = require('../config.json');

@Injectable()
export class MusicService {
  public songList: Song[];
  public songIndex: number;
  private audio: HTMLAudioElement;
  private changeSong: boolean;
  private serverUrl: string;

  constructor() {
    this.audio = document.createElement('audio');
    this.songList = [];
    this.songIndex = 0;
    this.changeSong = false;
    this.serverUrl = config.serverUrl;

    this.audio.addEventListener('ended', () => {
      this.nextSong(true);
    });
  }

  getSong(): Song {
    return this.songList[this.songIndex];
  }

  getIndex(): number {
    if (this.songList.length === 0) {
      return 0;
    }

    return this.songIndex + 1;
  }

  addSong(song: Song) {
    this.songList.push(song);
  }

  getAudioUrl(): string {
    return this.serverUrl + '/api/songs/' + this.getSong().artist +
      '/' + this.getSong().album + '/' + this.getSong().title + '/listen';
  }

  play() {
    this.audio.play();
  }

  playNow() {
    this.audio.src = this.getAudioUrl();
    this.play();
  }

  playSong() {
    if (!this.audio.paused) {
      this.playNow();
    }
  }

  pause() {
    this.audio.pause();
  }

  nextSong(now: boolean) {
    if (this.songIndex < this.songList.length - 1) {
      this.songIndex++;
      if (now) {
        this.playNow();
      } else {
        this.playSong();
      }
    }
  }

  prevSong() {
    if (this.songIndex > 0) {
      this.songIndex--;
      this.playSong();
    }
  }

  randomizeSongLisst() {
    let array = this.songList;
    let currentIndex = array.length;
    let temporaryValue: Song;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    this.songList = array;
  }

  getTime(): number {
    return this.audio.currentTime;
  }

  setTime(time: number) {
    this.audio.currentTime = time;
  }

  getDuration(): number {
    return this.audio.duration;
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }
}
