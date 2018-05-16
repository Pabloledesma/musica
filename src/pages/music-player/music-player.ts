import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage {

  public music;
  private songMedia: MediaObject;
  public isMusicPaused = false;

  constructor(
    private media: Media,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.music = this.navParams.get('music');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicPlayerPage');
  }

  stop(){
    if(this.songMedia !== null){
      this.songMedia.stop();
      this.songMedia.release();
      this.songMedia = null;
    }
  }

  play(){
    if(this.songMedia === null){
      this.songMedia = this.media.create(this.music['music_url']);
      this.songMedia.play();
    } else {
      if(this.isMusicPaused === true){
        this.songMedia.play();
        this.isMusicPaused = false;
      }
    }
  }

  pause(){
    if(this.songMedia !== null){
      this.songMedia.pause();
      this.isMusicPaused = true;
    }
  }

}
