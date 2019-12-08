import { IMCommune } from "../intf/IMCommune";
import { IMAdresse } from "../intf/IMAdresse";
import { Btq } from "../../Btq";
import { TypeVoie } from "../../TypeVoie";
import { IMCodePostal } from "../intf/IMCodePostal";
import { IMBtq } from "../intf/IMBtq";
import { IMTypeDeVoie } from "../intf/IMTypeDeVoie";
import { IMReferenceCadastrale } from "../intf/IMReferenceCadastrale";
import * as Knex from 'knex';


export class AdresseRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:

    async getByXXX(noVoie: number, btqOrNull: IMBtq, typeVoieOrNull: IMTypeDeVoie,
        codeVoie: string, nomVoie: string, cp: IMCodePostal, refCadastre: IMReferenceCadastrale): Promise<IMAdresse> {

        try {
            let query = this.knex<IMAdresse>('addresse').where({
                nb: noVoie,
                code: codeVoie,
                voie: nomVoie,
                idCodePostal: cp.id,
                idCadastre: refCadastre.id
            });
            if (null != btqOrNull)
                query = query.where({ idBtq: btqOrNull.id });
            else
                query = query.whereNull("idBtq");
            if (null != typeVoieOrNull)
                query = query.where({ idTypeVoie: typeVoieOrNull.id });
            else
                query = query.whereNull("idTypeVoie");


            let adresse: Array<IMAdresse> = await query.select();

            if (0 != adresse.length) {
                if (1 < adresse.length) {
                    let str: string = "201909150833, getByXXX, adresse.length = " + adresse.length;
                    let tempAd: IMAdresse = {
                        id: -1,
                        btqOrNull: btqOrNull ? btqOrNull.btq : null,
                        codeVoie: codeVoie,
                        cp: cp,
                        nb: noVoie,
                        typeVoie: typeVoieOrNull ? typeVoieOrNull.typeDeVoie : null,
                        voie: nomVoie,
                        refCadastre: refCadastre,
                        longitude: null,
                        latitude: null
                    };
                    str += "\n adress = " + JSON.stringify(tempAd);
                    throw new Error(str);
                }
                return Promise.resolve<IMAdresse>({
                    id: adresse[0].id,
                    btqOrNull: btqOrNull ? btqOrNull.btq : null,
                    codeVoie: codeVoie,
                    cp: cp,
                    nb: noVoie,
                    typeVoie: typeVoieOrNull ? typeVoieOrNull.typeDeVoie : null,
                    voie: nomVoie,
                    refCadastre: refCadastre,
                    longitude: null,
                    latitude: null
                })
            }
            else
                return Promise.resolve<IMAdresse>(null);

        }
        catch (err)  {
            // console.log("Should not enter this line 201908160952, err = " + err);
            throw new Error("Erreur dans AdresseRepo.getByXXX, err = " + err);
        }

        
    }

    async createIfNotExists(noVoie: number, btqOrNull: IMBtq, typeVoieOrNull: IMTypeDeVoie,
        codeVoie: string, voie: string, cp: IMCodePostal, refCadastre: IMReferenceCadastrale): Promise<IMAdresse> {
        try {
            let adresseEnBase: IMAdresse = await this.getByXXX(noVoie, btqOrNull, typeVoieOrNull,
                codeVoie, voie, cp, refCadastre);
            if (null != adresseEnBase) {
                // console.log("<<CommuneRepository.createIfNotExists, there is already a commune with nom = " + nom + " code = " + code);
                return Promise.resolve<IMAdresse>(adresseEnBase);
            }
            else {

                let adresseCreeEnBase: Array<number> = await this.knex("addresse")
                    .insert({
                        nb: noVoie,
                        code: codeVoie,
                        voie: voie,
                        idCodePostal: cp.id,
                        idCadastre: refCadastre.id,
                        idBtq: btqOrNull ? btqOrNull.id : null,
                        idTypeVoie: typeVoieOrNull ? typeVoieOrNull.id : null
                    })
                    .returning('id');

                if (1 != adresseCreeEnBase.length) {
                    let str: string = "201909150926, createIfNotExists, adresse.length = " + adresseCreeEnBase.length;
                    let tempAd: IMAdresse = {
                        id: -1,
                        btqOrNull: btqOrNull ? btqOrNull.btq : null,
                        codeVoie: codeVoie,
                        cp: cp,
                        nb: noVoie,
                        typeVoie: typeVoieOrNull ? typeVoieOrNull.typeDeVoie : null,
                        voie: voie,
                        refCadastre: refCadastre,
                        longitude: 0,
                        latitude: 0
                    };
                    str += "\n adress = " + JSON.stringify(tempAd);
                    throw new Error(str);
                }       

                return Promise.resolve<IMAdresse>({
                    id: adresseCreeEnBase[0],
                    btqOrNull: btqOrNull ? btqOrNull.btq : null,
                    codeVoie: codeVoie,
                    cp: cp,
                    nb: noVoie,
                    typeVoie: typeVoieOrNull ? typeVoieOrNull.typeDeVoie : null,
                    voie: voie,
                    refCadastre: refCadastre,
                    longitude: null,
                    latitude: null
                });

            }
        }

        catch (err) {
            throw new Error("Erreur dans AdreseRepo.createIfNotExists, err = " + err);
        }

    }

    constructor(knex: Knex) {
        this.knex = knex;
    }


}