import { of } from 'rxjs';
import { StreamInfo } from '../stream-info';
import { compareStr } from './compareStr';

export function filterStreamBySearchTerm(
  stream: StreamInfo[],
  searchTerm = ''
) {
  return of(
    stream.filter((stream) => {
      const doesContainTitle = compareStr(stream.title, searchTerm);
      const doesContainUser = compareStr(stream.user_name, searchTerm);
      const doesContainTag = stream.tag_ids.includes(searchTerm.toLowerCase());

      return searchTerm
        ? doesContainTitle || doesContainTag || doesContainUser
        : true;
    })
  );
}
