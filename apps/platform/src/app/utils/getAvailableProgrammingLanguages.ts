import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
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

const GD_SCRIPT = ['godot', 'gdscript'];

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
  GDScript = 'gdscript',
  Uncategorized = 'uncategorized',
}

export const KEYWORD_MAP = {
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
  [ProgrammingLanguage.GDScript]: GD_SCRIPT,
};

export function getAvailableProgrammingLanguages(
  stream: Observable<StreamInfo[]>
): Observable<ProgrammingLanguage[]> {
  return stream.pipe(
    switchMap(() => {
      return of(Object.values(ProgrammingLanguage)).pipe(
        mergeMap((programmingLangs) => {
          return combineLatest(
            programmingLangs.reduce((acc, l) => {
              return {
                ...acc,
                [l]: filterByProgrammingLanguage(stream, l),
              };
            }, {})
          );
        }),
        map((s: { [index in ProgrammingLanguage]: StreamInfo[] }) => {
          return (Object.keys(s) as ProgrammingLanguage[]).reduce((acc, k) => {
            if (s[k].length > 0) {
              return [...acc, k];
            }
            return acc;
          }, [] as ProgrammingLanguage[]);
        })
      );
    })
  );
}

export const searchKeywords = (k: string, s: StreamInfo) => {
  if (k.includes('-w')) {
    const keyword = k.split('-w')[1].trim();
    const lower = s.title.toLowerCase();

    return !!lower.match(new RegExp(String.raw`\b${keyword}\b`, 'g'));
  }
  if (k.includes('-')) {
    return !compareStr(s.title, k);
  }
  return compareStr(s.title, k);
};

export type KeywordMapKey = keyof typeof KEYWORD_MAP;

export function filterByProgrammingLanguage(
  stream: Observable<StreamInfo[]>,
  language: ProgrammingLanguage
) {
  return stream.pipe(
    map((streams) => {
      return streams.filter((s) => {
        if (language === ProgrammingLanguage.Uncategorized) {
          return Object.keys(KEYWORD_MAP)
            .filter((k) => k !== ProgrammingLanguage.Uncategorized)
            .every(
              (k) =>
                KEYWORD_MAP[k as KeywordMapKey].some((keyword: string) =>
                  searchKeywords(keyword, s)
                ) === false
            );
        }
        return KEYWORD_MAP[language].some((k) => searchKeywords(k, s));
      });
    })
  );
}

const flatten = <T>(elems: T[][]): T[] =>
  Array.isArray(elems)
    ? [].concat(
        ...(elems.map((e) => flatten(e as unknown as T[][])) as never[])
      )
    : elems;

export function filterByProgrammingLanguages(
  stream: Observable<StreamInfo[]>,
  language: ProgrammingLanguage[]
) {
  if (language.length === 0) return of([]);

  return combineLatest(
    language.map((l) => filterByProgrammingLanguage(stream, l))
  ).pipe(
    map((s) => {
      return flatten(s).reduce((acc, stream) => {
        if (!acc.some((storedStream) => storedStream.id === stream.id)) {
          acc.push(stream);
        }
        return acc;
      }, [] as StreamInfo[]);
    })
  );
}
