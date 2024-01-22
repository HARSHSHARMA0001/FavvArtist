import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicBrainZComponent } from './music-brain-z/music-brain-z.component';
import { LastFmComponent } from './last-fm/last-fm.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ArtService } from './art.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MusicBrainZComponent,
    LastFmComponent,
    FavouriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
  ],
  providers: [ArtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
