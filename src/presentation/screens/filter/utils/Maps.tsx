export class MapHelper {
  static getJoinedValues<K, V>(map: Map<K, V>, key: K): string | undefined {
    const value = map.get(key);
    return value && Array.isArray(value) && value.length > 0
      ? value.join(',')
      : undefined;
  }
}
