import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArtService } from '../art.service';


@Component({
  selector: 'app-music-brain-z',
  templateUrl: './music-brain-z.component.html',
  styleUrl: './music-brain-z.component.css'
})
export class MusicBrainZComponent implements OnInit  {
  query: any = '';
  searchResults: any
  releaseData:any;
  selectedArtistName: string = '';
  showTables: { [artistName: string]: boolean } = {};
  activeArtist: string;
  releasesDetails: { [artistName: string]: any[] } = {};
  selectedReleases: { artist: string; release: any }[] = [];
  distinctReleasesArray: { artist: string; release: any }[] = [];
  favourite:boolean=false;

  constructor(private service:ArtService){}

  ngOnInit(): void {}

  toggleTable(artistName: string): void {
    this.showTables[artistName] = !this.showTables[artistName];
    if (this.showTables[artistName]) {
      this.getReleasesDetails(artistName);
    }
     
  }

  search():void{
      console.log(this.query);
        this.service.searchArtistRelease(this.query).subscribe((result)=>{
          console.log(result)
          this.searchResults=result; 
        });
      }

      getDistinctArtistNames(): string[] {
        const artistNamesSet = new Set<string>();
        this.searchResults.releases.forEach(release => {
          artistNamesSet.add(release['artist-credit'][0]['name']);
        });
        //console.log(artistNamesSet)
        return Array.from(artistNamesSet);
        
      }

      getReleasesDetails(artistName:string): void {
        this.releasesDetails[artistName] = [];
    for (const release of this.searchResults.releases) {
      const releaseArtistName = release['artist-credit'][0]['name'];
      if (releaseArtistName === artistName) {
        this.releasesDetails[artistName].push({
          year: release['release-events'][0]?.date,
          title: release.title,
          releaseLabel: release['label-info'][0]?.label.name,
          numberOfTracks: release['media'][0]?.['track-count']
        });
      }
    }
    console.log(this.releasesDetails);
  }
       

  addToSelectedReleases(artistName: string, release: any): void {
    const selectedRelease = { artist: artistName, release: release };
    const index = this.findIndexInSelectedReleases(artistName, release);
    if (index === -1 && release.selected) {
    this.selectedReleases.push(selectedRelease);
    console.log(this.selectedReleases);
  }
  else if (index !== -1 && !release.selected) {
    this.selectedReleases.splice(index, 1);
  }
  this.service.setSelectedReleases(this.selectedReleases);
  
}

 findIndexInSelectedReleases(artistName: string, release: any): number {
  return this.selectedReleases.findIndex(item =>
    item.artist === artistName && item.release === release
  );
}

ShowAddToFav():void{
  alert('Added to favourites');
}

}

