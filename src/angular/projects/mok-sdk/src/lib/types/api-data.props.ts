export interface APIResponseItem {
    ClientId: string;
    comment: string | null;
    createdAt: string;
    createdBy: string | null;
    in_app_id: string;
    isActive: boolean;
    json_data?: Record<string, any>;
    org_id: string;
    updatedAt: string;
    updatedBy: string | null;
  }