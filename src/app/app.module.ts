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
import { AboutComponent } from './support/about/about.component';
import { FooterComponent } from './support/footer/footer.component';
import { LoadingComponent } from './support/loading/loading.component';
import { TopMenuComponent } from './support/top-menu/top-menu.component';
import { HistoryComponent } from './support/wiki/history/history.component';
import { ModalComponent } from './support/wiki/modal/modal.component';
import { WikiComponent } from './support/wiki/wiki.component';
import { ImageComponent } from './support/image/image.component';

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
    WikiComponent,
    HistoryComponent,
    ModalComponent,
    LoadingComponent,
    AboutComponent,
    ImageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
