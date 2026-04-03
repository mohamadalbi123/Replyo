"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

const privacyCopy = {
  en: {
    back: "Back to home",
    badge: "Privacy Policy",
    title: "How Replyo handles personal and business data.",
    intro:
      "Replyo is a France-based service that operates globally. This Privacy Policy explains what information we collect, why we collect it, how we use it, and which rights users and connected businesses may have.",
    sections: [
      [
        "Who this policy applies to",
        [
          "This policy applies to visitors, account holders, trial users, business managers, and anyone who contacts Replyo through the website.",
          "It also applies to information connected through supported third-party services such as Google Business Profile when a user explicitly grants access.",
        ],
      ],
      [
        "What information we may collect",
        [
          "Account details such as name, email address, login provider, and subscription status.",
          "Business information such as connected location names, categories, and review workflow preferences.",
          "Review-related content such as customer review text, ratings, drafted replies, approved replies, and posting status.",
          "Support information you choose to send through our contact form or future support channels.",
          "Technical information such as browser type, IP address, device information, cookies, and usage analytics needed to keep the service secure and reliable.",
        ],
      ],
      [
        "How we use information",
        [
          "To provide and improve Replyo, including generating, storing, editing, and posting review replies.",
          "To personalize reply tone based on business category, rating, language, and user settings.",
          "To manage billing, subscriptions, plan access, and account administration.",
          "To provide support, prevent abuse, monitor reliability, and comply with legal obligations.",
        ],
      ],
      [
        "Google Business Profile and third-party services",
        [
          "When you connect a Google Business Profile account, Replyo only uses the permissions and data needed to support review workflows that you authorize.",
          "Connected third-party services may provide Replyo with business profile information, review data, and access tokens needed to operate the requested features.",
          "Your continued use of those services is also subject to the relevant third-party terms and privacy policies.",
        ],
      ],
      [
        "AI-generated replies",
        [
          "Replyo may use AI systems to draft suggested replies based on review content, business category, tone preferences, and selected language.",
          "Users remain responsible for reviewing the content they choose to approve or publish, especially when automatic posting is enabled in the future.",
        ],
      ],
      [
        "Legal basis and international use",
        [
          "For users in the European Economic Area, Replyo may process information on the basis of contract performance, legitimate interests, legal obligations, and, where required, consent.",
          "Because Replyo operates globally, information may be processed in countries outside your own. Where required, we aim to use appropriate safeguards for international transfers.",
        ],
      ],
      [
        "Data retention",
        [
          "We retain information only for as long as needed to operate the service, provide support, comply with law, resolve disputes, and maintain security records.",
          "Users may request account deletion, subject to any information we must retain for legal, fraud-prevention, tax, or accounting reasons.",
        ],
      ],
      [
        "Your rights",
        [
          "Depending on your location, you may have rights to access, correct, delete, restrict, object to, or export certain personal data.",
          "Users in the European Union may also have the right to lodge a complaint with their local data protection authority.",
        ],
      ],
      [
        "Contact",
        [
          "For privacy questions or data requests, please use the Replyo contact page.",
          "Company registration details, registered office information, and dedicated legal contact details will be added to this policy as part of final business registration in France.",
        ],
      ],
    ],
  },
  fr: {
    back: "Retour a l'accueil",
    badge: "Politique de confidentialite",
    title: "Comment Replyo traite les donnees personnelles et professionnelles.",
    intro:
      "Replyo est un service base en France qui opere a l'international. Cette politique explique quelles informations nous collectons, pourquoi nous les collectons et comment nous les utilisons.",
    sections: [
      [
        "A qui cette politique s'applique",
        [
          "Elle s'applique aux visiteurs, titulaires de compte, utilisateurs en essai, gestionnaires d'etablissements et personnes qui contactent Replyo via le site.",
          "Elle couvre aussi les informations connectees via des services tiers pris en charge comme Google Business Profile lorsque l'utilisateur donne son autorisation.",
        ],
      ],
      [
        "Quelles informations peuvent etre collectees",
        [
          "Informations de compte comme le nom, l'email, le fournisseur de connexion et le statut d'abonnement.",
          "Informations d'etablissement comme les noms de lieux connectes, categories et preferences de reponse.",
          "Contenu lie aux avis comme le texte des avis, les notes, les brouillons de reponse et le statut de publication.",
          "Informations de support que vous choisissez d'envoyer via le formulaire de contact.",
          "Informations techniques comme le navigateur, l'adresse IP, l'appareil, les cookies et les mesures d'usage necessaires a la securite du service.",
        ],
      ],
      [
        "Comment nous utilisons les informations",
        [
          "Pour fournir et ameliorer Replyo, y compris generer, enregistrer, modifier et publier des reponses aux avis.",
          "Pour personnaliser le ton selon la categorie d'activite, la note, la langue et les reglages de l'utilisateur.",
          "Pour gerer la facturation, les abonnements et l'administration des comptes.",
          "Pour fournir une assistance, prevenir les abus, surveiller la fiabilite et respecter nos obligations legales.",
        ],
      ],
      [
        "Google Business Profile et services tiers",
        [
          "Lorsque vous connectez un compte Google Business Profile, Replyo utilise uniquement les autorisations et donnees necessaires aux flux de gestion des avis que vous avez autorises.",
          "Les services tiers peuvent fournir des informations d'etablissement, des donnees d'avis et des jetons d'acces necessaires au fonctionnement des fonctionnalites demandees.",
        ],
      ],
      [
        "Reponses generees par l'IA",
        [
          "Replyo peut utiliser des systemes d'IA pour proposer des reponses a partir du contenu de l'avis, de la categorie d'activite, du ton souhaite et de la langue choisie.",
          "L'utilisateur reste responsable du contenu qu'il approuve ou publie, notamment si la publication automatique est activee plus tard.",
        ],
      ],
      [
        "Base legale et usage international",
        [
          "Pour les utilisateurs de l'Espace economique europeen, le traitement peut reposer sur l'execution du contrat, l'interet legitime, les obligations legales et, si necessaire, le consentement.",
          "Comme Replyo opere a l'international, certaines donnees peuvent etre traitees en dehors de votre pays avec des garanties appropriees lorsque la loi l'exige.",
        ],
      ],
      [
        "Conservation des donnees",
        [
          "Nous conservons les donnees uniquement pendant la duree necessaire au fonctionnement du service, au support, a la securite et au respect des obligations legales.",
          "Les utilisateurs peuvent demander la suppression de leur compte sous reserve des donnees que nous devons conserver pour des raisons legales ou comptables.",
        ],
      ],
      [
        "Vos droits",
        [
          "Selon votre lieu de residence, vous pouvez disposer de droits d'acces, de rectification, d'effacement, de limitation, d'opposition ou de portabilite.",
          "Les utilisateurs de l'Union europeenne peuvent egalement saisir leur autorite de protection des donnees.",
        ],
      ],
      [
        "Contact",
        [
          "Pour toute question relative a la confidentialite ou toute demande sur vos donnees, utilisez la page de contact de Replyo.",
          "Les details juridiques complets de l'entreprise seront ajoutes lorsque l'immatriculation en France sera finalisee.",
        ],
      ],
    ],
  },
  es: {
    back: "Volver al inicio",
    badge: "Politica de privacidad",
    title: "Como gestiona Replyo los datos personales y del negocio.",
    intro:
      "Replyo es un servicio con base en Francia que opera globalmente. Esta politica explica que informacion recopilamos, por que la recopilamos y como la usamos.",
    sections: [
      [
        "A quien se aplica esta politica",
        [
          "Se aplica a visitantes, titulares de cuenta, usuarios de prueba, gestores de negocios y personas que contactan a Replyo.",
          "Tambien cubre la informacion conectada mediante servicios de terceros como Google Business Profile cuando el usuario autoriza el acceso.",
        ],
      ],
      [
        "Que informacion podemos recopilar",
        [
          "Datos de cuenta como nombre, correo electronico, proveedor de acceso y estado de suscripcion.",
          "Datos del negocio como nombres de ubicaciones conectadas, categorias y preferencias del flujo de respuesta.",
          "Contenido relacionado con resenas como texto, puntuaciones, borradores, respuestas aprobadas y estado de publicacion.",
          "Informacion de soporte que decidas enviar mediante el formulario de contacto.",
          "Informacion tecnica como navegador, direccion IP, dispositivo, cookies y analitica de uso necesaria para seguridad y fiabilidad.",
        ],
      ],
      [
        "Como usamos la informacion",
        [
          "Para ofrecer y mejorar Replyo, incluida la generacion, edicion, almacenamiento y publicacion de respuestas.",
          "Para personalizar el tono de respuesta segun la categoria del negocio, la puntuacion, el idioma y las preferencias del usuario.",
          "Para gestionar pagos, suscripciones y administracion de cuentas.",
          "Para ofrecer soporte, prevenir abusos, vigilar la fiabilidad y cumplir obligaciones legales.",
        ],
      ],
      [
        "Google Business Profile y servicios de terceros",
        [
          "Cuando conectas una cuenta de Google Business Profile, Replyo solo utiliza los permisos y datos necesarios para los flujos de reseñas que autorizas.",
          "Los servicios de terceros pueden proporcionar informacion del negocio, datos de reseñas y tokens de acceso necesarios para el servicio.",
        ],
      ],
      [
        "Respuestas generadas con IA",
        [
          "Replyo puede utilizar sistemas de IA para redactar respuestas sugeridas en funcion del contenido de la resena, la categoria del negocio, el tono elegido y el idioma.",
          "El usuario sigue siendo responsable del contenido que aprueba o publica, especialmente si mas adelante activa la publicacion automatica.",
        ],
      ],
      [
        "Base legal y uso internacional",
        [
          "Para usuarios del Espacio Economico Europeo, el tratamiento puede basarse en la ejecucion del contrato, intereses legitimos, obligaciones legales y, cuando sea necesario, consentimiento.",
          "Como Replyo opera globalmente, la informacion puede tratarse fuera de tu pais con salvaguardas adecuadas cuando la ley lo requiera.",
        ],
      ],
      [
        "Conservacion de datos",
        [
          "Conservamos la informacion solo durante el tiempo necesario para operar el servicio, ofrecer soporte, cumplir la ley y mantener registros de seguridad.",
          "Los usuarios pueden solicitar la eliminacion de su cuenta, sujeto a los datos que debamos conservar por motivos legales, fiscales o contables.",
        ],
      ],
      [
        "Tus derechos",
        [
          "Segun tu ubicacion, puedes tener derechos de acceso, correccion, eliminacion, restriccion, oposicion o portabilidad.",
          "Los usuarios de la Union Europea tambien pueden presentar una reclamacion ante su autoridad de proteccion de datos.",
        ],
      ],
      [
        "Contacto",
        [
          "Para preguntas de privacidad o solicitudes sobre datos, utiliza la pagina de contacto de Replyo.",
          "Los datos juridicos completos de la empresa se anadiran cuando el registro en Francia quede finalizado.",
        ],
      ],
    ],
  },
  ar: {
    back: "العودة الى الرئيسية",
    badge: "سياسة الخصوصية",
    title: "كيف يتعامل Replyo مع البيانات الشخصية وبيانات النشاط التجاري.",
    intro:
      "Replyo خدمة مقرها فرنسا وتعمل عالميا. توضح هذه السياسة ما هي المعلومات التي نجمعها ولماذا نجمعها وكيف نستخدمها.",
    sections: [
      [
        "على من تنطبق هذه السياسة",
        [
          "تنطبق هذه السياسة على الزوار واصحاب الحسابات والمستخدمين التجريبيين ومديري الانشطة التجارية وكل من يتواصل مع Replyo عبر الموقع.",
          "كما تنطبق على المعلومات المتصلة عبر خدمات طرف ثالث مثل Google Business Profile عندما يمنح المستخدم الاذن الصريح.",
        ],
      ],
      [
        "ما المعلومات التي قد نجمعها",
        [
          "بيانات الحساب مثل الاسم والبريد الالكتروني ومزود تسجيل الدخول وحالة الاشتراك.",
          "بيانات النشاط التجاري مثل اسم الموقع المتصل والفئة وتفضيلات سير عمل الردود.",
          "بيانات مرتبطة بالمراجعات مثل نص المراجعة والتقييمات والمسودات والردود المعتمدة وحالة النشر.",
          "بيانات الدعم التي تختار ارسالها عبر نموذج التواصل.",
          "بيانات تقنية مثل نوع المتصفح وعنوان IP والجهاز وملفات تعريف الارتباط وبيانات الاستخدام اللازمة للامان والموثوقية.",
        ],
      ],
      [
        "كيف نستخدم المعلومات",
        [
          "لتقديم Replyo وتحسينه، بما في ذلك انشاء الردود وتخزينها وتعديلها ونشرها.",
          "لتخصيص اسلوب الرد وفقا لفئة النشاط والتقييم واللغة واعدادات المستخدم.",
          "لادارة الفواتير والاشتراكات والوصول الى الخطط وادارة الحساب.",
          "لتقديم الدعم ومنع سوء الاستخدام ومراقبة الاعتمادية والامتثال للالتزامات القانونية.",
        ],
      ],
      [
        "Google Business Profile والخدمات الخارجية",
        [
          "عند ربط حساب Google Business Profile، يستخدم Replyo فقط الصلاحيات والبيانات اللازمة لتشغيل سير عمل المراجعات الذي وافقت عليه.",
          "قد تزودنا الخدمات الخارجية بمعلومات النشاط التجاري وبيانات المراجعات ورموز الوصول اللازمة لتشغيل الميزات المطلوبة.",
        ],
      ],
      [
        "الردود المولدة بالذكاء الاصطناعي",
        [
          "قد يستخدم Replyo انظمة ذكاء اصطناعي لصياغة ردود مقترحة بناء على محتوى المراجعة وفئة النشاط والنبرة المطلوبة واللغة المختارة.",
          "يبقى المستخدم مسؤولا عن المحتوى الذي يوافق عليه او ينشره، خاصة عند تفعيل النشر التلقائي مستقبلا.",
        ],
      ],
      [
        "الاساس القانوني والاستخدام الدولي",
        [
          "بالنسبة لمستخدمي المنطقة الاقتصادية الاوروبية، قد تتم المعالجة على اساس تنفيذ العقد او المصلحة المشروعة او الالتزامات القانونية او الموافقة عند الحاجة.",
          "وبما ان Replyo يعمل عالميا، فقد تتم معالجة البيانات خارج بلدك مع استخدام الضمانات المناسبة عند طلب القانون لذلك.",
        ],
      ],
      [
        "الاحتفاظ بالبيانات",
        [
          "نحتفظ بالبيانات فقط للمدة اللازمة لتشغيل الخدمة وتقديم الدعم والالتزام بالقانون والحفاظ على سجلات الامان.",
          "يمكن للمستخدم طلب حذف الحساب مع مراعاة البيانات التي يجب الاحتفاظ بها لاسباب قانونية او ضريبية او محاسبية.",
        ],
      ],
      [
        "حقوقك",
        [
          "بحسب موقعك، قد تكون لك حقوق الوصول والتصحيح والحذف والتقييد والاعتراض وقابلية نقل البيانات.",
          "كما يحق لمستخدمي الاتحاد الاوروبي تقديم شكوى الى جهة حماية البيانات المختصة لديهم.",
        ],
      ],
      [
        "التواصل",
        [
          "لاي استفسار متعلق بالخصوصية او طلبات البيانات، استخدم صفحة التواصل الخاصة بـ Replyo.",
          "سيتم اضافة البيانات القانونية الكاملة للشركة عند اكتمال التسجيل الرسمي في فرنسا.",
        ],
      ],
    ],
  },
  de: {
    back: "Zur Startseite",
    badge: "Datenschutz",
    title: "Wie Replyo personenbezogene und geschäftliche Daten verarbeitet.",
    intro:
      "Replyo ist ein in Frankreich ansässiger Dienst mit globaler Ausrichtung. Diese Datenschutzerklaerung erklaert, welche Informationen wir erfassen, warum wir sie erfassen und wie wir sie verwenden.",
    sections: [
      [
        "Fuer wen diese Richtlinie gilt",
        [
          "Sie gilt fuer Besucher, Kontoinhaber, Testnutzer, Geschaeftsverwalter und alle Personen, die Replyo ueber die Website kontaktieren.",
          "Sie gilt auch fuer Daten, die ueber unterstuetzte Drittanbieter wie Google Business Profile verbunden werden, wenn der Nutzer den Zugriff ausdruecklich erlaubt.",
        ],
      ],
      [
        "Welche Informationen wir erfassen koennen",
        [
          "Kontodaten wie Name, E-Mail-Adresse, Login-Anbieter und Abonnementstatus.",
          "Unternehmensdaten wie verbundene Standorte, Kategorien und Einstellungen fuer den Antwort-Workflow.",
          "Bewertungsbezogene Inhalte wie Bewertungstexte, Sterne, Antwortentwuerfe, freigegebene Antworten und Veroeffentlichungsstatus.",
          "Support-Informationen, die Sie uns ueber das Kontaktformular senden.",
          "Technische Daten wie Browsertyp, IP-Adresse, Geraeteinformationen, Cookies und Nutzungsanalysen zur Sicherheit und Zuverlaessigkeit des Dienstes.",
        ],
      ],
      [
        "Wie wir Informationen verwenden",
        [
          "Zur Bereitstellung und Verbesserung von Replyo, einschliesslich Erstellung, Speicherung, Bearbeitung und Veroeffentlichung von Antworten.",
          "Zur Personalisierung des Antworttons anhand von Kategorie, Bewertung, Sprache und Nutzereinstellungen.",
          "Zur Verwaltung von Abrechnung, Abonnements und Kontozugriff.",
          "Zur Unterstuetzung, Missbrauchsvermeidung, Ueberwachung der Zuverlaessigkeit und Erfuellung gesetzlicher Pflichten.",
        ],
      ],
      [
        "Google Business Profile und Drittanbieter",
        [
          "Wenn Sie ein Google-Business-Profile-Konto verbinden, verwendet Replyo nur die Berechtigungen und Daten, die fuer den von Ihnen autorisierten Bewertungsablauf erforderlich sind.",
          "Drittanbieter koennen Unternehmensdaten, Bewertungsdaten und Zugriffstoken bereitstellen, die fuer die gewuenschten Funktionen notwendig sind.",
        ],
      ],
      [
        "KI-generierte Antworten",
        [
          "Replyo kann KI-Systeme verwenden, um Antwortvorschlaege anhand von Bewertungstext, Geschaeftskategorie, Tonvorgaben und Sprache zu erstellen.",
          "Nutzer bleiben fuer Inhalte verantwortlich, die sie freigeben oder veroeffentlichen, insbesondere wenn spaeter automatische Veroeffentlichung aktiviert wird.",
        ],
      ],
      [
        "Rechtsgrundlagen und internationale Nutzung",
        [
          "Fuer Nutzer im Europaeischen Wirtschaftsraum kann die Verarbeitung auf Vertragserfuellung, berechtigten Interessen, gesetzlichen Pflichten und gegebenenfalls Einwilligung beruhen.",
          "Da Replyo global arbeitet, koennen Daten auch ausserhalb Ihres Landes verarbeitet werden. Soweit erforderlich, setzen wir geeignete Schutzmassnahmen ein.",
        ],
      ],
      [
        "Speicherdauer",
        [
          "Wir speichern Informationen nur so lange, wie es fuer den Betrieb des Dienstes, Support, Sicherheit und gesetzliche Pflichten erforderlich ist.",
          "Nutzer koennen die Loeschung ihres Kontos anfragen, vorbehaltlich Daten, die wir aus rechtlichen, steuerlichen oder buchhalterischen Gruenden aufbewahren muessen.",
        ],
      ],
      [
        "Ihre Rechte",
        [
          "Je nach Standort koennen Ihnen Rechte auf Auskunft, Berichtigung, Loeschung, Einschraenkung, Widerspruch oder Datenuebertragbarkeit zustehen.",
          "Nutzer in der EU koennen ausserdem Beschwerde bei ihrer zustaendigen Datenschutzbehoerde einreichen.",
        ],
      ],
      [
        "Kontakt",
        [
          "Fuer Datenschutzfragen oder Datenanfragen nutzen Sie bitte die Kontaktseite von Replyo.",
          "Die vollstaendigen Unternehmensangaben werden nach Abschluss der offiziellen Registrierung in Frankreich ergaenzt.",
        ],
      ],
    ],
  },
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const copy = privacyCopy[language] || privacyCopy.en;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 40%, #edf3ff 100%)",
        padding: "56px 20px 90px",
        fontFamily: "Arial, sans-serif",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <Link href="/" style={{ color: "#4b5563", textDecoration: "none" }}>
            ← {copy.back}
          </Link>
        </div>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "28px",
            padding: "34px",
            border: "1px solid rgba(23,32,51,0.08)",
            boxShadow: "0 18px 45px rgba(82,95,127,0.12)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "999px",
              background: "#fff0c2",
              color: "#7a5600",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "16px",
            }}
          >
            {copy.badge}
          </div>

          <h1 style={{ fontSize: "46px", lineHeight: 1.05, marginBottom: "14px", color: "#172033" }}>
            {copy.title}
          </h1>

          <p style={{ color: "#5b6474", lineHeight: 1.75, marginBottom: "30px" }}>{copy.intro}</p>

          <div style={{ display: "grid", gap: "22px" }}>
            {copy.sections.map(([heading, points]) => (
              <section
                key={heading}
                style={{
                  padding: "20px 22px",
                  borderRadius: "22px",
                  background: "#f9fbff",
                  border: "1px solid rgba(23,32,51,0.08)",
                }}
              >
                <h2 style={{ margin: "0 0 12px", color: "#172033", fontSize: "22px" }}>{heading}</h2>
                <div style={{ display: "grid", gap: "10px" }}>
                  {points.map((point) => (
                    <p key={point} style={{ margin: 0, color: "#5b6474", lineHeight: 1.75 }}>
                      {point}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
