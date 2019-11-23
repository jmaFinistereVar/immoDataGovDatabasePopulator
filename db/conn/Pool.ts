

import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

import { CommuneRepository } from '../repo/CommuneRepository';
import { DepartementRepository } from '../repo/DepartementRepository';
import { CodePostalRepository } from '../repo/CodePostalRepository';
import { NatureCultureRepository } from '../repo/NatureCultureRepository';
import { BtqRepository } from '../repo/BtqRepository';
import { TypeDeVoieRepository } from '../repo/TypeDeVoieRepository';
import { NatureMutationRepository } from '../repo/NatureMutationRepository';
import { NatureCultureSpecialeRepository } from '../repo/NatureCultureSpecialeRepository';
import { SectionRepository } from '../repo/SectionRepository';
import { AdresseRepository } from '../repo/AdresseRepository';
import { VenteRepository } from '../repo/VenteRepository';
import { ReferenceCadastraleRepository } from '../repo/ReferenceCadastraleRepository';
import { TypeLocalRepository } from '../repo/TypeLocalRepository';
import { LotRepository } from '../repo/LotRepository';

import * as Knex from 'knex';




interface IExtensions {
    communes: CommuneRepository;
    departements: DepartementRepository;
    codePostals: CodePostalRepository;
    natureCulture: NatureCultureRepository;
    btq: BtqRepository;
    typeDeVoie: TypeDeVoieRepository;
    natureMutation: NatureMutationRepository;
    natureCultureSpeciale: NatureCultureSpecialeRepository;
    section: SectionRepository;
    adresse: AdresseRepository;
    vente: VenteRepository;
    referenceCadastrale: ReferenceCadastraleRepository;
    typeLocal: TypeLocalRepository;
    lot: LotRepository;
}



export class Pool {



    static DB: Knex = null;



    /**
     * 
     * @param data
     * Note: See https://vitaly-t.github.io/pg-promise/global.html, search receive and camelizeColumns
     */
    private static _setColumnNames(data) {
        const tmp = data[0];
        for (const prop in tmp) {
            const camel = Pool._setColumnName(prop);
            if (!(camel in tmp)) {
                for (let i = 0; i < data.length; i++) {
                    const d = data[i];
                    d[camel] = d[prop];
                    delete d[prop];
                }
            }
        }
    }

    private static _setColumnName(col: string): string {
        switch (col) {


            case "addresse_id":
                return "addresse_id";
            case "btq_id":
                return "btq_id";
            case "cadastre_id":
                return "cadastre_id";
                
            case "code":
                return "code";
            case "codepostal":
                return "codePostal";
            case "codepostal_id":
                return "codepostal_id";

            case "commune_id":
                return "commune_id";
            case "codecommune":
                return "codeCommune";
            case "datevente":
                return "dateVente";

            case "departement_id":
                return "departement_id";
            case "id":
                return "id";
            case "legende":
                return "legende";

            case "lot1_id":
                return "lot1_id";
            case "lot2_id":
                return "lot2_id";
            case "lot3_id":
                return "lot3_id";
            case "lot4_id":
                return "lot4_id";
            case "lot5_id":
                return "lot5_id";

            case "natureculture_id":
                return "natureCulture_id";
            case "natureculturespeciale_id":
                return "natureCultureSpeciale_id";
            case "naturemutation_id":
                return "natureMutation_id";
            case "nb":
                return "nb";
            case "nblots":
                return "nblots";
            case "nbpieces":
                return "nbPieces";
            case "nom":
                return "nom";
            case "noplan":
                return "noPlan";
            case "novolume":
                return "noVolume";
            case "prefixesection":
                return "prefixeSection";
            case "section_id":
                return "section_id";
            case "sectionprefix":
                return "sectionPrefix";

            case "surfacebati":
                return "surfaceBati";
            case "surfacecarrez":
                return "surfaceCarrez";
            case "surfacetotalecarrezlots":
                return "surfaceTotaleCarrezLots"
            case "surfaceterrain":
                return "surfaceTerrain";
            case "tantieme":
                return "tantieme";
                

            case "typelocal":
                return "typeLocal";
            case "typelocal_id":
                return "typeLocal_id";
                

            case "typevoie_id":
                return "typevoie_id";


            case "valeur":
                return "valeur";
            case "valeurfonciere":
                return "valeurFonciere";
            case "voie":
                return "voie";
            default:
                throw new Error("Should not enter this line 201904181114, col = " + col);
        }
    }

    static getDb(): Knex {



        if (null == Pool.DB) {
            

            const config =({
                client: 'pg',
                version: '4.5',
                debug: false,
                connection: {
                    host: 'localhost',
                    port: 5432,
                    database: 'immoDataGov',
                    user: 'postgres',
                    password: 'postgre'
                },
                pool: {
                    min: 0, max: 7,
                    /*afterCreate: function (conn, done) {
                        // in this example we use pg driver's connection API
                        conn.query('SET timezone="UTC";', function (err) {
                            if (err) {
                                // first query failed, return error and don't try to make next query
                                done(err, conn);
                            } else {
                                // do the second query...
                                console.log("Nouvelle connexion VIA KNEX !!!!");
                                conn.query('SELECT set_limit(0.01);', function (err) {
                                    // if err is not falsy, connection is discarded from pool
                                    // if connection aquire was triggered by a query the error is passed to query promise
                                    done(err, conn);
                                });
                            }
                        });
                    }
*/
                }
            });

            Pool.DB = Knex(config as Knex.Config);

            /*Pool.DB.on('query', function (queryData) {
                console.log("query = " + JSON.stringify(queryData));
            });*/




           /* Pool.DB = pgp<IDatabase<IExtensions> & IExtensions>({
                host: 'localhost',
                port: 5432,
                database: 'immoDataGov',
                user: 'postgres',
                password: 'postgre'
            });*/
        }
        return Pool.DB;
    }

}