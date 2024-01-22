import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtService {
  private selectedReleasesSubject = new BehaviorSubject<{ artist: string; release: any }[]>([]);
  selectedReleases$ = this.selectedReleasesSubject.asObservable();

  //private selectedReleases: { artist: string; release: any }[] = [];
  private apiUrl = 'https://musicbrainz.org/ws/2/';
  private apiUrl2 = 'https://ws.audioscrobbler.com/2.0/';
  private apiKey = '0f426f801ea2785db9a3d3d3f6d5a8c1';
  private auth = 'HarshSharma8';


  constructor(private http:HttpClient) { }

  searchArtistRelease(query:any): Observable<any> {
  
    return this.http.get<any>(`${this.apiUrl}release/?query=${query}&fmt=json`);
  }

   

  searchArtistFromfm(query:string , token:any):Observable<any>{

    return this.http.get<any>(`${this.apiUrl2}?method=artist.search&token=${token}&artist=${query}&api_key=${this.apiKey}&format=json`);
  }


  gettoken():Observable<any>{
    return this.http.get<any>(`${this.apiUrl2}?method=auth.gettoken&api_key=${this.apiKey}&format=json`);
  }

  

  // getSelectedReleases(): Observable<{ artist: string; release: any }[]> {
  //   return this.selectedReleases;
  // }

  setSelectedReleases(releases: { artist: string; release: any }[]): void {
    this.selectedReleasesSubject.next(releases);
  }
  

  }


   
