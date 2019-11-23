import { Btq } from "../../Btq";
import { TypeVoie } from "../../TypeVoie";

import { NatureMutation } from "../../NatureMutation";
import { NatureCultureSpeciales } from "../../NatureCultureSpeciale";
import { NatureCulture } from "../../NatureCulture";
import { Section } from "../../Section";
import { IMAdresse } from "./IMAdresse";
import { IMTypeLocal } from "./IMTypeLocal";
import { IMLot } from "./IMLot";

export interface IMVente {
    id: number;
    date: Date;
    natureMutation: NatureMutation;
    valeurFonciere: number;
    nbLots: number;
    nbPieces: number;
    natureCultureSpeciale: NatureCultureSpeciales;
    natureCulture: NatureCulture;
    surfaceTerrain: number;
    surfaceBati: number;

    noVlume: number;
  
    adresse: IMAdresse;
    typeLocal: IMTypeLocal;

    surfaceCarrezLots: number;
    lot1: IMLot;
    lot2: IMLot;
    lot3: IMLot;
    lot4: IMLot;
    lot5: IMLot;

}