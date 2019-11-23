import * as fs from 'fs';
import * as rd from 'readline'

import { Btq } from "./Btq";
import { NatureMutation } from './NatureMutation';
import { NatureCulture } from './NatureCulture';
import { NatureCultureSpeciales } from './NatureCultureSpeciale';
import { Section } from './Section';
import { TypeVoie } from './TypeVoie';
import { DepartmentCode } from './DepartmentCode';

let fdBtq = fs.openSync("C:/Users/admin/Documents/GitHub/immoDataGov/step01Enums.txt", "w");


let str2Write = "INSERT INTO  btq (valeur, legende) VALUES \n";

Object.keys(Btq).forEach((k, index) => {
    str2Write += " ('" + k + "', '" + Btq[k] + "')";
    if (index < Object.keys(Btq).length - 1)
        str2Write += ", \n";
    else
        str2Write += "; \n";
})

str2Write += "\n INSERT INTO  departement (nom, code) VALUES \n";
Object.keys(DepartmentCode).forEach((k, index) => {
    str2Write += " ('" + k + "', '" + DepartmentCode[k] + "')"; //, \n";
    if (index < Object.keys(DepartmentCode).length - 1)
        str2Write += ", \n";
    else
        str2Write += "; \n";
})

str2Write += "\n INSERT INTO  natureCultureSpeciale (legende, valeur) VALUES \n";
Object.keys(NatureCultureSpeciales).forEach((k, index) => {
    str2Write += " ('" + k + "', '" + NatureCultureSpeciales[k] + "')"; //, \n";
    if (index < Object.keys(NatureCultureSpeciales).length - 1)
        str2Write += ", \n";
    else
        str2Write += "; \n";
})


str2Write += "\n INSERT INTO  natureCulture (legende, valeur) VALUES \n";
Object.keys(NatureCulture).forEach((k, index) => {
    str2Write += " ('" + k + "', '" + NatureCulture[k] + "')"; //, \n";
    if (index < Object.keys(NatureCulture).length - 1)
        str2Write += ", \n";
    else
        str2Write += "; \n";
})


str2Write += "\n INSERT INTO  natureMutation (legende, valeur) VALUES \n";
Object.keys(NatureMutation).forEach((k, index) => {
    str2Write += " ('" + k + "', '" + NatureMutation[k] + "')"; //, \n";
    if (index < Object.keys(NatureMutation).length - 1)
        str2Write += ", \n";
    else
        str2Write += "; \n";
})


str2Write += "\n INSERT INTO  section (legende, valeur) VALUES \n";
Object.keys(Section).forEach((k, index) => {
    str2Write += " ('" + k + "', '" + Section[k] + "')"; //, \n";
    if (index < Object.keys(Section).length - 1)
        str2Write += ", \n";
    else
        str2Write += "; \n";
})


str2Write += "\n INSERT INTO  typeVoie (legende, valeur) VALUES \n";
Object.keys(TypeVoie).forEach((k, index) => {
    str2Write += " ('" + k + "', '" + TypeVoie[k] + "')"; //, \n";
    if (index < Object.keys(TypeVoie).length - 1)
        str2Write += ", \n";
    else
        str2Write += "; \n";
})


fs.writeFileSync(fdBtq, str2Write);

fs.closeSync(fdBtq);
