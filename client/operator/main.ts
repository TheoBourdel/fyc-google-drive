import { Observable, interval, of, map, filter, catchError, tap, delay, share } from 'rxjs';

const observable = interval(1000).pipe(
  map(value => value * 2),
  filter(value => value % 3 === 0),
  catchError(error => {
    console.error(`error: ${error}`);
    return of(-1);
  }),
  tap(value => console.log(`value: ${value}`)),
  delay(2000),
  share()
);

observable.subscribe(
  value => console.log(`first observer : ${value}`),
  error => console.error(`first observer Error: ${error}`),
  () => console.log('observer 1 ok')
);

setTimeout(() => {
  observable.subscribe(
    value => console.log(`second observer: ${value}`),
    error => console.error(`second observer Error: ${error}`),
    () => console.log('Observer 2 ok')
  );
}, 4000);

