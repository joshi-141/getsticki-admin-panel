import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginService } from '../service/login.service';
import { LoggedInGuard } from "../service/auth/logged-in.guard";
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [LoggedInGuard], children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
      { path: 'mservice', loadChildren: () => import('../home/mservice/mservice-routing.module').then((m) => m.MserviceRoutingModule), canActivate: [LoggedInGuard] },
      { path: 'authentication', loadChildren: () => import('../home/authentication/authentication-routing.module').then((m) => m.AuthenticationRoutingModule), canActivate: [LoggedInGuard] },
      { path: 'connection', loadChildren: () => import('../home/connection/connection-routing.module').then((m) => m.ConnectionRoutingModule), canActivate: [LoggedInGuard] },
      { path: 'user', loadChildren: () => import('../home/user/user-routing.module').then((m) => m.UserRoutingModule), canActivate: [LoggedInGuard] },
      { path: 'event', loadChildren: () => import('../home/event/event-routing.module').then((m) => m.EventRoutingModule), canActivate: [LoggedInGuard] },
      { path: 'venue', loadChildren: () => import('../home/venue/venue-routing.module').then((m) => m.VenueRoutingModule), canActivate: [LoggedInGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoggedInGuard]
})
export class HomeRoutingModule extends LoginService { }
