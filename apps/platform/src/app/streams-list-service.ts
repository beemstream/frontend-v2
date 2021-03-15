import { Observable } from 'rxjs';
import { StreamInfo } from './stream-info';

export interface StreamListService {
  getStreams: (...args: any[]) => Observable<StreamInfo[]>;
  searchStreams: (
    searchTerm: string,
    ...args: any[]
  ) => Observable<StreamInfo[]>;
  refreshStreams: (...args: any[]) => Observable<StreamInfo[]>;
  getAvailableLanguages: (...args: any[]) => Observable<string[]>;
}
