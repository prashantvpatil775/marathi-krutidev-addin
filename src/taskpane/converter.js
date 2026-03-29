/**
 * Unicode Devanagari (Hindi/Marathi) → Kruti Dev 010 converter
 * Ported from krutidev-converter by deepakkamboj
 *
 * Performance-optimized: regex patterns are pre-compiled once at module load,
 * and each mapping uses a single global regex replace (no while loops).
 */

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ═══════════════════════════════════════════════════════════════
// Mapping tables — built ONCE at module load, not per invocation
// ═══════════════════════════════════════════════════════════════
const array_one = [
  "'", "'", '"', '"', "(", ")", "{", "}", "=", "।", "?", "-", "µ", "॰", ",", ".", "् ",
  "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "x",
  "फ़्", "क़", "ख़", "ग़", "ज़्", "ज़", "ड़", "ढ़", "फ़", "य़", "ऱ", "ऩ",
  // Conjuncts (longer sequences first)
  "त्त्", "त्त", "क्त", "दृ", "कृ", "न्न",
  "ह्न", "ह्य", "हृ", "ह्म", "ह्र", "ह्", "द्द", "क्ष्", "क्ष", "त्र्", "त्र", "ज्ञ",
  "छ्य", "ट्य", "ठ्य", "ड्य", "ढ्य", "द्य", "द्व",
  "श्र", "ट्र", "ड्र", "ढ्र", "छ्र", "क्र", "फ्र", "द्र", "प्र", "ग्र", "रु", "रू",
  // Marathi-specific conjuncts with NG (ङ)
  "ङ्क", "ङ्ख", "ङ्ग", "ङ्घ", "ङ्म",
  // Conjuncts with ञ
  "ञ्च", "ञ्छ", "ञ्ज", "ञ्झ",
  "Z",
  "ओ", "औ", "आ", "अ", "ई", "इ", "उ", "ऊ", "ऐ", "ए", "ऋ",
  "क्", "क", "क्क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ्", "ङ",
  "चै", "च्", "च", "छ्", "छ", "ज्", "ज", "झ्", "झ", "ञ्", "ञ",
  "ट्ट", "ट्ठ", "ट्", "ट", "ठ्", "ठ", "ड्ड", "ड्ढ", "ड्", "ड", "ढ्", "ढ", "ण्", "ण",
  "त्", "त", "थ्", "थ", "द्ध", "द", "ध्", "ध", "न्", "न",
  "प्", "प", "फ्", "फ", "ब्", "ब", "भ्", "भ", "म्", "म",
  "य्", "य", "र", "ल्", "ल", "ळ्", "ळ", "व्", "व",
  "श्", "श", "ष्", "ष", "स्", "स", "ह",
  "ऑ", "ॉ", "ो", "ौ", "ा", "ी", "ु", "ू", "ृ", "े", "ै",
  "ं", "ँ", "ः", "ॅ", "ऽ", "् ", "्"
];

const array_two = [
  "^", "*", 'Þ', 'ß', "¼", "½", "¿", "À", "¾", "A", "\\", "&", "&", "Œ", "]", "-", "~ ",
  "å", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Û",
  "¶", "d", "[k", "x", "T", "t", "M+", "<+", "Q", ";", "j", "u",
  // Conjuncts
  "Ù", "Ùk", "ä", "–", "—", "Uu",
  "à", "á", "â", "ã", "ºz", "º", "í", "{", "{k", "«", "=", "K",
  "Nî", "Vî", "Bî", "Mî", "<î", "|", "}",
  "J", "Vª", "Mª", "<ªª", "Nª", "Ø", "Ý", "æ", "ç", "xz", "#", ":",
  // Marathi-specific conjuncts with NG
  "³~d", "³~[k", "³~x", "³~?k", "³~e",
  // Conjuncts with ञ
  "¥~p", "¥~N", "¥~t", "¥~>",
  "Z",
  "vks", "vkS", "vk", "v", "bZ", "b", "m", "Å", ",s", ",", "_",
  "D", "d", "ô", "[", "[k", "X", "x", "?", "?k", "³~", "³",
  "pkS", "P", "p", "N~", "N", "T", "t", "÷", ">", "¥~", "¥",
  "ê", "ë", "V~", "V", "B~", "B", "ì", "ï", "M~", "M", "<~", "<", ".", ".k",
  "R", "r", "F", "Fk", ")", "n", "/", "/k", "U", "u",
  "I", "i", "¶", "Q", "C", "c", "H", "Hk", "E", "e",
  "¸", ";", "j", "Y", "y", "G~", "G", "O", "o",
  "'", "'k", "\"", "\"k", "L", "l", "g",
  "v‚", "‚", "ks", "kS", "k", "h", "q", "w", "`", "s", "S",
  "a", "¡", "%", "W", "·", "~ ", "~"
];

// Pre-compile all regex patterns ONCE (huge perf win for repeated calls)
const compiled_patterns = array_one.map(pattern =>
  pattern ? new RegExp(escapeRegExp(pattern), 'g') : null
);

// ═══════════════════════════════════════════════════════════════

export function unicodeToKrutidev(text) {
  if (!text) return "";

  let s = text;

  // Normalize to NFC and strip invisible joiners
  s = s.normalize('NFC');
  s = s.replace(/[\u200B\u200C\u200D\uFEFF]/g, '');

  // ── Pre-processing: Replace rare nasals with anusvara ──
  // KrutiDev has no proper half-form glyphs for ङ, ञ
  s = s.replace(/ङ्(?=[कखगघङमयरलवशषसह])/g, 'ं');
  s = s.replace(/ञ्(?=[चछजझञ])/g, 'ं');

  // Pad for boundary safety
  s += '  ';

  // ── Step 1: Reposition ि (choti i) BEFORE consonant/conjunct ──
  // Uses array-based manipulation instead of repeated .replace() on full string
  let chars = Array.from(s);
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === 'ि' && i > 0) {
      // Swap ि with the consonant to its left
      const consonant = chars[i - 1];
      chars[i - 1] = 'f';
      chars[i] = consonant;

      // Walk backwards through conjunct (halant + consonant pairs)
      let pos = i - 1;
      while (pos >= 2 && chars[pos - 1] === '्') {
        // Swap "f" past the halant+consonant
        const half = chars[pos - 2];
        chars[pos - 2] = 'f';
        chars[pos - 1] = half;
        chars[pos] = '्';
        // chars[pos+1] stays as it was (the original consonant)
        pos -= 2;
      }
    }
  }
  s = chars.join('');

  // ── Step 2: Reposition र् (reph) AFTER consonant + matras ──
  const MATRAS = new Set([...'ािीुूृेैोौं:ँॅ']);
  let rPos = s.indexOf('र्');
  while (rPos > 0) {
    let end = rPos + 2; // character right after र्
    // Skip past all matras
    while (end < s.length && MATRAS.has(s.charAt(end + 1))) {
      end++;
    }
    const cluster = s.substring(rPos + 2, end + 1);
    s = s.substring(0, rPos) + cluster + 'Z' + s.substring(end + 1);
    rPos = s.indexOf('र्');
  }

  // Strip padding
  s = s.slice(0, -2);

  // ── Step 3: Apply mapping table (single global regex per entry) ──
  for (let i = 0; i < compiled_patterns.length; i++) {
    if (compiled_patterns[i]) {
      s = s.replace(compiled_patterns[i], array_two[i]);
    }
  }

  // Fallback: catch any remaining Devanagari virama
  s = s.replace(/\u094D/g, '~');

  return s;
}
