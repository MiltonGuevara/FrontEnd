import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';
import { ListTarjetaCreditoComponent } from './components/list-tarjeta-credito/list-tarjeta-credito.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TarjetasComponent,
    TarjetaCreditoComponent,
    ListTarjetaCreditoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
