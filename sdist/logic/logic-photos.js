"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhotoSvc = /** @class */ (function () {
    function PhotoSvc(querySvc) {
        this.querySvc = querySvc;
        this.albums = [];
        this.photos = [];
    }
    PhotoSvc.prototype.addPhotosToAlbums = function (albums, photos) {
        for (var i = 0; i < albums.length; i++) {
            albums[i].photos = [];
            for (var j = 0; j < photos.length; j++) {
                if (albums[i].album_uuid === photos[j].album_uuid) {
                    albums[i].photos.push(photos[j]);
                }
            }
        }
        if (albums.length === 0) {
            throw ('There was nothing in any album!');
        }
        return albums;
    };
    PhotoSvc.prototype.getPhotos = function () {
        var _this = this;
        return this.querySvc.selectAllAlbums()
            .then(function (albums) {
            _this.albums = albums;
            return _this.querySvc.selectAllPhotos();
        })
            .then(function (photos) {
            _this.photos = photos;
            return _this.addPhotosToAlbums(_this.albums, _this.photos);
        });
    };
    return PhotoSvc;
}());
exports.default = PhotoSvc;
//# sourceMappingURL=logic-photos.js.map