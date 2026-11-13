import Link from "next/link";
import { PersonTile } from "@/components/mairie";
import { Icon, SecHead, T } from "@/components/ui";
import { getPeople } from "@/lib/data/content";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("L'exécutif municipal", "The executive", "Le Maire de Bangangté et ses quatre adjoints : rôles, délégations et état civil.");

export default async function Executif() {
  const executive = await getPeople("executif");
  return (
    <>
      <Hero page="mairie/executif"
        crumb={{ fr: "L'exécutif municipal", en: "The executive" }}
        kicker={{ fr: "La Mairie", en: "Town hall" }}
        title={{ fr: "L'exécutif", en: "The executive" }}
        lead={{ fr: "Le Maire et ses quatre adjoints dirigent la commune, exécutent les délibérations du Conseil municipal et célèbrent les actes d'état civil.", en: "The mayor and four deputies run the council, carry out council decisions and officiate civil records." }}
        img="hdv"
        landscape
        badge={{ big: String(executive.length), small: { fr: "élus à l'exécutif", en: "elected officials" } }}
      />
      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Composition", en: "Members" }} title={{ fr: "Le Maire et ses adjoints", en: "The mayor and deputies" }} text={{ fr: "Nouvelle configuration adoptée lors de la session extraordinaire du 16 septembre 2026, après le décès du Dr Robert NYANGANG, premier adjoint.", en: "Configuration adopted at the extraordinary session of 16 September 2026, after the death of the first deputy, Dr Robert NYANGANG." }} />
          <div className="exec" data-stagger>{executive.map((p, i) => <PersonTile key={p.id} p={p} big={i === 0} />)}</div>
        </div>
      </section>
      <section className="sec sec-alt">
        <div className="wrap g3" data-stagger>
          <article className="panel"><div className="pi"><Icon name="shield" /></div><h3><T fr="Le Maire" en="The mayor" /></h3><p><T fr="Chef de l'exécutif communal et ordonnateur du budget, il représente la commune et dirige l'administration communale." en="Head of the council executive and budget authority, the mayor represents the council and runs its administration." /></p></article>
          <article className="panel"><div className="pi"><Icon name="users" /></div><h3><T fr="Les adjoints" en="The deputies" /></h3><p><T fr="Élus par le Conseil municipal, ils assistent le Maire, le représentent et exercent les délégations qu'il leur confie." en="Elected by the council, deputies assist and represent the mayor and carry out the tasks he delegates." /></p></article>
          <article className="panel"><div className="pi"><Icon name="file" /></div><h3><T fr="Officiers d'état civil" en="Civil registrars" /></h3><p><T fr="Le Maire et ses adjoints signent les actes d'état civil et célèbrent les mariages à l'Hôtel de ville." en="The mayor and deputies sign civil records and celebrate marriages at the town hall." /></p></article>
        </div>
        <div className="wrap" style={{ marginTop: "2.4rem" }}>
          <Link className="btn btn-solid" href="/mairie/conseil"><T fr="Le Conseil municipal" en="The municipal council" /><Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
