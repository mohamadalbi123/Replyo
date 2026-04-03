"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "../components/LanguageProvider";
import {
  CONNECTION_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  defaultConnection,
  defaultSettings,
  readStoredValue,
  writeStoredValue,
} from "../lib/demoState";

const settingsCopy = {
  en: {
    loading: "Loading settings...",
    loginTitle: "You must be logged in to access settings",
    loginText: "Return to the login page to continue into your Replyo workspace.",
    loginButton: "Go to login",
    back: "Back to dashboard",
    signOut: "Sign out",
    badge: "Account and operations",
    title: "Replyo settings",
    description:
      "Manage your connected account, business preferences, reply automation, and billing in one place.",
    businessTitle: "Business account",
    owner: "Owner",
    email: "Email",
    connectedLocation: "Connected location",
    notAvailable: "Not available",
    noLocation: "No location connected yet",
    manageConnection: "Manage Google Business connection",
    connectBusiness: "Connect Google Business",
    disconnectBusiness: "Disconnect business account",
    preferencesTitle: "Reply preferences",
    tone: "Brand tone",
    tones: [
      "Warm, professional, and concise",
      "Friendly and casual",
      "Premium and polished",
      "Calm and recovery-focused",
    ],
    personalization: "Smart personalization",
    personalizationText:
      "Use business category, rating, and review wording to shape replies",
    currentCategory: "Current detected category:",
    connectCategory: "Connect a business to detect its Google category.",
    replyMode: "Reply mode",
    approval: "Review before posting",
    auto: "I trust Replyo, post directly",
    alerts: "Alerts",
    alertsText: "Email notifications enabled",
    billingTitle: "Billing",
    plan: "Plan",
    status: "Status",
    nextInvoice: "Next invoice",
    starter: "Starter",
    active: "Active",
    changePlan: "Change plan",
    openInbox: "Open review inbox",
    updateBilling: "Update billing details",
  },
  fr: {
    loading: "Chargement des parametres...",
    loginTitle: "Vous devez etre connecte pour acceder aux parametres",
    loginText: "Retournez a la page de connexion pour continuer dans Replyo.",
    loginButton: "Aller a la connexion",
    back: "Retour au tableau de bord",
    signOut: "Se deconnecter",
    badge: "Compte et operations",
    title: "Parametres Replyo",
    description:
      "Gerez le compte connecte, les preferences du business, l'automatisation des reponses et la facturation.",
    businessTitle: "Compte business",
    owner: "Proprietaire",
    email: "Email",
    connectedLocation: "Etablissement connecte",
    notAvailable: "Non disponible",
    noLocation: "Aucun etablissement connecte",
    manageConnection: "Gerer la connexion Google Business",
    connectBusiness: "Connecter Google Business",
    disconnectBusiness: "Deconnecter le compte business",
    preferencesTitle: "Preferences de reponse",
    tone: "Ton de la marque",
    tones: [
      "Chaleureux, professionnel et concis",
      "Amical et detendu",
      "Premium et soigne",
      "Calme et oriente resolution",
    ],
    personalization: "Personnalisation intelligente",
    personalizationText:
      "Utiliser la categorie, la note et les mots du client pour adapter les reponses",
    currentCategory: "Categorie detectee :",
    connectCategory: "Connectez un business pour detecter sa categorie Google.",
    replyMode: "Mode de reponse",
    approval: "Relire avant publication",
    auto: "Je fais confiance a Replyo, publier directement",
    alerts: "Alertes",
    alertsText: "Notifications email activees",
    billingTitle: "Facturation",
    plan: "Offre",
    status: "Statut",
    nextInvoice: "Prochaine facture",
    starter: "Starter",
    active: "Actif",
    changePlan: "Changer d'offre",
    openInbox: "Ouvrir la boite de reception",
    updateBilling: "Mettre a jour la facturation",
  },
  es: {
    loading: "Cargando ajustes...",
    loginTitle: "Debes iniciar sesion para acceder a los ajustes",
    loginText: "Vuelve a la pagina de inicio de sesion para continuar en Replyo.",
    loginButton: "Ir al login",
    back: "Volver al panel",
    signOut: "Cerrar sesion",
    badge: "Cuenta y operaciones",
    title: "Configuracion de Replyo",
    description:
      "Gestiona tu cuenta conectada, las preferencias del negocio, la automatizacion y la facturacion.",
    businessTitle: "Cuenta del negocio",
    owner: "Propietario",
    email: "Correo",
    connectedLocation: "Ubicacion conectada",
    notAvailable: "No disponible",
    noLocation: "Aun no hay ubicacion conectada",
    manageConnection: "Gestionar conexion con Google Business",
    connectBusiness: "Conectar Google Business",
    disconnectBusiness: "Desconectar cuenta del negocio",
    preferencesTitle: "Preferencias de respuesta",
    tone: "Tono de marca",
    tones: [
      "Calido, profesional y conciso",
      "Amable e informal",
      "Premium y cuidado",
      "Calmado y orientado a recuperacion",
    ],
    personalization: "Personalizacion inteligente",
    personalizationText:
      "Usar la categoria, la nota y las palabras de la resena para adaptar la respuesta",
    currentCategory: "Categoria detectada:",
    connectCategory: "Conecta un negocio para detectar su categoria de Google.",
    replyMode: "Modo de respuesta",
    approval: "Revisar antes de publicar",
    auto: "Confio en Replyo, publicar directamente",
    alerts: "Alertas",
    alertsText: "Notificaciones por correo activadas",
    billingTitle: "Facturacion",
    plan: "Plan",
    status: "Estado",
    nextInvoice: "Proxima factura",
    starter: "Starter",
    active: "Activo",
    changePlan: "Cambiar plan",
    openInbox: "Abrir inbox de resenas",
    updateBilling: "Actualizar facturacion",
  },
  ar: {
    loading: "جارٍ تحميل الاعدادات...",
    loginTitle: "يجب تسجيل الدخول للوصول الى الاعدادات",
    loginText: "عد الى صفحة تسجيل الدخول لمتابعة استخدام Replyo.",
    loginButton: "الذهاب الى تسجيل الدخول",
    back: "العودة الى لوحة التحكم",
    signOut: "تسجيل الخروج",
    badge: "الحساب والعمليات",
    title: "اعدادات Replyo",
    description:
      "ادِر الحساب المتصل وتفضيلات النشاط وأتمتة الردود والفوترة من مكان واحد.",
    businessTitle: "حساب النشاط",
    owner: "المالك",
    email: "البريد الالكتروني",
    connectedLocation: "النشاط المتصل",
    notAvailable: "غير متاح",
    noLocation: "لا يوجد نشاط متصل بعد",
    manageConnection: "إدارة اتصال Google Business",
    connectBusiness: "ربط Google Business",
    disconnectBusiness: "فصل حساب النشاط",
    preferencesTitle: "تفضيلات الرد",
    tone: "نبرة العلامة",
    tones: [
      "ودودة ومهنية ومختصرة",
      "ودية وغير رسمية",
      "راقية ومتقنة",
      "هادئة وموجهة للاحتواء",
    ],
    personalization: "التخصيص الذكي",
    personalizationText:
      "استخدم فئة النشاط والتقييم وصياغة التقييم لتشكيل الرد",
    currentCategory: "الفئة المكتشفة:",
    connectCategory: "اربط نشاطا لاكتشاف فئته على Google.",
    replyMode: "وضع الرد",
    approval: "مراجعة قبل النشر",
    auto: "أثق في Replyo، انشر مباشرة",
    alerts: "التنبيهات",
    alertsText: "تنبيهات البريد الالكتروني مفعلة",
    billingTitle: "الفوترة",
    plan: "الخطة",
    status: "الحالة",
    nextInvoice: "الفاتورة التالية",
    starter: "Starter",
    active: "نشط",
    changePlan: "تغيير الخطة",
    openInbox: "فتح البريد الوارد للتقييمات",
    updateBilling: "تحديث بيانات الفوترة",
  },
  de: {
    loading: "Einstellungen werden geladen...",
    loginTitle: "Sie mussen eingeloggt sein, um die Einstellungen zu sehen",
    loginText: "Gehen Sie zur Login-Seite zuruck, um in Replyo weiterzumachen.",
    loginButton: "Zum Login",
    back: "Zuruck zum Dashboard",
    signOut: "Abmelden",
    badge: "Konto und Betrieb",
    title: "Replyo Einstellungen",
    description:
      "Verwalten Sie Ihr verbundenes Konto, Geschaftspräferenzen, Antwortautomatisierung und Abrechnung.",
    businessTitle: "Unternehmenskonto",
    owner: "Inhaber",
    email: "E-Mail",
    connectedLocation: "Verbundener Standort",
    notAvailable: "Nicht verfugbar",
    noLocation: "Noch kein Standort verbunden",
    manageConnection: "Google-Business-Verbindung verwalten",
    connectBusiness: "Google Business verbinden",
    disconnectBusiness: "Unternehmenskonto trennen",
    preferencesTitle: "Antwort-Einstellungen",
    tone: "Markenton",
    tones: [
      "Warm, professionell und knapp",
      "Freundlich und locker",
      "Premium und gepflegt",
      "Ruhig und loesungsorientiert",
    ],
    personalization: "Intelligente Personalisierung",
    personalizationText:
      "Kategorie, Bewertung und Formulierung der Rezension fur Antworten nutzen",
    currentCategory: "Erkannte Kategorie:",
    connectCategory: "Verbinden Sie ein Unternehmen, um die Google-Kategorie zu erkennen.",
    replyMode: "Antwortmodus",
    approval: "Vor dem Veröffentlichen pruefen",
    auto: "Ich vertraue Replyo, direkt veroffentlichen",
    alerts: "Benachrichtigungen",
    alertsText: "E-Mail-Benachrichtigungen aktiviert",
    billingTitle: "Abrechnung",
    plan: "Tarif",
    status: "Status",
    nextInvoice: "Naechste Rechnung",
    starter: "Starter",
    active: "Aktiv",
    changePlan: "Tarif ändern",
    openInbox: "Bewertungs-Inbox öffnen",
    updateBilling: "Abrechnungsdaten aktualisieren",
  },
};

function SettingsContent() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const copy = settingsCopy[language] || settingsCopy.en;
  const [settings, setSettings] = useState(defaultSettings);
  const [connection, setConnection] = useState(defaultConnection);

  useEffect(() => {
    setSettings({
      ...defaultSettings,
      ...readStoredValue(SETTINGS_STORAGE_KEY, defaultSettings),
    });
    setConnection({
      ...defaultConnection,
      ...readStoredValue(CONNECTION_STORAGE_KEY, defaultConnection),
    });
  }, []);

  function updateSetting(field, value) {
    const nextSettings = {
      ...settings,
      [field]: value,
    };

    setSettings(nextSettings);
    writeStoredValue(SETTINGS_STORAGE_KEY, nextSettings);
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
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "12px", color: "#172033" }}>
              {copy.businessTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7 }}>
              <strong>{copy.owner}:</strong> {session.user?.name || copy.notAvailable}
              <br />
              <strong>{copy.email}:</strong> {session.user?.email || copy.notAvailable}
              <br />
              <strong>{copy.connectedLocation}:</strong>{" "}
              {connection.selectedLocationName || copy.noLocation}
            </p>

            <div style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
              <Link
                href="/connect-google"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  background: "#eff3fb",
                  color: "#172033",
                  border: "1px solid #d7deed",
                  borderRadius: "14px",
                  padding: "13px 14px",
                }}
              >
                {connection.isConnected ? copy.manageConnection : copy.connectBusiness}
              </Link>
              <button
                type="button"
                onClick={() => {
                  writeStoredValue(CONNECTION_STORAGE_KEY, defaultConnection);
                  setConnection(defaultConnection);
                }}
                style={{
                  background: "#fff4f2",
                  color: "#9f1c00",
                  border: "1px solid #f2c2b6",
                  borderRadius: "14px",
                  padding: "13px 14px",
                  cursor: "pointer",
                }}
              >
                {copy.disconnectBusiness}
              </button>
            </div>
          </section>

          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "12px", color: "#172033" }}>
              {copy.preferencesTitle}
            </h2>
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                  {copy.tone}
                </div>
                <select
                  value={settings.tone}
                  onChange={(event) => updateSetting("tone", event.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#172033",
                  }}
                >
                  {copy.tones.map((tone) => (
                    <option key={tone}>{tone}</option>
                  ))}
                </select>
              </div>

              <div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                  {copy.personalization}
                </div>
                <label style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={settings.smartPersonalization}
                    onChange={(event) =>
                      updateSetting("smartPersonalization", event.target.checked)
                    }
                  />
                  <span style={{ color: "#172033", fontWeight: "600" }}>
                    {copy.personalizationText}
                  </span>
                </label>
                <div style={{ color: "#6b7280", fontSize: "13px", marginTop: "8px" }}>
                  {connection.selectedLocationCategory
                    ? `${copy.currentCategory} ${connection.selectedLocationCategory}`
                    : copy.connectCategory}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                  {copy.replyMode}
                </div>
                <div style={{ display: "grid", gap: "10px" }}>
                  <label
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border:
                        settings.replyMode === "approval"
                          ? "1px solid #172033"
                          : "1px solid #d1d5db",
                    }}
                  >
                    <input
                      type="radio"
                      checked={settings.replyMode === "approval"}
                      onChange={() => updateSetting("replyMode", "approval")}
                    />
                    <span style={{ color: "#172033", fontWeight: "600" }}>
                      {copy.approval}
                    </span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border:
                        settings.replyMode === "auto"
                          ? "1px solid #172033"
                          : "1px solid #d1d5db",
                    }}
                  >
                    <input
                      type="radio"
                      checked={settings.replyMode === "auto"}
                      onChange={() => updateSetting("replyMode", "auto")}
                    />
                    <span style={{ color: "#172033", fontWeight: "600" }}>
                      {copy.auto}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                  {copy.alerts}
                </div>
                <label style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={settings.alertsEnabled}
                    onChange={(event) =>
                      updateSetting("alertsEnabled", event.target.checked)
                    }
                  />
                  <span style={{ color: "#172033", fontWeight: "600" }}>
                    {copy.alertsText}
                  </span>
                </label>
              </div>
            </div>
          </section>

          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "12px", color: "#172033" }}>
              {copy.billingTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "16px" }}>
              <strong>{copy.plan}:</strong> {copy.starter}
              <br />
              <strong>{copy.status}:</strong> {copy.active}
              <br />
              <strong>{copy.nextInvoice}:</strong> April 30
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
              <Link
                href="/pricing"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#172033",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "14px",
                  padding: "13px 14px",
                  fontWeight: "600",
                }}
              >
                {copy.changePlan}
              </Link>
              <Link
                href="/inbox"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  background: "#eff3fb",
                  color: "#172033",
                  border: "1px solid #d7deed",
                  borderRadius: "14px",
                  padding: "13px 14px",
                }}
              >
                {copy.openInbox}
              </Link>
              <button
                type="button"
                style={{
                  background: "#eff3fb",
                  color: "#172033",
                  border: "1px solid #d7deed",
                  borderRadius: "14px",
                  padding: "13px 14px",
                  cursor: "pointer",
                }}
              >
                {copy.updateBilling}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function SettingsPage() {
  return <SettingsContent />;
}
