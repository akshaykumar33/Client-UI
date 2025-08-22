export type Client = {
  icon: string;
  id: number;
  name: string;
  type: 'Individual' | 'Company';
  email: string;
  status: 'Active' | 'Inactive';
  updatedBy: string;
  updatedAt: string;
  createdAt: string;
};

export type TabOption = "All" | "Individual" | "Company"

export type SortField = "clientName" | "createdAt" | "updatedAt" | "clientId"
export type Direction = "asc" | "desc"

export interface SortCriteria {
  id: SortField
  direction: Direction
}