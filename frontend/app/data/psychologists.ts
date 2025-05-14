// app/data/psychologists.ts

export interface Psychologist {
    id: number;
    name: string;
    specialization: string;
    address: string;
    rate: number;
    rating: number;
    description?: string;
    availability: Record<string, string[]>;
}

export const mockPsychologists: Psychologist[] = [
  {
    id: 1,
    name: 'dr Anna Kowalska',
    specialization: 'Psychologia kliniczna',
    address: 'ul. Słoneczna 12, Warszawa',
    rate: 150,
    rating: 4.7,
    description: 'Doświadczona w leczeniu depresji i zaburzeń lękowych.',
    availability: {
      '2025-05-10': ['09:00', '10:00', '11:00'],
      '2025-05-12': ['13:00', '14:00', '15:00'],
    },
  },
  {
    id: 2,
    name: 'dr Piotr Nowak',
    specialization: 'Psychologia dziecięca',
    address: 'ul. Lipowa 8, Kraków',
    rate: 130,
    rating: 4.9,
    description: 'Specjalizuje się w terapii dzieci i młodzieży.',
    availability: {
      '2025-05-11': ['10:00', '11:00', '12:00', '14:00'],
      '2025-05-13': ['09:00', '10:00'],
    },
  },
  {
    id: 3,
    name: 'dr Katarzyna Wiśniewska',
    specialization: 'Psychologia behawioralna',
    address: 'ul. Długa 22, Wrocław',
    rate: 140,
    rating: 4.8,
    description: 'Ekspertka w terapii CBT.',
    availability: {
      '2025-05-10': ['09:15', '10:15', '11:15'],
      '2025-05-14': ['13:00', '14:00', '15:00'],
    },
  },
  {
    id: 4,
    name: 'dr Tomasz Zieliński',
    specialization: 'Neuropsychologia',
    address: 'ul. Polna 5, Poznań',
    rate: 160,
    rating: 4.6,
    description: 'Zajmuje się relacjami mózg-zachowanie.',
    availability: {
      '2025-05-12': ['09:00', '10:00', '11:00'],
      '2025-05-15': ['14:00', '15:00', '16:00'],
    },
  },
  {
    id: 5,
    name: 'dr Maria Lewandowska',
    specialization: 'Psychologia sądowa',
    address: 'ul. Ogrodowa 18, Gdańsk',
    rate: 170,
    rating: 4.9,
    description: 'Pracuje z przypadkami prawnymi i kryminalnymi.',
    availability: {
      '2025-05-11': ['10:30', '11:30', '12:30'],
      '2025-05-13': ['13:30', '14:30', '15:30'],
    },
  },
  {
    id: 6,
    name: 'dr Jakub Kamiński',
    specialization: 'Psychologia zdrowia',
    address: 'ul. Wiosenna 3, Lublin',
    rate: 135,
    rating: 4.5,
    description: 'Łączy psychologię z opieką zdrowotną.',
    availability: {
      '2025-05-10': ['09:00', '10:00'],
      '2025-05-14': ['13:00', '14:00'],
    },
  },
  {
    id: 7,
    name: 'dr Paweł Maj',
    specialization: 'Psychoterapia',
    address: 'ul. Leśna 10, Szczecin',
    rate: 145,
    rating: 4.4,
    description: 'Prowadzi terapię indywidualną i grupową.',
    availability: {
      '2025-05-12': ['09:15', '10:15', '11:15'],
      '2025-05-15': ['14:15', '15:15', '16:15'],
    },
  },
  {
    id: 8,
    name: 'dr Ewa Grabowska',
    specialization: 'Psychologia sportu',
    address: 'ul. Sportowa 2, Katowice',
    rate: 155,
    rating: 4.8,
    description: 'Wspiera sportowców w osiąganiu celów.',
    availability: {
      '2025-05-11': ['09:00', '10:00', '11:00'],
      '2025-05-13': ['13:00', '14:00', '15:00'],
    },
  },
  {
    id: 9,
    name: 'dr Michał Szymański',
    specialization: 'Psychologia pracy',
    address: 'ul. Przemysłowa 7, Łódź',
    rate: 140,
    rating: 4.6,
    description: 'Pomaga w rozwoju kariery i radzeniu sobie ze stresem.',
    availability: {
      '2025-05-10': ['09:30', '10:30', '11:30'],
      '2025-05-14': ['13:30', '14:30', '15:30'],
    },
  },
  {
    id: 10,
    name: 'dr Agnieszka Kaczmarek',
    specialization: 'Psychologia rozwojowa',
    address: 'ul. Młodzieżowa 15, Białystok',
    rate: 130,
    rating: 4.7,
    description: 'Specjalizuje się w rozwoju dzieci i młodzieży.',
    availability: {
      '2025-05-12': ['09:00', '10:00'],
      '2025-05-15': ['14:00', '15:00'],
    },
  },
  {
    id: 11,
    name: 'dr Krzysztof Baran',
    specialization: 'Psychologia uzależnień',
    address: 'ul. Zielona 9, Rzeszów',
    rate: 160,
    rating: 4.5,
    description: 'Pomaga osobom zmagającym się z uzależnieniami.',
    availability: {
      '2025-05-11': ['09:15', '10:15', '11:15'],
      '2025-05-13': ['13:15', '14:15', '15:15'],
    },
  },
  {
    id: 12,
    name: 'dr Monika Dąbrowska',
    specialization: 'Psychologia edukacyjna',
    address: 'ul. Szkolna 4, Toruń',
    rate: 135,
    rating: 4.9,
    description: 'Wspiera dzieci i rodziców w procesie edukacji.',
    availability: {
      '2025-05-10': ['09:00', '10:00', '11:00'],
      '2025-05-14': ['13:00', '14:00', '15:00'],
    },
  },
  {
    id: 13,
    name: 'dr Artur Wójcik',
    specialization: 'Psychologia społeczna',
    address: 'ul. Społeczna 11, Olsztyn',
    rate: 150,
    rating: 4.3,
    description: 'Bada relacje międzyludzkie i komunikację.',
    availability: {
      '2025-05-12': ['09:30', '10:30', '11:30'],
      '2025-05-15': ['14:30', '15:30', '16:30'],
    },
  },
  {
    id: 14,
    name: 'dr Joanna Pawlak',
    specialization: 'Psychologia kliniczna',
    address: 'ul. Kliniczna 6, Opole',
    rate: 155,
    rating: 4.8,
    description: 'Doświadczona w pracy z dorosłymi.',
    availability: {
      '2025-05-11': ['09:00', '10:00', '11:00'],
      '2025-05-13': ['13:00', '14:00', '15:00'],
    },
  },
  {
    id: 15,
    name: 'dr Bartosz Lis',
    specialization: 'Psychologia zdrowia',
    address: 'ul. Zdrowa 13, Kielce',
    rate: 145,
    rating: 4.7,
    description: 'Łączy psychologię z profilaktyką zdrowotną.',
    availability: {
      '2025-05-10': ['09:15', '10:15', '11:15'],
      '2025-05-14': ['13:15', '14:15', '15:15'],
    },
  },
  {
    id: 16,
    name: 'dr Sylwia Nowicka',
    specialization: 'Psychologia sądowa',
    address: 'ul. Sądowa 21, Zielona Góra',
    rate: 170,
    rating: 4.6,
    description: 'Pracuje z osobami w trudnych sytuacjach prawnych.',
    availability: {
      '2025-05-11': ['09:00', '10:00', '11:00'],
      '2025-05-13': ['13:00', '14:00', '15:00'],
    },
  },
];
