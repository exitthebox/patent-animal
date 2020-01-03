var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
var DescriptionsPage = /** @class */ (function () {
    function DescriptionsPage(neo4j, _ref, router) {
        var _this = this;
        this.neo4j = neo4j;
        this._ref = _ref;
        this.router = router;
        this.resultsArray = [];
        this.searchTerm$ = new Subject();
        var desc = 'desc';
        this.neo4j
            .search(this.searchTerm$, desc)
            .subscribe(function (res) {
            /**
             * loop over the response array and pluck out the objects that contain the
             * title, docNumber, and dateGranted.
             */
            res.forEach(function (val, i) {
                _this.combinedObject = Object.assign(res[i][0], res[i][1]);
                _this.resultsArray.push(_this.combinedObject);
                // this.resultsArray.push(res[i][1])
                // console.log('combined Object:', this.combinedObject, ' val: ', val)
            });
            // console.log('this.resultsArray: ', this.resultsArray);
            // Push them into an array
            _this.results = _this.resultsArray;
            // activate detect changes because for some reason Angular wasn't doing this, perhaps its a bug
            _this._ref.detectChanges();
            // reset the worker array so any new keyups will clear the old results on the template.
            _this.resultsArray = [];
        });
    }
    DescriptionsPage.prototype.ngOnInit = function () {
    };
    DescriptionsPage = __decorate([
        Component({
            selector: 'app-descriptions',
            templateUrl: './descriptions.page.html',
            styleUrls: ['./descriptions.page.scss'],
        }),
        __metadata("design:paramtypes", [Neo4jService,
            ChangeDetectorRef,
            Router])
    ], DescriptionsPage);
    return DescriptionsPage;
}());
export { DescriptionsPage };
//# sourceMappingURL=descriptions.page.js.map