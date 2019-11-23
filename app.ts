import * as fs from 'fs';
import * as rd from 'readline'

import { Btq } from "./Btq";
import { NatureMutation } from './NatureMutation';
import { NatureCulture } from './NatureCulture';
import { NatureCultureSpeciales } from './NatureCultureSpeciale';
import { Section } from './Section';
import { TypeVoie } from './TypeVoie';
import { DepartmentCode } from './DepartmentCode';



console.log('Hello world 201907281518');



let inFiles: Array<string> = ["C:/Users/admin/Documents/GitHub/immoDataGov/data-gouv/valeursfoncieres-2014.txt"];

let _findColumnIndex = function (tokens: Array<string>, colName): number {
    let i = 0;
    let r = -1;
    tokens.some(t => {
        if (colName == t) {
            r = i;
            return true;
        }
        i++;
        return false;
    })
    return r;

}

// VENTE 
let _dateMutations: Array<Date> = [];
let _natureMutations: Array<NatureMutation> = [];
let _valeurFoncieres: Array<number> = [];
let _nbLots: Array<number> = [];
let _nbPieces: Array<number> = [];
let _natureCulturesSpecialeOrNull: Array<NatureCultureSpeciales> = [];
let _natureCulturesOrNull: Array<NatureCulture> = [];
let _surfacesTerrain: Array<number> = [];
let _planNb: Array<number> = [];// = -1;
let _volNbOrNull: Array<number> = []; //: number = -1;
let _section: Array<Section> = []; // = -1;
let _sectionPrefixOrNull: Array<number> = []; // number = -1;


// Adresse

let _nbVoie: Array<number> = []; //: number = -1;
let _bTQOrNull: Array<Btq> = []; //number = -1;
let _typeDeVoieOrNull: Array<TypeVoie> = []; //: number = -1;
let _codeVoie: Array<string> = []; //: number = -1;
let _voie: Array<string> = []; //: number = -1;




// Code postal
let _postalCodes: Array<number> = [];

// Departement
let _departmentCodes: Array<DepartmentCode> = [];

// Commmune
let _commune: Array<string> =[]; //number = -1;
let _codeCommune: Array<string> = []; //: number = -1; = commune





let _colDepartmentCode : number = -1;
let _colPostalCode: number = -1;
let _colNatureMutation: number = -1;
let _colNatureCulture: number = -1;
let _colNatureCultureSpeciale: number = -1;
let _colValeurFonciere: number = -1;
let _colNbdeLots: number = -1;
let _colDateMutation: number = -1;
let _colNbPieces: number = -1;
let _colSurfaceTerrain: number = -1;


let _colSectionPrefix: number = -1;
let _colSection: number = -1;
let _colPlanNb: number = -1;
let _colVolNb: number = -1;
let _colCommune: number = -1;
let _colCodeCommune: number = -1;

let _colNbVoie: number = -1;
let _colBTQ: number = -1;
let _colTypeDeVoie: number = -1;
let _colCodeVoie: number = -1;
let _colVoie: number = -1;


let _nbLinesRead: number = 0;

let _stringToEnum = function<T> (arg: string, v: T[]): T {
    //console.log("keys = " + JSON.stringify(keys));
    //console.log("v = " + JSON.stringify(v));

   

    for (let i = 0; i < v.length; i++) {
        if (arg === v[i].toString())
            return v[i];
    }


    return null;


}


let _readFile = function (file: string) {
    let reader = rd.createInterface(fs.createReadStream(file));


   

    reader.on("line", (l: string) => {


       



        _nbLinesRead++;
       // console.log(_nbLinesRead); 

        //console.log(_nbLinesRead); 
        //console.log(l);
        if (0 == Number(_nbLinesRead) % 10000)
            console.log(_nbLinesRead); 
        var tokens = l.split('|');
        if (-1 == _colDepartmentCode) {
            _colDepartmentCode = _findColumnIndex(tokens, "Code departement");
            _colPostalCode = _findColumnIndex(tokens, "Code postal");
            _colNatureMutation = _findColumnIndex(tokens, "Nature mutation");
            _colNatureCulture = _findColumnIndex(tokens, "Nature culture");
            _colNatureCultureSpeciale = _findColumnIndex(tokens, "Nature culture speciale");

            _colValeurFonciere = _findColumnIndex(tokens, "Valeur fonciere");
            _colNbdeLots = _findColumnIndex(tokens, "Nombre de lots");
            _colDateMutation = _findColumnIndex(tokens, "Date mutation");
            _colNbPieces = _findColumnIndex(tokens, "Nombre pieces principales");
            _colSurfaceTerrain = _findColumnIndex(tokens, "Surface terrain");


            _colSectionPrefix = _findColumnIndex(tokens, "Prefixe de section");
            _colSection = _findColumnIndex(tokens, "Section");
            _colPlanNb = _findColumnIndex(tokens, "No plan");
            _colVolNb = _findColumnIndex(tokens, "No Volume");
            _colCommune = _findColumnIndex(tokens, "Commune");
            _colCodeCommune = _findColumnIndex(tokens, "Code commune");

            _colNbVoie = _findColumnIndex(tokens, "No voie");
            _colBTQ = _findColumnIndex(tokens, "B/T/Q");
            _colTypeDeVoie = _findColumnIndex(tokens, "Type de voie");
            _colCodeVoie = _findColumnIndex(tokens, "Code voie");
            _colVoie = _findColumnIndex(tokens, "Voie");
          


            
        }
        else {
            let departmentCode: DepartmentCode = _stringToEnum<DepartmentCode>(tokens[_colDepartmentCode], Object.keys(DepartmentCode).map(k => DepartmentCode[k]));// (tokens[_colDepartmentCode]);
            let postalCode: number = Number(tokens[_colPostalCode]);
            let natureMutation: NatureMutation = _stringToEnum<NatureMutation>(tokens[_colNatureMutation], Object.keys(NatureMutation).map(k => NatureMutation[k]));//(tokens[_colNatureMutation]);
            let natureCultureOrNull: NatureCulture = _stringToEnum<NatureCulture>(tokens[_colNatureCulture], Object.keys(NatureCulture).map(k => NatureCulture[k])); // (tokens[_colNatureCulture]);
            let natureCultureSpecialeOrNull: NatureCultureSpeciales = _stringToEnum<NatureCultureSpeciales>(tokens[_colNatureCultureSpeciale], Object.keys(NatureCultureSpeciales).map(k => NatureCultureSpeciales[k])); // (tokens[_colNatureCultureSpeciale]);
            let valeurFonciere: number = Number(tokens[_colValeurFonciere].replace(",","."));
            let nbLots: number = Number(tokens[_colNbdeLots]);
            let dateMutation: Date = new Date();
            let temp: Array<string> = tokens[_colDateMutation].split("/");
            //console.log("temp = " + temp);
            dateMutation.setFullYear(Number(temp[2].trim()));
            dateMutation.setMonth(Number(temp[1].trim()) - 1);
            dateMutation.setDate(Number(temp[0].trim()));
            let nbPieces: number = Number(tokens[_colNbPieces]);
            let surfaceTerrain: number = Number(tokens[_colSurfaceTerrain]);

            let sectionPrefix: string = (tokens[_colSectionPrefix]);
            if (null != sectionPrefix) {
                if ("" != sectionPrefix.trim()) {
                    if (-1 == _sectionPrefixOrNull.indexOf(Number(sectionPrefix)))
                        _sectionPrefixOrNull.push(Number(sectionPrefix));
                }
            }
            let section: Section = _stringToEnum<Section>(tokens[_colSection], Object.keys(Section).map(k => Section[k])); // (tokens[_colSection]);
            if (-1 == _section.indexOf(section))
                _section.push(section);

           let planNb: number = Number(tokens[_colPlanNb].replace(",", "."));

            if (0 != tokens[_colVolNb].trim().length) {
                let volNb: number = Number(tokens[_colVolNb].replace(",", "."));

                if (-1 == _volNbOrNull.indexOf(volNb))
                    _volNbOrNull.push(volNb);
            }

            let commune: string = (tokens[_colCommune]);
            if (-1 == _commune.indexOf(commune))
                _commune.push(commune);
            let codeCommune: string = tokens[_colCodeCommune];

            let nbVoie: number = Number(tokens[_colNbVoie].replace(",", "."));
            let bTQ: Btq = _stringToEnum<Btq>(tokens[_colBTQ], Object.keys(Btq).map(k => Btq[k])); // (tokens[_colBTQ]);
            if (null != bTQ) {
                if ((0 != bTQ.trim().length) && (-1 == _bTQOrNull.indexOf(bTQ)))
                    _bTQOrNull.push(bTQ);
            }
            let typeDeVoie: TypeVoie = _stringToEnum<TypeVoie>(tokens[_colTypeDeVoie], Object.keys(TypeVoie).map(k => TypeVoie[k])); //  (tokens[_colTypeDeVoie]);
            if (null != typeDeVoie) {
                if ((0 < typeDeVoie.trim().length) && (-1 == _typeDeVoieOrNull.indexOf(typeDeVoie)))
                    _typeDeVoieOrNull.push(typeDeVoie);
            }
            let codeVoie: string = (tokens[_colCodeVoie]);
            if (-1 == _codeVoie.indexOf(codeVoie))
                _codeVoie.push(codeVoie);

            let voie: string = (tokens[_colVoie]);
            if (-1 == _voie.indexOf(voie))
                _voie.push(voie);

            if (isNaN(planNb)) {
                console.log("Problem with line " + _nbLinesRead + " = " + l
                    + ", planNb = " + tokens[_colPlanNb]);
                throw new Error("qdsqdf");
            }
           
           
            if (isNaN(nbVoie)) {
                console.log("Problem with line " + _nbLinesRead + " = " + l
                    + ", nbVoie = " + tokens[_colNbVoie]);
                throw new Error("qdsqdf");
            }
           
            
            // console.log("department = " + departmentCode + ", colPostalCode = " + postalCode);
            if (isNaN(postalCode)) {
                console.log("Problem with line " + _nbLinesRead + " = " + l
                    + ", departmentCode = " + departmentCode + ", postalCode = " + postalCode +
                    "colDepartmentCode = " + _colDepartmentCode + ", colPostalCode = " + _colPostalCode);
                throw new Error("qdsqdf");
            }

            if (isNaN(valeurFonciere)) {
                console.log("Problem with line " + _nbLinesRead + " = " + l
                    + ", valeurFonciere = " + tokens[_colValeurFonciere]);
                throw new Error("qdsqdf");

            }

            if (isNaN(nbLots)) {
                console.log("Problem with line " + _nbLinesRead + " = " + l
                    + ", nb lots = " + tokens[_colNbdeLots]);
            }


            if (isNaN(surfaceTerrain)) {
                console.log("Problem with line " + _nbLinesRead + " = " + l
                    + ", surface terrain = " + tokens[_colSurfaceTerrain]);
            }

            

            if (isNaN(nbPieces)) {
                console.log("Problem with line " + _nbLinesRead + " = " + l
                    + ", nb pieces = " + tokens[_colNbPieces]);
            }

            


            
            
            if (null != departmentCode) {
                if (0 == departmentCode.trim().length) {
                    console.log("Problem with line " + _nbLinesRead + " = " + l
                        + ", departmentCode = " + departmentCode + ", postalCode = " + postalCode +
                        "colDepartmentCode = " + _colDepartmentCode + ", colPostalCode = " + _colPostalCode);
                }
            }

            if (null != natureMutation) {
                if (0 == natureMutation.trim().length) {
                    console.log("Problem with line " + _nbLinesRead + " = " + l
                        + ", natureMutation is empty");
                }
            }

           

            


            

            if (-1 == _postalCodes.indexOf(postalCode))
                _postalCodes.push(postalCode);
            if (-1 == _departmentCodes.indexOf(departmentCode))
                _departmentCodes.push(departmentCode);
            if (-1 == _natureMutations.indexOf(natureMutation))
                _natureMutations.push(natureMutation);

            if (null != natureCultureOrNull) {
                if (0 != natureCultureOrNull.trim().length) {
                    if (-1 == _natureCulturesOrNull.indexOf(natureCultureOrNull))
                        _natureCulturesOrNull.push(natureCultureOrNull);
                }
            }

            if (null != natureCultureSpecialeOrNull) {
                if (0 != natureCultureSpecialeOrNull.trim().length) {
                    if (-1 == _natureCulturesSpecialeOrNull.indexOf(natureCultureSpecialeOrNull))
                        _natureCulturesSpecialeOrNull.push(natureCultureSpecialeOrNull);
                }
            }

            if (-1 == _valeurFoncieres.indexOf(valeurFonciere))
                _valeurFoncieres.push(valeurFonciere);

            if (-1 == _nbLots.indexOf(nbLots))
                _nbLots.push(nbLots);
            if (-1 == _dateMutations.indexOf(dateMutation))
                _dateMutations.push(dateMutation);

            if (-1 == _nbPieces.indexOf(nbPieces))
                _nbPieces.push(nbPieces);

            if (-1 == _surfacesTerrain.indexOf(surfaceTerrain))
                _surfacesTerrain.push(surfaceTerrain);

            if (-1 == _codeCommune.indexOf(codeCommune))
                _codeCommune.push(codeCommune);

            
            


        }

    })

    reader.on("close", () => {
        console.log(`Data has been read nbLinesRead=${_nbLinesRead}`);

        _postalCodes.sort((a, b) => {
            return (a - b);
        });
        _departmentCodes.sort();
        _valeurFoncieres.sort((a, b) => {
            return (a - b);
        });
        _nbLots.sort((a, b) => {
            return (a - b);
        });
        _dateMutations.sort((a, b) => {
            return (a.getUTCDate() - b.getUTCDate());
        });
        _nbPieces.sort((a, b) => {
            return (a - b);
        });
        _surfacesTerrain.sort((a, b) => {
            return (a - b);
        });

        
        

        

        
        


        console.log("There are " + _postalCodes.length + " postal codes & " + _departmentCodes.length + " department codes");
        console.log("_departmentCodes = " + JSON.stringify(_departmentCodes));

        console.log("There are " + _natureMutations.length + " nature mutations");
        console.log("_natureMutations = " + JSON.stringify(_natureMutations));

        console.log("There are " + _natureCulturesOrNull.length + " nature cultures");
        console.log("_natureCultures = " + JSON.stringify(_natureCulturesOrNull));

        console.log("There are " + _natureCulturesSpecialeOrNull.length + " nature cultures speciale");
        console.log("_natureCultures = " + JSON.stringify(_natureCulturesSpecialeOrNull));


        console.log("There are " + _valeurFoncieres.length + " valeur foncieres from : "+ _valeurFoncieres[0] + " to " + _valeurFoncieres[_valeurFoncieres.length-1]);

        console.log("There are " + _nbLots.length + " nb lots from : " + _nbLots[0] + " to " + _nbLots[_nbLots.length - 1]);

        console.log("There are " + _dateMutations.length + " date mutation from : " + _dateMutations[0] + " to " + _dateMutations[_dateMutations.length - 1]);

        console.log("There are " + _nbPieces.length + " nb pieces from : " + _nbPieces[0] + " to " + _nbPieces[_nbPieces.length - 1]);

        console.log("There are " + _surfacesTerrain.length + " surfaces terrain from : " + _surfacesTerrain[0] + " to " + _surfacesTerrain[_surfacesTerrain.length - 1]);


        console.log("There are " + _sectionPrefixOrNull.length + " section prefix");
        if (_sectionPrefixOrNull.length < 1000)
            console.log("xxx = " + JSON.stringify(_sectionPrefixOrNull));
        else {
            for (let i = 0; i < 20; i++)
                console.log("_sectionPrefix[i] = " + _sectionPrefixOrNull[i]);
        }

        console.log("There are " + _section.length + "ff");
        if (_section.length < 1000)
            console.log("_section = " + JSON.stringify(_section));
        else {
            for (let i = 0; i < 20; i++)
                console.log("_section[i] = " + _section[i]);
        }

        console.log("There are " + _commune.length + " _commune");
        if (_commune.length < 1000)
            console.log("_commune = " + JSON.stringify(_commune));
        else {
            for (let i = 0; i < 20; i++)
                console.log("_commune[i] = " + _commune[i]);
        }

        console.log("There are " + _bTQOrNull.length + " _bTQ");
        console.log("_bTQ = " + JSON.stringify(_bTQOrNull));

        console.log("There are " + _typeDeVoieOrNull.length + " _typeDeVoie");
        if (_typeDeVoieOrNull.length < 1000)
            console.log("_typeDeVoie = " + JSON.stringify(_typeDeVoieOrNull));
        else {
            for (let i = 0; i < 20; i++)
                console.log("_typeDeVoie[i] = " + _typeDeVoieOrNull[i]);
        }

        console.log("There are " + _voie.length + " _voie");
        if (_voie.length < 1000)
            console.log("_voie = " + JSON.stringify(_voie));
        else {
            for (let i = 0; i < 20; i++)
                console.log("_voie[i] = " + _voie[i]);
        }

        console.log("There are " + _volNbOrNull.length + " _volNb");
        if (_volNbOrNull.length < 1000)
            console.log("_volNb = " + JSON.stringify(_volNbOrNull));
        else {
            for (let i = 0; i < 20; i++)
                console.log("_volNb[i] = " + _volNbOrNull[i]);
        }

        console.log("There are " + _codeCommune.length + " _codeCommune");
        if (_codeCommune.length < 1000)
            console.log("_codeCommune = " + JSON.stringify(_codeCommune));
        else {
            for (let i = 0; i < 20; i++)
                console.log("_codeCommune[i] = " + _codeCommune[i]);
        }

        console.log("There are " + _codeVoie.length + " _codeVoie");
        if (_codeVoie.length < 1000)
            console.log("_codeVoie = " + JSON.stringify(_codeVoie));
        else {
            for (let i = 0; i < 20; i++)
                console.log("_codeVoie[i] = " + _codeVoie[i]);
        }

     
        
        console.log("_nbLinesRead= " + _nbLinesRead);
    })


}

_readFile(inFiles[0]);
