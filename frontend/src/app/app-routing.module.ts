import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DobavljaciComponent } from './dobavljaci/dobavljaci.component';
import { KonsultantiComponent } from './konsultanti/konsultanti.component';
import { HardwareComponent } from './hardware/hardware.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { IzvjestajComponent } from './izvjestaj/izvjestaj.component';

const routes: Routes = [ 
{ path: 'dobavljaci', component: DobavljaciComponent },
{ path: 'konsultanti',component: KonsultantiComponent },
{ path: 'hardware', component: HardwareComponent},
{ path: 'login',component: LoginComponent },
{ path: 'registration',component: RegistrationComponent },
{path: 'izvjestaji', component:IzvjestajComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
