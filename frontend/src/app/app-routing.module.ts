import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DobavljaciComponent } from './dobavljaci/dobavljaci.component';
import { KonsultantiComponent } from './konsultanti/konsultanti.component';
import { HardwareComponent } from './hardware/hardware.component';

const routes: Routes = [ 
{ path: 'dobavljaci', component: DobavljaciComponent },
{ path: 'konsultanti',component: KonsultantiComponent },
{ path: 'hardware', component: HardwareComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
