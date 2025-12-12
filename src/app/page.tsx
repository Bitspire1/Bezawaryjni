import client from "../../.tina/__generated__/client";
import PageClient from "./page-client";

const defaultData = {
  hero: {
    tagline: "Warsztat samoobsługowy i serwis mechaniczny",
    heading: "Zrób to sam lub zleć to nam",
    description: "Wynajmij stanowisko z podnośnikiem i profesjonalnymi narzędziami albo skorzystaj z naszego serwisu mechanicznego. Uczciwa wycena, szybkie terminy i wsparcie na miejscu."
  },
  services: {
    heading: "Nasze usługi",
    items: [
      { title: "Diagnostyka komputerowa", image: "/diagnostyka.avif", alt: "Diagnostyka komputerowa", description: "Szybko i precyzyjnie wykrywamy usterki w Twoim aucie!\nDzięki nowoczesnym narzędziom diagnostycznym odczytujemy błędy, sprawdzamy pracę silnika, układu ABS, ESP, systemów komfortu i wielu innych.\nUsługa pozwala uniknąć kosztownych napraw i przyspiesza serwisowanie pojazdu.\n\n✅ Odczyt i kasowanie błędów\n✅ Diagnoza silnika, zawieszenia, elektroniki\n✅ Profesjonalny raport usterek" },
      { title: "Naprawa układu hamulcowego", image: "/układ.avif", alt: "Naprawa układu hamulcowego", description: "Oferujemy kompleksową naprawę i serwis hamulców: wymianę klocków, tarcz, płynu hamulcowego, regenerację zacisków oraz diagnozę całego układu." },
      { title: "Mechanika pojazdowa", image: "/mechanika.avif", alt: "Mechanika pojazdowa", description: "Kompleksowe usługi mechaniczne dla Twojego auta. Wykonujemy naprawy bieżące i zaawansowane, usuwamy usterki silnika, zawieszenia, układu kierowniczego, wydechowego i chłodzenia." },
      { title: "Wymiana płynów i oleju", image: "/olej.avif", alt: "Wymiana płynów i oleju", description: "Oferujemy profesjonalną wymianę oleju silnikowego oraz wszystkich niezbędnych płynów eksploatacyjnych – chłodniczego, hamulcowego, wspomagania i płynu do spryskiwaczy. Pracujemy na wysokiej jakości produktach i zawsze zgodnie z zaleceniami producenta." },
      { title: "Serwis zawieszenia", image: "/serwis.avif", alt: "Serwis zawieszenia", description: "Oferujemy kompleksową diagnostykę oraz naprawy układów zawieszenia: amortyzatorów, sprężyn, wahaczy, tulei i łączników stabilizatora. Usuwamy luzy i nieprawidłowości, które wpływają na prowadzenie auta." }
    ]
  },
  workshop: {
    heading: "Warsztat samoobsługowy",
    description: "Skorzystaj ze stanowiska z podnośnikiem, podstawowymi narzędziami i wsparciem pracownika na miejscu. Idealne do wymian eksploatacyjnych i drobnych napraw.",
    features: [
      { text: "Podnośnik + narzędzia ręczne" },
      { text: "Instruktaż i nadzór bezpieczeństwa" },
      { text: "Wynajem na godziny" },
      { text: "Możliwość zakupu części na miejscu" }
    ],
    steps: [
      { text: "Rezerwujesz termin (telefon/mail)." },
      { text: "Na miejscu przechodzisz krótkie szkolenie BHP." },
      { text: "Pracujesz bezpiecznie na naszym stanowisku." },
      { text: "W razie potrzeby  pomagamy lub dostarczamy części." }
    ]
  },
  lifts: {
    badge: "Nowość",
    heading: "Dwa nowe podnośniki w warsztacie",
    description: "Rozszerzyliśmy stanowiska serwisowe o dwa nowoczesne podnośniki. Dzięki temu szybciej zrealizujemy przeglądy, wymiany i naprawy również dla większych aut i SUV-ów. Zapraszamy na szybkie terminy!"
  },
  about: {
    heading: "Nasza firma",
    description1: "Bezawaryjni to zespół mechaników z doświadczeniem w serwisie pojazdów osobowych i dostawczych. Łączymy klasyczny serwis mechaniczny z warsztatem samoobsługowym, abyś mógł wybrać najwygodniejszą formę naprawy i obsługi swojego auta.",
    description2: "Stawiamy na transparentność, terminowość i części o sprawdzonej jakości. Na większość usług udzielamy gwarancji, a wszystkie prace potwierdzamy wpisem do historii serwisowej.",
    stats: [
      { value: "2018", label: "rok założenia" },
      { value: "500+", label: "napraw rocznie" },
      { value: "4.9/5", label: "opinie klientów" }
    ],
    features: [
      { text: "Uczciwa, z góry akceptowana wycena." },
      { text: "Szybkie terminy i stały kontakt." },
      { text: "Części oryginalne i klasy premium." },
      { text: "Możliwość pracy własnej na stanowisku." }
    ]
  },
  contact: {
    heading: "Skontaktuj się z nami",
    description: "Wybierz wygodną formę kontaktu  odpowiemy tego samego dnia.",
    phone: "+48 784 669 601",
    email: "kontakt@bezawaryjni.pl"
  },
  faq: {
    heading: "Najczęściej zadawane pytania",
    items: [
      {
        question: "Czy mogę samodzielnie pracować w warsztacie?",
        answer: "Tak! Oferujemy stanowiska samoobsługowe z podnośnikiem i narzędziami. Po krótkim szkoleniu BHP możesz bezpiecznie pracować nad swoim autem."
      },
      {
        question: "Jakie części używacie w serwisie?",
        answer: "Używamy części oryginalnych i klasy premium od sprawdzonych producentów. Zawsze konsultujemy wybór części z klientem."
      },
      {
        question: "Czy udzielacie gwarancji?",
        answer: "Tak, na większość usług udzielamy gwarancji. Wszystkie prace są dokumentowane i wpisywane do historii serwisowej pojazdu."
      }
    ]
  },
  footer: {
    description: "Mechanika pojazdowa, diagnostyka komputerowa i serwis eksploatacyjny. Jakość, terminowość, przejrzysta wycena.",
    phone: "+48 784 669 601",
    email: "kontakt@bezawaryjni.pl",
    hoursWeekday: "Pon – Pt: 7:00 – 19:00",
    hoursWeekend: "Sob – Niedz: nieczynne"
  }
};

export default async function Home() {
  let tinaData = null;
  try {
    const res = await client.queries.page({ relativePath: "home.json" });
    tinaData = { data: res.data, variables: res.variables, query: res.query };
  } catch {
    tinaData = null;
  }

  return <PageClient tinaData={tinaData} defaultData={defaultData} />;
}
