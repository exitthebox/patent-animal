var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
// import { toSentenceCase } from 'sentencecase.js';
var SentencecasePipe = /** @class */ (function () {
    function SentencecasePipe() {
    }
    SentencecasePipe.prototype.transform = function (value) {
        return value
            .split(/(\S.+?[.!?])(?=\s+|$)/)
            .filter(function (sentence) { return sentence.length > 0; })
            .map(function (sentence) {
            // console.log('sentence: ', sentence)
            return (sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase());
        })
            .join('');
    };
    SentencecasePipe = __decorate([
        Pipe({ name: 'sentencecase' })
    ], SentencecasePipe);
    return SentencecasePipe;
}());
export { SentencecasePipe };
//# sourceMappingURL=sentencecase.pipe.js.map