import React, { useState, useEffect } from "react";
import { 
  FileText, Shield, Cookie, RefreshCw, Users, AlertTriangle, 
  Music, BookOpen, Search, ArrowRight, Check, Copy, Printer, ExternalLink, ChevronRight
} from "lucide-react";
import { LEGAL_DOCUMENTS, LEGAL_MAP } from "../data/legalDocuments";

const ICON_MAP = {
  terms: FileText,
  privacy: Shield,
  cookie: Cookie,
  refund: RefreshCw,
  community: Users,
  copyright: AlertTriangle,
  "dist-agreement": Music,
  "pub-agreement": BookOpen,
};

export default function LegalPage({ onNavigate, theme = "dark", initialDoc = "terms" }) {
  const isLight = theme === "light";
  const [selectedId, setSelectedId] = useState(initialDoc);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // Sync if initialDoc prop changes
  useEffect(() => {
    if (initialDoc && LEGAL_MAP[initialDoc]) {
      setSelectedId(initialDoc);
    }
  }, [initialDoc]);

  const activeDoc = LEGAL_MAP[selectedId] || LEGAL_DOCUMENTS[0];
  const ActiveIcon = ICON_MAP[activeDoc.id] || FileText;

  const handleSelectDoc = (id) => {
    setSelectedId(id);
    setSearchQuery("");
    const doc = LEGAL_MAP[id];
    if (doc && onNavigate) {
      window.history.pushState({}, "", doc.path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter sections if search query is provided
  const filteredSections = searchQuery.trim()
    ? activeDoc.sections.filter(s => 
        s.heading.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeDoc.sections;

  return (
    <div style={{ 
      background: isLight ? "#F8FAFC" : "var(--tw-bg-dark)", 
      color: isLight ? "#0F172A" : "var(--tw-text-white)", 
      minHeight: "100vh",
      paddingTop: "60px",
      paddingBottom: "120px"
    }}>
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .legal-tab-item {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          text-decoration: none;
          user-select: none;
        }
        .legal-tab-item:hover {
          background: ${isLight ? "rgba(0, 126, 167, 0.08)" : "rgba(0, 229, 255, 0.08)"};
          color: ${isLight ? "#007EA7" : "#00E5FF"} !important;
          transform: translateX(4px);
        }
        .legal-tab-active {
          background: ${isLight ? "rgba(0, 126, 167, 0.12)" : "rgba(0, 229, 255, 0.14)"} !important;
          border: 1px solid ${isLight ? "rgba(0, 126, 167, 0.3)" : "rgba(0, 229, 255, 0.35)"} !important;
          color: ${isLight ? "#007EA7" : "#00E5FF"} !important;
          font-weight: 700;
        }
        .legal-section-card {
          border: 1px solid ${isLight ? "rgba(0, 0, 0, 0.08)" : "var(--tw-line)"};
          background: ${isLight ? "#FFFFFF" : "var(--tw-bg-card)"};
          border-radius: 16px;
          padding: 28px 32px;
          margin-bottom: 20px;
          box-shadow: ${isLight ? "0 4px 16px rgba(0,0,0,0.03)" : "0 8px 24px rgba(0,0,0,0.2)"};
          transition: border-color 0.2s ease;
        }
        .legal-section-card:hover {
          border-color: ${isLight ? "rgba(0, 126, 167, 0.35)" : "rgba(0, 229, 255, 0.3)"};
        }
        @media print {
          nav, footer, .legal-sidebar, .legal-action-bar, .mobile-toggle {
            display: none !important;
          }
          .legal-content-pane {
            width: 100% !important;
          }
        }
      `}</style>

      <div className="container">
        {/* TOP HEADER */}
        <div style={{ marginBottom: 40, borderBottom: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "var(--tw-line)"}`, paddingBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ 
              fontSize: "0.74rem", fontWeight: 800, letterSpacing: "0.14em", 
              color: isLight ? "#007EA7" : "var(--tw-cyan)", 
              border: `1px solid ${isLight ? "rgba(0, 126, 167, 0.3)" : "rgba(0,229,255,0.3)"}`, 
              padding: "5px 14px", borderRadius: 9999, 
              background: isLight ? "rgba(0, 126, 167, 0.06)" : "rgba(0,229,255,0.08)" 
            }}>
              LEGAL &amp; COMPLIANCE
            </span>
            <span style={{ fontSize: "0.78rem", color: isLight ? "#64748B" : "var(--tw-text-muted)" }}>
              • Effective: September 2026
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ 
                fontSize: "clamp(2rem, 4.5vw, 3rem)", 
                fontWeight: 900, 
                lineHeight: 1.1, 
                color: isLight ? "#0F172A" : "var(--tw-text-white)",
                margin: "8px 0 10px"
              }}>
                {activeDoc.label}
              </h1>
              <p style={{ color: isLight ? "#475569" : "var(--tw-text-dim)", fontSize: "1rem", maxWidth: 650 }}>
                Tunewave Globel Network official terms, user rights, and legal documentation.
              </p>
            </div>

            {/* Actions: Copy Link & Print */}
            <div className="legal-action-bar" style={{ display: "flex", gap: 10 }}>
              <button 
                onClick={handleCopyLink} 
                style={{ 
                  display: "inline-flex", alignItems: "center", gap: 6, 
                  background: isLight ? "#FFFFFF" : "var(--tw-bg-surface)", 
                  color: isLight ? "#334155" : "var(--tw-text-dim)", 
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.12)" : "var(--tw-line-bright)"}`, 
                  borderRadius: 10, padding: "10px 16px", fontSize: "0.85rem", fontWeight: 600, 
                  cursor: "pointer", transition: "all 0.2s ease" 
                }}
              >
                {copied ? <Check size={16} color="#00E5FF" /> : <Copy size={16} />}
                {copied ? "Link Copied!" : "Copy Link"}
              </button>
              <button 
                onClick={handlePrint} 
                style={{ 
                  display: "inline-flex", alignItems: "center", gap: 6, 
                  background: isLight ? "#FFFFFF" : "var(--tw-bg-surface)", 
                  color: isLight ? "#334155" : "var(--tw-text-dim)", 
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.12)" : "var(--tw-line-bright)"}`, 
                  borderRadius: 10, padding: "10px 16px", fontSize: "0.85rem", fontWeight: 600, 
                  cursor: "pointer", transition: "all 0.2s ease" 
                }}
              >
                <Printer size={16} /> Print Document
              </button>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT: SIDEBAR TABS + DOCUMENT CONTENT */}
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 40, alignItems: "flex-start" }}>
          
          {/* SIDEBAR NAVIGATION (All 8 Documents from the screenshot) */}
          <aside className="legal-sidebar" style={{ position: "sticky", top: "100px" }}>
            <div style={{ 
              background: isLight ? "#FFFFFF" : "var(--tw-bg-surface)", 
              border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "var(--tw-line)"}`, 
              borderRadius: 20, 
              padding: "20px 16px",
              boxShadow: isLight ? "0 4px 20px rgba(0,0,0,0.04)" : "0 10px 30px rgba(0,0,0,0.3)"
            }}>
              <div style={{ 
                fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", 
                color: isLight ? "#64748B" : "var(--tw-text-muted)", 
                textTransform: "uppercase", 
                padding: "4px 12px 12px",
                borderBottom: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "var(--tw-line)"}`,
                marginBottom: 12
              }}>
                All Legal Documents
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {LEGAL_DOCUMENTS.map((doc) => {
                  const DocIcon = ICON_MAP[doc.id] || FileText;
                  const isActive = doc.id === activeDoc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleSelectDoc(doc.id)}
                      className={`legal-tab-item ${isActive ? "legal-tab-active" : ""}`}
                      style={{
                        color: isActive 
                          ? (isLight ? "#007EA7" : "#00E5FF") 
                          : (isLight ? "#334155" : "var(--tw-text-dim)"),
                        border: "1px solid transparent"
                      }}
                    >
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: isActive 
                          ? (isLight ? "rgba(0, 126, 167, 0.15)" : "rgba(0, 229, 255, 0.15)")
                          : (isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)"),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isActive ? (isLight ? "#007EA7" : "#00E5FF") : (isLight ? "#64748B" : "var(--tw-text-muted)"),
                        flexShrink: 0
                      }}>
                        <DocIcon size={16} />
                      </div>
                      <span style={{ fontSize: "0.88rem", flex: 1 }}>{doc.label}</span>
                      {isActive && <ChevronRight size={16} color={isLight ? "#007EA7" : "#00E5FF"} />}
                    </div>
                  );
                })}
              </div>

              {/* Support & Queries Box */}
              <div style={{ 
                marginTop: 24, padding: "16px", borderRadius: 14, 
                background: isLight ? "rgba(0, 126, 167, 0.04)" : "rgba(0, 229, 255, 0.04)", 
                border: `1px solid ${isLight ? "rgba(0, 126, 167, 0.15)" : "rgba(0, 229, 255, 0.15)"}` 
              }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: isLight ? "#0F172A" : "var(--tw-text-white)", marginBottom: 4 }}>
                  Legal &amp; Rights Questions?
                </div>
                <div style={{ fontSize: "0.78rem", color: isLight ? "#64748B" : "var(--tw-text-dim)", lineHeight: 1.5, marginBottom: 10 }}>
                  Contact our dedicated rights and compliance team directly.
                </div>
                <a 
                  href="mailto:support@tunewavemusic.in" 
                  style={{ 
                    fontSize: "0.8rem", fontWeight: 700, 
                    color: isLight ? "#007EA7" : "var(--tw-cyan)", 
                    textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 
                  }}
                >
                  support@tunewavemusic.in <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENT VIEW PANE */}
          <main className="legal-content-pane" style={{ animation: "fadeInSlide 0.3s ease-out" }}>
            
            {/* Search filter inside document */}
            <div style={{ marginBottom: 24, position: "relative" }}>
              <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: isLight ? "#94A3B8" : "var(--tw-text-muted)" }}>
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search within ${activeDoc.label}...`}
                style={{
                  width: "100%",
                  background: isLight ? "#FFFFFF" : "var(--tw-bg-surface)",
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.1)" : "var(--tw-line)"}`,
                  borderRadius: 12,
                  padding: "14px 16px 14px 46px",
                  fontSize: "0.92rem",
                  color: isLight ? "#0F172A" : "var(--tw-text-white)",
                  outline: "none",
                  boxSizing: "border-box",
                  boxShadow: isLight ? "0 2px 8px rgba(0,0,0,0.02)" : "none"
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: isLight ? "#94A3B8" : "var(--tw-text-muted)",
                    cursor: "pointer", fontSize: "0.8rem", fontWeight: 700
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Document Meta Banner */}
            <div style={{ 
              background: isLight ? "rgba(0, 126, 167, 0.05)" : "rgba(0, 229, 255, 0.06)", 
              border: `1px solid ${isLight ? "rgba(0, 126, 167, 0.2)" : "rgba(0, 229, 255, 0.2)"}`, 
              borderRadius: 16, padding: "20px 24px", marginBottom: 28,
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ 
                  width: 40, height: 40, borderRadius: 10, 
                  background: isLight ? "rgba(0, 126, 167, 0.15)" : "rgba(0, 229, 255, 0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: isLight ? "#007EA7" : "var(--tw-cyan)"
                }}>
                  <ActiveIcon size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: isLight ? "#0F172A" : "var(--tw-text-white)" }}>
                    Tunewave Globel Network
                  </div>
                  <div style={{ fontSize: "0.82rem", color: isLight ? "#64748B" : "var(--tw-text-dim)" }}>
                    Document Reference: {activeDoc.id.toUpperCase()} • Effective Date: September 2026
                  </div>
                </div>
              </div>
              <span style={{ 
                fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: 9999,
                background: isLight ? "#FFFFFF" : "rgba(0, 229, 255, 0.1)",
                color: isLight ? "#007EA7" : "var(--tw-cyan)",
                border: `1px solid ${isLight ? "rgba(0, 126, 167, 0.3)" : "rgba(0, 229, 255, 0.25)"}`
              }}>
                CURRENT VERSION
              </span>
            </div>

            {/* Document Sections */}
            {filteredSections.length > 0 ? (
              filteredSections.map((section, sIdx) => {
                // Format markdown bold text like **bold** into <strong>
                const formattedBody = section.body.split("\n\n").map((para, pIdx) => {
                  // Handle bullet lists
                  if (para.includes("\n- ") || para.startsWith("- ")) {
                    const bullets = para.split("\n").filter(b => b.trim().startsWith("- "));
                    return (
                      <ul key={pIdx} style={{ margin: "10px 0 14px", paddingLeft: 22, lineHeight: 1.7 }}>
                        {bullets.map((b, bIdx) => {
                          const cleanBullet = b.replace(/^- /, "");
                          return (
                            <li key={bIdx} style={{ marginBottom: 6, color: isLight ? "#334155" : "var(--tw-text-dim)", fontSize: "0.95rem" }}>
                              {renderFormattedText(cleanBullet)}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  return (
                    <p key={pIdx} style={{ 
                      fontSize: "0.96rem", 
                      color: isLight ? "#334155" : "var(--tw-text-dim)", 
                      lineHeight: 1.75, 
                      marginBottom: 14 
                    }}>
                      {renderFormattedText(para)}
                    </p>
                  );
                });

                return (
                  <article key={sIdx} className="legal-section-card">
                    <h2 style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: 800, 
                      color: isLight ? "#0F172A" : "var(--tw-text-white)", 
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 10
                    }}>
                      <span style={{ 
                        width: 8, height: 8, borderRadius: "50%", 
                        background: isLight ? "#007EA7" : "var(--tw-cyan)", 
                        display: "inline-block" 
                      }} />
                      {section.heading}
                    </h2>
                    <div>{formattedBody}</div>
                  </article>
                );
              })
            ) : (
              <div style={{ 
                padding: "60px 20px", textAlign: "center", 
                background: isLight ? "#FFFFFF" : "var(--tw-bg-card)", 
                borderRadius: 16, border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "var(--tw-line)"}` 
              }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: isLight ? "#0F172A" : "var(--tw-text-white)", marginBottom: 8 }}>
                  No clauses match "{searchQuery}"
                </div>
                <div style={{ fontSize: "0.9rem", color: isLight ? "#64748B" : "var(--tw-text-dim)", marginBottom: 18 }}>
                  Try searching with broader terms or clear the search query.
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    padding: "10px 22px", borderRadius: 9999,
                    background: isLight ? "#007EA7" : "var(--tw-cyan)",
                    color: isLight ? "#FFFFFF" : "#040D1A",
                    border: "none", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer"
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Official Contact Footer Box */}
            <div style={{ 
              marginTop: 40, 
              padding: "32px", 
              borderRadius: 20, 
              background: isLight ? "#FFFFFF" : "var(--tw-bg-card)", 
              border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "var(--tw-line)"}`,
              boxShadow: isLight ? "0 4px 20px rgba(0,0,0,0.04)" : "0 12px 30px rgba(0,0,0,0.3)"
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: isLight ? "#0F172A" : "var(--tw-text-white)", marginBottom: 12 }}>
                Official Legal Contact Information
              </h3>
              <p style={{ fontSize: "0.92rem", color: isLight ? "#475569" : "var(--tw-text-dim)", lineHeight: 1.7, marginBottom: 16 }}>
                For legal notices, service requests, copyright takedowns, or dispute correspondence:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                <div style={{ padding: "14px 18px", borderRadius: 12, background: isLight ? "rgba(0,0,0,0.02)" : "var(--tw-bg-surface)", border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "var(--tw-line)"}` }}>
                  <div style={{ fontSize: "0.76rem", fontWeight: 800, color: isLight ? "#64748B" : "var(--tw-text-muted)", textTransform: "uppercase", marginBottom: 4 }}>Company</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: isLight ? "#0F172A" : "var(--tw-text-white)" }}>Tunewave Globel Network</div>
                </div>
                <div style={{ padding: "14px 18px", borderRadius: 12, background: isLight ? "rgba(0,0,0,0.02)" : "var(--tw-bg-surface)", border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "var(--tw-line)"}` }}>
                  <div style={{ fontSize: "0.76rem", fontWeight: 800, color: isLight ? "#64748B" : "var(--tw-text-muted)", textTransform: "uppercase", marginBottom: 4 }}>Legal Support Email</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: isLight ? "#007EA7" : "var(--tw-cyan)" }}>support@tunewavemusic.in</div>
                </div>
                <div style={{ padding: "14px 18px", borderRadius: 12, background: isLight ? "rgba(0,0,0,0.02)" : "var(--tw-bg-surface)", border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "var(--tw-line)"}` }}>
                  <div style={{ fontSize: "0.76rem", fontWeight: 800, color: isLight ? "#64748B" : "var(--tw-text-muted)", textTransform: "uppercase", marginBottom: 4 }}>Hours</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: isLight ? "#0F172A" : "var(--tw-text-white)" }}>Monday–Friday, 11:00 AM–6:00 PM IST</div>
                </div>
              </div>
              <div style={{ marginTop: 14, fontSize: "0.85rem", color: isLight ? "#64748B" : "var(--tw-text-muted)", lineHeight: 1.6 }}>
                <strong>Registered Address:</strong> 1-98/3/5/23 To 27, Jubilee Enclave, Madhapur, Shaikpet, Hyderabad, Telangana, India, 500081
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

// Helper function to render markdown bold elements (**text**) safely
function renderFormattedText(text) {
  if (!text.includes("**")) return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ fontWeight: 700, color: "inherit" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
