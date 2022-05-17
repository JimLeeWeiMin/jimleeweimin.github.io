import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ScatterStuffComponent } from './pages/scatter-stuff/scatter-stuff.component';

const routes: Routes = [
  {
    path:'', redirectTo: '/pages/Home', pathMatch: "full"
  },
  {
    path:"pages/Home",
    component: HomepageComponent
  },
  {
    path:"pages/Portfolio",
    component: PortfolioComponent
  },
  {
    path:"pages/ScatterStuff",
    component: ScatterStuffComponent
  },
  {
    path:"pages/Contact",
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
