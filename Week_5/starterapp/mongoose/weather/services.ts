import WeatherModel from "./model";
import { WeatherInterface } from "./interface";

export async function storeDocument(doc: WeatherInterface): Promise<boolean> {
  try {
    await WeatherModel.create(doc);
  } catch (err) {
    return false;
  }
  return true;
}

export async function findByZip(paramZip: string): Promise<WeatherInterface | null> {
  try {
    return await WeatherModel.findOne({ zip: paramZip });
  } catch (err) {
    console.log(err);
  }
  return null;
}

export async function updateByZip(
  paramZip: string,
  newData: Partial<WeatherInterface> & { zip: string },
): Promise<boolean> {
  try {
    await WeatherModel.updateOne({ zip: paramZip }, newData);
    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
}

export async function deleteByZip(paramZip: string): Promise<boolean> {
  try {
    await WeatherModel.deleteOne({ zip: paramZip });
    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
}
