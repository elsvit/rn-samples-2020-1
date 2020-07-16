export interface ILoadableBooleanDict {
  [actionType: string]: Maybe<boolean>;
}
export interface ILoadableStringDict {
  [actionType: string]: Maybe<string>;
}
export interface IStringObj {
  [key: string]: string;
}

export interface IId {
  id: number;
}

export interface IIdName extends IId {
  name: string;
}

export interface IResponse {
  success: boolean;
}

export interface IOption {
  value: string;
  label: string;
}
