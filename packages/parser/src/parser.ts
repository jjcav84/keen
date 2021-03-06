import {
  transformIntervalsFromArray,
  transformAtomicResult,
  transformFromNumber,
  transformFunnel,
  transformExtraction,
} from './utils/transform.utils';

import {
  ParserInput,
  ParserOutput,
  IntervalResult,
  AtomicResult,
} from './types';

import { KEEN_KEY, KEEN_VALUE } from './constants';

export const parseQuery = ({ result, steps }: ParserInput): ParserOutput => {
  const keys: Set<string> = new Set();
  const results: Record<string, any>[] = [];

  if (steps && Array.isArray(result)) {
    const funnelResults = result as number[];
    return transformFunnel({ result: funnelResults, steps });
  }

  if (typeof result === 'number') {
    return transformFromNumber(result);
  }

  Array.isArray(result) &&
    result.forEach((partialResult: number | IntervalResult | AtomicResult) => {
      if (
        typeof partialResult !== 'number' &&
        'value' in partialResult &&
        'timeframe' in partialResult
      ) {
        const { value, timeframe } = partialResult as IntervalResult;

        if (Array.isArray(value)) {
          const { data, keys: dataSetKeys } = transformIntervalsFromArray(
            value
          );
          results.push({ [KEEN_KEY]: timeframe.start, ...data });
          dataSetKeys.forEach(key => keys.add(key));
        }

        if (typeof value === 'number') {
          keys.add(KEEN_VALUE);
          results.push({
            [KEEN_KEY]: timeframe.start,
            [KEEN_VALUE]: value,
          });
        }
      }

      if (typeof partialResult !== 'number' && 'result' in partialResult) {
        const { result, ...properties } = transformAtomicResult(partialResult);
        keys.add(KEEN_VALUE);

        Object.values(properties).forEach(property => {
          results.push({ [KEEN_KEY]: property, [KEEN_VALUE]: result });
        });
      }

      if (
        typeof partialResult !== 'number' &&
        !('value' in partialResult) &&
        !('timeframe' in partialResult) &&
        !('result' in partialResult)
      ) {
        results.push(transformExtraction(partialResult));
      }
    });

  return {
    keys: [...keys],
    results,
  };
};

export const parseMultipleQueries = (input: ParserInput[]) =>
  input.map(analysys => parseQuery(analysys));
