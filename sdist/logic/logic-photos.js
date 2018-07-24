"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhotoSvc {
    constructor(querySvc) {
        this.querySvc = querySvc;
        this.albums = [];
        this.photos = [];
    }
    addPhotosToAlbums(albums, photos) {
        for (let i = 0; i < albums.length; i++) {
            albums[i].photos = [];
            for (let j = 0; j < photos.length; j++) {
                if (albums[i].album_uuid === photos[j].album_uuid) {
                    albums[i].photos.push(photos[j]);
                }
            }
        }
        if (albums.length === 0) {
            throw ('There was nothing in any album!');
        }
        return albums;
    }
    getPhotos(category) {
        if (typeof category === 'string') {
            console.log('this is now the most important test', 'we are insite the logic');
            return this.querySvc.selectSpecificAlbums([category])
                .then(albums => {
                this.albums = albums;
                return this.querySvc.selectAllPhotos();
            })
                .then(photos => {
                this.photos = photos;
                return this.addPhotosToAlbums(this.albums, this.photos);
            });
        }
        else {
            console.log('we are in the general route');
            return this.querySvc.selectAllAlbums()
                .then(albums => {
                this.albums = albums;
                return this.querySvc.selectAllPhotos();
            })
                .then(photos => {
                this.photos = photos;
                return this.addPhotosToAlbums(this.albums, this.photos);
            });
        }
    }
}
exports.default = PhotoSvc;
//# sourceMappingURL=logic-photos.js.map