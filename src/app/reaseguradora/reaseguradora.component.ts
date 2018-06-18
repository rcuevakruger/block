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
import { reaseguradoraService } from './reaseguradora.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-reaseguradora',
	templateUrl: './reaseguradora.component.html',
	styleUrls: ['./reaseguradora.component.scss'],
  providers: [reaseguradoraService]
})
export class reaseguradoraComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          idReaseguradora = new FormControl("", Validators.required);
        
  
      
          email = new FormControl("", Validators.required);
        
  
      
          numeroCelular = new FormControl("", Validators.required);
        
  


  constructor(private servicereaseguradora:reaseguradoraService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          idReaseguradora:this.idReaseguradora,
        
    
        
          email:this.email,
        
    
        
          numeroCelular:this.numeroCelular
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicereaseguradora.getAll()
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
      $class: "com.cams.reaseguradora",
      
        
          "idReaseguradora":this.idReaseguradora.value,
        
      
        
          "email":this.email.value,
        
      
        
          "numeroCelular":this.numeroCelular.value
        
      
    };

    this.myForm.setValue({
      
        
          "idReaseguradora":null,
        
      
        
          "email":null,
        
      
        
          "numeroCelular":null
        
      
    });

    return this.servicereaseguradora.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "idReaseguradora":null,
        
      
        
          "email":null,
        
      
        
          "numeroCelular":null 
        
      
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
      $class: "com.cams.reaseguradora",
      
        
          
        
    
        
          
            "email":this.email.value,
          
        
    
        
          
            "numeroCelular":this.numeroCelular.value
          
        
    
    };

    return this.servicereaseguradora.updateParticipant(form.get("idReaseguradora").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.servicereaseguradora.deleteParticipant(this.currentId)
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

    return this.servicereaseguradora.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "idReaseguradora":null,
          
        
          
            "email":null,
          
        
          
            "numeroCelular":null 
          
        
      };



      
        if(result.idReaseguradora){
          
            formObject.idReaseguradora = result.idReaseguradora;
          
        }else{
          formObject.idReaseguradora = null;
        }
      
        if(result.email){
          
            formObject.email = result.email;
          
        }else{
          formObject.email = null;
        }
      
        if(result.numeroCelular){
          
            formObject.numeroCelular = result.numeroCelular;
          
        }else{
          formObject.numeroCelular = null;
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
      
        
          "idReaseguradora":null,
        
      
        
          "email":null,
        
      
        
          "numeroCelular":null 
        
      
      });
  }

}
