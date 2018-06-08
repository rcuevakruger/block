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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { activoService } from './activo.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-activo',
	templateUrl: './activo.component.html',
	styleUrls: ['./activo.component.css'],
  providers: [activoService]
})
export class activoComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          idActivo = new FormControl("", Validators.required);
        
  
      
          detallesActivo = new FormControl("", Validators.required);
        
  
      
          valorActivo = new FormControl("", Validators.required);
        
  
      
          estadoDeActivo = new FormControl("", Validators.required);
        
  
      
          enteBancario = new FormControl("", Validators.required);
        
  
      
          numeroPoliza = new FormControl("", Validators.required);
        
  
      
          fechaSolicitud = new FormControl("", Validators.required);
        
  
      
          formaPago = new FormControl("", Validators.required);
        
  
      
          vigencia = new FormControl("", Validators.required);
        
  
      
          solicitante = new FormControl("", Validators.required);
        
  
      
          sumaAsegurada = new FormControl("", Validators.required);
        
  
      
          enteAsegurador = new FormControl("", Validators.required);
        
  
      
          enteReasegurador = new FormControl("", Validators.required);
        
  
      
          propietario = new FormControl("", Validators.required);
        
  


  constructor(private serviceactivo:activoService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          idActivo:this.idActivo,
        
    
        
          detallesActivo:this.detallesActivo,
        
    
        
          valorActivo:this.valorActivo,
        
    
        
          estadoDeActivo:this.estadoDeActivo,
        
    
        
          enteBancario:this.enteBancario,
        
    
        
          numeroPoliza:this.numeroPoliza,
        
    
        
          fechaSolicitud:this.fechaSolicitud,
        
    
        
          formaPago:this.formaPago,
        
    
        
          vigencia:this.vigencia,
        
    
        
          solicitante:this.solicitante,
        
    
        
          sumaAsegurada:this.sumaAsegurada,
        
    
        
          enteAsegurador:this.enteAsegurador,
        
    
        
          enteReasegurador:this.enteReasegurador,
        
    
        
          propietario:this.propietario
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceactivo.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        asset.enteBancario=this.optenerDescripcion(asset.enteBancario);
        asset.enteAsegurador=this.optenerDescripcion(asset.enteAsegurador);
        asset.enteReasegurador=this.optenerDescripcion(asset.enteReasegurador);
        asset.propietario=this.optenerDescripcion(asset.propietario);
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - No se pudo encontrar la ruta de la API. Por favor revisa tus API disponibles."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  optenerDescripcion(dato){
    let soloDescripcion=null
    if(dato){
      soloDescripcion=dato.split("#")[1];
    }
    return soloDescripcion;
  }

  addAsset(form: any): Promise<any> {
    
      this.asset = {
        $class: "com.cams.activo",
        
          
            "idActivo":this.idActivo.value,
          
        
          
            "detallesActivo":this.detallesActivo.value,
          
        
          
            "valorActivo":this.valorActivo.value,
          
        
          
            "estadoDeActivo":this.estadoDeActivo.value,
          
        
          
            "enteBancario":this.enteBancario.value,
          
        
          
            "numeroPoliza":this.numeroPoliza.value,
          
        
          
            "fechaSolicitud":this.fechaSolicitud.value,
          
        
          
            "formaPago":this.formaPago.value,
          
        
          
            "vigencia":this.vigencia.value,
          
        
          
            "solicitante":this.solicitante.value,
          
        
          
            "sumaAsegurada":this.sumaAsegurada.value,
          
        
          
            "enteAsegurador":this.enteAsegurador.value,
          
        
          
            "enteReasegurador":this.enteReasegurador.value,
          
        
          
            "propietario":"resource:com.cams.usuario#"+this.propietario.value
          
        
      };
  
      this.myForm.setValue({
        
          
            "idActivo":null,
          
        
          
            "detallesActivo":null,
          
        
          
            "valorActivo":null,
          
        
          
            "estadoDeActivo":null,
          
        
          
            "enteBancario":null,
          
        
          
            "numeroPoliza":null,
          
        
          
            "fechaSolicitud":null,
          
        
          
            "formaPago":null,
          
        
          
            "vigencia":null,
          
        
          
            "solicitante":null,
          
        
          
            "sumaAsegurada":null,
          
        
          
            "enteAsegurador":null,
          
        
          
            "enteReasegurador":null,
          
        
          
            "propietario":null
          
        
      });
  
      return this.serviceactivo.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.loadAll();
        this.errorMessage = null;
        this.myForm.setValue({
        
          
            "idActivo":null,
          
        
          
            "detallesActivo":null,
          
        
          
            "valorActivo":null,
          
        
          
            "estadoDeActivo":null,
          
        
          
            "enteBancario":null,
          
        
          
            "numeroPoliza":null,
          
        
          
            "fechaSolicitud":null,
          
        
          
            "formaPago":null,
          
        
          
            "vigencia":null,
          
        
          
            "solicitante":null,
          
        
          
            "sumaAsegurada":null,
          
        
          
            "enteAsegurador":null,
          
        
          
            "enteReasegurador":null,
          
        
          
            "propietario":null 
          
        
        });
      })
      .catch((error) => {
          if(error == 'Server error'){
              this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
          }
          else{
              this.errorMessage = error;
          }
      });
    
   
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.cams.activo",
      
        
          
        
    
        
          
            "detallesActivo":this.detallesActivo.value,
          
        
    
        
          
            "valorActivo":this.valorActivo.value,
          
        
    
        
          
            "estadoDeActivo":this.estadoDeActivo.value,
          
        
    
        
          
            "enteBancario":this.enteBancario.value,
          
        
    
        
          
            "numeroPoliza":this.numeroPoliza.value,
          
        
    
        
          
            "fechaSolicitud":this.fechaSolicitud.value,
          
        
    
        
          
            "formaPago":this.formaPago.value,
          
        
    
        
          
            "vigencia":this.vigencia.value,
          
        
    
        
          
            "solicitante":this.solicitante.value,
          
        
    
        
          
            "sumaAsegurada":this.sumaAsegurada.value,
          
        
    
        
          
            "enteAsegurador":this.enteAsegurador.value,
          
        
    
        
          
            "enteReasegurador":this.enteReasegurador.value,
          
        
    
        
          
            "propietario":this.propietario.value
          
        
    
    };

    return this.serviceactivo.updateAsset(form.get("idActivo").value,this.asset)
		.toPromise()
		.then(() => {
      this.loadAll();
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - No se pudo encontrar la ruta de la API. Por favor revisa tus API disponibles."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceactivo.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
      this.loadAll();
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - No se pudo encontrar la ruta de la API. Por favor revisa tus API disponibles."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceactivo.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "idActivo":null,
          
        
          
            "detallesActivo":null,
          
        
          
            "valorActivo":null,
          
        
          
            "estadoDeActivo":null,
          
        
          
            "enteBancario":null,
          
        
          
            "numeroPoliza":null,
          
        
          
            "fechaSolicitud":null,
          
        
          
            "formaPago":null,
          
        
          
            "vigencia":null,
          
        
          
            "solicitante":null,
          
        
          
            "sumaAsegurada":null,
          
        
          
            "enteAsegurador":null,
          
        
          
            "enteReasegurador":null,
          
        
          
            "propietario":null 
          
        
      };



      
        if(result.idActivo){
          
            formObject.idActivo = result.idActivo;
          
        }else{
          formObject.idActivo = null;
        }
      
        if(result.detallesActivo){
          
            formObject.detallesActivo = result.detallesActivo;
          
        }else{
          formObject.detallesActivo = null;
        }
      
        if(result.valorActivo){
          
            formObject.valorActivo = result.valorActivo;
          
        }else{
          formObject.valorActivo = null;
        }
      
        if(result.estadoDeActivo){
          
            formObject.estadoDeActivo = result.estadoDeActivo;
          
        }else{
          formObject.estadoDeActivo = null;
        }
      
        if(result.enteBancario){
          
            formObject.enteBancario = result.enteBancario;
          
        }else{
          formObject.enteBancario = null;
        }
      
        if(result.numeroPoliza){
          
            formObject.numeroPoliza = result.numeroPoliza;
          
        }else{
          formObject.numeroPoliza = null;
        }
      
        if(result.fechaSolicitud){
          
            formObject.fechaSolicitud = result.fechaSolicitud;
          
        }else{
          formObject.fechaSolicitud = null;
        }
      
        if(result.formaPago){
          
            formObject.formaPago = result.formaPago;
          
        }else{
          formObject.formaPago = null;
        }
      
        if(result.vigencia){
          
            formObject.vigencia = result.vigencia;
          
        }else{
          formObject.vigencia = null;
        }
      
        if(result.solicitante){
          
            formObject.solicitante = result.solicitante;
          
        }else{
          formObject.solicitante = null;
        }
      
        if(result.sumaAsegurada){
          
            formObject.sumaAsegurada = result.sumaAsegurada;
          
        }else{
          formObject.sumaAsegurada = null;
        }
      
        if(result.enteAsegurador){
          
            formObject.enteAsegurador = result.enteAsegurador;
          
        }else{
          formObject.enteAsegurador = null;
        }
      
        if(result.enteReasegurador){
          
            formObject.enteReasegurador = result.enteReasegurador;
          
        }else{
          formObject.enteReasegurador = null;
        }
      
        if(result.propietario){
          
            formObject.propietario = result.propietario;
          
        }else{
          formObject.propietario = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - No se pudo encontrar la ruta de la API. Por favor revisa tus API disponibles."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "idActivo":null,
        
      
        
          "detallesActivo":null,
        
      
        
          "valorActivo":null,
        
      
        
          "estadoDeActivo":null,
        
      
        
          "enteBancario":null,
        
      
        
          "numeroPoliza":null,
        
      
        
          "fechaSolicitud":null,
        
      
        
          "formaPago":null,
        
      
        
          "vigencia":null,
        
      
        
          "solicitante":null,
        
      
        
          "sumaAsegurada":null,
        
      
        
          "enteAsegurador":null,
        
      
        
          "enteReasegurador":null,
        
      
        
          "propietario":null 
        
      
      });
  }

}
