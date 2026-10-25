import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { analysisGroups } from "./medialta-data";
import { formatAnalysisPrice, regularAnalysisPrices } from "./analysis-prices";

// Independently captured expected visible rows from Sheet1, regular-price column D.
const expected = [
  [
    "Usluge",
    "Vađenje krvi",
    150
  ],
  [
    "Usluge",
    "Patronaža",
    550
  ],
  [
    "Urini",
    "Celokupan pregled",
    400
  ],
  [
    "Urini",
    "Mikroalbumini",
    970
  ],
  [
    "Urini",
    "Urea/24h",
    160
  ],
  [
    "Urini",
    "Klirens uree",
    330
  ],
  [
    "Urini",
    "Kreatinin/24h",
    160
  ],
  [
    "Urini",
    "Klirens kreatinina",
    330
  ],
  [
    "Urini",
    "Mokraćna kiselina/24h(konz. naknadno)",
    150
  ],
  [
    "Urini",
    "Proteini/dU",
    350
  ],
  [
    "Urini",
    "Glukoza/dU",
    200
  ],
  [
    "Urini",
    "α-amilaza ukupna/dU",
    580
  ],
  [
    "Urini",
    "α-amilaza pankr./dU",
    700
  ],
  [
    "Urini",
    "Elektroliti (Ca,Na,K,Cl,P,Mg)konz. Naknadno",
    200
  ],
  [
    "Mikrobiologija",
    "Urinokultura",
    640
  ],
  [
    "Mikrobiologija",
    "Koprokultura",
    1150
  ],
  [
    "Mikrobiologija",
    "Spermokultura",
    730
  ],
  [
    "Mikrobiologija",
    "Kultura ispljuvka",
    750
  ],
  [
    "Mikrobiologija",
    "Brisgrla",
    650
  ],
  [
    "Mikrobiologija",
    "Bris nosa",
    650
  ],
  [
    "Mikrobiologija",
    "Bris usne duplje",
    650
  ],
  [
    "Mikrobiologija",
    "Bris jezika",
    650
  ],
  [
    "Mikrobiologija",
    "Bris kože",
    720
  ],
  [
    "Mikrobiologija",
    "Bris uha",
    720
  ],
  [
    "Mikrobiologija",
    "Bris rane",
    900
  ],
  [
    "Mikrobiologija",
    "Bris oka",
    720
  ],
  [
    "Mikrobiologija",
    "Perianalni otisak",
    660
  ],
  [
    "Mikrobiologija",
    "Stolica na parazite-helminte",
    720
  ],
  [
    "Mikrobiologija",
    "Stolica na ciste crevnih protozoa",
    720
  ],
  [
    "Mikrobiologija",
    "Bris nosa na eozinofile MIKR",
    700
  ],
  [
    "Hematologija i markeri inflamacije",
    "Sedimentacija",
    150
  ],
  [
    "Hematologija i markeri inflamacije",
    "Krvna slika+LF 5dif",
    400
  ],
  [
    "Hematologija i markeri inflamacije",
    "Parametar KS (Le, Trc, Hgb)",
    null
  ],
  [
    "Hematologija i markeri inflamacije",
    "CRP",
    700
  ],
  [
    "Hematologija i markeri inflamacije",
    "Procalcitonin",
    2920
  ],
  [
    "Hematologija i markeri inflamacije",
    "LE formula (mikr)",
    700
  ],
  [
    "Hematologija i markeri inflamacije",
    "Retikulociti",
    null
  ],
  [
    "Hematologija i markeri inflamacije",
    "Krvna grupa i Rh faktor",
    2100
  ],
  [
    "Hematologija i markeri inflamacije",
    "Skrining antitela",
    2100
  ],
  [
    "Hematologija i markeri inflamacije",
    "Coombsov test",
    2100
  ],
  [
    "Koagulacija",
    "Fibrinogen",
    300
  ],
  [
    "Koagulacija",
    "Protrombinsko vreme",
    400
  ],
  [
    "Koagulacija",
    "aPTT",
    400
  ],
  [
    "Koagulacija",
    "Trombinsko vreme",
    440
  ],
  [
    "Koagulacija",
    "D-dimer",
    2150
  ],
  [
    "Koagulacija",
    "Vreme krvarenja",
    200
  ],
  [
    "Koagulacija",
    "Vreme koagulacije",
    200
  ],
  [
    "Opšta biohemija",
    "Urea",
    170
  ],
  [
    "Opšta biohemija",
    "Kreatinin",
    170
  ],
  [
    "Opšta biohemija",
    "Bilirubin ukupan",
    170
  ],
  [
    "Opšta biohemija",
    "Bilirubin direktan",
    170
  ],
  [
    "Opšta biohemija",
    "Proteini ukupni",
    170
  ],
  [
    "Opšta biohemija",
    "Albumin",
    170
  ],
  [
    "Opšta biohemija",
    "Mokraćna kiselina",
    170
  ],
  [
    "Metabolizam šećera",
    "Glukoza",
    170
  ],
  [
    "Metabolizam šećera",
    "OGTT",
    200
  ],
  [
    "Metabolizam šećera",
    "HbA1c",
    1090
  ],
  [
    "Metabolizam šećera",
    "Insulin",
    1420
  ],
  [
    "Metabolizam šećera",
    "C-peptid",
    1420
  ],
  [
    "Metabolizam šećera",
    "Anti-insulinska At",
    1800
  ],
  [
    "Metabolizam šećera",
    "Anti-GAD",
    2800
  ],
  [
    "Metabolizam šećera",
    "Anti-IA2 At",
    2800
  ],
  [
    "Lipidni status",
    "Holesterol",
    170
  ],
  [
    "Lipidni status",
    "HDL holesterol",
    170
  ],
  [
    "Lipidni status",
    "LDL holesterol",
    170
  ],
  [
    "Lipidni status",
    "Trigliceridi",
    170
  ],
  [
    "Lipidni status",
    "Apo-A1",
    700
  ],
  [
    "Lipidni status",
    "Apo B",
    700
  ],
  [
    "Lipidni status",
    "Lipoprotein a- Lp(a)",
    1300
  ],
  [
    "Lipidni status",
    "Faktor rizika",
    0
  ],
  [
    "Lipidni status",
    "Index ateroskleroze",
    0
  ],
  [
    "Metabolizam gvožđa i anemije",
    "Gvožđe",
    190
  ],
  [
    "Metabolizam gvožđa i anemije",
    "TIBC",
    200
  ],
  [
    "Metabolizam gvožđa i anemije",
    "UIBC",
    200
  ],
  [
    "Metabolizam gvožđa i anemije",
    "Feritin",
    1320
  ],
  [
    "Metabolizam gvožđa i anemije",
    "Transferin",
    940
  ],
  [
    "Metabolizam gvožđa i anemije",
    "Vitamin B12",
    1380
  ],
  [
    "Metabolizam gvožđa i anemije",
    "Folna kiselina",
    1380
  ],
  [
    "Metabolizam gvožđa i anemije",
    "Anti-parijetalna At",
    1740
  ],
  [
    "Metabolizam gvožđa i anemije",
    "Haptoglobin",
    1200
  ],
  [
    "Metabolizam gvožđa i anemije",
    "Eritropoetin",
    2640
  ],
  [
    "Enzimi",
    "AST",
    170
  ],
  [
    "Enzimi",
    "ALT",
    170
  ],
  [
    "Enzimi",
    "G-GT",
    170
  ],
  [
    "Enzimi",
    "Alkalna fosfataza",
    170
  ],
  [
    "Enzimi",
    "α-amilaza ukupna",
    580
  ],
  [
    "Enzimi",
    "α-amilaza pankreasna",
    700
  ],
  [
    "Enzimi",
    "Lipaza",
    700
  ],
  [
    "Enzimi",
    "LDH",
    170
  ],
  [
    "Enzimi",
    "Kisela fosfataza ukupna",
    270
  ],
  [
    "Enzimi",
    "Kisela fosfataza prostatična",
    270
  ],
  [
    "Enzimi",
    "S-holinesteraza",
    580
  ],
  [
    "Enzimi",
    "Kreatin kinaza CK-NAC",
    300
  ],
  [
    "Enzimi",
    "Kreatin kinaza CK-MB",
    500
  ],
  [
    "Elektroliti",
    "Kalcijum",
    190
  ],
  [
    "Elektroliti",
    "Jonizovani kalcijum",
    500
  ],
  [
    "Elektroliti",
    "Magnezijum",
    190
  ],
  [
    "Elektroliti",
    "Fosfor",
    190
  ],
  [
    "Elektroliti",
    "Natrijum",
    190
  ],
  [
    "Elektroliti",
    "Kalijum",
    190
  ],
  [
    "Elektroliti",
    "Hloridi",
    190
  ],
  [
    "Elektroliti",
    "Bikarbonati",
    240
  ],
  [
    "Elektroliti",
    "Bakar",
    720
  ],
  [
    "Kardijačni markeri",
    "Troponin T",
    1760
  ],
  [
    "Kardijačni markeri",
    "BNP",
    3500
  ],
  [
    "Kardijačni markeri",
    "Homocistein",
    2850
  ],
  [
    "Koštani markeri",
    "Osteokalcin",
    1870
  ],
  [
    "Koštani markeri",
    "β-Cross Laps",
    1870
  ],
  [
    "Koštani markeri",
    "Vitamin D3 (OH-25)",
    2420
  ],
  [
    "Tumorski markeri",
    "AFP (jetra, testisi)",
    1210
  ],
  [
    "Tumorski markeri",
    "CEA (opšti)",
    1210
  ],
  [
    "Tumorski markeri",
    "CA 15-3 (dojka)",
    1680
  ],
  [
    "Tumorski markeri",
    "CA 19-9 (pankreas, kolon)",
    1680
  ],
  [
    "Tumorski markeri",
    "CA 72-4 (želudac)",
    1680
  ],
  [
    "Tumorski markeri",
    "CA 125 (jajnik)",
    1680
  ],
  [
    "Tumorski markeri",
    "HE4 (jajnik)",
    3060
  ],
  [
    "Tumorski markeri",
    "ROMA (index)",
    0
  ],
  [
    "Tumorski markeri",
    "Cyfra 21-1 (pluća)",
    1800
  ],
  [
    "Tumorski markeri",
    "NSE (pluća)",
    1680
  ],
  [
    "Tumorski markeri",
    "S-100 (melanom)",
    3850
  ],
  [
    "Tumorski markeri",
    "PSA (prostata)",
    1210
  ],
  [
    "Tumorski markeri",
    "PSA free (prostata)",
    1390
  ],
  [
    "Tumorski markeri",
    "Index PSA",
    0
  ],
  [
    "Tumorski markeri",
    "Beta HCG (testisi)",
    1650
  ],
  [
    "Tumorski markeri",
    "ACE (sarkoidoza)",
    1710
  ],
  [
    "Tumorski markeri",
    "Feritin",
    1320
  ],
  [
    "Tumorski markeri",
    "β-2-mikroglobulin (limfomi)",
    1390
  ],
  [
    "Hormoni štitne žlezde",
    "T3",
    690
  ],
  [
    "Hormoni štitne žlezde",
    "T4",
    690
  ],
  [
    "Hormoni štitne žlezde",
    "TSH",
    null
  ],
  [
    "Hormoni štitne žlezde",
    "Ultrasenzitivan TSH",
    690
  ],
  [
    "Hormoni štitne žlezde",
    "FT3",
    720
  ],
  [
    "Hormoni štitne žlezde",
    "FT4",
    720
  ],
  [
    "Hormoni štitne žlezde",
    "Anti-TG",
    1420
  ],
  [
    "Hormoni štitne žlezde",
    "Anti-TPO",
    1420
  ],
  [
    "Hormoni štitne žlezde",
    "Anti-TSH rec. At",
    2310
  ],
  [
    "Hormoni štitne žlezde",
    "Tireoglobulin",
    1490
  ],
  [
    "Hormoni štitne žlezde",
    "Kalcitonin",
    1800
  ],
  [
    "Hormoni štitne žlezde",
    "PTH",
    1380
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Estradiol",
    950
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Progesteron",
    950
  ],
  [
    "Reproduktivni hormoni i markeri",
    "FSH",
    950
  ],
  [
    "Reproduktivni hormoni i markeri",
    "LH",
    950
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Prolaktin",
    950
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Testosteron",
    950
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Free testrosteron",
    1780
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Androstenedion",
    1650
  ],
  [
    "Reproduktivni hormoni i markeri",
    "17-OH progesteron",
    1690
  ],
  [
    "Reproduktivni hormoni i markeri",
    "DHSO4",
    1320
  ],
  [
    "Reproduktivni hormoni i markeri",
    "SHBG",
    1320
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Anti-Mullerian hormon",
    3190
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Inhibin A",
    null
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Inhibin B",
    2640
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Anti-spermatozoidna At",
    1570
  ],
  [
    "Reproduktivni hormoni i markeri",
    "Anti-ovarijalna At",
    1900
  ],
  [
    "Hormoni nadbubrega i hipofize",
    "Kortizol",
    1210
  ],
  [
    "Hormoni nadbubrega i hipofize",
    "ACTH",
    1380
  ],
  [
    "Hormoni nadbubrega i hipofize",
    "Aldosteron",
    1760
  ],
  [
    "Hormoni nadbubrega i hipofize",
    "hGH",
    1380
  ],
  [
    "Hormoni nadbubrega i hipofize",
    "IGF-I",
    2090
  ],
  [
    "Monitoring trudnoće",
    "HCG (inact+β)",
    1090
  ],
  [
    "Monitoring trudnoće",
    "Free β HCG",
    1650
  ],
  [
    "Monitoring trudnoće",
    "PAPP-A",
    1650
  ],
  [
    "Monitoring trudnoće",
    "AFP",
    1210
  ],
  [
    "Monitoring trudnoće",
    "Free estriol",
    1430
  ],
  [
    "Monitoring trudnoće",
    "Double test (8+0 do 13+6)",
    3300
  ],
  [
    "Monitoring trudnoće",
    "Triple test (14+0 do 22+6)",
    3730
  ],
  [
    "Monitoring trudnoće",
    "Quadriple test (14+0 do 20+0)",
    7410
  ],
  [
    "Specifični proteini i imunoglobulini",
    "C3",
    940
  ],
  [
    "Specifični proteini i imunoglobulini",
    "C4",
    940
  ],
  [
    "Specifični proteini i imunoglobulini",
    "C1 inhibitor esteraze",
    1530
  ],
  [
    "Specifični proteini i imunoglobulini",
    "Ceruloplazmin (Wilsonova bolest)",
    1320
  ],
  [
    "Specifični proteini i imunoglobulini",
    "α1-antitripsin",
    1400
  ],
  [
    "Specifični proteini i imunoglobulini",
    "IgA",
    940
  ],
  [
    "Specifični proteini i imunoglobulini",
    "IgG",
    940
  ],
  [
    "Specifični proteini i imunoglobulini",
    "IgM",
    940
  ],
  [
    "Specifični proteini i imunoglobulini",
    "IgE",
    1210
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "RF (reuma faktor)",
    740
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "ASTO (antistreptolizin O)",
    760
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Waaler-Rose (reumatske bolesti)",
    930
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-CCP (reumat.artritis)",
    1790
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-MCV (reumat.artritis)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-C1q",
    1710
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "CIC-C1qIgG (cirkul. Imunikompleksi)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "ANA screen (antinuklearna At)",
    1710
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-dsDNA (lupus)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-centromere B",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-sm (vez.tkivo)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-Scl-70 (sistemska skleroza)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-U1-RNP At (bol.veziv.tkiva)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-SS-A (RO)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-SS-B (LA) (Sjorgenov sindrom)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "Anti-Jo-1 (polimiozitis)",
    null
  ],
  [
    "Dg reumatoloških i autoimunih bolesti",
    "ENA screen (Sm, RNP/Sm, SS-A, SS-B, SCL-70 and Jo1)",
    6930
  ],
  [
    "Dg tromboze i vaskulitisa",
    "Anti-fosfolipidna IgM, IgG",
    1650
  ],
  [
    "Dg tromboze i vaskulitisa",
    "Anti-kardiolipinska IgA, IgM, IgG",
    1650
  ],
  [
    "Dg tromboze i vaskulitisa",
    "Anti-β2-glikoproteinska IgA, IgM, IgG",
    1650
  ],
  [
    "Dg tromboze i vaskulitisa",
    "Lupus antikoagulans",
    1710
  ],
  [
    "Dg tromboze i vaskulitisa",
    "ANCA MPO (pANCA)glomerulonefritis",
    1710
  ],
  [
    "Dg tromboze i vaskulitisa",
    "ANCA PR3 (cANCA) vaskulitis",
    1710
  ],
  [
    "Dg gastroenteroloških bolesti",
    "Anti-glijadinska IgA, IgG",
    1710
  ],
  [
    "Dg gastroenteroloških bolesti",
    "Anti-transglutaminska IgA, IgG",
    1680
  ],
  [
    "Dg gastroenteroloških bolesti",
    "AMA-M2 (anti-mitohondrijalna At)",
    1710
  ],
  [
    "Dg gastroenteroloških bolesti",
    "ASCA IgA, IgG (Kronova bolest)",
    1850
  ],
  [
    "Dg gastroenteroloških bolesti",
    "Anti-LKM-1 (autoimuni hepatitis)",
    1540
  ],
  [
    "Dg gastroenteroloških bolesti",
    "Calprotektin (feces)",
    3350
  ],
  [
    "Dg gastroenteroloških bolesti",
    "Fekalno okultno krvarenje (feces)",
    770
  ],
  [
    "Dg gastroenteroloških bolesti",
    "Helickobacter pylori u stolici (HBP)",
    1300
  ],
  [
    "Dg infektivnih bolesti",
    "Helicobacter pylori (izdisajni test)zakazivanje",
    null
  ],
  [
    "Dg infektivnih bolesti",
    "Helicobacter pylori IgA, IgG",
    1460
  ],
  [
    "Dg infektivnih bolesti",
    "Chlamidia trachomatis IgM, IgG",
    1530
  ],
  [
    "Dg infektivnih bolesti",
    "Chlamidia trachomatis IgA",
    1530
  ],
  [
    "Dg infektivnih bolesti",
    "Chlamidia pneumoniae IgM, IgG",
    1760
  ],
  [
    "Dg infektivnih bolesti",
    "Mycoplasma pneumoniae IgM, IgG",
    1530
  ],
  [
    "Dg infektivnih bolesti",
    "Treponema pallidum At",
    1910
  ],
  [
    "Dg infektivnih bolesti",
    "VDRL+TPHA (sifilis)950+950",
    1090
  ],
  [
    "Dg infektivnih bolesti",
    "HBsAg",
    1570
  ],
  [
    "Dg infektivnih bolesti",
    "Anti-HBs",
    1570
  ],
  [
    "Dg infektivnih bolesti",
    "Anti-HAV tot.",
    1530
  ],
  [
    "Dg infektivnih bolesti",
    "Anti-HAV IgM",
    1680
  ],
  [
    "Dg infektivnih bolesti",
    "Anti-HCV",
    1570
  ],
  [
    "Dg infektivnih bolesti",
    "HIV 1+2 (Ag/At)",
    1570
  ],
  [
    "Dg infektivnih bolesti",
    "Toxoplasma IgM, IgG",
    1460
  ],
  [
    "Dg infektivnih bolesti",
    "Rubella IgM, IgG",
    1460
  ],
  [
    "Dg infektivnih bolesti",
    "CMV IgM, IgG",
    1680
  ],
  [
    "Dg infektivnih bolesti",
    "Herpes 1 IgM, IgG",
    1680
  ],
  [
    "Dg infektivnih bolesti",
    "Herpes 2 IgM, IgG",
    1680
  ],
  [
    "Dg infektivnih bolesti",
    "VZV IgM, IgG",
    1680
  ],
  [
    "Dg infektivnih bolesti",
    "Morbilli IgM, IgG",
    1710
  ],
  [
    "Dg infektivnih bolesti",
    "Mumps IgM, IgG",
    1800
  ],
  [
    "Dg infektivnih bolesti",
    "EBV IgM, IgG",
    1680
  ],
  [
    "Dg infektivnih bolesti",
    "Borelia burgdoferi IgM, IgG",
    1530
  ],
  [
    "Dg infektivnih bolesti",
    "Adenovirus IgA, IgM, IgG",
    1680
  ],
  [
    "Dg infektivnih bolesti",
    "Coxackie IgM, IgG",
    1680
  ],
  [
    "Dg infektivnih bolesti",
    "Parvo B 19 IgM, IgG",
    1800
  ],
  [
    "Kardijačni markeri II",
    "Mioglobin",
    1800
  ],
  [
    "Kardijačni markeri II",
    "pro BNP",
    3960
  ],
  [
    "Lekovi u krvi",
    "Litijum",
    500
  ],
  [
    "Lekovi u krvi",
    "Acidum valproicum",
    1430
  ],
  [
    "Lekovi u krvi",
    "Carbamazepine",
    1430
  ],
  [
    "OSTALO",
    "Kateholamini (konz.pre uzorka",
    null
  ],
  [
    "OSTALO",
    "VMA (konz.pre uzorkovanja)",
    null
  ],
  [
    "OSTALO",
    "5-HIAA (konz.pre uzorkovanja)",
    null
  ],
  [
    "OSTALO",
    "17-OH-Kortikosteroidi(konz.pre u.)",
    null
  ],
  [
    "OSTALO",
    "d-Aminolevulinska kiselina",
    null
  ],
  [
    "OSTALO",
    "CA50 (kolon)",
    null
  ],
  [
    "OSTALO",
    "UBC (mokraćna bešika)",
    null
  ],
  [
    "OSTALO",
    "TATI (grlić materice)",
    null
  ],
  [
    "OSTALO",
    "Hromogenin A (CgA) karcinoid",
    null
  ],
  [
    "OSTALO",
    "Elektroforeza proteina",
    null
  ],
  [
    "OSTALO",
    "Influenza A IgG,IgM,",
    null
  ],
  [
    "OSTALO",
    "Influenza B IgG,IgM,",
    null
  ],
  [
    "OSTALO",
    "Adeno i Rota virus",
    1500
  ],
  [
    "OSTALO",
    "Antiparijetalna At",
    1740
  ],
  [
    "OSTALO",
    "Cistin u 24h urinu",
    null
  ],
  [
    "OSTALO",
    "Cistatin C",
    2260
  ],
  [
    "OSTALO",
    "DHEA",
    null
  ],
  [
    "OSTALO",
    "Pčelinji otrov",
    2040
  ],
  [
    "OSTALO",
    "Clostridia",
    2900
  ],
  [
    "OSTALO",
    "Candida feces",
    440
  ],
  [
    "OSTALO",
    "Endomizijalana At",
    2530
  ],
  [
    "OSTALO",
    "ANA-HEP",
    1870
  ],
  [
    "OSTALO",
    "pro BNP",
    3960
  ],
  [
    "OSTALO",
    "Cink",
    900
  ],
  [
    "OSTALO",
    "Vitamin B6",
    3080
  ],
  [
    "OSTALO",
    "Troponin I",
    1760
  ],
  [
    "OSTALO",
    "Covid IgG",
    2550
  ],
  [
    "OSTALO",
    "KKS+opšta biohemija",
    1930
  ],
  [
    "OSTALO",
    "Trudnička biohemija",
    1760
  ],
  [
    "OSTALO",
    "Covid Ag test",
    1500
  ],
  [
    "OSTALO",
    "AT III",
    2640
  ],
  [
    "OSTALO",
    "anti Xa",
    2200
  ]
] as const;

describe("Complete January 2026 regular price list", () => {
  for (const [section, name, price] of expected) {
    test(`${section}: ${name} uses its regular source price`, () => {
      assert.ok(analysisGroups.find((group) => group.name === section)?.analyses.includes(name));
      assert.equal(regularAnalysisPrices[name], price ?? undefined);
    });
  }

  test("all 272 visible source rows appear in their 26 source sections and order", () => {
    assert.equal(analysisGroups.length, 26);
    assert.equal(analysisGroups.flatMap((group) => group.analyses).length, 272);
    assert.deepEqual(analysisGroups.flatMap((group) => group.analyses.map((name) => [group.name, name])), expected.map(([section, name]) => [section, name]));
  });

  test("hidden superseded prices never override visible regular prices", () => {
    assert.equal(regularAnalysisPrices["Stolica na ciste crevnih protozoa"], 720);
    assert.equal(regularAnalysisPrices["Bris nosa na eozinofile MIKR"], 700);
    assert.equal(regularAnalysisPrices["Skrining antitela"], 2100);
    assert.equal(regularAnalysisPrices["Haptoglobin"], 1200);
    assert.equal(regularAnalysisPrices["Eritropoetin"], 2640);
    assert.equal(regularAnalysisPrices["Adrenalin/dU"], undefined);
  });

  test("29 source rows without numeric regular prices stay on request", () => {
    const unpriced = expected.filter(([, , price]) => price === null);
    assert.equal(unpriced.length, 29);
    for (const [, name] of unpriced) assert.equal(formatAnalysisPrice(name), "Cena na upit");
    assert.equal(regularAnalysisPrices["TSH"], undefined);
    assert.equal(regularAnalysisPrices["Ultrasenzitivan TSH"], 690);
  });

  test("zero-valued source prices are retained rather than treated as missing", () => {
    for (const name of ["Faktor rizika", "Index ateroskleroze", "ROMA (index)", "Index PSA"]) {
      assert.equal(regularAnalysisPrices[name], 0);
      assert.equal(formatAnalysisPrice(name), "0 RSD");
    }
  });
});
