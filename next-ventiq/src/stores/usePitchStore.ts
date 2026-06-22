import { create } from 'zustand';

interface IdeaData {
  title: string;
  oneLinePitch: string;
  description: string;
  domain: string;
  targetMarket: string;
  differentiation: string;
  deckUrl?: string;
  websiteUrl?: string;
  businessModel?: string;
  competitors?: string;
}

interface TeamData {
  coFoundersCount: number | '';
  hasTechnicalFounder: 'yes' | 'no' | 'partially' | null;
  priorExperience: string;
  totalTeamSize: number | '';
}

interface TractionData {
  tractionStatus: 'Idea-only' | 'Building' | 'Launched' | 'Generating Revenue' | null;
  userCount: number | '';
  mrr: number | '';
  retentionRate: string;
  growthTrend: string;
}

interface FundingData {
  fundingAsk: number | '';
  fundingAskCurrency: string;
  useOfFunds: string;
  fundingStage: string;
}

interface PitchStoreState {
  currentStep: number;
  ideaData: IdeaData;
  teamData: TeamData;
  tractionData: TractionData;
  fundingData: FundingData;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setIdeaData: (data: Partial<IdeaData>) => void;
  setTeamData: (data: Partial<TeamData>) => void;
  setTractionData: (data: Partial<TractionData>) => void;
  setFundingData: (data: Partial<FundingData>) => void;

  reset: () => void;
}

const initialIdeaData: IdeaData = {
  title: '',
  oneLinePitch: '',
  description: '',
  domain: '',
  targetMarket: '',
  differentiation: '',
  deckUrl: '',
  websiteUrl: '',
  businessModel: '',
  competitors: '',
};

const initialTeamData: TeamData = {
  coFoundersCount: '',
  hasTechnicalFounder: null,
  priorExperience: '',
  totalTeamSize: '',
};

const initialTractionData: TractionData = {
  tractionStatus: null,
  userCount: '',
  mrr: '',
  retentionRate: '',
  growthTrend: '',
};

const initialFundingData: FundingData = {
  fundingAsk: '',
  fundingAskCurrency: 'USD',
  useOfFunds: '',
  fundingStage: '',
};

export const usePitchStore = create<PitchStoreState>((set) => ({
  currentStep: 1,
  ideaData: initialIdeaData,
  teamData: initialTeamData,
  tractionData: initialTractionData,
  fundingData: initialFundingData,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  setIdeaData: (data) => set((state) => ({ ideaData: { ...state.ideaData, ...data } })),
  setTeamData: (data) => set((state) => ({ teamData: { ...state.teamData, ...data } })),
  setTractionData: (data) => set((state) => ({ tractionData: { ...state.tractionData, ...data } })),
  setFundingData: (data) => set((state) => ({ fundingData: { ...state.fundingData, ...data } })),

  reset: () => set({
    currentStep: 1,
    ideaData: initialIdeaData,
    teamData: initialTeamData,
    tractionData: initialTractionData,
    fundingData: initialFundingData,
  }),
}));
