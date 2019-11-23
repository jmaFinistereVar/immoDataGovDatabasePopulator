import { IDatabase, IMain, ColumnSet } from "pg-promise";
import { IMCommune } from "../intf/IMCommune";
import { IMAdresse } from "../intf/IMAdresse";
import { Btq } from "../../Btq";
import { TypeVoie } from "../../TypeVoie";
import { IMCodePostal } from "../intf/IMCodePostal";
import { IMBtq } from "../intf/IMBtq";
import { IMTypeDeVoie } from "../intf/IMTypeDeVoie";
import { IMVente } from "../intf/IMVente";
import { NatureMutation } from "../../NatureMutation";
import { NatureCultureSpeciales } from "../../NatureCultureSpeciale";
import { NatureCulture } from "../../NatureCulture";
import { Section } from "../../Section";
import { IMNatureMutation } from "../intf/IMNatureMutation";
import { IMNatureCultureSpeciale } from "../intf/IMNatureCultureSpeciale";
import { IMNatureCulture } from "../intf/IMNatureCulture";
import { IMSection } from "../intf/IMSection";
import { IMTypeLocal } from "../intf/IMTypeLocal";
import { IMLot } from "../intf/IMLot";

import * as Knex from 'knex';

export class VenteRepository {

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private knex: Knex;

    // ColumnSet objects static namespace:
    private static cs: ColumnSet;





    async getByXXX(dateMutation: Date, natureMutationintf: IMNatureMutation, valeurFonciere: number,
        nbLots: number, nbPieces: number, natureCultureSpecialeOrNullIntf: IMNatureCultureSpeciale,
        natureCultureOrNullIntf: IMNatureCulture, surfaceTerrain: number, surfaceBati: number,
        volNbOrNull: number, adresse: IMAdresse, typeLocal: IMTypeLocal, surfaceCarrezLots: number,
        lot1OrNull: IMLot, lot2OrNull: IMLot, lot3OrNull: IMLot,
        lot4OrNull: IMLot, lot5OrNull: IMLot): Promise<IMVente> {

        try {

            let query = this.knex('vente').where({
                dateVente: dateMutation,
                valeurFonciere: valeurFonciere,
                nbLots: nbLots,
                nbPieces: nbPieces,
                surfaceTerrain: surfaceTerrain,
                surfaceBati: surfaceBati,
                idAddresse: adresse.id,
                idTypeLocal: typeLocal.id,
                surfaceTotaleCarrezLots: surfaceCarrezLots

            });
            if (null != natureMutationintf)
                query = query.where({ idNatureMutation: natureMutationintf.id });
            else
                query = query.whereNull("idNatureMutation");
            if (null != natureCultureSpecialeOrNullIntf)
                query = query.where({ idNatureCultureSpeciale: natureCultureSpecialeOrNullIntf.id });
            else
                query = query.whereNull("idNatureCultureSpeciale");
            if (null != natureCultureOrNullIntf)
                query = query.where({ idNatureCulture: natureCultureOrNullIntf.id });
            else
                query = query.whereNull("idNatureCulture");
            if (null != volNbOrNull)
                query = query.where({ noVolume: volNbOrNull });
            else
                query = query.whereNull("noVolume");
            if (null != lot1OrNull)
                query = query.where({ idLot1: lot1OrNull.id });
            else
                query = query.whereNull("idLot1");
            if (null != lot2OrNull)
                query = query.where({ idLot2: lot2OrNull.id });
            else
                query = query.whereNull("idLot2");
            if (null != lot3OrNull)
                query = query.where({ idLot3: lot3OrNull.id });
            else
                query = query.whereNull("idLot3");
            if (null != lot4OrNull)
                query = query.where({ idLot4: lot4OrNull.id });
            else
                query = query.whereNull("idLot4");
            if (null != lot5OrNull)
                query = query.where({ idLot5: lot5OrNull.id });
            else
                query = query.whereNull("idLot5");


            let venteEnBase = await await query.select();

            if (0 != venteEnBase.length) {
                if (1 < venteEnBase.length)
                    throw new Error("201909150935");
                return Promise.resolve<IMVente>({
                    id: venteEnBase[0].id,
                    adresse: adresse,
                    date: dateMutation,
                    natureCulture: natureCultureOrNullIntf ? natureCultureOrNullIntf.natureCulture : null,
                    natureCultureSpeciale: natureCultureSpecialeOrNullIntf ? natureCultureSpecialeOrNullIntf.natureCultureSpeciale : null,
                    natureMutation: natureMutationintf ? natureMutationintf.natureMutation : null,
                    nbLots: nbLots,
                    nbPieces: nbPieces,
                    noVlume: volNbOrNull,
                    surfaceTerrain: surfaceTerrain,
                    surfaceBati: surfaceBati,
                    valeurFonciere: valeurFonciere,
                    typeLocal: typeLocal,
                    surfaceCarrezLots: surfaceCarrezLots,
                    lot1: lot1OrNull,
                    lot2: lot2OrNull,
                    lot3: lot3OrNull,
                    lot4: lot4OrNull,
                    lot5: lot5OrNull
                })
            }
            else
                return Promise.resolve<IMVente>(null);


        }
        catch (err) {
            // console.log("Should not enter this line 201908160952, err = " + err);
            throw new Error("Erreur dans VenteRepo.getByXXX, err = " + err);
        }
    }

    async createIfNotExists(dateMutation: Date, natureMutationintf: IMNatureMutation, valeurFonciere: number,
        nbLots: number, nbPieces: number, natureCultureSpecialeOrNullIntf: IMNatureCultureSpeciale,
        natureCultureOrNullIntf: IMNatureCulture, surfaceTerrain: number, surfaceReeleBati: number,
        volNbOrNull: number, adresse: IMAdresse, typeLocal: IMTypeLocal, surfaceCarrezLots: number,
        lot1OrNull: IMLot, lot2OrNull: IMLot, lot3OrNull: IMLot,
        lot4OrNull: IMLot, lot5OrNull: IMLot): Promise<IMVente> {
        try {

            let c: IMVente = await this.getByXXX(dateMutation, natureMutationintf, valeurFonciere,
                nbLots, nbPieces, natureCultureSpecialeOrNullIntf,
                natureCultureOrNullIntf, surfaceTerrain, surfaceReeleBati,
                volNbOrNull, adresse, typeLocal, surfaceCarrezLots, lot1OrNull, lot2OrNull, lot3OrNull, lot4OrNull, lot5OrNull);
            if (null != c) {
                // console.log("<<CommuneRepository.createIfNotExists, there is already a commune with nom = " + nom + " code = " + code);
                return Promise.resolve<IMVente>(c);
            }
            else {

                // console.log("<<CommuneRepository.createIfNotExists, there is no commune with nom = " + nom + " code = " + code);
                // let alls: Array<IMCommune> = await this.all();
                // console.log("\t CREATION, alls = " + JSON.stringify(alls));
               


                let blips: Array<number> = await this.knex("vente")
                    .insert({
                        dateVente: dateMutation,
                        valeurFonciere: valeurFonciere,
                        nbLots: nbLots,
                        nbPieces: nbPieces,
                        surfaceTerrain: surfaceTerrain,
                        surfaceBati: surfaceReeleBati,
                        idAddresse: adresse.id,
                        idTypeLocal: typeLocal.id,
                        surfaceTotaleCarrezLots: surfaceCarrezLots,
                        idNatureMutation: natureMutationintf.id,

                        idNatureCultureSpeciale: natureCultureSpecialeOrNullIntf ? natureCultureSpecialeOrNullIntf.id : null,
                        idNatureCulture: natureCultureOrNullIntf ? natureCultureOrNullIntf.id : null,
                        noVolume: volNbOrNull,
                        idLot1: lot1OrNull ? lot1OrNull.id : null,
                        idLot2: lot2OrNull ? lot2OrNull.id : null,
                        idLot3: lot3OrNull ? lot3OrNull.id : null,
                        idLot4: lot4OrNull ? lot4OrNull.id : null,
                        idLot5: lot5OrNull ? lot5OrNull.id : null

                    })
                    .returning('id');


                if (1 != blips.length)
                    throw new Error("201909150939");



                return Promise.resolve<IMVente>({
                    id: blips[0],
                    adresse: adresse,
                    date: dateMutation,
                    natureCulture: natureCultureOrNullIntf ? natureCultureOrNullIntf.natureCulture : null,
                    natureCultureSpeciale: natureCultureSpecialeOrNullIntf ? natureCultureSpecialeOrNullIntf.natureCultureSpeciale : null,
                    natureMutation: natureMutationintf.natureMutation,
                    nbLots: nbLots,
                    nbPieces: nbPieces,
                    noVlume: volNbOrNull,

                    surfaceTerrain: surfaceTerrain,
                    surfaceBati: surfaceReeleBati,
                    valeurFonciere: valeurFonciere,
                    typeLocal: typeLocal,
                    surfaceCarrezLots: surfaceCarrezLots,
                    lot1: lot1OrNull,
                    lot2: lot2OrNull,
                    lot3: lot3OrNull,
                    lot4: lot4OrNull,
                    lot5: lot5OrNull
                });


            }
        }

        catch (err) {
            throw new Error("Erreur dans VenteRepo.createIfNotExists, err = " + err);
        }

    }

    constructor(knex: Knex) {
        this.knex = knex;
    }


}