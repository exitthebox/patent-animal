import { TestBed } from '@angular/core/testing';

import { Neo4jService } from './neo4j.service';

describe('Neo4jService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Neo4jService = TestBed.get(Neo4jService);
    expect(service).toBeTruthy();
  });
});
