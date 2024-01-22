import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArtService } from '../art.service';
import { ResponseStructure } from '../../../dataTypes';

@Component({
  selector: 'app-last-fm',
  templateUrl: './last-fm.component.html',
  styleUrl: './last-fm.component.css'
})
export class LastFmComponent implements OnInit , OnChanges{
  query:string ='';
  //searchResults: any[] = [];
  ShowTable=false;
  token:any;
  singleToken:any;
  searchResults: ResponseStructure | null = null;
  ShortListElements:any;
  btnstate:boolean=true;
  ArtistName: { artist: string; selected: boolean }[] = [];
  constructor(private  lastfmService:ArtService){}
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {
    this.lastfmService.gettoken().subscribe((
      Response) =>
      { this.token=Response
        this.singleToken=this.token.token
        console.log(this.token.token);
      },
      
      (error: any) => {
        console.error('Error:', error);
      }
      
    );
      
  }

  search() {
    console.log(this.query);
    this.lastfmService.searchArtistFromfm(this.query, this.singleToken)
      .subscribe(response => {
        if (response && response.results && response.results.artistmatches && response.results.artistmatches.artist) {
          this.searchResults = response;
          this.ShortListElements =this.searchResults;
          console.log(this.searchResults);
        } 
        else {
          console.error('Invalid API response format');
        }
      });
  }
  

  addToSelectedList(artistName: string): void {
    const index = this.findIndexInSelectedReleases(artistName);
    if (index === -1) {
    this.ArtistName.push({ artist: artistName, selected: true });
    console.log('From FunctionAdd',this.ArtistName);
  }
  else  {
    this.ArtistName.splice(index, 1);
  }
  
  this.btnstate = this.ArtistName.length === 0;
  
  
}

 findIndexInSelectedReleases(artistName: string): number {
  return this.ArtistName.findIndex(item =>
    item.artist === artistName
  );
}

ShowArtist(){
  if(this.ArtistName.length > 0){
    this.btnstate=false;
    this.openModel()
  }
  else{
    this.btnstate=true;
  }

}

openModel(){
  const modelDiv = document.getElementById('myModel');
  if(modelDiv !=null){
    modelDiv.style.display='block';
  }
}

CloseList(){
  
  const modelDiv = document.getElementById('myModel');
  if(modelDiv !=null){
    modelDiv.style.display='none';
  }
}

toggleArtistSelection(artist){
  console.log('from toggle',artist);
  const index = this.ArtistName.findIndex(item => item.artist === artist);
  if (index !== -1 && !this.ArtistName[index].selected) {
    this.ArtistName.splice(index, 1);
  }

  
  }
  

}

