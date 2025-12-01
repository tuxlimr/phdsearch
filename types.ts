export interface Program {
  id: number;
  title: string;
  university: string;
  country: string;
  degreeType: 'PhD' | 'MSc' | 'Master';
  deadline: string;
  scholarshipStatus: 'Scholarship Available' | 'Fully Funded' | null;
  imageUrl: string;
}

export interface FilterState {
  deadline: string;
  scholarshipAvailable: boolean;
  fullyFunded: boolean;
  phd: boolean;
  master: boolean;
  countrySearch: string;
}