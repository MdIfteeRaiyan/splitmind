# SplitMind v1.1.3 beta — Appearance overlap fix

The screenshot showed the BDT badge painting above the open Appearance dropdown. The header previously shared stacking level 1 with the later main content. Its dropdown could not escape that parent stacking context, regardless of the dropdown's own z-index.

The header now owns a separate sticky layer at z-index 100. Main and footer stay below it. The dropdown has an opaque background and its own layer inside the header, with stable button positioning and focus outlines. Clicking outside or pressing Escape closes it; using its controls keeps it open. All previous release changes and deployment instructions are included.

Build and automated checks pass, including layer rules and inside/outside closing behavior. Real browser visual testing was not available; verify the open dropdown on your phone and desktop after deploying. This ZIP updates the source package and has not itself been deployed.
