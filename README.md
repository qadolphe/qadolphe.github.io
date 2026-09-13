# qadolphe.github.io

remote_theme: pages-themes/merlot@v0.2.0
plugins:
- jekyll-remote-theme # add this line to the plugins list if you already have one

my website

## Resume generator

The portfolio keeps resume-ready information in `assets/js/resume-data.js`. Each role and project in `index.html`
is associated with that data through a stable `data-resume-id` attribute.

- A normal click on **Resume** opens the current PDF.
- On larger screens, holding **Resume** for five seconds opens `resume-builder.html`; the hold state stays hidden for the first two seconds.
- The resume builder is disabled on mobile-sized screens in production, but remains available at every viewport size on localhost for development.
- Items marked `defaultSelected: true` reproduce the content of the current resume.
- The builder exports ATS-friendly plain text and LaTeX source, and offers a print-to-PDF action.

When adding a role, project, education item, or activity, add its complete resume record to `RESUME_DATA`. Add the
same ID to its portfolio element when that item is visible on the main page.
