﻿select 
ad.code,
	nm.valeur,
sec.valeur as sectionCadastrale,
refCa."noPlan" as parcelleCadastrale,
	tl."typeLocal"
	, lt1."surfaceCarrez"
	, v."surfaceBati"
	, round(v."valeurFonciere"::numeric/ round(v."surfaceBati"::numeric)) as "prixM2"
	, v."valeurFonciere", v."surfaceTotaleCarrezLots", v."nbPieces" 
	, v."dateVente"
	, ad.nb, ad.voie
	, co.nom
from vente v 
	inner join addresse ad on ad.id = v."idAddresse"
	inner join "codePostal" cp on cp.id = ad."idCodePostal"
	inner join commune co on co.id = cp."idCommune"
	inner join "referenceCadastrale" refCa on refCa.id = ad."idCadastre"
	inner join section sec on sec.id = refCa."idSection"
	left outer join lot lt1 on lt1.id = v."idLot1"
	inner join "typeLocal" tl on tl.id = v."idTypeLocal"
	inner join "natureMutation" nm on nm.id = v."idNatureMutation"
where 
	v."valeurFonciere" < 15000000000
	-- and v."valeurFonciere" > 100000 
	-- and v."surfaceBati" > 20 and v."surfaceBati" < 40
	and tl."typeLocal" = 'APPARTEMENT'
	and co.nom LIKE 'BREST%'
	-- and 
	-- v."nbPieces" < 20 and v."nbPieces" > 0
	-- and v."surfaceTotaleCarrezLots" > 0
	-- and (v."idNatureMutation" = 1 or v."idNatureMutation" = 3) -- 1 VENTE, 3 ADJUDICATION
	-- and 
	and ad."voie" = 'KERABECAM' -- 'EDEN%'
	-- and (v."idTypeLocal" = 3 or v."idTypeLocal" = 5 or v."idTypeLocal" = 2) -- 3 APPARTEMENT, 5 MAISON, 2 NON_RENSEIGNE, 1 DEPENDANCE
	-- and v."dateVente" > '2019-01-01'
order by 
-- v."dateVente"
v."valeurFonciere"
-- ad.voie
-- "prixM2"
-- v."surfaceBati"