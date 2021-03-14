import { Observable } from 'rxjs';
import { StreamInfo } from './stream-info';

export interface StreamListService {
  getStreams: () => Observable<StreamInfo[]>;
  searchStreams: (searchTerm: string) => Observable<StreamInfo[]>;
  refreshStreams: () => Observable<StreamInfo[]>;
  getAvailableLanguages: () => Observable<string[]>;
}
