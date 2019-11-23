import { IMain, IDatabase, ColumnSet } from 'pg-promise';




import { IMDepartement } from '../intf/IMDepartement';
import { IMCodePostal } from '../intf/IMCodePostal';
import { IMCommune } from '../intf/IMCommune';
import { Btq } from '../../Btq';
import { IMBtq } from '../intf/IMBtq';
import { IMTypeDeVoie } from '../intf/IMTypeDeVoie';
import { TypeVoie } from '../../TypeVoie';
import { IMTypeLocal } from '../intf/IMTypeLocal';
import { CodeTypeLocal } from '../../CodetypeLocal';

import * as Knex from 'knex';



export class TypeLocalRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;



    constructor(knex: Knex) {
        this.knex = knex;



    }


    create(dc: CodeTypeLocal): Promise<IMTypeLocal> {

        return this.knex("typeLocal").insert({ typeLocal: CodeTypeLocal[dc] }).returning('id')

        /*return this.knex.raw('INSERT INTO typeLocal(typeLocal) VALUES ($1) \
                RETURNING id, typeLocal', [CodetypeLocal[dc]])*/
            .then((blips: Array<number>) => {
                    let r: IMTypeLocal = {
                        id: blips[0],
                        typeLocal: dc
                }


                    return Promise.resolve<IMTypeLocal>(r);
            })

    }

   

    async createifNotExists(valeur: CodeTypeLocal): Promise<IMTypeLocal> {


        let btq: IMTypeLocal = await this.getByValeurLegende(valeur);
        if (null != btq)
            return Promise.resolve<IMTypeLocal>(btq);
        else
            return this.create(valeur);
    }

    getByValeurLegende(valeur: CodeTypeLocal): Promise<IMTypeLocal> {
        let xx: string = Object.keys(CodeTypeLocal)[valeur];
        let yy: string = CodeTypeLocal[valeur];


        return this.knex.select().from<IMTypeLocal>("typeLocal").where({ typeLocal: CodeTypeLocal[valeur]})
        // return this.knex.raw('SELECT c.* FROM typeLocal c where c.typeLocal = $1', [CodetypeLocal[valeur]])
            .then((btq) => {
                if (0 != btq.length) {
                    if (1 < btq.length)
                        throw new Error("201909141803");
                    return Promise.resolve<IMTypeLocal>({
                        id: btq[0].id,
                        typeLocal: valeur
                    })
                }
                else
                    return Promise.resolve<IMTypeLocal>(null);
            })
            .catch(err => {
                console.log("Error in typeLocalRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }



}
