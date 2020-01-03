var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularNeo4jService } from 'angular-neo4j';
import { Observable, from } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/Operators';
import { environment } from 'src/environments/environment';
var Neo4jService = /** @class */ (function () {
    function Neo4jService(neo4j) {
        var _this = this;
        this.neo4j = neo4j;
        // will need to add graphql endpoint
        // baseUrl: string = 'https://api.cdnjs.com/libraries';
        this.queryUrl = '?search=';
        // angular-noe4j connection
        this.url = environment.neo4jUrl;
        this.username = environment.neo4jUserName;
        this.password = environment.neo4jPassword;
        this.encrypted = false;
        this.docSearch = new Observable(function (observer) {
            var next = observer.next, error = observer.error;
            observer.next(function () {
                return 1;
            });
            observer.complete();
            return { unsubscribe: function () {
                } };
        });
        neo4j.connect(this.url, this.username, this.password, this.encrypted)
            .then(function (driver) {
            if (driver) {
                _this.driver = driver;
                // console.log(`Successfully connected to ${this.url}`);
            }
        });
    }
    Neo4jService.prototype.sessionRun = function (query) {
        var _this = this;
        var params = {};
        var session = this.getSession();
        if (query) {
            // console.log('query: ', query)
            return from(session.run(query, params)
                .then(function (results) {
                session.close();
                // console.log('results:', results)
                return results.records.map(function (record) {
                    // console.log(record)
                    var r = [];
                    for (var i = 0; i < record.length; i++) {
                        r[i] = _this.processRecord(record.get(i));
                    }
                    console.log('session query return: ', r);
                    return r;
                });
            }, function (err) {
                session.close();
                throw err;
            }));
        }
        else {
            return [];
        }
    };
    Neo4jService.prototype.getPatentNodes = function (id) {
        var _this = this;
        var query = "\n                MATCH\n                (n:USPATENT_DOCUMENT {docNumber: '" + id + "'})\n                -[:PREPARED]-(a:ATTORNEY)\n                , (n)-[:OWNS]-(o:ASSIGNEE)\n                , (n)-[:INVENTED]-(i:INVENTOR)\n                , (n)-[:EXAMINED]-(e:EXAMINER)\n                , (n)-[:REFERENCED_BY]-(u:USPATENT_DOCUMENT)\n                , (n)-[:HAS_DESCRIPTION]-(d:DESCRIPTION)\n                return ['PATENT_NUMBER', collect(distinct n.docNumber),\n                'PATENT_TITLE', collect(distinct n.title),\n                'ATTORNEY_NAME', collect(distinct a.name),\n                'INVENTOR_NAME', collect(distinct i.name),\n                'INVENTOR_ADDRESS', collect(distinct i.address),\n                'ASSIGNEE_NAME', collect(distinct o.name),\n                'RELATED_NUMBER', collect(distinct u.docNumber),\n                'DESCRIPTION', collect(distinct d.description)]\n                as patentDoc;\n                ";
        var params = {};
        var session = this.getSession();
        if (id) {
            // console.log('query: ', query)
            return from(session.run(query, params)
                .then(function (results) {
                session.close();
                // console.log('results:', results)
                return results.records.map(function (record) {
                    //   console.log(record)
                    return _this.processRecord(record.get(0));
                    // let recArray = [];
                    // for(let i =0 ; i < record.length; i++){
                    //     recArray[i] = this.processRecord(record.get(i));
                    // }
                    // console.log('r: ', recArray);
                    // return recArray;
                });
            }, function (err) {
                session.close();
                throw err;
            }));
        }
        else {
            return;
        }
    };
    Neo4jService.prototype.getInventorAddress = function (docNum, inventorName) {
        var query = "\n                MATCH (n:USPATENT_DOCUMENT {docNumber: '" + docNum + "'})\n                -[r:INVENTED]\n                -(i:INVENTOR {name: '" + inventorName + "'}) \n                return distinct i.address limit 100\n                ";
        return this.sessionRun(query);
    };
    Neo4jService.prototype.getInventorTitles = function (name, address, skip) {
        //  console.log('skip: ', skip);
        var query = "\n                MATCH (n:USPATENT_DOCUMENT)\n                -[r:INVENTED]\n                -(i:INVENTOR {name: '" + name + "', address: '" + address + "'}) \n                return distinct n \n                SKIP " + skip + " \n                LIMIT 10\n                ";
        console.log(query);
        return this.sessionRun(query);
    };
    Neo4jService.prototype.refreshTitlesList = function (terms$, arrayLength) {
        //  console.log('neo4j.service.ts...refreshTitlesList() ', arrayLength)
        var _this = this;
        return terms$.pipe(
        // debounceTime(0),
        map(function (term) { return _this.refreshTitlesEntriesList(term, arrayLength); }), tap(function (val) { return console.log('neo4j.service.ts val: ', val); }));
    };
    Neo4jService.prototype.refreshTitlesEntriesList = function (term, arrayLength) {
        //  console.log('neo4j.service.ts...refreshTitlesEntriesList(): ', term)
        var _this = this;
        var query = '';
        query = "\n            MATCH (n:USPATENT_DOCUMENT)\n            WHERE n.title CONTAINS '" + term + "'\n            RETURN DISTINCT n as title\n            ORDER BY n.docNumber DESC\n            SKIP " + arrayLength + "\n            LIMIT 10\n            ";
        var params = {};
        var session = this.getSession();
        if (term) {
            //  console.log('query: ', query)
            return from(session.run(query, params)
                .then(function (results) {
                session.close();
                // console.log('results:', results)
                return results.records.map(function (record) {
                    // console.log(record)
                    var r = [];
                    for (var i = 0; i < record.length; i++) {
                        r[i] = _this.processRecord(record.get(i));
                    }
                    // console.log('r: ',r)
                    return r;
                });
            }, function (err) {
                session.close();
                throw err;
            }));
        }
        else {
            return [];
        }
    };
    Neo4jService.prototype.getPatentDoc = function (id) {
        return this.getPatentNodes(id);
    };
    Neo4jService.prototype.search = function (terms, nodeType) {
        var _this = this;
        // console.log(terms)
        return terms.pipe(debounceTime(400), distinctUntilChanged(), switchMap(function (term) { return _this.searchEntries(term, nodeType); }));
    };
    Neo4jService.prototype.searchForDoc = function (terms, nodeType) {
        var _this = this;
        // console.log(terms)
        return terms.pipe(debounceTime(0), switchMap(function (term) { return _this.searchEntries(term, nodeType); }));
    };
    Neo4jService.prototype.searchEntries = function (term, nodeType) {
        var _this = this;
        var query = '';
        // console.log('term: ', term, 'nodeType: ', nodeType);
        switch (nodeType) {
            case 'title':
                query = "\n                MATCH (n:USPATENT_DOCUMENT)\n                WHERE n.title CONTAINS '" + term + "' \n                RETURN DISTINCT n as title\n                ORDER BY n.docNumber DESC\n             \n                LIMIT 10\n                ";
                break;
            case 'claim':
                term = term.toUpperCase();
                query = "\n                MATCH (c:CLAIM)-[:HAS_CLAIM]-(p:USPATENT_DOCUMENT)\n                WHERE c.claim CONTAINS '" + term + "'\n                RETURN  DISTINCT p\n                LIMIT 10\n                ";
                break;
            case 'document':
            case 'desc':
                term = term.toUpperCase();
                query = "\n              MATCH (d:DESCRIPTION)-[:HAS_DESCRIPTION]-(p:USPATENT_DOCUMENT)\n              WHERE d.description CONTAINS '" + term + "'\n              RETURN DISTINCT p\n              ORDER BY p.docNumber DESC\n              LIMIT 10\n              ";
                break;
            default:
                break;
        }
        var params = {};
        var session = this.getSession();
        /**
         * This code is from the angular-neo4j npm package:
         * https://github.com/webmaxru/angular-neo4j/blob/master/src/lib/src/angular-neo4j.component.ts
         *
         * One change I made from the neo4j "cookbook" was to change the promise to an Observable
         * using "from". Otherwise the return values were always undefined on the Subscribe.
         * So this is basically a promise wrapped in an Observable
         *
         */
        if (term) {
            //  console.log('query: ', query)
            return from(session.run(query, params)
                .then(function (results) {
                session.close();
                // console.log('results:', results)
                return results.records.map(function (record) {
                    // console.log(record)
                    var r = [];
                    for (var i = 0; i < record.length; i++) {
                        r[i] = _this.processRecord(record.get(i));
                    }
                    // console.log('r: ',r)
                    return r;
                });
            }, function (err) {
                session.close();
                throw err;
            }));
        }
        else {
            return [];
        }
    };
    Neo4jService.prototype.getSession = function () {
        if (!this.driver) {
            throw new Error('A connection has not been made to Neo4j. You will need to run `connect(url, username, password)` before you can create a new session');
        }
        return this.driver.session();
    };
    Neo4jService.prototype.processRecord = function (record) {
        // console.log('inside processRecord()', record.constructor.name);
        var _this = this;
        if (record.constructor.name === 'Array') {
            var arrayObject_1 = {};
            // console.log('array!: ', record[6][0])
            /**
             * Need to get the length of the array, then loop over each element and
             * loop through each element
             */
            record.forEach(function (element, i) {
                // console.log('forEach:', i)
                if (i % 2) {
                    // console.log(i)
                }
                else {
                    element = element.replace(/"+/g, '');
                    Object.defineProperty(arrayObject_1, element, {
                        value: record[i + 1],
                        writable: false
                    });
                }
                //  element.forEach(subElement => {
                //   console.log('forEach:', subElement)
                //  })
            }, this);
            // console.log('arrayObject: ', arrayObject);
            return arrayObject_1;
        }
        // console.log('arrayObject: ',arrayObject)
        if (record.constructor.name === 'Integer') {
            return record.toNumber();
        }
        if (record.constructor.name === 'Path') {
            record.start.identity = this.processInteger(record.start.identity);
            record.end.identity = this.processInteger(record.end.identity);
            record.segments = record.segments.map(function (segment) {
                segment.start.identity = _this.processInteger(segment.start.identity);
                segment.end.identity = _this.processInteger(segment.end.identity);
                segment.relationship.identity = _this.processInteger(segment.relationship.identity);
                segment.relationship.start = _this.processInteger(segment.relationship.start);
                segment.relationship.end = _this.processInteger(segment.relationship.end);
                return segment;
            });
            return record;
        }
        if (record.constructor.name === 'Relationship') {
            record.identity = this.processInteger(record.identity);
            record.start = this.processInteger(record.start);
            record.end = this.processInteger(record.end);
            return record;
        }
        if (record.constructor.name === 'Node') {
            record.identity = this.processInteger(record.identity);
            // console.log('record.properties:', record.properties)
            /**
             * return the .properties of the record instead of the whole object
             */
            return record.properties;
        }
        return record;
    };
    Neo4jService.prototype.processInteger = function (integer) {
        if (integer.constructor.name === 'Integer') {
            return integer.toNumber();
        }
        return integer;
    };
    Neo4jService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularNeo4jService])
    ], Neo4jService);
    return Neo4jService;
}());
export { Neo4jService };
//# sourceMappingURL=neo4j.service.js.map