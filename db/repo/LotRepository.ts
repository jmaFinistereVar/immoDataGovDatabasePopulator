import { IDatabase, IMain, ColumnSet } from "pg-promise";
import { IMCommune } from "../intf/IMCommune";
import { IMLot } from "../intf/IMLot";
import * as Knex from 'knex';



export class LotRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;

   

    async getByNomAndCode(surfaceCarrez: number, tantieme: number): Promise<IMLot> {

        try {

   

            

            let query = this.knex<IMLot>('lot');
            if (null !== tantieme) {
                query = query.where({ tantieme: tantieme });
            }
            else
                query = query.whereNull("tantieme");
            if (null != surfaceCarrez)
                query = query.where({ surfaceCarrez: surfaceCarrez });
            else
                query = query.whereNull("surfaceCarrez");

            let venteEnBase: Array<IMLot> = await query.select();
      

                // this.knex.raw('SELECT dc.* FROM lot dc where dc.tantieme=$1 AND dc.surfaceCarrez = $2 ', [tantieme, surfaceCarrez]);
            if (0 != venteEnBase.length) {
                if (1 < venteEnBase.length)
                    throw new Error("201909150857");
                return Promise.resolve<IMLot>({
                    id: venteEnBase[0].id,
                    surfaceCarrez: surfaceCarrez,
                    tantieme: tantieme                })
            }
            else
                return Promise.resolve<IMLot>(null);

       
        }
        catch (err) {
            // console.log("Should not enter this line 201908160952, err = " + err);
            throw new Error("Erreur dans VenteRepo.getByXXX, err = " + err);
        }
    }

    async createIfNotExists(surfaceCarrez: number, tantieme: number): Promise<IMLot> {
        try {
            let c: IMLot = await this.getByNomAndCode(surfaceCarrez, tantieme);
            if (null != c) {
                // console.log("<<CommuneRepository.createIfNotExists, there is already a commune with nom = " + nom + " code = " + code);
                return Promise.resolve<IMLot>(c);
            }
            else {

                // console.log("<<CommuneRepository.createIfNotExists, there is no commune with nom = " + nom + " code = " + code);
                // let alls: Array<IMCommune> = await this.all();
                // console.log("\t CREATION, alls = " + JSON.stringify(alls));
                

                return this.knex("lot").insert({ tantieme: tantieme, surfaceCarrez: surfaceCarrez }).returning('id')



                /*return this.knex.raw('INSERT INTO lot(surfaceCarrez, tantieme) VALUES ($1, $2) \
                RETURNING id ', [surfaceCarrez, tantieme])*/
                    .then((blips: Array<number>) => {
                        if (1 != blips.length)
                            throw new Error("201909150859");
                    return Promise.resolve<IMLot>(
                        {
                            id: blips[0],
                            surfaceCarrez: surfaceCarrez,
                            tantieme: tantieme
                        })
                    })
            }
        }

        catch (err) {
            throw new Error("Erreur dans LotRepository.createIfNotExists, err = " + err);
        }

    }

    constructor(knex: Knex) {
        this.knex = knex;
    }


}