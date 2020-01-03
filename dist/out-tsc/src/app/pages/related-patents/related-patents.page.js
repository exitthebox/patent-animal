var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { switchMap } from 'rxjs/Operators';
var RelatedPatentsPage = /** @class */ (function () {
    function RelatedPatentsPage(activatedRoute, neo4j) {
        this.activatedRoute = activatedRoute;
        this.neo4j = neo4j;
    }
    RelatedPatentsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.patentDocument$ = this.activatedRoute.paramMap.pipe(switchMap(function (params) {
            return _this.neo4j.getPatentDoc(params.get('id'));
        })
        // of(console.log(this.patentDocument$))
        );
        this.patentDocument$.subscribe(function (res) { console.log('related patents res:', res); });
    };
    RelatedPatentsPage = __decorate([
        Component({
            selector: 'app-related-patents',
            templateUrl: './related-patents.page.html',
            styleUrls: ['./related-patents.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Neo4jService])
    ], RelatedPatentsPage);
    return RelatedPatentsPage;
}());
export { RelatedPatentsPage };
//# sourceMappingURL=related-patents.page.js.map