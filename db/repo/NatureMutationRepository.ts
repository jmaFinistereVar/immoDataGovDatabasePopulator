import { IMain, IDatabase, ColumnSet } from 'pg-promise';




import { IMDepartement } from '../intf/IMDepartement';
import { IMCodePostal } from '../intf/IMCodePostal';
import { IMCommune } from '../intf/IMCommune';
import { Btq } from '../../Btq';
import { IMBtq } from '../intf/IMBtq';
import { IMNatureMutation } from '../intf/IMNatureMutation';
import { NatureMutation } from '../../NatureMutation';

import * as Knex from 'knex';


export class NatureMutationRepository {


    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex : Knex

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;



    constructor(knex : Knex) {
        this.knex = knex;
    }


    create(dc: NatureMutation): Promise<IMNatureMutation> {
        return this.knex("natureMutation").insert({ valeur: dc, legende: this._getLegende(dc) }).returning('id')

        /*return this.knex.raw('INSERT INTO natureMutation(valeur, legende) VALUES ($1, $2) \
                RETURNING id, valeur, legende ', [dc, this._getLegende(dc)])*/
            .then((blips: Array<number>) => {
                if (1 != blips.length)
                    throw new Error("201909150845");
                    let r: IMNatureMutation = {
                        id: blips[0],
                        natureMutation: dc
                }
                    return Promise.resolve<IMNatureMutation>(r);
            })
    }

    private _getLegende(t: NatureMutation): string {
        let legende: string = null;

        Object.keys(NatureMutation).forEach(k => {
            if (NatureMutation[k] === t)
                legende = k;

        });

        return legende;
    }

    async createifNotExists(valeur: NatureMutation): Promise<IMNatureMutation> {
        let legende: string = this._getLegende(valeur);


        let btq: IMNatureMutation = await this.getByValeurLegende(valeur, legende);
        if (null != btq)
            return Promise.resolve<IMNatureMutation>(btq);
        else
            return this.create(valeur);
    }

    getByValeurLegende(valeur: NatureMutation, legende: string): Promise<IMNatureMutation> {
        return this.knex.select().from<IMNatureMutation>("natureMutation")
            .where({ valeur: valeur, legende: legende })
        /*return this.knex.raw('SELECT c.* FROM natureMutation c where c.valeur = $1 and c.legende = $2', [valeur, legende])*/
            .then((blips: Array<IMNatureMutation>) => {
                if (0 != blips.length) {
                    if (1 < blips.length)
                        throw new Error("201909150847");
                    return Promise.resolve<IMNatureMutation>({
                        id: blips[0].id,
                        natureMutation: valeur
                    })
                }
                else
                    return Promise.resolve<IMNatureMutation>(null);

            })
            .catch(err => {
                console.log("Error in natureMutationRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }




}
