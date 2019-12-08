



import { IMDepartement } from '../intf/IMDepartement';
import { DepartmentCode } from '../../DepartmentCode';
import * as Knex from 'knex';



export class DepartementRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex : Knex





    constructor(knex: Knex) {
        this.knex = knex;



    }


    create(dc: DepartmentCode): Promise<IMDepartement> {

        return this.knex("departement").insert({ code: dc, nom: this._getLegende(dc) }).returning('id')


        /*return this.knex.raw('INSERT INTO departement(code, nom) VALUES ($1, $2) \
                RETURNING id, code, nom ', [dc, this._getLegende(dc)])*/
            .then((blips: Array<number>) => {
                   
                if (1 != blips.length)
                    throw new Error("201909150901");
                let r: IMDepartement = {
                    id: blips[0],
                    code: dc,
                    nom: this._getLegende(dc)
                }
                return Promise.resolve<IMDepartement>(r);

                    // return Promise.resolve<IMDepartement>(blips);
            })

    }

    private _getLegende(t: DepartmentCode): string {
        let legende: string = null;

        Object.keys(DepartmentCode).forEach(k => {
            if (DepartmentCode[k] === t)
                legende = k;

        });

        return legende;
    }

    async createifNotExists(codeDepartement: DepartmentCode): Promise<IMDepartement> {
        let legende: string = this._getLegende(codeDepartement);


        let btq: IMDepartement = await this.getByValeurLegende(codeDepartement, legende);
        if (null != btq)
            return Promise.resolve<IMDepartement>(btq);
        else
            return this.create(codeDepartement);
    }

    getByValeurLegende(valeur: string, legende: string): Promise<IMDepartement> {
        return this.knex.select().from<IMDepartement>("departement")
            .where({ code: valeur, nom: legende })

        /*return this.knex.raw('SELECT c.* FROM departement c where c.code = $1 and c.nom = $2', [valeur, legende])*/
            .then((blips: Array<IMDepartement>) => {
                if (0 != blips.length) {
                    if (1 < blips.length)
                        throw new Error("201909150903");
                    return Promise.resolve<IMDepartement>({
                        id: blips[0].id,
                        code: valeur,
                        nom: legende
                    })
                }
                else
                    return Promise.resolve<IMDepartement>(null);

            })
            .catch(err => {
                console.log("Error in DepartementRepository.getByCode = " + err + ", " + JSON.stringify(err));
                throw new Error(err);
            })
    }


}
