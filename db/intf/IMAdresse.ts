import { Btq } from "../../Btq";
import { TypeVoie } from "../../TypeVoie";
import { IMCodePostal } from "./IMCodePostal";
import { IMReferenceCadastrale } from "./IMReferenceCadastrale";

export interface IMAdresse {
    id: number;
    nb: number;
    btqOrNull: Btq;
    typeVoie: TypeVoie;
    codeVoie: string;
    voie: string;
    cp: IMCodePostal;
    refCadastre: IMReferenceCadastrale;
    longitude: number;
    latitude: number;
}