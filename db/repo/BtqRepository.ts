import { IMain, IDatabase, ColumnSet } from 'pg-promise';




import { IMDepartement } from '../intf/IMDepartement';
import { IMCodePostal } from '../intf/IMCodePostal';
import { IMCommune } from '../intf/IMCommune';
import { Btq } from '../../Btq';
import { IMBtq } from '../intf/IMBtq';
import * as Knex from 'knex';



export class BtqRepository {


    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;



    constructor(knex : Knex) {
        this.knex = knex;



    }


    create(dc: Btq): Promise<IMBtq> {

        return this.knex("btq").insert(
           { valeur: dc, legende: this._getLegende(dc) }
        ).returning('id')

        /*return this.knex.raw('INSERT INTO btq(valeur, legende) VALUES ($1, $2) \
                RETURNING id, valeur, legende ', [dc, this._getLegende(dc)])*/

            .then((blips: Array<number>) => {
                if (1 != blips.length)
                    throw new Error("201909150917");
                let r: IMBtq = {
                    id: blips[0],
                    btq: dc
                }
                return Promise.resolve<IMBtq>(r);
            })

    }

    private _getLegende(t: Btq): string {
        let legende: string = null;

        Object.keys(Btq).forEach(k => {
            if (Btq[k] === t)
                legende = k;

        });

        return legende;
    }

    async createifNotExists(valeur: Btq): Promise<IMBtq> {
        let legende: string = this._getLegende(valeur);


        let btq: IMBtq = await this.getByValeurLegende(valeur, legende);
        if (null != btq)
            return Promise.resolve<IMBtq>(btq);
        else
            return this.create(valeur);
    }

    getByValeurLegende(valeur: Btq, legende: string): Promise<IMBtq> {
        return this.knex.select().from<IMBtq>("btq")
            .where({ valeur: valeur, legende: legende })

       /*return this.knex.raw('SELECT c.* FROM btq c where c.valeur = $1 and c.legende = $2', [valeur, legende])*/
            .then((blips: Array<IMBtq>) => {
                if (0 != blips.length) {
                    if (1 < blips.length)
                        throw new Error("201909150918");
                    return Promise.resolve<IMBtq>({
                        id: blips[0].id,
                        btq: valeur
                    })
                }
                else
                    return Promise.resolve<IMBtq>(null);

            })
            .catch(err => {
                console.log("Error in BtqRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }




}
