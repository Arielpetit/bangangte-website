import Link from "next/link";
import { PhotoGallery } from "@/components/PhotoGallery";
import { D } from "@/components/mairie";
import { PhotoStrip } from "@/components/Share";
import { getAlbums } from "@/lib/data/content";
import { Icon, SecHead, T } from "@/components/ui";
import { GALLERY } from "@/lib/gallery";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Galerie photos", "Photo gallery", "Bangangté en images : fêtes et traditions, chefferies et musées, chutes et lieux sacrés, la ville et ses saveurs.");

export default async function Galerie() {
  const albums = await getAlbums();
  const total = new Set(GALLERY.flatMap((c) => c.items)).size;
  return (
    <>
      <Hero page="galerie"
        crumb={{ fr: "Galerie photos", en: "Photo gallery" }}
        kicker={{ fr: "Bangangté en images", en: "Bangangté in pictures" }}
        title={{ fr: "Galerie", en: "Gallery" }}
        lead={{ fr: "Fêtes, parures, chefferies, chutes, marchés et visages du pays medumba. Touchez une photo pour l'ouvrir en grand.", en: "Festivals, finery, chiefdoms, waterfalls, markets and faces of Medumba country. Tap a photo to see it full size." }}
        img="festival"
        inset="chuteB"
        badge={{ big: String(total), small: { fr: "photos", en: "photos" } }}
      />
      {albums.map((a, i) => (
        <section key={a.id} className={`sec${i % 2 ? " sec-alt" : ""}`}>
          <div className="wrap">
            <SecHead kicker={{ fr: "Albums de la mairie", en: "Council albums" }} title={{ fr: a.title_fr, en: a.title_en || a.title_fr }} text={a.date ? { fr: <D iso={a.date} />, en: <D iso={a.date} /> } : undefined} />
            <PhotoStrip photos={a.photos} title={a.title_fr} />
          </div>
        </section>
      ))}
      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Photothèque", en: "Photo library" }} title={{ fr: "Parcourir par thème", en: "Browse by theme" }} text={{ fr: "Toutes les photos sont publiées sous licence libre ; les auteurs sont cités dans la visionneuse et sur la page crédits.", en: "Every photo is published under a free licence; authors are credited in the viewer and on the credits page." }} />
          <PhotoGallery cats={GALLERY} />
        </div>
      </section>
      <section className="sec sec-alt">
        <div className="wrap split">
          <div>
            <h2 data-reveal><T fr="Vous avez des photos de Bangangté ?" en="Have photos of Bangangté?" /></h2>
            <p className="lead" data-reveal><T fr="Partagez vos plus belles images de la ville, des fêtes et des sites avec la mairie : elles pourront enrichir la galerie, avec votre nom en crédit." en="Share your best pictures of the town, its festivals and sights with the town hall: they may join the gallery, credited to you." /></p>
          </div>
          <div className="btn-row" data-reveal>
            <Link className="btn btn-solid" href="/contact"><T fr="Proposer des photos" en="Send photos" /><Icon name="arrow" /></Link>
            <Link className="btn btn-line" href="/credits"><T fr="Crédits photos" en="Photo credits" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
