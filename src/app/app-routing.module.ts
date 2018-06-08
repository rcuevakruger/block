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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

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

  const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		{ path: 'activo', component: activoComponent},
    { path: 'usuario', component: usuarioComponent},
    { path: 'banco', component: bancoComponent},
    { path: 'aseguradora', component: aseguradoraComponent},
    { path: 'reaseguradora', component: reaseguradoraComponent},
    { path: 'ConfirmacionBanco', component: ConfirmacionBancoComponent},
    { path: 'AsegurarActivo', component: AsegurarActivoComponent},
    { path: 'ReasegurarActivo', component: ReasegurarActivoComponent},
    { path: 'Materializar', component: MaterializarComponent},
    { path: 'Traspaso', component: TraspasoComponent },    
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
