import { TwoWayTypedDict, NumberOrStringLiteral } from "./types";

/**
 * A class that takes a dictionary map and allows getting and
 * setting of the reverse map (values for keys). The values and keys
 * can be strings, numbers, or string literals for type safety and
 * auto-completion
 */
export class TwoWayMap<Keys, Values> {
  public map: TwoWayTypedDict<Keys, Values>;
  public reverseMap: TwoWayTypedDict<Values, Keys>;
  constructor(map: TwoWayTypedDict<Keys, Values>) {
    this.map = map;
    this.reverseMap = getReverseMap(map);
  }

  public get(key: NumberOrStringLiteral<Keys>) {
    return this.map[key];
  }

  public revGet(value: NumberOrStringLiteral<Values>) {
    return this.reverseMap[value];
  }

  public set(
    key: NumberOrStringLiteral<Keys>,
    value: NumberOrStringLiteral<Values>
  ) {
    this.map[key] = value;
    this.reverseMap[value] = key;
  }

  public getMapNumbers() {
    return Object.keys(this.map).map(Number);
  }

  public getRevNumbers() {
    return Object.keys(this.reverseMap).map(Number);
  }
}

function getReverseMap<Key, Value>(map: TwoWayTypedDict<Key, Value>) {
  return Object.keys(map).reduce((accumulatedMap, key) => {
    const typedKey = key as NumberOrStringLiteral<Key>;
    const value = map[typedKey];
    return { ...accumulatedMap, [value]: key };
  }, {} as TwoWayTypedDict<Value, Key>);
}
