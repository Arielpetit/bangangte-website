import { src } from "@/lib/images";
import { localPhoto } from "@/lib/local";
import type { Person } from "@/lib/people";
import { T } from "./ui";

function photoOf(p: Person): string | null {
  return localPhoto("people", p.slug) ?? (p.img ? src(p.img, 500) : null);
}

/** Carte portrait : photo pleine hauteur, nom et rôle en surimpression. */
export function PersonCard({ p }: { p: Person }) {
  const photo = photoOf(p);
  if (!photo) return <PersonRow p={p} />;
  return (
    <article className="pcard">
      <div className="pcard-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={p.name} loading="lazy" />
        <div className="pcard-name"><span className="role"><T fr={p.role.fr} en={p.role.en} /></span><h3>{p.name}</h3></div>
      </div>
      <p><T fr={p.text.fr} en={p.text.en} /></p>
    </article>
  );
}

/** Ligne compacte pour les personnalités sans photo. */
export function PersonRow({ p }: { p: Person }) {
  return (
    <li className="prow">
      <span className="prow-ini" aria-hidden="true">{p.initials}</span>
      <div>
        <h3>{p.name}</h3>
        <span className="role"><T fr={p.role.fr} en={p.role.en} /></span>
        <p><T fr={p.text.fr} en={p.text.en} /></p>
      </div>
    </li>
  );
}

/** Groupe : portraits en grille, puis les autres en liste. */
export function PeopleGroup({ people }: { people: Person[] }) {
  const withPhoto = people.filter((p) => photoOf(p));
  const without = people.filter((p) => !photoOf(p));
  return (
    <>
      {withPhoto.length > 0 && (
        <div className="pgrid" data-stagger>
          {withPhoto.map((p) => <PersonCard key={p.slug} p={p} />)}
        </div>
      )}
      {without.length > 0 && (
        <ul className="plist" data-stagger>
          {without.map((p) => <PersonRow key={p.slug} p={p} />)}
        </ul>
      )}
    </>
  );
}
