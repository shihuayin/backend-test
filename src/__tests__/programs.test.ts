import request from "supertest";
import app from "../app";

const api = request(app);

describe("Programs API", () => {
  const uniqueId = Date.now();
  const testProgram = {
    id: uniqueId,
    title: "Just a test",
    topic: "test",
    learningFormats: ["virtual"],
    bestseller: false,
    startDate: new Date().toISOString(),
  };

  describe("GET /programs", () => {
    it("should return 200 and an array", async () => {
      const response = await api.get("/programs");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /programs", () => {
    it("should add a program", async () => {
      const response = await api.post("/programs").send(testProgram);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Program added successfully"
      );
    });
  });

  describe("PUT /programs/:id", () => {
    it("should update the program", async () => {
      const updateData = {
        title: "Updated Test Program",
        bestseller: true,
      };

      const response = await api
        .put(`/programs/${testProgram.id}`)
        .send(updateData);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Program updated successfully"
      );
      expect(response.body.updated).toMatchObject(updateData);
    });
  });

  describe("DELETE /programs/:id", () => {
    it("should delete the program", async () => {
      const response = await api.delete(`/programs/${testProgram.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        `Program with id ${testProgram.id} deleted.`
      );

      const check = await api.get("/programs");
      const exists = check.body.find((p: any) => p.id === testProgram.id);
      expect(exists).toBeUndefined();
    });
  });
});
