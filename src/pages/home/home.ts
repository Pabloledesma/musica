import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic;

  constructor(
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

  shareSong(){
    let shareSongActionSheet = this.actionSheetController.create({
      title: 'Share song with friends',
      buttons: [
        {text: 'Share on facebook', icon: 'logo-facebook'},
        {text: 'Share on twitter', icon: 'logo-twitter'},
        {text: 'Share', icon: 'share'},
        {text: 'Cancel', role: 'destructive'}
      ]
    });

    shareSongActionSheet.present();
  }
}
