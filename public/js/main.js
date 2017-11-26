require("./triangles");
require('../css/style.css');
require('../images/logoMarkerDark.svg');
require('../images/logoMarkerLight.svg');

// console art / info
var logoText = '\n' +
    '                              ..                            \n' +
    '                        `/ohNMMNho:`                        \n' +
    '                   `:ohNMMMMMMMMMMMMNho:`                   \n' +
    '               -+ymMMMMMMMMMMNNMMMMMMMMMMmy+-               \n' +
    '          ./sdMMMMMMMMMMMdy/.  -+ydMMMMMMMMMMMds/.          \n' +
    '     `:ohNMMMMMMMMMMmy+-`          `-+ymMMMMMMMMMMNho:`     \n' +
    ' `oymMMMMMMMMMMNho:`         ..         `:ohNMMMMMMMMMMmyo` \n' +
    ' .MMMMMMMMNds/.         `:ohNMMNho:`         ./sdNMMMMMMMM. \n' +
    ' .MMMMMm+-         `-+ymMMMMMMMMMMMMmy+-`         -/mMMMMM. \n' +
    ' .MMMMMh       -+ymMMMMMMMMMMMMMMMMMMMMMMmy+-       hMMMMM. \n' +
    ' .MMMMMh     yNMMMMMMMMMMNho:``:ohNMMMMMMMMMMNd     hMMMMM. \n' +
    ' .MMMMMh     dMMMMMMNho:.          .:ohNMMMMMMM     hMMMMM. \n' +
    ' .MMMMMh     dMMMMM-                    -MMMMMM     hMMMMM. \n' +
    ' .MMMMMh     dMMMMM`                    `MMMMMM     hMMMMM. \n' +
    ' .MMMMMh     dMMMMM-                    `MMMMMM/////mMMMMM. \n' +
    ' .MMMMMh     dMMMMMMNds/-               `MMMMMMMMMMMMMMMMM. \n' +
    ' .MMMMMh     dMMMMMMMMMMMMdy+-`         `MMMMMMMMMMMMMMMMM. \n' +
    ' .MMMMMh      ./ohNMMMMMMMMMMMMmyo:`    .hhhhhhhhhhhhhhhhh. \n' +
    ' .MMMMMh           `:oymMMMMMMMMMMMMNho/.                   \n' +
    ' .MMMMMh                `-+sdMMMMMMMMMMMMNds/.                                Made with 💙 by Sam Craig\n' +
    ' .MMMMMh                      ./shNMMMMMMMMMMMd             \n' +
    ' .MMMMMh     hNNNNN`               `:oymMMMMMMd     hNNNNN` \n' +
    ' .MMMMMh     dMMMMM`                    `mMMMMd     hMMMMM. \n' +
    ' .MMMMMh     dMMMMM`                     mMMMMd     hMMMMM. \n' +
    ' .MMMMMh     dMMMMM-                    .NMMMMd     hMMMMM. \n' +
    ' .MMMMMh     dMMMMMMNho:.          .:ohNMMMMMMd     hMMMMM. \n' +
    ' .MMMMMh     sNMMMMMMMMMMNho:``:ohNMMMMMMMMMMNs     hMMMMM. \n' +
    ' .MMMMMh       ./sdMMMMMMMMMMMMMMMMMMMMMMds/.       hMMMMM. \n' +
    ' .MMMMMm+-          -+ymMMMMMMMMMMMMmy+-          -+mMMMMM. \n' +
    ' .MMMMMMMMMds/.         `:ohNMMNho:`         ./sdMMMMMMMMM. \n' +
    ' `+ymMMMMMMMMMMNho:`         ..         `:ohNMMMMMMMMMMmy+` \n' +
    '     `:ohNMMMMMMMMMMmho:`          `:ohmMMMMMMMMMMNho:`     \n' +
    '          ./sdMMMMMMMMMMMmy+-  -+ymMMMMMMMMMMMds/.          \n' +
    '               -+ymMMMMMMMMMMMMMMMMMMMMMMdy+-               \n' +
    '                   `:oymMMMMMMMMMMMMmyo:                    \n' +
    '                        `:ohNMMNho:`                        \n' +
    '                             ..                             '


console.log(logoText);

var app = angular.module('app', ['ngRoute']);

function isEventSupported(eventName) {
    var el = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] === 'function';
    }
    el = null;
    return isSupported;
}

// var DOMEvents = {
//     UIEvent: "abort DOMActivate error load resize scroll select unload",
//     ProgressEvent: "abort error load loadend loadstart progress progress timeout",
//     Event: "abort afterprint beforeprint cached canplay canplaythrough change chargingchange chargingtimechange checking close dischargingtimechange DOMContentLoaded downloading durationchange emptied ended ended error error error error fullscreenchange fullscreenerror input invalid languagechange levelchange loadeddata loadedmetadata noupdate obsolete offline online open open orientationchange pause pointerlockchange pointerlockerror play playing ratechange readystatechange reset seeked seeking stalled submit success suspend timeupdate updateready visibilitychange volumechange waiting",
//     AnimationEvent: "animationend animationiteration animationstart",
//     AudioProcessingEvent: "audioprocess",
//     BeforeUnloadEvent: "beforeunload",
//     TimeEvent: "beginEvent endEvent repeatEvent",
//     OtherEvent: "blocked complete upgradeneeded versionchange",
//     FocusEvent: "blur DOMFocusIn  Unimplemented DOMFocusOut  Unimplemented focus focusin focusout",
//     MouseEvent: "click contextmenu dblclick mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup show",
//     SensorEvent: "compassneedscalibration Unimplemented userproximity",
//     OfflineAudioCompletionEvent: "complete",
//     CompositionEvent: "compositionend compositionstart compositionupdate",
//     ClipboardEvent: "copy cut paste",
//     DeviceLightEvent: "devicelight",
//     DeviceMotionEvent: "devicemotion",
//     DeviceOrientationEvent: "deviceorientation",
//     DeviceProximityEvent: "deviceproximity",
//     MutationNameEvent: "DOMAttributeNameChanged DOMElementNameChanged",
//     MutationEvent: "DOMAttrModified DOMCharacterDataModified DOMNodeInserted DOMNodeInsertedIntoDocument DOMNodeRemoved DOMNodeRemovedFromDocument DOMSubtreeModified",
//     DragEvent: "drag dragend dragenter dragleave dragover dragstart drop",
//     GamepadEvent: "gamepadconnected gamepaddisconnected",
//     HashChangeEvent: "hashchange",
//     KeyboardEvent: "keydown keypress keyup",
//     MessageEvent: "message message message message",
//     PageTransitionEvent: "pagehide pageshow",
//     PopStateEvent: "popstate",
//     StorageEvent: "storage",
//     SVGEvent: "SVGAbort SVGError SVGLoad SVGResize SVGScroll SVGUnload",
//     SVGZoomEvent: "SVGZoom",
//     TouchEvent: "touchcancel touchend touchenter touchleave touchmove touchstart",
//     TransitionEvent: "transitionend",
//     WheelEvent: "wheel"
// }
//
// var RecentlyLoggedDOMEventTypes = {};
//
// for (DOMEvent in DOMEvents) {
//
//     var DOMEventTypes = DOMEvents[DOMEvent].split(' ');
//
//     DOMEventTypes.filter(function (DOMEventType) {
//         var DOMEventCategory = DOMEvent + ' ' + DOMEventType;
//         document.addEventListener(DOMEventType, function (e) {
//             if (RecentlyLoggedDOMEventTypes[DOMEventCategory]) return;
//             RecentlyLoggedDOMEventTypes[DOMEventCategory] = true;
//             setTimeout(function () {
//                 RecentlyLoggedDOMEventTypes[DOMEventCategory] = false
//             }, 5000);
//             var isActive = e.target == document.activeElement;
//             if (isActive) {
//                 console.info(DOMEventCategory,
//                     ' target=', e.target,
//                     ' active=', document.activeElement,
//                     ' isActive=', true);
//             } else {
//                 console.log(DOMEventCategory,
//                     ' target=', e.target,
//                     ' active=', document.activeElement,
//                     ' isActive=', false);
//             }
//
//         }, true);
//     });
//
// }

// configure our routes
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: '../views/home.html',
            resolve: transitionDelay
        })
        .when('/about', {
            templateUrl: '../views/about.html',
            resolve: transitionDelay
        })
        .when('/skills', {
            templateUrl: '../views/skills.html',
            resolve: transitionDelay
        })
        .when('/work', {
            templateUrl: '../views/work.html',
            resolve: transitionDelay
        })
        .when('/contact', {
            templateUrl: '../views/contact.html',
            resolve: transitionDelay
        });


    $locationProvider.html5Mode(true);
})

// delay between view changes to allow for animation & load time
var transitionDelay = {
    delay: function ($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 2000);
        return delay.promise;
    }
}

app.controller('view', function ($scope, $location, $timeout, $window) {

    $timeout(function () {

        //------------------------------
        // Home Page Animation Sequence
        //------------------------------
        var outline = document.querySelector('.site-loader'), //        || loading border animation (left & bottom)
            topBorder = outline.querySelector('.line.top'),
            rightBorder = outline.querySelector('.line.right'),
            slider = document.querySelector('.transition-sliders');//   || slider animation following border collapse

        var tl = new TimelineLite({paused: true});

        tl.timeScale(.8)
            .add(function () {
                outline.classList.add('active')
            })
            // start to expand width and height of bottom / left border
            .to(outline, 0.8, {width: '100%', height: '100%', ease: Quad.easeIn})
            //.to(_outline, 0.8, {width: '110%', height: '110%', ease: Expo.easeOut})
            .to(topBorder, 0.8, {width: '102%', ease: Expo.easeOut})
            .to(rightBorder, 0.8, {height: '102%', ease: Expo.easeOut}, '-=.8')
            .add(function () {
                outline.style.borderTop = '8px solid transparent';
                outline.style.borderRight = '8px solid transparent'
            })
            // after pseudo top & right lines animations are complete, hide to reveal proper borders introduced above
            .to(topBorder, 0.1, {visibility: 'hidden'})
            .to(rightBorder, 0.1, {visibility: 'hidden'}, '-=.1')
            .to(outline, 0.5, {borderWidth: 0})
            // visibility withheld to prevent pre-rendering with high refresh rate
            .to(slider, 1, {visibility: 'visible'}, 'shutterStart')
            .add(function () {
                slider.classList.add('active');
            }, 'shutterStart-=0.5')
            // update angular view instance
            .add(function () {
                $scope.updateView();
            })
            // hide site loader to prevent masking
            .add(function () {
                outline.style.visibility = 'hidden';
                outline.classList.remove('active');
            }, 'shutterStart+=0.5')
            // reveal background
            .add(function () {
                document.getElementById('background').classList.add('active');
                document.querySelector('.nav-bottom').classList.remove('paused');
                document.querySelector('.nav-top').classList.remove('paused');
            }, 'shutterStart+=1.8')
            // reveal nav bars
            // .to(document.querySelectorAll('nav'), 1, {animationPlayState: 'running'}, 'shutterStart+=1.8')
            // .to(document.querySelectorAll('nav'), 1, {WebkitAnimationPlayState: 'running'}, 'shutterStart+=1.8')
            // reveal nav icons
            .to(document.querySelectorAll('.nav-icon'), 1, {opacity: 1}, 'shutterStart+=3.3')
            // hide transition sliders
            .to(slider, 1, {visibility: 'hidden'}, 'shutterStart+=3.0')
            // reveal light mode button
            .add(function () {
                document.getElementById('light-mode').classList.add('active');
            }, 'shutterStart+=3.1')
        tl.play();

        //------------------------------
        // Angular Scope Variables
        //------------------------------

        $scope.currentView = $location.path();
        $scope.currentViewEl = function () {
            return document.getElementById('view-container')
        }
        $scope.hasChangedView = false;
        $scope.referrer = '';
        $scope.mobileWidth = 768;
        $scope.isDark = function () {
            return (localStorage.getItem('color') === 'dark')
        };

        //------------------------------
        // Flat Surface Shader (modified)
        //------------------------------

        (function () {

            var isDark = $scope.isDark();

            //------------------------------
            // Mesh Properties
            //------------------------------

            var MESH = {
                width: 1.2,
                height: 1.2,
                slices: 250
            };

            //------------------------------
            // Light Properties
            //------------------------------
            var LIGHT = {
                count: 1,
                xPos: 0,
                yPos: 200,
                zOffset: 100,
                pickedup: true,
                proxy: false,
                currIndex: 0
            };

            var setBGColor = function () {

                if (isDark) {
                    MESH.ambient = '#4c4f65';
                    MESH.diffuse = '#ffffff';
                    LIGHT.ambient = '#1c1d25';
                    LIGHT.diffuse = '#4c4f65';

                } else {
                    MESH.ambient = '#ffffff';
                    MESH.diffuse = '#4c4f65';
                    LIGHT.ambient = '#D8D8D8';
                    LIGHT.diffuse = '#D8D8D8';
                }
            }

            setBGColor();


            //------------------------------
            // Global Properties
            //------------------------------

            var center = FSS.Vector3.create();
            var container = document.getElementById('background')
            var output = document.getElementById('output');
            var renderer, scene, mesh, geometry, material,
                canvasRenderer, light;

            //------------------------------
            // Methods
            //------------------------------
            function initialise() {
                createRenderer();
                createScene();
                createMesh();
                addLight();
                addEventListeners();
                resize(container.offsetWidth, container.offsetHeight);
                animate();
            }

            function createRenderer() {
                canvasRenderer = new FSS.CanvasRenderer();
                if (renderer) {
                    output.removeChild(renderer.element);
                }
                renderer = canvasRenderer
                renderer.setSize(container.offsetWidth, container.offsetHeight);
                output.appendChild(renderer.element);
            }

            function createScene() {
                scene = new FSS.Scene();
            }

            function createMesh() {
                scene.remove(mesh);
                renderer.clear();
                geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.slices);
                material = new FSS.Material(MESH.ambient, MESH.diffuse);
                mesh = new FSS.Mesh(geometry, material);
                scene.add(mesh);
            }

            // Add a single light
            function addLight() {
                renderer.clear();
                light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
                light.ambientHex = light.ambient.format();
                light.diffuseHex = light.diffuse.format();
                light.setPosition(LIGHT.xPos, LIGHT.yPos, LIGHT.zOffset);
                scene.add(light);
                LIGHT.proxy = light;
                LIGHT.pickedup = true;
                LIGHT.currIndex++;
            }

            // Resize canvas
            function resize(width, height) {
                renderer.setSize(width, height);
                FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
                createMesh();
            }

            function animate() {
                render();
                requestAnimationFrame(animate);
            }

            function render() {
                renderer.render(scene);
            }

            function addEventListeners() {
                window.addEventListener('resize', onWindowResize);
                window.addEventListener('mousemove', onMouseMove);
                document.getElementById('light-mode').addEventListener('click', function () {
                    isDark = !isDark;
                    setBGColor();
                    createRenderer();
                    createScene();
                    createMesh();
                    addLight();
                });
            }

            //------------------------------
            // Callbacks
            //------------------------------

            function onWindowResize() {
                resize(container.offsetWidth, container.offsetHeight);
                render();
            }

            function onMouseMove(event) {
                if (LIGHT.pickedup) {
                    LIGHT.xPos = event.x - renderer.width / 2;
                    LIGHT.yPos = renderer.height / 2 - event.y;
                    LIGHT.proxy.setPosition(LIGHT.xPos, LIGHT.yPos, LIGHT.proxy.position[2]);
                }
            }

            // Let there be light!
            initialise();

        })();

        $scope.changeView = function (route) {

            $scope.hasChangedView = true;

            // change view specific animations
            document.getElementById('light-mode').classList.remove('active');
            document.getElementById('background').classList.add('transition');

            // only change view if current view and selected view are different
            if (!($scope.currentView === '/' + route)) {

                //------------------------------
                // Transition Animations
                //------------------------------

                var navBanners = document.getElementsByTagName('NAV'),
                    viewChildren = document.getElementById('view-container').childNodes,
                    transitionSliders = document.querySelector('.transition-sliders');

                for (var c = 0; c < viewChildren.length; c++) {
                    viewChildren[c].classList.remove('active');
                }

                for (var b = 0; b < navBanners.length; b++) {
                    navBanners[b].classList.remove('in');
                    navBanners[b].classList.add('out');
                }

                // show sliders before animation start
                transitionSliders.style.visibility = 'visible';
                // hide sliders after animation is complete
                $timeout(function () {
                    document.querySelector('.transition-sliders').style.visibility = 'hidden';
                }, 2600); // last slider leaves frame after 2.6s (1.9s duration + .7s delay)
                transitionSliders.classList.toggle('active');

                // set uri reference for view specific animations
                $scope.referrer = $location.path();

                // redirect to new url to initiate view change
                $location.path('/' + route);
                // set the current route for reference for view comparison check
                $scope.currentView = '/' + route;
                // exit animations
                var viewChildrenNew = document.getElementById('view-container').childNodes;

                for (var n = 0; n < viewChildrenNew.length; n++) {
                    viewChildrenNew[n].classList.add('exit');
                }
            }
        }

        // light mode color swapping

        // nav elements are static, no need to iterate and adjust for length
        var navIcons = document.querySelectorAll('.nav-icon'),
            navBanners = document.querySelectorAll('nav');

        //view elements will change and are updated in the $viewContentLoaded handler

        $scope.elementsToToggle =
            [
                document.getElementById('background'),
                document.getElementById('sun'),
                document.getElementById('moon'),
                document.querySelector('.transition-sliders'),
                document.body
            ]

        $scope.toggleColors = function () {
            if (document.getElementById('map') !== null) $scope.updateMap();

            for (var i = 0; i < $scope.elementsToToggle.length; i++) {
                $scope.elementsToToggle[i].classList.toggle('dark');
            }
            for (var n = 0; n < navIcons.length; n++) {
                navIcons[n].classList.toggle('dark');
            }
            for (var b = 0; b < navBanners.length; b++) {
                navBanners[b].classList.toggle('dark');
            }

            if (!($scope.currentViewEl() === null || $scope.currentViewEl() === undefined)) $scope.toggleViewColors();
        }

        $scope.toggleViewColors = function () {
            var currentViewEl = $scope.currentViewEl();
            for (var v = 0; v < currentViewEl.childNodes.length; v++) {
                currentViewEl.childNodes[v].classList.toggle('dark');
            }
        }

        var shakeCounter = 0,
            prevMouseX = 0,
            leftPeak = 0,
            rightPeak = 0,
            rightPeakReached = false,
            shakeDistance = 500,
            shakesToTrigger = 7;

        window.onmousemove = function (e) {
            e = e || window.event;
            var mouseX = e.clientX;

            // mouse is moving right
            if (mouseX > prevMouseX) {
                rightPeak = mouseX;
                if (rightPeak - leftPeak >= shakeDistance && !rightPeakReached) {
                    rightPeakReached = true;
                    shakeCounter++;
                }
                // mouse is moving left
            } else {
                leftPeak = mouseX;
                if (rightPeak - leftPeak >= shakeDistance && rightPeakReached) {
                    rightPeakReached = false;
                    shakeCounter++;
                }
            }

            // trigger light mode change
            if (shakeCounter >= shakesToTrigger) {
                shakeCounter = 0;
                document.getElementById('light-mode').dispatchEvent(new Event('click'));
            }

            prevMouseX = mouseX

            // if the user has not moved their mouse within the last 100ms, 'shakeCounter' is reset
            clearTimeout(this.shakeDecayDelay);

            this.shakeDecayDelay = setTimeout(function () {
                shakeCounter = 0;
            }, 100);
        };

        document.getElementById('light-mode').addEventListener('click', function () {
            if (localStorage.getItem('color') === null) {
                localStorage.setItem('color', 'dark');
            } else {
                localStorage.removeItem('color');
            }
            $scope.toggleColors();
        })

        if (localStorage.getItem('color') === 'dark' && !$scope.hasChangedView) {
            $scope.toggleColors();
        }

        //------------------------------
        // Mobile Style Handler
        //------------------------------

        function adjustNavBars() {

            var navBars = document.getElementsByTagName('NAV');

            if ($location.path() !== '/contact') {
                if (window.innerWidth <= $scope.mobileWidth) {
                    navBars[0].classList.add('flat');
                    navBars[1].classList.add('flat');
                } else {
                    navBars[0].classList.remove('flat');
                    navBars[1].classList.remove('flat');
                }
            }
        }

        adjustNavBars();
        window.addEventListener('resize', adjustNavBars);
    }, 0)

    $scope.updateView = function () {
        var viewChildrenNew = document.getElementById('view-container').childNodes;
        for (var n = 0; n < viewChildrenNew.length; n++) {
            viewChildrenNew[n].classList.add('active', 'active-f');
            if (localStorage.getItem('color') === 'dark')
                viewChildrenNew[n].classList.add('dark');
        }
    }

    // current map style will reflect user light mode when updated

    var styleLight = [
        {
            "featureType": "administrative.locality",
            "stylers": [
                {
                    "hue": "#2c2e33"
                },
                {
                    "saturation": 7
                },
                {
                    "lightness": 19
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "hue": "#ffffff"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "hue": "#ffffff"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 100
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#bbc0c4"
                },
                {
                    "saturation": -93
                },
                {
                    "lightness": 31
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#bbc0c4"
                },
                {
                    "saturation": -93
                },
                {
                    "lightness": 31
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#bbc0c4"
                },
                {
                    "saturation": -93
                },
                {
                    "lightness": -2
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#d3e8f8"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#e9ebed"
                },
                {
                    "saturation": -90
                },
                {
                    "lightness": -8
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "color": "#edf0f4"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#4c4f65"
                }
            ]
        }
    ]

    var styleDark = [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1D71B8"
                },
                {
                    "lightness": 10
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1D71B8"
                },
                {
                    "lightness": 35
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1C1D25"
                }
            ]
        }
    ]

    $scope.style = function () {
        return ($scope.isDark()) ? styleDark : styleLight;
    };

    // google maps marker will reflect respective light mode when updated
    $scope.mapMarker = function () {
        return ($scope.isDark()) ? 'images/logoMarkerDark.svg' : 'images/logoMarkerLight.svg';
    };


    // angular view callback load function, anything regarding manipulation of the...
    // different views is handled here
    $scope.$on('$viewContentLoaded', function () {

        $timeout(function () {

            function adjustViewSliderAnimations() {

                var bodies = document.querySelectorAll('.header.body'),
                    covers = document.querySelectorAll('.cover');

                for (var b = 0; b < bodies.length; b++) {
                    var bodyHeight = parseInt(window.getComputedStyle(bodies[b], null).getPropertyValue('height'));
                    bodies[b].parentNode.style.height = bodyHeight - (bodyHeight * 0.05) + 'px';
                    console.log(bodyHeight - (bodyHeight * 0.05) + 'px');
                }
                for (var c = 0; c < covers.length; c++) {
                    var coverParent = covers[c].parentNode,
                        coverHeight = parseInt(window.getComputedStyle(coverParent,  null).getPropertyValue('height')),
                        coverWidth = parseInt(window.getComputedStyle(coverParent,  null).getPropertyValue('width'));

                    covers[c].style.height = coverHeight + (coverHeight * 0.05) + 'px';
                    covers[c].style.width = coverWidth + (coverWidth * 0.05) + 'px';
                    covers[c].style.top = (window.innerWidth <= 768) ? coverHeight * -0.1 + 'px' : coverHeight * 0.1 + 'px';
                    console.log(coverHeight + (coverHeight * 0.05) + 'px', coverWidth + (coverWidth * 0.05) + 'px');
                }
            }

            adjustViewSliderAnimations();
            $window.addEventListener('resize', adjustViewSliderAnimations);

            if (localStorage.getItem('color') === 'dark' && !$scope.hasChangedView) {
                $scope.toggleViewColors();
            }

            var navBanners = document.querySelectorAll('nav');
            if ($scope.hasChangedView) {
                for (var b = 0; b < navBanners.length; b++) {
                    navBanners[b].classList.remove('out');
                    navBanners[b].classList.add('in');
                    if (window.outerWidth <= $scope.mobileWidth) navBanners[b].classList.add('flat');
                }
            }

            // set active nav icon
            var navBotIcons = document.querySelector('.nav-wrapper.bot').childNodes;
            for (var i = 0; i < navBotIcons.length; i++) {
                navBotIcons[i].classList.remove('active')
            }

            var currentRoute = $scope.currentView.slice(1, $scope.currentView.length);
            if (currentRoute === '') currentRoute = 'home';
            document.querySelector('.' + currentRoute).classList.add('active');

            // 'contact' specific element manipulations
            var navWrap = document.querySelectorAll('nav'),
                lightMode = document.getElementById('light-mode');

            // skills route handler
            if ($location.path() === '/skills') {

                (function () {
                    var styleTop = (window.innerWidth <= 768) ? '-42vh' : '-40vh';

                    document.getElementById('skill-wrap').style.cssText = 'top:' + styleTop + ' !important;left:0vw !important';
                })();

                $scope.activeSkills = [];
                $scope.totalSkills = [
                    'MongoDB',
                    'npm',
                    'Express',
                    'Node.js',
                    'Git',
                    'Angular',
                    'React',
                    'Redux',
                    'SCSS',
                    'CSS 3',
                    'JavaScript',
                    'jQuery',
                    'JSX',
                    'Webpack',
                    'HTML 5',
                    'MySQL',
                    'REST',
                    'Jade',
                    'AJAX'
                ];

                // any set of 7 skills will be displayed relative to their order above,
                // seemlessly matching once end of the array is met (on scroll)

                var sMax = $scope.totalSkills.length - 1; // 0 -> 17

                $scope.activeStart = Math.floor(Math.random() * (sMax + 1));
                $scope.activeEnd = ($scope.activeStart === 0) ? sMax : $scope.activeStart - 1;

                for (var e = $scope.activeStart; e <= sMax; e++) {
                    $scope.activeSkills.push($scope.totalSkills[e]);
                }

                if ($scope.activeStart !== 0) {
                    for (var s = 0; s <= $scope.activeEnd; s++) {
                        $scope.activeSkills.push($scope.totalSkills[s]);
                    }
                }

                var scrollDis = 0,
                    scrollingDown = false,
                    scrollingUp = false,
                    scrollingDownSelf = false,
                    scrollingUpSelf = false,
                    scrollCatchInterval = 40,
                    scrollDirection = 'up',
                    hasScrolledRecently = false;

                $timeout(function () {
                    // 4th skill in active view window is scaled and highlighted
                    document.getElementById('skill-wrap').childNodes[17].classList.add('active');
                }, 2000)

                const topStart = -40;
                const leftStart = 0;

                // check if user is still in the Stone Age
                var wheelEvent = isEventSupported('wheel') ? 'wheel' : 'mousewheel';

                window.addEventListener(wheelEvent, function (e) {

                    if ($location.path() === '/skills') {

                        var skillWrap = document.getElementById('skill-wrap'),
                            skillFocused = skillWrap.childNodes[17];

                        skillFocused.classList.remove('active');

                        function animateScroll(scrollDis, callback) {
                            var curTop = parseFloat(skillWrap.style.top),
                                curLeft = parseFloat(skillWrap.style.left),
                                curLeftTop = (window.innerWidth <= 768) ? curTop + (scrollDis * 7) : curTop + (scrollDis * 8),
                                curLeftFinal = (window.innerWidth <= 768) ? 0 : curLeft + (-(scrollDis) * 4);
                            tween(skillWrap, {
                                top: curLeftTop,
                                left: curLeftFinal
                            }, 1, callback, Quad_easeInOut);
                        }

                        function scrollUp() {
                            $timeout(function () {
                                for (var su = 0; su < scrollDis; su++) {

                                    $scope.activeEnd--
                                    $scope.activeStart--
                                    if ($scope.activeEnd < 0) $scope.activeEnd = 17;
                                    if ($scope.activeStart < 0) $scope.activeStart = 17;

                                    $scope.activeSkills.unshift($scope.totalSkills[$scope.activeStart]);
                                    $scope.activeSkills.pop();

                                }
                                skillFocused.classList.add('active');
                                var styleTop = (window.innerWidth <= 768) ? '-42vh' : topStart + 'vh';
                                var styleLeft = (window.innerWidth <= 768) ? skillWrap.style.left + 'vw' : leftStart + 'vw';
                                skillWrap.style.cssText = 'top:' + styleTop + ' !important;left:' + styleLeft + '!important';
                                scrollDis = 0;
                                scrollingUp = false;
                                scrollingUpSelf = false;
                                if (e.deltaZ === 0) {
                                    $timeout(function () {
                                        hasScrolledRecently = false;
                                    }, 3000);
                                }
                            }, 0)
                        }

                        function scrollDown() {
                            $timeout(function () {
                                for (var sd = 0; sd < Math.abs(scrollDis); sd++) {

                                    $scope.activeEnd++
                                    $scope.activeStart++
                                    if ($scope.activeEnd > 17) $scope.activeEnd = 0;
                                    if ($scope.activeStart > 17) $scope.activeStart = 0;

                                    $scope.activeSkills.push($scope.totalSkills[$scope.activeEnd]);
                                    $scope.activeSkills.shift();

                                }
                                skillFocused.classList.add('active');
                                var styleTop = (window.innerWidth <= 768) ? '-42vh' : topStart + 'vh';
                                var styleLeft = (window.innerWidth <= 768) ? skillWrap.style.left + 'vw' : leftStart + 'vw';
                                skillWrap.style.cssText = 'top:' + styleTop + ' !important;left:' + styleLeft + '!important';
                                scrollDis = 0;
                                scrollingDown = false;
                                scrollingDownSelf = false;
                                if (e.deltaZ === 0) {
                                    $timeout(function () {
                                        hasScrolledRecently = false;
                                    }, 3000);
                                }
                            }, 0)
                        }

                        if ((e.deltaY === 100 || e.deltaY === 3) && !scrollingUp && !scrollingDownSelf) { // (scroll down) add skill to bottom & remove skill from top
                            scrollDirection = 'down';
                            scrollDis--;
                            scrollingDown = true;
                            if (e.deltaZ === 0) hasScrolledRecently = true;
                            var scd = scrollDis;
                            $timeout(function () {
                                if (scrollDis === scd) {
                                    if (scrollDis < -6) scrollDis = -6;
                                    scrollingDownSelf = true;
                                    animateScroll(scrollDis, scrollDown);
                                }
                            }, scrollCatchInterval)
                        } else if ((e.deltaY === -100 || e.deltaY === -3) && !scrollingDown && !scrollingUpSelf) { // (scroll up) add skill to top & remove skill from bottom
                            scrollDirection = 'up';
                            scrollDis++;
                            scrollingUp = true;
                            if (e.deltaZ === 0) hasScrolledRecently = true;
                            var scu = scrollDis;
                            $timeout(function () {
                                if (scrollDis === scu) {
                                    if (scrollDis > 5) scrollDis = 5;
                                    scrollingUpSelf = true;
                                    animateScroll(scrollDis, scrollUp);
                                }
                            }, scrollCatchInterval)
                        }
                    }
                });

                function constantScroll() {
                    // prevents scrolling while changing views
                    if ($scope.currentView === '/skills') {
                        $timeout(function () {

                            // emulate scrolling of the skill list
                            var scrollEvent = new WheelEvent('wheel', {
                                'deltaY': (scrollDirection === 'up') ? -100 : 100,
                                'deltaZ': 1 // used to differentiate between user scroll / programmatic scroll
                            });

                            if (!hasScrolledRecently) {
                                // 3 scroll events are dispatched to mirror scrolling of 3 skills
                                for (var r = 0; r < 3; r++) {
                                    window.dispatchEvent(scrollEvent);
                                }

                            }
                            constantScroll();
                        }, 3000)
                    }
                }


                // wait 3 seconds before issuing first scroll
                $timeout(function () {
                    constantScroll();
                }, 3000)
            }

            //work route handler
            // if($location.path() === '/work'){
            //
            //     var workPanels = document.getElementsByClassName('work-panel');
            //
            //     for (var p = 0; p < workPanels.length; p++){
            //         workPanels[p].addEventListener('click', function(e){
            //             var clickedPanel = this;
            //             console.log(clickedPanel)
            //             for (var p = 0; p < workPanels.length; p++){
            //                 workPanels[p].classList.remove('active');
            //                 console.log((workPanels[p] === clickedPanel));
            //                 if (workPanels[p] === clickedPanel)
            //                     workPanels[p].classList.add('active');
            //             }
            //         })
            //     }
            // }

            // contact route handler
            if ($location.path() === '/contact') {

                //contact input vars
                var email = document.getElementById('email'),
                    name = document.getElementById('name'),
                    te = document.getElementById('text-area'),
                    submit = document.getElementById('submit');

                // contact form input animation

                var contactInputs = document.querySelectorAll('input, textarea');

                for (var c = 0; c < contactInputs.length - 1; c++) {
                    contactInputs[c].addEventListener('focus', function (e) {
                        e.target.nextSibling.classList.add('focus');
                    });
                    contactInputs[c].addEventListener('blur', function (e) {
                        e.target.nextSibling.classList.remove('focus');
                    });
                }

                function checkIfFormComplete() {
                    if (email.exists && name.exists && te.exists)
                        submit.classList.remove('error');
                    else
                        submit.classList.add('error');
                }

                // email input validation
                email.addEventListener('keyup', function () {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(email.value)) {
                        email.nextSibling.classList.remove('error', 'focus');
                        email.exists = true;
                    }
                    else {
                        email.nextSibling.classList.add('error', 'focus');
                        email.exists = false
                    }
                    checkIfFormComplete();
                });

                // name input validation
                name.addEventListener('keyup', function () {
                    if (name.value.length > 0) {
                        name.nextSibling.classList.remove('error', 'focus');
                        name.exists = true;
                    }
                    else {
                        name.nextSibling.classList.add('error', 'focus');
                        name.exists = false;
                    }
                    checkIfFormComplete();
                });

                // text area input validation
                te.addEventListener('keyup', function () {
                    if (te.value.length > 0) {
                        te.nextSibling.classList.remove('error', 'focus');
                        te.exists = true;
                    }
                    else {
                        te.nextSibling.classList.add('error', 'focus');
                        te.exists = false;
                    }
                    checkIfFormComplete();
                });

                document.getElementById('contact').addEventListener('submit', function (e) {
                    var dataArray = e.target.childNodes,
                        dataSuccess = true;
                    for (var i = 0; i < dataArray.length - 1; i++) {
                        var inputVal = dataArray[i].childNodes[0].value,
                            inputLabel = dataArray[i].childNodes[1];
                        if (inputVal.length === 0) {
                            dataSuccess = false;
                            inputLabel.classList.add('error', 'focus');
                        }
                    }
                    if (dataSuccess) {
                        var xhr = new XMLHttpRequest();
                        xhr.open(e.method, '/contact', true);
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && xhr.status === 200) { // request sent & callback received
                            } else {
                            }
                        }

                        xhr.send(new FormData(e));
                    }
                });

                navWrap[0].classList.add('flat'); // top nav
                navWrap[1].classList.add('flat'); // bottom nav
                lightMode.classList.add('contact'); // light mode

                var uluru = {lat: 27.791959, lng: -82.723924};

                var map = new google.maps.Map(document.getElementById('map'), {
                    backgroundColor: 'transparent',
                    zoom: 6,
                    center: uluru,
                    disableDefaultUI: true,
                    styles: $scope.style()
                });

                // update map style on light mode change
                $scope.updateMap = function () {
                    map.setOptions({
                        backgroundColor: 'transparent',
                        zoom: 6,
                        center: uluru,
                        disableDefaultUI: true,
                        styles: $scope.style()
                    });
                    marker.setOptions({
                        position: uluru,
                        map: map,
                        icon: $scope.mapMarker()
                    })
                }

                var contentString =
                    '<div id="iw-content">' +
                    '<h1>Samuel Craig</h1>' +
                    '<h1>Saint Petersburg,</h1>' +
                    '<h1>Florida</h1>' +
                    '<br>' +
                    '<a><span style="color: #57a3e4">@</span> : samc2198@gmail.com</a>' +
                    '</div>' +
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                })

                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map,
                    icon: $scope.mapMarker()
                });

                infowindow.open(map, marker);

                google.maps.InfoWindow.prototype.isOpen = true;

                google.maps.event.addListener(map, 'click', function () {
                    if (infowindow.isOpen) {
                        infowindow.isOpen = false;
                        infowindow.close();
                    }
                });

                google.maps.event.addListener(marker, 'click', function () {
                    if (infowindow.isOpen) {
                        infowindow.isOpen = false;
                        infowindow.close();
                    } else {
                        infowindow.isOpen = true;
                        infowindow.open(map, marker);
                    }
                });

                google.maps.event.addListener(infowindow, 'closeclick', function () {
                    infowindow.isOpen = false;
                });
            }
            else {
                // remove 'contact' and 'flat' tags if view !contact due to changes...
                // in nav bar and light-mode positioning in contact view
                if (window.outerWidth > $scope.mobileWidth) {
                    navWrap[0].classList.remove('flat'); //  || top nav
                    navWrap[1].classList.remove('flat'); //  || bottom nav
                }
                lightMode.classList.remove('contact'); //   || light mode
            }

            if ($scope.hasChangedView) {
                // change view specific animations
                $timeout(function () {
                    $scope.updateView()
                }, 0);
                lightMode.classList.add('active');
                document.getElementById('background').classList.remove('transition');
            }
        })
    }, 0)
})

function tween(o, props, durationSecs, onComplete, ease) {
    var fps = 30, count = 0, stopAt = fps * durationSecs, startVals = {}, endVals = {}, easef = ease || Quad_easeOut;
    for (var p in props) startVals[p] = tween_getProperty(o, p);
    for (var p in props) endVals[p] = props[p];
    var f = function () {
        count++;
        if (count >= stopAt) {
            tween_stop(o);
            tween_setProps(o, endVals);
            if (onComplete) onComplete();
        } else {
            for (var p in props) tween_setProperty(o, p, easef(count, startVals[p], endVals[p] - startVals[p], stopAt));
        }
    };
    clearInterval(o._tween_int);
    o._tween_int = setInterval(f, durationSecs * 1000 / fps);
}

function tween_stop(o) {
    clearInterval(o._tween_int);
}

function tween_setProps(o, props) {
    for (var p in props) tween_setProperty(o, p, props[p]);
}

function tween_setProperty(o, p, value) {
    if (p === 'top') o.style.cssText += ';' + p + ':' + value + 'vh !important' + ';'; // top
    else o.style.cssText += ';' + p + ':' + value + 'vw !important' + ';'; // bottom
}

function tween_getProperty(o, p) {
    return parseFloat(o.style[p]);
}

//R.Penner Quart easing t=time,b=start,c=delta,d=duration
function Quad_easeIn(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}

function Quad_easeOut(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function Quad_easeInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

DOMTokenList.prototype.addMany = function (classes) {
    var array = classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        this.add(array[i]);
    }
}