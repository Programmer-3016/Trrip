# UI/UX Design Intern Assignment — Dining Experience Redesign
**Candidate Submission for Trrip (Orbitra Technologies)**  
**Applicant:** Sarth  
**Role:** UI/UX Designer Intern  
**Target City & Context:** Jaipur, Rajasthan — A traveller arriving at their destination exploring dining experiences.  
**Live Interactive Prototype:** [https://trrip-traveller-app-dining-experience-redesign.vercel.app](https://trrip-traveller-app-dining-experience-redesign.vercel.app) *(or open `index.html` locally)*  
**Booking ID for Testing:** `wi83n`  

---

## Executive Summary & Traveller-First Mindset
When a traveller arrives at a destination like Jaipur and opens Trrip, their mental model is fundamentally different from a local ordering food on Swiggy or Zomato:
1. **Unfamiliarity with Geography:** They don't know street addresses or colony names; they navigate by iconic landmarks (e.g., *Albert Hall Museum, Hawa Mahal, MI Road*).
2. **Hunger + Low Cognitive Bandwidth:** Arriving from a flight or train, they need fast, trustworthy clarity: *Is it open now? How many minutes away? Does it have pure vegetarian/Jain food? What is the signature dish I must try here?*
3. **Experience over Utility:** Travellers eat to experience the city's heritage and culture (e.g., *Royal Dal Baati Churma, rooftop heritage ambience, Kesari Thandai*), not just to fill their stomach.

---

## 1. Audit of the Current Dining Experience

We evaluated both the **Dining Discovery Screen** and the **Restaurant Detail Screen** using the recommended 4-step framework:  
**What You See → What Could Be Better → Why It Matters → Recommendation**

### A. Discovery Screen Audit (Original App)

| # | What You See | What Could Be Better | Why It Matters | Recommendation |
|---|---|---|---|---|
| **1.1** | **Severe Text Truncation**<br>Card headers display *"Surya Mahal Resta..."* and distance displays *"0.8 km from Albert Hall M..."*. | Dynamic, responsive text layout with wrapping or horizontal split architecture. | A tourist unfamiliar with Jaipur cannot identify places or landmarks if names are cut off; breaks confidence. | Redesigned cards into a horizontal media split with full restaurant names and clear landmark tags (*"Near Albert Hall Museum"*). |
| **1.2** | **Premature & Aggressive CTA**<br>Every card has a huge primary button: *"Prebook Now →"*. | Balanced primary & secondary triggers (*"View Details"*, *"Prebook Table"*, *"Save"*). | Travellers rarely commit to prebooking from a low-detail feed without seeing food photos, menus, or reviews first. | Promoted card clickability to view the Detail Screen, alongside a secondary quick-save bookmark button. |
| **1.3** | **Visual Clutter & Muddy Palette**<br>Heavy skeuomorphic 3D tab icons, dull brown/earthy gradient, and harsh diagonal ribbons (*"10% OFF"*). | Modern, accessible design system with high-contrast typography and subtle badges. | The app feels dated and visually heavy; the harsh diagonal ribbon covers the actual food photo. | Replaced with clean neutral surfaces, crisp teal/secondary accents, and an unobtrusive top-left pill discount tag. |
| **1.4** | **Inefficient Filter Controls**<br>Three oversized round buttons (*Filters*, *Sort*, *Discounts*) occupy prime screen height. | Sticky, 1-tap horizontal chip bar for immediate filters. | When hungry, a traveller needs instant 1-tap access to *Pure Veg*, *Open Now*, or *Heritage Rooftop*. | Created a 1-tap chip carousel: `All Spots`, `Pure Veg`, `Heritage Rooftop`, `Open Now`, `10%+ Offers`. |
| **1.5** | **Absence of Traveller Context**<br>Only generic metadata shown (*"Family Restaurant"*, *₹1500 for two*). | Traveller-specific context tags: must-try dish, heritage vibe, transit time. | Food discovery for travellers is cultural discovery; generic labels don't evoke excitement. | Added badges like *Famous Thali*, *Pure Veg*, *Heritage Rooftop*, and transit time (*"4 min auto"*). |

---

### B. Restaurant Detail Screen Audit (Original App)

| # | What You See | What Could Be Better | Why It Matters | Recommendation |
|---|---|---|---|---|
| **2.1** | **Tautological / Empty Subtitle**<br>Card text states: *"Known local restaurant for Family Restaurant meals."* | Authentic culinary and heritage copy describing cuisine and specialties. | Provides zero real information to a traveller deciding where to spend their evening. | Replaced with: *"Authentic Rajasthani & North Indian Heritage Dining • 100% Pure Desi Ghee"*. |
| **2.2** | **Confusing Bottom CTAs**<br>Sticky footer has two side-by-side buttons: *"Prebook Now"* and *"Pay Bill"*. | Remove *"Pay Bill"* from the discovery flow; elevate table reservation and directions. | *"Pay Bill"* is a post-dining in-restaurant state! Showing it to someone browsing before visiting causes cognitive confusion. | Sticky bar now features **"Prebook Table (10% OFF)"** + one-tap **"Get Directions"** and **"Call Restaurant"**. |
| **2.3** | **Zero Food Imagery or Signature Dishes**<br>Only a single dim photo of empty dining tables; no food pictures or dish recommendations. | Dedicated **"Must-Try Local Delicacies"** section with photos and pricing. | Travellers want to know what to eat (e.g. *Dal Baati Churma, Kesari Thandai, Gatte ki Sabzi*). Visual appetite appeal drives dining decisions. | Added signature delicacy cards with authentic imagery, pricing (₹340), chef's tags, and dietary badges. |
| **2.4** | **Address Duplication & Postal Code Bug**<br>Address states: *"Panch Batti, C Scheme... Jaipur, Rajasthan 302007, Jaipur, Rajasthan 302017"*. | Clean single address with practical landmark orientation and travel duration. | Repeated text and contradictory pincodes look unpolished and buggy. | Formatted clean address with landmark reference (*"Opp. Raj Mandir Cinema"*) and auto-rickshaw transit estimate (*"4 min auto / 10 min walk"*). |
| **2.5** | **Lack of Social Proof & Traveller Tips**<br>Only a plain *"4.0 ★"* badge without review count or tourist-specific reviews. | Verified traveller reviews with travel type (e.g., *Solo Traveller, Family Trip*) and actionable tips. | Travellers rely heavily on peer experiences when trying new regional food in an unfamiliar city. | Added verified traveller review card highlighting hospitality, hygiene, and local tips. |

---

## 2. Top 5 Prioritised Improvements

We prioritised these improvements based on **Impact on Traveller Decision-Making** vs. **Implementation Feasibility**:

| Rank | Improvement | Potential Impact on Traveller Experience | Rationale |
|:---:|---|---|---|
| **1** | **Interactive 2-Screen Flow & Seamless Table Reservation** | 🟢 **Highest Impact (Conversion)** | A discovery feed without a compelling detail screen and booking flow creates dead ends. Connecting Discovery → Details → Prebook Table reduces drop-offs. |
| **2** | **"Must-Try Local Delicacies" (Food First Experience)** | 🟢 **High Impact (Decision Velocity)** | Travellers don't just pick a restaurant; they pick a meal. Highlighting iconic Jaipur dishes (*Dal Baati Churma, Kesari Thandai*) solves *"What should I order here?"* instantly. |
| **3** | **Contextual Action Hierarchy (Fixing "Pay Bill" Confusion)** | 🟡 **High Impact (UX Usability)** | Eliminating the premature *"Pay Bill"* button in favor of clear navigation (*"Get Directions"*) and prebooking prevents user confusion. |
| **4** | **1-Tap Filter Ergonomics & Smart Search** | 🟡 **High Impact (Friction Reduction)** | Immediate access to *Pure Veg*, *Heritage Rooftop*, and *Open Now* reduces cognitive load for hungry travellers on the move. |
| **5** | **Proximity & Landmark-Centric Orientation** | 🔵 **Medium Impact (Clarity)** | Replacing raw coordinates or truncated addresses with time-based distance (*"4 min auto / 0.8 km from Albert Hall"*) anchors the traveller in the city. |

---

## 3. Redesigned User Flow

```
[ Traveller Arrives in Jaipur ]
              │
              ▼
    1. OPEN DINING TAB
    (Location set to C-Scheme, Jaipur)
              │
              ▼
    2. DISCOVER & FILTER
    (1-tap filters: "Pure Veg" | "Heritage Rooftop" | "Open Now")
              │
              ▼
    3. SELECT RESTAURANT
    (Taps Surya Mahal Restaurant card — sees 10% Trrip perk)
              │
              ▼
    4. VIEW RICH DETAILS
    (Examines Hero Gallery, Must-Try Dishes, Travel Time & Reviews)
              │
              ▼
    5. TAKE ACTION
    ┌──────────────────────────────┴──────────────────────────────┐
    ▼                                                             ▼
PREBOOK TABLE MODAL                                      GET DIRECTIONS
- Select Party Size (2 Guests)                          - 1-tap Google Maps
- Pick Date & Time Slot (8:00 PM)                        - Instant Auto Navigation
- 10% Discount Auto-Applied
- Instant Confirmation (Booking ID: wi83n)
```

---

## 4. Key Design Decisions & Product Thinking

1. **Brand Aesthetics & Color System:**
   - Switched from muddy brown gradients to a clean, refreshing palette:
     - **Primary Teal (`#00685f`):** Represents trust, travel exploration, and premium feel.
     - **Heritage Emerald (`#006c4a`):** For ratings, dietary badges (Pure Veg), and verified partner status.
     - **Warm Amber (`#825100` / `#a36700`):** Accents for royal thalis and rooftop experiences.
2. **Typography & Readability:**
   - **Plus Jakarta Sans:** Expressive, modern geometric heading font for restaurant titles and numbers.
   - **Inter:** Ultra-legible body text for addresses, descriptions, and metadata across small mobile viewports.
3. **Traveller Persona Considered:**
   - *Aditi & Rohan*, a young couple who just checked into a hotel in C-Scheme, Jaipur at 7:30 PM. They want authentic Rajasthani food within 10 minutes, prefer a clean family/heritage atmosphere, and want a guaranteed table without waiting in a long queue. Our redesigned flow lets them discover Surya Mahal, check its iconic Dal Baati Churma, and reserve a table with 10% off in under 45 seconds.

---

## 5. Live Clickable Prototype Walkthrough
The live prototype includes:
- **Screen 1 (Discovery):** Active filtering, real-time search, interactive bookmarks, curated destination banner.
- **Screen 2 (Restaurant Details):** Complete overhaul for Surya Mahal, The Retreat, and Forresta with high-res food galleries, signature dish cards, landmark proximity, and verified traveller reviews.
- **Screen 3 (Table Booking Drawer):** Complete reservation flow with guest picker, time slots, and confirmation voucher with reference `wi83n`.
- **Integrated Audit Drawer:** Tap the top-right button **"UX Audit & Case Study"** to inspect this exact case study live inside the prototype!
