"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
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
  readStoredValue,
  writeStoredValue,
} from "../lib/demoState";

const dashboardCopy = {
  en: {
    loading: "Loading...",
    loginTitle: "You need to log in to access the dashboard",
    loginText: "Use the demo account or return to the login page to continue.",
    goLogin: "Go to login",
    demoSignup: "Use demo signup",
    back: "Back to home",
    signOut: "Sign out",
    badge: "Replyo control center",
    title: "Everything important in one place.",
    description:
      "Use the dashboard as your control center: account details, review progress, automation mode, billing, and connected business.",
    accountTitle: "Account",
    name: "Name",
    email: "Email",
    loginMethod: "Login method",
    security: "Security",
    passwordNote: "Manage password and security from your account settings.",
    openSettings: "Open settings",
    reviewTitle: "Review activity",
    reviewText:
      "See how many replies are done, how many still need confirmation, and what still needs attention.",
    generated: "Replies done",
    pending: "Waiting for reply",
    confirmation: "Waiting for confirmation",
    posted: "Already posted",
    openInbox: "Open inbox",
    inboxTitle: "Inbox",
    inboxText:
      "Keep the queue simple. See immediately if any replies are waiting for your confirmation.",
    automationTitle: "Automation mode",
    automationText:
      "Choose whether Replyo should post directly or prepare a draft for your approval first.",
    trustTitle: "Trust Replyo",
    trustText: "Reply directly to reviews automatically",
    confirmTitle: "Review first",
    confirmText: "Create a draft, then confirm and edit before posting",
    billingTitle: "Billing",
    billingText:
      "Keep your current plan, next billing date, and subscription status visible.",
    plan: "Plan",
    amount: "Amount",
    status: "Status",
    nextBilling: "Next billing date",
    managePlan: "Manage plan",
    active: "Active",
    inactive: "Inactive",
    noPlan: "No active plan",
    notScheduled: "Not scheduled",
    connectedTitle: "Connected business",
    connectedText:
      "This is the Google Business Profile Replyo is currently prepared to monitor for reviews.",
    provider: "Provider",
    location: "Location",
    category: "Category",
    city: "City",
    notConnected: "Not connected yet",
    connectBusiness: "Connect Google Business",
    choosePlan: "Choose a plan first",
    googleProvider: "Google Business Profile",
    credentials: "Email and password",
    google: "Google",
  },
  fr: {
    loading: "Chargement...",
    loginTitle: "Vous devez vous connecter pour acceder au tableau de bord",
    loginText: "Utilisez le compte demo ou revenez a la page de connexion pour continuer.",
    goLogin: "Aller a la connexion",
    demoSignup: "Utiliser l'inscription demo",
    back: "Retour a l'accueil",
    signOut: "Se deconnecter",
    badge: "Centre de controle Replyo",
    title: "Tout l'essentiel au meme endroit.",
    description:
      "Utilisez le tableau de bord comme centre de controle: compte, progression des avis, automatisation, facturation et business connecte.",
    accountTitle: "Compte",
    name: "Nom",
    email: "Email",
    loginMethod: "Methode de connexion",
    security: "Securite",
    passwordNote: "Gerez le mot de passe et la securite depuis les parametres du compte.",
    openSettings: "Ouvrir les parametres",
    reviewTitle: "Activite des avis",
    reviewText:
      "Voyez combien de reponses sont deja faites, combien attendent une validation et ce qui demande encore une action.",
    generated: "Reponses faites",
    pending: "En attente de reponse",
    confirmation: "En attente de validation",
    posted: "Deja publie",
    openInbox: "Ouvrir la boite",
    inboxTitle: "Boite de reception",
    inboxText:
      "Gardez la file simple. Voyez tout de suite si des reponses attendent votre validation.",
    automationTitle: "Mode d'automatisation",
    automationText:
      "Choisissez si Replyo doit publier directement ou preparer un brouillon pour votre validation.",
    trustTitle: "Faire confiance a Replyo",
    trustText: "Repondre automatiquement aux avis",
    confirmTitle: "Verifier d'abord",
    confirmText: "Creer un brouillon puis confirmer et modifier avant publication",
    billingTitle: "Facturation",
    billingText:
      "Gardez votre offre actuelle, la prochaine date de facturation et le statut d'abonnement bien visibles.",
    plan: "Offre",
    amount: "Montant",
    status: "Statut",
    nextBilling: "Prochaine facturation",
    managePlan: "Gerer l'offre",
    active: "Actif",
    inactive: "Inactif",
    noPlan: "Aucune offre active",
    notScheduled: "Non planifie",
    connectedTitle: "Business connecte",
    connectedText:
      "C'est le profil Google Business que Replyo est actuellement pret a surveiller pour les avis.",
    provider: "Fournisseur",
    location: "Etablissement",
    category: "Categorie",
    city: "Ville",
    notConnected: "Pas encore connecte",
    connectBusiness: "Connecter Google Business",
    choosePlan: "Choisir une offre d'abord",
    googleProvider: "Google Business Profile",
    credentials: "Email et mot de passe",
    google: "Google",
  },
  es: {
    loading: "Cargando...",
    loginTitle: "Debes iniciar sesion para acceder al panel",
    loginText: "Usa la cuenta demo o vuelve a la pagina de login para continuar.",
    goLogin: "Ir al login",
    demoSignup: "Usar registro demo",
    back: "Volver al inicio",
    signOut: "Cerrar sesion",
    badge: "Centro de control de Replyo",
    title: "Todo lo importante en un solo lugar.",
    description:
      "Usa el panel como centro de control: cuenta, progreso de resenas, automatizacion, facturacion y negocio conectado.",
    accountTitle: "Cuenta",
    name: "Nombre",
    email: "Correo",
    loginMethod: "Metodo de acceso",
    security: "Seguridad",
    passwordNote: "Gestiona la contrasena y la seguridad desde los ajustes de la cuenta.",
    openSettings: "Abrir ajustes",
    reviewTitle: "Actividad de resenas",
    reviewText:
      "Mira cuantas respuestas ya estan hechas, cuantas esperan confirmacion y que sigue necesitando atencion.",
    generated: "Respuestas hechas",
    pending: "Esperando respuesta",
    confirmation: "Esperando confirmacion",
    posted: "Ya publicadas",
    openInbox: "Abrir inbox",
    inboxTitle: "Inbox",
    inboxText:
      "Mantén la cola simple. Mira enseguida si hay respuestas esperando tu confirmacion.",
    automationTitle: "Modo de automatizacion",
    automationText:
      "Elige si Replyo debe publicar directamente o preparar un borrador para tu aprobacion.",
    trustTitle: "Confiar en Replyo",
    trustText: "Responder automaticamente a las resenas",
    confirmTitle: "Revisar primero",
    confirmText: "Crear un borrador y luego confirmar y editar antes de publicar",
    billingTitle: "Facturacion",
    billingText:
      "Mantén visible tu plan actual, la proxima fecha de cobro y el estado de la suscripcion.",
    plan: "Plan",
    amount: "Importe",
    status: "Estado",
    nextBilling: "Proxima facturacion",
    managePlan: "Gestionar plan",
    active: "Activo",
    inactive: "Inactivo",
    noPlan: "Sin plan activo",
    notScheduled: "No programado",
    connectedTitle: "Negocio conectado",
    connectedText:
      "Este es el perfil de Google Business que Replyo esta preparado para vigilar.",
    provider: "Proveedor",
    location: "Ubicacion",
    category: "Categoria",
    city: "Ciudad",
    notConnected: "Todavia no conectado",
    connectBusiness: "Conectar Google Business",
    choosePlan: "Elegir un plan primero",
    googleProvider: "Google Business Profile",
    credentials: "Email y contrasena",
    google: "Google",
  },
  de: {
    loading: "Wird geladen...",
    loginTitle: "Sie mussen eingeloggt sein, um das Dashboard zu sehen",
    loginText: "Nutzen Sie das Demo-Konto oder gehen Sie zur Login-Seite zuruck.",
    goLogin: "Zum Login",
    demoSignup: "Demo-Registrierung nutzen",
    back: "Zuruck zur Startseite",
    signOut: "Abmelden",
    badge: "Replyo Kontrollzentrum",
    title: "Alles Wichtige an einem Ort.",
    description:
      "Nutzen Sie das Dashboard als Kontrollzentrum: Konto, Bewertungsfortschritt, Automatisierung, Abrechnung und verbundenes Unternehmen.",
    accountTitle: "Konto",
    name: "Name",
    email: "E-Mail",
    loginMethod: "Anmeldemethode",
    security: "Sicherheit",
    passwordNote: "Verwalten Sie Passwort und Sicherheit in den Kontoeinstellungen.",
    openSettings: "Einstellungen offnen",
    reviewTitle: "Bewertungsaktivitat",
    reviewText:
      "Sehen Sie, wie viele Antworten fertig sind, wie viele noch freigegeben werden mussen und was noch Aufmerksamkeit braucht.",
    generated: "Antworten fertig",
    pending: "Wartet auf Antwort",
    confirmation: "Wartet auf Bestatigung",
    posted: "Bereits veroffentlicht",
    openInbox: "Inbox offnen",
    inboxTitle: "Inbox",
    inboxText:
      "Halten Sie die Warteschlange einfach. Sehen Sie sofort, ob Antworten auf Ihre Bestatigung warten.",
    automationTitle: "Automatisierungsmodus",
    automationText:
      "Wahlen Sie, ob Replyo direkt veroffentlichen oder zuerst einen Entwurf fur Ihre Freigabe vorbereiten soll.",
    trustTitle: "Replyo vertrauen",
    trustText: "Automatisch direkt auf Bewertungen antworten",
    confirmTitle: "Zuerst prufen",
    confirmText: "Einen Entwurf erstellen und vor der Veroffentlichung bestaetigen und bearbeiten",
    billingTitle: "Abrechnung",
    billingText:
      "Behalten Sie Ihren aktuellen Tarif, das nachste Abrechnungsdatum und den Abo-Status im Blick.",
    plan: "Tarif",
    amount: "Betrag",
    status: "Status",
    nextBilling: "Naechste Abrechnung",
    managePlan: "Tarif verwalten",
    active: "Aktiv",
    inactive: "Inaktiv",
    noPlan: "Kein aktiver Tarif",
    notScheduled: "Nicht geplant",
    connectedTitle: "Verbundenes Unternehmen",
    connectedText:
      "Dies ist das Google-Business-Profil, das Replyo aktuell fur Bewertungen beobachten soll.",
    provider: "Anbieter",
    location: "Standort",
    category: "Kategorie",
    city: "Stadt",
    notConnected: "Noch nicht verbunden",
    connectBusiness: "Google Business verbinden",
    choosePlan: "Zuerst einen Tarif wahlen",
    googleProvider: "Google Business Profile",
    credentials: "E-Mail und Passwort",
    google: "Google",
  },
  ar: {
    loading: "جارٍ التحميل...",
    loginTitle: "يجب تسجيل الدخول للوصول الى لوحة التحكم",
    loginText: "استخدم الحساب التجريبي او عد الى صفحة تسجيل الدخول للمتابعة.",
    goLogin: "الذهاب الى تسجيل الدخول",
    demoSignup: "استخدام التسجيل التجريبي",
    back: "العودة الى الرئيسية",
    signOut: "تسجيل الخروج",
    badge: "مركز تحكم Replyo",
    title: "كل ما يهم في مكان واحد.",
    description:
      "استخدم لوحة التحكم كمركز قيادة: الحساب، تقدم التقييمات، وضع الأتمتة، الفوترة، والنشاط المتصل.",
    accountTitle: "الحساب",
    name: "الاسم",
    email: "البريد الالكتروني",
    loginMethod: "طريقة تسجيل الدخول",
    security: "الأمان",
    passwordNote: "ادِر كلمة المرور والأمان من إعدادات الحساب.",
    openSettings: "فتح الإعدادات",
    reviewTitle: "نشاط التقييمات",
    reviewText:
      "شاهد كم ردا تم بالفعل، وكم ردا ينتظر التأكيد، وما الذي ما زال يحتاج إلى متابعة.",
    generated: "الردود المنجزة",
    pending: "بانتظار الرد",
    confirmation: "بانتظار التأكيد",
    posted: "تم نشره",
    openInbox: "فتح الصندوق",
    inboxTitle: "صندوق التقييمات",
    inboxText:
      "اجعل القائمة بسيطة. شاهد مباشرة إن كانت هناك ردود تنتظر تأكيدك.",
    automationTitle: "وضع الأتمتة",
    automationText:
      "اختر ما اذا كان Replyo يجب أن ينشر مباشرة أو يجهز مسودة لمراجعتك أولا.",
    trustTitle: "الثقة في Replyo",
    trustText: "الرد مباشرة على التقييمات تلقائيا",
    confirmTitle: "راجع أولا",
    confirmText: "أنشئ مسودة ثم أكد وعدل قبل النشر",
    billingTitle: "الفوترة",
    billingText:
      "احتفظ بالخطة الحالية وتاريخ الفاتورة التالية وحالة الاشتراك بشكل واضح.",
    plan: "الخطة",
    amount: "المبلغ",
    status: "الحالة",
    nextBilling: "تاريخ الفاتورة التالية",
    managePlan: "إدارة الخطة",
    active: "نشط",
    inactive: "غير نشط",
    noPlan: "لا توجد خطة نشطة",
    notScheduled: "غير مجدول",
    connectedTitle: "النشاط المتصل",
    connectedText:
      "هذا هو ملف Google Business الذي تم تجهيز Replyo حاليا لمراقبته من اجل التقييمات.",
    provider: "المزوّد",
    location: "النشاط",
    category: "الفئة",
    city: "المدينة",
    notConnected: "غير متصل بعد",
    connectBusiness: "ربط Google Business",
    choosePlan: "اختر خطة اولا",
    googleProvider: "Google Business Profile",
    credentials: "البريد وكلمة المرور",
    google: "Google",
  },
};

function DashboardContent() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const copy = dashboardCopy[language] || dashboardCopy.en;
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [connection, setConnection] = useState(defaultConnection);
  const [billingState, setBillingState] = useState(defaultBilling);

  useEffect(() => {
    const storedReviews = readStoredValue(REVIEWS_STORAGE_KEY, defaultReviews);
    const storedSettings = readStoredValue(SETTINGS_STORAGE_KEY, defaultSettings);
    const storedConnection = readStoredValue(CONNECTION_STORAGE_KEY, defaultConnection);
    const storedBilling = readStoredValue(BILLING_STORAGE_KEY, defaultBilling);

    setReviews(storedReviews.length ? storedReviews : defaultReviews);
    setSettings(storedSettings);
    setConnection(storedConnection);
    setBillingState(storedBilling);
  }, []);

  function updateReplyMode(replyMode) {
    const nextSettings = {
      ...settings,
      replyMode,
    };

    setSettings(nextSettings);
    writeStoredValue(SETTINGS_STORAGE_KEY, nextSettings);
  }

  const repliesGenerated = reviews.filter((review) => review.replyText).length;
  const pendingCount = reviews.filter((review) => review.status === "needs-reply").length;
  const readyCount = reviews.filter((review) => review.status === "ready").length;
  const postedCount = reviews.filter((review) => review.status === "posted").length;
  const authMethod =
    session?.user?.provider === "google"
      ? copy.google
      : session?.user?.provider === "credentials"
        ? copy.credentials
        : copy.notConnected;

  const billing = {
    planName: billingState.planName || copy.noPlan,
    amount: billingState.amountLabel || copy.choosePlan,
    status: billingState.status === "active" ? copy.active : copy.inactive,
    nextBillingDate: billingState.nextBillingDate || copy.notScheduled,
  };

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
            maxWidth: "480px",
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
          <div style={{ display: "grid", gap: "12px" }}>
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                borderRadius: "14px",
                padding: "14px 16px",
                fontWeight: "600",
              }}
            >
              {copy.goLogin}
            </Link>
            <Link
              href="/signup"
              style={{
                textDecoration: "none",
                background: "#eff3fb",
                color: "#172033",
                borderRadius: "14px",
                padding: "14px 16px",
                fontWeight: "600",
              }}
            >
              {copy.demoSignup}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff4d8 0%, #f7f4ec 35%, #eef3ff 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px 80px",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "#444" }}>
            ← {copy.back}
          </Link>

          <button
            onClick={() => signOut()}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "10px",
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
            boxShadow: "0 20px 50px rgba(20,20,20,0.15)",
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
          <p style={{ color: "rgba(255,248,236,0.82)", lineHeight: 1.7, margin: 0 }}>
            {copy.description}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "18px",
            marginBottom: "18px",
          }}
        >
          <article
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
              {copy.accountTitle}
            </h2>
            <div style={{ display: "grid", gap: "12px", marginBottom: "18px" }}>
              {[
                [copy.name, session.user?.name || copy.notConnected],
                [copy.email, session.user?.email || copy.notConnected],
                [copy.loginMethod, authMethod],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{ background: "#f8fafc", borderRadius: "16px", padding: "14px 16px" }}
                >
                  <div style={{ color: "#6b7280", fontSize: "13px", marginBottom: "6px" }}>
                    {label}
                  </div>
                  <div style={{ color: "#172033", fontWeight: "700" }}>{value}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#fff6df",
                color: "#8b5e00",
                borderRadius: "16px",
                padding: "14px 16px",
                lineHeight: 1.65,
                marginBottom: "16px",
              }}
            >
              <strong>{copy.security}:</strong> {copy.passwordNote}
            </div>
            <Link
              href="/settings"
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                borderRadius: "14px",
                padding: "12px 16px",
                fontWeight: "600",
              }}
            >
              {copy.openSettings}
            </Link>
          </article>

          <article
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
              {copy.billingTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
              {copy.billingText}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {[
                [copy.plan, billing.planName],
                [copy.amount, billing.amount],
                [copy.status, billing.status],
                [copy.nextBilling, billing.nextBillingDate],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{ background: "#f8fafc", borderRadius: "16px", padding: "14px 16px" }}
                >
                  <div style={{ color: "#6b7280", fontSize: "13px", marginBottom: "6px" }}>
                    {label}
                  </div>
                  <div style={{ color: "#172033", fontWeight: "700" }}>{value}</div>
                </div>
              ))}
            </div>
            <Link
              href="/pricing"
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                borderRadius: "14px",
                padding: "12px 16px",
                fontWeight: "600",
              }}
            >
              {copy.managePlan}
            </Link>
          </article>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginBottom: "18px",
          }}
        >
          <article
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
              {copy.reviewTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
              {copy.reviewText}
            </p>
            <div style={{ display: "grid", gap: "12px", marginBottom: "16px" }}>
              {[
                [copy.generated, repliesGenerated, "#effbf3", "#1f7a45"],
                [copy.pending, pendingCount, "#fff6df", "#8b5e00"],
                [copy.confirmation, readyCount, "#eef6ff", "#31598e"],
                [copy.posted, postedCount, "#f5f8ff", "#5a6b89"],
              ].map(([label, value, background, color]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background,
                    borderRadius: "16px",
                    padding: "14px 16px",
                  }}
                >
                  <span style={{ color }}>{label}</span>
                  <strong style={{ color: "#172033", fontSize: "22px" }}>{value}</strong>
                </div>
              ))}
            </div>
          </article>

          <article
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
              {copy.inboxTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
              {copy.inboxText}
            </p>
            <div style={{ display: "grid", gap: "12px", marginBottom: "16px" }}>
              {[
                [copy.pending, pendingCount, "#fff6df", "#8b5e00"],
                [copy.confirmation, readyCount, "#eef6ff", "#31598e"],
                [copy.posted, postedCount, "#effbf3", "#1f7a45"],
              ].map(([label, value, background, color]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background,
                    borderRadius: "16px",
                    padding: "14px 16px",
                  }}
                >
                  <span style={{ color }}>{label}</span>
                  <strong style={{ color: "#172033", fontSize: "22px" }}>{value}</strong>
                </div>
              ))}
            </div>
            <Link
              href="/inbox"
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                borderRadius: "14px",
                padding: "12px 16px",
                fontWeight: "600",
              }}
            >
              {copy.openInbox}
            </Link>
          </article>

          <article
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
              {copy.automationTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
              {copy.automationText}
            </p>
            <div style={{ display: "grid", gap: "12px" }}>
              <button
                type="button"
                onClick={() => updateReplyMode("auto")}
                style={{
                  textAlign: "left",
                  background: settings.replyMode === "auto" ? "#eefbf3" : "#f8fafc",
                  border:
                    settings.replyMode === "auto"
                      ? "1px solid #b8e3c6"
                      : "1px solid #e4e9f2",
                  borderRadius: "18px",
                  padding: "16px",
                  cursor: "pointer",
                }}
              >
                <div style={{ color: "#172033", fontWeight: "700", marginBottom: "6px" }}>
                  {copy.trustTitle}
                </div>
                <div style={{ color: "#5b6473", lineHeight: 1.6 }}>{copy.trustText}</div>
              </button>

              <button
                type="button"
                onClick={() => updateReplyMode("approval")}
                style={{
                  textAlign: "left",
                  background: settings.replyMode === "approval" ? "#eef6ff" : "#f8fafc",
                  border:
                    settings.replyMode === "approval"
                      ? "1px solid #cfe0ff"
                      : "1px solid #e4e9f2",
                  borderRadius: "18px",
                  padding: "16px",
                  cursor: "pointer",
                }}
              >
                <div style={{ color: "#172033", fontWeight: "700", marginBottom: "6px" }}>
                  {copy.confirmTitle}
                </div>
                <div style={{ color: "#5b6473", lineHeight: 1.6 }}>{copy.confirmText}</div>
              </button>
            </div>
          </article>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)" }}>
          <article
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
              {copy.connectedTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
              {copy.connectedText}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {[
                [copy.provider, connection.provider || copy.googleProvider],
                [copy.location, connection.selectedLocationName || copy.notConnected],
                [copy.category, connection.selectedLocationCategory || copy.notConnected],
                [copy.city, connection.selectedLocationCity || copy.notConnected],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{ background: "#f8fafc", borderRadius: "16px", padding: "14px 16px" }}
                >
                  <div style={{ color: "#6b7280", fontSize: "13px", marginBottom: "6px" }}>
                    {label}
                  </div>
                  <div style={{ color: "#172033", fontWeight: "700" }}>{value}</div>
                </div>
              ))}
            </div>
            <Link
              href={billingState.status === "active" ? "/connect-google" : "/pricing"}
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                borderRadius: "14px",
                padding: "12px 16px",
                fontWeight: "600",
              }}
            >
              {billingState.status === "active" ? copy.connectBusiness : copy.choosePlan}
            </Link>
          </article>
        </section>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
