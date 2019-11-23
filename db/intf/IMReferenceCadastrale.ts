import { Btq } from "../../Btq";
import { TypeVoie } from "../../TypeVoie";
import { IMCodePostal } from "./IMCodePostal";
import { IMDepartement } from "./IMDepartement";
import { Section } from "../../Section";

export interface IMReferenceCadastrale {
    id: number;
    departement: IMDepartement;
    codeCommune: number;
    section: Section;
    noPlan: number;
}