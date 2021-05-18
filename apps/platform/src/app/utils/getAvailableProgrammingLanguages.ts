import { Observable, of, zip } from 'rxjs';
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
  '-w js',
  '-w ts',
  'nextjs',
  'next',
  'web dev',
  'deno',
];

const TYPESCRIPT = ['typescript', '-w ts', 'angular', 'rxjs'];

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

const GO_LANG = ['golang', 'go lang', 'kubernetes', '-w go'];

const CPP = ['c++', 'cpp'];

const PYTHON = ['python', 'django', 'flask'];

const JAVA = ['-w java', 'hibernate', 'spring boot'];

const PHP = ['-w php'];

const KOTLIN = ['-w kotlin'];

export enum ProgrammingLanguage {
  Rust = 'rust',
  TypeScript = 'typescript',
  Python = 'python',
  GoLang = 'golang',
  Csharp = 'csharp',
  Javascript = 'javascript',
  Java = 'java',
  CPP = 'cpp',
  PHP = 'php',
  Kotlin = 'kotlin',
}

const KEYWORD_MAP = {
  [ProgrammingLanguage.Javascript]: JAVASCRIPT,
  [ProgrammingLanguage.TypeScript]: TYPESCRIPT,
  [ProgrammingLanguage.Rust]: RUST,
  [ProgrammingLanguage.Csharp]: CSHARP,
  [ProgrammingLanguage.GoLang]: GO_LANG,
  [ProgrammingLanguage.CPP]: CPP,
  [ProgrammingLanguage.Python]: PYTHON,
  [ProgrammingLanguage.Java]: JAVA,
  [ProgrammingLanguage.PHP]: PHP,
  [ProgrammingLanguage.Kotlin]: KOTLIN,
};

export function getAvailableProgrammingLanguages(
  stream: Observable<StreamInfo[]>
): Observable<ProgrammingLanguage[]> {
  return stream.pipe(
    switchMap(() => {
      return of(Object.values(ProgrammingLanguage)).pipe(
        switchMap((ls) => ls),
        map((l) => zip(filterByProgrammingLanguage(stream, l), of(l))),
        mergeMap((l) => l),
        filter(([s]) => s.length > 0),
        map(([, l]) => l),
        scan((acc: ProgrammingLanguage[], curr) => {
          acc.push(curr);
          return acc;
        }, [])
      );
    })
  );
}

export function filterByProgrammingLanguage(
  stream: Observable<StreamInfo[]>,
  language: ProgrammingLanguage
) {
  return stream.pipe(
    mergeMap((s) => s),
    filter((s) => {
      return KEYWORD_MAP[language].some((k) => {
        if (k.includes('-w')) {
          const keyword = k.split('-w')[1].trim();
          const lower = s.title.toLowerCase();

          return lower.match(new RegExp(String.raw`\b${keyword}\b`, 'g'));
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
