"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const baseTranslations = {
  header: {
    home: "Home",
    how: "How it works",
    why: "Why Replyo",
    pricing: "Pricing",
    login: "Login",
    dashboard: "Dashboard",
    inbox: "Inbox",
    connect: "Connect",
  },
  footer: {
    brand: "AI-powered Google review replies",
    explore: "Explore",
    trust: "Trust",
    privacy: "Privacy Policy",
    googleNote: "Google Business API access request in progress",
    terms: "Terms of Service",
    contact: "Contact",
    contactText:
      "Start simple with a support email first, then add a full contact form later when Replyo starts getting more traffic.",
    copyright: "© 2026 Replyo. Built to help local businesses reply faster.",
    language: "Language",
  },
  home: {
    badge: "Google review replies for local businesses",
    title: "Reply to customer reviews in seconds, not at closing time.",
    description:
      "Replyo helps restaurants, salons, and shops generate warm, professional Google review replies without losing time during a busy day.",
    try: "Try Replyo now",
    create: "Create account",
    saveTitle: "Save hours",
    saveText: "Reply faster during service",
    proTitle: "Stay professional",
    proText: "Consistent tone for every review",
    missTitle: "Never miss feedback",
    missText: "Keep your reply workflow in one place",
  },
  livePreview: {
    reviewTitle: "Google review",
    reviewDetected: "New customer feedback detected",
    livePreview: "Live preview",
    status: "Reply status",
    drafting: "Drafting",
    draft: "Replyo draft",
    reviewFirst: "Review first",
    test: "Test Replyo",
    helper: "Replyo turns new reviews into ready-to-send replies in seconds.",
  },
  how: {
    badge: "How Replyo works",
    stepLabel: "Step",
    title: "A simpler way to stay on top of Google reviews.",
    description:
      "Replyo is built for busy local businesses. It connects to your Google Business Profile, detects new reviews, writes thoughtful replies, and lets you choose whether to approve them first or let Replyo post automatically.",
    whyBadge: "Why businesses use Replyo",
    whyTitle: "Save time without sounding generic.",
    whyText:
      "Replyo is not just a text generator. It is designed to help businesses reply consistently, stay professional, and keep their Google presence active without adding more work to the day.",
    localBadge: "Built for local businesses",
    ctaTitle: "Connect, review, and reply in minutes.",
    ctaText:
      "Whether you want full control or full automation, Replyo is designed to help you answer more reviews with less effort.",
    create: "Create account",
    test: "Test Replyo",
    steps: [
      [
        "Connect your Google Business Profile",
        "Replyo connects to the business account you already manage, then detects the locations and categories linked to it.",
      ],
      [
        "Replyo detects new reviews",
        "As new customer feedback comes in, Replyo brings it into one inbox so you can stop checking reviews manually.",
      ],
      [
        "The reply is adapted to your business",
        "Replyo uses the business category, review rating, review wording, and your preferred tone to generate a more natural response.",
      ],
      [
        "You choose how replies are posted",
        "Approve and edit replies yourself, or switch on auto mode and let Replyo answer directly for you.",
      ],
    ],
    benefits: [
      "Reply faster without interrupting service",
      "Keep replies professional and consistent",
      "Handle multiple languages more naturally",
      "Stay active on Google without extra admin work",
    ],
    useCases: [
      [
        "Restaurants",
        "Reply with a warm hospitality tone that fits food, service, atmosphere, and guest experience.",
      ],
      [
        "Beauty salons",
        "Use a more personal, polished tone around care, comfort, cleanliness, and the final result.",
      ],
      [
        "Shops and local services",
        "Keep replies clear, helpful, and brand-consistent around service quality and customer satisfaction.",
      ],
    ],
  },
  why: {
    badge: "Why Replyo",
    title: "More than faster replies. A stronger image for your business.",
    description:
      "Replyo helps local businesses answer reviews quickly, professionally, and consistently. The result is not just saved time, but a business that feels more active, more trustworthy, and more customer-focused on Google.",
    coreBadge: "The core advantage",
    coreTitle: "Reply to every review without losing time during the day.",
    coreText:
      "Businesses do not ignore reviews because they do not care. They ignore them because service comes first. Replyo closes that gap by turning new reviews into ready-to-send replies in seconds.",
    customerBadge: "What customers notice",
    reasonsTitle: "Why businesses will choose Replyo",
    reasonsText:
      "Replyo is valuable because it solves both sides of the problem: operational pressure for the owner, and trust perception for future customers.",
    ctaTitle: "Built to help local businesses look more responsive, every day.",
    ctaText:
      "Replyo helps restaurants, beauty salons, shops, and service businesses save time while creating a stronger public image on Google.",
    how: "See how it works",
    create: "Create account",
    extra: [
      "Reply more consistently without hiring extra admin help",
      "Keep tone professional across positive, neutral, and negative reviews",
      "Show prospects that your business listens and cares",
      "Reduce the chance that good reviews go unanswered for days",
    ],
    customerItems: [
      "This business replies to people",
      "This business looks active and attentive",
      "This business handles feedback professionally",
      "This business feels more trustworthy before I even visit",
    ],
    reasons: [
      [
        "Reply in your customer’s language",
        "Tourists and international customers can leave reviews in English, Arabic, French, German, Chinese, and more. Replyo helps businesses answer in the right language so every customer feels understood.",
      ],
      [
        "Save time every single day",
        "Owners and managers are busy running service, handling staff, and serving customers. Replyo removes the hassle of writing replies manually one by one.",
      ],
      [
        "Stay active and visible on Google",
        "A business that replies consistently looks more active, more attentive, and more professional. That stronger presence helps you stand out when people compare businesses online.",
      ],
      [
        "Make a great impression before customers even visit",
        "Many people read reviews before booking or walking in. When they see thoughtful replies to every review, they feel that the business cares before they even become customers.",
      ],
      [
        "Respond without delay",
        "Replyo is built to detect reviews quickly, generate a reply instantly, and either hold it for approval or post it automatically depending on your settings.",
      ],
      [
        "Adapt replies to the type of business",
        "A restaurant should not sound like a beauty salon, and a salon should not sound like a retail shop. Replyo can shape replies around the business category, tone, and review content.",
      ],
    ],
  },
  pricing: {
    back: "Back to home",
    badge: "Simple plans for local businesses",
    title: "Pricing built for owners who just want reviews handled.",
    description:
      "Start with one location, save hours each week, and upgrade when you want Replyo to cover more branches, more reviews, or more team members.",
    practical: "Most practical",
    month: "/ month",
    custom: "Talk to us",
    start: "Start with this plan",
    plans: [
      [
        "Starter",
        "$29",
        "For one local business that wants consistent replies without extra admin work.",
        [
          "1 connected business location",
          "Up to 150 review replies per month",
          "Reply tone customization",
          "Review inbox and reply history",
          "Email alerts for new reviews",
        ],
      ],
      [
        "Growth",
        "$79",
        "For active restaurants, salons, and shops that want Replyo working every day.",
        [
          "3 connected business locations",
          "Unlimited reply drafts",
          "Approval mode or auto-reply mode",
          "Priority support",
          "Monthly performance summary",
        ],
      ],
      [
        "Multi-Location",
        "Custom",
        "For operators managing several branches and team members.",
        [
          "5+ business locations",
          "Team access",
          "Central review dashboard",
          "Custom onboarding",
          "Dedicated success support",
        ],
      ],
    ],
  },
  auth: {
    loginTitle: "Login to Replyo",
    loginDesc: "Access your dashboard and manage your review replies.",
    demoTitle: "Temporary demo account:",
    email: "Email",
    password: "Password",
    loggingIn: "Logging in...",
    login: "Login",
    invalid: "Invalid email or password.",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    continueGoogle: "Continue with Google",
    signupTitle: "Create your account",
    signupDesc: "Start using Replyo to manage and respond to reviews faster.",
    tempReady: "Temporary account ready for you:",
    useTemp: "For now, please use the temporary account details shown below.",
    createFail: "We could not create the demo session.",
    creating: "Creating account...",
    signupEmail: "Sign up with email",
    signupGoogle: "Sign up with Google",
    signupApple: "Sign up with Apple",
    already: "Already have an account?",
    agreePrefix: "I agree to the",
    agreeAnd: "and",
    agreeTerms: "Terms of Service",
    agreePrivacy: "Privacy Policy",
    agreeRequired: "Please agree to the Terms of Service and Privacy Policy to continue.",
  },
};

const overrides = {
  fr: {
    header: {
      home: "Accueil",
      how: "Fonctionnement",
      why: "Pourquoi Replyo",
      pricing: "Tarifs",
      login: "Connexion",
      dashboard: "Tableau de bord",
      inbox: "Boite de reception",
      connect: "Connecter",
    },
    footer: {
      explore: "Explorer",
      trust: "Confiance",
      privacy: "Politique de confidentialite",
      googleNote: "Demande d acces a l API Google Business en cours",
      terms: "Conditions d utilisation",
      contactText:
        "Commencez avec une adresse email de support, puis ajoutez un vrai formulaire plus tard.",
      language: "Langue",
    },
    home: {
      badge: "Reponses Google pour commerces locaux",
      title: "Repondez aux avis clients en quelques secondes, pas a la fermeture.",
      description:
        "Replyo aide restaurants, salons et boutiques a generer des reponses Google chaleureuses et professionnelles sans perdre du temps.",
      try: "Tester Replyo",
      create: "Creer un compte",
      saveTitle: "Gagnez du temps",
      saveText: "Repondez plus vite pendant le service",
      proTitle: "Restez professionnel",
      proText: "Un ton coherent pour chaque avis",
      missTitle: "Ne ratez aucun avis",
      missText: "Gardez votre flux de reponses au meme endroit",
    },
    livePreview: {
      reviewTitle: "Avis Google",
      reviewDetected: "Nouveau commentaire client detecte",
      livePreview: "Apercu en direct",
      status: "Statut de la reponse",
      drafting: "Redaction",
      draft: "Brouillon Replyo",
      reviewFirst: "Verifier avant publication",
      test: "Tester Replyo",
      helper: "Replyo transforme les nouveaux avis en reponses pretes en quelques secondes.",
    },
    how: {
      badge: "Comment Replyo fonctionne",
      stepLabel: "Etape",
      title: "Une facon plus simple de gerer les avis Google.",
      description:
        "Replyo se connecte a votre fiche Google Business, detecte les nouveaux avis et vous laisse choisir entre validation manuelle et publication automatique.",
      whyBadge: "Pourquoi les entreprises utilisent Replyo",
      whyTitle: "Gagnez du temps sans paraitre generique.",
      whyText:
        "Replyo aide les entreprises a repondre avec regularite et a garder une presence active sur Google.",
      localBadge: "Concu pour les commerces locaux",
      ctaTitle: "Connectez, verifiez et repondez en quelques minutes.",
      ctaText:
        "Que vous vouliez tout controler ou tout automatiser, Replyo vous aide a repondre a plus d avis avec moins d effort.",
      create: "Creer un compte",
      test: "Tester Replyo",
      steps: [
        [
          "Connectez votre fiche Google Business",
          "Replyo se connecte au compte entreprise que vous gerez deja, puis detecte les etablissements et categories qui y sont lies.",
        ],
        [
          "Replyo detecte les nouveaux avis",
          "Quand de nouveaux retours arrivent, Replyo les rassemble pour vous eviter de verifier les avis manuellement.",
        ],
        [
          "La reponse s adapte a votre activite",
          "Replyo utilise la categorie de l entreprise, la note, le texte de l avis et votre ton prefere pour generer une reponse plus naturelle.",
        ],
        [
          "Vous choisissez comment publier les reponses",
          "Validez et modifiez les reponses vous-meme, ou activez le mode auto pour laisser Replyo repondre directement.",
        ],
      ],
      benefits: [
        "Repondez plus vite sans interrompre le service",
        "Gardez des reponses professionnelles et coherentes",
        "Gerez plusieurs langues plus naturellement",
        "Restez actif sur Google sans travail administratif en plus",
      ],
    },
    why: {
      badge: "Pourquoi Replyo",
      title: "Plus que des reponses rapides. Une image plus forte pour votre entreprise.",
      description:
        "Replyo aide les commerces locaux a repondre aux avis rapidement et avec professionnalisme.",
      coreBadge: "L avantage principal",
      coreTitle: "Repondez a chaque avis sans perdre du temps pendant la journee.",
      coreText:
        "Replyo transforme les nouveaux avis en reponses prêtes en quelques secondes.",
      customerBadge: "Ce que les clients remarquent",
      reasonsTitle: "Pourquoi les entreprises choisiront Replyo",
      reasonsText:
        "Replyo aide a la fois l operationnel du gerant et l image de confiance percue par les clients.",
      ctaTitle: "Concu pour aider les commerces locaux a paraitre plus reactifs.",
      ctaText:
        "Replyo aide restaurants, salons et boutiques a gagner du temps tout en renforcant leur image sur Google.",
      how: "Voir le fonctionnement",
      create: "Creer un compte",
      extra: [
        "Repondez plus regulierement sans embaucher d aide administrative en plus",
        "Gardez un ton professionnel sur les avis positifs, neutres et negatifs",
        "Montrez aux prospects que votre entreprise ecoute et s interesse aux retours",
        "Reduisez le risque de laisser de bons avis sans reponse pendant des jours",
      ],
      customerItems: [
        "Cette entreprise repond aux clients",
        "Cette entreprise parait active et attentive",
        "Cette entreprise gere les retours avec professionnalisme",
        "Cette entreprise inspire davantage confiance avant meme la visite",
      ],
      reasons: [
        [
          "Repondez dans la langue de votre client",
          "Des touristes et clients internationaux peuvent laisser des avis en anglais, arabe, francais, allemand, chinois et plus encore. Replyo aide a repondre dans la bonne langue pour que chaque client se sente compris.",
        ],
        [
          "Gagnez du temps chaque jour",
          "Les gerants sont occupes a faire tourner le service, gerer l equipe et servir les clients. Replyo retire la corvee d ecrire chaque reponse une par une.",
        ],
        [
          "Restez actif et visible sur Google",
          "Une entreprise qui repond regulierement parait plus active, plus attentive et plus professionnelle. Cette presence plus forte aide a se demarquer en ligne.",
        ],
        [
          "Faites bonne impression avant meme la visite",
          "Beaucoup de personnes lisent les avis avant de reserver ou de venir. Voir des reponses attentionnees a chaque avis inspire confiance avant meme le premier contact.",
        ],
        [
          "Repondez sans attendre",
          "Replyo est concu pour detecter rapidement les avis, generer une reponse instantanement, puis la garder pour validation ou la publier automatiquement selon vos reglages.",
        ],
        [
          "Adaptez les reponses au type d activite",
          "Un restaurant ne doit pas sonner comme un salon de beaute, et un salon ne doit pas ressembler a une boutique. Replyo peut ajuster les reponses selon la categorie, le ton et le contenu de l avis.",
        ],
      ],
    },
    pricing: {
      back: "Retour a l accueil",
      badge: "Des offres simples pour les commerces locaux",
      title: "Des tarifs penses pour les proprietaires qui veulent juste gerer les avis.",
      description:
        "Commencez avec un seul etablissement puis montez en gamme quand vous voulez couvrir plus d adresses.",
      practical: "Le plus pratique",
      month: "/ mois",
      custom: "Parler avec nous",
      start: "Choisir cette offre",
    },
    auth: {
      loginTitle: "Connexion a Replyo",
      loginDesc: "Accedez a votre tableau de bord et gerez vos reponses aux avis.",
      demoTitle: "Compte de demonstration temporaire :",
      password: "Mot de passe",
      loggingIn: "Connexion...",
      login: "Connexion",
      invalid: "Email ou mot de passe invalide.",
      noAccount: "Vous n avez pas de compte ?",
      signUp: "Inscription",
      continueGoogle: "Continuer avec Google",
      signupTitle: "Creez votre compte",
      signupDesc: "Commencez a utiliser Replyo pour gerer les avis plus vite.",
      tempReady: "Compte temporaire pret pour vous :",
      useTemp: "Pour le moment, veuillez utiliser les identifiants temporaires ci-dessous.",
      createFail: "Impossible de creer la session de demo.",
      creating: "Creation du compte...",
      signupEmail: "S inscrire avec email",
      signupGoogle: "S inscrire avec Google",
      signupApple: "S inscrire avec Apple",
      already: "Vous avez deja un compte ?",
      agreePrefix: "J accepte les",
      agreeAnd: "et la",
      agreeTerms: "Conditions d utilisation",
      agreePrivacy: "Politique de confidentialite",
      agreeRequired: "Veuillez accepter les conditions d utilisation et la politique de confidentialite pour continuer.",
    },
  },
  es: {
    header: {
      home: "Inicio",
      how: "Como funciona",
      why: "Por que Replyo",
      pricing: "Precios",
      login: "Iniciar sesion",
      dashboard: "Panel",
      inbox: "Bandeja",
      connect: "Conectar",
    },
    footer: {
      explore: "Explorar",
      trust: "Confianza",
      privacy: "Politica de privacidad",
      googleNote: "Solicitud de acceso a la API de Google Business en curso",
      terms: "Terminos del servicio",
      contact: "Contacto",
      language: "Idioma",
    },
    home: {
      badge: "Respuestas de Google para negocios locales",
      title: "Responde a las resenas de clientes en segundos, no al final del dia.",
      description:
        "Replyo ayuda a restaurantes, salones y tiendas a generar respuestas de Google calidas y profesionales sin perder tiempo durante la jornada.",
      try: "Probar Replyo",
      create: "Crear cuenta",
      saveTitle: "Ahorra tiempo",
      saveText: "Responde mas rapido durante el servicio",
      proTitle: "Mantente profesional",
      proText: "Un tono coherente para cada resena",
      missTitle: "No pierdas comentarios",
      missText: "Manten todo tu flujo de respuestas en un solo lugar",
    },
    livePreview: {
      reviewTitle: "Resena de Google",
      reviewDetected: "Nueva opinion del cliente detectada",
      livePreview: "Vista en vivo",
      status: "Estado de respuesta",
      drafting: "Redactando",
      draft: "Borrador de Replyo",
      reviewFirst: "Revisar antes de publicar",
      test: "Probar Replyo",
      helper: "Replyo convierte nuevas resenas en respuestas listas en segundos.",
    },
    how: {
      badge: "Como funciona Replyo",
      stepLabel: "Paso",
      title: "Una forma mas simple de gestionar las resenas de Google.",
      description:
        "Replyo se conecta a tu perfil de Google Business, detecta nuevas resenas y te deja elegir entre aprobacion manual o publicacion automatica.",
      whyBadge: "Por que los negocios usan Replyo",
      whyTitle: "Ahorra tiempo sin sonar generico.",
      whyText: "Replyo ayuda a responder con constancia y a mantener una presencia activa en Google.",
      localBadge: "Hecho para negocios locales",
      ctaTitle: "Conecta, revisa y responde en minutos.",
      ctaText:
        "Tanto si quieres control total como automatizacion total, Replyo te ayuda a responder mas con menos esfuerzo.",
      create: "Crear cuenta",
      test: "Probar Replyo",
      steps: [
        [
          "Conecta tu perfil de Google Business",
          "Replyo se conecta a la cuenta del negocio que ya gestionas y detecta las ubicaciones y categorias vinculadas.",
        ],
        [
          "Replyo detecta nuevas resenas",
          "Cuando llegan nuevas opiniones, Replyo las reune para que no tengas que revisar resenas manualmente.",
        ],
        [
          "La respuesta se adapta a tu negocio",
          "Replyo usa la categoria del negocio, la puntuacion, el texto de la resena y tu tono preferido para generar una respuesta mas natural.",
        ],
        [
          "Tu eliges como se publican las respuestas",
          "Aprueba y edita las respuestas tu mismo, o activa el modo automatico para que Replyo responda por ti.",
        ],
      ],
      benefits: [
        "Responde mas rapido sin interrumpir el servicio",
        "Mantén las respuestas profesionales y coherentes",
        "Gestiona varios idiomas de forma mas natural",
        "Sigue activo en Google sin mas trabajo administrativo",
      ],
    },
    why: {
      badge: "Por que Replyo",
      title: "Mas que respuestas rapidas. Una imagen mas fuerte para tu negocio.",
      description:
        "Replyo ayuda a los negocios locales a responder resenas con rapidez, profesionalismo y constancia.",
      coreBadge: "La ventaja principal",
      coreTitle: "Responde a cada resena sin perder tiempo durante el dia.",
      coreText: "Replyo convierte nuevas resenas en respuestas listas en segundos.",
      customerBadge: "Lo que notan los clientes",
      reasonsTitle: "Por que los negocios elegiran Replyo",
      reasonsText:
        "Replyo aporta valor tanto en la operacion diaria como en la confianza que perciben los futuros clientes.",
      ctaTitle: "Hecho para ayudar a los negocios locales a verse mas receptivos.",
      ctaText:
        "Replyo ayuda a restaurantes, salones y tiendas a ahorrar tiempo mientras fortalecen su imagen en Google.",
      how: "Ver como funciona",
      create: "Crear cuenta",
      extra: [
        "Responde con mas regularidad sin contratar ayuda administrativa extra",
        "Mantén un tono profesional en resenas positivas, neutras y negativas",
        "Muestra a los futuros clientes que tu negocio escucha y se preocupa",
        "Reduce el riesgo de dejar buenas resenas sin respuesta durante dias",
      ],
      customerItems: [
        "Este negocio responde a la gente",
        "Este negocio parece activo y atento",
        "Este negocio gestiona bien los comentarios",
        "Este negocio transmite mas confianza incluso antes de visitarlo",
      ],
      reasons: [
        [
          "Responde en el idioma de tu cliente",
          "Turistas y clientes internacionales pueden dejar resenas en ingles, arabe, frances, aleman, chino y mas. Replyo ayuda a responder en el idioma adecuado para que cada cliente se sienta comprendido.",
        ],
        [
          "Ahorra tiempo cada dia",
          "Propietarios y gerentes estan ocupados dirigiendo el servicio, gestionando el equipo y atendiendo clientes. Replyo elimina la molestia de redactar cada respuesta manualmente.",
        ],
        [
          "Mantente activo y visible en Google",
          "Un negocio que responde con constancia parece mas activo, atento y profesional. Esa presencia mas fuerte ayuda a destacar cuando los clientes comparan opciones.",
        ],
        [
          "Da una gran impresion antes de que te visiten",
          "Muchas personas leen resenas antes de reservar o entrar. Cuando ven respuestas cuidadas en cada opinion, sienten que el negocio se preocupa incluso antes de conocerlo.",
        ],
        [
          "Responde sin demora",
          "Replyo esta pensado para detectar resenas rapidamente, generar una respuesta al instante y dejarla para aprobacion o publicarla automaticamente segun tu configuracion.",
        ],
        [
          "Adapta las respuestas al tipo de negocio",
          "Un restaurante no debe sonar como un salon de belleza, y un salon no debe sonar como una tienda. Replyo adapta las respuestas segun la categoria, el tono y el contenido de la resena.",
        ],
      ],
    },
    pricing: {
      back: "Volver al inicio",
      badge: "Planes simples para negocios locales",
      title: "Precios pensados para duenos que solo quieren las resenas bajo control.",
      description:
        "Empieza con una ubicacion y sube de plan cuando quieras cubrir mas sucursales o mas resenas.",
      practical: "La opcion mas practica",
      month: "/ mes",
      custom: "Hablar con nosotros",
      start: "Empezar con este plan",
    },
    auth: {
      loginTitle: "Inicia sesion en Replyo",
      loginDesc: "Accede a tu panel y gestiona tus respuestas a resenas.",
      demoTitle: "Cuenta demo temporal:",
      email: "Correo",
      password: "Contrasena",
      loggingIn: "Entrando...",
      login: "Iniciar sesion",
      invalid: "Correo o contrasena no validos.",
      noAccount: "No tienes cuenta?",
      signUp: "Registrate",
      continueGoogle: "Continuar con Google",
      signupTitle: "Crea tu cuenta",
      signupDesc: "Empieza a usar Replyo para gestionar y responder resenas mas rapido.",
      tempReady: "Cuenta temporal lista para ti:",
      useTemp: "Por ahora, usa los datos temporales que aparecen abajo.",
      createFail: "No pudimos crear la sesion demo.",
      creating: "Creando cuenta...",
      signupEmail: "Registrarse con email",
      signupGoogle: "Registrarse con Google",
      signupApple: "Registrarse con Apple",
      already: "Ya tienes cuenta?",
      agreePrefix: "Acepto los",
      agreeAnd: "y la",
      agreeTerms: "Terminos del servicio",
      agreePrivacy: "Politica de privacidad",
      agreeRequired: "Acepta los terminos del servicio y la politica de privacidad para continuar.",
    },
  },
  ar: {
    header: {
      home: "الرئيسية",
      how: "كيف يعمل",
      why: "لماذا ريبلايو",
      pricing: "الاسعار",
      login: "تسجيل الدخول",
      dashboard: "لوحة التحكم",
      inbox: "صندوق المراجعات",
      connect: "ربط",
    },
    footer: {
      explore: "استكشف",
      trust: "الثقة",
      privacy: "سياسة الخصوصية",
      googleNote: "طلب الوصول الى Google Business API قيد المراجعة",
      terms: "شروط الخدمة",
      contact: "تواصل",
      language: "اللغة",
    },
    home: {
      badge: "ردود Google للاعمال المحلية",
      title: "رد على تقييمات العملاء خلال ثوان وليس في نهاية اليوم.",
      description:
        "يساعد Replyo المطاعم والصالونات والمتاجر على توليد ردود Google دافئة واحترافية دون اضاعة الوقت.",
      try: "جرّب ريبلايو",
      create: "انشئ حسابا",
      saveTitle: "وفّر الوقت",
      saveText: "رد بشكل اسرع اثناء الخدمة",
      proTitle: "ابق احترافيا",
      proText: "اسلوب متناسق لكل تقييم",
      missTitle: "لا تفوت اي ملاحظة",
      missText: "احتفظ بسير عمل الردود في مكان واحد",
    },
    livePreview: {
      reviewTitle: "تقييم Google",
      reviewDetected: "تم اكتشاف تعليق جديد من عميل",
      livePreview: "معاينة مباشرة",
      status: "حالة الرد",
      drafting: "جاري الصياغة",
      draft: "مسودة ريبلايو",
      reviewFirst: "مراجعة قبل النشر",
      test: "جرّب ريبلايو",
      helper: "يقوم Replyo بتحويل التقييمات الجديدة الى ردود جاهزة خلال ثوان.",
    },
    how: {
      badge: "كيف يعمل ريبلايو",
      stepLabel: "الخطوة",
      title: "طريقة ابسط للتعامل مع تقييمات Google.",
      description:
        "يتصل Replyo بملف Google Business الخاص بك، يكتشف التقييمات الجديدة، ويترك لك الخيار بين المراجعة المسبقة او النشر التلقائي.",
      whyBadge: "لماذا تستخدم الشركات ريبلايو",
      whyTitle: "وفّر الوقت دون ان تبدو الردود عامة.",
      whyText: "يساعد Replyo الاعمال على الرد باستمرار والحفاظ على حضور نشط على Google.",
      localBadge: "مصمم للاعمال المحلية",
      ctaTitle: "اربط وراجع ورد خلال دقائق.",
      ctaText:
        "سواء كنت تريد تحكما كاملا او اتمتة كاملة، صمم Replyo لمساعدتك على الرد على عدد اكبر من التقييمات بجهد اقل.",
      create: "انشئ حسابا",
      test: "جرّب ريبلايو",
      steps: [
        [
          "اربط ملف Google Business الخاص بك",
          "يتصل Replyo بحساب النشاط الذي تديره بالفعل، ثم يكتشف المواقع والفئات المرتبطة به.",
        ],
        [
          "يكتشف Replyo التقييمات الجديدة",
          "عندما تصل ملاحظات جديدة من العملاء، يجمعها Replyo لك حتى لا تضطر لمراجعة التقييمات يدويا.",
        ],
        [
          "يتكيف الرد مع نشاطك",
          "يستخدم Replyo فئة النشاط والتقييم ونص المراجعة والنبرة التي تفضلها لتوليد رد اكثر طبيعية.",
        ],
        [
          "انت تختار كيف يتم نشر الردود",
          "راجع الردود وعدلها بنفسك، او فعّل الوضع التلقائي ليقوم Replyo بالرد مباشرة عنك.",
        ],
      ],
      benefits: [
        "رد بشكل اسرع من دون تعطيل الخدمة",
        "حافظ على ردود احترافية ومتسقة",
        "تعامل مع لغات متعددة بشكل طبيعي اكثر",
        "ابق نشطا على Google من دون عمل اداري اضافي",
      ],
    },
    why: {
      badge: "لماذا ريبلايو",
      title: "اكثر من مجرد ردود اسرع. صورة اقوى لعملك.",
      description:
        "يساعد Replyo الاعمال المحلية على الرد على التقييمات بسرعة واحترافية واستمرار.",
      coreBadge: "الميزة الاساسية",
      coreTitle: "رد على كل تقييم دون ان تخسر وقتك خلال اليوم.",
      coreText: "يقوم Replyo بتحويل التقييمات الجديدة الى ردود جاهزة خلال ثوان.",
      customerBadge: "ما الذي يلاحظه العملاء",
      reasonsTitle: "لماذا ستختار الشركات Replyo",
      reasonsText:
        "يقدم Replyo قيمة تشغيلية لصاحب العمل وصورة ثقة افضل لدى العملاء الجدد.",
      ctaTitle: "مصمم لمساعدة الاعمال المحلية على الظهور بشكل اكثر استجابة.",
      ctaText:
        "يساعد Replyo المطاعم وصالونات التجميل والمتاجر على توفير الوقت وبناء صورة اقوى على Google.",
      how: "شاهد كيف يعمل",
      create: "انشئ حسابا",
      extra: [
        "رد باستمرار اكثر من دون توظيف مساعدة ادارية اضافية",
        "حافظ على نبرة احترافية عبر التقييمات الايجابية والمحايدة والسلبية",
        "اظهر للعملاء المحتملين ان نشاطك يستمع ويهتم",
        "قلل احتمال ترك التقييمات الجيدة بلا رد لايام",
      ],
      customerItems: [
        "هذا النشاط يرد على الناس",
        "هذا النشاط يبدو نشطا ومنتبها",
        "هذا النشاط يتعامل مع الملاحظات باحترافية",
        "هذا النشاط يبدو اكثر موثوقية حتى قبل الزيارة",
      ],
      reasons: [
        [
          "رد بلغة عميلك",
          "قد يترك السياح والعملاء الدوليون تقييمات بالانجليزية او العربية او الفرنسية او الالمانية او الصينية وغيرها. يساعد Replyo على الرد باللغة المناسبة حتى يشعر كل عميل انه مفهوم.",
        ],
        [
          "وفّر الوقت كل يوم",
          "المالكون والمديرون مشغولون بادارة الخدمة والموظفين وخدمة العملاء. يزيل Replyo عنك عناء كتابة كل رد يدويا واحدا تلو الآخر.",
        ],
        [
          "ابق نشطا ومرئيا على Google",
          "النشاط الذي يرد باستمرار يبدو اكثر نشاطا واهتماما واحترافية. وهذا الحضور الاقوى يساعدك على التميز عندما يقارن الناس بين الاعمال عبر الانترنت.",
        ],
        [
          "اترك انطباعا رائعا قبل الزيارة",
          "كثير من الناس يقرأون التقييمات قبل الحجز او الزيارة. وعندما يرون ردودا مدروسة على كل تقييم، يشعرون ان النشاط يهتم حتى قبل ان يصبحوا عملاء.",
        ],
        [
          "رد من دون تأخير",
          "تم تصميم Replyo لاكتشاف التقييمات بسرعة، وتوليد رد فوري، ثم الاحتفاظ به للموافقة او نشره تلقائيا حسب اعداداتك.",
        ],
        [
          "كيّف الردود حسب نوع النشاط",
          "لا يجب ان يبدو المطعم كصالون تجميل، ولا ينبغي ان يبدو الصالون كمتجر. يمكن لـ Replyo تشكيل الردود حسب الفئة والنبرة ومحتوى التقييم.",
        ],
      ],
    },
    pricing: {
      back: "العودة للرئيسية",
      badge: "خطط بسيطة للاعمال المحلية",
      title: "اسعار مصممة لاصحاب الاعمال الذين يريدون التعامل مع التقييمات بسهولة.",
      description:
        "ابدأ بموقع واحد ثم انتقل لخطة اعلى عندما تريد تغطية مواقع او تقييمات اكثر.",
      practical: "الانسب",
      month: "/ شهريا",
      custom: "تواصل معنا",
      start: "ابدأ بهذه الخطة",
    },
    auth: {
      loginTitle: "تسجيل الدخول الى Replyo",
      loginDesc: "ادخل الى لوحة التحكم وادِر ردود التقييمات.",
      demoTitle: "حساب تجريبي مؤقت:",
      email: "البريد الالكتروني",
      password: "كلمة المرور",
      loggingIn: "جار تسجيل الدخول...",
      login: "تسجيل الدخول",
      invalid: "البريد او كلمة المرور غير صحيحة.",
      noAccount: "ليس لديك حساب؟",
      signUp: "انشئ حسابا",
      continueGoogle: "المتابعة باستخدام Google",
      signupTitle: "انشئ حسابك",
      signupDesc: "ابدأ باستخدام Replyo لادارة التقييمات والرد عليها بشكل اسرع.",
      tempReady: "حساب مؤقت جاهز لك:",
      useTemp: "في الوقت الحالي استخدم بيانات الحساب المؤقت الظاهرة بالاسفل.",
      createFail: "لم نتمكن من انشاء الجلسة التجريبية.",
      creating: "جار انشاء الحساب...",
      signupEmail: "انشئ حسابا بالبريد",
      signupGoogle: "انشئ حسابا باستخدام Google",
      signupApple: "انشئ حسابا باستخدام Apple",
      already: "لديك حساب بالفعل؟",
      agreePrefix: "اوافق على",
      agreeAnd: "و",
      agreeTerms: "شروط الخدمة",
      agreePrivacy: "سياسة الخصوصية",
      agreeRequired: "يرجى الموافقة على شروط الخدمة وسياسة الخصوصية للمتابعة.",
    },
  },
  de: {
    header: {
      home: "Start",
      how: "So funktioniert es",
      why: "Warum Replyo",
      pricing: "Preise",
      login: "Anmelden",
      dashboard: "Dashboard",
      inbox: "Postfach",
      connect: "Verbinden",
    },
    footer: {
      explore: "Entdecken",
      trust: "Vertrauen",
      privacy: "Datenschutz",
      googleNote: "Anfrage fuer Google-Business-API-Zugang laeuft",
      terms: "Nutzungsbedingungen",
      contact: "Kontakt",
      language: "Sprache",
    },
    home: {
      badge: "Google-Antworten fuer lokale Unternehmen",
      title: "Beantworte Kundenbewertungen in Sekunden, nicht erst nach Feierabend.",
      description:
        "Replyo hilft Restaurants, Salons und Geschaeften dabei, professionelle Google-Antworten zu erstellen, ohne tagsueber Zeit zu verlieren.",
      try: "Replyo testen",
      create: "Konto erstellen",
      saveTitle: "Zeit sparen",
      saveText: "Waerend des Betriebs schneller antworten",
      proTitle: "Professionell bleiben",
      proText: "Ein konsistenter Ton fuer jede Bewertung",
      missTitle: "Kein Feedback verpassen",
      missText: "Halte deinen Antwort-Workflow an einem Ort",
    },
    livePreview: {
      reviewTitle: "Google-Bewertung",
      reviewDetected: "Neues Kundenfeedback erkannt",
      livePreview: "Live-Vorschau",
      status: "Antwortstatus",
      drafting: "Wird erstellt",
      draft: "Replyo-Entwurf",
      reviewFirst: "Vor dem Veröffentlichen pruefen",
      test: "Replyo testen",
      helper: "Replyo verwandelt neue Bewertungen in Sekunden in sendefertige Antworten.",
    },
    how: {
      badge: "So funktioniert Replyo",
      stepLabel: "Schritt",
      title: "Einfacher den Überblick ueber Google-Bewertungen behalten.",
      description:
        "Replyo verbindet sich mit deinem Google-Business-Profil, erkennt neue Bewertungen und laesst dich zwischen Freigabe und Automatik waehlen.",
      whyBadge: "Warum Unternehmen Replyo nutzen",
      whyTitle: "Zeit sparen, ohne generisch zu wirken.",
      whyText: "Replyo hilft Unternehmen, konsistent zu antworten und auf Google aktiv zu bleiben.",
      localBadge: "Fuer lokale Unternehmen gemacht",
      ctaTitle: "Verbinden, pruefen und in Minuten antworten.",
      ctaText:
        "Egal ob du volle Kontrolle oder volle Automatisierung willst, Replyo hilft dir, mehr Bewertungen mit weniger Aufwand zu beantworten.",
      create: "Konto erstellen",
      test: "Replyo testen",
      steps: [
        [
          "Verbinde dein Google-Business-Profil",
          "Replyo verbindet sich mit dem Unternehmenskonto, das du bereits verwaltest, und erkennt die verknuepften Standorte und Kategorien.",
        ],
        [
          "Replyo erkennt neue Bewertungen",
          "Sobald neues Kundenfeedback eingeht, sammelt Replyo es fuer dich, damit du Bewertungen nicht mehr manuell pruefen musst.",
        ],
        [
          "Die Antwort wird an dein Unternehmen angepasst",
          "Replyo nutzt Unternehmenskategorie, Bewertung, Wortlaut der Rezension und deinen bevorzugten Ton, um eine natuerlichere Antwort zu erstellen.",
        ],
        [
          "Du entscheidest, wie Antworten veroeffentlicht werden",
          "Gib Antworten selbst frei und bearbeite sie, oder aktiviere den Automatikmodus, damit Replyo direkt fuer dich antwortet.",
        ],
      ],
      benefits: [
        "Schneller antworten, ohne den Betrieb zu unterbrechen",
        "Antworten professionell und konsistent halten",
        "Mehrere Sprachen natuerlicher abdecken",
        "Auf Google aktiv bleiben ohne extra Verwaltungsaufwand",
      ],
    },
    why: {
      badge: "Warum Replyo",
      title: "Mehr als schnellere Antworten. Ein staerkeres Bild fuer dein Unternehmen.",
      description:
        "Replyo hilft lokalen Unternehmen, Bewertungen schnell, professionell und konsequent zu beantworten.",
      coreBadge: "Der Kernvorteil",
      coreTitle: "Jede Bewertung beantworten, ohne waehrend des Tages Zeit zu verlieren.",
      coreText: "Replyo macht aus neuen Bewertungen in Sekunden sendefertige Antworten.",
      customerBadge: "Was Kunden wahrnehmen",
      reasonsTitle: "Warum Unternehmen Replyo waehlen werden",
      reasonsText:
        "Replyo loest operative Belastung und verbessert zugleich den Vertrauenseindruck bei neuen Kunden.",
      ctaTitle: "Entwickelt, damit lokale Unternehmen reaktionsstaerker wirken.",
      ctaText:
        "Replyo hilft Restaurants, Salons und Geschaeften, Zeit zu sparen und ihr Google-Bild zu verbessern.",
      how: "So funktioniert es",
      create: "Konto erstellen",
      extra: [
        "Regelmaessiger antworten ohne zusaetzliche Verwaltungshilfe einzustellen",
        "Einen professionellen Ton bei positiven, neutralen und negativen Bewertungen behalten",
        "Interessenten zeigen, dass dein Unternehmen zuhoert und sich kuemmert",
        "Das Risiko senken, gute Bewertungen tagelang unbeantwortet zu lassen",
      ],
      customerItems: [
        "Dieses Unternehmen antwortet auf Menschen",
        "Dieses Unternehmen wirkt aktiv und aufmerksam",
        "Dieses Unternehmen geht professionell mit Feedback um",
        "Dieses Unternehmen wirkt schon vor dem Besuch vertrauenswuerdiger",
      ],
      reasons: [
        [
          "Antworte in der Sprache deiner Kunden",
          "Touristen und internationale Kunden koennen Bewertungen auf Englisch, Arabisch, Franzoesisch, Deutsch, Chinesisch und mehr hinterlassen. Replyo hilft dabei, in der passenden Sprache zu antworten, damit sich jeder Kunde verstanden fuehlt.",
        ],
        [
          "Spare jeden Tag Zeit",
          "Inhaber und Manager sind mit Betrieb, Team und Kunden beschaeftigt. Replyo nimmt dir die Muehe ab, jede Antwort einzeln manuell zu schreiben.",
        ],
        [
          "Bleibe auf Google aktiv und sichtbar",
          "Ein Unternehmen, das konsequent antwortet, wirkt aktiver, aufmerksamer und professioneller. Diese staerkere Praesenz hilft dir, online mehr aufzufallen.",
        ],
        [
          "Mache einen starken Eindruck noch vor dem Besuch",
          "Viele Menschen lesen Bewertungen, bevor sie buchen oder vorbeikommen. Wenn sie durchdachte Antworten auf jede Bewertung sehen, entsteht Vertrauen schon vor dem ersten Kontakt.",
        ],
        [
          "Antworte ohne Verzoegerung",
          "Replyo ist darauf ausgelegt, Bewertungen schnell zu erkennen, sofort eine Antwort zu erstellen und sie je nach Einstellung zur Freigabe bereitzuhalten oder automatisch zu veroeffentlichen.",
        ],
        [
          "Passe Antworten an die Art des Unternehmens an",
          "Ein Restaurant sollte nicht wie ein Beautysalon klingen, und ein Salon nicht wie ein Laden. Replyo kann Antworten an Kategorie, Ton und Inhalt der Bewertung anpassen.",
        ],
      ],
    },
    pricing: {
      back: "Zurueck zur Startseite",
      badge: "Einfache Plaene fuer lokale Unternehmen",
      title: "Preise fuer Inhaber, die Bewertungen einfach erledigt haben wollen.",
      description:
        "Starte mit einem Standort und erweitere spaeter fuer mehr Filialen oder mehr Bewertungen.",
      practical: "Am praktischsten",
      month: "/ Monat",
      custom: "Kontakt aufnehmen",
      start: "Mit diesem Plan starten",
    },
    auth: {
      loginTitle: "Bei Replyo anmelden",
      loginDesc: "Greife auf dein Dashboard zu und verwalte deine Bewertungsantworten.",
      demoTitle: "Temporäres Demokonto:",
      email: "E-Mail",
      password: "Passwort",
      loggingIn: "Anmeldung...",
      login: "Anmelden",
      invalid: "Ungueltige E-Mail oder ungültiges Passwort.",
      noAccount: "Noch kein Konto?",
      signUp: "Registrieren",
      continueGoogle: "Mit Google fortfahren",
      signupTitle: "Erstelle dein Konto",
      signupDesc: "Nutze Replyo, um Bewertungen schneller zu verwalten und zu beantworten.",
      tempReady: "Temporäres Konto fuer dich:",
      useTemp: "Bitte nutze vorerst die unten gezeigten temporären Zugangsdaten.",
      createFail: "Die Demo-Sitzung konnte nicht erstellt werden.",
      creating: "Konto wird erstellt...",
      signupEmail: "Mit E-Mail registrieren",
      signupGoogle: "Mit Google registrieren",
      signupApple: "Mit Apple registrieren",
      already: "Hast du bereits ein Konto?",
      agreePrefix: "Ich stimme den",
      agreeAnd: "und der",
      agreeTerms: "Nutzungsbedingungen",
      agreePrivacy: "Datenschutzrichtlinie",
      agreeRequired: "Bitte stimme den Nutzungsbedingungen und der Datenschutzrichtlinie zu, um fortzufahren.",
    },
  },
};

function deepMerge(base, override) {
  const result = { ...base };
  Object.entries(override || {}).forEach(([key, value]) => {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], value);
    } else {
      result[key] = value;
    }
  });
  return result;
}

const translations = {
  en: baseTranslations,
  fr: deepMerge(baseTranslations, overrides.fr),
  es: deepMerge(baseTranslations, overrides.es),
  ar: deepMerge(baseTranslations, overrides.ar),
  de: deepMerge(baseTranslations, overrides.de),
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("replyo-language");
    if (storedLanguage && translations[storedLanguage]) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage) => {
        if (!translations[nextLanguage]) {
          return;
        }
        setLanguageState(nextLanguage);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("replyo-language", nextLanguage);
        }
      },
      t: translations[language] || baseTranslations,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const availableLanguages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "de", label: "German", flag: "🇩🇪" },
];
