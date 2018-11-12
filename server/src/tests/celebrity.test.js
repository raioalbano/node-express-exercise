const request = require("supertest");
const app = require("../../../app");
const chai = require("chai");
const should = chai.should();
const expect1 = chai.expect;
const CelebrityService = require('../services/celebrityService');
var doneAux;
//To run the test: nppm test
describe('Tests for CelebrityService', ()=>{
    //Test if the search works for a list of size 1
    it('Test Find Profession - List length 1 - Last Sports Person', (done)=>{
        function callback(last) {
            expect(last).toBe('Sports Person');
            done();
        }
        return CelebrityService.findProfession(
            ['Agnieszka Bednarek-Kasza'], callback);
    });
    //Test if the search works for a list of size 2
    it('Test Find Profession - List length 2 - Last is Musician ', (done)=>{
        function callback(last) {
            expect(last).toBe('Musician');
            done();
        }
        return CelebrityService.findProfession(
            ['Agnieszka Bednarek-Kasza', 'Alex Mica'], callback);
    });
});