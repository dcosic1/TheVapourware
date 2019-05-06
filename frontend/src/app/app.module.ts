import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HardwareComponent } from './hardware/hardware.component';
import { PackagesComponent } from './hardware/packages/packages.component';
import { HttpClientModule } from '@angular/common/http';
import { KonsultantiComponent } from './konsultanti/konsultanti.component';
import { UposleniciComponent } from './uposlenici-odjeli/uposlenici/uposlenici.component';
import { OdjeliComponent } from './uposlenici-odjeli/odjeli/odjeli.component';

import { UposleniciOdjeliComponent } from './uposlenici-odjeli/uposlenici-odjeli.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HardwareComponent,
    PackagesComponent,
    KonsultantiComponent,
    UposleniciComponent,
    OdjeliComponent,
    UposleniciOdjeliComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
