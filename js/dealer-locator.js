window.onload = function() {
  DealerLocator.init();
};

var DealerLocator = (function () {
        //vars from dealer locator civic
        //temporary var for testing future use of ip to lat/long service
        var fallbackGeoTest = false;
        var bapWaypoint = {};
        var map,
            isMobile = false,
            zipGlobal = "",
            lat = "",
            lng = "",
            numResults = 1,
            numResultsZip = 0,
            numResultsName = 0,
            numResultsCity = 0,
            numDataZip, numDataName, numDataCity,
            resetResults = false;
        dealerListings = {};
        var bingApiCredentials = "Ajkz_KnsjHxsfhRJeU78Xc8VgxAssv1iCF4leVVvmJLsPCaSXPaHdxuljT7aQ059";
        //options for the geolocation.getCurrentPosition call
        var geoLocateOptions = {
            enableHighAccuracy: true,
            timeout: 5000
        };
        var $dealerLocator = $('#dealer-locator'),
            $map = $('#dealer-map', $dealerLocator),
            $form = $('#search-by-zip-form'),
            $resultsListTab = $('.dealer-locator', $dealerLocator),
            $resultsList = $('.results-list', $dealerLocator),
            $resultsItemTemplate = $('.results-item-template', $resultsList).clone();

        $resultsList.empty();


        // custom vars
        var $formValidation = $('.find-a-dealer-form-acura'),
            $submitButton = $('.submit', $formValidation),
            $zipInput = $('.zip-input', $formValidation),
            $cityInput = $('.city-input', $formValidation),
            $stateInput = $('#dl-state', $formValidation),
            $maxResultsZip = $('.max-results-zip', $formValidation),
            $maxResultsCity = $('.max-results-city', $formValidation),
            $nameInput = $('.name-input', $formValidation),
            $placeHoldTextZip = '';
        $placeHoldTextCity = '';
        $placeHoldTextName = '';
		
		//here read zipCookie
        var zip = readCookie('zip');
		//cookie for preferred dealer
		var $preferredDealer = readCookie('preferredDealer');
		

        function init() {

            try {
                //riot.mount('contact_dealer_vehicle_model', {});
                //Clears tab results
                //                $(".nameTab").click(function () {
                //                    $dealerLocator = $('#dealer-locator-by-name');
                //                    $resultsList = $('.results-list', $dealerLocator);
                //                    $resultsList.empty();
                //                });


                isMobile = checkMobile();

                $('#dealer-map .loader').stop().fadeOut(100);

				console.log('se cargo el dealer-locator.js')
				
                //initialize the map
                map = new Microsoft.Maps.Map(document.getElementById('dealer-map'), {				
                    credentials: bingApiCredentials,
                    mapTypeId: Microsoft.Maps.MapTypeId.road,                    
                    center: new Microsoft.Maps.Location(39.407547, -94.2591867),
                    maxZoom: 15,
					minZoom: 5,
					zoom: 10,
					disableZooming: false,
					enableClickableLogo: false,
					showCopyright: false
                });
				

				//mousewheel event avoid zoom 
				//Microsoft.Maps.Events.addHandler(map, 'mousewheel', function (e) { e.handled = true; return true; });
				$('#dealer-map').mousewheel(function(e){ e.preventDefault(); })

                //delay geoservices until user has scrolled down to the dealerLocator component
                $resultsListTab.waypoint({
                    handler: function (direction) {
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
				
				//Add More Dealers
                $("#dealer-locator .more-dealers").click(function () {
                    $form = $('#search-by-zip-form');
                    $dealerLocator = $('#dealer-locator');
                    $resultsList = $('.results-list', $dealerLocator);
                    $resultsListTab = $('.dealer-locator', $dealerLocator);
                    numResults = numResultsZip;

                    viewMore($form);
                    numResults = numResultsZip;
                    //alert(numDataZip);
                    zipSearch($zipInput.val());
                    $('input#zip').blur();
					
                    //return false;
                });
                $("#dealer-locator-by-name .more-dealers").click(function () {
                    $form = $('#search-by-name-form');
                    $dealerLocator = $('#dealer-locator-by-name');
                    $resultsList = $('.results-list', $dealerLocator);
                    $resultsListTab = $('.dealer-locator', $dealerLocator);
                    
                    viewMore($form);
                    numResults = numResultsName;
                    getDealerData();
                    return false;
                });
                $("#dealer-locator-by-city .more-dealers").click(function () {
                    $form = $('#search-by-city-form');
                    $dealerLocator = $('#dealer-locator-by-city');
                    $resultsList = $('.results-list', $dealerLocator);
                    $resultsListTab = $('.dealer-locator', $dealerLocator);                    
                    viewMore($form);
                    numResults = numResultsCity;                    
                    getDealerData();
                    return false;
                });


                $('.use-my-location', $form).click(function useMyLocationClick() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(geoLocateSuccess, geoLocateFail, geoLocateOptions);
                    }
                });

                $formValidation.bind('submit', function (e) {
                    e.preventDefault();
                    $submitButton.trigger('click');
                    return false;
                });


                //restricts users to only entering numeric values
                //					$zipInput.on('keydown', zipKeyDown);
                //enableds or disables submit button
                //					$zipInput.on('keyup', zipCheckOnMousemove);
                //checking zip length on mouseover/mouseout to fix the case where
                //  a user uses autofill/autocomplete to populate zip input
                //$('.results', '.main-content').on('mouseout mouseover', zipCheckOnMousemove);   
                
            
                //if cookie then populate zip input and execute call to update map
                if (zip) {
                    $zipInput.val(zip);
                    //update map                    					
					$form = $('#search-by-zip-form');
                    $form.attr('action', 'http://acura.sc.release.dev.ignition.razorfish.com/platform/api/v1/dealer?productDivisionCode=B&maxResults=16&zip=' + $zipInput.val());
					zipSearch($zipInput.val());
					
                    //here if preferred dealer cookie
                    if ($preferredDealer) {
                        //	
						
                    }
                }

                $placeHoldTextZip = $zipInput.attr('placeholder');
                $zipInput.on('focus', function () {
                    clearError($(this).closest('.input-wrapper'));
                    $(this).attr('placeholder', '');
                });
                $zipInput.on('blur', function () {
                    if ($zipInput.val() == '') {
                        $(this).attr('placeholder', $placeHoldTextZip);
                    }
                });

                //focus / blur on city input
                $placeHoldTextCity = $cityInput.attr('placeholder');
                $cityInput.on('focus', function () {
                    clearError($(this).closest('.input-wrapper'));
                    $(this).attr('placeholder', '');
                });
                $cityInput.on('blur', function () {
                    if ($cityInput.val() == '') {
                        $(this).attr('placeholder', $placeHoldTextCity);
                    }
                });

                //focus / blur on name input
                $placeHoldTextName = $nameInput.attr('placeholder');
                $nameInput.on('focus', function () {
                    clearError($(this).closest('.input-wrapper'));
                    $(this).attr('placeholder', '');
                });
                $nameInput.on('blur', function () {
                    if ($nameInput.val() == '') {
                        $(this).attr('placeholder', $placeHoldTextName);
                    }
                });
                //restricts users to only entering numeric values
                $zipInput.on('input', zipInput);

                $submitButton.on('click', function (e) {
                    console.log('pressed submit from:' + $('ul.nav.nav-tabs li.active a').attr('href'));
                    var form = $(this).closest('.find-a-dealer-form-acura');
                    e.preventDefault();
                    $('strong.text-center').addClass('hide');
                    if (validateForm(form)) {
                        //if no created here create a cookie for the zip only						
                        //Create expiring cookie, 7 days from then:
                        if ($('#zipTab').hasClass('active')) {
                            numResults = 1;
                            numResultsZip = 0;
                            $form = $('#search-by-zip-form');
                            $form.attr('action', 'http://acura.sc.release.dev.ignition.razorfish.com/platform/api/v1/dealer?productDivisionCode=B&maxResults='+$maxResultsCity.val()+'&zip=' + $zipInput.val());
                            $dealerLocator = $('#dealer-locator');
                            $resultsList = $('.results-list', $dealerLocator);
                            $resultsListTab = $('.dealer-locator', $dealerLocator);
                            //$resultsList.empty();
                            zipSearch($zipInput.val());
                            $('input#zip').blur();
                            //$('.more-dealers', $dealerLocator).removeClass('hide');
                        }
                        if ($('#cityTab').hasClass('active')) {
                            numResults = 1;
                            numResultsCity = 0;
                            $form = $('#search-by-city-form');
                            $form.attr('action', 'http://acura.sc.release.dev.ignition.razorfish.com/platform/api/v1/dealer?productDivisionCode=B&maxResults='+$maxResultsCity.val()+'&state='+$stateInput.val()+'&city='+ $cityInput.val());
                            $dealerLocator = $('#dealer-locator-by-city');
                            $resultsList = $('.results-list', $dealerLocator);
                            $resultsListTab = $('.dealer-locator', $dealerLocator);
                            //$resultsList.empty();
                            getDealerData();
                            //$('.more-dealers', $dealerLocator).removeClass('hide');
                        }
                        if ($('#nameTab').hasClass('active')) {
                            numResults = 1;
                            numResultsName = 0;
                            $form = $('#search-by-name-form');
                            $form.attr('action', 'http://acura.sc.release.dev.ignition.razorfish.com/platform/api/v1/dealer?productDivisionCode=B&maxResults=500&name=' + $nameInput.val());
                            $dealerLocator = $('#dealer-locator-by-name');
                            $resultsList = $('.results-list', $dealerLocator);
                            $resultsListTab = $('.dealer-locator', $dealerLocator);
                            //$resultsList.empty();
                            getDealerData();
                            //$('.more-dealers', $dealerLocator).removeClass('hide');
                        }

                    }
                });




            } catch (e) {
                if ($form.length > 0) {
                    Utility.error(e);
                }
            }

        }


        function assignMakePreferred() {

            $('.make-preferred-dealer').click(function (e) {
                e.preventDefault();
                var $parentItemTemplate = $(this).closest('.results-item-template');
                makePreferred($parentItemTemplate);
            });

        }

        function assignRemovePreferred() {

            $('.remove-preferred-dealer').click(function (e) {
                e.preventDefault();
                var $parentItemTemplate = $(this).closest('.results-item-template');
                removePreferred($parentItemTemplate);
            });

        }

        function makePreferred(parentItemTemplate) {
            //addClass for preferred dealer			
            var $parentItemTemplate = parentItemTemplate;
            var $dealerNumber = $parentItemTemplate.find('.dealer-result-dealerNumber').text();
            var $arrayIndex = $parentItemTemplate.index();
            var $arrayList = $parentItemTemplate.closest('.results-list').find('.results-item-template');
            var $parentList = $parentItemTemplate.closest('.results-list');

            //remove preferred-dealer class from any other			
            $('.results-list').find('.preferred-dealer').removeClass('preferred-dealer');
            //hide all remove preferred dealer
            $('.results-list').find('.remove-preferred-dealer').addClass('hidden');
            //show all make preferred dealer
            $('.results-list').find('.make-preferred-dealer').removeClass('hidden');
            //add preferred-dealer class to new item			
            $parentItemTemplate.addClass('preferred-dealer');
            //hide makre preferred
            $parentItemTemplate.find('.make-preferred-dealer').addClass('hidden');
            //show remove preferred
            $parentItemTemplate.find('.remove-preferred-dealer').removeClass('hidden');
            //create a cookie with data for preferred dealer	
			createCookie('preferredDealer', $dealerNumber, 7);
			//change cookie var			
			$preferredDealer = readCookie('preferredDealer');
            //reorder nad put preferred in first place of the list			
            moveItem($arrayList, $arrayIndex, 0, $parentList);
        }

        function removePreferred(parentItemTemplate) {
            var $parentItemTemplate = parentItemTemplate;
            var $arrayList = $parentItemTemplate.closest('.results-list').find('.results-item-template');
            //removeClass for preferred dealer
            var $containerList = $parentItemTemplate.closest('.results-list');
            $parentItemTemplate.removeClass('preferred-dealer');
            //hide remove preferred
            $parentItemTemplate.find('.remove-preferred-dealer').addClass('hidden');
            //show make preferred
            $parentItemTemplate.find('.make-preferred-dealer').removeClass('hidden');
            //remove a cookie with data for preferred dealer				
            eraseCookie('preferredDealer');
			//change cookie var
			$preferredDealer = '';
            //reorder to original order, in this case no preferred dealer
            reorderList($containerList);
        }

        //function to move preferred item to top of the list
        function moveItem(arr, fromIndex, toIndex, parentList) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
            parentList.append(arr);
        }

        //function to reorder list to original positions
        function reorderList(containerList) {
            var $wrapper = containerList;
            $wrapper.find('.results-item-template').sort(function (a, b) {
                    return +a.getAttribute('data-order') - +b.getAttribute('data-order');
                })
                .appendTo($wrapper);
        }


        function validateForm($form) {
            var $field = $('.input-wrapper', $form),
                required = $field.data('formRequired'),
                regex = new RegExp($field.data('formValidate')),
                value = $('input', $field).val();
            if (required && value.length < 1) {
                showError($field.data('requiredError'), $field);
                return false;
            } else if ((regex) && (regex.test(value) === false)) {
                showError($field.data('regexError'), $field);
                return false;
            } else {
                return true;
            }
        }

        function showError(message, $field) {
            $('.error-message', $field).text(message);
        }

        function clearError($field) {
            $('.error-message', $field).text('');
        }

        function zipInput(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                $(this).closest($form).find($submitButton).trigger('click');
                return;
            }
            this.value = this.value.replace(/\D/m, '');
            if (this.value.length > 5) {
                this.value = this.value.slice(0, 5);
            }
        }

        // ---------------------------------------------------
        // function to create a cookie
        // ---------------------------------------------------        
        function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        // ---------------------------------------------------
        // function to read a cookie
        // ---------------------------------------------------    
        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        // ---------------------------------------------------
        // function to erase a cookie
        // ---------------------------------------------------  
        function eraseCookie(name) {
            createCookie(name, "", -1);
        }

        //functions dealer locator civic
        function debounce(func, wait, immediate) {
            var timeout;
            return function () {
                var context = this,
                    args = arguments;
                var later = function () {
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
        var zipCheckOnMousemove = function (e) {
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
            $('input', $form).each(function () {
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
                        $('#dealer-map .loader').show();
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
            $('#dealer-map .loader').hide();
            //check if service returned a zip code
            if (data.ZipCode) {
                setZipInputValue(data.ZipCode);
            }

            //empty result set = invalid zip
            if (!data.Dealers || data.Dealers.length == 0) {
                //Utility.log('no dealers returned');
                $('.more-dealers', $dealerLocator).addClass('hide');
                $resultsList.empty();
                //alert('no dealers returned');
                $('strong.text-center', $form).removeClass('hide');
                $('.input-wrapper', $form).addClass('has-error');
                var regexError = $('.input-wrapper').data('regex-error');
                $('.help-block', $form).html(regexError);
                return;
            } else {
                //remove any past error messaging
                numData = data.Dealers.length;
                if ($form.attr('id') == 'search-by-zip-form') {
                    numDataZip = numData;
                }
                if ($form.attr('id') == 'search-by-name-form') {
                    numDataName = numData;
                }
                if ($form.attr('id') == 'search-by-city-form') {
                    numDataCity = numData;
                }
                if (numData > 1) {
                    $('.more-dealers', $dealerLocator).removeClass('hide');
                    //alert(numData);
                }
                $('.input-wrapper', $form).removeClass('has-error');
                //set max results (we only want the 3 closest dealers)
                addPins(data.Dealers.slice(0, numResults));
                createList(data.Dealers.slice(0, numResults));
                //addPins(data.Dealers.slice(0, 3));
                //createList(data.Dealers.slice(0, 3));
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
                //Microsoft.Maps.Events.addHandler(pin, 'mouseover', pinMouseOver);
                Microsoft.Maps.Events.addHandler(pin, 'click', pinMouseClick);
                //Microsoft.Maps.Events.addHandler(pin, 'mouseout', pinMouseOut);
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

        function pinMouseClick(e) {
            if (e.isTouchEvent === true || e.eventName === "click") {
                pinMouseOut();
                var pinNumber = e.target._text - 1;
                
                var pinNumber = e.target._text - 1;
                dealerListings[pinNumber].addClass('hovered');
                $('html, body').animate({
                    scrollTop: dealerListings[pinNumber].offset().top-70
                }, 1000);
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
				var webAddress = dealers[i].WebAddress;
				
				var saleHours ={};

                if (distance === null) {
                    distance = "";
                } else {
                    distance += ' mi';
                }

                var listItemValues = {
                    index: i + 1,
                    dealerNumber: dealers[i].DealerNumber,
                    name: dealers[i].Name,
                    address: dealers[i].Address,
                    city: dealers[i].City,
                    state: dealers[i].State,
                    zipcode: dealers[i].ZipCode.substr(0, 5),
                    phone: Utility.formatPhone(dealers[i].Phone),			
                    distance: distance,
                    lat: dealers[i].Latitude,
                    lon: dealers[i].Longitude
                };

                for (var j in listItemValues) {
                    $('.dealer-result-' + j, $listItem).text(listItemValues[j]);											
                }

                $listItem.attr('data-order', listItemValues.index);
                $('.dealer-result-webAddress', $listItem).attr('href', webAddress);
				$('.dealer-result-directions', $listItem).attr('href', mapDirections);
                $('.dealer-result-phone', $listItem).attr('href', 'tel:' + Utility.formatPhone(dealers[i].Phone));
                //$('.dealer-result-index', $listItem).attr('onclick', 'DealerLocator.centerMap()');
 				
				for (var increment = 0; increment < dealers[i].SalesHours.length; increment++) {
					var salesDays = dealers[i].SalesHours[increment].Days;
					var salesHours = dealers[i].SalesHours[increment].Hours;
					
					$('.salesSchedule', $listItem).append('<span class="days col-xs-10">' + salesDays + '</span>');
					$('.salesSchedule', $listItem).append('<span class="hours">' + salesHours + '</span></br/>');

				}
				

				//here modal				
                var modalUrl = $('.dealer-result-raq-modal', $listItem).attr('href') + '?DealerId=' + dealers[i].DealerNumber;
                $('.dealer-result-raq-modal', $listItem).attr('href', modalUrl);

                $('.results-list', $dealerLocator).append($listItem);
            }

            //creates list of dealers for use by pinMouseOver
            var k = 0;
            $('.results-item-template', $resultsList).each(function () {
                dealerListings[k] = $(this);
                //prevent :hover styles from making multiple dealers highlighted
                //ex: click map pin then click different dealer listing
                if (isMobile === true) {
                    dealerListings[k].addClass('mobile');
                }
                k++
            });

			//assign make/remove preferred to anchors
            assignMakePreferred();
            assignRemovePreferred();
            centerMap();
			
			// reorder preferred after view more
			if ($preferredDealer) {        

				var $parentList = $listItem.closest('.results-list');     						
				var $arrayList = $parentList.find('.results-item-template');
				var $arrayIndex = 0;																			
				
				$parentList.find('.dealer-result-dealerNumber').each(function(index){				
					
				  if($(this).text()== $preferredDealer){ 
					$arrayIndex = $(this).closest('.row.results-item-template').index();		
					//reorder nad put preferred in first place of the list			
					moveItem($arrayList, $arrayIndex, 0, $parentList);
					//make preferred dealer anchor
					$arrayList.find('.remove-preferred-dealer').first().removeClass('hidden');					
					//show make preferred
					$arrayList.find('.make-preferred-dealer').first().addClass('hidden');
				  }
				  
				});					
					
			}	
	
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

        function viewMore(searchForm) {
            if (searchForm.attr('id') == 'search-by-zip-form') {
                if (resetResults == false) {
                    numResults = 0;
                }
                if (numDataZip > numResultsZip) {
                    numResultsZip = numResultsZip + 3;
                    resetResults = true;
                }
            }
            if (searchForm.attr('id') == 'search-by-name-form') {
                if (resetResults == false) {
                    numResults = 0;
                }
                if (numDataName > numResultsName) {
                    numResultsName = numResultsName + 3;
                    resetResults = true;
                }
            }
            if (searchForm.attr('id') == 'search-by-city-form') {
                if (resetResults == false) {
                    numResults = 0;
                }
                if (numDataCity > numResultsCity) {
                    numResultsCity = numResultsCity + 3;
                    resetResults = true;
                }
            }
        }
    function centerMap(){
        $('.dealer-result-index').click(function () {
            
            var latitude = $('.dealer-result-lat', $(this).closest('li')).html();
            var longitude = $('.dealer-result-lon', $(this).closest('li')).html();
            map.setView({
             center: 
              new Microsoft.Maps.Location(latitude, longitude),
             zoom:12});
            //alert(numResult);
             $('.results-item-template').removeClass('hovered'); 
             $(this).closest('.results-item-template').addClass('hovered');   
             $('html, body').animate({
                   scrollTop: $('#dealer-map').offset().top-70
              }, 1000); 
            return false;
         });   
    }
        //end functions dealer locator civic

        return {
            init: init
        };
    })(), // End Dealer Locator

    Cookies = function () {
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

    ValidationCivic = function () {
        function e(e) {
            var i = 0,
                n = $(".form-error-list", e);
            return $(".input-wrapper", e).each(function () {
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
            r = [], $(".input-wrapper input, .input-wrapper select", e).each(function (e) {
                r[e] = $(this).attr("id")
            }), a(e)
        }

        function a(e) {
            r.forEach(function (t) {
                if (Cookies.checkCookie(t)) {
                    var i = $("#" + t, e),
                        n = Cookies.getCookie(t);
                    "text" == i.attr("type") || "tel" == i.attr("type") || "checkbox" == i.attr("type") ? $("#" + t, e).val(n) : i[0].options && $("#" + i.attr("id") + " option[value=" + n + "]").length > 0 && i.val(n)
                }
            })
        }

        function o(e) {
            r.forEach(function (t) {
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
    }();