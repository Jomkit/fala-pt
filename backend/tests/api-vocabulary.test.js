import express from "express";
import request from "supertest";
import vocabulary from "../src/api/vocabulary";

const app = express();
app.use(express.json());
app.use(vocabulary);

describe("Vocabulary routes", () => {
    it('should be able to create a custom vocabulary entry', async () => {
        const response = await request(app).post('/').send({"english": "test", "portuguese": "o test"});

        expect(response.status).toBe(201);
        expect(response.body.msg).toBe("New vocab added");
    })
    
    it('should return status code 200 on get all vocabulary', async () => {
        const response = await request(app).get('/').send();

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("All vocabulary");
    })
})