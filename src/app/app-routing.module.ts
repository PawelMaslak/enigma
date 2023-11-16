import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnigmaComponent } from './enigma/enigma.component';
import { WikiComponent } from './support/wiki/wiki.component';

const routes: Routes = [
  { path: 'wiki', component: WikiComponent },
  { path: 'enigma', component: EnigmaComponent },
  { path: '', redirectTo: '/enigma', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
