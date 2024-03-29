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
import { PathfindingMazeComponent } from './components/pathfinding-maze/pathfinding-maze.component';
import { CvObjectRecognitionComponent } from './components/cv-object-recognition/cv-object-recognition.component';
import { CvFlyTheCoopComponent } from './components/cv-fly-the-coop/cv-fly-the-coop.component';
import { CvSecondScholarComponent } from './components/cv-second-scholar/cv-second-scholar.component';
import { CvTaggerComponent } from './components/cv-tagger/cv-tagger.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { CvIntelligentTutoringSystemComponent } from './components/cv-intelligent-tutoring-system/cv-intelligent-tutoring-system.component';
import { CvGapYearComponent } from './components/cv-gap-year/cv-gap-year.component';
import { CvAvensysSWEComponent } from './components/cv-avensys-swe/cv-avensys-swe.component';

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
    PathfindingMazeComponent,
    CvObjectRecognitionComponent,
    CvFlyTheCoopComponent,
    CvSecondScholarComponent,
    CvTaggerComponent,
    ImageViewerComponent,
    CvIntelligentTutoringSystemComponent,
    CvGapYearComponent,
    CvAvensysSWEComponent,
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
