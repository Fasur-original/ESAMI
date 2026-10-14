## DO THIS FIRST
**Invoke 'frontend-design' skill before generating any code.** Do it every
time you want to code front-end. In every session. Never skip this step.

- The folder @web_design_references contains visual references I want
you to use when creating web pages
- The page I want worked one will be mentioned don't go ahead to design a page that you haven't been directed to design.
- If you see images in this folder: match layout structure, colors, spacing,
typography choices from the provided examples when coding our web page.
- If no reference images are provided: design from scratch, following the
rules provided below in the ‘Anti-Generic Design Guardrails’ section
- When you finish coding the referenced page, capture a page screenshot of the page
you’ve generated and compare it against the references provided in the folder
@web_design_references. Find and fix any mismatches. Do at least two rounds of
comparison and fix. Keep all screenshots you capture in the folder @screenshots

## Anti-Generic Design Guardrails 

- **Colors:** Never use default Tailwind palette (`blue-500`, `indigo-600`,
 etc.). Always define and use custom design tokens from `tailwind.config`
 (e.g. `brand.primary`). Avoid raw hex values in JSX.

- **Typography:** Never use a single font (`font-sans`) everywhere. 
Pair fonts intentionally (`font-display` for headings, `font-body` for text).
Apply tight tracking (`tracking-[-0.03em]`) for headings and generous
line-height (`leading-[1.7]`) for body text.

- **Shadows:** Never use default utilities like `shadow-md` or `shadow-lg`.
 Use layered, color-tinted shadows defined in the theme.

- **Gradients & backgrounds:** Avoid flat fills (`bg-white`, `bg-gray-100`).
 Use layered gradients, overlays, or subtle textures.
Prefer custom gradients via arbitrary values instead of Tailwind presets.

- **Animations:** Never use `transition-all`. Only animate `transform`
and `opacity`. Use explicit utilities (`transition-transform`,
`transition-opacity`) and controlled durations. Prefer spring-like
motion when using animation libraries.

- **Component styling:** Avoid long, unstructured className strings
in TSX. Extract reusable components and variants. Use composition
patterns (`clsx`, `cva`) instead of duplicating styles.

- **Interactive states:** Every interactive element must include `hover`,
`focus-visible`, and `active` states. No exceptions.

- **Images:** Never use raw images without treatment. Always add overlays
(e.g. gradient), blending, or color tint to integrate them into the design.

- **Spacing & layout:** Avoid inconsistent spacing. Use a consistent
spacing scale (`px-6`, `py-12`, `gap-4`). Prefer grid-based layouts
over ad-hoc stacking.

- **Anti-patterns:** Avoid generic UI patterns like `bg-white + shadow-md +
rounded-lg`, default Tailwind look, missing states, or flat,
depth-less layouts.

- In this project the brand color is `#09263B`, `#C18A3A`, `#FFFFFF`

## Note:

- That we are going to component based design and we want to avoid the creation of duplicates, so all components made must lie in the components folder of the app (create if it doesn't exist).

- The app needs to be typed because we need to prevent type errors, so we will be using type script in this application and not plain javascript.

- Ensure state is management properly.

- Prevent over piging the backend