//trailing debounce is the concept for example when write text in input and send request to backend
// when time is over request sended (just only send one request and to consider last request)
// first argument get onchange function and secound get time
export function trailingDebounce(func: any, t: number | string) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(args);
    }, t as any);
  };
}

// leading debounce is when send request to backend leading concept suppose first request and
// remove next requests
export function leadingDebounce(func: any, t: string | number) {
  let timer: any;
  return (...args: any) => {
    if (!timer) {
      func.apply(args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => (timer = undefined), t as any);
  };
}
