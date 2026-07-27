import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bag, Check, List, Minus, Plus, X } from "@phosphor-icons/react";
import { products } from "./data/products.js";

const rituals = [
  {
    label: "Morning",
    time: "07:15",
    phase: "First Light Atmosphere",
    theme: "dawn",
    title: "Open the room slowly.",
    copy: "A bright, measured atmosphere for first light, quiet planning, and an unhurried start.",
    notes: ["Hinoki", "Tea", "Clean Linen"],
    benefits: [
      "Lift the room with clean hinoki",
      "Support an unhurried first hour",
      "Pair with Field Mist composition"
    ],
    image: "/assets/noxen-family-collection.png",
    product: 2,
    price: 48,
    hotspots: [
      { top: "54%", left: "16%",  label: "Basalt Mineral Vessel", detail: "Weighted basalt lid designed for gradual cold-air scent diffusion." },
      { top: "62%", left: "37%",  label: "Olive Glass Infuser", detail: "Hand-blown translucent glass reflecting gentle morning sunlight." },
      { top: "56%", left: "61%",  label: "Matte Ceramic Plinth", detail: "Textured ceramic vessel engineered for 12-hour thermal diffusion." }
    ]
  },
  {
    label: "Focus",
    time: "11:30",
    phase: "Midday Balance Atmosphere",
    theme: "midday",
    title: "Hold a clearer center.",
    copy: "Dry woods and softened greens create a composed backdrop for deep work without demanding attention.",
    notes: ["Fig Leaf", "Moss", "Pale Cedar"],
    benefits: [
      "Set a quiet boundary for work",
      "Layer fig leaf with pale cedar",
      "Pair with Still Candle"
    ],
    image: "/assets/noxen-family-hero.png",
    product: 1,
    price: 64,
    hotspots: [
      { top: "37%", left: "22%",  label: "Black Basalt Core", detail: "Dense basalt vessel providing weighted grounding for work spaces." },
      { top: "63%", left: "38%",  label: "Amber Glass Infuser", detail: "Refracts midday ambient light while preserving active botanical oils." },
      { top: "43%", left: "60%",  label: "Limestone Scent Chamber", detail: "Absorbs ambient humidity while releasing crisp cedar & fig leaf." }
    ]
  },
  {
    label: "Evening",
    time: "20:45",
    phase: "Restorative Twilight Atmosphere",
    theme: "twilight",
    title: "Let the edges soften.",
    copy: "A low, mineral warmth designed to mark the transition from active rooms to restorative ones.",
    notes: ["Lavender", "Orris", "Vetiver"],
    benefits: [
      "Mark the end of the active day",
      "Settle the room with orris",
      "Pair with Sleep + Restore"
    ],
    image: "/assets/noxen-family-ritual.png",
    product: 3,
    price: 78,
    hotspots: [
      { top: "51%",   left: "15%",  label: "Nocturne Mineral Vessel", detail: "Darkened ceramic body engineered for low-light bedroom placement." },
      { top: "59%",   left: "36%",  label: "Orris Evaporation Chamber", detail: "Sustained micro-evaporation chamber releasing calm twilight notes." },
      { top: "49%",   left: "57%",  label: "Restorative Ceramic Base", detail: "Sculpted base keeping vessel elevated and stable on bedside tables." }
    ]
  },
];

const materialStories = [
  {
    number: "01",
    tag: "Tactile Finish",
    spec: "Matte Ceramic",
    title: "Quiet by design.",
    copy: "Unmarked vessels and softened silhouettes keep the object present without adding visual noise.",
    image: "/assets/noxen-family-lifestyle.png",
    accent: "Porous Mineral"
  },
  {
    number: "02",
    tag: "Ambient Optics",
    spec: "Smoked Mineral Glass",
    title: "Made for changing light.",
    copy: "Matte ceramic, smoked glass, and dark mineral lids shift gently from morning to evening.",
    image: "/assets/noxen-family-collection.png",
    accent: "Light Refraction"
  },
  {
    number: "03",
    tag: "Proportion System",
    spec: "Basalt & Limestone",
    title: "One family, every room.",
    copy: "Four distinct proportions share one restrained material language across the whole home.",
    image: "/assets/noxen-family-hero.png",
    accent: "Unified Scale"
  },
];

const journalStories = [
  { category: "Atmosphere", title: "Why your room remembers how you felt there", copy: "Light, material, and scent can turn a passing mood into a familiar ritual. Here is how to compose them with intention.", readTime: "5 min read", image: "/assets/noxen-family-lifestyle.png" },
  { category: "Ritual", title: "A slower evening starts before the lights go low", copy: "Three small cues that help a room move from activity into rest.", readTime: "4 min read", image: "/assets/noxen-family-ritual.png" },
  { category: "Materials", title: "The quiet intelligence of objects made to disappear", copy: "Why restrained forms make more space for the atmosphere around them.", readTime: "6 min read", image: "/assets/noxen-family-collection.png" },
  { category: "Botanicals", title: "How scent changes the shape of a familiar room", copy: "A practical guide to layering woods, leaves, and softened florals.", readTime: "7 min read", image: "/assets/noxen-family-hero.png" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [featured, setFeatured] = useState(products[0]);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [ritualIndex, setRitualIndex] = useState(0);
  const [activeSpot, setActiveSpot] = useState(null);
  const [journalIndex, setJournalIndex] = useState(0);
  const revealNodes = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -50px 0px" });

    revealNodes.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const reveal = (node) => {
    if (node && !revealNodes.current.includes(node)) revealNodes.current.push(node);
  };

  const addToCart = (product) => {
    setCart((items) => {
      const match = items.find((item) => item.id === product.id);
      return match ? items.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...items, { ...product, qty: 1 }];
    });
    setFeatured(product);
    setCartOpen(true);
  };

  const updateQty = (id, amount) => setCart((items) => items.map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + amount) } : item).filter((item) => item.qty > 0));
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="page-shell">
      <div className="promo">
        <div className="promo-inner">
          <span className="promo-pill">NEW ATMOSPHERE</span>
          <span className="promo-text">Is NX—01 the right composition for your space?</span>
          <button className="promo-action" onClick={() => document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" })}>
            <span>Take Scent Quiz</span>
            <ArrowRight />
          </button>
        </div>
      </div>

      <section className="hero" id="top">
        <header className="hero-nav-wrapper">
          <div className="hero-nav">
            <div className="nav-left">
              <button className="mobile-menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
                <List />
              </button>
              <a className="logo" href="#top">
                Noxen<span className="logo-dot" />
              </a>
            </div>

            <nav className="nav-center">
              <a href="#collection">Shop</a>
              <a href="#ritual">Rituals</a>
              <a href="#science">Science</a>
              <a href="#materials">Archive</a>
              <a href="#learn">Journal</a>
            </nav>

            <div className="nav-actions">
              <button className="login-button" onClick={() => setLoginOpen(true)}>Login</button>
              <button className="nav-cta" onClick={() => document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" })}>Get Started</button>
              <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
                <Bag />
                <span className="cart-badge">{cartCount}</span>
              </button>
            </div>
          </div>
        </header>

        <img className="hero-product" src="/assets/noxen-family-hero.png" alt="The complete NOXEN vessel family on sculpted stone" />
        <div className="hero-overlay" aria-hidden="true" />

        <div className="hero-copy reveal" ref={reveal}>
          <div className="hero-badge-group">
            <span className="pill lime">
              <span className="pill-dot" /> New Release
            </span>
          </div>

          <h1>Stillness, energy, & sleep—<br />advanced by <em>botanical atmosphere.</em></h1>

          <p>NOXEN’s ceramic aroma vessel and pure scent compositions deliver a quieter, better-balanced room.</p>

          <div className="hero-cta-group">
            <button className="hero-main-cta" onClick={() => document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" })}>
              <span>Shop the Collection</span>
              <ArrowRight />
            </button>
            <button className="hero-quiz-cta" onClick={() => document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" })}>
              <span>Take Scent Quiz</span>
            </button>
          </div>
        </div>
      </section>

      <section className="catalog-section" id="collection">
        <div className="catalog-head reveal" ref={reveal}>
          <h2>Whole-room calm starts<br />in the air.</h2>
          <p>Botanical compositions designed for focused mornings, slower evenings, and deeper rest.</p>
          <button onClick={() => setFeatured(products[(products.indexOf(featured) + 1) % products.length])}>Shop All <ArrowRight /></button>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className={product.id === "field" ? `product-card product-${product.id} featured reveal` : `product-card product-${product.id} reveal`} ref={reveal} key={product.id}>
              <div className="card-tags"><span className={product.tag === "Bestseller" ? "pill lime" : "pill muted"}>{product.tag}</span><span className="code-pill">{product.code}</span></div>
              <h3>{product.name}</h3>
              <p>{product.note}</p>
              <button className="product-image" onClick={() => setFeatured(product)} aria-label={`Preview ${product.name}`}><img src={product.image} alt={product.name} /></button>
              <button className="shop-card-button" onClick={() => addToCart(product)}>Shop Now <ArrowRight /></button>
              <small>Starting at ${(product.price / 4).toFixed(2)} per month</small>
            </article>
          ))}
        </div>
      </section>

      <section className="nocturne-section" id="science">
        <img className="nocturne-scene" src="/assets/noxen-nocturne-exhibition.png" alt="Four NOXEN vessels exhibited on black mineral plinths" />
        <div className="nocturne-scene-overlay" aria-hidden="true" />
        
        <div className="nocturne-heading reveal" ref={reveal}>
          <div className="nocturne-badge-group">
            <span className="pill lime">
              <span className="pill-dot" /> Material Archive
            </span>
            <span className="nocturne-archive-tag">COLLECTION 02</span>
          </div>
          <h2>Daily atmosphere<br />for focus and<br /><em>deeper rest.</em></h2>
        </div>

        <span className="nocturne-number" aria-hidden="true">02</span>

        <div className="nocturne-rail reveal" ref={reveal}>
          <div className="nocturne-rail-left">
            <div className="nocturne-saving-badge">
              <span className="badge-glow" />
              <span>SAVE 40% BUNDLE</span>
            </div>
            <p>Pair the Dusk Vessel with our botanical oil duo to support clearer mornings, gentler evenings, and a home that feels considered.</p>
            <button className="nocturne-cta" onClick={() => addToCart(products[0])}>
              <span>Shop the Daily Ritual</span>
              <ArrowRight />
            </button>
          </div>

          <div className="material-index" aria-label="Collection materials">
            <div className="material-index-item">
              <div className="material-item-head">
                <span className="material-num">01</span>
                <strong>Basalt</strong>
              </div>
              <small>Grounded stillness</small>
            </div>

            <div className="material-index-item">
              <div className="material-item-head">
                <span className="material-num">02</span>
                <strong>Olive Glass</strong>
              </div>
              <small>Translucent quiet</small>
            </div>

            <div className="material-index-item">
              <div className="material-item-head">
                <span className="material-num">03</span>
                <strong>Limestone</strong>
              </div>
              <small>Warmed texture</small>
            </div>

            <div className="material-index-item">
              <div className="material-item-head">
                <span className="material-num">04</span>
                <strong>Sand</strong>
              </div>
              <small>Soft presence</small>
            </div>
          </div>
        </div>
      </section>

      <section className={`ritual-section ritual-theme-${rituals[ritualIndex].theme}`} id="ritual">
        <div className="ritual-ambient-glow" aria-hidden="true" />

        <div className="ritual-header reveal" ref={reveal}>
          <div className="ritual-badge-group">
            <span className="pill lime ritual-pill">
              <span className="pill-dot" /> Daily ritual
            </span>
            <span className="ritual-tagline">24-HOUR ATMOSPHERIC ARCHITECTURE</span>
          </div>
          <h2>Customize your room,<br /><em>hour by hour.</em></h2>
          <p>Move from first light to deep rest with three considered atmospheric settings.</p>
        </div>

        {/* Luxury Station Timeline Controller */}
        <div className="ritual-timeline-container reveal" ref={reveal}>
          {/* Continuous Line Track connecting station centers */}
          <div className="timeline-track-bar">
            <div className="track-bar-bg" />
            <div
              className="track-bar-fill"
              style={{ width: `${(ritualIndex / (rituals.length - 1)) * 100}%` }}
            />
          </div>

          {/* Interactive Station Nodes & Labels */}
          <div className="ritual-stations-row" role="tablist" aria-label="Choose a daily ritual">
            {rituals.map((ritual, index) => (
              <button
                key={ritual.label}
                role="tab"
                aria-selected={ritualIndex === index}
                className={`ritual-station-card ${ritualIndex === index ? "active" : ""}`}
                onClick={() => setRitualIndex(index)}
              >
                <div className="station-node-wrap">
                  <span className="node-outer-ring">
                    <span className="node-inner-core" />
                  </span>
                </div>
                <div className="station-label-wrap">
                  <span className="station-time">{ritual.time}</span>
                  <span className="station-name">{ritual.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Panel */}
        <div className="ritual-stage-card reveal" ref={reveal}>
          <div className="ritual-stage-grid">

            {/* Left Copy Column */}
            <div className="ritual-copy-panel">
              <div className="ritual-phase-tag">
                <span className="phase-beacon" />
                <span>{rituals[ritualIndex].time} / {rituals[ritualIndex].phase}</span>
              </div>

              <h3>{rituals[ritualIndex].title}</h3>
              <p className="ritual-desc">{rituals[ritualIndex].copy}</p>

              <div className="ritual-benefits-list">
                {rituals[ritualIndex].benefits.map((benefit) => (
                  <div key={benefit} className="benefit-item">
                    <span className="benefit-icon"><Check /></span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="ritual-notes-block">
                <span className="notes-label">BOTANICAL NOTES</span>
                <div className="notes-pills">
                  {rituals[ritualIndex].notes.map((note) => (
                    <span key={note} className="note-pill">{note}</span>
                  ))}
                </div>
              </div>

              {/* Fixed Height Vessel Inspector Slot */}
              <div className="inspector-slot">
                {activeSpot ? (
                  <div key={activeSpot} className="hotspot-inspector-card">
                    <span className="inspector-badge">VESSEL DETAIL INSPECTOR</span>
                    <strong>{activeSpot}</strong>
                    <p>{rituals[ritualIndex].hotspots.find((s) => s.label === activeSpot)?.detail}</p>
                  </div>
                ) : (
                  <div className="hotspot-inspector-hint">
                    <span className="hint-icon">🔍</span>
                    <span>Click any vessel pin on the right to inspect details</span>
                  </div>
                )}
              </div>

              <button
                className="ritual-cta-button"
                onClick={() => addToCart(products[rituals[ritualIndex].product])}
              >
                <span>Add this atmosphere — ${rituals[ritualIndex].price}</span>
                <ArrowRight />
              </button>
            </div>

            {/* Right Interactive Viewport */}
            <div className="ritual-viewport-panel">
              <div className="viewport-frame">
                <img
                  key={rituals[ritualIndex].image}
                  src={rituals[ritualIndex].image}
                  alt={`NOXEN ${rituals[ritualIndex].label.toLowerCase()} ritual`}
                  className="viewport-img"
                />

                <div className="viewport-overlay-vignette" />

                {/* Interactive Hotspot Markers on Vessels */}
                {rituals[ritualIndex].hotspots.map((spot, i) => (
                  <button
                    key={i}
                    className={`hotspot-pin ${activeSpot === spot.label ? "active" : ""}`}
                    style={{ top: spot.top, left: spot.left }}
                    onClick={() => setActiveSpot(activeSpot === spot.label ? null : spot.label)}
                    aria-label={`Inspect ${spot.label}`}
                  >
                    <span className="hotspot-ring-glow" />
                    <span className="hotspot-dot-core" />
                    <div className="hotspot-tooltip">
                      <strong>{spot.label}</strong>
                      <small>{spot.detail}</small>
                    </div>
                  </button>
                ))}

                {/* Next Ritual Floating Switcher */}
                <button
                  className="next-ritual-floating"
                  onClick={() => {
                    setActiveSpot(null);
                    setRitualIndex((ritualIndex + 1) % rituals.length);
                  }}
                  aria-label="Switch to next ritual"
                >
                  <div className="next-label">
                    <small>NEXT ATMOSPHERE</small>
                    <span>{rituals[(ritualIndex + 1) % rituals.length].time} {rituals[(ritualIndex + 1) % rituals.length].label}</span>
                  </div>
                  <ArrowRight />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="materials-section" id="materials">
        <div className="materials-bg-glow" aria-hidden="true" />
        <div className="materials-head reveal" ref={reveal}>
          <div className="materials-head-left">
            <div className="materials-badge-wrap">
              <span className="pill lime material-pill">
                <span className="pill-dot" /> Material study
              </span>
              <span className="materials-archive-tag">ARCHIVE 2026</span>
            </div>
            <h2>Objects that belong<br /><em>before they perform.</em></h2>
          </div>
          <div className="materials-head-side">
            <p>The collection is composed like furniture: restrained enough to live with, tactile enough to notice.</p>
            <div className="materials-spec-counter">
              <div className="spec-metric"><b>03</b> Material Pillars</div>
              <div className="spec-metric"><b>100%</b> Tactile Mineral</div>
            </div>
          </div>
        </div>

        <div className="materials-grid">
          {materialStories.map((story) => (
            <article className="material-card reveal" ref={reveal} key={story.number}>
              <div className="material-card-inner">
                <div className="material-image">
                  <img src={story.image} alt={story.title} />
                  <div className="material-image-overlay" />
                  <div className="material-shimmer" />
                  <div className="material-tags-top">
                    <span className="material-num-badge">{story.number}</span>
                    <span className="material-spec-pill">{story.spec}</span>
                  </div>
                </div>
                <div className="material-copy">
                  <div className="material-sub-tag">
                    <span className="material-dot" /> {story.tag}
                  </div>
                  <h3>{story.title}</h3>
                  <p>{story.copy}</p>
                  <div className="material-footer-link">
                    <span>Explore {story.accent}</span>
                    <ArrowRight className="material-arrow" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="journal-section" id="learn">
        <header className="journal-heading reveal" ref={reveal}>
          <span className="pill lime">The Noxen journal</span>
          <h2>Considered reads for<br />a more <em>restful room.</em></h2>
        </header>

        <button className="journal-feature reveal" ref={reveal} onClick={() => setJournalIndex((journalIndex + 1) % journalStories.length)} aria-label="Show the next journal story">
          <div className="journal-feature-image"><img key={journalStories[journalIndex].image} src={journalStories[journalIndex].image} alt="NOXEN vessels arranged in a calm interior" /></div>
          <div className="journal-feature-copy">
            <span className="journal-category">{journalStories[journalIndex].category}</span>
            <h3>{journalStories[journalIndex].title}</h3>
            <p>{journalStories[journalIndex].copy}</p>
            <div className="journal-meta"><span>{journalStories[journalIndex].readTime}</span><span>By Noxen Studio</span></div>
          </div>
        </button>

        <div className="journal-grid">
          {journalStories.slice(1).map((story, index) => (
            <button className={`journal-card reveal${journalIndex === index + 1 ? " active" : ""}`} ref={reveal} key={story.title} onClick={() => setJournalIndex(index + 1)} aria-pressed={journalIndex === index + 1}>
              <div className="journal-card-image"><img src={story.image} alt="" /></div>
              <span className="journal-category">{story.category}</span>
              <h3>{story.title}</h3>
              <p>{story.copy}</p>
              <small>{story.readTime}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter-card">
          <div className="newsletter-head">
            <span className="newsletter-badge">
              <span className="newsletter-badge-dot" /> PRIVATE NOTES
            </span>
            <h2>{joined ? "You’re on the list." : "A calmer inbox."}</h2>
            <p className="newsletter-subtext">Weekly architectural scent studies, ritual releases, and material notes.</p>
          </div>
          {joined ? (
            <p className="joined"><Check /> Welcome to NOXEN. Check your inbox for your 10% welcome code.</p>
          ) : (
            <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setJoined(true); }}>
              <div className="newsletter-input-wrapper">
                <input type="email" required placeholder="Enter your email address..." value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email address" />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                  <span>Subscribe</span>
                  <ArrowRight />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer><a className="logo" href="#top">Noxen<span /></a><p>Botanical atmosphere for every room.</p><div><a href="#collection">Shop</a><a href="#science">Science</a><a href="#learn">Learn</a></div><small>© 2026 NOXEN</small></footer>

      {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true"><button aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></button><a className="logo" href="#top" onClick={() => setMenuOpen(false)}>Noxen<span /></a><nav><a href="#collection" onClick={() => setMenuOpen(false)}>Shop</a><a href="#science" onClick={() => setMenuOpen(false)}>Science</a><a href="#learn" onClick={() => setMenuOpen(false)}>Learn</a></nav></div>}

      <div className={cartOpen || loginOpen ? "overlay open" : "overlay"} onClick={() => { setCartOpen(false); setLoginOpen(false); }} />
      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-hidden={!cartOpen}><div className="drawer-head"><h2>Your ritual</h2><button aria-label="Close cart" onClick={() => setCartOpen(false)}><X /></button></div><div className="cart-items">{cart.length ? cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3><p>{item.note}</p><strong>${item.price * item.qty}</strong><div className="quantity"><button onClick={() => updateQty(item.id, -1)} aria-label={`Decrease ${item.name}`}><Minus /></button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)} aria-label={`Increase ${item.name}`}><Plus /></button></div></div></div>) : <div className="empty-cart"><Bag /><h3>Your ritual is empty.</h3><button className="green-button" onClick={() => { setCartOpen(false); document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the collection</button></div>}</div>{cart.length > 0 && <div className="checkout"><span>Subtotal <b>${cartTotal}</b></span><button className="green-button" onClick={() => setLoginOpen(true)}>Checkout <ArrowRight /></button></div>}</aside>

      <section className={loginOpen ? "login-modal open" : "login-modal"} role="dialog" aria-modal="true" aria-hidden={!loginOpen}><button className="modal-close" aria-label="Close login" onClick={() => setLoginOpen(false)}><X /></button><span className="pill lime">Member access</span><h2>Welcome back.</h2><p>Sign in to save your rituals and manage your NOXEN orders.</p><form onSubmit={(event) => { event.preventDefault(); setLoginOpen(false); }}><input type="email" required placeholder="Email address" aria-label="Login email" /><button className="green-button">Continue <ArrowRight /></button></form></section>
    </div>
  );
}

export { App };
