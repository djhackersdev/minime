import { loadJson, saveJson } from "./_util";
import { CarRepository } from "./defs";
import { Id } from "../model/base";
import { Car, CarSelector } from "../model/car";
import { Profile } from "../model/profile";

interface GarageJson {
  selected: CarSelector;
  cars: Car[];
}

export class CarRepositoryImpl implements CarRepository {
  private readonly _path: string;

  constructor(root: string) {
    this._path = root + "/garage.json";
  }

  async countCars(profileId: Id<Profile>): Promise<number> {
    const garage: GarageJson = await loadJson(this._path);

    return garage.cars.length;
  }

  async loadAllCars(profileId: Id<Profile>): Promise<Car[]> {
    const garage: GarageJson = await loadJson(this._path);

    return garage.cars;
  }

  async loadSelectedCar(profileId: Id<Profile>): Promise<Car> {
    const garage: GarageJson = await loadJson(this._path);
    const sel = garage.cars.find(item => item.selector === garage.selected);

    if (sel === undefined) {
      throw new Error("No car in garage matching current selector");
    }

    return sel;
  }

  async saveCar(profileId: Id<Profile>, car: Car): Promise<void> {
    const garage: GarageJson = await loadJson(this._path);
    const rest = garage.cars.filter(item => item.selector != car.selector);

    const updated = { ...garage, cars: [...rest, car] };

    return saveJson(this._path, updated);
  }

  async saveSelection(
    profileId: Id<Profile>,
    selection: CarSelector
  ): Promise<void> {
    const garage: GarageJson = await loadJson(this._path);
    const match = garage.cars.find(item => item.selector === selection);

    if (!match) {
      throw new Error(`No match for selector ${selection} in garage`);
    }

    garage.selected = selection;

    return saveJson(this._path, garage);
  }
}
