import * as fs from 'fs';
import * as rd from 'readline';

import LineByLineReader = require('line-by-line');




import { Btq } from "./Btq";
import { NatureMutation } from './NatureMutation';
import { NatureCulture } from './NatureCulture';
import { NatureCultureSpeciales } from './NatureCultureSpeciale';
import { Section } from './Section';
import { TypeVoie } from './TypeVoie';
import { DepartmentCode } from './DepartmentCode';
import { Utils } from './Utils/Utils';
import { Pool } from './db/conn/Pool';
import { IMDepartement } from './db/intf/IMDepartement';

import { IMCommune } from './db/intf/IMCommune';
import { IMCodePostal } from './db/intf/IMCodePostal';
import { IMAdresse } from './db/intf/IMAdresse';
import { IMNatureCultureSpeciale } from './db/intf/IMNatureCultureSpeciale';
import { IMNatureCulture } from './db/intf/IMNatureCulture';
import { IMSection } from './db/intf/IMSection';
import { IMNatureMutation } from './db/intf/IMNatureMutation';
import { IMVente } from './db/intf/IMVente';
import { IMBtq } from './db/intf/IMBtq';
import { IMTypeDeVoie } from './db/intf/IMTypeDeVoie';
import { IMReferenceCadastrale } from './db/intf/IMReferenceCadastrale';
import { CodeTypeLocal } from './CodeTypeLocal';
import { IMTypeLocal } from './db/intf/IMTypeLocal';
import { IMLot } from './db/intf/IMLot';
import { CommuneRepository } from './db/repo/CommuneRepository';
import { CodePostalRepository } from './db/repo/CodePostalRepository';
import { DepartementRepository } from './db/repo/DepartementRepository';
import { NatureCultureRepository } from './db/repo/NatureCultureRepository';
import { BtqRepository } from './db/repo/BtqRepository';
import { TypeDeVoieRepository } from './db/repo/TypeDeVoieRepository';
import { NatureMutationRepository } from './db/repo/NatureMutationRepository';
import { NatureCultureSpecialeRepository } from './db/repo/NatureCultureSpecialeRepository';
import { SectionRepository } from './db/repo/SectionRepository';
import { AdresseRepository } from './db/repo/AdresseRepository';
import { VenteRepository } from './db/repo/VenteRepository';
import { ReferenceCadastraleRepository } from './db/repo/ReferenceCadastraleRepository';
import { TypeLocalRepository } from './db/repo/TypeLocalRepository';
import { LotRepository } from './db/repo/LotRepository';




console.log('Hello world 201911170944');



let _stringToEnum = function <T>(arg: string, v: T[]): T {
    //console.log("keys = " + JSON.stringify(keys));
    //console.log("v = " + JSON.stringify(v));

    for (let i = 0; i < v.length; i++) {
        if (arg === v[i].toString())
            return v[i];
    }

    return null;
}


let inFiles: Array<string> = ["C:/Users/admin/Documents/GitHub/immoDataGov/data-gouv/valeursfoncieres-2014.txt",
    "C:/Users/admin/Documents/GitHub/immoDataGov/data-gouv/valeursfoncieres-2015.txt",
    "C:/Users/admin/Documents/GitHub/immoDataGov/data-gouv/valeursfoncieres-2016.txt",
    "C:/Users/admin/Documents/GitHub/immoDataGov/data-gouv/valeursfoncieres-2017.txt",
    "C:/Users/admin/Documents/GitHub/immoDataGov/data-gouv/valeursfoncieres-2018.txt"];

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

let _nbLignesTotal = 0;
let _nbLignesLuesDepuisLeDebut = 0;


let _colBTQ: number = -1;
let _colTypeDeVoie: number = -1;
let _colCommune: number = -1;
let _colCodeCommune: number = -1;
let _coldCodePostal: number = -1;
let _colCodeDepartement: number = -1;
let _colNatureMutation: number = -1;
let _colNatureCulture: number = -1;
let _colSection: number = -1;
let _colNatureCultureSpeciale: number = -1;
let _colNumeroVoie: number = -1;
let _colVoie: number = -1;
let _colCodeVoie: number = -1;
let _colDateMutation: number = -1;
let _colValeurFonciere: number = -1;
let _colNbdeLots: number = -1;
let _colNbPieces: number = -1;
let _colSurfaceTerrain: number = -1;
let _colNumeroPlan: number = -1;
let _colNumeroVolume: number = -1;
let _colPrefixeSection: number = -1;
let _colCodeTypeLocal: number = -1;
let _colSurfaceReeleBati: number = -1;
let _colSurfaceCarrezLot1: number = -1;
let _colSurfaceCarrezLot2: number = -1;
let _colSurfaceCarrezLot3: number = -1;
let _colSurfaceCarrezLot4: number = -1;
let _colSurfaceCarrezLot5: number = -1;
let _codeTantiemeLot1: number = -1;
let _codeTantiemeLot2: number = -1;
let _codeTantiemeLot3: number = -1;
let _codeTantiemeLot4: number = -1;
let _codeTantiemeLot5: number = -1;
let _colTypeLocal: number = -1;


const repoCommunes: CommuneRepository = new CommuneRepository(Pool.getDb());
const repoDepartements: DepartementRepository = new DepartementRepository(Pool.getDb());
const repoCodePostals: CodePostalRepository = new CodePostalRepository(Pool.getDb());
const repoNatureCulture: NatureCultureRepository = new NatureCultureRepository(Pool.getDb());
const repoBtq: BtqRepository = new BtqRepository(Pool.getDb());
const repoTypeDeVoie: TypeDeVoieRepository = new TypeDeVoieRepository(Pool.getDb());
const repoNatureMutation: NatureMutationRepository = new NatureMutationRepository(Pool.getDb());
const repoNatureCultureSpeciale: NatureCultureSpecialeRepository = new NatureCultureSpecialeRepository(Pool.getDb());
const repoSection: SectionRepository = new SectionRepository(Pool.getDb());
const repoAdresse: AdresseRepository = new AdresseRepository(Pool.getDb());
const repoVente: VenteRepository = new VenteRepository(Pool.getDb());
const repoReferenceCadastrale: ReferenceCadastraleRepository = new ReferenceCadastraleRepository(Pool.getDb());
const repoTypeLocal: TypeLocalRepository = new TypeLocalRepository(Pool.getDb());
const repoLot: LotRepository = new LotRepository(Pool.getDb());



let _nbLignesLuesDansLeFichier: number = 0;



const numberToCodeTypeLocal = (nb: number, typeLocal: string): CodeTypeLocal => {
    if (1 === nb) {
        if ("Maison" != typeLocal)
            throw new Error("What is this strange type local, maison attendu " + typeLocal);
        return CodeTypeLocal.MAISON;
    }
    if (2 === nb) {
        if ("Appartement" != typeLocal)
            throw new Error("What is this strange type local, maison attendu " + typeLocal);
        return CodeTypeLocal.APPARTEMENT;
    }
    if (3 === nb) {
        if ("Dépendance" != typeLocal)
            throw new Error("What is this strange type local, maison attendu " + typeLocal);
        return CodeTypeLocal.DEPENDANCE;
    }
    if (4 === nb) {
        if ("Local industriel. commercial ou assimilé" != typeLocal)
            throw new Error("What is this strange type local, maison attendu " + typeLocal);
        return CodeTypeLocal.LOCAL_INDUSTRIEL;
    }

    if (0 === nb) {
        return CodeTypeLocal.NON_RENSEIGNE;
    }

    throw new Error("Pas de code type local");
}

let _creerLot = async function (_colSurfaceCarrezLot1: number, _codeTantiemeLot1: number, tokens): Promise<IMLot> {
    let surfaceCarrezLot1: number = null;
    if (0 != tokens[_colSurfaceCarrezLot1].trim().length) {
        surfaceCarrezLot1 = Number(tokens[_colSurfaceCarrezLot1].replace(",", "."));
        if (isNaN(surfaceCarrezLot1))
            surfaceCarrezLot1 = null;
    }
    let tantiemeLot1: number = null;
    if (0 != tokens[_codeTantiemeLot1].trim().length) {
        tantiemeLot1 = Number(tokens[_codeTantiemeLot1].replace(",", "."));
        if (isNaN(tantiemeLot1))
            tantiemeLot1 = null;
    }

    let lot1: IMLot = null;
    if ((null != surfaceCarrezLot1) || (null != tantiemeLot1)) {
        lot1 = await repoLot.createIfNotExists(surfaceCarrezLot1, tantiemeLot1);
    }

    return lot1;
}

const _calculerLesIndicesColonne = (tokens: Array<string>) => {
    _colCommune = _findColumnIndex(tokens, "Commune");
    _colCodeCommune = _findColumnIndex(tokens, "Code commune");
    _colCodeDepartement = _findColumnIndex(tokens, "Code departement");
    _coldCodePostal = _findColumnIndex(tokens, "Code postal");
    _colNatureMutation = _findColumnIndex(tokens, "Nature mutation");
    _colNatureCultureSpeciale = _findColumnIndex(tokens, "Nature culture speciale");
    _colBTQ = _findColumnIndex(tokens, "B/T/Q");
    _colTypeDeVoie = _findColumnIndex(tokens, "Type de voie");
    _colNatureCulture = _findColumnIndex(tokens, "Nature culture");
    _colSection = _findColumnIndex(tokens, "Section");
    _colNumeroVoie = _findColumnIndex(tokens, "No voie");
    _colVoie = _findColumnIndex(tokens, "Voie");
    _colCodeVoie = _findColumnIndex(tokens, "Code voie");
    _colDateMutation = _findColumnIndex(tokens, "Date mutation");
    _colValeurFonciere = _findColumnIndex(tokens, "Valeur fonciere");
    _colNbPieces = _findColumnIndex(tokens, "Nombre pieces principales");
    _colNumeroPlan = _findColumnIndex(tokens, "No plan");
    _colNumeroVolume = _findColumnIndex(tokens, "No Volume");
    _colPrefixeSection = _findColumnIndex(tokens, "Prefixe de section");
    _colSurfaceTerrain = _findColumnIndex(tokens, "Surface terrain");
    _colSurfaceReeleBati = _findColumnIndex(tokens, "Surface reelle bati");
    _colNbdeLots = _findColumnIndex(tokens, "Nombre de lots");
    _colSurfaceCarrezLot1 = _findColumnIndex(tokens, "Surface Carrez du 1er lot");
    _colSurfaceCarrezLot2 = _findColumnIndex(tokens, "Surface Carrez du 2eme lot");
    _colSurfaceCarrezLot3 = _findColumnIndex(tokens, "Surface Carrez du 3eme lot");
    _colSurfaceCarrezLot4 = _findColumnIndex(tokens, "Surface Carrez du 4eme lot");
    _colSurfaceCarrezLot5 = _findColumnIndex(tokens, "Surface Carrez du 5eme lot");
    _codeTantiemeLot1 = _findColumnIndex(tokens, "1er lot");
    _codeTantiemeLot2 = _findColumnIndex(tokens, "2eme lot");
    _codeTantiemeLot3 = _findColumnIndex(tokens, "3eme lot");
    _codeTantiemeLot4 = _findColumnIndex(tokens, "4eme lot");
    _codeTantiemeLot5 = _findColumnIndex(tokens, "5eme lot");
    _colCodeTypeLocal = _findColumnIndex(tokens, "Code type local");
    _colTypeLocal = _findColumnIndex(tokens, "Type local");
}


let _lireLigneEtPopulerDB = async (aLine: string) => {
    _nbLignesLuesDansLeFichier++;
    // console.log(_nbLinesRead); 

    //console.log(_nbLinesRead); 
    //console.log(l);
    if (0 == Number(_nbLignesLuesDansLeFichier) % 100)
        console.log(_nbLignesLuesDansLeFichier);
    var tokens = aLine.split('|');
    if ((-1 == _colCommune) || (1 === _nbLignesLuesDansLeFichier)) {
            _calculerLesIndicesColonne(tokens);
    }
    else {
        let codeCommune: number = Number(tokens[_colCodeCommune]);
        let codePostalNumber: number = Number(tokens[_coldCodePostal]);

        try {
            let codeTypeLocal: CodeTypeLocal = numberToCodeTypeLocal(Number(tokens[_colCodeTypeLocal]),
                tokens[_colTypeLocal]);
            let typeLocal: IMTypeLocal = await repoTypeLocal.createifNotExists(codeTypeLocal);

            let bTQ: Btq = _stringToEnum<Btq>(tokens[_colBTQ], Object.keys(Btq).map(k => Btq[k])); // (tokens[_colBTQ]);
            let bTqInf: IMBtq = null;
            if (null != bTQ) {
                bTqInf = await repoBtq.createifNotExists(bTQ);
            }

            let natuceCultureSpecial_enum: NatureCultureSpeciales = _stringToEnum<NatureCultureSpeciales>(tokens[_colNatureCultureSpeciale], Object.keys(NatureCultureSpeciales).map(k => NatureCultureSpeciales[k])); // (tokens[_colNatureCultureSpeciale]);
            let natureCultureSpeciale: IMNatureCultureSpeciale = null;
            if (null != natuceCultureSpecial_enum)
                natureCultureSpeciale = await repoNatureCultureSpeciale.createifNotExists(natuceCultureSpecial_enum);

            let section_enum: Section = _stringToEnum<Section>(tokens[_colSection], Object.keys(Section).map(k => Section[k])); // (tokens[_colSection]);
            let section: IMSection = await repoSection.createifNotExists(section_enum);

            let natureMutation_enum: NatureMutation = _stringToEnum<NatureMutation>(tokens[_colNatureMutation], Object.keys(NatureMutation).map(k => NatureMutation[k]));//(tokens[_colNatureMutation]);
            let natureMutation: IMNatureMutation = await repoNatureMutation.createifNotExists(natureMutation_enum);

            let natureCulture_enum: NatureCulture = _stringToEnum<NatureCulture>(tokens[_colNatureCulture], Object.keys(NatureCulture).map(k => NatureCulture[k])); // (tokens[_colNatureCulture]);
            let natureCulture: IMNatureCulture = null;

            if (null != natureCulture_enum)
                natureCulture = await repoNatureCulture.createifNotExists(natureCulture_enum);

            let typeDeVoie_enum: TypeVoie = _stringToEnum<TypeVoie>(tokens[_colTypeDeVoie], Object.keys(TypeVoie).map(k => TypeVoie[k])); //  (tokens[_colTypeDeVoie]);
            let typeDeVoie: IMTypeDeVoie = null;
            if (null != typeDeVoie_enum) {
                typeDeVoie = await repoTypeDeVoie.createifNotExists(typeDeVoie_enum);
            }

            let communeString: string = (tokens[_colCommune]).replace("'", "''");

            let commune: IMCommune = null;
            if ("" !== communeString.trim()) {
                commune = await repoCommunes.createIfNotExists(communeString);
            }

            let codeDepartement_enum: DepartmentCode = _stringToEnum<DepartmentCode>(tokens[_colCodeDepartement], Object.keys(DepartmentCode).map(k => DepartmentCode[k])); //  (tokens[_colTypeDeVoie]);
            let departement: IMDepartement = await repoDepartements.createifNotExists(codeDepartement_enum);

            if (null == departement)
                throw new Error("Impossible to find departement " + departement);
            let codePostal: IMCodePostal = await repoCodePostals.createifNotExists(codePostalNumber, departement, commune);

            let numeroVoie: number = Number(tokens[_colNumeroVoie].replace(",", "."));
            let voie: string = (tokens[_colVoie]);
            let codeVoie: string = (tokens[_colCodeVoie]);
            let codeDepartement: string = (tokens[_colCodeDepartement]);

            let prefixSectionOuNull: string = (tokens[_colPrefixeSection]);
            let numeroPlan: number = Number(tokens[_colNumeroPlan].replace(",", "."));


            let refCadastrale: IMReferenceCadastrale = await repoReferenceCadastrale.createIfNotExists(departement,
                codeCommune, prefixSectionOuNull,
                section, numeroPlan);

            let adresse: IMAdresse = await repoAdresse.createIfNotExists(numeroVoie, bTqInf, typeDeVoie,
                codeVoie, voie, codePostal, refCadastrale);

            let temp: Array<string> = tokens[_colDateMutation].split("/");
            //console.log("temp = " + temp);
            let dateMutation = new Date();
            dateMutation.setFullYear(Number(temp[2].trim()));
            dateMutation.setMonth(Number(temp[1].trim()) - 1);
            dateMutation.setDate(Number(temp[0].trim()));

            let valeurFonciere: number = Number(tokens[_colValeurFonciere].replace(",", "."));
            let nbDeLots: number = Number(tokens[_colNbdeLots]);
            let nbPieces: number = Number(tokens[_colNbPieces]);
            let surfaceTerrain: number = Number(tokens[_colSurfaceTerrain]);
            let volNbOrNull: number = null;
            if (0 != tokens[_colNumeroVolume].trim().length) {
                volNbOrNull = Number(tokens[_colNumeroVolume].replace(",", "."));
            }

            let surfaceReeleBati: number = Number(tokens[_colSurfaceReeleBati].replace(",", "."));

            let lot1: IMLot = await _creerLot(_colSurfaceCarrezLot1, _codeTantiemeLot1, tokens);
            let lot2: IMLot = await _creerLot(_colSurfaceCarrezLot2, _codeTantiemeLot2, tokens);
            let lot3: IMLot = await _creerLot(_colSurfaceCarrezLot3, _codeTantiemeLot3, tokens);
            let lot4: IMLot = await _creerLot(_colSurfaceCarrezLot4, _codeTantiemeLot4, tokens);
            let lot5: IMLot = await _creerLot(_colSurfaceCarrezLot5, _codeTantiemeLot5, tokens);

            let surfaceTotaleCarrezLots: number = 0;
            surfaceTotaleCarrezLots = surfaceTotaleCarrezLots + (null != lot1 ? lot1.surfaceCarrez : 0);
            surfaceTotaleCarrezLots = surfaceTotaleCarrezLots + (null != lot2 ? lot2.surfaceCarrez : 0);
            surfaceTotaleCarrezLots = surfaceTotaleCarrezLots + (null != lot3 ? lot3.surfaceCarrez : 0);
            surfaceTotaleCarrezLots = surfaceTotaleCarrezLots + (null != lot4 ? lot4.surfaceCarrez : 0);
            surfaceTotaleCarrezLots = surfaceTotaleCarrezLots + (null != lot5 ? lot5.surfaceCarrez : 0);

            let vente: IMVente = await repoVente.createIfNotExists(dateMutation, natureMutation, valeurFonciere,
                nbDeLots, nbPieces, natureCultureSpeciale, natureCulture, surfaceTerrain, surfaceReeleBati,
                volNbOrNull, adresse, typeLocal, surfaceTotaleCarrezLots, lot1, lot2, lot3, lot4, lot5);
        }

        catch (err) {
            console.log("Error received : err = " + JSON.stringify(err) + ", " + err);
            console.log("Error at line: " + aLine);
            throw new Error(err);
            //reader.close();
        }

    }
}


let _readerClose = async (reader: LineByLineReader, bCompterLesLignesUniquement: boolean) => {

    _nbLignesLuesDansLeFichier = 0;

    reader.on("line", async (l: string) => {
        try {
            reader.pause();
            if (bCompterLesLignesUniquement) {
                _nbLignesTotal++;
            }
            else {
                _nbLignesLuesDepuisLeDebut++;
                if (0 === _nbLignesLuesDepuisLeDebut % 1000) {
                    console.log("Avancement = " + 100*_nbLignesLuesDepuisLeDebut/_nbLignesTotal + "%");
                }
                await _lireLigneEtPopulerDB(l);
            }
            reader.resume();
        }

        catch (err) {
            throw new Error(err);
            //reader.close();
        }

    })

    return new Promise<void>((resolve, reject) => {

        reader.on("end", () => {
            console.log(`Data has been read nbLinesRead=${_nbLignesLuesDansLeFichier}`);

            console.log("_nbLinesRead= " + _nbLignesLuesDansLeFichier);

            // return Promise.resolve<void>(null);

            resolve(null);
        })
    })
}



async function _readFile(file: string, isFirstFile: boolean, isLastFile: boolean, bCompterLesLignesUniquement): Promise<void> {
    console.log("<<_readFile file = " + file);

    let lineByLineReader = new LineByLineReader(file);

    try {
        await _readerClose(lineByLineReader, bCompterLesLignesUniquement);
    }

    catch (err) {
        throw new Error(err);
    }
}



async function _launchReadFile(file: string, isFirstFile: boolean, isLastFile: boolean, bCompterLesLignesUniquement: boolean) {
    try {
        await _readFile(file, isFirstFile, isLastFile, bCompterLesLignesUniquement);
    }

    catch (err) {
        throw new Error(err);
    }
}

async function readFileAll() {
    try {
        _nbLignesTotal = 0;
        for (let i = 0; i < inFiles.length; i++) {
            await _launchReadFile(inFiles[i], 0 === i, i === inFiles.length - 1, true);
        }
        console.log("Nombre total de lignes = " + _nbLignesTotal);
        _nbLignesLuesDepuisLeDebut = 0;
        for (let i = 0; i < inFiles.length; i++) {
            await _launchReadFile(inFiles[i], 0 === i, i === inFiles.length - 1, false);
        }
    }

    catch (err) {
        console.log("STOP ON ERROR " + err);
    }
}

readFileAll();
