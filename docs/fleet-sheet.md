# Fleet sheet: how it works

The Fleet page (`/fleet`), the homepage "The Collective" carousel and every `/fleet/<id>` page are built from one Google Sheet. The site downloads the sheet's published CSV (`FLEET_SHEET_CSV_URL`) and refreshes it every 5 minutes (`lib/data/yachts.ts`).

## Public vs private columns

One row per yacht. The sheet has two groups of columns:

| Group | Columns | On the website? |
| --- | --- | --- |
| **Public** | `id, name, tagline, category, location, lengthFt, guests, cabins, crew, rateFrom, description, highlights, amenities, images, published, order, gradient` | Yes |
| **Private (back office)** | `originalName, owner, ownerWebsite, ownerContact, ownerConfidence, ownerNotes, cost, costNotes, listedOn, reviewNotes` | **No, never** |

How the private columns are kept off the site:

- `lib/data/sheet.ts` builds each `Yacht` from an explicit list of public columns (`PUBLIC_COLUMNS`). The type has no field for private data, so no page or component can render it. Never spread a raw sheet record into a `Yacht`.
- Private columns are only ever read as part of the CSV text on the server; nothing is passed to the browser.
- I verified this by building the site against the full CSV (private columns included) and scanning every file in `.next` for owner names, contacts, costs, and original yacht names. There were no hits.

**Caveat on publishing.** "Publish to web" makes the *whole tab* a public CSV link, including the private columns. The site code is safe either way, but anyone who has the published link can read the raw CSV. If that matters, either (a) move the private columns to a second tab and publish only the public tab (the site reads only the published tab), or (b) keep the CSV link secret and never paste it anywhere public. Option (a) is the safer route.

## Column guide (public)

| Column | Notes |
| --- | --- |
| `id` | Slug of `name` (`Lagoon 62` gives `lagoon-62`, the page URL). Must be unique. Duplicates are skipped by the site. |
| `name` | **Model + length** (e.g. `Lagoon 62`, `Leopard 51`). If the model is unknown, category + length (`Motor Yacht 47`). Same model and length gets a numeral suffix (`Lagoon 40`, `Lagoon 40 II`, `Lagoon 40 III`). |
| `tagline` | Short line shown on the card. |
| `category` | `Catamaran`, `Motor Yacht`, `Superyacht`, `Fishing Boat`, `Sailing Yacht`. The Fleet page filter chips come from these values. |
| `location` | Home marina. |
| `lengthFt`, `guests`, `rateFrom` | **Required numbers.** Rows missing any are skipped. |
| `cabins`, `crew` | Optional. Blank means "unknown"; the site hides them. |
| `description`, `highlights`, `amenities` | Plain text; `highlights` and `amenities` are one item per line inside the cell. |
| `images` | One path/URL per line. First image is the card cover. |
| `published` | `TRUE`/`FALSE`. Blank counts as shown. |
| `order` | Display order (1 first) and the "Recommended" sort on the Fleet page. Currently ranked by how luxurious / well kept each yacht looks: original three first, newest and largest next, older or plainer boats lower, Republic of Singapore Yacht Club boats last. See "Changing the Recommended order" below for an easy way to edit this. |
| `gradient` | Fallback background when there are no photos (`navy`, `charcoal`, `midnight`). |

### Copy style

Taglines, descriptions, highlights and amenities share one structure so the fleet reads consistently:

- **Description:** opening line (size + type), one line of what is onboard, one line of who it suits (by guest count).
- **Highlights:** up to 5 bullets: size and capacity, up to two standout features, skyline cruise (if offered), home marina, best-for line.
- **Amenities:** a fixed vocabulary (e.g. `Air-conditioned saloon`, `Open-air jacuzzi`, `Karaoke system`, `Kayaks`, `Stand-up paddleboards`), always starting with `Professional captain and crew`. Items were included only when a broker's amenity list or description for that yacht mentioned them.
- The three yachts that were already on the site (**Lagoon 62**, **Ferretti 60**, **Horizon 105**) kept their hand-written copy, photos and public price.

## Column guide (private)

| Column | Notes |
| --- | --- |
| `originalName` | The yacht's own name as listed on broker sites (Anka, Jyohana, MnF...). |
| `owner`, `ownerWebsite`, `ownerContact`, `ownerNotes` | First-party owner/operator found through web search, with evidence URLs in `ownerNotes`. "Broker only" means no owner was found, only resellers. |
| `ownerConfidence` | `high` (first-party page names the yacht), `medium` (credible third party), `low` (inference), `none`. **Verify before contacting.** |
| `cost` | Lowest price seen across brokers for a 4-hour weekday charter, in S$. |
| `costNotes` | How `cost` was derived and its caveats. |
| `listedOn` | Per-broker price list for the yacht. |
| `reviewNotes` | Open questions: possible duplicates, conflicting specs, missing photos. |

### Pricing policy used (change as you see fit)

- `cost` = the **lowest** "from" price any broker lists (4 hours, weekday). Brokers include different guest counts and GST treatment, so this is a starting point, not a quote.
- Public `rateFrom` = the **highest** listed broker price rounded up to S$10, **then +20%**, rounded to S$10, **then +9%**, rounded to S$10 (the original three yachts had the same +20% and +9% applied to their previous site price). The +9% matches the uplift applied in the client brochures. This is a placeholder; set your own margin per yacht.
- **Real owner pricing overrides the broker estimate above.** When a direct owner rate card (brochure, PDF or the owner's own website) is obtained, `cost` becomes the owner's GST-inclusive weekday 4-hour base rate (add GST first if the owner's price excludes it), `costNotes` records the full weekday/weekend/PH/additional-guest/additional-hour breakdown and the source, and `listedOn`/`reviewNotes` note that it supersedes the broker estimate. Public `rateFrom` = that cost **+30% markup**, rounded to S$10. Done for **Mikanna / Leopard 47** (owner brochure, Nov 2026), **SunLight / Lagoon 38** (whitesails.com.sg, Nov 2026) and **Ocean Diva / Lagoon 45 III** ("Ocean Diva Brochure2026.pdf", Nov 2026) — see each row's `costNotes` for the full rate card and client brochures for the client-facing version.

## Photos

Photos were downloaded into `public/images/yachts/<id>/01.jpg, 02.webp...` from the broker listings (roughly 1,470 files, about 310 MB). **Review them and delete what you don't want.** Many are the brokers' own branded or watermarked images, and you need permission before publishing someone else's photos.

After deleting files, regenerate the `images` column:

```bash
node scripts/fleet-images-column.mjs          # human-readable
node scripts/fleet-images-column.mjs --csv    # id,images CSV
```

Paste each yacht's list into the `images` column. Folders that end up empty show the gradient fallback. For deployment size, consider compressing or hosting kept photos on a CDN.

## Changing the Recommended order

The Fleet page's "Recommended" sort just follows the `order` column (1 first).
Renumbering every row by hand in the Sheet is tedious, so `content/fleet-order.txt`
in the repo is an editable master list — one yacht id per line, top to bottom:

1. Open `content/fleet-order.txt` and reorder the lines (cut/paste a line to
   move that yacht up or down). Any yacht id you don't mention keeps its
   current relative position, appended after the ones you did list.
2. Run `node scripts/fleet-order-column.mjs --csv`. It prints every yacht id
   with its new order number, sorted A-Z by id.
3. In the Google Sheet, sort by the `id` column (A-Z), paste the order
   numbers from step 2 into the `order` column in that same order, then
   re-sort the sheet by `order` (cosmetic, keeps the sheet readable).
4. Wait up to 5 minutes, or hit `/api/revalidate?secret=<REVALIDATE_SECRET>`.

`node scripts/fleet-order-column.mjs` (no `--csv`) prints the plain
rank → id list instead, handy for eyeballing the new order before you commit to it.

## Adding or changing a yacht

1. Add a row (or edit one) in the sheet. Keep `name` as `Model Length`, and `id` as its slug.
2. Drop photos in `public/images/yachts/<id>/` and list them in `images`.
3. Wait up to 5 minutes, or open `/api/revalidate?secret=<REVALIDATE_SECRET>` to refresh now.

## Data provenance and open questions

Built from: yachtly.com.sg, singaporeyachtcharter.com, yachtrental.com.sg (Sea Experiences), yachtbookings.sg, singyachts.com.sg, yachtkakis.com.sg, zenithyachtcharters.com, theyachtclub.sg, one15luxuryyachting.com, sgyacht.com, zenseayacht.com.sg. Duplicates across brokers were merged by original name, then by length, capacity and price where a broker used a generic name (e.g. Sea Experiences' "62ft Eternity Power Catamaran" = MS Eternity 1).

Judgment calls to double check (also flagged per row in `reviewNotes`):

- Possible duplicates: **Mikanna / One Lotus** (47ft Leopard, 33 guests); **Sunseeker 105 / Horizon 105** (105ft, 55 guests); **Ellyn / Manda 72** (~70-72ft, S$3,270).
- **Eagle Wings 4 = Vesper Glow** (same boat on four brokers). **Zen Sea I = Helium.** **Horizon 105 = Leviathan 8**, **Lagoon 62 = Jyohana**, **Ferretti 60 = Vittoria**.
- Models for generic listings (e.g. `Motor Yacht 47`) are unknown; rename once the owner confirms.
- Removed for having no usable photos: **Motor Yacht 45** (Le Tara), **Motor Yacht 47 II** (Golden Ocean), **Mainship 40** (Veyron), **Bayliner 35** (Fun@Sea), **Grand Banks 36** (Popeye). Their rows are saved outside the repo in `fleet-private/removed-yachts-no-photos.csv`; re-add them when photos exist.
- Not added (not enough data): **Lady Olivia** (YachtBookings), **Nabula** (fishing boat, no length found), **Sailing tall ship** (Sea Experiences, 130 guests, no length). Add them when specs are confirmed.
- The jet skis on zenseayacht.com.sg are not yachts and were skipped.
- Cabin and crew counts were left blank where brokers disagreed or gave none.
