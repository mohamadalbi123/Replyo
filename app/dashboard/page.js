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
    accountTitle: "Account settings",
    name: "Name",
    email: "Email",
    loginMethod: "Login method",
    passwordSection: "Change password",
    hidePasswordSection: "Cancel password change",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    passwordPlaceholder: "Enter password",
    savePassword: "Save password",
    passwordSaved: "Password updated",
    reviewTitle: "Review activity",
    reviewText:
      "See how many reviews Replyo has handled, how many are still waiting for confirmation, and how many are already posted.",
    handled: "Total reviews handled",
    confirmation: "Waiting for confirmation",
    posted: "Already posted",
    openInbox: "Open inbox",
    inboxTitle: "Pending approvals",
    inboxText:
      "See the replies waiting for your confirmation right here, without leaving the dashboard.",
    openDraft: "Open draft",
    confirmNow: "Post on Google",
    closeDraft: "Cancel",
    customerReview: "Customer review",
    draftReply: "Draft reply",
    noPendingApprovals: "No replies are waiting for confirmation right now.",
    automationTitle: "Automation mode",
    automationText:
      "Choose whether Replyo should post automatically or keep each reply inside Replyo for your review first.",
    autoReplyOn: "Auto-reply on",
    autoReplyOff: "Auto-reply off",
    autoReplyOnText:
      "Replyo replies to customer reviews automatically, without preview.",
    autoReplyOffText:
      "Replyo creates a draft and waits for your approval in the dashboard before posting. You can also get an email when a draft is ready.",
    toggleLabel: "Turn auto-reply on or off",
    emailNotifyTitle: "Draft approval notifications",
    emailNotifyHelp:
      "Use this email if you want Replyo to notify you whenever a new draft is waiting for your approval in the inbox.",
    emailNotifyLabel: "Notification email",
    emailNotifyPlaceholder: "name@business.com",
    emailNotifyToggle: "Email me when a draft is ready",
    saveEmail: "Save email",
    emailSaved: "Notification email saved",
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
    toneTitle: "Brand tone",
    toneText:
      "This is the only editable style input. Replyo combines your tone with the category detected from Google.",
    tonePlaceholder: "Example: Luxury, warm, and reassuring",
    provider: "Provider",
    location: "Location",
    category: "Category",
    city: "City",
    tone: "Tone",
    notConnected: "Not connected yet",
    notSet: "Not set yet",
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
    accountTitle: "Parametres du compte",
    name: "Nom",
    email: "Email",
    loginMethod: "Methode de connexion",
    passwordSection: "Changer le mot de passe",
    hidePasswordSection: "Annuler le changement",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le nouveau mot de passe",
    passwordPlaceholder: "Entrez le mot de passe",
    savePassword: "Enregistrer le mot de passe",
    passwordSaved: "Mot de passe mis a jour",
    reviewTitle: "Activite des avis",
    reviewText:
      "Voyez combien d'avis Replyo a deja traites, combien attendent encore une validation et combien sont deja publies.",
    handled: "Total des avis traites",
    confirmation: "En attente de validation",
    posted: "Deja publie",
    openInbox: "Ouvrir la boite",
    inboxTitle: "Validations en attente",
    inboxText:
      "Voyez ici les reponses qui attendent votre validation, sans quitter le tableau de bord.",
    openDraft: "Ouvrir le brouillon",
    confirmNow: "Publier sur Google",
    closeDraft: "Annuler",
    customerReview: "Avis client",
    draftReply: "Brouillon de reponse",
    noPendingApprovals: "Aucune reponse n'attend votre validation pour le moment.",
    automationTitle: "Mode d'automatisation",
    automationText:
      "Choisissez si Replyo doit publier automatiquement ou garder chaque reponse dans Replyo pour validation.",
    autoReplyOn: "Reponse auto activee",
    autoReplyOff: "Reponse auto desactivee",
    autoReplyOnText:
      "Replyo repond automatiquement aux avis clients, sans apercu.",
    autoReplyOffText:
      "Replyo cree un brouillon et attend votre validation dans le tableau de bord avant publication. Vous pouvez aussi recevoir un email lorsqu'un brouillon est pret.",
    toggleLabel: "Activer ou desactiver la reponse auto",
    emailNotifyTitle: "Notifications de brouillons",
    emailNotifyHelp:
      "Utilisez cet email si vous voulez que Replyo vous previenne lorsqu'un nouveau brouillon attend votre validation dans la boite.",
    emailNotifyLabel: "Email de notification",
    emailNotifyPlaceholder: "nom@entreprise.com",
    emailNotifyToggle: "M'avertir quand un brouillon est pret",
    saveEmail: "Enregistrer l'email",
    emailSaved: "Email de notification enregistre",
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
    toneTitle: "Ton de marque",
    toneText:
      "C'est le seul element de style modifiable. Replyo combine ce ton avec la categorie detectee depuis Google.",
    tonePlaceholder: "Exemple : Elegant, chaleureux et rassurant",
    provider: "Fournisseur",
    location: "Etablissement",
    category: "Categorie",
    city: "Ville",
    tone: "Ton",
    notConnected: "Pas encore connecte",
    notSet: "Pas encore defini",
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
    accountTitle: "Ajustes de cuenta",
    name: "Nombre",
    email: "Correo",
    loginMethod: "Metodo de acceso",
    passwordSection: "Cambiar contrasena",
    hidePasswordSection: "Cancelar cambio",
    currentPassword: "Contrasena actual",
    newPassword: "Nueva contrasena",
    confirmPassword: "Confirmar nueva contrasena",
    passwordPlaceholder: "Escribe la contrasena",
    savePassword: "Guardar contrasena",
    passwordSaved: "Contrasena actualizada",
    reviewTitle: "Actividad de resenas",
    reviewText:
      "Mira cuantas resenas ya ha gestionado Replyo, cuantas siguen esperando confirmacion y cuantas ya estan publicadas.",
    handled: "Total de resenas gestionadas",
    confirmation: "Esperando confirmacion",
    posted: "Ya publicadas",
    openInbox: "Abrir inbox",
    inboxTitle: "Aprobaciones pendientes",
    inboxText:
      "Mira aqui las respuestas que esperan tu confirmacion, sin salir del panel.",
    openDraft: "Abrir borrador",
    confirmNow: "Publicar en Google",
    closeDraft: "Cancelar",
    customerReview: "Resena del cliente",
    draftReply: "Borrador de respuesta",
    noPendingApprovals: "Ahora mismo no hay respuestas esperando confirmacion.",
    automationTitle: "Modo de automatizacion",
    automationText:
      "Elige si Replyo debe publicar automaticamente o guardar cada respuesta en Replyo para tu revision primero.",
    autoReplyOn: "Respuesta auto activada",
    autoReplyOff: "Respuesta auto desactivada",
    autoReplyOnText:
      "Replyo responde automaticamente a las resenas de clientes, sin vista previa.",
    autoReplyOffText:
      "Replyo crea un borrador y espera tu aprobacion en el panel antes de publicar. Tambien puedes recibir un correo cuando un borrador este listo.",
    toggleLabel: "Activar o desactivar la respuesta automatica",
    emailNotifyTitle: "Notificaciones de borradores",
    emailNotifyHelp:
      "Usa este correo si quieres que Replyo te avise cuando haya un nuevo borrador esperando tu aprobacion en el inbox.",
    emailNotifyLabel: "Correo de notificacion",
    emailNotifyPlaceholder: "nombre@negocio.com",
    emailNotifyToggle: "Avisarme cuando un borrador este listo",
    saveEmail: "Guardar correo",
    emailSaved: "Correo de notificacion guardado",
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
    toneTitle: "Tono de marca",
    toneText:
      "Esta es la unica entrada de estilo editable. Replyo combina este tono con la categoria detectada desde Google.",
    tonePlaceholder: "Ejemplo: Elegante, cercano y profesional",
    provider: "Proveedor",
    location: "Ubicacion",
    category: "Categoria",
    city: "Ciudad",
    tone: "Tono",
    notConnected: "Todavia no conectado",
    notSet: "Aun sin definir",
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
    accountTitle: "Kontoeinstellungen",
    name: "Name",
    email: "E-Mail",
    loginMethod: "Anmeldemethode",
    passwordSection: "Passwort andern",
    hidePasswordSection: "Passwortwechsel abbrechen",
    currentPassword: "Aktuelles Passwort",
    newPassword: "Neues Passwort",
    confirmPassword: "Neues Passwort bestaetigen",
    passwordPlaceholder: "Passwort eingeben",
    savePassword: "Passwort speichern",
    passwordSaved: "Passwort aktualisiert",
    reviewTitle: "Bewertungsaktivitat",
    reviewText:
      "Sehen Sie, wie viele Bewertungen Replyo bereits bearbeitet hat, wie viele noch auf Freigabe warten und wie viele bereits veroffentlicht sind.",
    handled: "Bearbeitete Bewertungen gesamt",
    confirmation: "Wartet auf Bestatigung",
    posted: "Bereits veroffentlicht",
    openInbox: "Inbox offnen",
    inboxTitle: "Ausstehende Freigaben",
    inboxText:
      "Sehen Sie hier direkt im Dashboard, welche Antworten auf Ihre Bestatigung warten.",
    openDraft: "Entwurf offnen",
    confirmNow: "Bei Google veroffentlichen",
    closeDraft: "Abbrechen",
    customerReview: "Kundenbewertung",
    draftReply: "Antwortentwurf",
    noPendingApprovals: "Aktuell warten keine Antworten auf eine Freigabe.",
    automationTitle: "Automatisierungsmodus",
    automationText:
      "Wahlen Sie, ob Replyo automatisch veroffentlichen oder jede Antwort zuerst in Replyo zur Freigabe bereithalten soll.",
    autoReplyOn: "Auto-Antwort an",
    autoReplyOff: "Auto-Antwort aus",
    autoReplyOnText:
      "Replyo antwortet automatisch auf Kundenbewertungen, ohne Vorschau.",
    autoReplyOffText:
      "Replyo erstellt einen Entwurf und wartet vor der Veroffentlichung im Dashboard auf Ihre Freigabe. Auf Wunsch erhalten Sie auch eine E-Mail, wenn ein Entwurf bereit ist.",
    toggleLabel: "Auto-Antwort ein- oder ausschalten",
    emailNotifyTitle: "Entwurfs-Benachrichtigungen",
    emailNotifyHelp:
      "Nutzen Sie diese E-Mail, wenn Replyo Sie benachrichtigen soll, sobald ein neuer Entwurf in der Inbox auf Ihre Freigabe wartet.",
    emailNotifyLabel: "Benachrichtigungs-E-Mail",
    emailNotifyPlaceholder: "name@unternehmen.de",
    emailNotifyToggle: "E-Mail senden, wenn ein Entwurf bereit ist",
    saveEmail: "E-Mail speichern",
    emailSaved: "Benachrichtigungs-E-Mail gespeichert",
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
    toneTitle: "Markenton",
    toneText:
      "Dies ist der einzige bearbeitbare Stilwert. Replyo kombiniert ihn mit der von Google erkannten Kategorie.",
    tonePlaceholder: "Beispiel: Hochwertig, freundlich und klar",
    provider: "Anbieter",
    location: "Standort",
    category: "Kategorie",
    city: "Stadt",
    tone: "Ton",
    notConnected: "Noch nicht verbunden",
    notSet: "Noch nicht festgelegt",
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
    accountTitle: "إعدادات الحساب",
    name: "الاسم",
    email: "البريد الالكتروني",
    loginMethod: "طريقة تسجيل الدخول",
    passwordSection: "تغيير كلمة المرور",
    hidePasswordSection: "إلغاء تغيير كلمة المرور",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور الجديدة",
    passwordPlaceholder: "ادخل كلمة المرور",
    savePassword: "حفظ كلمة المرور",
    passwordSaved: "تم تحديث كلمة المرور",
    reviewTitle: "نشاط التقييمات",
    reviewText:
      "شاهد كم تقييما تعامل معه Replyo بالفعل، وكم منها ما زال بانتظار التأكيد، وكم تم نشره بالفعل.",
    handled: "إجمالي التقييمات التي تمت معالجتها",
    confirmation: "بانتظار التأكيد",
    posted: "تم نشره",
    openInbox: "فتح الصندوق",
    inboxTitle: "الردود بانتظار التأكيد",
    inboxText:
      "شاهد هنا داخل لوحة التحكم الردود التي تنتظر تأكيدك، من دون مغادرة الصفحة.",
    openDraft: "فتح المسودة",
    confirmNow: "النشر على Google",
    closeDraft: "إلغاء",
    customerReview: "تقييم العميل",
    draftReply: "مسودة الرد",
    noPendingApprovals: "لا توجد حاليا ردود تنتظر التأكيد.",
    automationTitle: "وضع الأتمتة",
    automationText:
      "اختر ما اذا كان Replyo يجب أن ينشر تلقائيا أو يحتفظ بكل رد داخل Replyo لمراجعتك أولا.",
    autoReplyOn: "الرد التلقائي مفعّل",
    autoReplyOff: "الرد التلقائي متوقف",
    autoReplyOnText:
      "يقوم Replyo بالرد على تقييمات العملاء تلقائيا من دون معاينة.",
    autoReplyOffText:
      "ينشئ Replyo مسودة وينتظر موافقتك داخل لوحة التحكم قبل النشر. ويمكنك ايضا تلقي بريد إلكتروني عندما تصبح المسودة جاهزة.",
    toggleLabel: "تشغيل أو إيقاف الرد التلقائي",
    emailNotifyTitle: "اشعارات المسودات",
    emailNotifyHelp:
      "استخدم هذا البريد اذا كنت تريد من Replyo تنبيهك عندما تكون هناك مسودة جديدة بانتظار موافقتك داخل الصندوق.",
    emailNotifyLabel: "بريد الاشعارات",
    emailNotifyPlaceholder: "name@business.com",
    emailNotifyToggle: "اخطرني عندما تصبح المسودة جاهزة",
    saveEmail: "حفظ البريد",
    emailSaved: "تم حفظ بريد الاشعارات",
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
    toneTitle: "نبرة العلامة",
    toneText:
      "هذا هو عنصر الاسلوب الوحيد القابل للتعديل. يجمع Replyo بين هذه النبرة والفئة التي يكتشفها من Google.",
    tonePlaceholder: "مثال: راقية، دافئة، ومطمئنة",
    provider: "المزوّد",
    location: "النشاط",
    category: "الفئة",
    city: "المدينة",
    tone: "النبرة",
    notConnected: "غير متصل بعد",
    notSet: "غير محدد بعد",
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
  const [selectedApprovalId, setSelectedApprovalId] = useState("");
  const [draftReplyText, setDraftReplyText] = useState("");
  const [notificationEmailInput, setNotificationEmailInput] = useState("");
  const [notificationSaved, setNotificationSaved] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const storedReviews = readStoredValue(REVIEWS_STORAGE_KEY, defaultReviews);
    const storedSettings = {
      ...defaultSettings,
      ...readStoredValue(SETTINGS_STORAGE_KEY, defaultSettings),
    };
    const storedConnection = readStoredValue(CONNECTION_STORAGE_KEY, defaultConnection);
    const storedBilling = readStoredValue(BILLING_STORAGE_KEY, defaultBilling);

    const nextReviews =
      storedReviews.length >= defaultReviews.length ? storedReviews : defaultReviews;

    setReviews(nextReviews);
    writeStoredValue(REVIEWS_STORAGE_KEY, nextReviews);
    setSettings(storedSettings);
    setConnection(storedConnection);
    setBillingState(storedBilling);
    setNotificationEmailInput(storedSettings.notificationEmail || "");
  }, []);

  useEffect(() => {
    if (!settings.notificationEmail && session?.user?.email) {
      setNotificationEmailInput(session.user.email);
    }
  }, [settings.notificationEmail, session?.user?.email]);

  function updateReplyMode(replyMode) {
    const nextSettings = {
      ...settings,
      replyMode,
    };

    setSettings(nextSettings);
    writeStoredValue(SETTINGS_STORAGE_KEY, nextSettings);
  }

  function updateTone(tone) {
    const nextSettings = {
      ...settings,
      tone,
    };

    setSettings(nextSettings);
    writeStoredValue(SETTINGS_STORAGE_KEY, nextSettings);
  }

  function updateAlertsEnabled(alertsEnabled) {
    const nextEmail = alertsEnabled
      ? notificationEmailInput || settings.notificationEmail || session?.user?.email || ""
      : "";
    const nextSettings = {
      ...settings,
      alertsEnabled,
      notificationEmail: nextEmail,
    };

    setSettings(nextSettings);
    setNotificationEmailInput(nextEmail);
    setNotificationSaved(false);
    writeStoredValue(SETTINGS_STORAGE_KEY, nextSettings);
  }

  function saveNotificationEmail() {
    const nextSettings = {
      ...settings,
      alertsEnabled: true,
      notificationEmail: notificationEmailInput.trim(),
    };

    setSettings(nextSettings);
    setNotificationSaved(true);
    writeStoredValue(SETTINGS_STORAGE_KEY, nextSettings);
  }

  function updatePasswordField(field, value) {
    setPasswordForm((current) => ({
      ...current,
      [field]: value,
    }));
    setPasswordSaved(false);
  }

  function savePassword() {
    setPasswordSaved(true);
    setShowPasswordForm(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  function handlePost(reviewId) {
    const nextReviews = reviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            replyText: review.id === selectedApprovalId ? draftReplyText : review.replyText,
            status: "posted",
            postedAt: new Date().toISOString(),
          }
        : review,
    );

    setReviews(nextReviews);
    writeStoredValue(REVIEWS_STORAGE_KEY, nextReviews);
    setSelectedApprovalId("");
    setDraftReplyText("");
  }

  function closeApproval() {
    setSelectedApprovalId("");
    setDraftReplyText("");
  }

  function openApproval(review) {
    setSelectedApprovalId(review.id);
    setDraftReplyText(review.replyText || "");
  }

  const handledCount = reviews.filter((review) => review.replyText || review.status === "posted").length;
  const readyCount = reviews.filter((review) => review.status === "ready").length;
  const postedCount = reviews.filter((review) => review.status === "posted").length;
  const readyReviews = reviews.filter((review) => review.status === "ready").slice(0, 5);
  const selectedApproval = reviews.find((review) => review.id === selectedApprovalId) || null;
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

  function truncateText(text, maxLength = 120) {
    if (!text) {
      return "";
    }

    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength).trimEnd()}...`;
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
                  {copy.inboxTitle}
                </h2>
                <p style={{ color: "#5b6473", lineHeight: 1.7, margin: 0 }}>
                  {copy.inboxText}
                </p>
              </div>
              <div
                style={{
                  background: "#eef6ff",
                  color: "#31598e",
                  borderRadius: "999px",
                  padding: "8px 12px",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                {readyCount}
              </div>
            </div>
            {readyReviews.length ? (
              <div
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridAutoColumns: "minmax(250px, 290px)",
                  gap: "12px",
                  overflowX: "auto",
                  paddingBottom: "6px",
                }}
              >
                {readyReviews.map((review) => (
                  <div
                    key={review.id}
                    style={{
                      background: "#f8fafc",
                      borderRadius: "18px",
                      padding: "16px",
                      border: "1px solid #e7edf6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <strong style={{ color: "#172033" }}>{review.customerName}</strong>
                      <span
                        style={{
                          background: "#eef6ff",
                          color: "#31598e",
                          borderRadius: "999px",
                          padding: "6px 10px",
                          fontSize: "12px",
                          fontWeight: "600",
                          flexShrink: 0,
                        }}
                      >
                        {review.rating}/5
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: "13px",
                        marginBottom: "10px",
                        lineHeight: 1.6,
                      }}
                    >
                      {truncateText(review.reviewText, 88)}
                    </div>
                    <div
                      style={{
                        color: "#5b6473",
                        lineHeight: 1.6,
                        marginBottom: "12px",
                        fontSize: "14px",
                      }}
                    >
                      {truncateText(review.replyText, 120)}
                    </div>
                    <button
                      type="button"
                      onClick={() => openApproval(review)}
                      style={{
                        background: "#172033",
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "10px 12px",
                        cursor: "pointer",
                        fontWeight: "600",
                        width: "100%",
                      }}
                      aria-haspopup="dialog"
                      aria-expanded={selectedApprovalId === review.id}
                    >
                      {copy.openDraft}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "16px",
                  padding: "16px",
                  color: "#5b6473",
                  lineHeight: 1.6,
                }}
              >
                {copy.noPendingApprovals}
              </div>
            )}
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
                [copy.handled, handledCount, "#effbf3", "#1f7a45"],
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
              {copy.automationTitle}
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
              {copy.automationText}
            </p>
            <div style={{ display: "grid", gap: "16px" }}>
              <label
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  background: settings.replyMode === "auto" ? "#effbf3" : "#f8fafc",
                  border:
                    settings.replyMode === "auto"
                      ? "1px solid #b8e3c6"
                      : "1px solid #e4e9f2",
                  borderRadius: "18px",
                  padding: "16px 18px",
                  cursor: "pointer",
                }}
              >
                <div>
                  <div style={{ color: "#172033", fontWeight: "700", marginBottom: "6px" }}>
                    {settings.replyMode === "auto" ? copy.autoReplyOn : copy.autoReplyOff}
                  </div>
                  <div style={{ color: "#5b6473", lineHeight: 1.6 }}>
                    {settings.replyMode === "auto" ? copy.autoReplyOnText : copy.autoReplyOffText}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: "58px",
                    height: "32px",
                    borderRadius: "999px",
                    background: settings.replyMode === "auto" ? "#1f7a45" : "#cbd5e1",
                    transition: "all 160ms ease",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "4px",
                      left: settings.replyMode === "auto" ? "30px" : "4px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#fff",
                      boxShadow: "0 3px 10px rgba(15,23,42,0.2)",
                      transition: "all 160ms ease",
                    }}
                  />
                </span>
                <input
                  type="checkbox"
                  checked={settings.replyMode === "auto"}
                  onChange={(event) => {
                    updateReplyMode(event.target.checked ? "auto" : "approval");
                    setNotificationSaved(false);
                  }}
                  aria-label={copy.toggleLabel}
                  style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
                />
              </label>
              {settings.replyMode === "approval" ? (
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e4e9f2",
                    borderRadius: "18px",
                    padding: "16px 18px",
                    display: "grid",
                    gap: "12px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "#172033",
                      fontWeight: "700",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={settings.alertsEnabled}
                      onChange={(event) => updateAlertsEnabled(event.target.checked)}
                    />
                    {copy.emailNotifyToggle}
                  </label>
                  {settings.alertsEnabled ? (
                    <div style={{ display: "grid", gap: "12px" }}>
                      <div style={{ color: "#5b6473", lineHeight: 1.6 }}>
                        {copy.emailNotifyHelp}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          alignItems: "end",
                        }}
                      >
                        <label style={{ display: "grid", gap: "6px", flex: "1 1 260px" }}>
                          <span
                            style={{ color: "#172033", fontSize: "14px", fontWeight: "600" }}
                          >
                            {copy.emailNotifyLabel}
                          </span>
                          <input
                            type="email"
                            value={notificationEmailInput}
                            onChange={(event) => {
                              setNotificationEmailInput(event.target.value);
                              setNotificationSaved(false);
                            }}
                            placeholder={copy.emailNotifyPlaceholder}
                            style={{
                              width: "100%",
                              padding: "12px 14px",
                              borderRadius: "12px",
                              border: "1px solid #d1d5db",
                              fontSize: "15px",
                              background: "#fff",
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={saveNotificationEmail}
                          style={{
                            background: "#172033",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            padding: "12px 16px",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                        >
                          {copy.saveEmail}
                        </button>
                      </div>
                    </div>
                  ) : null}
                  {notificationSaved && settings.alertsEnabled ? (
                    <div style={{ color: "#1f7a45", fontSize: "14px", fontWeight: "600" }}>
                      {copy.emailSaved}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </article>
        </section>

        {selectedApproval ? (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 16px",
              background: "rgba(15, 23, 42, 0.42)",
              backdropFilter: "blur(4px)",
            }}
            onClick={closeApproval}
          >
            <section
              style={{
                width: "100%",
                maxWidth: "780px",
                maxHeight: "min(88vh, 860px)",
                overflowY: "auto",
                background: "#ffffff",
                borderRadius: "28px",
                padding: "22px",
                boxShadow: "0 24px 70px rgba(15,23,42,0.24)",
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dashboard-approval-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "16px",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      marginBottom: "10px",
                      background: "#eef6ff",
                      color: "#31598e",
                      borderRadius: "999px",
                      padding: "7px 11px",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {copy.inboxTitle}
                  </div>
                  <h2
                    id="dashboard-approval-title"
                    style={{ fontSize: "28px", color: "#172033", marginBottom: "8px" }}
                  >
                    {selectedApproval.customerName}
                  </h2>
                  <div style={{ color: "#6b7280" }}>
                    {selectedApproval.businessName} · {selectedApproval.rating}/5
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "14px",
                  marginBottom: "14px",
                }}
              >
                <div style={{ background: "#f8fafc", borderRadius: "18px", padding: "14px" }}>
                  <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                    {copy.customerReview}
                  </div>
                  <div style={{ color: "#344054", lineHeight: 1.7 }}>
                    {selectedApproval.reviewText}
                  </div>
                </div>

                <div style={{ background: "#f9fbff", borderRadius: "18px", padding: "14px" }}>
                  <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                    {copy.draftReply}
                  </div>
                  <textarea
                    value={draftReplyText}
                    onChange={(event) => setDraftReplyText(event.target.value)}
                    rows={8}
                    style={{
                      width: "100%",
                      minHeight: "220px",
                      border: "1px solid #d1d5db",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      resize: "vertical",
                      color: "#172033",
                      background: "#fff",
                      lineHeight: 1.7,
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  flexWrap: "wrap",
                  paddingTop: "4px",
                }}
              >
                <button
                  type="button"
                  onClick={closeApproval}
                  style={{
                    background: "#eff3fb",
                    color: "#172033",
                    border: "1px solid #d7deed",
                    borderRadius: "14px",
                    padding: "12px 16px",
                    cursor: "pointer",
                  }}
                >
                  {copy.closeDraft}
                </button>
                <button
                  type="button"
                  onClick={() => handlePost(selectedApproval.id)}
                  style={{
                    background: "#172033",
                    color: "#fff",
                    border: "none",
                    borderRadius: "14px",
                    padding: "12px 16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {copy.confirmNow}
                </button>
              </div>
            </section>
          </div>
        ) : null}

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.25fr) minmax(280px, 0.75fr)",
              gap: "18px",
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

            <article
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
              }}
            >
              <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
                {copy.toneTitle}
              </h2>
              <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
                {copy.toneText}
              </p>
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "16px",
                  padding: "14px 16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ color: "#6b7280", fontSize: "13px", marginBottom: "6px" }}>
                  {copy.tone}
                </div>
                <input
                  type="text"
                  value={settings.tone}
                  onChange={(event) => updateTone(event.target.value)}
                  placeholder={copy.tonePlaceholder}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#172033",
                  }}
                />
              </div>
              <div style={{ color: "#6b7280", lineHeight: 1.6 }}>
                {settings.tone || copy.notSet}
              </div>
            </article>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: "18px",
            marginTop: "18px",
            alignItems: "start",
          }}
        >
          <article
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
              height: "100%",
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

          <article
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
              height: "100%",
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
                background: "#f8fafc",
                borderRadius: "18px",
                border: "1px solid #e4e9f2",
                padding: "16px",
                display: "grid",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm((current) => !current);
                    setPasswordSaved(false);
                  }}
                  style={{
                    background: "#172033",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {showPasswordForm ? copy.hidePasswordSection : copy.passwordSection}
                </button>
                {passwordSaved ? (
                  <span style={{ color: "#1f7a45", fontSize: "14px", fontWeight: "600" }}>
                    {copy.passwordSaved}
                  </span>
                ) : null}
              </div>
              {showPasswordForm ? (
                <>
                  {[
                    ["currentPassword", copy.currentPassword],
                    ["newPassword", copy.newPassword],
                    ["confirmPassword", copy.confirmPassword],
                  ].map(([field, label]) => (
                    <label key={field} style={{ display: "grid", gap: "6px" }}>
                      <span style={{ color: "#172033", fontSize: "14px", fontWeight: "600" }}>
                        {label}
                      </span>
                      <input
                        type="password"
                        value={passwordForm[field]}
                        onChange={(event) => updatePasswordField(field, event.target.value)}
                        placeholder={copy.passwordPlaceholder}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "12px",
                          border: "1px solid #d1d5db",
                          fontSize: "15px",
                          background: "#fff",
                        }}
                      />
                    </label>
                  ))}
                  <div>
                    <button
                      type="button"
                      onClick={savePassword}
                      style={{
                        background: "#172033",
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      {copy.savePassword}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
