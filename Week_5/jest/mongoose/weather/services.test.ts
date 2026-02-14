/**
 * @jest-environment node
 */
import { WeatherInterface } from "./interface";
import {
  findByZip,
  storeDocument,
  updateByZip,
  deleteByZip,
} from "./services";
// Ensure the model file exists at the specified path, or update the path if necessary
import WeatherModel from "./model";

jest.mock("./model");

describe("the weather services", () => {
  let doc: WeatherInterface = {
    zip: "test",
    weather: "weather",
    tempC: "00",
    tempF: "01",
    friends: [],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("API storeDocument", () => {
    test("returns true", async () => {
      const result = await storeDocument(doc);
      expect(result).toBeTruthy();
    });

    test("passes the document to Model.create()", async () => {
      const spy = jest.spyOn(WeatherModel, "create");
      await storeDocument(doc);
      expect(spy).toHaveBeenCalledWith(doc);
    });

    test("returns false when Model.create() throws", async () => {
      jest.spyOn(WeatherModel, "create").mockRejectedValueOnce(new Error("write failed"));
      const result = await storeDocument(doc);
      expect(result).toBe(false);
    });
  });

  describe("API findByZip", () => {
    test("returns true", async () => {
      const result = await findByZip(doc.zip);
      expect(result).toBeTruthy();
    });

    test("passes the zip code to Model.findOne()", async () => {
      const spy = jest.spyOn(WeatherModel, "findOne");
      await findByZip(doc.zip);
      expect(spy).toHaveBeenCalledWith({ zip: doc.zip });
    });

    test("returns null when Model.findOne() throws", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      jest.spyOn(WeatherModel, "findOne").mockRejectedValueOnce(new Error("read failed"));

      const result = await findByZip(doc.zip);

      expect(result).toBeNull();
      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe("API updateByZip", () => {
    test("returns true", async () => {
      const result = await updateByZip(doc.zip, doc);
      expect(result).toBeTruthy();
    });

    test("passes the zip code and data to Model.updateOne()", async () => {
      const spy = jest.spyOn(WeatherModel, "updateOne");
      await updateByZip(doc.zip, doc);
      expect(spy).toHaveBeenCalledWith({ zip: doc.zip }, doc);
    });

    test("returns false when Model.updateOne() throws", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      jest.spyOn(WeatherModel, "updateOne").mockRejectedValueOnce(new Error("update failed"));

      const result = await updateByZip(doc.zip, doc);

      expect(result).toBe(false);
      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe("API deleteByZip", () => {
    test("returns true", async () => {
      const result = await deleteByZip(doc.zip);
      expect(result).toBeTruthy();
    });

    test("passes the zip code to Model.deleteOne()", async () => {
      const spy = jest.spyOn(WeatherModel, "deleteOne");
      await deleteByZip(doc.zip);
      expect(spy).toHaveBeenCalledWith({ zip: doc.zip });
    });

    test("returns false when Model.deleteOne() throws", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      jest.spyOn(WeatherModel, "deleteOne").mockRejectedValueOnce(new Error("delete failed"));

      const result = await deleteByZip(doc.zip);

      expect(result).toBe(false);
      expect(logSpy).toHaveBeenCalled();
    });
  });
});
