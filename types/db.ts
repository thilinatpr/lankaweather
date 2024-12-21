// types/db.ts
export interface Alert {
    id: string;
    type: 'high' | 'medium' | 'low';
    message: string;
    icon: string;
    status: 'draft' | 'published' | 'archived';
    created_at: number;
  }
  
  export interface Weather {
    id: string;
    location: string;
    temperature: number;
    condition: string;
    timestamp: number;
  }