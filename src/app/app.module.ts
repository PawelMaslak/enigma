import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnigmaComponent } from './enigma/enigma.component';
import { LogoComponent } from './enigma/logo/logo.component';
import { RotorComponent } from './enigma/rotor/rotor.component';
import { OutputLampsComponent } from './enigma/output-lamps/output-lamps.component';
import { InputKeyboardComponent } from './enigma/input-keyboard/input-keyboard.component';
import { PlugboardComponent } from './enigma/plugboard/plugboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EnigmaComponent,
    LogoComponent,
    RotorComponent,
    OutputLampsComponent,
    InputKeyboardComponent,
    PlugboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
