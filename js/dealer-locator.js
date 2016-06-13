"use strict";

var Cookies = function() {
        function e(e, t, i) {
            var n;
            if (i) {
                var a = new Date;
                a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3), n = "; expires=" + a.toGMTString()
            } else n = "";
            document.cookie = e + "=" + t + n + "; path=/"
        }

        function t(e) {
            var t = !1,
                n = i(e);
            return "" != n && (t = !0), t
        }

        function i(e) {
            for (var t = e + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                for (var a = i[n];
                    " " == a.charAt(0);) a = a.substring(1);
                if (0 == a.indexOf(t)) return a.substring(t.length, a.length)
            }
            return ""
        }
        return Utility.log("Cookies.js loaded"), {
            createCookie: e,
            checkCookie: t,
            getCookie: i
        }
    }(),
    // Dealer Locator    
    DealerLocator = function() {
        Utility.log('DealerLocator.js loaded');

        //temporary var for testing future use of ip to lat/long service
        var fallbackGeoTest = false;
        var bapWaypoint = {};
        var map,
            isMobile = false,
            zipGlobal = "",
            lat = "",
            lng = "",
            dealerListings = {};
        var bingApiCredentials = "Ajkz_KnsjHxsfhRJeU78Xc8VgxAssv1iCF4leVVvmJLsPCaSXPaHdxuljT7aQ059";
        //options for the geolocation.getCurrentPosition call
        var geoLocateOptions = {
            enableHighAccuracy: true,
            timeout: 5000
        };
        var $dealerLocator = $('#dealer-locator'),
            $map = $('#dealer-map', $dealerLocator),
            $form = $('#dealer-locator-form'),
            $submitButton = $('[type=submit]', $form),
            $zipInput = $('#zip', $form),
            $resultsList = $('.results-list', $dealerLocator),
            $resultsItemTemplate = $('.results-item-template', $resultsList).clone();

        $resultsList.empty();


        /*
         *  Initializes DealerLocator
         *  @public
         */
        function init() {
            try {
                //riot.mount('contact_dealer_vehicle_model', {});

                isMobile = checkMobile();

                $('#dealer-map .loader').stop().fadeOut(100);

                //initialize the map
                map = new Microsoft.Maps.Map(document.getElementById('dealer-map'), {
                    credentials: bingApiCredentials,
                    mapTypeId: Microsoft.Maps.MapTypeId.road,
                    //center: new Microsoft.Maps.Location(34.0058945,-118.4440439),
                    center: new Microsoft.Maps.Location(39.407547, -94.2591867),
                    zoom: 4
                });

                Microsoft.Maps.Events.addHandler(map, 'keydown', function(e) {
                    e.handled = true;
                    return true;
                });

                Microsoft.Maps.Events.addHandler(map, 'mousewheel', function(e) {
                    e.handled = true;
                    return true;
                });

                //delay geoservices until user has scrolled down to the dealerLocator component
                $('.dealer-locator').waypoint({
                    handler: function(direction) {
                        if (direction == 'down') {
                            //check for value stored in cookie with name of'zip'
                            if (checkCookie()) {
                                setZipInputValue(zipGlobal);
                                getDealerDataFromZip(zipGlobal);
                                //if no cookie found try to use browser geolocation
                            } else if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(geoLocateSuccess, geoLocateFail, geoLocateOptions);
                            }
                            //if no browser geolocation try to use hawk IP to zip service
                            else {
                                ipToZip();
                            }
                        }
                    },
                    offset: '-20%'
                });


                $('.use-my-location', $form).click(function useMyLocationClick() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(geoLocateSuccess, geoLocateFail, geoLocateOptions);
                    }
                });

                $form.bind('submit', function(e) {
                    e.preventDefault();
                    $submitButton.trigger('click');
                    return false;
                });

                $submitButton.click(function submitClick(e) {
                    e.preventDefault();
                    $submitButton.addClass('disabled-button');
                    DoubleClickTags.track('https://4114413.fls.doubleclick.net/activityi;src=4114413;type=fy04n873;cat=newde381;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=');
                    if (ValidationCivic.validateForm($form)) {
                        zipSearch($zipInput.val());
                        $('input#zip').blur();
                    }
                });

                $zipInput.focus(function() {
                    if ($zipInput.val().length == 5) {
                        enableSubmitButton();
                        $submitButton.removeClass('disabled-button');
                    }
                });

                //restricts users to only entering numeric values
                $zipInput.on('keydown', zipKeyDown);
                //enableds or disables submit button
                $zipInput.on('keyup', zipCheckOnMousemove);
                //checking zip length on mouseover/mouseout to fix the case where
                //  a user uses autofill/autocomplete to populate zip input
                //$('.results', '.main-content').on('mouseout mouseover', zipCheckOnMousemove);

            } catch (e) {
                if ($form.length > 0) {
                    Utility.error(e);
                }
            }
        }

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

        //sets mobile flag to allow for correct handling of map pin touch events
        function checkMobile() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }

        // ---------------------------------------------------
        // zip input field keyup and keydown events
        // zipKeyDown:
        //    restricts user input to numbers & some hotkeys
        // zipKeyUp:
        //    enables/disables submit button based on
        //    zip input field value length (5 = enabled)
        // ---------------------------------------------------
        function zipKeyDown(e) {
            //restricts user input to numbers + some hotkeys
            if (e.keyCode === 13 && $zipInput.val().length === 5) {
                e.preventDefault();
                $submitButton.trigger('click');
                return;
            }
            if (e.keyCode === 13) {
                $submitButton.addClass('disabled-button');
            }
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        }

        //toggles disable property of submit button on keyup
        //triggered by mouse events to enable the submit button
        //  when users use autocomplete
        var zipCheckOnMousemove = function(e) {
            if ($zipInput.val().length == 5) {
                enableSubmitButton();
                $submitButton.removeClass('disabled-button');
            } else {
                disableSubmitButton();
            }
        };


        // ---------------------------------------------------
        // browser geolocation functions
        // ---------------------------------------------------
        function geoLocateSuccess(position) {
            getDealerDataFromLatLong(position.coords.latitude, position.coords.longitude);
        }

        function geoLocateFail(err) {
            //Utility.log('geoLocateFail: ' + err);
            ipToZip();
        }

        // ---------------------------------------------------
        // fallbackGeo:
        //    placeholder function for future ip to lat/long service
        // ---------------------------------------------------
        function ipToZip() {
            Utility.log('trying auto-ip service call');
            var endpoint = '/platform/api/v1/zipcodes?ipaddress=auto';
            $.ajax({
                    url: endpoint,
                    crossDomain: true,
                    dataType: 'json',
                    beforeSend: function beforeZipSubmit() {
                        disableSubmitButton();
                    }
                })
                .done(ipToZipHandler)
                .always(function formSubmitAlways() {
                    enableSubmitButton();
                });
        }

        function ipToZipHandler(data) {
            Utility.log(data);
            Utility.log(data.ZipCode);
            if (data.ZipCode !== null && data.ZipCode !== "null") {
                getDealerDataFromZip(data.ZipCode);
            }
        }


        // ---------------------------------------------------
        // zipSearch:
        //    fires after validated zipinput submit
        //    sets zip, creates cookie, updates maps & results list
        // ---------------------------------------------------
        function zipSearch(zip) {
            zipGlobal = zip;
            Cookies.createCookie('zip', zip, 365);
            getDealerDataFromZip(zip);
        }

        function getFormData() {
            var formData = {};
            $('input', $form).each(function() {
                formData[$(this).attr('name')] = $(this).attr('value');
            });
            return formData;
        }

        // ---------------------------------------------------
        // getDealerDataFromZip:
        // ---------------------------------------------------
        function getDealerDataFromZip(zip) {
            var formData = getFormData();
            delete formData['lat'];
            delete formData['long'];
            formData['zip'] = zip;
            getDealerData(formData);
        }

        // ---------------------------------------------------
        // getDealerDataFromZip:
        // ---------------------------------------------------
        function getDealerDataFromLatLong(lat, long) {
            var formData = getFormData();
            delete formData['zip'];
            formData['lat'] = lat;
            formData['long'] = long;
            getDealerData(formData);
        }

        // ---------------------------------------------------
        // getDealerData:
        //    ajax call to hawk API to retrieve dealer results
        // ---------------------------------------------------
        function getDealerData(formData) {
            var endpoint = $form.attr('action');
            //var endpoint = './json/data.json';

            $.ajax({
                    url: endpoint,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json',
                    beforeSend: function beforeZipSubmit() {
                        disableSubmitButton();
                    }
                })
                .done(applyDealerData)
                .fail(function getDealerDataFail(xhr, textStatus, errorThrown) {
                    Utility.log('getdealer call failing');
                    Utility.log(xhr);
                    if (xhr.status === 400) {
                        $('.input-wrapper', $form).addClass('has-error');
                        $('.help-block', $form).html(xhr.responseText);
                    } else {
                        $('.input-wrapper', $form).addClass('has-error');
                        $('.help-block', $form).html('A server error occured. Please try again.');
                    }
                })
                .always(function formSubmitAlways() {
                    enableSubmitButton();
                });
        }


        // ---------------------------------------------------
        // applyDealerData:
        //    set max # of results, checks result length,
        //    applies error if no results, calls addPins,
        //    and createList if results > 0
        // ---------------------------------------------------
        function applyDealerData(data) {
            Utility.log('applyDealerData', data);

            //check if service returned a zip code
            if (data.ZipCode) {
                setZipInputValue(data.ZipCode);
            }

            //empty result set = invalid zip
            if (!data.Dealers || data.Dealers.length == 0) {
                Utility.log('no dealers returned');
                $('.input-wrapper', $form).addClass('has-error');
                var regexError = $('.input-wrapper').data('regex-error');
                $('.help-block', $form).html(regexError);
                return;
            } else {
                //remove any past error messaging
                $('.input-wrapper', $form).removeClass('has-error');
                //set max results (we only want the 3 closest dealers)
                addPins(data.Dealers.slice(0, 3));
                createList(data.Dealers.slice(0, 3));
                window.dataDealerList = data.Dealers;
            }
        }


        // ---------------------------------------------------
        // addPins:
        //    gets json results
        //    adds pins to map based on dealer result lat/long
        // ---------------------------------------------------
        function addPins(dealers) {
            //clear previous pins
            map.entities.pop(pinLayer);

            //create pins from the long/lat of long/lat of returned dealers
            var pins = [];
            var pinLayer = new Microsoft.Maps.EntityCollection();

            for (var i = 0; i < dealers.length; i++) {
                pins[i] = {
                    'lat': dealers[i].Latitude,
                    'lng': dealers[i].Longitude
                };
            }

            //place the pins on the map
            var locs = [];
            for (var i = 0; i < dealers.length; i++) {
                locs[i] = new Microsoft.Maps.Location(pins[i].lat, pins[i].lng);
                var offset = new Microsoft.Maps.Point(0, 5);
                var pushpinOptions = {
                    text: '' + (i + 1)
                };
                var pin = new Microsoft.Maps.Pushpin(locs[i], pushpinOptions);
                Microsoft.Maps.Events.addHandler(pin, 'mouseover', pinMouseOver);
                Microsoft.Maps.Events.addHandler(pin, 'click', pinMouseOver);
                Microsoft.Maps.Events.addHandler(pin, 'mouseout', pinMouseOut);
                pinLayer.push(pin);
            }

            map.entities.push(pinLayer);

            //center the map around bestview relative to new pins
            var bestview = Microsoft.Maps.LocationRect.fromLocations(locs);
            map.setView({
                center: bestview.center,
                bounds: bestview
            });
        }

        function pinMouseOver(e) {
            if (e.isTouchEvent === true || e.eventName === "mouseover") {
                pinMouseOut();
                var pinNumber = e.target._text - 1;
                dealerListings[pinNumber].addClass('hovered');
            }
        }

        function pinMouseOut() {
            $('.results-item-template').removeClass('hovered');
        }

        function removePins() {}

        // ---------------------------------------------------
        // createList:
        //    constructs list of <li>s with dealer data and
        // ---------------------------------------------------
        function createList(dealers) {
            var listItems = "";
            dealerListings = {};

            $resultsList.empty();

            //not limiting zip to 5 digits breaks the dealer name in bing mobile
            for (var i = 0; i < dealers.length; i++) {
                var mapDirections = encodeURI(
                    'http://www.bing.com/mapspreview?rtp=adr.' + zipGlobal +
                    '~adr.' +
                    dealers[i].Address + ', ' +
                    dealers[i].City + ', ' +
                    dealers[i].State + ' ' +
                    dealers[i].ZipCode.substr(0, 5)
                );

                var $listItem = $resultsItemTemplate.clone();
                var distance = dealers[i].DrivingDistanceMiles;

                if (distance === null) {
                    distance = "";
                } else {
                    distance += ' mi';
                }

                var listItemValues = {
                    index: i + 1,
                    name: dealers[i].Name,
                    address: dealers[i].Address,
                    city: dealers[i].City,
                    state: dealers[i].State,
                    zipcode: dealers[i].ZipCode.substr(0, 5),
                    phone: Utility.formatPhone(dealers[i].Phone),
                    distance: distance
                };

                for (var j in listItemValues) {
                    $('.dealer-result-' + j, $listItem).text(listItemValues[j]);
                }

                $('.dealer-result-directions', $listItem).attr('href', mapDirections);
                $('.dealer-result-phone', $listItem).attr('href', 'tel:' + Utility.formatPhone(dealers[i].Phone));

                var modalUrl = $('.dealer-result-raq-modal', $listItem).attr('href') + '?DealerId=' + dealers[i].DealerNumber;
                $('.dealer-result-raq-modal', $listItem).attr('href', modalUrl);

                $('.results-list').append($listItem);
            }

            //creates list of dealers for use by pinMouseOver
            var k = 0;
            $('.results-item-template', $resultsList).each(function() {
                dealerListings[k] = $(this);
                //prevent :hover styles from making multiple dealers highlighted
                //ex: click map pin then click different dealer listing
                if (isMobile === true) {
                    dealerListings[k].addClass('mobile');
                }
                k++
            })
        }

        // ---------------------------------------------------
        // setZipInputValue:
        //    autofills the zip input field with the zipcode
        //    acquired from either cookie or geolocation
        // ---------------------------------------------------
        function setZipInputValue(zip) {
            $zipInput.val(zip);
            zipGlobal = zip;
            enableSubmitButton();
        }

        // ---------------------------------------------------
        // enableSubmitButton:
        //    enables the submit button. called once zip validated
        // ---------------------------------------------------
        function enableSubmitButton() {
            $submitButton.prop('disabled', false);
        }

        // ---------------------------------------------------
        // disableSubmitButton:
        //    disables the submit button.
        // ---------------------------------------------------
        function disableSubmitButton() {
            $submitButton.prop('disabled', true);
            $submitButton.addClass('disabled-button');
        }


        function checkCookie() {
            var flag = false;
            var cookieZip = Cookies.getCookie("zip");
            if (cookieZip != "") {
                flag = true;
                zipGlobal = cookieZip;
            }
            return flag;
        }


        //Expose the following variables and functions
        return {
            init: init
        };
    }(),

    // End Dealer Locator    
    DoubleClickTags = function() {
        function e(e) {
            try {
                var t = Math.random() + "",
                    i = 1e13 * t;
                $("html").append('<iframe src="' + e + i + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>')
            } catch (n) {
                Utility.error(n.message)
            }
        }
        return Utility.log("DoubleClickTags.js loaded"), {
            track: e
        }
    }(),
    ValidationCivic = function() {
        function e(e) {
            var i = 0,
                n = $(".form-error-list", e);
            return $(".input-wrapper", e).each(function() {
                var e = "has-error",
                    a = $(this).data("formRequired"),
                    o = $(this).data("formValidate"),
                    r = $.trim($(this).find("input, select").val()),
                    s = $(this).find("input, select").attr("id"),
                    l = $('li[data-corresponding-input-id="' + s + '"]', n),
                    c = t(o, a, r);
                if (c) {
                    i += 1;
                    var d = $(this).data(c);
                    $(this).addClass(e), $(this).children(".help-block").html(d), n.addClass(e), l.addClass(e).html(d)
                } else $(this).removeClass(e), l.removeClass(e)
            }), 0 == i ? (Utility.log("success! errorcount: " + i), e.removeClass("error"), n.removeClass("has-error"), !0) : (Utility.log("failure! errorcount: " + i), e.addClass("error"), n.addClass("has-error"), !1)
        }

        function t(e, t, i) {
            var n = "requiredError",
                a = "regexError",
                o = new RegExp(e);
            if (t) {
                if (i.length < 1) return n;
                if (e && 0 == o.test(i)) return a
            } else if (e && 0 == o.test(i) && i.length > 0) return a
        }

        function i(e) {
            n(e)
        }

        function n(e) {
            r = [], $(".input-wrapper input, .input-wrapper select", e).each(function(e) {
                r[e] = $(this).attr("id")
            }), a(e)
        }

        function a(e) {
            r.forEach(function(t) {
                if (Cookies.checkCookie(t)) {
                    var i = $("#" + t, e),
                        n = Cookies.getCookie(t);
                    "text" == i.attr("type") || "tel" == i.attr("type") || "checkbox" == i.attr("type") ? $("#" + t, e).val(n) : i[0].options && $("#" + i.attr("id") + " option[value=" + n + "]").length > 0 && i.val(n)
                }
            })
        }

        function o(e) {
            r.forEach(function(t) {
                var i = $("#" + t, e),
                    n = i.attr("id"),
                    a = i.val(),
                    o = i.parents(".input-wrapper").data("formRequired");
                1 != o && "" == a || ("zip" === n ? Cookies.createCookie(n, a, 365) : Cookies.createCookie(n, a, 0))
            })
        }
        Utility.log("Validation.js loaded");
        var r = [];
        return {
            validateForm: e,
            autoFill: i,
            saveToCookies: o
        }
    }(),
    Main = function() {
        return document.addEventListener("DOMContentLoaded", function(e) {
            Utility.log("DOMContentLoaded event fired"), Modernizr.addTest("ipad", function() {
                return null != navigator.userAgent.match(/iPad/i)
            }), Modernizr.addTest("android", function() {
                return navigator.userAgent.match("Android") && null != navigator.userAgent.match("Chrome/[.0-9]* (?!Mobile)")
            }), $.event.special.swipe.horizontalDistanceThreshold = 100, DealerLocator.init()
        }), {}
    }()
    //# sourceMappingURL=scripts.min.js.map