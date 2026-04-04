"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import AuthSessionProvider from "../components/AuthSessionProvider";
import { useLanguage } from "../components/LanguageProvider";
import {
  BILLING_STORAGE_KEY,
  CONNECTION_STORAGE_KEY,
  REVIEWS_STORAGE_KEY,
  createDemoReviewsForLocation,
  defaultBilling,
  defaultConnection,
  readStoredValue,
  writeStoredValue,
} from "../lib/demoState";

const connectCopy = {
  en: {
    loading: "Loading...",
    redirecting: "Redirecting to login...",
    back: "Back to dashboard",
    signOut: "Sign out",
    badge: "Google Business onboarding",
    title: "Connect Google Business to Replyo.",
    description:
      "A new client should first connect Google Business. After that, Replyo can detect the businesses in the account and let the owner choose which one to manage for reviews.",
    billingBadge: "Billing required",
    billingTitle: "Choose a plan before connecting Google Business",
    billingText:
      "In the live product, clients pick a plan first, then continue to connect their business and start syncing reviews.",
    planLimitTitle: "Current plan limit",
    planLimitText:
      "Your current plan includes 1 connected business location. To use a different business later, disconnect the current one first or upgrade when multi-location plans are available.",
    currentSlotTitle: "Connected location slot in use",
    currentSlotText:
      "Your Single Location plan already has an active business connected. Disconnect it before connecting a different business.",
    choosePlan: "Choose a plan",
    step1: "Step 1: Connect Google Business",
    step1Text:
      "Use the Google account that actually owns or manages the Business Profile. Once connected, Replyo can fetch the businesses available in that business account.",
    consentBox:
      "Your Replyo login can be personal. This separate step must be completed with the Google account that manages the Business Profile you want to connect.",
    connectedGoogle:
      "Google Business account connected. Replyo can now try to load your Business Profiles.",
    loadBusinesses: "Load my Google businesses",
    loadingBusinesses: "Loading businesses...",
    connectButton: "Connect Google Business account",
    step2: "Step 2: Choose your business",
    step2Text:
      "These are the businesses Replyo detected in the connected account. Choose the one you want Replyo to monitor for reviews.",
    category: "Google category:",
    connectSelected: "Connect selected business",
    startOver: "Start over",
    statusTitle: "Connection status",
    businessConnected: "Business connected",
    noBusiness: "No business connected yet",
    provider: "Provider",
    location: "Location",
    businessType: "Business type",
    primaryCategory: "Primary category",
    city: "City",
    lastSync: "Last sync",
    notSelected: "Not selected",
    notSynced: "Not synced yet",
    helper:
      "Replyo will use the detected Google business category to adapt its tone and wording before generating replies.",
    openInbox: "Open review inbox",
    adjustMode: "Adjust reply mode",
  },
  fr: {
    loading: "Chargement...",
    redirecting: "Redirection vers la connexion...",
    back: "Retour au tableau de bord",
    signOut: "Se deconnecter",
    badge: "Onboarding Google Business",
    title: "Connectez Google Business a Replyo.",
    description:
      "Un nouveau client doit d'abord connecter Google Business. Ensuite, Replyo detecte les etablissements du compte et laisse le proprietaire choisir celui a gerer.",
    billingBadge: "Facturation requise",
    billingTitle: "Choisissez une offre avant de connecter Google Business",
    billingText:
      "Dans le produit final, les clients choisissent d'abord une offre puis connectent leur business pour commencer la synchronisation.",
    planLimitTitle: "Limite de l offre actuelle",
    planLimitText:
      "Votre offre actuelle inclut 1 seul etablissement connecte. Pour connecter un autre business plus tard, deconnectez d abord le business actuel ou passez a une offre multi-etablissements lorsqu elle sera disponible.",
    currentSlotTitle: "Emplacement connecte deja utilise",
    currentSlotText:
      "Votre offre Single Location utilise deja son seul emplacement connecte. Deconnectez ce business avant d en connecter un autre.",
    choosePlan: "Choisir une offre",
    step1: "Etape 1 : Connecter Google Business",
    step1Text:
      "Utilisez le compte Google qui possede ou gere vraiment la fiche Business. Une fois connecte, Replyo peut charger les businesses disponibles dans ce compte.",
    consentBox:
      "Votre connexion Replyo peut etre personnelle. Cette etape se fait separement avec le compte Google qui gere la fiche Business a connecter.",
    connectedGoogle:
      "Compte Google Business connecte. Replyo peut maintenant essayer de charger vos profils Business.",
    loadBusinesses: "Charger mes businesses Google",
    loadingBusinesses: "Chargement des businesses...",
    connectButton: "Connecter le compte Google Business",
    step2: "Etape 2 : Choisissez votre business",
    step2Text:
      "Voici les businesses detectes dans le compte connecte. Choisissez celui que Replyo doit surveiller pour les avis.",
    category: "Categorie Google :",
    connectSelected: "Connecter le business selectionne",
    startOver: "Recommencer",
    statusTitle: "Statut de connexion",
    businessConnected: "Business connecte",
    noBusiness: "Aucun business connecte",
    provider: "Fournisseur",
    location: "Etablissement",
    businessType: "Type d'activite",
    primaryCategory: "Categorie principale",
    city: "Ville",
    lastSync: "Derniere synchro",
    notSelected: "Non selectionne",
    notSynced: "Pas encore synchronise",
    helper:
      "Replyo utilisera la categorie Google detectee pour adapter le ton et la formulation des reponses.",
    openInbox: "Ouvrir la boite de reception",
    adjustMode: "Ajuster le mode de reponse",
  },
  es: {
    loading: "Cargando...",
    redirecting: "Redirigiendo al login...",
    back: "Volver al panel",
    signOut: "Cerrar sesion",
    badge: "Onboarding de Google Business",
    title: "Conecta Google Business con Replyo.",
    description:
      "Un cliente nuevo debe conectar primero Google Business. Luego Replyo detecta los negocios de la cuenta y deja elegir cual supervisar.",
    billingBadge: "Facturacion requerida",
    billingTitle: "Elige un plan antes de conectar Google Business",
    billingText:
      "En el producto real, los clientes eligen primero un plan y luego conectan su negocio para empezar a sincronizar resenas.",
    planLimitTitle: "Limite del plan actual",
    planLimitText:
      "Tu plan actual incluye 1 sola ubicacion conectada. Si mas adelante quieres conectar otro negocio, primero desconecta el actual o mejora cuando haya planes multiubicacion.",
    currentSlotTitle: "La plaza conectada ya esta en uso",
    currentSlotText:
      "Tu plan Single Location ya tiene un negocio activo conectado. Desconectalo antes de conectar otro distinto.",
    choosePlan: "Elegir plan",
    step1: "Paso 1: Conectar Google Business",
    step1Text:
      "Usa la cuenta de Google que realmente posee o gestiona el Business Profile. Una vez conectada, Replyo puede cargar los negocios disponibles en esa cuenta.",
    consentBox:
      "Tu acceso a Replyo puede ser personal. Este paso separado debe hacerse con la cuenta de Google que gestiona el Business Profile que quieres conectar.",
    connectedGoogle:
      "Cuenta de Google Business conectada. Replyo ya puede intentar cargar tus perfiles Business.",
    loadBusinesses: "Cargar mis negocios de Google",
    loadingBusinesses: "Cargando negocios...",
    connectButton: "Conectar cuenta de Google Business",
    step2: "Paso 2: Elige tu negocio",
    step2Text:
      "Estos son los negocios detectados en la cuenta conectada. Elige cual debe supervisar Replyo para las resenas.",
    category: "Categoria de Google:",
    connectSelected: "Conectar negocio seleccionado",
    startOver: "Empezar de nuevo",
    statusTitle: "Estado de conexion",
    businessConnected: "Negocio conectado",
    noBusiness: "Todavia no hay negocio conectado",
    provider: "Proveedor",
    location: "Ubicacion",
    businessType: "Tipo de negocio",
    primaryCategory: "Categoria principal",
    city: "Ciudad",
    lastSync: "Ultima sincronizacion",
    notSelected: "No seleccionado",
    notSynced: "Aun no sincronizado",
    helper:
      "Replyo utilizara la categoria detectada en Google para adaptar el tono y la redaccion antes de generar respuestas.",
    openInbox: "Abrir inbox de resenas",
    adjustMode: "Ajustar modo de respuesta",
  },
  ar: {
    loading: "جارٍ التحميل...",
    redirecting: "جارٍ التحويل الى تسجيل الدخول...",
    back: "العودة الى لوحة التحكم",
    signOut: "تسجيل الخروج",
    badge: "ربط Google Business",
    title: "اربط Google Business مع Replyo.",
    description:
      "يجب على العميل الجديد اولا ربط Google Business. بعد ذلك يستطيع Replyo اكتشاف الأنشطة داخل الحساب وترك اختيار النشاط المناسب للمراجعات.",
    billingBadge: "الفوترة مطلوبة",
    billingTitle: "اختر خطة قبل ربط Google Business",
    billingText:
      "في المنتج الحقيقي، يختار العميل الخطة اولا ثم يربط نشاطه ويبدأ مزامنة التقييمات.",
    planLimitTitle: "حد الخطة الحالية",
    planLimitText:
      "تتضمن خطتك الحالية موقع نشاط تجاري واحدا فقط. اذا اردت ربط نشاط مختلف لاحقا، افصل النشاط الحالي اولا او قم بالترقية عندما تتوفر الخطط متعددة المواقع.",
    currentSlotTitle: "تم استخدام موقع الربط الحالي",
    currentSlotText:
      "خطة الموقع الواحد الخاصة بك تحتوي بالفعل على نشاط متصل. قم بفصل النشاط الحالي قبل ربط نشاط مختلف.",
    choosePlan: "اختيار الخطة",
    step1: "الخطوة 1: ربط Google Business",
    step1Text:
      "استخدم حساب Google الذي يملك او يدير فعليا ملف النشاط التجاري. بعد الربط، يستطيع Replyo جلب الانشطة المتاحة في ذلك الحساب.",
    consentBox:
      "يمكن ان يكون تسجيل دخولك الى Replyo شخصيا. اما هذه الخطوة المنفصلة فيجب تنفيذها باستخدام حساب Google الذي يدير ملف النشاط الذي تريد ربطه.",
    connectedGoogle:
      "تم ربط حساب Google Business. يمكن لـ Replyo الآن محاولة تحميل ملفات Business الخاصة بك.",
    loadBusinesses: "تحميل أنشطتي من Google",
    loadingBusinesses: "جارٍ تحميل الأنشطة...",
    connectButton: "ربط حساب Google Business",
    step2: "الخطوة 2: اختر نشاطك",
    step2Text:
      "هذه هي الأنشطة التي اكتشفها Replyo داخل الحساب المتصل. اختر النشاط الذي تريد من Replyo مراقبته للمراجعات.",
    category: "فئة Google:",
    connectSelected: "ربط النشاط المحدد",
    startOver: "البدء من جديد",
    statusTitle: "حالة الاتصال",
    businessConnected: "تم ربط النشاط",
    noBusiness: "لا يوجد نشاط مربوط بعد",
    provider: "المزوّد",
    location: "النشاط",
    businessType: "نوع النشاط",
    primaryCategory: "الفئة الرئيسية",
    city: "المدينة",
    lastSync: "آخر مزامنة",
    notSelected: "غير محدد",
    notSynced: "لم تتم المزامنة بعد",
    helper:
      "سيستخدم Replyo فئة النشاط المكتشفة من Google لتعديل النبرة والصياغة قبل إنشاء الردود.",
    openInbox: "فتح صندوق التقييمات",
    adjustMode: "تعديل وضع الرد",
  },
  de: {
    loading: "Wird geladen...",
    redirecting: "Weiterleitung zum Login...",
    back: "Zuruck zum Dashboard",
    signOut: "Abmelden",
    badge: "Google Business Onboarding",
    title: "Verbinden Sie Google Business mit Replyo.",
    description:
      "Ein neuer Kunde verbindet zuerst Google Business. Danach erkennt Replyo die Unternehmen im Konto und der Inhaber wahlt den Standort fur Bewertungen aus.",
    billingBadge: "Abrechnung erforderlich",
    billingTitle: "Wahlen Sie zuerst einen Tarif, bevor Sie Google Business verbinden",
    billingText:
      "Im Live-Produkt wahlen Kunden zuerst einen Tarif und verbinden danach ihr Unternehmen, um Bewertungen zu synchronisieren.",
    planLimitTitle: "Limit des aktuellen Tarifs",
    planLimitText:
      "Ihr aktueller Tarif enthaelt 1 verbundenen Unternehmensstandort. Wenn Sie spaeter ein anderes Unternehmen verbinden moechten, trennen Sie zuerst das aktuelle oder upgraden Sie, sobald Multi-Location-Tarife verfuegbar sind.",
    currentSlotTitle: "Der verbundene Standort ist bereits belegt",
    currentSlotText:
      "Ihr Single-Location-Tarif hat bereits ein aktives Unternehmen verbunden. Trennen Sie dieses zuerst, bevor Sie ein anderes verbinden.",
    choosePlan: "Tarif wählen",
    step1: "Schritt 1: Google Business verbinden",
    step1Text:
      "Nutzen Sie das Google-Konto, das das Business Profile tatsaechlich besitzt oder verwaltet. Danach kann Replyo die verfuegbaren Unternehmen dieses Kontos laden.",
    consentBox:
      "Ihr Replyo-Login darf persoenlich sein. Dieser getrennte Schritt muss mit dem Google-Konto erfolgen, das das Business Profile verwaltet, das Sie verbinden moechten.",
    connectedGoogle:
      "Google-Business-Konto verbunden. Replyo kann jetzt versuchen, Ihre Business-Profile zu laden.",
    loadBusinesses: "Meine Google-Unternehmen laden",
    loadingBusinesses: "Unternehmen werden geladen...",
    connectButton: "Google-Business-Konto verbinden",
    step2: "Schritt 2: Wahlen Sie Ihr Unternehmen",
    step2Text:
      "Das sind die Unternehmen, die Replyo im verbundenen Konto erkannt hat. Wahlen Sie das Unternehmen aus, das Replyo fur Bewertungen beobachten soll.",
    category: "Google-Kategorie:",
    connectSelected: "Ausgewahltes Unternehmen verbinden",
    startOver: "Neu beginnen",
    statusTitle: "Verbindungsstatus",
    businessConnected: "Unternehmen verbunden",
    noBusiness: "Noch kein Unternehmen verbunden",
    provider: "Anbieter",
    location: "Standort",
    businessType: "Unternehmenstyp",
    primaryCategory: "Hauptkategorie",
    city: "Stadt",
    lastSync: "Letzte Synchronisierung",
    notSelected: "Nicht ausgewahlt",
    notSynced: "Noch nicht synchronisiert",
    helper:
      "Replyo nutzt die erkannte Google-Kategorie, um Ton und Formulierung vor dem Erstellen der Antworten anzupassen.",
    openInbox: "Bewertungs-Inbox offnen",
    adjustMode: "Antwortmodus anpassen",
  },
};

function ConnectGoogleContent() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const copy = connectCopy[language] || connectCopy.en;
  const router = useRouter();
  const [hasBusinessToken, setHasBusinessToken] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [connection, setConnection] = useState(defaultConnection);
  const [billing, setBilling] = useState(defaultBilling);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [locationsError, setLocationsError] = useState("");

  useEffect(() => {
    const storedConnection = {
      ...defaultConnection,
      ...readStoredValue(CONNECTION_STORAGE_KEY, defaultConnection),
    };
    const storedBilling = {
      ...defaultBilling,
      ...readStoredValue(BILLING_STORAGE_KEY, defaultBilling),
    };

    setConnection(storedConnection);
    setBilling(storedBilling);
    setSelectedLocationId(storedConnection.selectedLocationId || "");
    setIsSelectingLocation(false);
    setHasBusinessToken(
      typeof document !== "undefined" &&
        document.cookie.includes("replyo_gbp_access_token=")
    );
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return <main style={{ padding: "40px" }}>{copy.loading}</main>;
  }

  if (!session) {
    return <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>{copy.redirecting}</main>;
  }

  async function loadLocations() {
    setIsLoadingLocations(true);
    setLocationsError("");

    try {
      const response = await fetch("/api/google-business/locations");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load Google Business locations.");
      }

      setAvailableLocations(data.locations || []);
      setSelectedLocationId((currentId) => currentId || data.locations?.[0]?.id || "");
      setIsSelectingLocation(true);
    } catch (error) {
      setLocationsError(
        error instanceof Error
          ? error.message
          : "Could not load Google Business locations."
      );
    } finally {
      setIsLoadingLocations(false);
    }
  }

  function handleConnect() {
    const selectedLocation = availableLocations.find(
      (location) => location.id === selectedLocationId
    );

    if (!selectedLocation) {
      return;
    }

    const nextConnection = {
      isConnected: true,
      provider: "Google Business Profile",
      selectedLocationId: selectedLocation.id,
      selectedLocationName: selectedLocation.name,
      selectedLocationType: selectedLocation.type,
      selectedLocationCategory: selectedLocation.primaryCategory,
      selectedLocationCity: selectedLocation.accountName,
      syncedAt: new Date().toISOString(),
    };

    writeStoredValue(CONNECTION_STORAGE_KEY, nextConnection);
    writeStoredValue(
      REVIEWS_STORAGE_KEY,
      createDemoReviewsForLocation({
        id: selectedLocation.id,
        name: selectedLocation.name,
        type: selectedLocation.type,
        city: selectedLocation.accountName,
        primaryCategory: selectedLocation.primaryCategory.toLowerCase(),
      })
    );
    setConnection(nextConnection);
    setIsSelectingLocation(true);
  }

  function handleDisconnect() {
    writeStoredValue(CONNECTION_STORAGE_KEY, defaultConnection);
    setConnection(defaultConnection);
    setIsSelectingLocation(false);
    setAvailableLocations([]);
    setSelectedLocationId("");
  }

  function handleStartConnect() {
    if (billing.locationLimit === 1 && connection.isConnected) {
      return false;
    }

    if (hasBusinessToken) {
      loadLocations();
      return true;
    }
    return false;
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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

        {billing.status !== "active" ? (
          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "#fff6df",
                color: "#8b5e00",
                fontSize: "13px",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              {copy.billingBadge}
            </div>
            <h2 style={{ fontSize: "30px", color: "#172033", marginBottom: "12px" }}>
              {copy.billingTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
              {copy.billingText}
            </p>
            <Link
              href="/pricing"
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
              {copy.choosePlan}
            </Link>
          </section>
        ) : (
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
              <div
                style={{
                  background: "#f5f8ff",
                  borderRadius: "16px",
                  padding: "14px 16px",
                  color: "#344054",
                  lineHeight: 1.7,
                  marginBottom: "18px",
                }}
              >
                <strong>{copy.planLimitTitle}:</strong> {copy.planLimitText}
              </div>

              {!isSelectingLocation ? (
                <>
                  <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
                    {copy.step1}
                  </h2>
                  <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
                    {copy.step1Text}
                  </p>

                  <div
                    style={{
                      background: "#f5f8ff",
                      borderRadius: "18px",
                      padding: "16px",
                      color: "#344054",
                      lineHeight: 1.7,
                      marginBottom: "18px",
                    }}
                  >
                    {copy.consentBox}
                  </div>

                  {hasBusinessToken ? (
                    <div
                      style={{
                        background: "#eefbf3",
                        color: "#1f7a45",
                        borderRadius: "14px",
                        padding: "12px 14px",
                        marginBottom: "16px",
                      }}
                    >
                      {copy.connectedGoogle}
                    </div>
                  ) : null}

                  {hasBusinessToken ? (
                    <button
                      type="button"
                      onClick={handleStartConnect}
                      disabled={billing.locationLimit === 1 && connection.isConnected}
                      style={{
                        background: "#172033",
                        color: "#fff",
                        border: "none",
                        borderRadius: "14px",
                        padding: "14px 18px",
                        cursor:
                          billing.locationLimit === 1 && connection.isConnected
                            ? "not-allowed"
                            : "pointer",
                        fontWeight: "600",
                        width: "100%",
                        opacity:
                          billing.locationLimit === 1 && connection.isConnected ? 0.6 : 1,
                      }}
                    >
                      {isLoadingLocations ? copy.loadingBusinesses : copy.loadBusinesses}
                    </button>
                  ) : (
                    <a
                      href="/api/google-business/connect"
                      style={{
                        display: "block",
                        width: "100%",
                        textDecoration: "none",
                        textAlign: "center",
                        background: "#172033",
                        color: "#fff",
                        borderRadius: "14px",
                        padding: "14px 18px",
                        fontWeight: "600",
                      }}
                    >
                      {copy.connectButton}
                    </a>
                  )}

                  {locationsError ? (
                    <div
                      style={{
                        marginTop: "14px",
                        background: "#fff4f2",
                        color: "#9f1c00",
                        borderRadius: "14px",
                        padding: "12px 14px",
                        lineHeight: 1.6,
                      }}
                    >
                      {locationsError}
                    </div>
                  ) : null}

                  {billing.locationLimit === 1 && connection.isConnected ? (
                    <div
                      style={{
                        marginTop: "14px",
                        background: "#fff6df",
                        color: "#8b5e00",
                        borderRadius: "14px",
                        padding: "12px 14px",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong>{copy.currentSlotTitle}:</strong> {copy.currentSlotText}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
                    {copy.step2}
                  </h2>
                  <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "16px" }}>
                    {copy.step2Text}
                  </p>

                  <div style={{ display: "grid", gap: "12px" }}>
                    {availableLocations.map((location) => (
                      <label
                        key={location.id}
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "flex-start",
                          padding: "14px",
                          borderRadius: "16px",
                          border:
                            selectedLocationId === location.id
                              ? "1px solid #172033"
                              : "1px solid #d7deed",
                          background:
                            selectedLocationId === location.id ? "#f5f8ff" : "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name="location"
                          checked={selectedLocationId === location.id}
                          onChange={() => setSelectedLocationId(location.id)}
                        />
                        <div>
                          <div style={{ fontWeight: "700", color: "#172033" }}>
                            {location.name}
                          </div>
                          <div style={{ color: "#5b6473", marginTop: "4px" }}>
                            {location.type} • {location.accountName}
                          </div>
                          <div style={{ color: "#7a8698", marginTop: "6px", fontSize: "13px" }}>
                            {copy.category} {location.primaryCategory}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div style={{ display: "grid", gap: "10px", marginTop: "18px" }}>
                    <button
                      type="button"
                      onClick={handleConnect}
                      style={{
                        background: "#172033",
                        color: "#fff",
                        border: "none",
                        borderRadius: "14px",
                        padding: "14px 16px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      {copy.connectSelected}
                    </button>
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      style={{
                        background: "#eff3fb",
                        color: "#172033",
                        border: "1px solid #d7deed",
                        borderRadius: "14px",
                        padding: "14px 16px",
                        cursor: "pointer",
                      }}
                    >
                      {copy.startOver}
                    </button>
                  </div>
                </>
              )}
            </section>

            <section
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
              }}
            >
              <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
                {copy.statusTitle}
              </h2>
              <div
                style={{
                  background: connection.isConnected ? "#eefbf3" : "#fff6df",
                  color: connection.isConnected ? "#1f7a45" : "#8b5e00",
                  borderRadius: "16px",
                  padding: "14px 16px",
                  marginBottom: "18px",
                  fontWeight: "600",
                }}
              >
                {connection.isConnected ? copy.businessConnected : copy.noBusiness}
              </div>

              <p style={{ color: "#5b6473", lineHeight: 1.8 }}>
                <strong>{copy.provider}:</strong> {connection.provider}
                <br />
                <strong>{copy.location}:</strong>{" "}
                {connection.selectedLocationName || copy.notSelected}
                <br />
                <strong>{copy.businessType}:</strong>{" "}
                {connection.selectedLocationType || copy.notSelected}
                <br />
                <strong>{copy.primaryCategory}:</strong>{" "}
                {connection.selectedLocationCategory || copy.notSelected}
                <br />
                <strong>{copy.city}:</strong>{" "}
                {connection.selectedLocationCity || copy.notSelected}
                <br />
                <strong>{copy.lastSync}:</strong>{" "}
                {connection.syncedAt
                  ? new Date(connection.syncedAt).toLocaleString()
                  : copy.notSynced}
              </p>

              <div
                style={{
                  marginTop: "18px",
                  background: "#f5f8ff",
                  borderRadius: "16px",
                  padding: "14px 16px",
                  color: "#344054",
                  lineHeight: 1.7,
                }}
              >
                {copy.helper}
              </div>

              <div style={{ display: "grid", gap: "10px", marginTop: "18px" }}>
                <Link
                  href="/inbox"
                  style={{
                    textDecoration: "none",
                    background: "#172033",
                    color: "#fff",
                    borderRadius: "14px",
                    padding: "13px 14px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {copy.openInbox}
                </Link>
                <Link
                  href="/dashboard"
                  style={{
                    textDecoration: "none",
                    background: "#eff3fb",
                    color: "#172033",
                    borderRadius: "14px",
                    padding: "13px 14px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {copy.adjustMode}
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function ConnectGooglePageContent() {
  return <ConnectGoogleContent />;
}

export default function ConnectGooglePage() {
  return (
    <AuthSessionProvider>
      <ConnectGooglePageContent />
    </AuthSessionProvider>
  );
}
