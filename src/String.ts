import Str from '@supercharge/strings';

type IReplaceBracket = {
  fullStr: string;
  findStr: string;
  replaceStr: string;
  symbol?: 'curly' | 'square' | 'round';
};

export type IMessage = string | string[] | undefined;


export type IFormatMessage = 'html' | 'plainText' | undefined;

/**
 * @param {string} props.fullStr - string
 * @param {string} props.findStr - string
 * @param {string} props.replaceStr - string
 * @param {'curly' | 'square' | 'round'} [props.symbol='curly'] - 'curly' | 'square' | 'round'
 * @return {string} - string
 *
 * Replace string that has bracket
 * @example
 * ```ts
 * const str = replaceBracketStr({
 *  fullStr: 'Hello, {obj_1}!',
 *  findStr: 'obj_1'
 *  replaceStr: 'World'
 *  symbols: 'curly',
 * });
 * // Hello, World!
 * ```
 */
export function replaceBracketStr({
  fullStr,
  findStr,
  replaceStr,
  symbol = 'curly',
}: IReplaceBracket): string {
  const symbols = {
    curly: ['{', '}'],
    square: ['[', ']'],
    round: ['(', ')'],
  };
  const [startSymbol, endSymbol] = symbols[symbol];

  if (fullStr.includes(`${startSymbol}${findStr}${endSymbol}`)) {
    const newFullStr = fullStr.replace(
      new RegExp(`\\${startSymbol}(${findStr})\\${endSymbol}`, 'g'),
      (_) => '<b>' + replaceStr + '</b>',
    );
    console.log(
      'replaceBracketStr',
      `fullStr: ${fullStr}, newfullStr:${newFullStr}`,
    );

    return newFullStr;
  } else {
    return fullStr;
  }
}

/**
 * @param {string | string[]} props.message - string | string[]
 * @param {'html' | 'plainText'} [props.format='html'] - 'html' | 'plainText'
 * @return {string} - string | string[]
 *
 * Format Message String
 * @example
 * ```ts
 * const str = formatMessageStr({
 *  array: ['messsage1','message2'],
 *  format: 'plainText'
 * });
 * // * messsage1
 * // * messsage2
 * ```
 */
export function formatMessageStr(
  message: IMessage,
  format: IFormatMessage = 'html',
) {
  if (message) {
    if (Array.isArray(message)) {
      let msg = '';
      if (format === 'html') {
        msg += '<ul>';
        for (const key in message) {
          msg += `<li>${message[key]}</li>`;
        }
        msg += '</ul>';
      } else {
        for (const key in message) {
          msg += `* ${message[key]} \n`;
        }
      }

      return msg;
    } else {
      return message;
    }
  } else {
    return undefined;
  }
}

export function capitalCaseStr(str: string) {
  return Str(str).title().get();
}

export function limitWordStr(str: string, limit = 1) {
  if (Str(str).words().length <= limit) return str;
  return Str(str).words().slice(0, limit).join(' ') + '...';
}

export function limitCharStr(str: string, limit = 10) {
  if (str.length <= limit) return str;
  return Str(str).limit(limit, '...').get();
}

export function replaceSpace(value: string, replaceWith = '_'): string {
  return value.replace(/\s+/g, replaceWith);
}

export function replaceNewlineWithWhiteSpace(value: string): string {
  return value.replace(/\n/gm, ' ');
}

export const formatCurrency = (
  value: string | number,
  minFrac = 0,
  maxFrac = 0,
  locale?: string,
  currency?: string,
) => {

  if (!locale) locale = 'id-ID';
  if (!currency) currency = 'IDR';

  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  return value.toLocaleString(locale, {
    //style: 'currency',
    currency: currency,
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac,
  });
};

export const snakeLowerCase = (value: string) => {
  return Str(value).lower().snake().replace(' ', '_').get();
};
export const kebabLowerCase = (value: string) => {
  return Str(value).lower().kebab().replace(' ', '_').get();
};
export const snakeUpperCase = (value: string) => {
  return Str(value).snake().replace(' ', '_').uppercase().get();
};

export const formatPhoneNumber = (value: string) => {
  return Str(value).replaceAll(/\D+/g, '').get();
};

export function getInitialName(name: string) {
  let initial = 'UK';
  const nameSplit = name.split(' ');
  if (nameSplit.length > 1) {
    initial = nameSplit[0].substring(0, 1) + nameSplit[1].substring(0, 1);
  } else {
    initial = nameSplit[0].substring(0, 1) + nameSplit[0].substring(1, 2);
  }

  return initial.toUpperCase();
}

export function isValidUrl(urlString: string) {
  try {
    //console.log('isValidUrl', Boolean(new URL(urlString)));
    return Boolean(new URL(urlString));
  } catch (e) {
    console.error('Invalid URL:', urlString, e);
    return false;
  }
}
