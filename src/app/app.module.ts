/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { activoComponent } from './activo/activo.component';


  import { usuarioComponent } from './usuario/usuario.component';
  import { bancoComponent } from './banco/banco.component';
  import { aseguradoraComponent } from './aseguradora/aseguradora.component';
  import { reaseguradoraComponent } from './reaseguradora/reaseguradora.component';


  import { ConfirmacionBancoComponent } from './ConfirmacionBanco/ConfirmacionBanco.component';
  import { AsegurarActivoComponent } from './AsegurarActivo/AsegurarActivo.component';
  import { ReasegurarActivoComponent } from './ReasegurarActivo/ReasegurarActivo.component';
  import { MaterializarComponent } from './Materializar/Materializar.component';
  import { TraspasoComponent } from './Traspaso/Traspaso.component';
  import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    
    activoComponent
    ,

    usuarioComponent,
      bancoComponent,
      aseguradoraComponent,
      
      reaseguradoraComponent
      ,

    ConfirmacionBancoComponent,
        AsegurarActivoComponent,
        ReasegurarActivoComponent,
        
        MaterializarComponent,
        TraspasoComponent
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BlockUIModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
