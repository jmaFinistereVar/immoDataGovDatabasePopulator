import { IMCommune } from "./IMCommune";
import { IMDepartement } from "./IMDepartement";

export interface IMCodePostal {
    id: number;
    codePostal: number;
    commune: IMCommune;
    departement: IMDepartement;
}