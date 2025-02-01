import PageContentSection from "../components/PageContentSection";

export default function Disclaimer() {
  return (
    <div className="mt-40">
      <PageContentSection>
        <div className="space-y-6 text-base leading-7 text-gray-700">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Informacinio pobūdžio turinys
          </h2>
          <p>
            Šioje svetainėje pateikta informacija ir skaičiuoklės remiasi bendro
            pobūdžio informacija, kuri nėra lygiavertė profesionaliems gydytojų
            patarimams. Jei kyla klausimų dėl konkrečių sveikatos sutrikimų,
            diagnozių ar gydymo, kreipkitės į kvalifikuotus sveikatos priežiūros
            specialistus.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Jūsų atsakomybė
          </h2>
          <p>
            Svetainės kūrėjai neprisiima atsakomybės už sprendimus ar pasekmes,
            atsirandančias dėl čia pateiktų rezultatų naudojimo. Kiekvienas
            asmuo yra unikalus, todėl prieš keisdami mitybos įpročius ar fizinį
            aktyvumą, pasitarkite su specialistu.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Amžiaus apribojimai
          </h2>
          <p>
            Dauguma skaičiuoklių šioje svetainėje yra pritaikytos suaugusiems
            asmenims (18 metų ir vyresniems). Vaikų ir paauglių atvejais būtinos
            kitokios vertinimo metodikos; norint taikyti šiuos rezultatus
            jaunesniems asmenims, rekomenduojama profesionali konsultacija.
          </p>
        </div>
      </PageContentSection>
    </div>
  );
}
