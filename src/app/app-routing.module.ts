import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnigmaComponent } from './enigma/enigma.component';
import { AboutComponent } from './support/about/about.component';
import { WikiComponent } from './support/wiki/wiki.component';

const routes: Routes = [
  { path: 'wiki', component: WikiComponent },
  { path: 'enigma', component: EnigmaComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/enigma', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
