import { T } from "@/components/ui";
import { IMG, type ImgKey, pageUrl, src } from "@/lib/images";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const metadata = meta("Crédits photos", "Photo credits", "Photographies de Bangangté et du Ndé publiées sous licence libre sur Wikimedia Commons.");

export default function Credits() {
  const keys = Object.keys(IMG) as ImgKey[];
  return (
    <>
      <Hero page="credits"
        crumb={{ fr: "Crédits photos", en: "Photo credits" }}
        title={{ fr: "Crédits", en: "Credits" }}
        lead={{ fr: "Les photographies de ce site proviennent de Wikimedia Commons et sont publiées sous licence libre. Merci à leurs auteurs.", en: "The photographs on this site come from Wikimedia Commons and are published under free licences. Thank you to their authors." }}
        img="femme2"
      />
      <section className="sec">
        <div className="wrap">
          <ul className="credits" data-stagger>
            {keys.map((k) => {
              const url = pageUrl(k);
              return (
                <li key={k}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src(k, 250)} alt="" loading="lazy" />
                  <div>
                    <strong><T fr={IMG[k].fr} en={IMG[k].en} /></strong>
                    {url ? <a href={url} rel="noopener" target="_blank">{IMG[k].author}</a> : IMG[k].author}, {IMG[k].license}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
