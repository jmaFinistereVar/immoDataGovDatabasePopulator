import { IMain, IDatabase, ColumnSet } from 'pg-promise';




import { IMDepartement } from '../intf/IMDepartement';
import { IMCodePostal } from '../intf/IMCodePostal';
import { IMCommune } from '../intf/IMCommune';
import * as Knex from 'knex';



export class CodePostalRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;



    constructor(knex: Knex) {
        this.knex = knex;



    }


    create(codePostal: IMCodePostal): Promise<IMCodePostal> {

        return this.knex("codePostal").insert({
            codePostal: codePostal.codePostal,
            idDepartement: codePostal.departement.id,
            idCommune: codePostal.commune ? codePostal.commune.id : null
        }).returning('id')


        /*return this.knex.raw('INSERT INTO codePostal(codePostal, departement_id, commune_id) VALUES ($1, $2, $3) \
                RETURNING id, codePostal,departement_id, commune_id ', [dc.codePostal, dc.departement.id, dc.commune.id])*/

            .then((blips: Array<number>) => {

                if (1 != blips.length)
                    throw new Error("201909150909");
                return Promise.resolve<IMCodePostal>(
                    {
                        id: blips[0],
                        codePostal: codePostal.codePostal,
                        commune: codePostal.commune,
                        departement: codePostal.departement
                    });

                // return Promise.resolve<IMCodePostal>(blips)
            })

    }

    async createifNotExists(c: number, departement: IMDepartement, commune: IMCommune): Promise<IMCodePostal> {
        let codePostal: IMCodePostal = await this.getByCode(c, departement, commune);
        if (null != codePostal)
            return Promise.resolve<IMCodePostal>(codePostal);
        else
            return this.create({
                codePostal: c,
                commune: commune,
                departement: departement,
                id: -1
            })

     
    }

    getByCode(c: number, departement: IMDepartement, commune: IMCommune): Promise<IMCodePostal> {

        return this.knex.select().from<IMCodePostal>("codePostal")
            .where({ codePostal: c })


       //  return this.knex.raw('SELECT c.* FROM codePostal c where c.codePostal = $1', [c])

            .then((blips: Array<IMCodePostal>) => {
                if (0 != blips.length) {
                    if (1 < blips.length)
                        throw new Error("201909150905");
                    return Promise.resolve<IMCodePostal>({
                        id: blips[0].id,
                        codePostal: c,
                        commune: commune,
                        departement: departement
                    })
                }
                else
                    return Promise.resolve<IMCodePostal>(null);

        })
            .catch(err => {
                console.log("Error in codePostalRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }




}
