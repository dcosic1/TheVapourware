import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HardwareComponent } from './hardware/hardware.component';
import { PackagesComponent } from './hardware/packages/packages.component';
import { HttpClientModule } from '@angular/common/http';
import { KonsultantiComponent } from './konsultanti/konsultanti.component';
import { UposleniciComponent } from './uposlenici-odjeli/uposlenici/uposlenici.component';
import { OdjeliComponent } from './uposlenici-odjeli/odjeli/odjeli.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';  
import { UposleniciOdjeliComponent } from './uposlenici-odjeli/uposlenici-odjeli.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { DetaljiProjektaComponent } from './projekti/detalji-projekta/detalji-projekta.component';
import { DobavljaciComponent } from './dobavljaci/dobavljaci.component';
import { ChartsComponent } from './dobavljaci/charts/charts.component';
import { StarsComponent } from './dobavljaci/stars/stars.component';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { FinansijeComponent } from './finansije/finansije.component';
import { TehnologijeComponent } from './tehnologije/tehnologije.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { GradesComponent } from './dobavljaci/grades/grades.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { IzvjestajComponent } from './izvjestaj/izvjestaj.component';
import { NoteComponent } from './izvjestaj/note/note.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './home/home.component';
import { GlobalService } from './service/global.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HardwareComponent,
    PackagesComponent,
    KonsultantiComponent,
    UposleniciComponent,
    OdjeliComponent,
    UposleniciOdjeliComponent,
    ProjektiComponent,
    DetaljiProjektaComponent,
    DobavljaciComponent,
    ChartsComponent,
    StarsComponent,
    FinansijeComponent,
    TehnologijeComponent,
    LoginComponent,
    RegistrationComponent,
    GradesComponent,
    IzvjestajComponent,
    NoteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: "dobavljaci", component: DobavljaciComponent },
      { path: "home", component: HomeComponent },
      { path: "konsultanti", component: KonsultantiComponent },
      { path: "hardware", component: HardwareComponent },
      { path: "uposlenici", component: UposleniciComponent },
      { path: "projekti", component: ProjektiComponent },
      { path: "finansije", component: FinansijeComponent },
      { path: "tehnologije", component: TehnologijeComponent },
      { path: "login", component: LoginComponent },
      { path: "registration", component: RegistrationComponent },
      { path: "izvjestaji", component: IzvjestajComponent },
      { path: "", pathMatch: "full", redirectTo: "login" }
    ]),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule {}
