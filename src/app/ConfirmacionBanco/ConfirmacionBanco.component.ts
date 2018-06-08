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
import { ConfirmacionBancoService } from './ConfirmacionBanco.service';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-ConfirmacionBanco',
  templateUrl: './ConfirmacionBanco.component.html',
  styleUrls: ['./ConfirmacionBanco.component.css'],
  providers: [ConfirmacionBancoService]
})
export class ConfirmacionBancoComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;



  estadoDeActivo = new FormControl("", Validators.required);



  bancoEncargado = new FormControl("", Validators.required);



  Activo = new FormControl("", Validators.required);



  transactionId = new FormControl("", Validators.required);



  timestamp = new FormControl("", Validators.required);




  constructor(private serviceConfirmacionBanco: ConfirmacionBancoService, fb: FormBuilder) {
    this.myForm = fb.group({


      estadoDeActivo: this.estadoDeActivo,



      bancoEncargado: this.bancoEncargado,



      Activo: this.Activo,



      transactionId: this.transactionId,



      timestamp: this.timestamp


    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceConfirmacionBanco.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(transaction => {
          transaction.bancoEncargado=this.optenerDescripcion(transaction.bancoEncargado);
          transaction.Activo=this.optenerDescripcion(transaction.Activo);
          tempList.push(transaction);
        });
        this.allTransactions = tempList;

      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - No se pudo encontrar la ruta de la API. Por favor revisa tus API disponibles."
        }
        else {
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
      $class: "com.cams.ConfirmacionBanco",


      "estadoDeActivo": this.estadoDeActivo.value,



      "bancoEncargado": this.bancoEncargado.value,



      "Activo": this.Activo.value,



      "transactionId": this.transactionId.value,



      "timestamp": this.timestamp.value


    };

    this.myForm.setValue({


      "estadoDeActivo": null,



      "bancoEncargado": null,



      "Activo": null,



      "transactionId": null,



      "timestamp": null


    });

    return this.serviceConfirmacionBanco.addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
          "estadoDeActivo": null,
          "bancoEncargado": null,
          "Activo": null,
          "transactionId": null,
          "timestamp": null


        });
        this.loadAll();
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
        }
        else {
          this.errorMessage = error;
        }
      });
  }


  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "com.cams.ConfirmacionBanco",



      "estadoDeActivo": this.estadoDeActivo.value,





      "bancoEncargado": this.bancoEncargado.value,





      "Activo": this.Activo.value,









      "timestamp": this.timestamp.value



    };

    return this.serviceConfirmacionBanco.updateTransaction(form.get("transactionId").value, this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - No se pudo encontrar la ruta de la API. Por favor revisa tus API disponibles."
        }
        else {
          this.errorMessage = error;
        }
      });
  }


  deleteTransaction(): Promise<any> {

    return this.serviceConfirmacionBanco.deleteTransaction(this.currentId)
      .toPromise()
      .then(() => {
        this.loadAll();
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - No se pudo encontrar la ruta de la API. Por favor revisa tus API disponibles."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceConfirmacionBanco.getTransaction(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {


          "estadoDeActivo": null,



          "bancoEncargado": null,



          "Activo": null,



          "transactionId": null,



          "timestamp": null


        };





        if (result.estadoDeActivo) {

          formObject.estadoDeActivo = result.estadoDeActivo;

        } else {
          formObject.estadoDeActivo = null;
        }

        if (result.bancoEncargado) {

          formObject.bancoEncargado = result.bancoEncargado;

        } else {
          formObject.bancoEncargado = null;
        }

        if (result.Activo) {

          formObject.Activo = result.Activo;

        } else {
          formObject.Activo = null;
        }

        if (result.transactionId) {

          formObject.transactionId = result.transactionId;

        } else {
          formObject.transactionId = null;
        }

        if (result.timestamp) {

          formObject.timestamp = result.timestamp;

        } else {
          formObject.timestamp = null;
        }


        this.myForm.setValue(formObject);

      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage ="No se pudo conectar al servidor REST. Por favor revisa tus detalles de configuración";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - No se pudo encontrar la ruta de la API. Por favor revisa tus API disponibles."
        }
        else {
          this.errorMessage = error;
        }
      });

  }

  resetForm(): void {
    this.myForm.setValue({
      "estadoDeActivo": null,
      "bancoEncargado": null,
      "Activo": null,
      "transactionId": null,
      "timestamp": null

    });
  }

}

