const request = require('supertest')
const app = require('../server')
const { sequelize } = require("../lib");


beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('Notes API', () => {
    it('get Notes endpoint should respond with status 200', async () => {
        const res = await request(app)
            .get('/notes');

        expect(res.statusCode).toEqual(200);
    })

    it('get Notes endpoint should respond []', async () => {
        const res = await request(app)
            .get('/notes');

        expect(res.body).toEqual([]);
    })

    it('get Notes endpoint should respond exact notes', async () => {
        let notes = [{
            "id": 1,
            "author": "Adams",
            "content": "Man You Had in Mind, The",
            "description": "Universal real-time benchmark"
        }, {
            "id": 2,
            "author": "Brenna",
            "content": "The Missing Piece: Mona Lisa, Her Thief, the True Story",
            "description": "Pre-emptive client-server analyzer"
        }, {
            "id": 3,
            "author": "Amity",
            "content": "City Dark, The",
            "description": "Devolved didactic framework"
        }, {
            "id": 4,
            "author": "Mallorie",
            "content": "On the Edge",
            "description": "Team-oriented intermediate capacity"
        }]

        await sequelize.models.Note.bulkCreate(notes);

        const res = await request(app)
            .get('/notes');

        expect(res.body).toEqual(notes);
    })

    it('get note by id 1 should respond one note', async () => {
        const res = await request(app)
            .get('/notes/1');

        expect(res.body.id).toEqual(1);
    })

    it('get note by non existing id should respond 404', async () => {
        const res = await request(app)
            .get('/notes/10');

        expect(res.statusCode).toEqual(404);
    })

    it('get note by author and expect to respond correct note', async () => {
        const res = await request(app)
            .get('/notes?author=Brenna');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].author).toEqual("Brenna");
    })

    it('get note by non exsiting author and expect to respond []', async () => {
        const res = await request(app)
            .get('/notes?author=iamnotauthor');

        expect(res.body).toEqual([]);
    })

    it('expect 201 when note is created successfully', async () => {
        const res = await request(app)
            .post('/notes')
            .send({
                id: 5,
                author: "Jacquelin",
                content: "Leading Man, The",
                description: "Stand-alone intangible moratorium"
            })

        expect(res.statusCode).toEqual(201);
    })

    it('expect created note to exact match posted data', async () => {
        const res = await request(app)
            .get('/notes/5');

        expect(res.body).toEqual({
            id: 5,
            author: "Jacquelin",
            content: "Leading Man, The",
            description: "Stand-alone intangible moratorium"
        });
    })

    it('expect 422 when posting without required fields', async () => {
        const res = await request(app)
            .post('/notes')
            .send({
                author: "Jacquelin",
                description: "Stand-alone intangible moratorium"
            })

        expect(res.statusCode).toEqual(422);
    })
})

afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();
});