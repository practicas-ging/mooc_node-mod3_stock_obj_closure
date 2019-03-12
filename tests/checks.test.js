/**
 * Checker for the objects assignment
 */

// IMPORTS
const should = require('chai').should();
const path = require('path');
const fs = require('fs-extra');
const Utils = require('./utils');
const to = require('./to');

const path_assignment = path.resolve(path.join(__dirname, "../", "mod3_stock_obj_closure.js"));

// CRITICAL ERRORS
let error_critical = null;

//TESTS
describe("mooc_node-mod3_stock_obj_closure", function () {

    it('', async function () { this.name = `1: Checking that the file 'mooc_node-mod3_stock_obj_closure.js' exists...`;
        this.score = 1;
        this.msg_ok = `The file 'mooc_node-mod3_stock_obj_closure.js' has been found`;
        this.msg_err = `The file 'mooc_node-mod3_stock_obj_closure.js' has NOT been found at '${path_assignment}'`;
        const [error_path, path_ok] = await to(fs.pathExists(path_assignment));
        if (error_path) {
            error_critical = this.msg_err;
        }
        path_ok.should.be.equal(true);
    });

    it(`2: Checking that the file 'mooc_node-mod3_stock_obj_closure.js' contains the Stock object...`,  async function () {
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const expected = /function stock\s?\(.+?\)/;
            const output = fs.readFileSync(path_assignment, "utf8");
            this.msg_ok = `'${expected}' has been found in 'mooc_node-mod3_stock_obj_closure.js'`;
            this.msg_err = `'${expected}' has NOT been found in '${path_assignment}'`;
            const func_ok = Utils.search(expected, output);
            if (!func_ok) {
                error_critical = this.msg_err;
            }
            func_ok.should.be.equal(true);
        }
    });

    it("3: Checking that the 'get' method returns the correct number...",  async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const mystock = require(path_assignment).stock;
            let shop = mystock("My Shop");
            shop.new_p('a1', 'fork');
            shop.add('a1', 3);
            const input = "shop.new_p('a1', 'fork');shop.add('a1', 3);";
            const expected = 3;
            const output = shop.get_p("a1")["n"];
            this.msg_ok = `The 'get' method has been correctly implemented`;
            this.msg_err = `'${expected}' has not been found when executing '${input}'\n\t\t\tReceived: ${output}`;
            expected.should.be.equal(output);
        }
    });

    it("4: Checking that the 'get' method returns the correct code...",  async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const mystock = require(path_assignment).stock;
            let shop = mystock("My Shop");
            shop.new_p('a1', 'fork');
            shop.add('a1', 3);
            const input = "shop.new_p('a1', 'fork');shop.add('a1', 3);";
            const expected = "a1";
            const output = shop.get_p("a1")["code"];
            console.log(typeof output);
            this.msg_ok = `The 'get' method has been correctly implemented`;
            this.msg_err = `'${expected}' has not been found when executing '${input}'\n\t\t\tReceived: ${output}`;
            expected.should.be.equal(output);
        }
    });

    it("5:Checking that the 'AddJSON' method returns the correct result ...",  async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const mystock = require(path_assignment).stock;
            let shop = mystock("My Shop");
            shop.addJSON('{ "spoon":{"n":2, "code":5}, "knife":{"n": 3, "code":9} }');
            const input = `shop.addJSON('{ "spoon":{"n":2, "code":5}, "knife":{"n": 3, "code":9} }');`;
            console.log(shop.getJSON());
            const expected = '{"spoon":{"code":5,"n":2},"knife":{"code":9,"n":3}}';
            const output = shop.getJSON();
            this.msg_ok = `The 'AddJSON' method has been correctly implemented`;
            this.msg_err = `'${expected}' has not been found when executing '${input}'\n\t\t\tReceived: ${output}`;
            expected.should.be.equal(output);
        }
    });

    it("6: Checking that the 'del' method returns the correct code...",  async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const mystock = require(path_assignment).stock;
            let shop = mystock("My Shop");
            shop.add('fork', 3, 1);
            shop.del_p('fork');
            const input = "shop.del('fork');";
            const expected = "{}";
            const output = shop.getJSON();
            console.log(typeof output);
            this.msg_ok = `The 'del' method has been correctly implemented`;
            this.msg_err = `'${expected}' has not been found when executing '${input}'\n\t\t\tReceived: ${output}`;
            expected.should.be.equal(output);
        }
    });
});
