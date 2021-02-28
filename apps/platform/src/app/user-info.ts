export interface UserInfo {
  broacasting_type: 'partner' | 'affiliate' | '';
  description: string;
  display_name: string;
  id: string;
  login: string;
  type: string;
  offline_image_url: string;
  profile_image_url: string;
  view_count: number;
}
