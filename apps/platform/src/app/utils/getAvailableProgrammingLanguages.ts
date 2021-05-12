import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, scan, switchMap } from 'rxjs/operators';
import { StreamInfo } from '../stream-info';
import { compareStr } from './compareStr';

const JAVASCRIPT = [
  'javascript',
  'typescript',
  'node',
  'nodejs',
  'vue',
  'angular',
  'react',
  'elm',
  'js',
  'ts',
  'nextjs',
  'next',
  'web dev',
  'deno',
];

const TYPESCRIPT = ['typescript', '-w ts', 'angular'];

const RUST = ['rustlang', 'rust', 'actix', 'tokio'];

const CSHARP = [
  'csharp',
  'c#',
  'dotnet',
  '.net',
  'unreal engine',
  'unrealengine',
  'unity',
];

const GO_LANG = ['golang', 'go lang', 'kubernetes'];

const CPP = ['c++', 'cpp'];

const PYTHON = ['python', 'django', 'flask'];

const JAVA = ['-w java', 'hibernate'];

export enum Language {
  Rust = 'rust',
  TypeScript = 'typescript',
  Python = 'python',
  GoLang = 'golang',
  Csharp = 'csharp',
  Javascript = 'javascript',
  Java = 'java',
  CPP = 'cpp',
}

const KEYWORD_MAP = {
  [Language.Javascript]: JAVASCRIPT,
  [Language.TypeScript]: TYPESCRIPT,
  [Language.Rust]: RUST,
  [Language.Csharp]: CSHARP,
  [Language.GoLang]: GO_LANG,
  [Language.CPP]: CPP,
  [Language.Python]: PYTHON,
  [Language.Java]: JAVA,
};

export function getAvailableProgrammingLanguages(
  stream: Observable<StreamInfo[]>
): Observable<Language[]> {
  return of(Object.values(Language)).pipe(
    switchMap((k) => k),
    map((value) => {
      return filterByProgrammingLanguage(stream, value).pipe(
        scan((languages: Language | null, streams) => {
          if (streams.length > 0 && !languages?.includes(value)) {
            return value;
          }
          return languages;
        }, null)
      );
    }),
    mergeMap((s) => s),
    scan((acc: Language[], val) => {
      if (val) acc.push(val);
      return acc;
    }, []),
    map((s) => [...new Set(s)])
  );
}

export function filterByProgrammingLanguage(
  stream: Observable<StreamInfo[]>,
  language: Language
) {
  return stream.pipe(
    mergeMap((s) => s),
    filter((s) => {
      return KEYWORD_MAP[language].some((k) => {
        if (k.includes('-w')) {
          const w = k.split('-w')[1];
          return k.includes(` ${w} `);
        }
        if (k.includes('-')) {
          return !compareStr(s.title, k);
        }
        return compareStr(s.title, k);
      });
    }),
    scan((acc: StreamInfo[], value) => {
      const isAdded = acc.some((k) => k.id === value.id);
      if (!isAdded) {
        acc.push(value);
      }
      return acc;
    }, [])
  );
}
