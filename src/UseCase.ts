
import type { Either } from './Either';

export enum EFailureType {
  ResponseTimeout = 'ResponseTimeout',
  ResponseInvalid = 'ResponseInvalid',
  RequestTimeout = 'RequestTimeout',
  NoInternet = 'NoInternet',
  ValidationForm = 'ValidationForm',
  Unexpected = 'Unexpected',
  Unknown = 'Unknown',
}

export interface IFailure {
  type: EFailureType | any;
  message: string | string[];
  code?: number;
}

export abstract class UseCase<T, P> {
  abstract call(p: P): Promise<Either<IFailure, T>>;
}
