import { Fragment as x, Transition as C, createCommentVNode as k, createElementBlock as u, createElementVNode as e, createTextVNode as P, createVNode as f, onMounted as V, openBlock as c, reactive as L, ref as p, renderList as G, toDisplayString as w, unref as _, vModelCheckbox as N, vModelText as T, withCtx as M, withDirectives as g } from "vue";
import { FontAwesomeIcon as U } from "@fortawesome/vue-fontawesome";
import { faCopy as A } from "@fortawesome/free-solid-svg-icons";
var F = (n, l) => {
  const s = n.__vccOpts || n;
  for (const [i, a] of l) s[i] = a;
  return s;
}, S = { class: "password-generator-card mx-auto text-bg-dark p-5" }, j = { class: "form-group position-relative mb-4" }, B = { class: "input-group" }, D = ["value"], E = ["disabled"], I = {
  key: 0,
  class: "password-copied-badge"
}, z = { class: "form-group mb-4 d-flex flex-column justify-content-center align-items-center" }, O = { class: "psw-length-label d-flex justify-content-between align-items-center" }, R = { class: "badge fs-6" }, Z = { class: "form-group mb-4" }, $ = { class: "options-grid" }, q = ["id", "onUpdate:modelValue"], H = ["for"], J = {
  __name: "PasswordGenerator",
  props: { initialLength: {
    type: Number,
    default: 16
  } },
  setup(n) {
    const l = p(n.initialLength), s = p(""), i = p(!1), a = L({
      letters: !0,
      numbers: !0,
      symbols: !0
    }), h = {
      letters: "Letters (A-Z, a-z)",
      numbers: "Numbers (0-9)",
      symbols: "Symbols (!$@#%&?^)"
    }, m = {
      letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!$@#%&?^"
    }, v = () => {
      i.value = !1;
      let o = "";
      if (a.letters && (o += m.letters), a.numbers && (o += m.numbers), a.symbols && (o += m.symbols), o.length === 0) {
        s.value = "";
        return;
      }
      const t = new Uint32Array(l.value);
      window.crypto.getRandomValues(t);
      let d = "";
      for (let r = 0; r < l.value; r++) d += o[t[r] % o.length];
      s.value = d, b();
    }, b = async () => {
      if (s.value)
        try {
          await navigator.clipboard.writeText(s.value), i.value = !0, setTimeout(() => {
            i.value = !1;
          }, 2e3);
        } catch (o) {
          console.error("Failed to copy!", o);
        }
    };
    return V(v), (o, t) => (c(), u("section", S, [
      e("div", j, [t[2] || (t[2] = e("label", {
        for: "newPassword",
        class: "form-label d-inline-block"
      }, "Generated password", -1)), e("div", B, [
        e("input", {
          type: "text",
          class: "form-control text-white border-secondary",
          id: "newPassword",
          disabled: "",
          value: s.value
        }, null, 8, D),
        e("button", {
          class: "btn btn-copy fw-bold",
          onClick: b,
          disabled: !s.value
        }, [f(_(U), { icon: _(A) }, null, 8, ["icon"]), t[1] || (t[1] = P(" Copy ", -1))], 8, E),
        f(C, { name: "fade" }, {
          default: M(() => [i.value ? (c(), u("div", I, "Copied! ")) : k("", !0)]),
          _: 1
        })
      ])]),
      e("div", z, [e("div", O, [t[3] || (t[3] = e("label", {
        for: "passwordLength",
        class: "form-label"
      }, "Length", -1)), e("span", R, w(l.value), 1)]), g(e("input", {
        type: "range",
        class: "form-range mt-2",
        id: "passwordLength",
        min: "6",
        max: "255",
        "onUpdate:modelValue": t[0] || (t[0] = (d) => l.value = d)
      }, null, 512), [[
        T,
        l.value,
        void 0,
        { number: !0 }
      ]])]),
      e("div", Z, [t[4] || (t[4] = e("label", { class: "d-block form-label mb-3" }, " Characters to include ", -1)), e("div", $, [(c(!0), u(x, null, G(a, (d, r) => (c(), u("div", {
        class: "form-check form-switch",
        key: r
      }, [g(e("input", {
        class: "form-check-input",
        type: "checkbox",
        role: "switch",
        id: r,
        "onUpdate:modelValue": (y) => a[r] = y
      }, null, 8, q), [[N, a[r]]]), e("label", {
        class: "form-check-label",
        for: r
      }, w(h[r]), 9, H)]))), 128))])]),
      e("div", { class: "text-center" }, [e("button", {
        class: "btn btn-generate fw-bold w-100 py-3",
        onClick: v
      }, " Generate Password ")])
    ]));
  }
}, K = /* @__PURE__ */ F(J, [["__scopeId", "data-v-9f432bf3"]]), Y = { install: (n) => {
  n.component("PasswordGenerator", K);
} };
export {
  K as PasswordGenerator,
  Y as default
};
