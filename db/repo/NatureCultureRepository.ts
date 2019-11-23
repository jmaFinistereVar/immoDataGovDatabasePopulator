import { IMain, IDatabase, ColumnSet } from 'pg-promise';




import { IMDepartement } from '../intf/IMDepartement';
import { IMCodePostal } from '../intf/IMCodePostal';
import { IMNatureCulture } from '../intf/IMNatureCulture';
import { NatureCulture } from '../../natureCulture';
import * as Knex from 'knex';



export class NatureCultureRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;



    constructor(knex : Knex) {
        this.knex = knex;
    }


    create(dc: NatureCulture): Promise<IMNatureCulture> {
        return this.knex("natureCulture").insert({ valeur: dc, legende: this._getLegende(dc) }).returning('id')

       /* return this.knex.raw('INSERT INTO natureCulture(valeur, legende) VALUES ($1, $2) \
                RETURNING id, valeur, legende ', [dc, this._getLegende(dc)])*/
            .then((blips: Array<number>) => {
                if (1 != blips.length)
                    throw new Error("201909150854");
                let r: IMNatureCulture = {
                    id: blips[0],
                    natureCulture: dc
                }
                return Promise.resolve<IMNatureCulture>(r);
            })
    }

    getByValeurLegende(valeur: NatureCulture, legende: string): Promise<IMNatureCulture> {
        return this.knex.select().from<IMNatureCulture>("natureCulture")
            .where({ valeur: valeur, legende: legende })
        /*return this.knex.raw('SELECT c.* FROM natureCulture c where c.valeur = $1 and c.legende = $2', [valeur, legende])*/
            .then((blips: Array<IMNatureCulture>) => {
                if (0 != blips.length) {
                    if (1 < blips.length)
                        throw new Error("201909150855");
                    return Promise.resolve<IMNatureCulture>({
                        id: blips[0].id,
                        natureCulture: valeur
                    })
                }
                else
                    return Promise.resolve<IMNatureCulture>(null);
            })
            .catch(err => {
                console.log("Error in natureCultureRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }
    private _getLegende(t: NatureCulture): string {
        let legende: string = null;

        Object.keys(NatureCulture).forEach(k => {
            if (NatureCulture[k] === t)
                legende = k;

        });

        return legende;
    }


    async createifNotExists(valeur: NatureCulture): Promise<IMNatureCulture> {
        let legende: string = this._getLegende(valeur);


        let btq: IMNatureCulture = await this.getByValeurLegende(valeur, legende);
        if (null != btq)
            return Promise.resolve<IMNatureCulture>(btq);
        else
            return this.create(valeur);
    }




}
