import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArtService } from '../art.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css',
  
})
export class FavouriteComponent implements OnInit  {
  distinctArtists: string[] = [];
  selectedReleases: { artist: string; release: any }[] = [];
  favselectedReleases: { artist: string; release: any }[] = [];
  showTables: { [artistName: string]: boolean } = {};
  releasesDetails: { [artistName: string]: any[] } = {};

  constructor(private service:ArtService){}

  toggleTable(artistName: string): void {
    this.showTables[artistName] = !this.showTables[artistName];
    if (this.showTables[artistName]) {
      this.getReleasesDetails(artistName);
 
    }
     
  }
 
  ngOnInit(): void {
    this.service.selectedReleases$
    .subscribe((releases) => {
      this.selectedReleases = releases;
    console.log(this.selectedReleases);
    this.distinctArtists = Array.from(new Set(this.selectedReleases.map((r) => r.artist)));
      // this.distinctArtists.forEach((artistName) => {
      //   this.getReleasesDetails(artistName);
      // });
      console.log(this.distinctArtists);
    });
}
  
getReleasesDetails(artistName: string): void {
  
  this.releasesDetails[artistName] = this.selectedReleases
    .filter(release => release.artist === artistName)
    .map(release => ({
      year: release.release.year,
      title: release.release.title,
      releaseLabel: release.release.releaseLabel,
      numberOfTracks: release.release.numberOfTracks,
      selected: false 
    }));
    console.log('fromgetrele',this.releasesDetails);
}


removeArtistReleases(artistName: string): void {
  this.distinctArtists = this.distinctArtists.filter((record) => record !== artistName);
  this.releasesDetails[artistName] = [];
  //console.log('del');
  alert('Deleted')

}

}
