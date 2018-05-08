import QuerySvc from '../data-access/queries'


interface Album {
    id: string;
    title: string;
    date: string;
    description: string;
    album_uuid: string;
    photos?: Photo[];
}
interface Photo {
    id: string;
    album_uuid: string;
    photo_uuid: string;
    photo: string;
}

export default class PhotoSvc {
    querySvc: QuerySvc;
    inputs: {
        test: string;
    }
    albums: Album[];
    photos: Photo[];


    constructor(querySvc) {
        this.querySvc = querySvc
        this.albums = []
        this.photos = []
    }

    addPhotosToAlbums(albums:Album[], photos:Photo[]): Album[] {
        for (let i = 0; i < albums.length; i++) {
            albums[i].photos = []
            for (let j = 0; j < photos.length; j++) {
                if (albums[i].album_uuid === photos[j].album_uuid) {
                    albums[i].photos.push(photos[j])
                }
            }
        }
        if (albums.length === 0) {
            throw ('There was nothing in any album!')
        }
        return albums;
   
    }

    getPhotos():Promise<Album[]> {
        return this.querySvc.selectAllAlbums() 
            .then(albums => {
                this.albums = albums 
                return this.querySvc.selectAllPhotos()
            })
            .then(photos => {
                this.photos = photos
                return this.addPhotosToAlbums(this.albums, this.photos)
            })
    }
} 