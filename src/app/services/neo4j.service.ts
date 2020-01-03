import { AuthService } from './auth.service';
import { Settings } from './../../../settings';

import { Injectable } from '@angular/core';
import { AngularNeo4jService } from 'angular-neo4j';

import { Observable, from, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, tap, mergeMap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { async, reject } from 'q';

import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Neo4jService {

  driver;
  // will need to add graphql endpoint
  // baseUrl: string = 'https://api.cdnjs.com/libraries';

  queryUrl: string = '?search=';
  // angular-noe4j connection
  url: string = environment.neo4jUrl;
  username: string = environment.neo4jUserName;
  password: string = environment.neo4jPassword;
  encrypted: boolean = false;
  claimArrayReturn: number = 50;


  docSearch = new Observable((observer) => {
    const {next, error} = observer;

    observer.next(() => {
      return 1;
    })
    observer.complete()

    return {unsubscribe() {

    }};
  });

  // this is for secure API calls
  accessToken;

  constructor(
    private neo4j: AngularNeo4jService,
    private http: HttpClient,
    private auth0: AuthService
    ) {

      auth0.getTokenSilently$().subscribe( ( accessToken ) => {

        this.accessToken = accessToken;

      // console.log('accessToken: ', this.accessToken)
      })

      neo4j.connect
          (
              this.url,
              this.username,
              this.password,
              this.encrypted)
          .then(driver => {
              if(driver) {
                  this.driver = driver;
                  // console.log(`Successfully connected to ${this.url}`);
              }
          })
  }


  getImages( id ): Observable<any> {
    return this.http.get(`https://patentanimal.com/api/images/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }


  getAllImages( id ): Observable<any> {
    return this.http.get(`https://patentanimal.com/api/allimages/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  getFirstTIFF = async (docNum: string) => {
    let resolveS3Url = [];
    return new Promise(async (resolve, reject)=>{

      var objectName = [];

      const url: string = `US${docNum}`

      /** set AWS constants */
      const bucket = new S3({
        region: 'sfo2',
        // accessKeyId: 'X32IRK3WRZ6OB7G4AOWY',
        // secretAccessKey: 'JIxpuy9HA4QNQEIrAAJ/qDTHvb9uCKClhdQf1UPNOHc',
        accessKeyId: Settings.spacesKey,
        secretAccessKey: Settings.spacesSecret,
        endpoint: 'https://sfo2.digitaloceanspaces.com'
      });

      console.log('s3 bucket: ', bucket)
      const params = {
        Bucket: 'patent-raven-weekly-extract',
        Prefix: `PNG-US${docNum}`,
        MaxKeys: 3 //this will ensure the top TIFF file is picked for a given prefix
      };

     // console.log('params', params.Prefix)
      /** call listObjects */
      /** take the docNum and build the prefix for the AWS bucket query */
      bucket.listObjectsV2(params, async (err, data) => {
        if(err) {
          // console.log(err)
          return reject(err);
        } else {
        // console.log('data ', data.Contents.length)
        let s3url = [];
        /** get the image from S3 */
        await this.asyncForEach(data.Contents, async ( val )=> {

          await bucket.getObject({
            Bucket: 'patent-raven-weekly-extract',
            Key: val.Key

          },  ( err, file ) => {
            if(err) { return reject(err)}

            /** this is supposed to encode the image data returned from S3 */
            s3url.push('data:image/jpeg;base64,' + this.encode(file.Body));

          //  console.log('data.contents length: ', data.Contents.length)
          //  console.log('s3url length: ', s3url.length)
            if(data.Contents.length === s3url.length) {
            // console.log('s3Url: ', s3url)
              resolveS3Url = s3url;
            //  console.log('resolve()', s3url[0].slice(50, 100))

             // s3url = [];
              return resolve(s3url);

            }

          });
         // console.log('s3url length after all foreach: ', s3url.length)

        })

       // console.log('s3url: ', s3url)

        // data.Contents.forEach(async val => {
        // })
        }
      })


     // return resolve(s3url);
    })
  }

  private encode(data) {
    var str = data.reduce(function(a,b) { return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
  }

  private sessionRun(query: string) {

    const params = {};
    const session = this.getSession();

    if(query) {
      // console.log('query: ', query)
        return from(session.run(query, params)
          .then(results => {
                session.close();
                // console.log('results:', results)
                return results.records.map(record => {
                    // console.log(record)
                    let r = [];
                    for(let i =0 ; i < record.length; i++) {
                        r[i] = this.processRecord(record.get(i));
                    }
  //  console.log('session query return: ',r)
                    return r;
                });
            },
            err => {
                session.close();
                throw err;
            }
        ));
    } else {
        return [];
    }

  }

  private getPatentNodesWithClaims(id): Observable<any> {
    var query = `
                MATCH
                (n:USPATENT_DOCUMENT {docNumber: '${id}'})
                -[:PREPARED]-(a:ATTORNEY)
                , (n)-[:OWNS]-(o:ASSIGNEE)
                , (n)-[:INVENTED]-(i:INVENTOR)
                , (n)-[:EXAMINED]-(e:EXAMINER)
                , (n)-[:REFERENCED_BY]-(u:USPATENT_DOCUMENT)
                , (n)-[:HAS_CLAIM]-(d:CLAIM)
                return ['PATENT_NUMBER', collect(distinct n.docNumber),
                'PATENT_TITLE', collect(distinct n.title),
                'ATTORNEY_NAME', collect(distinct a.name),
                'INVENTOR_NAME', collect(distinct i.name),
                'INVENTOR_ADDRESS', collect(distinct i.address),
                'ASSIGNEE_NAME', collect(distinct o.name),
                'RELATED_NUMBER', collect(distinct u.docNumber),
                'CLAIM', collect(distinct d.claim)]
                as patentDoc;
                `;

    const params = {};
    const session = this.getSession();

    if ( id ) {
       // console.log('query: ', query)
        return from(session.run(query, params)
          .then(results => {
                session.close();
                // console.log('results:', results)
                return results.records.map(record => {
                 //   console.log(record)
                  return this.processRecord(record.get(0));

                });
            },
            err => {
                session.close();
                throw err;
            }
        ));
    } else {
        return;
    }

  }

  private getPatentNodes(id): Observable<any> {
  //  console.log('getPatentNodes()..', id)

    return this.http.get(`https://patentanimal.com/api/patent-doc/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })


  }

  getInventorAddress(docNum: string, inventorName: string) {

    var query = `
                MATCH (n:USPATENT_DOCUMENT {docNumber: '${docNum}'})
                -[r:INVENTED]
                -(i:INVENTOR {name: '${inventorName}'})
                return distinct i.address limit 100
                `;


    return this.sessionRun(query);
  }

  getInventorTitles(name, address, skip) {
  //  console.log('skip: ', skip);
    var query =`
                MATCH (n:USPATENT_DOCUMENT)
                -[r:INVENTED]
                -(i:INVENTOR {name: '${name}', address: '${address}'})
                return distinct n
                SKIP ${skip}
                LIMIT 100
                `;
  //  console.log(query)
    return this.sessionRun(query);

  }

  refreshTitlesUsingClaim(term: any, arrayLength: number) {
    let query = '';

    term = term.toUpperCase();


    query = `
            MATCH (c:CLAIM)-[:HAS_CLAIM]-(p:USPATENT_DOCUMENT)
            WHERE c.claim CONTAINS '${term}'
            RETURN  DISTINCT p
            SKIP ${arrayLength}
            LIMIT ${this.claimArrayReturn}
            `;
    const params = {};
    const session = this.getSession();

    if(term) {
  //  console.log('query: ', query)
      return from(session.run(query, params)
        .then(results => {
          session.close();
          // console.log('results:', results)
          return results.records.map(record => {
            // console.log(record)
            let r = [];
            for(let i =0 ; i < record.length; i++) {
              r[i] = this.processRecord(record.get(i));
            }
// console.log('r: ',r)
            return r;
          });
        },
        err => {
          session.close();
          throw err;
        }
      ));
    } else {
        return [];
    }
  }

  refreshTitlesUsingDesc(term: any, arrayLength: number) {
    let query = '';

    term = term.toUpperCase();


    query = `
            MATCH (d:DESCRIPTION)-[:HAS_DESCRIPTION]-(p:USPATENT_DOCUMENT)
            WHERE d.description CONTAINS '${term}'
            RETURN DISTINCT p
            ORDER BY p.docNumber DESC
            SKIP ${arrayLength}
            LIMIT 50
            `;
    const params = {};
    const session = this.getSession();

    if(term) {
  //  console.log('query: ', query)
      return from(session.run(query, params)
        .then(results => {
          session.close();
          // console.log('results:', results)
          return results.records.map(record => {
            // console.log(record)
            let r = [];
            for(let i =0 ; i < record.length; i++) {
              r[i] = this.processRecord(record.get(i));
            }
// console.log('r: ',r)
            return r;
          });
        },
        err => {
          session.close();
          throw err;
        }
      ));
    } else {
        return [];
    }
  }

  refreshTitlesEntriesList(term: any,  arrayLength: number) {
  //  console.log('neo4j.service.ts...refreshTitlesEntriesList(): ', term)

    let query = '';
    query = `
            MATCH (n:USPATENT_DOCUMENT)
            WHERE n.title CONTAINS '${term}'
            RETURN DISTINCT n as title
            ORDER BY n.docNumber DESC
            SKIP ${arrayLength}
            LIMIT 100
            `;
    const params = {};
    const session = this.getSession();

    if(term) {
  //  console.log('query: ', query)
      return from(session.run(query, params)
        .then(results => {
          session.close();
          // console.log('results:', results)
          return results.records.map(record => {
            // console.log(record)
            let r = [];
            for(let i =0 ; i < record.length; i++) {
              r[i] = this.processRecord(record.get(i));
            }
// console.log('r: ',r)
            return r;
          });
        },
        err => {
          session.close();
          throw err;
        }
      ));
    } else {
        return [];
    }

  }

  getPatentDoc(id: string) {
    return this.getPatentNodes(id);
  }

  getPatentDocWithClaims(id: string) {
    return this.getPatentNodesWithClaims(id);
  }

  search(terms: Observable<string>, nodeType: string, arrayLength: number = 0) {
    // console.log(terms)
      return terms.pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(term => this.searchEntries(term, nodeType, arrayLength))

      )

  }

  searchForDoc(terms: Observable<string>, nodeType: string, arrayLength: number) {
    // console.log(terms)
      return terms.pipe(
        debounceTime(0),
          switchMap(term => this.searchEntries(term, nodeType, arrayLength))

      )

  }
  /**
   *
   * TODO: search for an array of cpc codes
   */

  searchforDocsUsingCpcCodes(cpcArray: any[]) {

    const paramsObject = {};

  //  console.log('cpcArray: ', cpcArray)

    cpcArray.map( ( elm, i ) => {
      if(i === 0) {
        paramsObject[`term`] = elm.term;

      } else {
        paramsObject[`params${i}`] = elm.classificationNumber;

      }
    } );
    const params = new HttpParams({fromObject: paramsObject});

    /**
        "https://patentanimal.com:3030/cpc-code-doc/?params0=B01D&params1=B01F"
    */

    return this.http.get(`https://patentanimal.com/api/cpc-code-doc/`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        params
      });
  }



  searchForCpcCodes(term: any) {

    return this.http.get(`https://patentanimal.com/api/cpc-code/${term}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

  }

  searchEntriesV2(term: any, nodeType: string, arrayLength: number) {

    return new Promise (( resolve, reject )=>{
      // console.log(`https://patentanimal.com/api/searchentries/${term}/${nodeType}/${arrayLength}`)

      resolve( this.http.get(`https://patentanimal.com/api/searchentries/${term}/${nodeType}/${arrayLength}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
      ));
    }).catch(err => reject(err));



  }

  searchEntries(term: any, nodeType: string, arrayLength: number) {

       console.log(`https://patentanimal.com/api/searchentries/${term}/${nodeType}/${arrayLength}`);
      return this.http.get(`https://patentanimal.com/api/searchentries/${term}/${nodeType}/${arrayLength}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
  }

  getSession() {



      if (!this.driver) {
        throw new Error(
          'A connection has not been made to Neo4j. You will need to run `connect(url, username, password)` before you can create a new session'
        );
      }

      return this.driver.session();
    }

  private processRecord(record) {


    // console.log('inside processRecord()', record.constructor.name);

    if(record.constructor.name === 'Array') {
      const arrayObject = {};
      // console.log('array!: ', record[6][0])
      /**
       * Need to get the length of the array, then loop over each element and
       * loop through each element
       */
       record.forEach((element, i) => {
        // console.log('forEach:', i)
        if ( i % 2) {
          // console.log(i)
        } else {
          element = element.replace(/"+/g, '');
          Object.defineProperty(arrayObject, element, {
            value: record[ i + 1 ],
            writable: false
          });
        }


        //  element.forEach(subElement => {
        //   console.log('forEach:', subElement)
        //  })

       }, this);

       // console.log('arrayObject: ', arrayObject);

       return arrayObject;
    }
    // console.log('arrayObject: ',arrayObject)
      if (record.constructor.name === 'Integer') {
        return record.toNumber();
      }

      if (record.constructor.name === 'Path') {
        record.start.identity = this.processInteger(record.start.identity);
        record.end.identity = this.processInteger(record.end.identity);
        record.segments = record.segments.map(segment => {
          segment.start.identity = this.processInteger(segment.start.identity);
          segment.end.identity = this.processInteger(segment.end.identity);

          segment.relationship.identity = this.processInteger(
            segment.relationship.identity
          );
          segment.relationship.start = this.processInteger(
            segment.relationship.start
          );
          segment.relationship.end = this.processInteger(
            segment.relationship.end
          );

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
    }

  private processInteger(integer) {
  if (integer.constructor.name === 'Integer') {
      return integer.toNumber();
  }
  return integer;
  }
}
