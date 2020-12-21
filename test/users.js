let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/app');
let client

chai.should();

chai.use(chaiHttp);

describe('User API', () => {

    //Connect before to redis
    before(() => {
        client = require('../src/dbClient')
    })

    //Killing user redis after
    after(()=> {
        client.quit();
    })

    /**
     * Test the main GET route
     */
    describe("GET /", ()=> {
        it("Should get successfully the home page", (done)=>{
            chai.request(server)
             .get('/')
             .end((err, response)=> {
                 response.should.have.status(200);
                 done();
             })
        })
    })

    /**
     * Test: Add a user
     */
    describe("POST /user/add", () => {
        it("It should create a new user", (done) => {
            const user = {
                id: '10',
                first_name: 'hugo',
                last_name: 'navillod',
                phone: '0610101010',
                email: 'hugo.navillod@edu.ece.fr'
            }
            chai.request(server)
             .post('/user/add')
             .send(user)
             .end((err, response) => {
                 response.should.have.status(200);
                 done();
             })
        })
    });

    /**
     * Test: Getting a user
     */
    describe("POST /user/search", () =>{
        //Try to get it if it exists
        it("should get a user by its id", (done) => {
            const iduser = {
                id: '10'
            }
            chai.request(server)
             .post('/user/search')
             .send(iduser)
             .end((err, response) => {
                response.should.have.status(201);
                done();
            });
        });

        //If user does not exist
        it("should not get a user by its id if it does not exist", (done) => {
            const iduser = {
                id: '100'
            }
            chai.request(server)
             .post('/user/search')
             .send(iduser)
             .end((err, response) => {
                response.should.have.status(404);
                done();
            });
        });
    })

    /**
     * Test: Updating a user
     */
    describe("POST /user/update/:id", () =>{
        //Try to get it if it exists
        it("should update a user if it exists", (done) => {
            const changedUser = {
                id: '10',
                first_name: 'pierre',
                last_name: 'camugli',
                phone: '0622222222',
                email: 'pierre.camugli@edu.ece.fr'
            }
            chai.request(server)
             .post('/user/update/'+10)
             .send(changedUser)
             .end((err, response) => {
                response.should.have.status(200);
                done();
            });
        });
        it("should not update a user if doest not exist", (done) => {
            const changedUser = {
                id: '10',
                first_name: 'pierre',
                last_name: 'camugli',
                phone: '0622222222',
                email: 'pierre.camugli@edu.ece.fr'
            }
            chai.request(server)
             .post('/user/update/'+100)
             .send(changedUser)
             .end((err, response) => {
                response.should.have.status(404);
                done();
            });
        });
    })


     /**
     * Test: Deleting a user after creation
     */
    describe("DELETE /user/delete/:id", () =>{
        //Try to delete it if it exists
        it("should delete a user", (done) => {
            chai.request(server)
             .post('/user/delete/' + 10)
             .end((err, response) => {
                response.should.have.status(201);
                done();
            })
        })
        //If the user doesn't exist
        it("should send an error if user does not exist", (done) => {
            chai.request(server)
             .post('/user/delete/' + 100)
             .end((err, response) => {
                response.should.have.status(404);
                done();
            })
        })
    })
});