// Tweaks for the Tenn Renovation homepage.
// The page is static HTML; this React root renders ONLY the panel and applies
// each tweak by writing to CSS variables / element text on the live DOM.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#ecbe3a", "#cf9c1f"],
  "heroTitle": "Interiors built to last a generation.",
  "ctaLabel": "Browse portfolio",
  "yearsStat": "25",
  "homesStat": "300+"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const root = document.documentElement;
  if (Array.isArray(t.accent)) {
    root.style.setProperty('--brass', t.accent[0]);
    root.style.setProperty('--brass-d', t.accent[1]);
  }
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('heroTitle', t.heroTitle);
  set('heroCtaLabel', t.ctaLabel);
  set('badgeYears', t.yearsStat);
  set('statYears', t.yearsStat + ' yrs');
  set('statHomes', t.homesStat);
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Brand" />
      <TweakColor
        label="Accent"
        value={t.accent}
        options={[
          ['#ecbe3a', '#cf9c1f'],
          ['#e02226', '#bd1a1e'],
          ['#050869', '#1a1f4a'],
          ['#9b6543', '#7a4a2c']
        ]}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Hero" />
      <TweakText
        label="Headline"
        value={t.heroTitle}
        onChange={(v) => setTweak('heroTitle', v)}
      />
      <TweakText
        label="Button label"
        value={t.ctaLabel}
        onChange={(v) => setTweak('ctaLabel', v)}
      />

      <TweakSection label="Stats" />
      <TweakText
        label="Years"
        value={t.yearsStat}
        onChange={(v) => setTweak('yearsStat', v)}
      />
      <TweakText
        label="Ambience customers"
        value={t.homesStat}
        onChange={(v) => setTweak('homesStat', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
