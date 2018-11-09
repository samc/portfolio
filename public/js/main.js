require('./triangles');
require('../css/style.css');

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

// Compatibility event handler
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
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
})

// delay between view changes to allow for animation & load time
var transitionDelay = {
    delay: function ($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 500);
        return delay.promise;
    }
}

app.controller('view', function ($scope, $location, $timeout, $window) {

    // $timeout is used to insure propagation of all angular scope elements
    $timeout(function () {


        //------------------------------
        // Angular Scope Variables
        //------------------------------

        $scope.currentView = $location.path();
        $scope.hasChangedView = false;
        $scope.hasViewedSkills = false;
        $scope.mobileWidth = 1024;
        $scope.navBarAngle = 0;
        $scope.navBarX = 0;
        $scope.navBarY = 0;


        // Check if user is on a mobile
        $scope.isMobile = function () {
            return window.innerWidth <= $scope.mobileWidth;
        }
        // Check if user is on a tablet
        $scope.isTablet = function () {
            return ((window.innerWidth <= 1024 || window.innerHeight < 768) && !($scope.isPortrait()));
        }

        // Check if user is on a mobile
        $scope.isPortrait = function () {
            return document.querySelector('body').clientWidth < document.querySelector('body').clientHeight;
        }

        //------------------------------
        // Home Page Animation Sequence
        //------------------------------

        var leftLine = document.querySelector('.line.left'),
            rightLine = document.querySelector('.line.right'),
            bottomLine = document.querySelector('.line.bottom'),
            icons = document.querySelectorAll('.nav-icon');

        if ($location.path() === '/contact' || $scope.isMobile() && $scope.isPortrait()) {
            leftLine.style.visibility = 'visible';
            rightLine.style.visibility = 'visible';

            leftLine.classList.add('move-y-flat');
            rightLine.classList.add('move-y-flat');
        } else if ($scope.isTablet()) {
            bottomLine.style.visibility = 'visible';
            bottomLine.classList.add('move-y');
        } else {
            leftLine.style.visibility = 'visible';
            rightLine.style.visibility = 'visible';

            leftLine.classList.add('move-y');
            rightLine.classList.add('move-y');

            setTimeout(function () {
                leftLine.classList.add('change-axis');
                rightLine.classList.add('change-axis');
            }, 810);

            setTimeout(function () {
                leftLine.classList.add('move-x');
                rightLine.classList.add('move-x');
            }, 1100);
        }

        setTimeout(function () {
            document.getElementById('background').classList.add('active');
            document.querySelector('.nav-bottom').classList.add('transition', 'active');
            document.querySelector('.nav-top').classList.add('transition', 'active');
            leftLine.style.display = 'none';
            rightLine.style.display = 'none';
            bottomLine.style.display = 'none';
        }, 1600);

        // random icon reveal animation handler

        setTimeout(function () {
            var iconList = Array.from(icons);

            function showRandomIcon() {
                setTimeout(function () {
                    var index = Math.floor(Math.random() * (iconList.length - 1));
                    iconList[index].style.opacity = 1;
                    iconList.splice(index, 1);
                    if (iconList.length > 0) showRandomIcon();
                }, 80);
            }

            showRandomIcon();
        }, 1600);

        // update angular view instance

        setTimeout(function () {
            $scope.updateView();
        }, 1800)

        // change nav icon transition value after initial animation
        // total time for all icons to be revealed : timeout delay * icons.length = 720ms
        // delay from reveal set at : 1600ms + 720ms = 2320ms

        setTimeout(function () {
            for (var a = 0; a < icons.length; a++) {
                icons[a].classList.add('transition');
            }
        }, 2320);

        // display mobile shake light mode reminder if being viewed from a phone
        // display light mode toggle button

        setTimeout(function () {
            document.getElementById('light-mode').classList.add('active');
            if ($location.path() === '/skills' && window.innerWidth > $scope.mobileWidth) {
                $scope.createNotification('Scroll to rotate skills.');
            } else if ($location.path() === '/' && $scope.isMobile()) {
                $scope.createNotification('Shake device to toggle night mode.')
            }
        }, 2500)

        $scope.isDark = function () {
            return (localStorage.getItem('color') === 'dark')
        };

        $scope.currentViewEl = function () {
            return document.getElementById('view-container')
        };


        //------------------------------
        // Flat Surface Shader (modified)
        //------------------------------

        (function () {
            var isDark = $scope.isDark();
            var MESH = {
                width: 1.2,
                height: 1.2,
                slices: 250
            };
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
                    LIGHT.diffuse = '#4c4f65'
                } else {
                    MESH.ambient = '#ffffff';
                    MESH.diffuse = '#4c4f65';
                    LIGHT.ambient = '#D8D8D8';
                    LIGHT.diffuse = '#D8D8D8'
                }
            };
            setBGColor();
            var center = FSS.Vector3.create();
            var container = document.getElementById('background');
            var output = document.getElementById('output');
            var renderer,
                scene,
                mesh,
                geometry,
                material,
                canvasRenderer,
                light,
                hasBeenRendered;

            function initialise() {
                createRenderer();
                createScene();
                createMesh();
                addLight();
                resize(container.offsetWidth, container.offsetHeight);
                animate()
                hasBeenRendered = true;
            }

            function createRenderer() {
                canvasRenderer = new FSS.CanvasRenderer;
                if (renderer) {
                    output.removeChild(renderer.element)
                }
                renderer = canvasRenderer;
                renderer.setSize(container.offsetWidth, container.offsetHeight);
                output.appendChild(renderer.element)
            }

            function createScene() {
                scene = new FSS.Scene
            }

            function createMesh() {
                scene.remove(mesh);
                renderer.clear();
                geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.slices);
                material = new FSS.Material(MESH.ambient, MESH.diffuse);
                mesh = new FSS.Mesh(geometry, material);
                scene.add(mesh)
            }

            function addLight() {
                renderer.clear();
                light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
                light.ambientHex = light.ambient.format();
                light.diffuseHex = light.diffuse.format();
                light.setPosition(LIGHT.xPos, LIGHT.yPos, LIGHT.zOffset);
                scene.add(light);
                LIGHT.proxy = light;
                LIGHT.pickedup = true;
                LIGHT.currIndex++
            }

            function resize(width, height) {
                renderer.setSize(width, height);
                FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
                createMesh()
            }

            function animate() {
                render();
                requestAnimationFrame(animate)
            }

            function render() {
                renderer.render(scene)
            }

            function addEventListeners() {
                window.addEventListener('resize', onWindowResize);
                window.addEventListener('mousemove', onMouseMove);
                container.addEventListener('togglecolor', function () {
                    isDark = !isDark;
                    setBGColor();
                    createRenderer();
                    createScene();
                    createMesh();
                    addLight()
                });
            }

            function onWindowResize() {
                if (!$scope.isMobile() && !$scope.isTablet()) {
                    container.classList.add('active');
                    if (hasBeenRendered) {
                        resize(container.offsetWidth, container.offsetHeight);
                        render()
                    } else initialise();
                } else container.classList.remove('active');
            }

            function onMouseMove(event) {
                if (!$scope.isMobile() && !$scope.isTablet()) {
                    if (LIGHT.pickedup) {
                        LIGHT.xPos = event.x - renderer.width / 2;
                        LIGHT.yPos = renderer.height / 2 - event.y;
                        LIGHT.proxy.setPosition(LIGHT.xPos, LIGHT.yPos, LIGHT.proxy.position[2])
                    }
                }
            }

            if (!$scope.isMobile() && !$scope.isTablet()) initialise();
            addEventListeners();
        })();

        $scope.changeView = function (route) {

            $scope.hasChangedView = true;

            // only change view if current view and selected view are different
            if (!($scope.currentView === '/' + route)) {
                // redirect to new url to initiate view change
                $location.path('/' + route);
            }
        }

        //-----------------------------------
        // Toggle Light Mode on Device Shake
        //-----------------------------------

        if (window.DeviceMotionEvent !== 'undefined') {
            // Shake sensitivity (a lower number is more)
            var sensitivity = 25,
                active = false

            // Position variables
            var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;

            // Listen to motion events and update the position
            window.addEventListener('devicemotion', function (e) {
                x1 = e.accelerationIncludingGravity.x;
                y1 = e.accelerationIncludingGravity.y;
                z1 = e.accelerationIncludingGravity.z;
            }, false);

            // Periodically check the position and fire
            // if the change is greater than the sensitivity
            setInterval(function () {
                var change = Math.abs(x1 - x2 + y1 - y2 + z1 - z2);

                if (change > sensitivity && !active) {
                    $scope.toggleLocalStorage();
                    $scope.toggleColors();
                    active = true;
                    setTimeout(function () {
                        active = false;
                    }, 2000)
                }

                // Update new position
                x2 = x1;
                y2 = y1;
                z2 = z1;
            }, 150);
        }


        // Static elements
        var navBars = document.getElementsByTagName('NAV'),
            navIcons = document.querySelectorAll('.nav-icon'),
            lightMode = document.getElementById('light-mode'),
            background = document.getElementById('background');

        $scope.$on('$routeChangeStart', function () {

            // set the current route for reference for view comparison check
            $scope.currentView = $location.path();

            //------------------------------
            // Transition Animations
            //------------------------------

            lightMode.classList.remove('active');
            background.classList.add('transition');

            var viewChildren = document.getElementById('view-container').childNodes;

            for (var c = 0; c < viewChildren.length; c++) {
                viewChildren[c].classList.remove('active');
                viewChildren[c].classList.add('exit');
            }

            for (var b = 0; b < navBars.length; b++) {
                navBars[b].classList.remove('active');
            }
        });

        //view elements will change and are updated in the $viewContentLoaded handler

        $scope.elementsToToggle =
            [
                document.getElementById('background'),
                document.getElementById('sun'),
                document.getElementById('moon'),
                document.getElementById('notification'),
                document.querySelector('.site-loader'),
                document.body
            ]

        // Handle color changes static elements, only issue color change for current view if it is populated.
        $scope.toggleColors = function () {
            if (document.getElementById('map') !== null) $scope.updateMap();

            for (var i = 0; i < $scope.elementsToToggle.length; i++) {
                $scope.elementsToToggle[i].classList.toggle('dark');
            }
            for (var n = 0; n < navIcons.length; n++) {
                navIcons[n].classList.toggle('dark');
            }
            for (var b = 0; b < navBars.length; b++) {
                navBars[b].classList.toggle('dark');
            }

            if (!($scope.currentViewEl() === null || $scope.currentViewEl() === undefined)) $scope.toggleViewColors();
        }

        $scope.toggleViewColors = function () {
            var currentViewEl = $scope.currentViewEl();
            for (var v = 0; v < currentViewEl.childNodes.length; v++) {
                currentViewEl.childNodes[v].classList.toggle('dark');
            }
        }
        // toggle local storage value 'color' when necessary
        $scope.toggleLocalStorage = function () {
            if (localStorage.getItem('color') === null) {
                localStorage.setItem('color', 'dark');
            } else {
                localStorage.removeItem('color');
            }
        }

        // Custom event for background tessellation color change
        var toggleBackgroundColorEvent = new Event('togglecolor');

        // Color change handler
        function handleColorChange(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $scope.toggleLocalStorage();
            $scope.toggleColors();
            background.dispatchEvent(toggleBackgroundColorEvent);
        }

        // On "MOUSEDOWN" mousepress, toggle color
        document.getElementById('light-mode').addEventListener('mousedown', function (e) {
            handleColorChange(e);
        });

        // On "ENTER" keypress, toggle color
        document.getElementById('light-mode').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleColorChange(e);
            }
        })

        // Change color to dark mode on initial if set in previous instance
        if (localStorage.getItem('color') === 'dark') {
            $scope.toggleColors();
        }

        //------------------------------
        // Notification Creation
        //------------------------------

        $scope.createNotification = function (message) {
            var notification = document.getElementById('notification');

            notification.innerHTML = message;
            var notificationWidth = parseFloat(window.getComputedStyle(notification, null).getPropertyValue('width'));
            notification.style.left = '-' + notificationWidth + 'px';
            notification.style.transform = 'translateX(' + (notificationWidth + 20) + 'px)';
            notification.classList.add('active');

            $timeout(function () {
                notification.style.transform = 'none';
                notification.classList.remove('active');
            }, 5000);
        }

        //------------------------------
        // Mobile Style Handlers
        //------------------------------

        function adjustNavBars() {
            setTimeout(function () {
                if (($scope.isMobile() && $scope.isPortrait()) || (!$scope.isTablet() && $location.path() === '/contact')) {
                    navBars[0].classList.add('flat');
                    navBars[1].classList.add('flat');
                } else {
                    navBars[0].classList.remove('flat');
                    navBars[1].classList.remove('flat');
                }
            }, 0)
        }

        adjustNavBars();
        window.addEventListener('resize', adjustNavBars);
    }, 0)


    $scope.updateView = function () {
        var viewChildrenNew = document.getElementById('view-container').childNodes;
        for (var n = 0; n < viewChildrenNew.length; n++) {
            viewChildrenNew[n].classList.add('active');
            viewChildrenNew[n].classList.add('active-f');
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

    // Return appropriate style relative to light mode
    $scope.style = function () {
        return ($scope.isDark()) ? styleDark : styleLight;
    };

    // google maps marker will reflect respective light mode when updated
    $scope.mapMarker = function () {
        return ($scope.isDark()) ? 'dist/images/logoMarkerDark.small.svg' : 'dist/images/logoMarkerLight.small.svg';
    };


    // angular view callback load function, anything regarding manipulation of the...
    // different views is handled here

    $scope.$on('$viewContentLoaded', function () {

        // Remove :focus from element to prevent title from displaying
        // if tab was used to navigate
        document.activeElement.blur();

        function adjustHeaderCovers() {

            var covers = document.querySelectorAll('.cover');

            for (var c = 0; c < covers.length; c++) {
                var coverParent = covers[c].parentNode,
                    coverHeight = parseInt(window.getComputedStyle(coverParent, null).getPropertyValue('height')),
                    coverWidth = parseInt(window.getComputedStyle(coverParent, null).getPropertyValue('width'));

                covers[c].style.height = (coverHeight * 0.7) + 'px';
                covers[c].style.width = (coverWidth * 0.7) + 'px';
            }
        }


        adjustHeaderCovers();
        $window.addEventListener('resize', adjustHeaderCovers);

        // Delay before page transition is issued is 500ms following Angular Route's 500ms Promise
        // to total 1 second transition
        $timeout(function () {

            function adjustContentSliders() {

                var bodies = document.querySelectorAll('.header.body');

                for (var b = 0; b < bodies.length; b++) {
                    var bodyHeight = parseInt(window.getComputedStyle(bodies[b], null).getPropertyValue('height'));
                    bodies[b].parentNode.style.height = bodyHeight - bodyHeight * .05 + 'px';
                }
            }

            // View static references
            var lightMode = document.getElementById('light-mode'),
                navBars = document.getElementsByTagName('NAV');

            adjustContentSliders();
            $window.addEventListener('resize', adjustContentSliders);

            if (localStorage.getItem('color') === 'dark' && !$scope.hasChangedView) {
                $scope.toggleViewColors();
            }

            // set active nav icon
            var navBotIcons = document.querySelector('.nav-wrapper.bot').childNodes;
            for (var i = 0; i < navBotIcons.length; i++) {
                navBotIcons[i].classList.remove('active')
            }

            var currentRoute = $scope.currentView.slice(1, $scope.currentView.length);
            if (currentRoute === '') currentRoute = 'home';
            document.querySelector('.' + currentRoute).classList.add('active');

            // skills route handler
            if ($location.path() === '/skills') {

                if (!$scope.hasViewedSkills && $scope.hasChangedView && window.innerWidth > $scope.mobileWidth) $scope.createNotification('Scroll to rotate skills.');
                $scope.hasViewedSkills = true;

                // Detect Safari 3.0+ for use in fixing quirky styling issues in skills views in mobile
                var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

                if ($scope.isMobile() && isSafari) {
                    document.querySelector('.skill-container').classList.add('safari');
                }

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
                    'AJAX',
                    'Java 8'
                ];

                // any set of 7 skills will be displayed relative to their order above,
                // seemlessly matching once end of the array is met (on scroll)

                var sMax = $scope.totalSkills.length - 1;

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
                    timeOfLastScroll = 0,
                    totalSkills = $scope.totalSkills.length - 1;

                $timeout(function () {
                    // 4th skill in active view window is scaled and highlighted
                    document.getElementById('skill-wrap').childNodes[17].classList.add('active');
                }, 2000)

                // check if user is still in the Stone Age
                var wheelEvent = isEventSupported('wheel') ? 'wheel' : 'mousewheel';

                window.addEventListener(wheelEvent, function (e) {

                    if ($location.path() === '/skills') {

                        var skillWrap = document.getElementById('skill-wrap'),
                            skillFocused = skillWrap.childNodes[17];

                        skillFocused.classList.remove('active');

                        function animateScroll(scrollDis, callback) {
                            var curLeftTop = ($scope.isMobile() || $scope.isTablet()) ? scrollDis * 7 : scrollDis * 8,
                                curLeftFinal = ($scope.isMobile() || $scope.isTablet()) ? 0 : scrollDis * 4;
                            tween(skillWrap, -curLeftFinal, curLeftTop, 1, callback);
                        }

                        function scrollUp() {
                            $timeout(function () {
                                for (var su = 0; su < scrollDis; su++) {

                                    $scope.activeEnd--
                                    $scope.activeStart--
                                    if ($scope.activeEnd < 0) $scope.activeEnd = totalSkills;
                                    if ($scope.activeStart < 0) $scope.activeStart = totalSkills;

                                    $scope.activeSkills.unshift($scope.totalSkills[$scope.activeStart]);
                                    $scope.activeSkills.pop();

                                }
                                skillFocused.classList.add('active');
                                skillWrap.style.transform = 'none';
                                scrollDis = 0;
                                scrollingUp = false;
                                scrollingUpSelf = false;
                            }, 0)
                        }

                        function scrollDown() {
                            $timeout(function () {
                                for (var sd = 0; sd < Math.abs(scrollDis); sd++) {

                                    $scope.activeEnd++
                                    $scope.activeStart++
                                    if ($scope.activeEnd > totalSkills) $scope.activeEnd = 0;
                                    if ($scope.activeStart > totalSkills) $scope.activeStart = 0;

                                    $scope.activeSkills.push($scope.totalSkills[$scope.activeEnd]);
                                    $scope.activeSkills.shift();

                                }
                                skillFocused.classList.add('active');
                                skillWrap.style.transform = 'none';
                                scrollDis = 0;
                                scrollingDown = false;
                                scrollingDownSelf = false;
                            }, 0)
                        }

                        // (scroll down) add skill to bottom & remove skill from top
                        if ((e.deltaY === 100 || e.deltaY === 3) && !scrollingUp && !scrollingDownSelf) {
                            scrollDirection = 'down';
                            scrollDis--;
                            scrollingDown = true;
                            // used to differentiate between user scroll / programmatic scroll
                            if (e.deltaZ === 0) timeOfLastScroll = Date.now();
                            var scd = scrollDis;
                            $timeout(function () {
                                if (scrollDis === scd) {
                                    if (scrollDis < -4) scrollDis = -4;
                                    scrollingDownSelf = true;
                                    animateScroll(scrollDis, scrollDown);
                                }
                            }, scrollCatchInterval)
                            // (scroll up) add skill to top & remove skill from bottom
                        } else if ((e.deltaY === -100 || e.deltaY === -3) && !scrollingDown && !scrollingUpSelf) {
                            scrollDirection = 'up';
                            scrollDis++;
                            scrollingUp = true;
                            // used to differentiate between user scroll / programmatic scroll
                            if (e.deltaZ === 0) timeOfLastScroll = Date.now();
                            var scu = scrollDis;
                            $timeout(function () {
                                if (scrollDis === scu) {
                                    if (scrollDis > 4) scrollDis = 4;
                                    scrollingUpSelf = true;
                                    animateScroll(scrollDis, scrollUp);
                                }
                            }, scrollCatchInterval)
                        }
                    }
                });

                var constantScrollInterval;

                function constantScroll() {
                    // prevents scrolling while changing views
                    if ($scope.currentView === '/skills') {
                        // emulate scrolling of the skill list
                        var scrollEvent = new WheelEvent('wheel', {
                            deltaY: (scrollDirection === 'up') ? -100 : 100,
                            deltaZ: 1 // used to differentiate between user scroll / programmatic scroll
                        });

                        // 3 scroll events are dispatched to mirror scrolling of 3 skills
                        for (var r = 0; r < 3; r++) {
                            window.dispatchEvent(scrollEvent);
                        }
                    } else clearInterval(constantScrollInterval);
                }

                // wait 3 seconds before issuing first scroll
                $timeout(function () {
                    constantScroll();
                    constantScrollInterval = setInterval(function () {
                        var timeDifference = Math.floor((Date.now() - timeOfLastScroll) / 1000);
                        if (timeDifference >= 3) constantScroll();
                    }, 3000)
                }, 5000)
            }

            // work & about overflow styling
            if ($location.path() === '/work' || $location.path() === '/about') {

                var container = document.querySelector('.work-container') || document.querySelector('.header-container.about'),
                    wrapper = container.parentNode;

                container.addEventListener('scroll', function () {
                    if ($scope.isMobile() || $scope.isTablet()) {
                        if (container.scrollTop !== 0) {
                            if (container.scrollHeight - container.offsetHeight === container.scrollTop) {
                                wrapper.classList.add('fade-top');
                            }
                            else {
                                wrapper.classList.add('fade-top-bottom');
                                wrapper.classList.remove('fade-top');
                            }
                        }
                        else wrapper.classList.remove('fade-top', 'fade-top-bottom');
                    }
                })

            }

            // contact route handler
            if ($location.path() === '/contact') {

                //contact input vars
                var email = document.getElementById('email'),
                    name = document.getElementById('name'),
                    te = document.getElementById('message'),
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
                    var dataArray = e.target,
                        dataSuccess = true,
                        jsonData = {};

                    // JSON data schema for post
                    // {
                    //      name:
                    //      email:
                    //      message:
                    // }

                    for (var i = 0; i < dataArray.length - 1; i++) {
                        var inputTarget = dataArray[i],
                            inputVal = inputTarget.value,
                            inputID = inputTarget.id,
                            inputLabel = inputTarget.parentNode.childNodes[1];

                        jsonData[inputID] = inputVal;

                        // Do not issue POST request if any input values are missing
                        if (inputVal.length === 0) {
                            dataSuccess = false;
                            inputLabel.classList.add('error', 'focus');
                        }
                    }

                    // If all inputs contain a valid value, send POST request
                    if (dataSuccess) {
                        var loader = document.getElementById('email-loader');
                        loader.classList.add('active');
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', '/contact', true);
                        xhr.setRequestHeader("Content-type", "application/json");
                        xhr.onreadystatechange = function () {
                            // Request sent & callback received
                            // Send success message to user
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                $scope.createNotification(xhr.responseText);
                                loader.classList.remove('active');
                            }
                        }
                        xhr.send(JSON.stringify(jsonData));
                    }
                });

                if (!$scope.isTablet()) {
                    // Change nav bar styling
                    for (var f = 0; f < navBars.length; f++) {
                        navBars[f].classList.add('flat');
                    }
                }

                // Specific view change styling from "angled" to "flat" to prevent translation issues
                if ($scope.hasChangedView) {
                    $timeout(function () {
                        for (var t = 0; t < navBars.length; t++) {
                            navBars[t].classList.add('transition', 'active');
                        }
                    }, 100)
                }


                // Specific position change for contact view
                lightMode.classList.add('contact');

                //------------------------------------
                // Google Map Implementation
                //------------------------------------

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

                // InfoWindow contents
                var contentString =
                    '<div id="iw-content">' +
                    '<h1>Samuel Craig</h1>' +
                    '<h1>Saint Petersburg,</h1>' +
                    '<h1>Florida</h1>' +
                    '<br>' +
                    '<a><span style="color: #57a3e4">@</span> : contact@samcraig.io</a>' +
                    '</div>' +
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                })

                // Initiate marker depending on current light mode
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map,
                    icon: $scope.mapMarker()
                });

                infowindow.open(map, marker);

                google.maps.InfoWindow.prototype.isOpen = true;

                // Close InfoWindow on map click
                google.maps.event.addListener(map, 'click', function () {
                    if (infowindow.isOpen) {
                        infowindow.isOpen = false;
                        infowindow.close();
                    }
                });
                // Close InfoWindow on marker click
                google.maps.event.addListener(marker, 'click', function () {
                    if (infowindow.isOpen) {
                        infowindow.isOpen = false;
                        infowindow.close();
                    } else {
                        infowindow.isOpen = true;
                        infowindow.open(map, marker);
                    }
                });

                // Close InfoWindow on "x" click
                google.maps.event.addListener(infowindow, 'closeclick', function () {
                    infowindow.isOpen = false;
                });
            } else {

                // Remove 'contact' and 'flat' tags if view !contact and window
                // size is greater than set mobile width
                // (change in nav bar and light-mode positioning in parallel view)

                lightMode.classList.remove('contact');

                if ($scope.hasChangedView) {
                    for (var w = 0; w < navBars.length; w++) {
                        if ($scope.isMobile() && $scope.isPortrait()) {
                            navBars[w].classList.add('flat', 'transition');
                        } else navBars[w].classList.remove('flat');
                    }
                    $timeout(function () {
                        for (var w = 0; w < navBars.length; w++) {
                            navBars[w].classList.add('transition', 'active');
                        }
                    }, 100)
                }
            }
            // trigger nav transition animations
            if ($scope.hasChangedView) {
                if (!$scope.isMobile() && !$scope.isTablet()) {
                    // We remove transition class and add it 100ms later to let position change
                    // propagate
                    for (var n = 0; n < navBars.length; n++) {
                        navBars[n].classList.remove('transition');
                    }
                }
                $scope.updateView();
                lightMode.classList.add('active');
                document.getElementById('background').classList.remove('transition');
            }
        }, 500)
    })
});

function tween(o, x, y, durationSecs, onComplete) {
    var fps = 30, count = 0, stopAt = fps * durationSecs, easef = Quad_easeInOut;
    var f = function () {
        count++;
        if (count >= stopAt) {
            tween_stop(o);
            if (onComplete) onComplete();
        } else {
            tween_setProperty(o, easef(count, 0, x, stopAt), easef(count, 0, y, stopAt));
        }
    };
    clearInterval(o._tween_int);
    o._tween_int = setInterval(f, durationSecs * 1000 / fps);
}

function tween_stop(o) {
    clearInterval(o._tween_int);
}

function tween_setProperty(o, x, y) {
    o.style.cssText += ';transform:translate3d(' + x + 'vw,' + y + 'vh,0);';
}

function Quad_easeInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}
