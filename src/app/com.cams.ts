import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.cams{
   export enum estado {
      desmaterializado,
      verificando,
      asegurado,
      reasegurado,
      materializado,
   }
   export class usuario extends Participant {
      idUsuario: string;
      primerNombre: string;
      primerApellido: string;
      segundoApellido: string;
      email: string;
      direccion: string;
      balance: string;
   }
   export class banco extends Participant {
      idBanco: string;
      email: string;
      numeroTelf: string;
   }
   export class aseguradora extends Participant {
      idAseguradora: string;
      email: string;
      numeroTelf: string;
   }
   export class reaseguradora extends Participant {
      idReaseguradora: string;
      email: string;
      numeroCelular: string;
   }
   export class activo extends Asset {
      idActivo: string;
      detallesActivo: string;
      valorActivo: number;
      estadoDeActivo: estado;
      enteBancario: banco;
      numeroPoliza: string;
      fechaSolicitud: string;
      formaPago: string;
      vigencia: string;
      solicitante: string;
      sumaAsegurada: string;
      enteAsegurador: aseguradora;
      enteReasegurador: reaseguradora;
      propietario: usuario;
   }
   export class ConfirmacionBanco extends Transaction {
      estadoDeActivo: estado;
      bancoEncargado: banco;
      Activo: activo;
   }
   export class AsegurarActivo extends Transaction {
      estadoDeActivo: estado;
      numeroPoliza: string;
      fechaSolicitud: string;
      formaPago: string;
      vigencia: string;
      solicitante: string;
      sumaAsegurada: string;
      aseguradoraEncargada: aseguradora;
      Activo: activo;
   }
   export class ReasegurarActivo extends Transaction {
      estadoDeActivo: estado;
      reaseguradoraEncargada: reaseguradora;
      Activo: activo;
   }
   export class Materializar extends Transaction {
      estadoDeActivo: estado;
      Activo: activo;
   }
   export class Traspaso extends Transaction {
    nuevoDueno: usuario;
    antiguoDueno: usuario;
    Activo: activo;
    }
// }
