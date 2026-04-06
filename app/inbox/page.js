"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import AuthSessionProvider from "../components/AuthSessionProvider";
import { useLanguage } from "../components/LanguageProvider";
import {
  BILLING_STORAGE_KEY,
  CONNECTION_STORAGE_KEY,
  REVIEWS_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  defaultBilling,
  defaultConnection,
  defaultReviews,
  defaultSettings,
  normalizeBillingUsageState,
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
      "When auto-reply is off, every drafted reply stays here for your approval before posting.",
    connectedBusiness: "Connected business",
    replyMode: "Reply mode",
    pending: "Pending",
    ready: "Ready",
    posted: "Posted",
    autoPost: "Auto-reply on",
    approval: "Approval in Replyo",
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
    approve: "Confirm and post",
    changeMode: "Change mode",
    billingBlocked:
      "Reply generation is paused because your subscription is not active. Update billing to continue.",
    paymentPastDue:
      "Reply generation is paused because renewal payment failed. Update your card to continue.",
    replyLimitReached:
      "Your monthly reply limit has been reached for the current plan. Upgrade the plan to generate more replies this month.",
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
      "Quand la reponse auto est desactivee, chaque brouillon reste ici pour votre validation avant publication.",
    connectedBusiness: "Business connecte",
    replyMode: "Mode de reponse",
    pending: "En attente",
    ready: "Pret",
    posted: "Publie",
    autoPost: "Reponse auto activee",
    approval: "Validation dans Replyo",
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
    approve: "Confirmer et publier",
    changeMode: "Changer le mode",
    billingBlocked:
      "La generation des reponses est en pause car votre abonnement n'est pas actif. Mettez a jour la facturation pour continuer.",
    paymentPastDue:
      "La generation des reponses est en pause car le paiement du renouvellement a echoue. Mettez a jour votre carte pour continuer.",
    replyLimitReached:
      "La limite mensuelle de reponses de votre offre a ete atteinte. Passez a une offre superieure pour generer plus de reponses ce mois-ci.",
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
      "Cuando la respuesta automatica esta desactivada, cada borrador se queda aqui para tu aprobacion antes de publicar.",
    connectedBusiness: "Negocio conectado",
    replyMode: "Modo de respuesta",
    pending: "Pendientes",
    ready: "Listas",
    posted: "Publicadas",
    autoPost: "Respuesta auto activada",
    approval: "Aprobacion en Replyo",
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
    approve: "Confirmar y publicar",
    changeMode: "Cambiar modo",
    billingBlocked:
      "La generacion de respuestas esta en pausa porque tu suscripcion no esta activa. Actualiza la facturacion para continuar.",
    paymentPastDue:
      "La generacion de respuestas esta en pausa porque ha fallado el pago de renovacion. Actualiza tu tarjeta para continuar.",
    replyLimitReached:
      "Has alcanzado el limite mensual de respuestas de tu plan. Mejora el plan para generar mas respuestas este mes.",
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
      "Wenn die Auto-Antwort deaktiviert ist, bleibt jeder Entwurf hier fur Ihre Freigabe, bevor er veroffentlicht wird.",
    connectedBusiness: "Verbundenes Unternehmen",
    replyMode: "Antwortmodus",
    pending: "Offen",
    ready: "Bereit",
    posted: "Veroffentlicht",
    autoPost: "Auto-Antwort an",
    approval: "Freigabe in Replyo",
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
    approve: "Bestatigen und veroffentlichen",
    changeMode: "Modus andern",
    billingBlocked:
      "Die Antworterstellung ist pausiert, weil Ihr Abonnement nicht aktiv ist. Aktualisieren Sie die Abrechnung, um fortzufahren.",
    paymentPastDue:
      "Die Antworterstellung ist pausiert, weil die Verlaengerungszahlung fehlgeschlagen ist. Aktualisieren Sie Ihre Karte, um fortzufahren.",
    replyLimitReached:
      "Das monatliche Antwortlimit Ihres Tarifs ist erreicht. Upgraden Sie den Tarif, um in diesem Monat weitere Antworten zu erstellen.",
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
      "عندما يكون الرد التلقائي متوقفا، تبقى كل مسودة هنا بانتظار موافقتك قبل النشر.",
    connectedBusiness: "النشاط المتصل",
    replyMode: "وضع الرد",
    pending: "بانتظار الرد",
    ready: "جاهز",
    posted: "تم النشر",
    autoPost: "الرد التلقائي مفعّل",
    approval: "الموافقة داخل Replyo",
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
    approve: "تأكيد ونشر",
    changeMode: "تغيير الوضع",
    billingBlocked:
      "تم إيقاف إنشاء الردود مؤقتا لأن اشتراكك غير نشط. حدّث معلومات الفوترة للمتابعة.",
    paymentPastDue:
      "تم إيقاف إنشاء الردود مؤقتا لأن دفعة التجديد فشلت. حدّث بطاقتك للمتابعة.",
    replyLimitReached:
      "لقد وصلت الى الحد الشهري للردود في خطتك الحالية. قم بالترقية لإنشاء المزيد من الردود هذا الشهر.",
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
  const [billingState, setBillingState] = useState(defaultBilling);
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
    const storedBilling = normalizeBillingUsageState(
      readStoredValue(BILLING_STORAGE_KEY, defaultBilling),
    );

    setReviews(storedReviews.length ? storedReviews : defaultReviews);
    setSettings(storedSettings);
    setConnection(storedConnection);
    setBillingState(storedBilling);
    writeStoredValue(BILLING_STORAGE_KEY, storedBilling);

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

    if (billingState.status !== "active") {
      const nextReviews = reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: "error",
              replyText:
                billingState.status === "past_due"
                  ? copy.paymentPastDue
                  : copy.billingBlocked,
              source: "billing",
            }
          : review,
      );

      updateReviews(nextReviews);
      return;
    }

    if (
      billingState.replyLimit > 0 &&
      (billingState.repliesUsedThisPeriod || 0) >= billingState.replyLimit
    ) {
      const nextReviews = reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: "error",
              replyText: copy.replyLimitReached,
              source: "limit",
            }
          : review,
      );

      updateReviews(nextReviews);
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
      const nextBillingState = normalizeBillingUsageState({
        ...billingState,
        repliesUsedThisPeriod: (billingState.repliesUsedThisPeriod || 0) + 1,
      });
      setBillingState(nextBillingState);
      writeStoredValue(BILLING_STORAGE_KEY, nextBillingState);
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
          background: "#07090d",
          direction: language === "ar" ? "rtl" : "ltr",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            background: "rgba(255,255,255,0.025)",
            borderRadius: "24px",
            padding: "32px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.22)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "12px" }}>
            {copy.loginTitle}
          </h2>
          <p style={{ color: "rgba(248,250,252,0.64)", lineHeight: 1.7, marginBottom: "20px" }}>
            {copy.loginText}
          </p>
          <Link
            href="/login"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "#ffffff",
              color: "#07090d",
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
  const darkCard = {
    background: "rgba(255,255,255,0.025)",
    borderRadius: "24px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 24px 70px rgba(0,0,0,0.22)",
    color: "#f8fafc",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07090d",
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
          <Link href="/dashboard" style={{ color: "rgba(248,250,252,0.68)", textDecoration: "none" }}>
            ← {copy.back}
          </Link>
          <button
            onClick={() => signOut()}
            style={{
              background: "#ffffff",
              color: "#07090d",
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
            background: "rgba(255,255,255,0.025)",
            color: "#ffffff",
            borderRadius: "28px",
            padding: "30px",
            marginBottom: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.06)",
              fontSize: "13px",
              marginBottom: "14px",
              color: "rgba(248,250,252,0.72)",
            }}
          >
            {copy.badge}
          </div>
          <h1 style={{ fontSize: "42px", marginBottom: "10px", letterSpacing: "-0.05em" }}>{copy.title}</h1>
          <p style={{ color: "rgba(248,250,252,0.64)", lineHeight: 1.7, margin: 0, maxWidth: "54ch" }}>
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
            <div key={label} style={{ ...darkCard, padding: "20px" }}>
              <div style={{ fontSize: "13px", color: "rgba(248,250,252,0.52)", marginBottom: "8px" }}>
                {label}
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff" }}>
                {value}
              </div>
            </div>
          ))}
        </section>

        {!connection.isConnected ? (
          <section style={darkCard}>
            <h2 style={{ fontSize: "24px", color: "#ffffff", marginBottom: "10px" }}>
              {copy.noBusinessTitle}
            </h2>
            <p style={{ color: "rgba(248,250,252,0.64)", lineHeight: 1.7, marginBottom: "16px", maxWidth: "52ch" }}>
              {copy.noBusinessText}
            </p>
            <Link
              href="/connect-google"
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "#ffffff",
                color: "#07090d",
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
              <article key={review.id} style={{ ...darkCard, padding: "22px" }}>
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
                    <div style={{ fontSize: "13px", color: "rgba(248,250,252,0.52)", marginBottom: "6px" }}>
                      {review.businessName}
                    </div>
                    <h2 style={{ fontSize: "24px", color: "#ffffff", margin: 0 }}>
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
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(248,250,252,0.82)",
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
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(248,250,252,0.82)",
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
                            background: "rgba(251,188,5,0.12)",
                            color: "#f4d36a",
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
                          ? "rgba(251,188,5,0.12)"
                          : review.status === "ready"
                            ? "rgba(255,255,255,0.08)"
                            : review.status === "error"
                              ? "rgba(255,255,255,0.04)"
                              : "rgba(255,255,255,0.04)",
                      color:
                        review.status === "posted"
                          ? "#f4d36a"
                          : review.status === "ready"
                            ? "#ffffff"
                            : review.status === "error"
                              ? "#f5b8b8"
                              : "rgba(248,250,252,0.72)",
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
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "18px", padding: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ fontSize: "13px", color: "rgba(248,250,252,0.52)", marginBottom: "8px" }}>
                      {copy.review}
                    </div>
                    <div style={{ color: "rgba(248,250,252,0.82)", lineHeight: 1.7 }}>{review.reviewText}</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "18px", padding: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ fontSize: "13px", color: "rgba(248,250,252,0.52)", marginBottom: "8px" }}>
                      {copy.draft}
                    </div>
                    <div style={{ color: "rgba(248,250,252,0.82)", lineHeight: 1.7 }}>
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
                        background: "rgba(255,255,255,0.04)",
                        color: "rgba(248,250,252,0.82)",
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
                      background: "rgba(251,188,5,0.12)",
                      color: "#f4d36a",
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
                    disabled={activeReviewId === review.id || billingState.status !== "active"}
                    style={{
                      background: "#ffffff",
                      color: "#07090d",
                      border: "none",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      cursor:
                        activeReviewId === review.id
                          ? "wait"
                          : billingState.status !== "active"
                            ? "not-allowed"
                            : "pointer",
                      opacity: activeReviewId === review.id || billingState.status !== "active" ? 0.7 : 1,
                    }}
                  >
                    {activeReviewId === review.id ? copy.generating : copy.generate}
                  </button>
                  {review.status === "ready" ? (
                    <button
                      type="button"
                      onClick={() => handlePost(review.id)}
                      style={{
                        background: "rgba(251,188,5,0.12)",
                        color: "#f4d36a",
                        border: "1px solid rgba(251,188,5,0.28)",
                        borderRadius: "14px",
                        padding: "12px 14px",
                        cursor: "pointer",
                      }}
                    >
                      {copy.approve}
                    </button>
                  ) : null}
                  <Link
                    href="/dashboard"
                    style={{
                      textDecoration: "none",
                      background: "rgba(255,255,255,0.04)",
                      color: "#ffffff",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      border: "1px solid rgba(255,255,255,0.08)",
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

function InboxPageContent() {
  return <InboxContent />;
}

export default function InboxPage() {
  return (
    <AuthSessionProvider>
      <InboxPageContent />
    </AuthSessionProvider>
  );
}
