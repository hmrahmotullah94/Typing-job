// Typing Job Pro PWA Engine
// Made by Rahmotullah


const CACHE_NAME = "typing-job-pro-v9";


const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./manifest.json",
    "./app.js",
    "./offline.html",

    // Font
    "https://cdn.jsdelivr.net/gh/p90/font-nikosh@master/Nikosh.ttf",
    "https://cdn.jsdelivr.net/gh/atulkumarsingh/fonts@master/SolaimanLipi.ttf"

];


// Install

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});



// Activate

self.addEventListener("activate", event=>{


    event.waitUntil(

        caches.keys().then(keys=>{

            return Promise.all(

                keys.map(key=>{

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            )

        })

    );


    self.clients.claim();


});




// Fetch Offline Support


self.addEventListener("fetch", event=>{


    event.respondWith(

        caches.match(event.request)

        .then(response=>{


            if(response){

                return response;

            }


            return fetch(event.request)

            .catch(()=>{


                return caches.match("./offline.html");


            });


        })

    );


});




// Register Service Worker


if("serviceWorker" in navigator){


window.addEventListener("load",()=>{


navigator.serviceWorker.register("app.js")

.then(()=>{

console.log(
"Typing Job Pro PWA Ready"
);

})


.catch(err=>{

console.log(err);

});


});


}