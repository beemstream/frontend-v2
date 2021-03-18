import { StreamInfo } from './stream-info';
import { UserInfo } from './user-info';

export interface StreamDetail {
  stream_info?: StreamInfo;
  user_info: UserInfo;
}
