import { Routes , RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DashboardGuard } from './services/dashboardguard.service'

const routes : Routes = [
    { path : '' , component : HomeComponent},
    { path : 'login' , component : LoginComponent},
    { path : 'dashboard' , component : DashboardComponent , canActivate : [DashboardGuard]},
    { path : 'logout' , component : LogoutComponent},
    { path : 'register' , component : RegisterComponent},
];

export const routing = RouterModule.forRoot(routes);
