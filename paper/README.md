# IEEE Paper – FusionDet: Overleaf Workflow Guide

This directory contains the skeleton `main.tex` for the FusionDet IEEE two-column
paper. The full paper is assembled page-by-page through a conversational workflow
described below.

---

## How responses are delivered

After each user prompt requesting a new paper section, the assistant returns a
**self-contained Overleaf-ready LaTeX code block** covering exactly one page in
IEEE two-column format. No LaTeX files are committed to this repository; all
generated content is delivered inline as a fenced code block (` ```latex `).

---

## How to integrate each page into `main.tex`

1. **Copy** the entire contents of the code block the assistant returns.
2. **Open** `paper/main.tex` in Overleaf (or your local LaTeX editor).
3. **Paste** the copied content into `main.tex` at the indicated insertion point:
   - Section content → paste **before** `\begin{thebibliography}`.
   - New `\bibitem` entries → paste **inside** the existing
     `\begin{thebibliography}…\end{thebibliography}` block, after the last
     existing entry.
4. **Compile** with *pdfLaTeX* (Overleaf default). All pages accumulate
   sequentially; page 1 through the most recently added page should render
   without errors.
5. **Repeat** from step 1 for each subsequent prompt / page.

> **Note on full-width tables:** Pages that contain a `table*` environment
> (e.g., the SOTA comparison table) will be automatically floated to the top of
> the current or next page by LaTeX—this is standard IEEE behaviour and does not
> indicate an error.

---

## Skeleton `main.tex`

A minimal `paper/main.tex` skeleton with the correct IEEE class, packages, and
placeholder `\begin{document}` / `\end{document}` markers is included in this
directory. Start Overleaf by uploading that file along with any figures placed
under `fig/`.

---

## Paper page map

| Prompt | Page | Section(s) |
|--------|------|-----------|
| 1 | 1 | Title, Abstract, Index Terms, §I Introduction |
| 2 | 2 | §I cont'd → §II Literature Review (Two-Stage & One-Stage) |
| 3 | 3 | §III Problem Formulation (BBox, IoU, Loss) |
| 4 | 4 | §IV-A/B Proposed Architecture block diagram & design rationale |
| 5 | 5 | §IV-C Module 1: CSP-Darknet Backbone, SiLU, SAM |
| 6 | 6 | §IV-D Module 2: BiPANet Neck, LCA, Cross-Scale Attention |
| 7 | 7 | §IV-E Module 3: Detection Head, CIoU Loss deep-dive |
| 8 | 8 | §V-A/B/C Datasets, Hardware/Software setup, Evaluation Metrics |
| 9 | 9 | §V-D Ablation Studies; §V-E SOTA Comparison |
| 10 | 10 | §VI Future Work; §VII Conclusion; References; Author Bio |
