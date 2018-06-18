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
import { AsegurarActivoService } from './AsegurarActivo.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-AsegurarActivo',
	templateUrl: './AsegurarActivo.component.html',
	styleUrls: ['./AsegurarActivo.component.scss'],
  providers: [AsegurarActivoService]
})
export class AsegurarActivoComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          estadoDeActivo = new FormControl("", Validators.required);
        
  
      
          numeroPoliza = new FormControl("", Validators.required);
        
  
      
          fechaSolicitud = new FormControl("", Validators.required);
        
  
      
          formaPago = new FormControl("", Validators.required);
        
  
      
          vigencia = new FormControl("", Validators.required);
        
  
      
          solicitante = new FormControl("", Validators.required);
        
  
      
          sumaAsegurada = new FormControl("", Validators.required);
        
  
      
          aseguradoraEncargada = new FormControl("", Validators.required);
        
  
      
          Activo = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceAsegurarActivo:AsegurarActivoService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          estadoDeActivo:this.estadoDeActivo,
        
    
        
          numeroPoliza:this.numeroPoliza,
        
    
        
          fechaSolicitud:this.fechaSolicitud,
        
    
        
          formaPago:this.formaPago,
        
    
        
          vigencia:this.vigencia,
        
    
        
          solicitante:this.solicitante,
        
    
        
          sumaAsegurada:this.sumaAsegurada,
        
    
        
          aseguradoraEncargada:this.aseguradoraEncargada,
        
    
        
          Activo:this.Activo,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceAsegurarActivo.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        transaction.aseguradoraEncargada=this.optenerDescripcion(transaction.aseguradoraEncargada);
        transaction.Activo=this.optenerDescripcion(transaction.Activo);
        
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
  optenerDescripcion(dato){
    let soloDescripcion=null
    if(dato){
      soloDescripcion=dato.split("#")[1];
    }
    return soloDescripcion;
  }
	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "com.cams.AsegurarActivo",
      
        
          "estadoDeActivo":this.estadoDeActivo.value,
        
      
        
          "numeroPoliza":this.numeroPoliza.value,
        
      
        
          "fechaSolicitud": new Date() ,
        
      
        
          "formaPago":this.formaPago.value,
        
      
        
          "vigencia":this.vigencia.value,
        
      
        
          "solicitante":this.solicitante.value,
        
      
        
          "sumaAsegurada":this.sumaAsegurada.value,
        
      
        
          "aseguradoraEncargada":"resource:com.cams.aseguradora#"+this.aseguradoraEncargada.value,
        
      
        
          "Activo":this.Activo.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "estadoDeActivo":null,
        
      
        
          "numeroPoliza":null,
        
      
        
          "fechaSolicitud":null,
        
      
        
          "formaPago":null,
        
      
        
          "vigencia":null,
        
      
        
          "solicitante":null,
        
      
        
          "sumaAsegurada":null,
        
      
        
          "aseguradoraEncargada":null,
        
      
        
          "Activo":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceAsegurarActivo.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.loadAll();
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "estadoDeActivo":null,
        
      
        
          "numeroPoliza":null,
        
      
        
          "fechaSolicitud":null,
        
      
        
          "formaPago":null,
        
      
        
          "vigencia":null,
        
      
        
          "solicitante":null,
        
      
        
          "sumaAsegurada":null,
        
      
        
          "aseguradoraEncargada":null,
        
      
        
          "Activo":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
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


   updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "com.cams.AsegurarActivo",
      
        
          
            "estadoDeActivo":this.estadoDeActivo.value,
          
        
    
        
          
            "numeroPoliza":this.numeroPoliza.value,
          
        
    
        
          
            "fechaSolicitud":this.fechaSolicitud.value,
          
        
    
        
          
            "formaPago":this.formaPago.value,
          
        
    
        
          
            "vigencia":this.vigencia.value,
          
        
    
        
          
            "solicitante":this.solicitante.value,
          
        
    
        
          
            "sumaAsegurada":this.sumaAsegurada.value,
          
        
    
        
          
            "aseguradoraEncargada":this.aseguradoraEncargada.value,
          
        
    
        
          
            "Activo":this.Activo.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceAsegurarActivo.updateTransaction(form.get("transactionId").value,this.Transaction)
		.toPromise()
		.then(() => {
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


  deleteTransaction(): Promise<any> {

    return this.serviceAsegurarActivo.deleteTransaction(this.currentId)
		.toPromise()
		.then(() => {
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

    return this.serviceAsegurarActivo.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "estadoDeActivo":null,
          
        
          
            "numeroPoliza":null,
          
        
          
            "fechaSolicitud":null,
          
        
          
            "formaPago":null,
          
        
          
            "vigencia":null,
          
        
          
            "solicitante":null,
          
        
          
            "sumaAsegurada":null,
          
        
          
            "aseguradoraEncargada":null,
          
        
          
            "Activo":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.estadoDeActivo){
          
            formObject.estadoDeActivo = result.estadoDeActivo;
          
        }else{
          formObject.estadoDeActivo = null;
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
      
        if(result.aseguradoraEncargada){
          
            formObject.aseguradoraEncargada = result.aseguradoraEncargada;
          
        }else{
          formObject.aseguradoraEncargada = null;
        }
      
        if(result.Activo){
          
            formObject.Activo = result.Activo;
          
        }else{
          formObject.Activo = null;
        }
      
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
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
      
        
          "estadoDeActivo":null,
        
      
        
          "numeroPoliza":null,
        
      
        
          "fechaSolicitud":null,
        
      
        
          "formaPago":null,
        
      
        
          "vigencia":null,
        
      
        
          "solicitante":null,
        
      
        
          "sumaAsegurada":null,
        
      
        
          "aseguradoraEncargada":null,
        
      
        
          "Activo":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

