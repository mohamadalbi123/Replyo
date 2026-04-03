"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useLanguage } from "../components/LanguageProvider";
import {
  CONNECTION_STORAGE_KEY,
  REVIEWS_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  defaultConnection,
  defaultReviews,
  defaultSettings,
  readStoredValue,
  writeStoredValue,
} from "../lib/demoState";

const inboxCopy = {
  en: {
    loading: "Loading inbox...",
    loginTitle: "You need to log in to access the inbox",
    loginText: "Return to the login page to continue into your Replyo workspace.",
    loginButton: "Go to login",
    back: "Back to dashboard",
    signOut: "Sign out",
    badge: "Review inbox",
    title: "New reviews, draft replies, and posting status in one place.",
    description:
      "Replyo can either post directly when you trust the automation or hold the draft for your approval first.",
    connectedBusiness: "Connected business",
    replyMode: "Reply mode",
    pending: "Pending",
    ready: "Ready",
    posted: "Posted",
    autoPost: "Auto-post",
    approval: "Approval",
    notConnected: "Not connected",
    noBusinessTitle: "No connected business yet",
    noBusinessText:
      "Connect a business first so Replyo knows which Google Business Profile it should monitor for new reviews.",
    connectBusiness: "Connect Google Business",
    stars: "stars",
    localBusiness: "Local business",
    review: "Review",
    draft: "Reply draft",
    noDraft: "No reply generated yet.",
    tone: "Tone",
    generating: "Generating...",
    generate: "Generate reply",
    approve: "Approve and post",
    changeMode: "Change mode",
    statuses: {
      "needs-reply": "Needs reply",
      ready: "Ready",
      posted: "Posted",
      error: "Error",
    },
  },
  fr: {
    loading: "Chargement de la boite...",
    loginTitle: "Vous devez vous connecter pour acceder a la boite",
    loginText: "Retournez a la page de connexion pour continuer dans Replyo.",
    loginButton: "Aller a la connexion",
    back: "Retour au tableau de bord",
    signOut: "Se deconnecter",
    badge: "Boite des avis",
    title: "Nouveaux avis, brouillons de reponse et statut de publication au meme endroit.",
    description:
      "Replyo peut publier directement lorsque vous faites confiance a l'automatisation ou garder le brouillon pour validation.",
    connectedBusiness: "Business connecte",
    replyMode: "Mode de reponse",
    pending: "En attente",
    ready: "Pret",
    posted: "Publie",
    autoPost: "Publication auto",
    approval: "Validation",
    notConnected: "Non connecte",
    noBusinessTitle: "Aucun business connecte",
    noBusinessText:
      "Connectez d'abord un business pour que Replyo sache quel profil Google Business surveiller pour les nouveaux avis.",
    connectBusiness: "Connecter Google Business",
    stars: "etoiles",
    localBusiness: "Business local",
    review: "Avis",
    draft: "Brouillon de reponse",
    noDraft: "Aucune reponse generee pour le moment.",
    tone: "Ton",
    generating: "Generation...",
    generate: "Generer la reponse",
    approve: "Valider et publier",
    changeMode: "Changer le mode",
    statuses: {
      "needs-reply": "A traiter",
      ready: "Pret",
      posted: "Publie",
      error: "Erreur",
    },
  },
  es: {
    loading: "Cargando inbox...",
    loginTitle: "Debes iniciar sesion para acceder al inbox",
    loginText: "Vuelve a la pagina de login para continuar en Replyo.",
    loginButton: "Ir al login",
    back: "Volver al panel",
    signOut: "Cerrar sesion",
    badge: "Inbox de resenas",
    title: "Nuevas resenas, borradores de respuesta y estado de publicacion en un solo lugar.",
    description:
      "Replyo puede publicar directamente cuando confias en la automatizacion o guardar el borrador para tu aprobacion.",
    connectedBusiness: "Negocio conectado",
    replyMode: "Modo de respuesta",
    pending: "Pendientes",
    ready: "Listas",
    posted: "Publicadas",
    autoPost: "Auto-publicacion",
    approval: "Aprobacion",
    notConnected: "No conectado",
    noBusinessTitle: "Todavia no hay negocio conectado",
    noBusinessText:
      "Conecta primero un negocio para que Replyo sepa que perfil de Google Business debe vigilar para nuevas resenas.",
    connectBusiness: "Conectar Google Business",
    stars: "estrellas",
    localBusiness: "Negocio local",
    review: "Resena",
    draft: "Borrador de respuesta",
    noDraft: "Todavia no se ha generado ninguna respuesta.",
    tone: "Tono",
    generating: "Generando...",
    generate: "Generar respuesta",
    approve: "Aprobar y publicar",
    changeMode: "Cambiar modo",
    statuses: {
      "needs-reply": "Necesita respuesta",
      ready: "Lista",
      posted: "Publicada",
      error: "Error",
    },
  },
  de: {
    loading: "Inbox wird geladen...",
    loginTitle: "Sie mussen eingeloggt sein, um die Inbox zu sehen",
    loginText: "Gehen Sie zur Login-Seite zuruck, um in Replyo weiterzumachen.",
    loginButton: "Zum Login",
    back: "Zuruck zum Dashboard",
    signOut: "Abmelden",
    badge: "Bewertungs-Inbox",
    title: "Neue Bewertungen, Antwortentwurfe und Veroffentlichungsstatus an einem Ort.",
    description:
      "Replyo kann direkt veroffentlichen, wenn Sie der Automatisierung vertrauen, oder den Entwurf zuerst fur Ihre Freigabe bereithalten.",
    connectedBusiness: "Verbundenes Unternehmen",
    replyMode: "Antwortmodus",
    pending: "Offen",
    ready: "Bereit",
    posted: "Veroffentlicht",
    autoPost: "Auto-Veroffentlichung",
    approval: "Freigabe",
    notConnected: "Nicht verbunden",
    noBusinessTitle: "Noch kein Unternehmen verbunden",
    noBusinessText:
      "Verbinden Sie zuerst ein Unternehmen, damit Replyo weiss, welches Google-Business-Profil fur neue Bewertungen beobachtet werden soll.",
    connectBusiness: "Google Business verbinden",
    stars: "Sterne",
    localBusiness: "Lokales Unternehmen",
    review: "Bewertung",
    draft: "Antwortentwurf",
    noDraft: "Es wurde noch keine Antwort erstellt.",
    tone: "Ton",
    generating: "Wird erstellt...",
    generate: "Antwort erstellen",
    approve: "Freigeben und veroffentlichen",
    changeMode: "Modus andern",
    statuses: {
      "needs-reply": "Antwort fehlt",
      ready: "Bereit",
      posted: "Veroffentlicht",
      error: "Fehler",
    },
  },
  ar: {
    loading: "جارٍ تحميل الصندوق...",
    loginTitle: "يجب تسجيل الدخول للوصول الى صندوق التقييمات",
    loginText: "عد الى صفحة تسجيل الدخول للمتابعة داخل Replyo.",
    loginButton: "الذهاب الى تسجيل الدخول",
    back: "العودة الى لوحة التحكم",
    signOut: "تسجيل الخروج",
    badge: "صندوق التقييمات",
    title: "التقييمات الجديدة ومسودات الرد وحالة النشر في مكان واحد.",
    description:
      "يمكن لـ Replyo النشر مباشرة عندما تثق بالأتمتة أو الاحتفاظ بالمسودة لمراجعتك اولا.",
    connectedBusiness: "النشاط المتصل",
    replyMode: "وضع الرد",
    pending: "بانتظار الرد",
    ready: "جاهز",
    posted: "تم النشر",
    autoPost: "نشر تلقائي",
    approval: "موافقة",
    notConnected: "غير متصل",
    noBusinessTitle: "لا يوجد نشاط متصل بعد",
    noBusinessText:
      "اربط نشاطا اولا حتى يعرف Replyo اي ملف Google Business يجب مراقبته للتقييمات الجديدة.",
    connectBusiness: "ربط Google Business",
    stars: "نجوم",
    localBusiness: "نشاط محلي",
    review: "التقييم",
    draft: "مسودة الرد",
    noDraft: "لم يتم إنشاء رد بعد.",
    tone: "النبرة",
    generating: "جارٍ الإنشاء...",
    generate: "إنشاء الرد",
    approve: "اعتماد ونشر",
    changeMode: "تغيير الوضع",
    statuses: {
      "needs-reply": "يحتاج ردا",
      ready: "جاهز",
      posted: "تم النشر",
      error: "خطأ",
    },
  },
};

function InboxContent() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const copy = inboxCopy[language] || inboxCopy.en;
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [connection, setConnection] = useState(defaultConnection);
  const [activeReviewId, setActiveReviewId] = useState("");

  useEffect(() => {
    const storedReviews = readStoredValue(REVIEWS_STORAGE_KEY, defaultReviews);
    const storedSettings = {
      ...defaultSettings,
      ...readStoredValue(SETTINGS_STORAGE_KEY, defaultSettings),
    };
    const storedConnection = {
      ...defaultConnection,
      ...readStoredValue(CONNECTION_STORAGE_KEY, defaultConnection),
    };

    setReviews(storedReviews.length ? storedReviews : defaultReviews);
    setSettings(storedSettings);
    setConnection(storedConnection);

    if (!storedReviews.length) {
      writeStoredValue(REVIEWS_STORAGE_KEY, defaultReviews);
    }
  }, []);

  function updateReviews(nextReviews) {
    setReviews(nextReviews);
    writeStoredValue(REVIEWS_STORAGE_KEY, nextReviews);
  }

  async function handleGenerate(reviewId) {
    const currentReview = reviews.find((review) => review.id === reviewId);

    if (!currentReview) {
      return;
    }

    setActiveReviewId(reviewId);

    try {
      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: currentReview.reviewText,
          rating: currentReview.rating,
          businessType:
            connection.selectedLocationCategory ||
            connection.selectedLocationType ||
            currentReview.businessType,
          businessName: connection.selectedLocationName || currentReview.businessName,
          tone: settings.tone,
          smartPersonalization: settings.smartPersonalization,
        }),
      });

      const data = await response.json();
      const nextStatus = settings.replyMode === "auto" ? "posted" : "ready";

      const nextReviews = reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              replyText: data.reply,
              source: data.source,
              status: nextStatus,
              detectedSentiment: data.context?.sentiment || review.detectedSentiment,
              detectedTopics: data.context?.detectedTopics || review.detectedTopics,
              businessType: connection.selectedLocationType || review.businessType,
              postedAt: settings.replyMode === "auto" ? new Date().toISOString() : "",
            }
          : review
      );

      updateReviews(nextReviews);
    } catch (error) {
      const nextReviews = reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: "error",
              replyText: "Reply generation failed. Please try again.",
              source: "error",
            }
          : review
      );

      updateReviews(nextReviews);
    } finally {
      setActiveReviewId("");
    }
  }

  function handlePost(reviewId) {
    const nextReviews = reviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            status: "posted",
            postedAt: new Date().toISOString(),
          }
        : review
    );

    updateReviews(nextReviews);
  }

  if (status === "loading") {
    return <main style={{ padding: "40px" }}>{copy.loading}</main>;
  }

  if (!session) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          background:
            "radial-gradient(circle at top left, #fff4d8 0%, #f7f4ec 35%, #eef3ff 100%)",
          direction: language === "ar" ? "rtl" : "ltr",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            background: "#fff",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "28px", color: "#172033", marginBottom: "12px" }}>
            {copy.loginTitle}
          </h2>
          <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "20px" }}>
            {copy.loginText}
          </p>
          <Link
            href="/login"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "#172033",
              color: "#fff",
              borderRadius: "14px",
              padding: "14px 18px",
              fontWeight: "600",
            }}
          >
            {copy.loginButton}
          </Link>
        </div>
      </main>
    );
  }

  const pendingCount = reviews.filter((review) => review.status === "needs-reply").length;
  const readyCount = reviews.filter((review) => review.status === "ready").length;
  const postedCount = reviews.filter((review) => review.status === "posted").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 40%, #edf3ff 100%)",
        padding: "48px 20px 80px",
        fontFamily: "Arial, sans-serif",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <Link href="/dashboard" style={{ color: "#4b5563", textDecoration: "none" }}>
            ← {copy.back}
          </Link>
          <button
            onClick={() => signOut()}
            style={{
              background: "#172033",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            {copy.signOut}
          </button>
        </div>

        <section
          style={{
            background: "#172033",
            color: "#fff8ec",
            borderRadius: "28px",
            padding: "30px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              fontSize: "13px",
              marginBottom: "14px",
            }}
          >
            {copy.badge}
          </div>
          <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>{copy.title}</h1>
          <p style={{ color: "rgba(255,248,236,0.8)", lineHeight: 1.7, margin: 0 }}>
            {copy.description}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          {[
            [copy.connectedBusiness, connection.selectedLocationName || copy.notConnected],
            [copy.replyMode, settings.replyMode === "auto" ? copy.autoPost : copy.approval],
            [copy.pending, pendingCount],
            [copy.ready, readyCount],
            [copy.posted, postedCount],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: "#fff",
                borderRadius: "22px",
                padding: "20px",
                boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
              }}
            >
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                {label}
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#172033" }}>
                {value}
              </div>
            </div>
          ))}
        </section>

        {!connection.isConnected ? (
          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "10px" }}>
              {copy.noBusinessTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "16px" }}>
              {copy.noBusinessText}
            </p>
            <Link
              href="/connect-google"
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                borderRadius: "14px",
                padding: "13px 16px",
                fontWeight: "600",
              }}
            >
              {copy.connectBusiness}
            </Link>
          </section>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {reviews.map((review) => (
              <article
                key={review.id}
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  padding: "22px",
                  boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
                      {review.businessName}
                    </div>
                    <h2 style={{ fontSize: "24px", color: "#172033", margin: 0 }}>
                      {review.customerName}
                    </h2>
                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          background: "#f5f8ff",
                          color: "#31598e",
                          borderRadius: "999px",
                          padding: "6px 10px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {review.rating}/5 {copy.stars}
                      </span>
                      <span
                        style={{
                          background: "#f5f8ff",
                          color: "#31598e",
                          borderRadius: "999px",
                          padding: "6px 10px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {connection.selectedLocationCategory ||
                          review.businessType ||
                          copy.localBusiness}
                      </span>
                      {review.detectedSentiment ? (
                        <span
                          style={{
                            background: "#fff6df",
                            color: "#8b5e00",
                            borderRadius: "999px",
                            padding: "6px 10px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {review.detectedSentiment}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: "999px",
                      background:
                        review.status === "posted"
                          ? "#eefbf3"
                          : review.status === "ready"
                            ? "#eef6ff"
                            : review.status === "error"
                              ? "#fff4f2"
                              : "#fff6df",
                      color:
                        review.status === "posted"
                          ? "#1f7a45"
                          : review.status === "ready"
                            ? "#31598e"
                            : review.status === "error"
                              ? "#9f1c00"
                              : "#8b5e00",
                      fontSize: "13px",
                      fontWeight: "600",
                      height: "fit-content",
                    }}
                  >
                    {copy.statuses[review.status] || review.status}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ background: "#f8fafc", borderRadius: "18px", padding: "16px" }}>
                    <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                      {copy.review}
                    </div>
                    <div style={{ color: "#344054", lineHeight: 1.7 }}>{review.reviewText}</div>
                  </div>
                  <div style={{ background: "#f9fbff", borderRadius: "18px", padding: "16px" }}>
                    <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                      {copy.draft}
                    </div>
                    <div style={{ color: "#344054", lineHeight: 1.7 }}>
                      {review.replyText || copy.noDraft}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "16px",
                  }}
                >
                  {(review.detectedTopics || []).map((topic) => (
                    <span
                      key={topic}
                      style={{
                        background: "#eef6ff",
                        color: "#31598e",
                        borderRadius: "999px",
                        padding: "8px 10px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                  <span
                    style={{
                      background: "#effbf3",
                      color: "#1f7a45",
                      borderRadius: "999px",
                      padding: "8px 10px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {copy.tone}: {settings.tone}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => handleGenerate(review.id)}
                    disabled={activeReviewId === review.id}
                    style={{
                      background: "#172033",
                      color: "#fff",
                      border: "none",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      cursor: activeReviewId === review.id ? "wait" : "pointer",
                      opacity: activeReviewId === review.id ? 0.7 : 1,
                    }}
                  >
                    {activeReviewId === review.id ? copy.generating : copy.generate}
                  </button>
                  {review.status === "ready" ? (
                    <button
                      type="button"
                      onClick={() => handlePost(review.id)}
                      style={{
                        background: "#eefbf3",
                        color: "#1f7a45",
                        border: "1px solid #b8e3c6",
                        borderRadius: "14px",
                        padding: "12px 14px",
                        cursor: "pointer",
                      }}
                    >
                      {copy.approve}
                    </button>
                  ) : null}
                  <Link
                    href="/settings"
                    style={{
                      textDecoration: "none",
                      background: "#eff3fb",
                      color: "#172033",
                      borderRadius: "14px",
                      padding: "12px 14px",
                    }}
                  >
                    {copy.changeMode}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function InboxPage() {
  return <InboxContent />;
}
