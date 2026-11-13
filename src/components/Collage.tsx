import { Icon, Img, T } from "./ui";

/** Composition photo : une image centrale entourée de photos qui se chevauchent et de cartes flottantes. */
export function Collage() {
  return (
    <div className="collage" data-reveal>
      <div className="col-main"><Img k="femme3" w={960} /></div>
      <div className="col-photo col-p1"><Img k="rituel" w={500} /></div>
      <div className="col-photo col-p2"><Img k="festival" w={500} /></div>

      <div className="col-card col-c1">
        <span className="col-ic"><Icon name="calendar" /></span>
        <div>
          <b><T fr="25 nov. – 6 déc. 2026" en="25 Nov – 6 Dec 2026" /></b>
          <span><T fr="12 jours à Bangangté" en="12 days in Bangangté" /></span>
        </div>
      </div>
      <div className="col-card col-c2">
        <span className="col-card-kicker"><T fr="Thème 2026" en="2026 theme" /></span>
        <p><T fr="« Un peuple, un roi, une culture »" en="“One people, one king, one culture”" /></p>
      </div>
      <div className="col-card col-c3">
        <span className="col-ic"><Icon name="users" /></span>
        <div><b><T fr="5e édition" en="5th edition" /></b><span><T fr="Diaspora et terroir" en="Diaspora and home" /></span></div>
      </div>

      <span className="col-chip col-k1" aria-hidden="true"><Icon name="pin" /></span>
      <span className="col-chip col-k2" aria-hidden="true"><Icon name="mask" /></span>
    </div>
  );
}
