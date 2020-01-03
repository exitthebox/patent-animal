var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { map } from 'rxjs/Operators';
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { Subject, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
var TitlesPage = /** @class */ (function () {
    function TitlesPage(neo4j, _ref, router, activatedRoute) {
        var _this = this;
        this.neo4j = neo4j;
        this._ref = _ref;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.resultsArray = [];
        this.searchTerm$ = new Subject();
        this.p = 1;
        this.id = '';
        this.name = '';
        this.address = '';
        this.currentValue = '';
        var title = 'title';
        // this.currentValue = this.searchTerm$.getValue()
        this.neo4j
            .search(this.searchTerm$, title)
            .subscribe(function (res) {
            /**
             * loop over the response array and pluck out the objects that contain the
             * title, docNumber, and dateGranted.
             */
            res.forEach(function (val, i) {
                _this.combinedObject = Object.assign(res[i][0], res[i][1]);
                _this.resultsArray.push(_this.combinedObject);
            });
            // Push them into an array
            _this.results = _this.resultsArray;
            // activate detect changes because for some reason Angular wasn't doing this, perhaps its a bug
            _this._ref.detectChanges();
            // reset the worker array so any new keyups will clear the old results on the template.
            _this.resultsArray = [];
        });
    }
    TitlesPage.prototype.buildTitleList = function (id) {
        var title = 'title';
        // this.searchTerm$ = event;
        // this.neo4j
        //   .search(this.searchTerm$, title)
        //   .subscribe((res: any[]) => {
        //     /**
        //      * loop over the response array and pluck out the objects that contain the
        //      * title, docNumber, and dateGranted.
        //      */
        //     res.forEach((val, i) => {
        //       this.combinedObject = Object.assign(res[i][0], res[i][1]);
        //       this.resultsArray.push(this.combinedObject);
        //       // this.resultsArray.push(res[i][1])
        //       // console.log('combined Object:', this.combinedObject, ' val: ', val)
        //     });
        //     // console.log('this.resultsArray: ', this.resultsArray);
        //     // Push them into an array
        //     this.results = this.resultsArray;
        //     // activate detect changes because for some reason Angular wasn't doing this, perhaps its a bug
        //     this._ref.detectChanges();
        //     // reset the worker array so any new keyups will clear the old results on the template.
        //     this.resultsArray = [];
        //   });
    };
    TitlesPage.prototype.ngOnInit = function () {
        /**
         * Because we use the titles page to show other patents for inventors,
         * we need to receive id, name, and address to fetch the list of other
         * patents the inventors invented
         */
        var _this = this;
        from(this.activatedRoute.snapshot.paramMap.get('id')).pipe(map(function (val) {
            _this.id += val;
        })).subscribe();
        from(this.activatedRoute.snapshot.paramMap.get('name')).pipe(map(function (val) {
            _this.name += val;
        })).subscribe();
        from(this.activatedRoute.snapshot.paramMap.get('address')).pipe(map(function (val) {
            _this.address += val;
        })).subscribe();
        /**
         * After we grab the params values, we need to fetch the array(s)
         * of patent titles
         */
        if (this.id) {
            from(this.neo4j.getInventorTitles(this.name, this.address, 0)).pipe(map(function (res) {
                /**
                 * loop over the response array and pluck out the objects that contain the
                 * title, docNumber, and dateGranted.
                 */
                res.forEach(function (val, i) {
                    _this.combinedObject = Object.assign(res[i][0], res[i][1]);
                    _this.resultsArray.push(_this.combinedObject);
                });
                // Push them into an array
                _this.results = _this.resultsArray;
            })).subscribe();
        }
    };
    TitlesPage.prototype.loadMoreTitles = function (event) {
        //  console.log(this.searchTermInput)
        var _this = this;
        this.searchTerm$ = this.searchTermInput;
        from(this.neo4j.refreshTitlesEntriesList(this.searchTermInput, this.results.length)).pipe(map(function (res) {
            /**
             * loop over the response array and pluck out the objects that contain the
             * title, docNumber, and dateGranted.
             */
            //  console.log('titles.page.ts res: ', res)
            res.forEach(function (val, i) {
                _this.combinedObject = Object.assign(res[i][0], res[i][1]);
                _this.results.push(_this.combinedObject);
                // i++;
            });
            // console.log('this.resultsArray: ', this.resultsArray)
            // Push them into an array
            // this.results.push(this.resultsArray);
            //  console.log('this.results: ', this.results)
        })).subscribe();
        event.target.complete();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TitlesPage.prototype, "searchTermInput", void 0);
    TitlesPage = __decorate([
        Component({
            selector: 'app-titles',
            templateUrl: './titles.page.html',
            styleUrls: ['./titles.page.scss']
        }),
        __metadata("design:paramtypes", [Neo4jService,
            ChangeDetectorRef,
            Router,
            ActivatedRoute])
    ], TitlesPage);
    return TitlesPage;
}());
export { TitlesPage };
//# sourceMappingURL=titles.page.js.map