"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import { mediaUrl } from "@/lib/data/format";
import { MediaPicker } from "./fields";
import { translate, useLang, useT } from "../_lib/i18n";

function B({ on, label: fr, icon, text, run, disabled }: { on?: boolean; label: string; icon?: string; text?: string; run: () => void; disabled?: boolean }) {
  const label = useT()(fr);
  return <button type="button" className={on ? "on" : ""} aria-pressed={on} aria-label={label} title={label} disabled={disabled} onMouseDown={(e) => e.preventDefault()} onClick={run}>{icon ? <Icon name={icon} /> : <b>{text}</b>}</button>;
}

/** Éditeur de texte riche : titres, gras, italique, listes, citations, liens et photos. */
export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const [picker, setPicker] = useState(false);
  const lang = useLang();
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener" } }),
      Image,
      Placeholder.configure({ placeholder: translate(lang, "Rédigez ici… Le premier paragraphe est mis en valeur sur le site.") }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? "" : e.getHTML()),
  });
  // Contenu chargé après coup (ouverture d'une fiche existante).
  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);

  const st = useEditorState({
    editor,
    selector: ({ editor: e }) => e ? ({
      b: e.isActive("bold"), i: e.isActive("italic"), h2: e.isActive("heading", { level: 2 }), h3: e.isActive("heading", { level: 3 }),
      ul: e.isActive("bulletList"), ol: e.isActive("orderedList"), q: e.isActive("blockquote"), a: e.isActive("link"),
      undo: e.can().undo(), redo: e.can().redo(),
    }) : null,
  });
  if (!editor || !st) return <div className="ad-rich ad-skeleton" />;
  const c = () => editor.chain().focus();
  const link = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt(translate(lang, "Adresse du lien (laisser vide pour retirer) :"), prev ?? "https://");
    if (url === null) return;
    if (!url || url === "https://") c().extendMarkRange("link").unsetLink().run();
    else c().extendMarkRange("link").setLink({ href: url }).run();
  };
  return (
    <div className="ad-rich">
      <div className="ad-rich-bar" role="toolbar" aria-label={translate(lang, "Mise en forme")}>
        <B label="Titre" text="H2" on={st.h2} run={() => c().toggleHeading({ level: 2 }).run()} />
        <B label="Sous-titre" text="H3" on={st.h3} run={() => c().toggleHeading({ level: 3 }).run()} />
        <span className="sep" />
        <B label="Gras" text="G" on={st.b} run={() => c().toggleBold().run()} />
        <B label="Italique" text="I" on={st.i} run={() => c().toggleItalic().run()} />
        <span className="sep" />
        <B label="Liste à puces" text="•" on={st.ul} run={() => c().toggleBulletList().run()} />
        <B label="Liste numérotée" text="1." on={st.ol} run={() => c().toggleOrderedList().run()} />
        <B label="Citation" text="“" on={st.q} run={() => c().toggleBlockquote().run()} />
        <span className="sep" />
        <B label="Lien" icon="external" on={st.a} run={link} />
        <B label="Insérer une photo" icon="image" run={() => setPicker(true)} />
        <span className="grow" />
        <B label="Annuler" icon="arrow" run={() => c().undo().run()} disabled={!st.undo} />
      </div>
      <EditorContent editor={editor} className="ad-rich-area prose" />
      {picker && <MediaPicker onClose={() => setPicker(false)} onPick={(urls) => { urls.forEach((u) => c().setImage({ src: mediaUrl(u, 1280) ?? u }).run()); setPicker(false); }} />}
    </div>
  );
}
