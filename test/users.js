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
        it("Should be a response of 200", (done)=>{
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
     * Test: Add a user
     */
    
});