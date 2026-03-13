# FusionDet — IEEE LaTeX Article (Page-by-Page Workflow)

This directory contains a complete, compilable **IEEE IEEEtran
double-column conference article** for the *FusionDet* dual-backbone
object detection system. The article is split into individual page
files so each page can be authored, reviewed, and iterated
independently before being assembled into the final PDF.

---

## Directory structure

```
latex/
├── main.tex            ← Master file; includes all pages & bibliography
└── pages/
    ├── page01.tex      ← Front matter: title, authors, abstract, keywords
    ├── page02.tex      ← Introduction
    ├── page03.tex      ← Literature Review (Related Work)
    ├── page04.tex      ← Problem Formulation & Proposed Architecture
    ├── page05.tex      ← Module 1 – Feature Extraction Backbone
    ├── page06.tex      ← Module 2 – Feature Fusion & Attention (Neck)
    └── page07.tex      ← Module 3 – Detection Head & Loss Functions
```

---

## Compilation

### Option A — Overleaf (recommended for beginners)

1. Zip the entire `latex/` folder:
   ```
   zip -r fusiondet.zip latex/
   ```
2. Log in to [Overleaf](https://www.overleaf.com) and click
   **New Project → Upload Project**.
3. Upload `fusiondet.zip`.
4. Overleaf will automatically detect `main.tex` as the root file.
5. Click **Recompile** — the PDF appears in the right panel.

### Option B — Local compilation (TeX Live / MiKTeX)

Requires a TeX distribution with at least the following packages
(all included in a standard TeX Live installation):

| Package | Purpose |
|---|---|
| `IEEEtran` | IEEE conference document class |
| `amsmath`, `amssymb` | Mathematics |
| `mathtools` | Extended math tools |
| `bm` | Bold math symbols |
| `tikz` + libraries | Architecture diagrams (no external images needed) |
| `algorithm`, `algpseudocode` | Algorithm pseudocode |
| `booktabs` | Professional table rules |
| `hyperref` | Clickable cross-references |
| `cite` | Compressed sorted citations |
| `microtype` | Micro-typography improvements |

Run **two passes** to resolve cross-references:

```bash
cd latex/
pdflatex main.tex
pdflatex main.tex
```

The output file is `main.pdf`.

> **Tip:** If you use `bibtex`, the bibliography in `main.tex` uses
> `\begin{thebibliography}` (manual entries) so no `.bib` file is
> needed.

---

## Adding a new page

1. Create `latex/pages/page08.tex` (or any filename).
2. Write your content as normal LaTeX — no
   `\begin{document}`/`\end{document}` wrapper needed; just
   sections, equations, figures, and tables.
3. Open `main.tex` and add:
   ```latex
   \input{pages/page08}
   ```
   in the correct position (before `\begin{thebibliography}`).
4. Append any new `\bibitem` entries to the bibliography block in
   `main.tex`.
5. Recompile twice.

### Page content template

```latex
% ============================================================
% PAGE N — Short description
% ============================================================

\section{Section Title}
\label{sec:yourlabel}

Your text here.

\begin{equation}
  E = mc^{2}
  \label{eq:einstein}
\end{equation}
```

---

## Page content map

| File | Content |
|---|---|
| `page01.tex` | Title, authors (placeholders), abstract (~250 words), keywords |
| `page02.tex` | Introduction: motivation, problem statement, contributions, paper outline |
| `page03.tex` | Literature Review: two-stage detectors, one-stage/anchor-free, FPN/neck designs, ViT, hybrid architectures |
| `page04.tex` | Problem formulation (detection as regression), FusionDet overview diagram (TikZ), Adaptive Feature Fusion (AFF) module |
| `page05.tex` | Module 1: CSP-Darknet backbone, SiLU activation, Spatial Attention Module (SAM) |
| `page06.tex` | Module 2: BiPANet neck, Lightweight Channel Attention (LCA), cross-scale transformer attention |
| `page07.tex` | Module 3: Decoupled detection head, anchor-free assignment, CIoU loss, Varifocal Loss, objectness loss |

---

## Diagrams

All diagrams are produced with **TikZ** — no external image files are
required. The architecture overview on page 4 (`fig:arch_overview`)
uses the `shapes.geometric`, `arrows.meta`, `positioning`, and
related TikZ libraries, which are loaded in `main.tex`.

---

## Customization

- **Replace placeholder author names** in `pages/page01.tex`.
- **Add or replace sections** by editing the corresponding page file.
- **Adjust equation numbering** — equations are numbered
  automatically by LaTeX; cross-references use `\label`/`\ref`.
- **Extend the bibliography** — add `\bibitem` entries to the
  `\begin{thebibliography}` block in `main.tex`.

---

## License

This template and all original text are released under the
[MIT License](../LICENSE). The IEEEtran document class is governed by
its own license (LPPL); see the class documentation for details.
