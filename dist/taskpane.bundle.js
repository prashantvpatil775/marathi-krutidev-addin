/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/taskpane/converter.js"
/*!***********************************!*\
  !*** ./src/taskpane/converter.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unicodeToKrutidev: () => (/* binding */ unicodeToKrutidev)
/* harmony export */ });
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var array_one = ["'", "'", '"', '"', "(", ")", "{", "}", "=", "।", "?", "-", "µ", "॰", ",", ".", "् ", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "x", "फ़्", "क़", "ख़", "ग़", "ज़्", "ज़", "ड़", "ढ़", "फ़", "य़", "ऱ", "ऩ",
// Conjuncts (longer sequences first)
"त्त्", "त्त", "क्त", "दृ", "कृ", "न्न", "ह्न", "ह्य", "हृ", "ह्म", "ह्र", "ह्", "द्द", "क्ष्", "क्ष", "त्र्", "त्र", "ज्ञ", "छ्य", "ट्य", "ठ्य", "ड्य", "ढ्य", "द्य", "द्व", "श्र", "ट्र", "ड्र", "ढ्र", "छ्र", "क्र", "फ्र", "द्र", "प्र", "ग्र", "रु", "रू",
// Marathi-specific conjuncts with NG (ङ)
"ङ्क", "ङ्ख", "ङ्ग", "ङ्घ", "ङ्म",
// Conjuncts with ञ
"ञ्च", "ञ्छ", "ञ्ज", "ञ्झ", "Z", "ओ", "औ", "आ", "अ", "ई", "इ", "उ", "ऊ", "ऐ", "ए", "ऋ", "क्", "क", "क्क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ्", "ङ", "चै", "च्", "च", "छ्", "छ", "ज्", "ज", "झ्", "झ", "ञ्", "ञ", "ट्ट", "ट्ठ", "ट्", "ट", "ठ्", "ठ", "ड्ड", "ड्ढ", "ड्", "ड", "ढ्", "ढ", "ण्", "ण", "त्", "त", "थ्", "थ", "द्ध", "द", "ध्", "ध", "न्", "न", "प्", "प", "फ्", "फ", "ब्", "ब", "भ्", "भ", "म्", "म", "य्", "य", "र", "ल्", "ल", "ळ्", "ळ", "व्", "व", "श्", "श", "ष्", "ष", "स्", "स", "ह", "ऑ", "ॉ", "ो", "ौ", "ा", "ी", "ु", "ू", "ृ", "े", "ै", "ं", "ँ", "ः", "ॅ", "ऽ", "् ", "्"];
var array_two = ["^", "*", 'Þ', 'ß', "¼", "½", "¿", "À", "¾", "A", "\\", "&", "&", "Œ", "]", "-", "~ ", "å", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Û", "¶", "d", "[k", "x", "T", "t", "M+", "<+", "Q", ";", "j", "u",
// Conjuncts
"Ù", "Ùk", "ä", "–", "—", "Uu", "à", "á", "â", "ã", "ºz", "º", "í", "{", "{k", "«", "=", "K", "Nî", "Vî", "Bî", "Mî", "<î", "|", "}", "J", "Vª", "Mª", "<ªª", "Nª", "Ø", "Ý", "æ", "ç", "xz", "#", ":",
// Marathi-specific conjuncts with NG
"³~d", "³~[k", "³~x", "³~?k", "³~e",
// Conjuncts with ञ
"¥~p", "¥~N", "¥~t", "¥~>", "Z", "vks", "vkS", "vk", "v", "bZ", "b", "m", "Å", ",s", ",", "_", "D", "d", "ô", "[", "[k", "X", "x", "?", "?k", "³~", "³", "pkS", "P", "p", "N~", "N", "T", "t", "÷", ">", "¥~", "¥", "ê", "ë", "V~", "V", "B~", "B", "ì", "ï", "M~", "M", "<~", "<", ".", ".k", "R", "r", "F", "Fk", ")", "n", "/", "/k", "U", "u", "I", "i", "¶", "Q", "C", "c", "H", "Hk", "E", "e", "¸", ";", "j", "Y", "y", "G~", "G", "O", "o", "'", "'k", "\"", "\"k", "L", "l", "g", "v‚", "‚", "ks", "kS", "k", "h", "q", "w", "`", "s", "S", "a", "¡", "%", "W", "·", "~ ", "~"];

// Pre-compile all regex patterns ONCE (huge perf win for repeated calls)
var compiled_patterns = array_one.map(function (pattern) {
  return pattern ? new RegExp(escapeRegExp(pattern), 'g') : null;
});

// ═══════════════════════════════════════════════════════════════

function unicodeToKrutidev(text) {
  if (!text) return "";
  var s = text;

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
  var chars = Array.from(s);
  for (var i = 0; i < chars.length; i++) {
    if (chars[i] === 'ि' && i > 0) {
      // Swap ि with the consonant to its left
      var consonant = chars[i - 1];
      chars[i - 1] = 'f';
      chars[i] = consonant;

      // Walk backwards through conjunct (halant + consonant pairs)
      var pos = i - 1;
      while (pos >= 2 && chars[pos - 1] === '्') {
        // Swap "f" past the halant+consonant
        var half = chars[pos - 2];
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
  var MATRAS = new Set(_toConsumableArray('ािीुूृेैोौं:ँॅ'));
  var rPos = s.indexOf('र्');
  while (rPos > 0) {
    var end = rPos + 2; // character right after र्
    // Skip past all matras
    while (end < s.length && MATRAS.has(s.charAt(end + 1))) {
      end++;
    }
    var cluster = s.substring(rPos + 2, end + 1);
    s = s.substring(0, rPos) + cluster + 'Z' + s.substring(end + 1);
    rPos = s.indexOf('र्');
  }

  // Strip padding
  s = s.slice(0, -2);

  // ── Step 3: Apply mapping table (single global regex per entry) ──
  for (var _i = 0; _i < compiled_patterns.length; _i++) {
    if (compiled_patterns[_i]) {
      s = s.replace(compiled_patterns[_i], array_two[_i]);
    }
  }

  // Fallback: catch any remaining Devanagari virama
  s = s.replace(/\u094D/g, '~');
  return s;
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/taskpane/taskpane.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./converter */ "./src/taskpane/converter.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

Office.onReady(function (info) {
  if (info.host === Office.HostType.Word) {
    document.getElementById("convertBtn").onclick = run;
  }
});
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var status, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          status = document.getElementById("status");
          status.className = "";
          status.innerText = "Converting…";
          _context2.p = 1;
          _context2.n = 2;
          return Word.run(/*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ctx) {
              var sel, src, converted;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    sel = ctx.document.getSelection();
                    sel.load("text");
                    _context.n = 1;
                    return ctx.sync();
                  case 1:
                    src = sel.text;
                    if (!(!src || !src.trim())) {
                      _context.n = 2;
                      break;
                    }
                    status.className = "error";
                    status.innerText = "⚠ Please select some Marathi text first.";
                    return _context.a(2);
                  case 2:
                    converted = (0,_converter__WEBPACK_IMPORTED_MODULE_0__.unicodeToKrutidev)(src);
                    sel.insertText(converted, Word.InsertLocation.replace);
                    sel.font.name = "Kruti Dev 010";
                    _context.n = 3;
                    return ctx.sync();
                  case 3:
                    status.className = "success";
                    status.innerText = "✓ Converted successfully!";
                  case 4:
                    return _context.a(2);
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
        case 2:
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t = _context2.v;
          console.error(_t);
          status.className = "error";
          status.innerText = "Error: " + _t.message;
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return _run.apply(this, arguments);
}
})();

/******/ })()
;
//# sourceMappingURL=taskpane.bundle.js.map