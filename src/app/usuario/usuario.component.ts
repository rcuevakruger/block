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
import { usuarioService } from './usuario.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [usuarioService]
})
export class usuarioComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          idUsuario = new FormControl("", Validators.required);
        
  
      
          primerNombre = new FormControl("", Validators.required);
        
  
      
          primerApellido = new FormControl("", Validators.required);
        
  
      
          segundoApellido = new FormControl("", Validators.required);
        
  
      
          email = new FormControl("", Validators.required);
        
  
      
          direccion = new FormControl("", Validators.required);

          
          balance = new FormControl("", Validators.required);   
  


  constructor(private serviceusuario:usuarioService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          idUsuario:this.idUsuario,
        
    
        
          primerNombre:this.primerNombre,
        
    
        
          primerApellido:this.primerApellido,
        
    
        
          segundoApellido:this.segundoApellido,
        
    
        
          email:this.email,
        
    
        
          direccion:this.direccion,


          balance:this.balance    
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceusuario.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "com.cams.usuario",
      
        
          "idUsuario":this.idUsuario.value,
        
      
        
          "primerNombre":this.primerNombre.value,
        
      
        
          "primerApellido":this.primerApellido.value,
        
      
        
          "segundoApellido":this.segundoApellido.value,
        
      
        
          "email":this.email.value,
        
      
        
          "direccion":this.direccion.value,


          "balance":this.balance.value                  
      
    };

    this.myForm.setValue({
      
        
          "idUsuario":null,
        
      
        
          "primerNombre":null,
        
      
        
          "primerApellido":null,
        
      
        
          "segundoApellido":null,
        
      
        
          "email":null,
        
      
        
          "direccion":null,


          "balance":null
        
      
    });

    return this.serviceusuario.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.loadAll();
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "idUsuario":null,
        
      
        
          "primerNombre":null,
        
      
        
          "primerApellido":null,
        
      
        
          "segundoApellido":null,
        
      
        
          "email":null,
        
      
        
          "direccion":null,


          "balance":null
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "com.cams.usuario",
      
        
          
        
    
        
          
            "primerNombre":this.primerNombre.value,
          
        
    
        
          
            "primerApellido":this.primerApellido.value,
          
        
    
        
          
            "segundoApellido":this.segundoApellido.value,
          
        
    
        
          
            "email":this.email.value,
          
        
    
        
          
            "direccion":this.direccion.value,



            "balance":this.balance.value         
        
    
    };

    return this.serviceusuario.updateParticipant(form.get("idUsuario").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceusuario.deleteParticipant(this.currentId)
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

    return this.serviceusuario.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "idUsuario":null,
          
        
          
            "primerNombre":null,
          
        
          
            "primerApellido":null,
          
        
          
            "segundoApellido":null,
          
        
          
            "email":null,
          
        
          
            "direccion":null, 



            "balance":null
          
        
      };



      
        if(result.idUsuario){
          
            formObject.idUsuario = result.idUsuario;
          
        }else{
          formObject.idUsuario = null;
        }
      
        if(result.primerNombre){
          
            formObject.primerNombre = result.primerNombre;
          
        }else{
          formObject.primerNombre = null;
        }
      
        if(result.primerApellido){
          
            formObject.primerApellido = result.primerApellido;
          
        }else{
          formObject.primerApellido = null;
        }
      
        if(result.segundoApellido){
          
            formObject.segundoApellido = result.segundoApellido;
          
        }else{
          formObject.segundoApellido = null;
        }
      
        if(result.email){
          
            formObject.email = result.email;
          
        }else{
          formObject.email = null;
        }
      
        if(result.direccion){
          
            formObject.direccion = result.direccion;
          
        }else{
          formObject.direccion = null;
        }
      
        if(result.balance){
          
          formObject.balance = result.balance;
        
        }else{
        formObject.balance = null;
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
      
        
          "idUsuario":null,
        
      
        
          "primerNombre":null,
        
      
        
          "primerApellido":null,
        
      
        
          "segundoApellido":null,
        
      
        
          "email":null,
        
      
        
          "direccion":null,


          "balance":null
      
      });
  }

}
