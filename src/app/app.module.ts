import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ScatterStuffComponent } from './pages/scatter-stuff/scatter-stuff.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ParticleEmitterComponent } from './components/particle-emitter/particle-emitter.component';
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SidenavComponent,
    PortfolioComponent,
    ScatterStuffComponent,
    ContactComponent,
    ParticleEmitterComponent,
    DrawingCanvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
