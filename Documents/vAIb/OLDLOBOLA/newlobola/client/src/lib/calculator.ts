import type { CalculatorFormData, CalculationResult } from "shared/schema";

export function calculateLobola(data: CalculatorFormData): CalculationResult {
  let baseAmount = 30000;
  let educationBonus = 0;
  let careerBonus = 0;
  let locationFactor = 0;

  // Education adjustments
  switch (data.education) {
    case 'no-matric':
      educationBonus = 0;
      break;
    case 'matric':
      educationBonus = 5000;
      break;
    case 'diploma':
      educationBonus = 10000;
      break;
    case 'degree':
      educationBonus = 15000;
      break;
    case 'honours':
      educationBonus = 20000;
      break;
    case 'masters':
      educationBonus = 25000;
      break;
    case 'phd':
      educationBonus = 30000;
      break;
    case 'prefer-not-say':
      educationBonus = 10000; // Moderate estimate
      break;
  }

  // Employment adjustments
  switch (data.employment) {
    case 'employed':
      careerBonus = 10000;
      break;
    case 'self-employed':
      careerBonus = 15000;
      break;
    case 'student':
      careerBonus = 0;
      break;
    case 'unemployed':
      careerBonus = 0;
      break;
    case 'retired':
      careerBonus = 5000;
      break;
    case 'prefer-not-say':
      careerBonus = 5000;
      break;
  }

  // Location adjustments
  switch (data.location) {
    case 'rural':
      locationFactor = 0;
      break;
    case 'township':
      locationFactor = 5000;
      break;
    case 'suburb':
      locationFactor = 10000;
      break;
    case 'city':
      locationFactor = 15000;
      break;
    default:
      locationFactor = 5000; // Default if not specified
  }

  // Income considerations (optional adjustment)
  let incomeAdjustment = 0;
  if (data.income) {
    switch (data.income) {
      case 'under-5000':
        incomeAdjustment = -5000;
        break;
      case '5000-10000':
        incomeAdjustment = 0;
        break;
      case '10000-20000':
        incomeAdjustment = 5000;
        break;
      case '20000-35000':
        incomeAdjustment = 10000;
        break;
      case '35000-50000':
        incomeAdjustment = 15000;
        break;
      case '50000-plus':
        incomeAdjustment = 20000;
        break;
    }
  }

  // Age adjustments
  let ageAdjustment = 0;
  if (data.age) {
    switch (data.age) {
      case '18-22':
        ageAdjustment = 5000;
        break;
      case '23-27':
        ageAdjustment = 3000;
        break;
      case '28-32':
        ageAdjustment = 0;
        break;
      case '33-37':
        ageAdjustment = -3000;
        break;
      case '38-plus':
        ageAdjustment = -5000;
        break;
    }
  }

  // Social standing adjustments
  let socialStandingAdjustment = 0;
  if (data.socialStanding) {
    switch (data.socialStanding) {
      case 'working-class':
        socialStandingAdjustment = 0;
        break;
      case 'middle-class':
        socialStandingAdjustment = 8000;
        break;
      case 'upper-middle-class':
        socialStandingAdjustment = 15000;
        break;
      case 'prominent-family':
        socialStandingAdjustment = 25000;
        break;
      case 'traditional-leaders':
        socialStandingAdjustment = 35000;
        break;
    }
  }

  // Number of children adjustments
  let childrenAdjustment = 0;
  if (data.numberOfChildren) {
    switch (data.numberOfChildren) {
      case 'none':
        childrenAdjustment = 5000;
        break;
      case 'one':
        childrenAdjustment = -2000;
        break;
      case 'two':
        childrenAdjustment = -5000;
        break;
      case 'three':
        childrenAdjustment = -8000;
        break;
      case 'four-plus':
        childrenAdjustment = -12000;
        break;
    }
  }

  // Virginity status adjustments (culturally sensitive)
  let virginityAdjustment = 0;
  if (data.virginityStatus) {
    switch (data.virginityStatus) {
      case 'yes':
        virginityAdjustment = 8000;
        break;
      case 'no':
        virginityAdjustment = 0;
        break;
    }
  }

  const totalLower = Math.max(15000, baseAmount + educationBonus + careerBonus + locationFactor + incomeAdjustment + ageAdjustment + socialStandingAdjustment + childrenAdjustment + virginityAdjustment);
  const totalUpper = totalLower + 20000;

  // Current market price for a cow in South Africa (average 2024)
  const pricePerCow = 15000;
  const lowerCows = Math.round(totalLower / pricePerCow * 10) / 10;
  const upperCows = Math.round(totalUpper / pricePerCow * 10) / 10;

  // Cultural insights based on selected group
  const insights = getCulturalInsights(data.culturalGroup);

  return {
    amount: `R${totalLower.toLocaleString()} - R${totalUpper.toLocaleString()}`,
    breakdown: {
      base: baseAmount,
      education: educationBonus,
      career: careerBonus,
      location: locationFactor,
      total: {
        lower: totalLower,
        upper: totalUpper,
      },
    },
    cowEquivalent: {
      lowerCows,
      upperCows,
      pricePerCow,
      displayText: `${lowerCows} - ${upperCows} cattle`,
    },
    insights,
  };
}

function getCulturalInsights(culturalGroup: string) {
  const insights = {
    zulu: {
      title: "Zulu Traditions",
      description: "In Zulu culture, lobola represents respect and appreciation for the bride's family. The amount traditionally reflects the groom's ability to provide and his commitment to the union.",
      culturalNotes: [
        "Lobola negotiations often involve cattle, with each cow representing value and respect",
        "The process strengthens relationships between families",
        "Traditional ceremonies accompany lobola discussions",
        "Umabo ceremony follows the lobola negotiations"
      ],
      negotiationTips: [
        "Approach discussions with respect and humility",
        "Include family elders in negotiations",
        "Consider both families' circumstances",
        "Focus on building relationships, not just amounts"
      ]
    },
    xhosa: {
      title: "Xhosa Traditions",
      description: "Xhosa lobola practices emphasize the importance of family unity and respect. The negotiations are seen as a way to bring two families together in harmony.",
      culturalNotes: [
        "Lobola is viewed as compensation for raising the bride",
        "Traditional ceremonies mark different stages of the process",
        "Community elders play important advisory roles",
        "Ukuthwala and other customs may be involved"
      ],
      negotiationTips: [
        "Respect traditional protocols and customs",
        "Engage with community elders for guidance",
        "Consider the bride's education and accomplishments",
        "Maintain open and honest communication"
      ]
    },
    pedi: {
      title: "Pedi (Northern Sotho) Traditions",
      description: "In Pedi culture, magadi (bride price) is an important tradition that symbolizes the union of two families and respect for the bride's lineage.",
      culturalNotes: [
        "Magadi traditionally involves cattle and other valuable items",
        "The amount reflects the bride's family's status and education",
        "Extended family participation is crucial in negotiations",
        "Traditional ceremonies celebrate the agreement"
      ],
      negotiationTips: [
        "Respect the role of family elders and traditional leaders",
        "Consider the bride's achievements and potential",
        "Engage in respectful dialogue with both families",
        "Honor traditional customs while adapting to modern circumstances"
      ]
    },
    tswana: {
      title: "Tswana Traditions",
      description: "Tswana bogadi customs emphasize mutual respect between families and the symbolic value of bringing communities together through marriage.",
      culturalNotes: [
        "Bogadi traditionally consists of cattle as the primary currency",
        "The practice strengthens kinship ties between families",
        "Community participation in negotiations is valued",
        "Educational achievements are increasingly recognized"
      ],
      negotiationTips: [
        "Involve respected community members in discussions",
        "Show appreciation for traditional customs",
        "Consider modern economic realities",
        "Focus on long-term family relationships"
      ]
    },
    sotho: {
      title: "Sotho Traditions",
      description: "Sotho bohali traditions emphasize the importance of family honor and the ceremonial aspect of bringing two families together in marriage.",
      culturalNotes: [
        "Bohali negotiations involve extended family members",
        "Traditional ceremonies mark important milestones",
        "The practice reflects family values and respect",
        "Modern adaptations accommodate contemporary lifestyles"
      ],
      negotiationTips: [
        "Respect traditional family hierarchies",
        "Include cultural advisors in negotiations",
        "Balance tradition with modern considerations",
        "Emphasize mutual respect and understanding"
      ]
    },
    default: {
      title: "General South African Traditions",
      description: "Across South African cultures, lobola serves as a bridge between families, showing respect for traditions while adapting to modern circumstances.",
      culturalNotes: [
        "Each cultural group has unique traditions and customs",
        "Modern considerations often blend with traditional values",
        "Education and career achievements are increasingly valued",
        "Community participation varies by cultural group"
      ],
      negotiationTips: [
        "Research your specific cultural traditions",
        "Consult with cultural elders and advisors",
        "Balance traditional values with modern realities",
        "Focus on mutual respect and understanding"
      ]
    }
  };

  return insights[culturalGroup as keyof typeof insights] || insights.default;
}
