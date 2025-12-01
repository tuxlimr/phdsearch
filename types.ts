export interface Program {
  id: number;
  title: string;
  university: string;
  country: string;
  degreeType: 'PhD' | 'MSc' | 'Master';
  deadline: string;
  scholarshipStatus: 'Scholarship Available' | 'Fully Funded' | null;
  imageUrl: string;
  // Detailed View Fields
  department?: string;
  description?: string;
  location?: string;
  duration?: string;
  mode?: string;
  startDate?: string;
  tuition?: string;
  eligibility?: string[];
  deadlines?: {
    early?: string;
    final?: string;
  };
}

export interface FilterState {
  deadlineStart: string;
  deadlineEnd: string;
  scholarshipAvailable: boolean;
  fullyFunded: boolean;
  phd: boolean;
  master: boolean;
  countrySearch: string;
}