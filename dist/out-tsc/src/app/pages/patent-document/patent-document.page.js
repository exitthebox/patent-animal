var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { from } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { switchMap } from 'rxjs/Operators';
var PatentDocumentPage = /** @class */ (function () {
    function PatentDocumentPage(activatedRoute, router, neo4j) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.neo4j = neo4j;
    }
    PatentDocumentPage.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.patentDocument$ = this.activatedRoute.paramMap.pipe(switchMap(function (params) { return _this.neo4j.getPatentDoc(params.get('id')); })
        // map((x)=>{
        //   console.log('xxx', x)
        // })
        // of(console.log(this.patentDocument$))
        );
        // this.patentDocument$.subscribe(res => { console.log('res:',  res); } );
        // this.activatedRoute.fragment.subscribe(fragment => { this.fragment = fragment; });
        /**
         * ngx-page-scroll
         * Animated scrolling functionality
         */
        // this.pageScrollService.scroll({
        //   document: this.document,
        //   scrollTarget: 'relatedPatents',
        // });
    };
    PatentDocumentPage.prototype.ngAfterViewInit = function () {
        try {
            document.querySelector('#' + this.fragment).scrollIntoView();
        }
        catch (e) { }
    };
    PatentDocumentPage.prototype.inventorsPatents = function (name) {
        /**
         * TODO: fetch the address for an inventor+patent number, then navigate to
         * a "related inventions" page passing this information and subsequently
         * displaying the titles of each of the patents. Clicking the titles will
         * navigate to the details of the patents.
         */
        // from(this.neo4j.getInventorAddress(this.id, name)).subscribe(val => console.log(name, this.id, val))
        var _this = this;
        // var inventorAddress = '';
        from(this.neo4j.getInventorAddress(this.id, name))
            .subscribe(function (val) {
            _this.inventorAddress = val[0][0];
            // console.log('this.inventorAddress: ', this.inventorAddress);
            _this.router.navigate(['titles', _this.id, name, _this.inventorAddress]);
            // from(this.neo4j.getInventorTitles(name, this.inventorAddress)).pipe(
            // )
            // .subscribe()
        });
        //  console.log(name, this.id, this.inventorAddress)
    };
    PatentDocumentPage = __decorate([
        Component({
            selector: 'app-patent-document',
            templateUrl: './patent-document.page.html',
            styleUrls: ['./patent-document.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            Neo4jService])
    ], PatentDocumentPage);
    return PatentDocumentPage;
}());
export { PatentDocumentPage };
//# sourceMappingURL=patent-document.page.js.map