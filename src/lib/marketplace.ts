import { create } from 'zustand';
import { SyncRequest } from '@/components/marketplace/sections/licensing/types';

interface MarketplaceState {
  // Licensing
  syncRequests: SyncRequest[];
  selectedRequestId: number | null;
  filters: {
    type?: string;
    status?: string;
    urgent?: boolean;
    budget?: number;
  };
  search: string;
  
  // Actions
  setSyncRequests: (requests: SyncRequest[]) => void;
  selectRequest: (id: number | null) => void;
  setFilters: (filters: MarketplaceState['filters']) => void;
  setSearch: (query: string) => void;
  updateRequestStatus: (id: number, status: SyncRequest['status']) => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  syncRequests: [],
  selectedRequestId: null,
  filters: {},
  search: "",

  setSyncRequests: (requests) => set({ syncRequests: requests }),
  selectRequest: (id) => set({ selectedRequestId: id }),
  setFilters: (filters) => set({ filters }),
  setSearch: (search) => set({ search }),
  updateRequestStatus: (id, status) => set((state) => ({
    syncRequests: state.syncRequests.map(request =>
      request.id === id ? { ...request, status } : request
    )
  }))
}));
