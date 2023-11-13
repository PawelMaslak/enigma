import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnigmaComponent } from './enigma/enigma.component';
import { InputKeyboardComponent } from './enigma/input-keyboard/input-keyboard.component';
import { LogoComponent } from './enigma/logo/logo.component';
import { OutputLampsComponent } from './enigma/output-lamps/output-lamps.component';
import { OutputComponent } from './enigma/output/output.component';
import { PlugboardComponent } from './enigma/plugboard/plugboard.component';
import { RotorSectionComponent } from './enigma/rotor-section/rotor-section.component';
import { RotorComponent } from './enigma/rotor/rotor.component';
import { FooterComponent } from './support/footer/footer.component';
import { TopMenuComponent } from './support/top-menu/top-menu.component';

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
    OutputComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
