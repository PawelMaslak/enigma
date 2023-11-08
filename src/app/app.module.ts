import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlPanelComponent } from './enigma/control-panel/control-panel.component';
import { RotorControlPanelComponent } from './enigma/control-panel/rotor-control-panel/rotor-control-panel.component';
import { EnigmaComponent } from './enigma/enigma.component';
import { InputKeyboardComponent } from './enigma/input-keyboard/input-keyboard.component';
import { LogoComponent } from './enigma/logo/logo.component';
import { OutputLampsComponent } from './enigma/output-lamps/output-lamps.component';
import { PlugboardComponent } from './enigma/plugboard/plugboard.component';
import { RotorSectionComponent } from './enigma/rotor-section/rotor-section.component';
import { RotorComponent } from './enigma/rotor/rotor.component';
import { FooterComponent } from './support/footer/footer.component';
import { TopMenuComponent } from './support/top-menu/top-menu.component';
import { CompactEnigmaComponent } from './compact-enigma/compact-enigma.component';

@NgModule({
  declarations: [
    AppComponent,
    EnigmaComponent,
    LogoComponent,
    RotorComponent,
    OutputLampsComponent,
    InputKeyboardComponent,
    PlugboardComponent,
    TopMenuComponent,
    FooterComponent,
    RotorSectionComponent,
    ControlPanelComponent,
    RotorControlPanelComponent,
    CompactEnigmaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
