import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HardwareComponent } from './hardware/hardware.component';
import { PackagesComponent } from './hardware/packages/packages.component';
import { HttpClientModule } from '@angular/common/http';
import { KonsultantiComponent } from './konsultanti/konsultanti.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HardwareComponent,
    PackagesComponent,
    KonsultantiComponent
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
