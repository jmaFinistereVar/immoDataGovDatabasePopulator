

DROP TABLE IF EXISTS  vente;

DROP TABLE IF EXISTS  addresse;

DROP TABLE IF EXISTS  "codePostal";
DROP TABLE IF EXISTS  commune;
DROP TABLE IF EXISTS  "referenceCadastrale";
DROP TABLE IF EXISTS lot;

DROP TABLE IF EXISTS  departement;


DROP TABLE IF EXISTS  "natureCulture";
DROP TABLE IF EXISTS  btq;
DROP TABLE IF EXISTS  "natureCultureSpeciale";
DROP TABLE IF EXISTS  "natureMutation";
DROP TABLE IF EXISTS  section;
DROP TABLE IF EXISTS  "typeVoie";
DROP TABLE IF EXISTS  "typeLocal";



CREATE TABLE commune
(
	id serial PRIMARY KEY,
	nom VARCHAR (255) NOT NULL -- |Commune|| 
	 
);

CREATE TABLE departement
(
	id serial PRIMARY KEY,
	code VARCHAR (2) NOT NULL, -- |Code departement||
	nom VARCHAR (50) NOT NULL

);

CREATE TABLE "typeLocal"
(
	id SERIAL PRIMARY KEY,
	"typeLocal" VARCHAR (50) NOT NULL

);


CREATE TABLE "codePostal"
(
	id serial PRIMARY KEY,
	"codePostal" integer NOT NULL, -- |Code postal||
		      "idDepartement" INTEGER,
	      "idCommune" INTEGER,

	   FOREIGN KEY ("idDepartement") REFERENCES departement(id) ON DELETE RESTRICT,
	   	   FOREIGN KEY ("idCommune") REFERENCES commune(id) ON DELETE RESTRICT

);





CREATE TABLE "natureCulture"
(
	id serial PRIMARY KEY,
		valeur VARCHAR (255) NOT NULL, -- |Nature culture||
	legende VARCHAR (255) NOT NULL

);


CREATE TABLE btq
(
	id serial PRIMARY KEY,
	valeur VARCHAR (255) NOT NULL, -- |B/T/Q||
	legende VARCHAR (255) NOT NULL

);

CREATE TABLE "natureCultureSpeciale"
(
	id serial PRIMARY KEY,
		valeur VARCHAR (255) NOT NULL, -- |Nature culture speciale||
	legende VARCHAR (255) NOT NULL

);

CREATE TABLE "natureMutation"
(
	id serial PRIMARY KEY,
		valeur VARCHAR (255) NOT NULL, -- |Nature mutation||
	legende VARCHAR (255) NOT NULL

);

CREATE TABLE section
(
	id serial PRIMARY KEY,
		valeur VARCHAR (255) NOT NULL, -- |Section||
	legende VARCHAR (255) NOT NULL

);

CREATE TABLE "typeVoie"
(
	id serial PRIMARY KEY,
		valeur VARCHAR (255) NOT NULL, -- |Type de voie||
	legende VARCHAR (255) NOT NULL

);

CREATE TABLE "referenceCadastrale"
(
	id serial PRIMARY KEY,
		      "idDepartement" INTEGER,
	"codeCommune" integer NOT NULL, -- Code commune|
"prefixeSection" VARCHAR (255) NOT NULL,
			  	  "idSection" INTEGER ,
   	"noPlan" integer , -- No plan|


FOREIGN KEY ("idSection") REFERENCES section(id) ON DELETE RESTRICT,
	   FOREIGN KEY ("idDepartement") REFERENCES departement(id) ON DELETE RESTRICT



);


CREATE TABLE addresse
(
	id serial PRIMARY KEY,
	nb integer NOT NULL, -- // No voie|
	  	  "idBtq" INTEGER,
		  	  	  "idTypeVoie" INTEGER,
	code VARCHAR (255) NOT NULL, -- Code voie|
	voie VARCHAR (255) NOT NULL,


	      "idCodePostal" INTEGER,
		  "idCadastre" INTEGER,
		   "longitude" numeric,
		  "latitude" numeric,
		  
		  
		  		  	      FOREIGN KEY ("idCadastre") REFERENCES "referenceCadastrale"(id) ON DELETE RESTRICT,

		  		  	      FOREIGN KEY ("idCodePostal") REFERENCES "codePostal"(id) ON DELETE RESTRICT,

		  	      FOREIGN KEY ("idTypeVoie") REFERENCES "typeVoie"(id) ON DELETE RESTRICT,
	      FOREIGN KEY ("idBtq") REFERENCES btq(id) ON DELETE RESTRICT
);

CREATE TABLE lot
(
	id serial PRIMARY KEY,
	tantieme integer , 
	  	  "surfaceCarrez" numeric
		  );



CREATE TABLE vente (
 id serial PRIMARY KEY,
 "dateVente" DATE NOT NULL,
 "idNatureMutation" INTEGER NOT NULL,
 "valeurFonciere"  numeric NOT NULL,
  "nbLots" integer ,
     "nbPieces" integer ,
	  "idNatureCultureSpeciale" INTEGER ,
	  	  "idNatureCulture" INTEGER ,
   "surfaceTerrain" numeric ,
      "surfaceBati" numeric ,

		"noVolume" integer , -- No Volume|



   "idAddresse" INTEGER,
   "idTypeLocal" INTEGER,

   "surfaceTotaleCarrezLots" numeric,
      "idLot1" INTEGER,
	        "idLot2" INTEGER,
      "idLot3" INTEGER,
      "idLot4" INTEGER,
      "idLot5" INTEGER,


   
   FOREIGN KEY ("idAddresse") REFERENCES addresse(id) ON DELETE RESTRICT,
      FOREIGN KEY ("idNatureMutation") REFERENCES "natureMutation"(id) ON DELETE RESTRICT,
	        FOREIGN KEY ("idNatureCultureSpeciale") REFERENCES "natureCultureSpeciale"(id) ON DELETE RESTRICT,
				        FOREIGN KEY ("idNatureCulture") REFERENCES "natureCulture"(id) ON DELETE RESTRICT,
										        FOREIGN KEY ("idTypeLocal") REFERENCES "typeLocal"(id) ON DELETE RESTRICT,
												 FOREIGN KEY ("idLot1") REFERENCES lot(id) ON DELETE RESTRICT,

												 FOREIGN KEY ("idLot2") REFERENCES lot(id) ON DELETE RESTRICT,
												 FOREIGN KEY ("idLot3") REFERENCES lot(id) ON DELETE RESTRICT,
												 FOREIGN KEY ("idLot4") REFERENCES lot(id) ON DELETE RESTRICT,
												 FOREIGN KEY ("idLot5") REFERENCES lot(id) ON DELETE RESTRICT


   
  
);


CREATE INDEX addresse_idx ON addresse ("nb", "code", "voie", 
									   "idCodePostal", "idCadastre",
									  "idBtq", "idTypeVoie");


CREATE INDEX vente_idx ON vente ("dateVente", "idNatureMutation", "valeurFonciere",
								"nbLots", "nbPieces", "idNatureCultureSpeciale",
								"idNatureCulture", "surfaceTerrain",
								"surfaceBati", "noVolume", "idAddresse",
								"idTypeLocal", "surfaceTotaleCarrezLots",
								"idLot1", "idLot2", "idLot3",
								"idLot4", "idLot5")





