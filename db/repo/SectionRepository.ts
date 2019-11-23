import { IMain, IDatabase, ColumnSet } from 'pg-promise';




import { IMDepartement } from '../intf/IMDepartement';
import { IMCodePostal } from '../intf/IMCodePostal';
import { IMCommune } from '../intf/IMCommune';
import { Section } from '../../Section';
import { IMSection } from '../intf/IMSection';
import * as Knex from 'knex';



export class SectionRepository {


    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;



    constructor(knex: Knex) {
        this.knex = knex;


    }


    create(dc: Section): Promise<IMSection> {

        return this.knex("section").insert({ valeur: dc, legende: this._getLegende(dc) }).returning('id')
        /*
        return this.knex.raw('INSERT INTO section(valeur, legende) VALUES ($1, $2) \
                RETURNING id, valeur, legende ', [dc, this._getLegende(dc)])*/
            .then((blips: Array<number>) => {
              
                if (1 != blips.length)
                    throw new Error("201909150830");
                let r: IMSection = {
                    id: blips[0],
                    section: dc
                }
                return Promise.resolve<IMSection>(r);
            })

    }

    private _getLegende(t: Section): string {
        let legende: string = null;

        Object.keys(Section).forEach(k => {
            if (Section[k] === t)
                legende = k;
        });
        return legende;
    }

    async createifNotExists(valeur: Section): Promise<IMSection> {
        let legende: string = this._getLegende(valeur);
        let btq: IMSection = await this.getByValeurLegende(valeur, legende);
        if (null != btq)
            return Promise.resolve<IMSection>(btq);
        else
            return this.create(valeur);
    }

    getByValeurLegende(valeur: Section, legende: string): Promise<IMSection> {
        return this.knex.select().from<IMSection>("section")
            .where({ valeur: valeur, legende: legende })
            .then((sections: Array<IMSection>) => {
                if (0 != sections.length) {
                    if (1 < sections.length)
                        throw new Error("201909150827");
                    return Promise.resolve<IMSection>({
                        id: sections[0].id,
                        section: valeur
                    })
                }
                else
                    return Promise.resolve<IMSection>(null);
            })
            .catch(err => {
                console.log("Error in SectionRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }




}
