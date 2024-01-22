import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicBrainZComponent } from './music-brain-z/music-brain-z.component';
import { LastFmComponent } from './last-fm/last-fm.component';
import { FavouriteComponent } from './favourite/favourite.component';

const routes: Routes = [
  {
    component:MusicBrainZComponent,
    path:''
  },
  {
    component:LastFmComponent,
    path:'Last-fm'
  },
  {
    component:FavouriteComponent,
    path:'Favourites'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
