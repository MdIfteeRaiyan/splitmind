# SplitMind v1.6 beta — fit and mobile navigation

Corrected the decorative StarBorder canvas width so its trail fits the button instead of being displaced. A small mobile menu opens the existing help, about, tools and privacy sections; the desktop header remains compact. User-provided phone-shaped mobile-wallet numbers open the phone dialer and email-shaped other-wallet references open the email app. SplitMind still does not initiate payments; bank and cryptocurrency references are not treated as phone numbers. No public contact details were invented.

The app has a favicon, metadata, responsive layouts, a custom 404 page and local image compression. External links can change; user-provided payment destinations are not verified by the app. Automated checks do not replace real-device testing. The public preview does not include AI credentials or live payment processing.

# SplitMind v1.5 beta — subtle motion

The supplied GradientASCII component adds a low-intensity background. The supplied StarBorder adds a decorative border to the main Group, Add bill and Continue to settlement buttons. These remain native controls; the visual effect does not take clicks. Effects can be disabled in Appearance, respect reduced-motion settings, stop while the page is hidden, and retain static fallbacks if WebGL is unavailable. Existing expense, receipt, sharing and payment behavior is unchanged.

Source from the user-supplied React Bits snippets is preserved in ui/components and hashed in ADDED_PROVENANCE.json. The code and dependencies are included in this package.

# SplitMind v1.4 beta

- Choose equal shares or exact custom BDT amounts for each selected participant. The sum must equal the total to the poisha. Custom values are retained in optional local draft saves and are included in ledger export.
- Manual partial payment records recalculate the remaining settlement. A fictional trip example demonstrates the flow.
- AI receipt reading is available only after server-side provider configuration and remains untested with live local receipts. The current feature extracts a proposed final total rather than merchant, item lines, tax and service charges as separate fields. Verify against the original receipt; use manual entry if unclear. No API keys are bundled.
- Drafts stay in one browser and do not synchronize across devices. Actual payments happen outside SplitMind, and its records do not verify them.
- See TRIP_DEMO.md and RECEIPT_AND_PHONE_TESTING.md for test instructions. No real-user or real-receipt testing is claimed.
