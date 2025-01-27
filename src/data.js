// Sample EPG data
const epgData = [
    {
        "name": "Movies",
        "orientation": "landscape",
        "assets": [
            {
                "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
                "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "subtitle": "By Blender Foundation",
                "poster": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
                "title": "Big Buck Bunny"
            },
            {
                "description": "The first Blender Open Movie from 2006",
                "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                "subtitle": "By Blender Foundation",
                "poster": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
                "title": "Elephant Dream"
            },
            {
                "description": "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
                "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
                "subtitle": "By Blender Foundation",
                "poster": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
                "title": "Sintel"
            },
            {
                "description": "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
                "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
                "subtitle": "By Garage419",
                "poster": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
                "title": "Subaru Outback On Street And Dirt"
            },
            {
                "description": "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
                "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
                "subtitle": "By Blender Foundation",
                "poster": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
                "title": "Tears of Steel"
            }
        ]
    },
    {
        "name": "Encrypted",
        "orientation": "landscape",
        "assets": [
            {
                "source": "https://storage.googleapis.com/wvmedia/cenc/h264/tears/tears.mpd",
                "poster": "images/posters/tears.jpg",
                "title": "Tears of Steel",
                "license":"https://proxy.uat.widevine.com/proxy"
            }
        ]
    }
];

export default epgData;