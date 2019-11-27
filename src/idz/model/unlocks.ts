export interface Unlocks {
  auras: number;
  cup: number;
  gauges: number;
  music: number;

  // Doesn't really fit anywhere but let's put it here for now. This field is
  // an odd one, still not entirely sure what its purpose and semantics are,
  // but if we don't save it then the unlock notification for the music track
  // THE TOP (unlocked at 300km mileage) pops up at the start of every credit
  // even if its music unlock bit is set and round-tripped.

  lastMileageReward: number;
}
