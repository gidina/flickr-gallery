# Flickr Gallery

Responsive gallery that shows images and videos from a Flickr Gallery.

On image click, a lightbox is opened showing some information of it, such as the owner's username which links to the original post on Flickr.

The gallery is paginated on Desktop resolutions (width > 1047px) showing 8 items per page. On Tablet and mobile resolutions all the images are shown without pagination. In future versions a lazy loading system should be considered.
Desktop breakpoint and items per page are not configurable in this version.

Flick's API endpoints used:
- flickr.galleries.getPhotos: fetch all photos from a gallery
- flickr.photos.getSizes: fetch all available sizes for a photo

Error handling has not been implemented, but it should be more or less this way:
1- flickr.galleries.getPhotos error
2- flickr.photos.getSizes error
3- Unexpected errors

Only tested with Google Chrome v69, Safari v12 and Mozilla Firefox v57. Mozilla Firefox Running in different web browsers or versions may lead to unexpected behaviour.

Known issues:
On Mozilla Firefox v57 the description of the photos is shown completely. The expected behaviour should be showing only first two lines.

### Installing
`
npm install
`

## Getting Started with a Development server

This will start a server running on port 3000 which will reload the app everytime it detects changes on the source code.
The app will be accessible via browser on: http://localhost:3000.

`
npm start
`

## Running the tests

This will run unit tests using Jest in watch mode. (apiCalls file is not tested)

`
npm test
`

## Deployment

This will generate a folder on /dist which contains all the files to deploy the app on a web server.

`
npm run build
`