import { IMain, IDatabase, ColumnSet } from 'pg-promise';




import { IMDepartement } from '../intf/IMDepartement';
import { IMCodePostal } from '../intf/IMCodePostal';
import { IMNatureCultureSpeciale } from '../intf/IMNatureCultureSpeciale';
import { NatureCultureSpeciales } from '../../natureCultureSpeciale';

import * as Knex from 'knex';


export class NatureCultureSpecialeRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;



    constructor(knex: Knex) {
        this.knex = knex;
    }


    create(dc: NatureCultureSpeciales): Promise<IMNatureCultureSpeciale> {
        return this.knex("natureCultureSpeciale").insert({ valeur: dc, legende: this._getLegende(dc) }).returning('id')

        /*return this.knex.raw('INSERT INTO natureCultureSpeciale(valeur, legende) VALUES ($1, $2) \
                RETURNING id, valeur, legende ', [dc, this._getLegende(dc)])*/
            .then((blips: Array<number>) => {
                if (1 != blips.length)
                    throw new Error("201909150845");
                let r: IMNatureCultureSpeciale = {
                    id: blips[0],
                    natureCultureSpeciale: dc
                }
                return Promise.resolve<IMNatureCultureSpeciale>(r);

                
            })
    }

    getByValeurLegende(valeur: NatureCultureSpeciales, legende: string): Promise<IMNatureCultureSpeciale> {
        return this.knex.select().from<IMNatureCultureSpeciale>("natureCultureSpeciale")
            .where({ valeur: valeur, legende: legende })
       // return this.knex.raw('SELECT c.* FROM natureCultureSpeciale c where c.valeur = $1 and c.legende = $2', [valeur, legende])
            .then((blips: Array<IMNatureCultureSpeciale>) => {
                if (0 != blips.length) {
                    if (1 < blips.length)
                        throw new Error("201909150847");
                    return Promise.resolve<IMNatureCultureSpeciale>({
                        id: blips[0].id,
                        natureCultureSpeciale: valeur
                    })
                }
                else
                    return Promise.resolve<IMNatureCultureSpeciale>(null);

            })
            .catch(err => {
                console.log("Error in natureCultureSpecialeRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }
    private _getLegende(t: NatureCultureSpeciales): string {
        let legende: string = null;

        Object.keys(NatureCultureSpeciales).forEach(k => {
            if (NatureCultureSpeciales[k] === t)
                legende = k;

        });

        return legende;
    }


    async createifNotExists(valeur: NatureCultureSpeciales): Promise<IMNatureCultureSpeciale> {
        let legende: string = this._getLegende(valeur);


        let btq: IMNatureCultureSpeciale = await this.getByValeurLegende(valeur, legende);
        if (null != btq)
            return Promise.resolve<IMNatureCultureSpeciale>(btq);
        else
            return this.create(valeur);
    }




}
