# Object Detection Paper — LaTeX Source

**Title:** Balancing Speed and Precision: The Evolution and Future of Object Detection

This directory contains the IEEE double-column conference paper source.
The content is organized into one file per logical page so that each
section can be written, reviewed, and version-controlled independently.

---

## Directory structure

```
paper/
├── main.tex            # Root document — compile this file
├── README.md           # This file
└── pages/
    ├── page01.tex      # Title, Abstract, Section I: Introduction
    ├── page02.tex      # Section II: Related Work — Classical methods
    ├── page03.tex      # Section II: Related Work — Deep learning detectors
    ├── page04.tex      # Section III: FusionDet — Backbone
    ├── page05.tex      # Section III: FusionDet — Neck
    ├── page06.tex      # Section III: FusionDet — Label assignment
    ├── page07.tex      # Section III: FusionDet — Detection head & loss
    ├── page08.tex      # Section IV: Experimental setup & metrics
    └── page09.tex      # Section IV: Ablation studies & SOTA comparison
```

---

## Prerequisites

Install a TeX distribution that includes `pdflatex` and the IEEEtran class:

| Platform | Distribution |
|---|---|
| Linux (Debian/Ubuntu) | `sudo apt install texlive-full` |
| macOS | [MacTeX](https://www.tug.org/mactex/) |
| Windows | [MiKTeX](https://miktex.org/) or [TeX Live](https://www.tug.org/texlive/) |

Verify the IEEEtran class is installed:

```bash
kpsewhich IEEEtran.cls
```

---

## Compiling

Run `pdflatex` **twice** (so that cross-references and citations are
resolved) followed by `bibtex` if you switch to an external `.bib` file:

```bash
cd paper
pdflatex main.tex
pdflatex main.tex        # second pass resolves \ref and \cite
```

The compiled PDF will be written to `paper/main.pdf`.

### One-liner

```bash
cd paper && pdflatex main.tex && pdflatex main.tex
```

### With latexmk (recommended)

`latexmk` automates multi-pass compilation and bibliography processing:

```bash
cd paper
latexmk -pdf main.tex
```

To continuously rebuild on file changes (useful during writing):

```bash
latexmk -pdf -pvc main.tex
```

---

## Adding a new page

1. Create a new file `paper/pages/pageNN.tex` (replace `NN` with the
   two-digit page number, e.g., `page10.tex`).
2. Write your LaTeX content in that file — **do not** include a
   `\documentclass`, `\begin{document}`, or `\end{document}` directive;
   those live only in `main.tex`.
3. Open `main.tex` and add an `\input` line at the appropriate position
   in the document body, before `\begin{thebibliography}`:

   ```latex
   \input{pages/page10}   % Section V: Future Work
   ```

4. If your new page introduces new references, append the corresponding
   `\bibitem` entries to the `thebibliography` block in `main.tex`.
5. Recompile: `latexmk -pdf main.tex` (or the two-pass `pdflatex`
   sequence above).

---

## Editing author information

The author block is in `main.tex` inside the `\author{...}` command.
Replace the placeholder names, departments, universities, and email
addresses with the actual authors' details.

---

## Figures and tables

Place figure files (PDF, EPS, or PNG preferred) in a `paper/figures/`
subdirectory and reference them with:

```latex
\begin{figure}[!t]
  \centering
  \includegraphics[width=\columnwidth]{figures/architecture.pdf}
  \caption{FusionDet architecture overview.}
  \label{fig:architecture}
\end{figure}
```

---

## Notes

- The bibliography is currently embedded directly in `main.tex` using
  the `thebibliography` environment.  To switch to BibTeX, replace
  the environment with `\bibliography{references}` and move all
  `\bibitem` entries to `references.bib`.
- All equations are numbered sequentially across pages because all
  `\input` files share the same LaTeX counter state.
- The `IEEEtran` class handles two-column layout, font sizes,
  and section formatting automatically — do not override these
  with manual `\vspace`, `\hspace`, or font-size commands.
