import { IDatabase, IMain, ColumnSet } from "pg-promise";
import { IMCommune } from "../intf/IMCommune";
import * as Knex from 'knex';




export class CommuneRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    // private db: IDatabase<any>;

    private knex: Knex;

   // private pgp: IMain;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;

   
    async getByNomAndCode(nom: string): Promise<IMCommune> {
      
        return this.knex.select().from<IMCommune>("commune")
            .where({ nom: nom })
            .then((blips: Array<IMCommune>) => {
                if (0 != blips.length) {
                    if (1 < blips.length)
                        throw new Error("201909150905");
                    return Promise.resolve<IMCommune>({
                        id: blips[0].id,
                nom: nom
                    })
                }
                else
                    return Promise.resolve<IMCommune>(null);
            })
            .catch(err => {
                // console.log("Should not enter this line 201908160952, err = " + err);
                throw new Error("Erreur dans communeRepo.getByNomAndCode, err = " + err);
            })
    }

    async createIfNotExists(nom: string): Promise<IMCommune> {
        try {
            let c: IMCommune = await this.getByNomAndCode(nom);
            if (null != c) {
                // console.log("<<CommuneRepository.createIfNotExists, there is already a commune with nom = " + nom + " code = " + code);
                return Promise.resolve<IMCommune>(c);
            }
            else {

                // console.log("<<CommuneRepository.createIfNotExists, there is no commune with nom = " + nom + " code = " + code);
                // let alls: Array<IMCommune> = await this.all();
                // console.log("\t CREATION, alls = " + JSON.stringify(alls));

                if ((null == nom) || (undefined == nom) || ("" === nom.trim())) {
                    throw new Error("Pas de nom ???, nom = " + nom);
                }

                return this.knex("commune").insert({ nom: nom}).returning('id')


                /*return this.knex.raw('INSERT INTO commune(nom) VALUES ($1) \
                RETURNING id, nom ', [nom])*/
                    .then((blips: Array<number>) => {
                        if (1 != blips.length)
                            throw new Error("201909150907");
                        return Promise.resolve<IMCommune>(
                            {
                                id: blips[0],
                                nom: nom
                            })

                    })
            }
        }

        catch (err) {
            throw new Error("Erreur dans CommuneRepo.createIfNotExists, err = " + err);
        }

    }

    constructor(knex: Knex /*db: any, pgp: IMain*/) {
        this.knex = knex;
        // this.pgp = pgp; // library's root, if ever needed;
    }


}