/**
 * @jest-environment node
 */

import dbConnect from "../../middleware/db-connect";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("dbConnect", () => {
  let mongoServer: MongoMemoryServer | null = null;

  afterEach(async () => {
    jest.clearAllMocks();

    // Stop the in-memory MongoDB instance created by this test.
    if (mongoServer) {
      await mongoServer.stop();
      mongoServer = null;
    }

    // Ensure each test starts with a clean mongoose connection state.
    await mongoose.disconnect();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  test("calls MongoMemoryServer.create()", async () => {
    const spy = jest.spyOn(MongoMemoryServer, "create");
    mongoServer = await dbConnect();
    // Verifies middleware creates an in-memory database server.
    expect(spy).toHaveBeenCalled();
  });

  test("calls mongoose.disconnect()", async () => {
    const spy = jest.spyOn(mongoose, "disconnect");
    mongoServer = await dbConnect();
    // Verifies middleware disconnects before reconnecting.
    expect(spy).toHaveBeenCalled();
  });

  test("calls mongoose.connect()", async () => {
    const spy = jest.spyOn(mongoose, "connect");
    mongoServer = await dbConnect();
    const mongoUri = mongoServer.getUri();
    // Verifies middleware connects using the generated URI and Weather DB name.
    expect(spy).toHaveBeenCalledWith(mongoUri, { dbName: "Weather" });
  });
});
