// Swash/alternate-glyph codepoints for the brand headings, transcribed from the client's
// Oraita typography PDF ("צורת האותיות בכותרות לאתר"). Each array is in VISUAL (drawn) order —
// render with direction:ltr; unicode-bidi:bidi-override (see .swash-word) so the on-screen
// order matches the PDF exactly. Many codepoints are Oraita's Private-Use-Area swash variants
// (E000–E093); the standard letters stay in their normal Hebrew block. The real word is kept
// in a visually-hidden sibling (see SwashWord) for accessibility + SEO.
export const SWASH = {
  hero: [0xe002, 0xe06a, 0x05d9, 0x05d6, 0xe010, 0x05ea, 0xe029], // ותחזינה
  storyTitle: [0xe07a, 0x05e0, 0xe005, 0xe073, 0x20, 0xe007, 0x05d5, 0xe01d, 0x05d9, 0xe06b, 0xe002], // הסיפור שלנו
  founder: [0xe078, 0xe06b, 0x05d9, 0x05d9, 0xe032, 0x05d4, 0x20, 0xe007, 0xe000, 0xe093], // דבר המייסד
  yesod: [0xe001, 0xe05f, 0x05e1, 0xe012], // יסוד
  hadar: [0xe03c, 0xe001, 0xe05e], // הדר
  tiferet: [0xe008, 0xe072, 0x05d0, 0xe01d, 0x05ea], // תפארת
} as const;

export type SwashKey = keyof typeof SWASH;
