import { IDatabase, IMain, ColumnSet } from "pg-promise";
import { IMCommune } from "../intf/IMCommune";
import { IMAdresse } from "../intf/IMAdresse";
import { Btq } from "../../Btq";
import { TypeVoie } from "../../TypeVoie";
import { IMCodePostal } from "../intf/IMCodePostal";
import { IMBtq } from "../intf/IMBtq";
import { IMTypeDeVoie } from "../intf/IMTypeDeVoie";
import { IMReferenceCadastrale } from "../intf/IMReferenceCadastrale";
import { IMDepartement } from "../intf/IMDepartement";
import { Section } from "../../Section";
import { IMSection } from "../intf/IMSection";

import * as Knex from 'knex';



export class ReferenceCadastraleRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;




    async getByXXX(departement: IMDepartement, codeCommune: number, sectionPrefixOuNull: string,
        section: IMSection, planNb: number): Promise<IMReferenceCadastrale> {

        try {

            let query = this.knex('referenceCadastrale').where({
                idDepartement: departement.id,
                codeCommune: codeCommune,
                idSection: section.id,
                noPlan: planNb

            });
            if (null != sectionPrefixOuNull)
                query = query.where({ prefixeSection: sectionPrefixOuNull });
            else
                query = query.whereNull("prefixeSection");


            let adresse: Array<IMReferenceCadastrale> = await query.select();


            if (0 != adresse.length) {
                if (1 < adresse.length)
                    throw new Error("201909150833");
                return Promise.resolve<IMReferenceCadastrale>({
                    id: adresse[0].id,
                    codeCommune: codeCommune,
                    departement: departement,
                    noPlan: planNb,
                    section: section.section
                })
            }
            else
                return Promise.resolve<IMReferenceCadastrale>(null);
        }
        catch (err) {
            // console.log("Should not enter this line 201908160952, err = " + err);
            throw new Error("Erreur dans RefCadastre.getByXXX, err = " + err);
        }


    }

    async createIfNotExists(departement: IMDepartement, codeCommune: number, sectionPrefixOuNull: string,
        section: IMSection, planNb: number): Promise<IMReferenceCadastrale> {
        try {
            let adresseEnBase: IMReferenceCadastrale = await this.getByXXX(departement, codeCommune,
                sectionPrefixOuNull,
                section, planNb);
            if (null != adresseEnBase) {
                // console.log("<<CommuneRepository.createIfNotExists, there is already a commune with nom = " + nom + " code = " + code);
                return Promise.resolve<IMReferenceCadastrale>(adresseEnBase);
            }
            else {

                // console.log("<<CommuneRepository.createIfNotExists, there is no commune with nom = " + nom + " code = " + code);
                // let alls: Array<IMCommune> = await this.all();
                // console.log("\t CREATION, alls = " + JSON.stringify(alls));
                let adresseCreeEnBase: Array<number> = await this.knex("referenceCadastrale")
                    .insert({
                        idDepartement: departement.id, codeCommune: codeCommune,
                        prefixeSection: sectionPrefixOuNull,
                        idSection: section.id,
                        noPlan: planNb
                    })
                    .returning('id');

                if (1 != adresseCreeEnBase.length)
                    throw new Error("201909150837");

                /*
                let adresseCreeEnBase = await this.knex.raw('INSERT INTO referenceCadastrale(\
idDepartement, codeCommune, prefixeSection, idSection, noPlan) \
VALUES ($1, $2, $3, $4, $5) \
                RETURNING id', [departement.id, codeCommune, sectionPrefixOuNull,
                    section.id, planNb]);*/

                return Promise.resolve<IMReferenceCadastrale>({
                    id: adresseCreeEnBase[0],
                    codeCommune: codeCommune,
                    departement: departement,
                    noPlan: planNb,
                    section: section.section
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