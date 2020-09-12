if (!global.Promise) {
  global.Promise = require('q');
}

const chai      = require('chai');
const chaiHttp  = require('chai-http');
const { response } = require('../app');
const server    = require('../server');

chai.use(chaiHttp);

chai.should();

const expect = chai.expect;


const generateRandomString = (length = 6, max=30 ) =>{
  return (+new Date).toString(max).slice(length * -1);
};

describe('Test Pub/Sub APIs', () => {
  
  // Test GET home
  describe("GET /", ()=>{
    it("should return HTTP_OK", (done) => {
      chai.request(server)
          .get("/")
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.eq("OK");
            done();
          });
    });
  });

  const eventName = generateRandomString();

  // Test POST subscribe
  describe("POST /subscriber/:topic", ()=>{
    it(" it should NOT return HTTP_OK, it should return HTTP_BAD_REQUEST", (done) => {
      
      chai.request(server)
          .post("/subscribe/" + eventName)
          .end((err, res) => {
            
            res.should.have.status(400);
            done();
          });
    });
  });

  // Test POST subscribe
  describe("POST /subscriber/:topic", ()=>{
    it("it should return HTTP_OK", (done) => {
      
      const params = {
        "url": "http://localhost:8000/event"
      };

      chai.request(server)
          .post("/subscribe/" + eventName)
          .send(params)
          .end((err, res) => {
            
            res.should.have.status(200);
            res.text.should.be.eq("OK");
            done();
          });
    });
  });


 

  // Test POST publish
  describe("POST /publish/:topic", ()=>{
    it("it should return HTTP_OK", () => {
      
      const params = {
        "message": generateRandomString()
      };

      chai.request(server).keepOpen()
          .post("/publish/" + eventName)
          .send(params)
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.eq("OK");
          });
    });
  });
  
}); // end