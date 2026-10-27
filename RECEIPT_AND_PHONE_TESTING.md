# Receipt and phone testing

## Configure optional AI

The public preview needs a server-side `OPENAI_API_KEY` and a private `DEMO_ACCESS_CODE`. Configure these in the hosting project's environment-variable settings and redeploy. `OPENAI_MODEL` is optional; the default model is in the README. Do not put the API key into page fields, a public repository, screenshots or chat. The page's access-code field is for the demo code only. API use may incur charges. Because this preview is public, restrict the code and monitor provider usage.

## Real receipt checks

Use several real Bangladeshi receipts that you have permission to use. Remove sensitive account numbers before sharing. Test different stores, Bangla/English numerals, crumpled and low-light photos, clear and unclear BDT symbols, VAT, service charges, discounts and multiple totals. Each photo must be JPEG, PNG or WebP under 3 MB.

1. Record the independently verified final payable total and whether VAT or service charges are already included.
2. Select the payer and participants, choose Read bill with AI, and compare the proposed final total and description with the original. Check currency, payer, participants and any uncertainty. Edit the draft before settlement.
3. If the amount is unclear, ensure no guessed bill is added; use manual entry. Record pass/fail and error type. Do not infer accuracy from one successful receipt.

This version reads a proposed final total; it does not expose merchant, item lines, subtotal, VAT or service charge as separately extracted editable fields. Those fields cannot yet be validated independently in the app.

## Phone walkthrough

Ask consenting testers on Android Chrome and iPhone Safari to complete a trip without coaching. Use fictional names and amounts. Observe whether each can add people, add and review bills, use custom shares, record a partial payment, copy a remaining plan, save/restore locally, and understand what remains on one device. Then test a permitted receipt if AI is configured. Record device, browser, steps, problems, consent and outcome without collecting private data unnecessarily. Desktop/browser emulation is not a substitute for real people using phones.

For a demo, see TRIP_DEMO.md. Payment methods are instructions only: no transfer is initiated or verified.
