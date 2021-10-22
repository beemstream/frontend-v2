import { LanguageCode } from './shared/filter-stream-list/filters/language-code';

export interface StreamInfo {
  game_id?: string;
  game_name?: string;
  id: string;
  language: LanguageCode;
  started_at: string;
  tag_ids: string[];
  thumbnail_url: string;
  title: string;
  type?: string;
  user_id: string;
  user_name: string;
  user_login: string;
  viewer_count: number;
}
