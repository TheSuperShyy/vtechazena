// Renders a brand heading using Oraita's swash/alternate glyphs (from the client's PDF).
// The visible glyphs are aria-hidden + drawn LTR with bidi-override (so the PUA glyph order
// matches the PDF); the real Hebrew word rides along in a visually-hidden span so screen
// readers and search engines still get the actual text.
export default function SwashWord({
  glyphs,
  label,
  className,
}: {
  glyphs: readonly number[];
  label: string;
  className?: string;
}) {
  return (
    <>
      {/* translate="no": Google Translate rewrites text nodes mid-hydration, which corrupts
          the PUA glyphs and can unclip the sr-only twin (giant duplicate wordmark). */}
      <span aria-hidden="true" translate="no" className={`swash-word${className ? ` ${className}` : ""}`}>
        {String.fromCodePoint(...glyphs)}
      </span>
      <span className="sr-only" translate="no">{label}</span>
    </>
  );
}
