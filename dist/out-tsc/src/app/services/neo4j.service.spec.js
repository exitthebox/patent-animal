import { TestBed } from '@angular/core/testing';
import { Neo4jService } from './neo4j.service';
describe('Neo4jService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(Neo4jService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=neo4j.service.spec.js.map