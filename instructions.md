
You are an expert website designer, UX copywriter and front-end engineer. Create a visually distinctive, polished, **single-page lead-generation website** for a client whose business information I will provide in attached images.

Deliver the **complete source code**, ready to commit to Git and deploy later—not just a design concept or implementation plan.

### 1. Client information and accuracy

Review the attached images and extract the client’s:
- Business name, branding and contact details.
- Products, services and differentiators.
- Target customers and geographical service areas.
- Any other information relevant to generating enquiries.

Treat these images as the source of truth. Do not invent credentials, years of experience, performance claims, testimonials, customer logos, addresses or guarantees.

If information is unclear, ask only questions essential to proceeding. For non-essential gaps, use clearly labelled placeholders and list them in the README. Do not expose internal placeholder notes in customer-facing copy.

### 2. Reference and visual direction

Use this website as visual inspiration:
https://www.windowmagicindia.com/varient2.html

Focus on its **colours, typography, layout and imagery**, while creating an original design tailored to this client.

- Do not clone its layout section by section or copy its text, code, images or distinctive brand assets.
- Use the client’s branding where available, adapting the reference’s visual principles rather than imposing a conflicting identity.
- If you cannot access the reference, explicitly say so and ask for screenshots. Do not pretend to have inspected it.
- Use supplied photographs where appropriate. Otherwise, use properly licensed assets or clearly documented image placeholders; do not scrape imagery from the reference website.

The result should feel professionally art-directed: confident typography, thoughtful spacing, balanced layouts, cohesive colours and strong imagery. Avoid a generic template appearance, excessive animation and unnecessary decorative effects.

### 3. Page structure and conversion goals

Build **one complete landing page with a strong hero section**, not a hero-only screen.

The primary objective is **lead generation**, whether through the enquiry form, phone or WhatsApp, where verified contact details are available.

Choose sections based on the supplied information. A suitable structure could include:
1. Header with the client’s branding, anchor navigation and a prominent enquiry CTA.
2. Hero with a clear value proposition, relevant imagery and a primary CTA leading to the enquiry form.
3. Products or services.
4. Reasons to choose the business, supported by verified information.
5. Relevant project imagery or applications, if suitable assets are available.
6. A **“Get in touch”** enquiry form and available direct contact options.
7. Footer with verified business details and useful navigation.

Omit sections that lack supporting content rather than filling them with invented claims. Ensure primary CTAs consistently direct visitors towards making an enquiry.

### 4. Copywriting

Write natural, specific, human-sounding copy in **English (UK)**.

- Explain what the business offers, who it serves and how visitors can take the next step.
- Keep headlines clear and supporting text concise.
- Avoid robotic phrasing, keyword stuffing, exaggerated promises and generic marketing clichés.
- Use genuine trust signals only when supported by the attachments.

### 5. Technical implementation

Keep the implementation as simple as practical. **Default to semantic HTML, modern CSS and vanilla JavaScript**, unless a clear requirement justifies another approach.

- Avoid unnecessary frameworks, dependencies and build tooling.
- Organise the code and assets into a straightforward, maintainable project structure.
- Use relative asset paths suitable for static hosting.
- Include responsive layouts for mobile, tablet and desktop.
- Make navigation, anchor links, mobile menus and other included interactions work.
- Use accessible labels, visible keyboard focus, sufficient contrast and reduced-motion support.
- Optimise images, specify image dimensions where practical and lazy-load below-the-fold imagery.
- Include appropriate metadata, semantic headings and a favicon if a suitable brand asset is available.
- Do not add unsupported structured-data claims, tracking scripts or unnecessary third-party embeds.

### 6. “Get in touch” form

Build a polished front-end form. **Its backend integration will be added later.**

Use only useful fields, such as:
- Name.
- Email and/or telephone number.
- Product or service of interest, if relevant.
- Message.

Provide accessible client-side validation and clear error states.

**Do not simulate successful delivery or imply that an enquiry has been sent.** Until a backend is connected, clearly explain that submissions are not yet enabled, preserve entered data and avoid transmitting or persistently storing it.

Keep the submission logic isolated and document where a future endpoint should be connected. Do not add a non-functional consent checkbox or promise a response time without supporting information.

### 7. Deliverables

Provide:
- A brief summary of the extracted client information and chosen design direction.
- The project file tree.
- **Complete contents of every source file**, without omitted sections, pseudocode or “implement later” comments for required front-end features.
- An organised assets folder with supplied or appropriately sourced assets, where the environment supports file creation.
- A `.gitignore` appropriate to the project.
- A `README.md` explaining:
  - How to preview the site locally.
  - How to deploy it to a static hosting provider.
  - How to connect the form backend later.
  - Image sources and any licensing requirements.
  - Any missing assets, placeholders or configuration.
  - A concise pre-launch checklist.

If your environment supports creating files, create the complete project directly. Otherwise, provide each file in a clearly labelled code block.

### 8. Final quality check

Before delivering, check for horizontal overflow, broken links, missing assets, inconsistent spacing, unreadable text over images, keyboard-access issues and misleading form behaviour.

Report what you actually tested and identify anything you could not verify. Aim for production-quality front-end code, while clearly distinguishing it from a fully launch-ready website until the form backend, final assets and business details are confirmed.

**Proceed with the implementation once the attached materials provide enough information. Do not stop at a proposal or request approval for routine design decisions.**