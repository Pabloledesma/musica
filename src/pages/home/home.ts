import { Component } from '@angular/core';

import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicPlayerPage } from '../music-player/music-player';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic;

  constructor(
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private musicProvider: MusicProvider, 
    public navCtrl: NavController) {
    
  }

  ionViewDidLoad(){
    let allMusicLoadingController = this.loadingController.create({
      content: 'Getting your music from server'
    });
    allMusicLoadingController.present();
    this.musicProvider.getMusic()
      .subscribe(musicList => {
        allMusicLoadingController.dismiss();
        this.allMusic = musicList;
      });
  }

  addOneSong(refresher){
    this.musicProvider.getOneSong().subscribe(song => {
      this.allMusic.push(song);
      refresher.complete();
    });
  }

  shareSong(song){
    let shareSongActionSheet = this.actionSheetController.create({
      title: 'Share song with friends',
      buttons: [
        {
          text: 'Share on facebook', 
          icon: 'logo-facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(song.name, song.image, song.music_url);
          }
        },
        {
          text: 'Share on twitter', 
          icon: 'logo-twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(song.name, song.image, song.music_url);
          }
        },
        {
          text: 'Share', 
          icon: 'share',
          handler: () => {
            this.socialSharing.share(song.name, '', song.image, song.music_url);
          }
        },
        {text: 'Cancel', role: 'destructive'}
      ]
    });

    shareSongActionSheet.present();
  }

  goToMusicPlayer(music){
    this.navCtrl.push(MusicPlayerPage, {music: music});
  }
}
