export type Id = string | number;

export type NumberOrStringLiteral<T> = T extends Id
  ? Id extends T
    ? never
    : T
  : never;

export type TypedDictionary<Key, Value> = Record<
  NumberOrStringLiteral<Key>,
  Value
>;

export type TwoWayTypedDict<Key, Value> = TypedDictionary<
  Key,
  NumberOrStringLiteral<Value>
>;

export type Dictionary<T> = TypedDictionary<Id, T>;
