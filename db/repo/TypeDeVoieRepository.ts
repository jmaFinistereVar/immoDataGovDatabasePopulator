



import { IMDepartement } from '../intf/IMDepartement';
import { IMCodePostal } from '../intf/IMCodePostal';
import { IMCommune } from '../intf/IMCommune';
import { Btq } from '../../Btq';
import { IMBtq } from '../intf/IMBtq';
import { IMTypeDeVoie } from '../intf/IMTypeDeVoie';
import { TypeVoie } from '../../typeVoie';

import * as Knex from 'knex';


export class TypeDeVoieRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;




    constructor(knex : Knex) {
        this.knex = knex;



    }


    create(dc: TypeVoie): Promise<IMTypeDeVoie> {

        return this.knex("typeVoie").insert({ valeur: dc, legende: this._getLegende(dc)}).returning('id')
        /*return this.knex.raw('INSERT INTO typeVoie(valeur, legende) VALUES ($1, $2) \
                RETURNING id, valeur, legende ', [dc, this._getLegende(dc)])*/
            .then((blips: Array<number>) => {
                if (1 != blips.length)
                    throw new Error("201909150830");
                let r: IMTypeDeVoie = {
                    id: blips[0],
                    typeDeVoie: dc
                }
              

                return Promise.resolve<IMTypeDeVoie>(r);
            })

    }

    private _getLegende(t: TypeVoie): string {
        let legende: string = null;

        Object.keys(TypeVoie).forEach(k => {
            if (TypeVoie[k] === t)
                legende = k;

        });

        return legende;
    }

    async createifNotExists(valeur: TypeVoie): Promise<IMTypeDeVoie> {
        let legende: string = this._getLegende(valeur);
      

        let btq: IMTypeDeVoie = await this.getByValeurLegende(valeur, legende);
        if (null != btq)
            return Promise.resolve<IMTypeDeVoie>(btq);
        else
            return this.create(valeur);
    }

    getByValeurLegende(valeur: TypeVoie, legende: string): Promise<IMTypeDeVoie> {
        return this.knex.select().from<IMTypeDeVoie>("typeVoie")
            .where({ valeur: valeur, legende: legende })

        /*return this.knex.raw('SELECT c.* FROM typeVoie c where c.valeur = $1 and c.legende = $2', [valeur, legende])*/
            .then((btq: Array<IMTypeDeVoie>) => {
                if (0 != btq.length) {
                    if (1 < btq.length)
                        throw new Error("201909150822");
                    return Promise.resolve<IMTypeDeVoie>({
                        id: btq[0].id,
                        typeDeVoie: valeur
                    })
                }
                else
                    return Promise.resolve<IMTypeDeVoie>(null);

            })
            .catch(err => {
                console.log("Error in TypeDeVoieRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }



}
