"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

const termsCopy = {
  en: {
    back: "Back to home",
    badge: "Terms of Service",
    title: "The basic rules for using Replyo.",
    intro:
      "These Terms of Service apply to your access to and use of Replyo. Replyo is intended for businesses, managers, and authorized representatives who want to manage review replies more efficiently. By using the service, you agree to these terms.",
    sections: [
      [
        "Use of the service",
        [
          "Replyo helps businesses generate, review, manage, and in some cases publish replies to customer reviews.",
          "You may only use Replyo for businesses, listings, and accounts that you own or are authorized to manage.",
        ],
      ],
      [
        "Accounts and access",
        [
          "You are responsible for the accuracy of the information you provide and for keeping your account credentials secure.",
          "You are also responsible for all activity that occurs through your account, including connected third-party accounts and business locations.",
        ],
      ],
      [
        "Google Business Profile and connected services",
        [
          "Certain Replyo features depend on third-party services such as Google Business Profile and may require separate authorization.",
          "Your use of those connected services remains subject to their own terms, policies, permissions, technical limits, and API availability.",
        ],
      ],
      [
        "AI-generated content",
        [
          "Replyo may suggest or generate draft replies using AI systems.",
          "You remain responsible for the replies you approve, edit, publish, or allow the platform to publish on your behalf.",
          "You should review content carefully before relying on it for customer communication, especially in sensitive or negative review situations.",
          "Once a reply has been posted to a third-party platform, Replyo may not be able to edit, replace, or withdraw it in every case. Users should review replies before publication and manage any later changes through the platform that hosts the review where required.",
        ],
      ],
      [
        "Acceptable use",
        [
          "You may not use Replyo to publish unlawful, abusive, misleading, discriminatory, fraudulent, or infringing content.",
          "You may not use Replyo to access business profiles, reviews, or accounts without proper authorization.",
          "You may not interfere with the service, misuse APIs, or attempt to bypass technical, billing, or usage restrictions.",
        ],
      ],
      [
        "Plans, billing, and future paid features",
        [
          "Paid plans, trial access, usage limits, and billing terms may be updated as Replyo develops.",
          "If and when payment features are activated, pricing, renewal timing, cancellations, and plan limits will be described in the product interface or checkout flow.",
        ],
      ],
      [
        "Availability and changes",
        [
          "Replyo may evolve, add, remove, suspend, or change features at any time, including integrations that depend on third-party services.",
          "We aim to keep the service available and reliable, but uninterrupted access cannot be guaranteed.",
        ],
      ],
      [
        "Intellectual property",
        [
          "Replyo, its software, branding, design, and original product content remain the property of Replyo or its licensors.",
          "You retain rights to the business content and materials you lawfully provide, subject to the limited rights needed for us to operate the service.",
        ],
      ],
      [
        "Liability",
        [
          "Replyo is provided on an as-available basis to the extent permitted by law.",
          "To the extent permitted by applicable law, Replyo will not be responsible for indirect, incidental, special, consequential, or business interruption damages.",
          "Nothing in these terms is intended to limit rights that cannot legally be excluded under applicable law.",
        ],
      ],
      [
        "Termination",
        [
          "You may stop using Replyo at any time.",
          "We may suspend or terminate access if we reasonably believe there has been misuse, unauthorized access, non-payment when billing is active, or conduct that creates legal or security risk.",
        ],
      ],
      [
        "Governing law",
        [
          "These terms are intended to be governed by the laws of France, except where mandatory consumer or local laws require otherwise.",
          "Additional business registration details and formal company information will be added once Replyo's registration in France is finalized.",
        ],
      ],
      [
        "Contact",
        [
          "For legal, contractual, or account questions, please use the Replyo contact page.",
        ],
      ],
    ],
  },
  fr: {
    back: "Retour a l'accueil",
    badge: "Conditions d utilisation",
    title: "Les regles essentielles pour utiliser Replyo.",
    intro:
      "Ces conditions s'appliquent a votre acces et a votre utilisation de Replyo. Replyo est destine aux entreprises, gestionnaires et representants autorises souhaitant gerer les reponses aux avis plus efficacement.",
    sections: [
      [
        "Utilisation du service",
        [
          "Replyo aide les entreprises a generer, relire, gerer et dans certains cas publier des reponses aux avis clients.",
          "Vous ne pouvez utiliser Replyo que pour des entreprises, fiches et comptes que vous possedez ou que vous etes autorise a gerer.",
        ],
      ],
      [
        "Comptes et acces",
        [
          "Vous etes responsable de l'exactitude des informations fournies et de la securite de vos identifiants.",
          "Vous etes egalement responsable de toute activite realisee via votre compte, y compris les comptes tiers connectes et les lieux geres.",
        ],
      ],
      [
        "Google Business Profile et services connectes",
        [
          "Certaines fonctionnalites de Replyo dependent de services tiers comme Google Business Profile et peuvent necessiter une autorisation separee.",
          "L'utilisation de ces services reste soumise a leurs propres conditions, politiques, permissions et limites techniques.",
        ],
      ],
      [
        "Contenu genere par IA",
        [
          "Replyo peut suggerer ou generer des brouillons de reponse a l'aide de systemes d'IA.",
          "Vous restez responsable des reponses que vous approuvez, modifiez, publiez ou laissez la plateforme publier pour vous.",
          "Une fois qu'une reponse est publiee sur une plateforme tierce, Replyo peut ne pas etre en mesure de la modifier, de la remplacer ou de la retirer dans tous les cas. L'utilisateur doit donc verifier les reponses avant publication et gerer les changements ulterieurs via la plateforme concernee si necessaire.",
        ],
      ],
      [
        "Usage acceptable",
        [
          "Vous ne pouvez pas utiliser Replyo pour publier un contenu illicite, trompeur, abusif, discriminatoire ou contrefaisant.",
          "Vous ne pouvez pas utiliser Replyo pour acceder a des comptes ou fiches sans autorisation appropriee.",
          "Vous ne pouvez pas contourner les limites techniques, de facturation ou d'utilisation.",
        ],
      ],
      [
        "Offres, facturation et futures fonctions payantes",
        [
          "Les offres payantes, essais, limites d'utilisation et modalites de facturation peuvent evoluer avec Replyo.",
          "Lorsque les paiements seront actives, les prix, renouvellements, annulations et limites seront decrits dans l'interface ou au moment du paiement.",
        ],
      ],
      [
        "Disponibilite et changements",
        [
          "Replyo peut faire evoluer, ajouter, supprimer ou suspendre des fonctionnalites, notamment celles dependantes de services tiers.",
          "Nous cherchons a maintenir un service fiable, mais un acces ininterrompu ne peut etre garanti.",
        ],
      ],
      [
        "Propriete intellectuelle",
        [
          "Replyo, son logiciel, son design, sa marque et son contenu original restent la propriete de Replyo ou de ses concédants.",
          "Vous conservez vos droits sur les contenus professionnels que vous fournissez legalement, sous reserve des droits necessaires a l'exploitation du service.",
        ],
      ],
      [
        "Responsabilite",
        [
          "Replyo est fourni dans la mesure du possible et selon sa disponibilite, dans les limites autorisees par la loi.",
          "Dans les limites du droit applicable, Replyo ne saurait etre responsable des dommages indirects, accessoires, speciaux, consecutifs ou des pertes d'exploitation.",
        ],
      ],
      [
        "Resiliation",
        [
          "Vous pouvez cesser d'utiliser Replyo a tout moment.",
          "Nous pouvons suspendre ou resilier l'acces en cas d'usage abusif, d'acces non autorise, d'impaye lorsque la facturation sera activee, ou de risque juridique ou de securite.",
        ],
      ],
      [
        "Droit applicable",
        [
          "Ces conditions ont vocation a etre regies par le droit francais, sauf si des regles obligatoires locales imposent autre chose.",
          "Les informations completes de l'entreprise seront ajoutees une fois l'immatriculation de Replyo en France finalisee.",
        ],
      ],
      [
        "Contact",
        [
          "Pour toute question juridique, contractuelle ou liee au compte, utilisez la page de contact de Replyo.",
        ],
      ],
    ],
  },
  es: {
    back: "Volver al inicio",
    badge: "Terminos del servicio",
    title: "Las reglas basicas para usar Replyo.",
    intro:
      "Estos terminos se aplican a tu acceso y uso de Replyo. Replyo esta pensado para empresas, gestores y representantes autorizados que desean administrar respuestas a reseñas con mas eficiencia.",
    sections: [
      [
        "Uso del servicio",
        [
          "Replyo ayuda a generar, revisar, gestionar y en algunos casos publicar respuestas a reseñas de clientes.",
          "Solo puedes usar Replyo para negocios, fichas y cuentas que poseas o estes autorizado a gestionar.",
        ],
      ],
      [
        "Cuentas y acceso",
        [
          "Eres responsable de la exactitud de la informacion que proporcionas y de mantener seguras tus credenciales.",
          "Tambien eres responsable de toda actividad realizada a traves de tu cuenta, incluidas cuentas de terceros y ubicaciones conectadas.",
        ],
      ],
      [
        "Google Business Profile y servicios conectados",
        [
          "Algunas funciones de Replyo dependen de servicios de terceros como Google Business Profile y pueden requerir autorizacion adicional.",
          "El uso de esos servicios sigue sujeto a sus propios terminos, politicas, permisos, limites tecnicos y disponibilidad de API.",
        ],
      ],
      [
        "Contenido generado por IA",
        [
          "Replyo puede sugerir o generar borradores de respuesta usando sistemas de IA.",
          "Sigues siendo responsable de las respuestas que apruebas, editas, publicas o permites publicar en tu nombre.",
          "Una vez que una respuesta se haya publicado en una plataforma de terceros, Replyo puede no poder editarla, sustituirla o retirarla en todos los casos. Por eso conviene revisar las respuestas antes de publicarlas y gestionar cambios posteriores en la plataforma correspondiente cuando sea necesario.",
        ],
      ],
      [
        "Uso aceptable",
        [
          "No puedes usar Replyo para publicar contenido ilegal, abusivo, enganoso, discriminatorio, fraudulento o que infrinja derechos de terceros.",
          "No puedes usar Replyo para acceder a perfiles, reseñas o cuentas sin la debida autorizacion.",
          "No puedes interferir con el servicio ni intentar eludir restricciones tecnicas, de uso o facturacion.",
        ],
      ],
      [
        "Planes, facturacion y funciones de pago futuras",
        [
          "Los planes de pago, pruebas, limites de uso y condiciones de facturacion pueden cambiar conforme evolucione Replyo.",
          "Cuando se activen los pagos, los precios, renovaciones, cancelaciones y limites se mostraran en la interfaz o en el proceso de compra.",
        ],
      ],
      [
        "Disponibilidad y cambios",
        [
          "Replyo puede cambiar, agregar, eliminar o suspender funciones en cualquier momento, incluidas las dependientes de terceros.",
          "Intentamos mantener el servicio disponible y fiable, pero no podemos garantizar acceso ininterrumpido.",
        ],
      ],
      [
        "Propiedad intelectual",
        [
          "Replyo, su software, marca, diseno y contenido original siguen siendo propiedad de Replyo o de sus licenciantes.",
          "Conservas los derechos sobre el contenido empresarial que proporciones legalmente, sujeto a los permisos necesarios para operar el servicio.",
        ],
      ],
      [
        "Responsabilidad",
        [
          "Replyo se ofrece tal como esta disponible en la medida permitida por la ley.",
          "En la medida permitida por la ley aplicable, Replyo no sera responsable de danos indirectos, incidentales, especiales, consecuentes o interrupciones del negocio.",
        ],
      ],
      [
        "Terminacion",
        [
          "Puedes dejar de usar Replyo en cualquier momento.",
          "Podemos suspender o terminar el acceso si consideramos razonablemente que hubo uso indebido, acceso no autorizado, impago cuando la facturacion este activa o un riesgo legal o de seguridad.",
        ],
      ],
      [
        "Ley aplicable",
        [
          "Estos terminos se regiran por las leyes de Francia, salvo que una ley local obligatoria disponga lo contrario.",
          "Los datos legales completos de la empresa se anadiran cuando finalice el registro oficial de Replyo en Francia.",
        ],
      ],
      [
        "Contacto",
        [
          "Para preguntas legales, contractuales o sobre la cuenta, utiliza la pagina de contacto de Replyo.",
        ],
      ],
    ],
  },
  ar: {
    back: "العودة الى الرئيسية",
    badge: "شروط الخدمة",
    title: "القواعد الاساسية لاستخدام Replyo.",
    intro:
      "تنطبق هذه الشروط على وصولك الى Replyo واستخدامك له. تم تصميم Replyo للشركات والمديرين والممثلين المخولين الذين يريدون ادارة الردود على المراجعات بشكل اكثر كفاءة.",
    sections: [
      [
        "استخدام الخدمة",
        [
          "يساعد Replyo الشركات على انشاء الردود على مراجعات العملاء ومراجعتها وادارتها ونشرها في بعض الحالات.",
          "يجوز لك استخدام Replyo فقط للاعمال والقوائم والحسابات التي تملكها او لديك صلاحية ادارتها.",
        ],
      ],
      [
        "الحسابات والوصول",
        [
          "انت مسؤول عن دقة المعلومات التي تقدمها وعن الحفاظ على امان بيانات تسجيل الدخول الخاصة بك.",
          "كما انك مسؤول عن كل نشاط يتم عبر حسابك، بما في ذلك الحسابات الخارجية والمواقع المتصلة.",
        ],
      ],
      [
        "Google Business Profile والخدمات المرتبطة",
        [
          "تعتمد بعض ميزات Replyo على خدمات طرف ثالث مثل Google Business Profile وقد تتطلب تفويضا منفصلا.",
          "ويبقى استخدامك لتلك الخدمات خاضعا لشروطها وسياساتها وصلاحياتها وحدودها التقنية وتوفر واجهاتها البرمجية.",
        ],
      ],
      [
        "المحتوى المولد بالذكاء الاصطناعي",
        [
          "قد يقترح Replyo او يولد مسودات ردود باستخدام انظمة ذكاء اصطناعي.",
          "وتبقى انت مسؤولا عن الردود التي توافق عليها او تعدلها او تنشرها او تسمح للمنصة بنشرها نيابة عنك.",
          "وبعد نشر الرد على منصة خارجية، قد لا يتمكن Replyo من تعديله او استبداله او سحبه في كل الحالات. لذلك يجب مراجعة الردود قبل النشر وادارة اي تعديلات لاحقة من خلال المنصة التي تستضيف المراجعة عند الحاجة.",
        ],
      ],
      [
        "الاستخدام المقبول",
        [
          "لا يجوز استخدام Replyo لنشر محتوى غير قانوني او مسيء او مضلل او تمييزي او احتيالي او منتهك للحقوق.",
          "ولا يجوز استخدامه للوصول الى ملفات او مراجعات او حسابات بدون تفويض صحيح.",
          "ولا يجوز محاولة تعطيل الخدمة او اساءة استخدام الواجهات البرمجية او تجاوز القيود التقنية او المالية او التشغيلية.",
        ],
      ],
      [
        "الخطط والفوترة والميزات المدفوعة مستقبلا",
        [
          "قد يتم تحديث الخطط المدفوعة والفترات التجريبية وحدود الاستخدام وشروط الفوترة مع تطور Replyo.",
          "وعند تفعيل الدفع، سيتم توضيح الاسعار ومواعيد التجديد والالغاء وحدود الخطط داخل الواجهة او صفحة الدفع.",
        ],
      ],
      [
        "التوفر والتغييرات",
        [
          "قد يقوم Replyo بتعديل الميزات او اضافتها او ازالتها او ايقافها في اي وقت، خصوصا الميزات المعتمدة على خدمات خارجية.",
          "نسعى الى الحفاظ على موثوقية الخدمة، لكن لا يمكن ضمان التوفر دون انقطاع.",
        ],
      ],
      [
        "الملكية الفكرية",
        [
          "يبقى Replyo وبرمجياته وعلامته وتصميمه ومحتواه الاصلي ملكا لـ Replyo او للجهات المانحة للترخيص.",
          "وتحتفظ بحقوقك في محتوى النشاط التجاري الذي تقدمه بشكل قانوني، مع منحنا الحقوق المحدودة اللازمة لتشغيل الخدمة.",
        ],
      ],
      [
        "المسؤولية",
        [
          "يتم توفير Replyo على اساس التوفر وبالقدر الذي يسمح به القانون.",
          "وبالقدر الذي يسمح به القانون المعمول به، لا يكون Replyo مسؤولا عن الاضرار غير المباشرة او العرضية او الخاصة او التبعية او انقطاع الاعمال.",
        ],
      ],
      [
        "الانهاء",
        [
          "يمكنك التوقف عن استخدام Replyo في اي وقت.",
          "وقد نقوم بتعليق او انهاء الوصول اذا وجدنا بشكل معقول وجود اساءة استخدام او وصول غير مصرح به او عدم سداد عند تفعيل الفوترة او وجود مخاطر قانونية او امنية.",
        ],
      ],
      [
        "القانون الواجب التطبيق",
        [
          "من المقصود ان تخضع هذه الشروط لقوانين فرنسا، ما لم تفرض قوانين محلية الزامية غير ذلك.",
          "وسيتم اضافة البيانات القانونية الكاملة للشركة عند اكتمال تسجيل Replyo رسميا في فرنسا.",
        ],
      ],
      [
        "التواصل",
        [
          "للاسئلة القانونية او التعاقدية او المتعلقة بالحساب، يرجى استخدام صفحة التواصل الخاصة بـ Replyo.",
        ],
      ],
    ],
  },
  de: {
    back: "Zur Startseite",
    badge: "Nutzungsbedingungen",
    title: "Die grundlegenden Regeln fuer die Nutzung von Replyo.",
    intro:
      "Diese Nutzungsbedingungen gelten fuer Ihren Zugriff auf und die Nutzung von Replyo. Replyo richtet sich an Unternehmen, Manager und autorisierte Vertreter, die Bewertungsantworten effizienter verwalten moechten.",
    sections: [
      [
        "Nutzung des Dienstes",
        [
          "Replyo hilft Unternehmen dabei, Antworten auf Kundenbewertungen zu erstellen, zu pruefen, zu verwalten und teilweise zu veroeffentlichen.",
          "Sie duerfen Replyo nur fuer Unternehmen, Eintraege und Konten verwenden, die Ihnen gehoeren oder die Sie autorisiert verwalten.",
        ],
      ],
      [
        "Konten und Zugang",
        [
          "Sie sind fuer die Richtigkeit der bereitgestellten Informationen und fuer die Sicherheit Ihrer Zugangsdaten verantwortlich.",
          "Sie sind ausserdem fuer alle Aktivitaeten verantwortlich, die ueber Ihr Konto stattfinden, einschliesslich verbundener Drittanbieter-Konten und Standorte.",
        ],
      ],
      [
        "Google Business Profile und verbundene Dienste",
        [
          "Bestimmte Funktionen von Replyo haengen von Drittanbietern wie Google Business Profile ab und koennen eine separate Autorisierung erfordern.",
          "Ihre Nutzung dieser Dienste unterliegt weiterhin deren eigenen Bedingungen, Richtlinien, Berechtigungen, technischen Grenzen und der Verfuegbarkeit der APIs.",
        ],
      ],
      [
        "KI-generierte Inhalte",
        [
          "Replyo kann mit KI-Systemen Antwortentwuerfe vorschlagen oder erstellen.",
          "Sie bleiben fuer Antworten verantwortlich, die Sie freigeben, bearbeiten, veroeffentlichen oder in Ihrem Namen veroeffentlichen lassen.",
          "Sobald eine Antwort auf einer Drittplattform veroeffentlicht wurde, kann Replyo sie moeglicherweise nicht in jedem Fall bearbeiten, ersetzen oder zurueckziehen. Antworten sollten daher vor der Veroeffentlichung geprueft werden; spaetere Aenderungen muessen gegebenenfalls direkt auf der jeweiligen Plattform erfolgen.",
        ],
      ],
      [
        "Zulaessige Nutzung",
        [
          "Sie duerfen Replyo nicht nutzen, um rechtswidrige, missbraeuchliche, irrefuehrende, diskriminierende, betraegerische oder rechtsverletzende Inhalte zu veroeffentlichen.",
          "Sie duerfen Replyo nicht verwenden, um ohne ordnungsgemaesse Autorisierung auf Profile, Bewertungen oder Konten zuzugreifen.",
          "Sie duerfen den Dienst nicht stoeren und keine technischen, abrechnungsbezogenen oder nutzungsbezogenen Beschraenkungen umgehen.",
        ],
      ],
      [
        "Plaene, Abrechnung und spaetere Bezahlfunktionen",
        [
          "Bezahlte Plaene, Testzugang, Nutzungsgrenzen und Abrechnungsbedingungen koennen sich mit der Weiterentwicklung von Replyo aendern.",
          "Sobald Zahlungsfunktionen aktiv sind, werden Preise, Verlaengerungen, Kuendigungen und Planlimits in der Benutzeroberflaeche oder im Checkout beschrieben.",
        ],
      ],
      [
        "Verfuegbarkeit und Aenderungen",
        [
          "Replyo kann Funktionen jederzeit aendern, hinzufuegen, entfernen oder aussetzen, auch wenn sie von Drittanbietern abhaengen.",
          "Wir bemuehen uns um einen zuverlaessigen Betrieb, koennen jedoch keinen unterbrechungsfreien Zugriff garantieren.",
        ],
      ],
      [
        "Geistiges Eigentum",
        [
          "Replyo, seine Software, Marke, Gestaltung und originellen Inhalte bleiben Eigentum von Replyo oder seiner Lizenzgeber.",
          "Sie behalten die Rechte an den Geschaeftsinhalten, die Sie rechtmaessig bereitstellen, vorbehaltlich der fuer den Betrieb des Dienstes erforderlichen Rechte.",
        ],
      ],
      [
        "Haftung",
        [
          "Replyo wird im rechtlich zulaessigen Umfang auf Verfuegbarkeitsbasis bereitgestellt.",
          "Soweit nach anwendbarem Recht zulaessig, haftet Replyo nicht fuer indirekte, zufaellige, besondere, Folgeschaeden oder Betriebsunterbrechungen.",
        ],
      ],
      [
        "Beendigung",
        [
          "Sie koennen die Nutzung von Replyo jederzeit beenden.",
          "Wir koennen den Zugang sperren oder beenden, wenn wir berechtigterweise Missbrauch, unbefugten Zugriff, Nichtzahlung bei aktiver Abrechnung oder ein rechtliches bzw. sicherheitsrelevantes Risiko annehmen.",
        ],
      ],
      [
        "Anwendbares Recht",
        [
          "Diese Bedingungen sollen dem Recht Frankreichs unterliegen, sofern nicht zwingendes lokales Recht etwas anderes verlangt.",
          "Die vollstaendigen Unternehmensangaben werden nach Abschluss der offiziellen Registrierung von Replyo in Frankreich ergaenzt.",
        ],
      ],
      [
        "Kontakt",
        [
          "Fuer rechtliche, vertragliche oder kontobezogene Fragen nutzen Sie bitte die Kontaktseite von Replyo.",
        ],
      ],
    ],
  },
};

export default function TermsPage() {
  const { language } = useLanguage();
  const copy = termsCopy[language] || termsCopy.en;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #edf3ff 0%, #f7f4ec 45%, #fff6df 100%)",
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
              background: "#ddeafe",
              color: "#274f85",
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
