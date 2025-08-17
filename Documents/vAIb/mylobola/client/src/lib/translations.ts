export type Language = 'en' | 'zu' | 'xh' | 'nso' | 'tn' | 'st';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  culturalDisclaimer: {
    title: string;
    content: string;
  };
  form: {
    brideHeritage: string;
    brideEducationCareer: string;
    groomIncome: string;
    familyLocation: string;
    culturalGroup: string;
    educationLevel: string;
    employmentStatus: string;
    familyType: string;
    locationType: string;
    monthlyIncome: string;
    calculateButton: string;
    calculating: string;
    additionalBrideInfo: string;
    brideAge: string;
    socialStanding: string;
    numberOfChildren: string;
    virginityStatus: string;
  };
  results: {
    title: string;
    suggestedRange: string;
    cattleEquivalent: string;
    basedOnTraditions: string;
    basedOnMarketPrice: string;
    culturalInsights: string;
    shareResults: string;
    calculationBreakdown: string;
    baseAmount: string;
  };
  education: {
    noMatric: string;
    matric: string;
    diploma: string;
    degree: string;
    honours: string;
    masters: string;
    phd: string;
    preferNotSay: string;
  };
  employment: {
    student: string;
    employed: string;
    selfEmployed: string;
    unemployed: string;
    retired: string;
    preferNotSay: string;
  };
  family: {
    nuclear: string;
    extended: string;
  };
  location: {
    rural: string;
    township: string;
    suburb: string;
    city: string;
  };
  nonBlackGuidance: {
    title: string;
    content: string;
    tips: string[];
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: "My Lobola",
    appSubtitle: "Cultural guidance for respectful lobola traditions across South African communities",
    culturalDisclaimer: {
      title: "Cultural Respect Notice",
      content: "This tool provides educational guidance based on cultural traditions. Always consult with family elders and cultural advisors for important decisions. Every family and situation is unique."
    },
    form: {
      brideHeritage: "Bride's Cultural Heritage",
      brideEducationCareer: "Bride's Education & Career",
      groomIncome: "Groom's Financial Standing",
      familyLocation: "Bride's Family & Location",
      culturalGroup: "Cultural Group",
      educationLevel: "Education Level",
      employmentStatus: "Employment Status",
      familyType: "Family Type",
      locationType: "Location Type",
      monthlyIncome: "Monthly Income Range",
      calculateButton: "Calculate Lobola Price",
      calculating: "Calculating...",
      additionalBrideInfo: "Additional Bride Information",
      brideAge: "Bride's Age",
      socialStanding: "Bride's Family Social Standing",
      numberOfChildren: "Number of Children",
      virginityStatus: "Virginity Status (Optional)"
    },
    results: {
      title: "Cultural Guidance Results",
      suggestedRange: "Suggested Range",
      cattleEquivalent: "Traditional Cattle Equivalent",
      basedOnTraditions: "Based on cultural traditions and modern considerations",
      basedOnMarketPrice: "Market price",
      culturalInsights: "Cultural Insights",
      shareResults: "Share Results",
      calculationBreakdown: "Calculation Breakdown:",
      baseAmount: "Base Amount:"
    },
    education: {
      noMatric: "No Matric",
      matric: "Matric/Grade 12",
      diploma: "Diploma/Certificate",
      degree: "Bachelor's Degree",
      honours: "Honours Degree",
      masters: "Master's Degree",
      phd: "PhD/Doctorate",
      preferNotSay: "Prefer not to say"
    },
    employment: {
      student: "Student",
      employed: "Employed",
      selfEmployed: "Self-employed",
      unemployed: "Unemployed",
      retired: "Retired",
      preferNotSay: "Prefer not to say"
    },
    family: {
      nuclear: "Nuclear Family",
      extended: "Extended Family"
    },
    location: {
      rural: "Rural Area",
      township: "Township",
      suburb: "Suburb",
      city: "City Center"
    },
    nonBlackGuidance: {
      title: "Guidance for Non-Black Partners",
      content: "If you are not of African heritage and are entering a lobola negotiation, here are important considerations:",
      tips: [
        "Approach with deep respect and humility for African traditions",
        "Engage a cultural mediator or elder who can guide you through the process",
        "Learn about the specific cultural group's traditions and customs",
        "Understand that lobola is not a purchase but a bridge between families",
        "Be prepared for extended family involvement in the negotiation process",
        "Show genuine interest in learning and embracing the culture",
        "Consider learning basic phrases in the relevant African language",
        "Respect that some families may have higher expectations due to cultural differences"
      ]
    }
  },
  zu: {
    appTitle: "Ubuntu Lobola Umhlahlandlela",
    appSubtitle: "Isixhobo sokuphatha ngokuhlonipha amasiko aseNingizimu Afrika",
    culturalDisclaimer: {
      title: "Isaziso Sokuphatha Amasiko",
      content: "Leli thuluzi lakhiwe ukuze linikeze ukuqondisisa ngemfundo ngamasiko obuntu baseNingizimu Afrika."
    },
    form: {
      brideHeritage: "Amasiko Omakoti",
      brideEducationCareer: "Imfundo Nomsebenzi Womakoti",
      groomIncome: "Imali Engenayo Yomkhwenyana",
      familyLocation: "Umndeni Nendawo",
      culturalGroup: "Iqembu lamasiko",
      educationLevel: "Izinga lemfundo",
      employmentStatus: "Isimo somsebenzi",
      familyType: "Uhlobo lomndeni",
      locationType: "Uhlobo lwendawo",
      monthlyIncome: "Imali engenayo ngenyanga",
      calculateButton: "Bala Ukuqondisisa Kwamasiko",
      calculating: "Iyabala...",
      additionalBrideInfo: "Ulwazi olwengeziwe lomakoti",
      brideAge: "Iminyaka yomakoti",
      socialStanding: "Isimo somndeni womakoti",
      numberOfChildren: "Inani lezingane",
      virginityStatus: "Isimo sobuqhokqhokazi (okukhethekayo)"
    },
    results: {
      title: "Imiphumela Yokuqondisisa Kwamasiko",
      suggestedRange: "Ububanzi Obuphakanyisiwe",
      cattleEquivalent: "Izinkomo Zendabuko",
      basedOnTraditions: "Ngokusekwe kumasiko endabuko nezinto zanamuhla",
      basedOnMarketPrice: "Intengiso yamanje",
      culturalInsights: "Ukuqonda Kwamasiko",
      shareResults: "Yabelana Ngomiphumela",
      calculationBreakdown: "Ukuhlukaniswa Kokubala:",
      baseAmount: "Imali Eyisisekelo:"
    },
    education: {
      noMatric: "Akukho Matric",
      matric: "Imatrikhi",
      diploma: "Idiploma",
      degree: "Iziqu Zokuqala",
      honours: "Udumo",
      masters: "Iziqu Zobuchwepheshe",
      phd: "PhD/Udokotela",
      preferNotSay: "Ngingathanda ukungatsho"
    },
    employment: {
      student: "Umfundi",
      employed: "Uqashiwe",
      selfEmployed: "Uziqashile",
      unemployed: "Akaqashiwe",
      retired: "Usebenzile",
      preferNotSay: "Ngingathanda ukungatsho"
    },
    family: {
      nuclear: "Umndeni Omncane",
      extended: "Umndeni Omkhulu"
    },
    location: {
      rural: "Emakhaya",
      township: "Elokishini",
      suburb: "Emasabhabini",
      city: "Edolobheni"
    },
    nonBlackGuidance: {
      title: "Izeluleko Zabantu Abangeyona AmAfrika",
      content: "Uma ungeyena umAfrika futhi ungenela izingxoxo ze-lobola, lezi yizizinto ezisemqoka:",
      tips: [
        "Sondela ngokuhlonipha okukhulu namasiko ama-Afrika",
        "Sebenzisa umlamuli wamasiko noma induna",
        "Funda ngemithetho yeqembu lamasiko",
        "Qonda ukuthi lobola ayikho ukuthenga kodwa ibhuloho phakathi kwemindeni",
        "Zilungiselele ukuthi umndeni uzobe ubandakanyeka",
        "Bonakalisa ukuthanda ukufunda amasiko",
        "Cabanga ukufunda amazwi emvelo",
        "Hlonipha ukuthi eminye imindeni ingaba nezinhloso eziphezulu"
      ]
    }
  },
  xh: {
    appTitle: "Ubuntu Lobola Umhlahlandlela",
    appSubtitle: "Isixhobo sokuphatha ngokuhlonipha amasiko aseNingizimu Afrika",
    culturalDisclaimer: {
      title: "Isaziso Sokuphatha Amasiko",
      content: "Leli thuluzi lakhiwe ukuze linikeze ukuqondisisa ngemfundo ngamasiko obuntu baseNingizimu Afrika. Akufanele lithathwe njengesikhundla sezingxoxo zomndeni noma izeluleko zabadala. Umndeni ngamunye nesimo ngasinye siyahluka, futhi leli khalikhuleyitha lisebenza njengendawo yokuqala yengxoxo ehloniphekile."
    },
    form: {
      brideHeritage: "Amasiko Omakoti",
      brideEducationCareer: "Imfundo Nomsebenzi Womakoti",
      groomIncome: "Imali Engenayo Yomkhwenyana",
      familyLocation: "Umndeni Nendawo",
      culturalGroup: "Iqembu lamasiko",
      educationLevel: "Izinga lemfundo",
      employmentStatus: "Isimo somsebenzi",
      familyType: "Uhlobo lomndeni",
      locationType: "Uhlobo lwendawo",
      monthlyIncome: "Imali engenayo ngenyanga",
      calculateButton: "Bala Ukuqondisisa Kwamasiko",
      calculating: "Iyabala...",
      additionalBrideInfo: "Ulwazi olwengeziwe lomakoti",
      brideAge: "Iminyaka yomakoti",
      socialStanding: "Isimo somndeni womakoti",
      numberOfChildren: "Inani lezingane",
      virginityStatus: "Isimo sobuqhokqhokazi (okukhethekayo)"
    },
    results: {
      title: "Imiphumela Yokuqondisisa Kwamasiko",
      suggestedRange: "Ububanzi Obuphakanyisiwe",
      cattleEquivalent: "Izinkomo Zendabuko",
      basedOnTraditions: "Ngokusekwe kumasiko endabuko nezinto zanamuhla",
      basedOnMarketPrice: "Ngokusekwe kwintengiso yamanje ka-R{price} ngenkomo",
      culturalInsights: "Ukuqonda Kwamasiko",
      shareResults: "Yabelana Ngomiphumela",
      calculationBreakdown: "Ukuhlukaniswa Kokubala:",
      baseAmount: "Imali Eyisisekelo:"
    },
    education: {
      noMatric: "Akukho Matric",
      matric: "Imatrikhi",
      diploma: "Idiploma",
      degree: "Iziqu Zokuqala",
      honours: "Udumo",
      masters: "Iziqu Zobuchwepheshe",
      phd: "PhD/Udokotela",
      preferNotSay: "Ngingathanda ukungatsho"
    },
    employment: {
      student: "Umfundi",
      employed: "Uqashiwe",
      selfEmployed: "Uziqashile",
      unemployed: "Akaqashiwe",
      retired: "Usebenzile",
      preferNotSay: "Ngingathanda ukungatsho"
    },
    family: {
      nuclear: "Umndeni Omncane",
      extended: "Umndeni Omkhulu"
    },
    location: {
      rural: "Emakhaya",
      township: "Elokishini",
      suburb: "Esuburb",
      city: "Edolobheni"
    },
    nonBlackGuidance: {
      title: "Izeluleko Zabantu Abangeyona AmAfrika",
      content: "Uma ungeyena umAfrika futhi ungenela izingxoxo ze-lobola:",
      tips: ["Hlonipha amasiko", "Sebenzisa umlamuli", "Funda ngamasiko"]
    }
  },
  xh: {
    appTitle: "Ubuntu Lobola Isikhokelo",
    appSubtitle: "Isixhobo esinentlonipho somasiko aseMzantsi Afrika",
    culturalDisclaimer: {
      title: "Isaziso Sokuphatha Amasiko",
      content: "Esi sixhobo senzelwe ukunika ukuqonda ngemfundo ngamasiko eMzantsi Afrika. Akufanele sithathwe njengendawo yengxoxo yosapho okanye iingcebiso zabadala. Usapho ngalunye nemeko nganye yahlukile, kwaye le khalkulator isebenza njengendawo yokuqala yencoko ehloniphekile."
    },
    form: {
      brideHeritage: "Amasiko Omtshato",
      brideEducationCareer: "Imfundo Nomsebenzi Womtshato",
      groomIncome: "Imali Engenayo Yomkhongolose",
      familyLocation: "Usapho Nendawo",
      culturalGroup: "Iqela lamasiko",
      educationLevel: "Inqanaba lemfundo",
      employmentStatus: "Imeko yomsebenzi",
      familyType: "Uhlobo losapho",
      locationType: "Uhlobo lwendawo",
      monthlyIncome: "Imali engenayo ngenyanga",
      calculateButton: "Bala Ukuqonda Kwamasiko",
      calculating: "Iyabala..."
    },
    results: {
      title: "Iziphumo Zokuqonda Kwamasiko",
      suggestedRange: "Uluhlu Olucetyiswayo",
      cattleEquivalent: "Iinkomo Zesithethe",
      basedOnTraditions: "Ngokusekwe kwizithethe kunye nokucinga kwanamhlanje",
      basedOnMarketPrice: "Ngokusekwe kwixabiso lemarike langoku le-R{price} ngenkomo",
      culturalInsights: "Ukuqonda Kwamasiko",
      shareResults: "Yabelana Ngeziphumo"
    },
    education: {
      matric: "Imetrik",
      diploma: "Idiploma",
      degree: "Isidanga Sokuqala",
      honours: "Imbeko",
      masters: "Isidanga Sobugcisa",
      phd: "PhD/Ugqirha",
      preferNotSay: "Andithandi ukutsho"
    },
    employment: {
      student: "Umfundi",
      employed: "Uqeshiwe",
      selfEmployed: "Uziqeshile",
      unemployed: "Akaqeshwanga",
      retired: "Umhlala phantsi",
      preferNotSay: "Andithandi ukutsho"
    },
    family: {
      nuclear: "Usapho Oluncinane",
      extended: "Usapho Olubanzi"
    },
    location: {
      rural: "Emaphandleni",
      township: "Elokishini",
      suburb: "Esuburb",
      city: "Edolophini"
    }
  },
  nso: {
    appTitle: "Ubuntu Lobola Tataišo",
    appSubtitle: "Sedirišwa sa go hlompha setšo sa Afrika Borwa",
    culturalDisclaimer: {
      title: "Tsebišo ya go Swara Setšo",
      content: "Sedirišwa se se hlamilwe go fa kwešišo ya thuto ka ditšo tša Afrika Borwa. Ga se sa swanetše go tšewa bjalo ka lefelo la dipoledišano tša lapa goba dikgakololo tša bagolo. Lapa le lengwe le lengwe le maemo a mangwe le a mangwe a a fapanego, gomme khalikhukhuleitha ye e šoma bjalo ka lefelo la mathomo la poledišano ye e hlomphehago."
    },
    form: {
      brideHeritage: "Setšo sa Mosadi",
      brideEducationCareer: "Thuto le Mošomo wa Mosadi",
      groomIncome: "Letseno la Monna",
      familyLocation: "Lapa le Lefelo",
      culturalGroup: "Sehlopha sa setšo",
      educationLevel: "Maemo a thuto",
      employmentStatus: "Maemo a mošomo",
      familyType: "Mohuta wa lapa",
      locationType: "Mohuta wa lefelo",
      monthlyIncome: "Letseno la kgwedi",
      calculateButton: "Bala Kwešišo ya Setšo",
      calculating: "E a bala..."
    },
    results: {
      title: "Dipoelo tša Kwešišo ya Setšo",
      suggestedRange: "Tekanyo ye e Šišintšwego",
      cattleEquivalent: "Dikgomo tša Setšo",
      basedOnTraditions: "Go ya ka ditšo tša setšo le dikgopolo tša sebjalebjale",
      basedOnMarketPrice: "Go ya ka theko ya mmaraka ya bjale ya R{price} ka kgomo",
      culturalInsights: "Kwešišo ya Setšo",
      shareResults: "Abelana ka Dipoelo"
    },
    education: {
      matric: "Matrikhe",
      diploma: "Tiploma",
      degree: "Tikrii ya Mathomo",
      honours: "Tlotlo",
      masters: "Tikrii ya Borutegi",
      phd: "PhD/Ngaka",
      preferNotSay: "Ga ke nyake go bolela"
    },
    employment: {
      student: "Moithuti",
      employed: "O a šomišwa",
      selfEmployed: "O itšomišitše",
      unemployed: "Ga a šomišwe",
      retired: "O a beile",
      preferNotSay: "Ga ke nyake go bolela"
    },
    family: {
      nuclear: "Lapa le Lennye",
      extended: "Lapa le Legolo"
    },
    location: {
      rural: "Magaeng",
      township: "Motšeng",
      suburb: "Kgaolong",
      city: "Toropong"
    }
  },
  tn: {
    appTitle: "Ubuntu Lobola Tataiso",
    appSubtitle: "Sedirisiwa sa tlotlo ya setso sa Aforika Borwa",
    culturalDisclaimer: {
      title: "Tsebiso ya go Tshwara Setso",
      content: "Sedirisiwa se se dirilwe go neela kutlwisiso ya thuto ka ditso tsa Aforika Borwa. Ga se sa tshwanela go tsewa jaaka lefelo la dipuisano tsa lelapa kgotsa dikgakololo tsa bagolo. Lelapa lengwe le lengwe le maemo a mangwe le a mangwe a a farologaneng, mme khalikhukhuleitha e e dira jaaka lefelo la tshimologo ya puisano e e tlotlang."
    },
    form: {
      brideHeritage: "Setso sa Mosadi",
      brideEducationCareer: "Thuto le Tiro ya Mosadi",
      groomIncome: "Lotseno lwa Monna",
      familyLocation: "Lelapa le Lefelo",
      culturalGroup: "Setlhopha sa setso",
      educationLevel: "Legato la thuto",
      employmentStatus: "Maemo a tiro",
      familyType: "Mofuta wa lelapa",
      locationType: "Mofuta wa lefelo",
      monthlyIncome: "Lotseno lwa kgwedi",
      calculateButton: "Bala Kutlwisiso ya Setso",
      calculating: "E a bala..."
    },
    results: {
      title: "Dipoelo tsa Kutlwisiso ya Setso",
      suggestedRange: "Tekanyo e e Kgothaditsweng",
      cattleEquivalent: "Dikgomo tsa Setso",
      basedOnTraditions: "Go ya ka ditso tsa setso le dikgopolo tsa segompieno",
      basedOnMarketPrice: "Go ya ka tlhwatlhwa ya mebaraka ya gompieno ya R{price} ka kgomo",
      culturalInsights: "Kutlwisiso ya Setso",
      shareResults: "Arolelana ka Dipoelo"
    },
    education: {
      matric: "Matrikhe",
      diploma: "Diploma",
      degree: "Dikrii tsa Ntlha",
      honours: "Tlotlo",
      masters: "Dikrii tsa Borutabana",
      phd: "PhD/Ngaka",
      preferNotSay: "Ga ke batle go bua"
    },
    employment: {
      student: "Moithuti",
      employed: "O a bereka",
      selfEmployed: "O itirela",
      unemployed: "Ga a bereke",
      retired: "O a beile",
      preferNotSay: "Ga ke batle go bua"
    },
    family: {
      nuclear: "Lelapa le Lennye",
      extended: "Lelapa le Legolo"
    },
    location: {
      rural: "Magaeng",
      township: "Motse",
      suburb: "Kgaolong",
      city: "Toropong"
    }
  },
  st: {
    appTitle: "Ubuntu Lobola Tataiso",
    appSubtitle: "Sedirisiwa se hlohlang setso sa Afrika Borwa",
    culturalDisclaimer: {
      title: "Tsebiso ya ho Tshwara Setso",
      content: "Sedirisiwa sena se entswe ho fana ka kutlwisiso ya thuto ka ditso tsa Afrika Borwa. Ha se sa lokelang ho nkuwa e le sebaka sa dipuisano tsa lelapa kapa dikeletso tsa baholo. Lelapa le leng le le leng le maemo a mang le a mang a fapaneng, mme khalikhukhuleita ena e sebetsa e le sebaka sa qaleho sa puisano e hlohlang."
    },
    form: {
      brideHeritage: "Setso sa Mosadi",
      brideEducationCareer: "Thuto le Mosebetsi wa Mosadi",
      groomIncome: "Keno ya Monna",
      familyLocation: "Lelapa le Sebaka",
      culturalGroup: "Sehlopha sa setso",
      educationLevel: "Boemo ba thuto",
      employmentStatus: "Boemo ba mosebetsi",
      familyType: "Mofuta wa lelapa",
      locationType: "Mofuta wa sebaka",
      monthlyIncome: "Keno ya kgwedi",
      calculateButton: "Bala Kutlwisiso ya Setso",
      calculating: "E a bala..."
    },
    results: {
      title: "Diphetho tsa Kutlwisiso ya Setso",
      suggestedRange: "Tekanyo e Kgothatsitsweng",
      cattleEquivalent: "Dikgomo tsa Setso",
      basedOnTraditions: "Ho ya ka ditso tsa setso le mehopolo ya kajeno",
      basedOnMarketPrice: "Ho ya ka theko ya mmaraka ya hajeno ya R{price} ka kgomo",
      culturalInsights: "Kutlwisiso ya Setso",
      shareResults: "Arolelana ka Diphetho"
    },
    education: {
      matric: "Matrikhe",
      diploma: "Diploma",
      degree: "Tikrii ya Pele",
      honours: "Tlotlo",
      masters: "Tikrii ya Borutabana",
      phd: "PhD/Ngaka",
      preferNotSay: "Ha ke batle ho bua"
    },
    employment: {
      student: "Moithuti",
      employed: "O a bereka",
      selfEmployed: "O itirela",
      unemployed: "Ha a bereke",
      retired: "O a beile",
      preferNotSay: "Ha ke batle ho bua"
    },
    family: {
      nuclear: "Lelapa le Lenyane",
      extended: "Lelapa le Leholo"
    },
    location: {
      rural: "Mahaeng",
      township: "Toropong e Nyane",
      suburb: "Kgaolong",
      city: "Toropong e Kgolo"
    }
  }
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.en;
}