var Utility = (function() {
  'use strict';

  /*************************************/
  /*
  /* DEBOUNCE
  /* Returns a function, that, as long as it continues to be invoked, will not
  /* be triggered. The function will be called after it stops being called for
  /* N milliseconds. If `immediate` is passed, trigger the function on the
  /* leading edge, instead of the trailing.
  /*
  /*********************************************************/

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



  /*************************************/
  /*
  /* LOG, DEBUG, WARN, ERROR
  /* removes Utility.log, console.debug, console.warn & console.error calls
  /*   in production environment
  /* see: https://gist.github.com/nathansmith/5631193
  /*
  /*********************************************************/

  // Debug on localhost
  var host = window.location.hostname;
  var debug = host.match(
    /localhost|127.0.0.1|10.13.126.197|10.13.132.140|automobiles.dev.ignition.razorfish.com|autos.dev.ignition.razorfish.com/
  );

  // Safely log things
  function log() {
    if (debug && console && typeof console.log === 'function') {
      for (var i = 0, ii = arguments.length; i < ii; i++) {
        console.log(arguments[i]);
      }
    }
  };
  // Safely log things in blue
  function logBlue() {
    if (debug && console && typeof console.debug === 'function') {
      for (var i = 0, ii = arguments.length; i < ii; i++) {
        console.debug(arguments[i]);
      }
    }
  };
  // Safely warn things
  function warn() {
    if (debug && console && typeof console.warn === 'function') {
      for (var i = 0, ii = arguments.length; i < ii; i++) {
        console.warn(arguments[i]);
      }
    }
  };
  // Safely error things
  function error() {
    if (debug && console && typeof console.error === 'function') {
      for (var i = 0, ii = arguments.length; i < ii; i++) {
        console.error(arguments[i]);
      }
    }
  };
  function showIOSEvents(e) {
    if (debug) {
      var output = '';
      for (var obj in e) {
        output += 'e.' + obj + '=' + e[obj] + '\n';
      }
      alert(output);
    }
  }

  /*************************************/
  /*
  /* CREATE HTML
  /* Create an HTML string to be inserted into the DOM.
  /*
  /* htmlStr: the HTML to be inserted into a root element
  /* rootElement: the element type to insert the htmlStr
  /*    into (e.g. 'section', 'div', 'ul')
  /* rootClass: (optional) a class name to add to the root element
  /* data: (optional) JSON object of attributes, like HTML 5 "data-*"
  /* attributes.
  /*
  /*********************************************************/
  function createHTML(htmlStr, rootElement, rootClass, attributes) {
    if (rootElement != null) {
      var frag = document.createDocumentFragment();
      var temp = document.createElement(rootElement);
      temp.innerHTML = htmlStr;
      if (rootClass != null) {
        temp.className = rootClass;
      }
      if (attributes) {
        for (var key in attributes) {
          temp.setAttribute(key, attributes[key]);
        }
      }
      frag.appendChild(temp);
      return frag;
    } else {
      Utility.error(
        'Utility.createHTML() requires that you send it a root element' +
          ' (rootElement) to insert the html string (htmlStr) into.');
    }
  };

  function svgLoader() {
    var scripts = document.getElementsByTagName('script');
    var script = scripts[scripts.length - 1];

    for (var i = 0; i < arguments.length; i++) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        if (this.status.toString() !== '404') {
          var div = document.createElement('div');
          div.innerHTML = this.responseText;
          div.style.display = 'none';
          script.parentNode.insertBefore(div, script);
        }
      };

      xhr.onerror = function(e) {
        Utility.error('Utility.svgLoader() Error:' + e.message);
      };

      xhr.open('get', arguments[i], true);
      xhr.send();
    }
  }

  /*************************************/
  /*
  /* CLASS
  /* Add class name to an element.
  /*
  /* className: the name of the class you want to add
  /* element: the element you want to add the className on
  /*
  /*********************************************************/
  function addClass(className, element) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }


  /*************************************/
  /*
  /* REMOVE CLASS
  /* Remove class name to an element.
  /*
  /* className: the name of the class you want to remove
  /* element: the element you want to remove the className from
  /*
  /*********************************************************/
  function removeClass(className, element) {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' +
        className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  /*************************************/
  /*
  /* HAS CLASS
  /* Returns true if element has class name.
  /*
  /* className: the name of the class you want to remove
  /* element: the element you want to remove the className from
  /*
  /*********************************************************/
  function hasClass(className, element) {
    if (element != null && element.className) {
      return new RegExp('(\\s|^)' +
              className + '(\\s|$)').test(element.className);
    } else {
      return false;
    }
  }



  /*************************************/
  /*
  /* TOGGLE CLASS
  /* Add/remove class name to all elements that have a particular class name.
  /*
  /* className: the name of the class you want to toggle
  /* elementName: the class name of the elements you want to find
  /*   and toggle the className on
  /*
  /*********************************************************/
  function toggleClass(className, elementName) {
    var el;
    var elements = document.querySelectorAll('.' + elementName);

    for (i = 0; i < elements.length; i++) {
      el = elements[i];
      if (el.classList) {
        el.classList.toggle(className);
      } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push(className);

        el.className = classes.join(' ');
      }
    }
  }

  /**
   * Returns the element's children. Can include an element that won't
   * be returned even if it is one of the children of that element.
   *
   * @public
   * @param {HTMLElement} parent The parent HTMLElement to find children of.
   * @param {HTMLElement} excludeElement The child element to skip from the
   *    children returned (optional)
   * @return {Object[]} An array of HTMLElement objects that are children
   *    of the parent HTMLElement.
   *
   */
  function children(parent, excludeElement) {
    var r = [];
    for (; parent; parent = parent.nextSibling)
      if (parent.nodeType == 1 && parent != excludeElement)
        r.push(parent);
    return r;
  };

  /**
   * Returns the element's siblings. Can include an element that won't
   * be returned even if it is one of the children of that element.
   *
   * @public
   * @param {HTMLElement} element The element to find siblings of.
   * @return {Object[]} An array of HTMLElement objects that are
   *   siblings to the HTMLElement
   *
   */
  function siblings(element) {
    return children(element.parentNode.firstChild, element);
  };

  /*************************************/
  /*
  /* OUTER WIDTH WITH MARGIN
  /* Returns outer width with the calculated margin.
  /*
  /* element: the element you want to find the width of
  /*
  /*********************************************************/
  function outerWidthWithMargin(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);

    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
  };

  /*************************************/
  /*
  /* QUICK DEEP CLONE
  /* Quickly deep clones an object for duplication into another object
  /*
  /* obj: the object to be cloned
  /*
  /*********************************************************/
  function quickDeepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /*************************************/
  /*
  /* GUID
  /* Generates and returns a pseudo-guid (collision probability: 1 in 1,000,000)
  /*
  /* obj: the object to be cloned
  /*
  /*********************************************************/

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  // Default-value function
  function defaultTo(value, defaultValue) {
    return typeof value !== 'undefined' ? value : defaultValue;
  };

  /*************************************/
  /*
  /* MOBILE vs. TABLET vs. DESKTOP Checks.
  /* Returns variables for use with JS code,
  /* which needs to target specific devices based on
  /* resolutions.
  /*
  /*********************************************************/

  function isMobile() {
    // iOS uses screen.width. However the Desktop (mobile size)
    // uses window.innerWidth & not screen.width.
    var isMobile = false;

    if (window.innerWidth < 550) { // Desktop Resized Browser Check
      isMobile = true;
    } else if ((screen.width < window.innerWidth) &&
    (screen.width < 550)) { // iOS Check
      isMobile = true;
    }

    /* Here is what's happening.
     * In these scenarios, window.innerWidth is reporting a retina display &
     * isn't the correct pixel value for what we need:
     * iPhone 4 portrait:     window.innerWidth:980,  screen.width:320,
     * isMobile:true,  isTablet:false, isDesktop:false
     * iPhone 4 landscape:    window.innerWidth:981,  screen.width:480,
     * isMobile:true,  isTablet:false, isDesktop:false
     * iPhone 5 portrait:     window.innerWidth:980,  screen.width:320,
     * isMobile:true,  isTablet:false, isDesktop:false
     * iPhone 5 landscape:    window.innerWidth:835,  screen.width:637,
     * isMobile:false, isTablet:true,  isDesktop:false
     * iPhone 6 portrait:     window.innerWidth:981,  screen.width:375,
     * isMobile:true,  isTablet:false, isDesktop:false
     * iPhone 6 landscape:    window.innerWidth:980,  screen.width:667,
     * isMobile:false, isTablet:true,  isDesktop:false
     * iPhone 6+ portrait:    window.innerWidth:980,  screen.width:414,
     * isMobile:true,  isTablet:false, isDesktop:false
     * iPhone 6+ landscape:   window.innerWidth:980,  screen.width:736,
     * isMobile:false, isTablet:true,  isDesktop:false
     *
     * In these scenarios, screen.width is incorrect & we need to use the
     * window.innerWidth value:
     * Desktop (full window): window.innerWidth:1600, screen.width:1600,
     * isMobile:false, isTablet:false, isDesktop:true
     * Desktop (tablet size): window.innerWidth:783,  screen.width:1600,
     * isMobile:false, isTablet:true,  isDesktop:false
     * Desktop (mobile size): window.innerWidth:494,  screen.width:1600,
     * isMobile:true,  isTablet:false, isDesktop:false
     */

    //Utility.log('isMobile: ' + isMobile + '|' + window.innerWidth + '|' +
    //screen.width);
    return isMobile;
  }

  function isTablet() {
    var isTablet = false;
    if (!Utility.isMobile()) {
      // Desktop Resized Browser Check
      if ((window.innerWidth >= 550) && (window.innerWidth < 1024)) {
        isTablet = true;
      } else if ((screen.width < window.innerWidth) &&
      (screen.width >= 550) && (screen.width <= 1024)) { // iOS Check
        isTablet = true;
      }
    }
    /*
     * iPad portrait:         window.innerWidth:980,  screen.width:768,
     * isMobile:false, isTablet:true,  isDesktop:false
     * iPad landscape:        window.innerWidth:1024, screen.width:1024,
     * isMobile:false, isTablet:false, isDesktop:true
     * iPad mini portrait:    window.innerWidth:980,  screen.width:768,
     * isMobile:false, isTablet:true,  isDesktop:false
     * iPad mini landscape:   window.innerWidth:1024, screen.width:1024,
     * isMobile:false, isTablet:false, isDesktop:true
     */
    //Utility.log('isTablet: ' + isTablet + '|' + window.innerWidth + '|'
    //+ screen.width);
    return isTablet;
  }

  function isDesktop() {
    var isDesktop = (!Utility.isMobile() && !Utility.isTablet()) ? true : false;
    //Utility.log('isDesktop: ' + isDesktop + '|' + window.innerWidth + '|'
    //+ screen.width);
    return isDesktop;
  }

  var isIE = function() {
    var rv = false;
    var ua, re;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      ua = navigator.userAgent;
      re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
      if (re.exec(ua) != null) {
        rv = true;
      }
    }
    else if (navigator.appName === 'Netscape') {
      ua = navigator.userAgent;
      re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');
      var re2 = new RegExp('Edge/([0-9]{1,}[\.0-9]{0,})');
      if (re.exec(ua) != null || re2.exec(ua) != null) {
        rv = true;
      }
    }
    return rv;
  };

  /*
   * This is a hack to enable the :active state on iphone
   * https://developer.mozilla.org/en-US/docs/Web/CSS/:active
   */
  function enableActive() {
    if (isMobile()) {
      $('body').on('touchstart', function() {});
    }
  }

  /*
   * This attach a calback function to be trigger when
   * all images are loaded inside an element.
   *
   * It only works for <img tag.
   *
   */
  function imagesReady(element, callback) {

    $(element).each(function(index, el) {
      var $images = $('img', el);
      var totalImages = $images.length;
      var count = 0;

      $images.on('load', function() {

        if (++count === totalImages) {
          $images.off('load');
          callback(el);

        }
      });
    });
  }
  
  /*
   * this function is somethif for telephones present only in civic coupe
   *
   */  
  function formatPhone(e) {
	for (var t = e.replace(/\D/g, ""), i = {
			0: "(",
			3: ") ",
			6: "-"
		}, n = "", a = 0; a < t.length; a++) n += (i[a] || "") + t[a];
	return n
  }

  //Expose the following variables and functions
  return {
    //variables

    //methods
    debounce: debounce,
    log: log,
    logBlue: logBlue,
    warn: warn,
    error: error,
    toggleClass: toggleClass,
    addClass: addClass,
    removeClass: removeClass,
    svgLoader: svgLoader,
    hasClass: hasClass,
    isMobile: isMobile,
    isTablet: isTablet,
    isDesktop: isDesktop,
    isIE: isIE,
    outerWidthWithMargin: outerWidthWithMargin,
    siblings: siblings,
    children: children,
    defaultTo: defaultTo,
    createHTML: createHTML,
    quickDeepClone: quickDeepClone,
    guid: guid,
    enableActive: enableActive,
    imagesReady: imagesReady,
	formatPhone: formatPhone //this has civic coupe but not present in accura
  };
})();

'use strict';

var ResponsiveBackground = (function() {
  Utility.log('ResponsiveBackground.js loaded');

  function init() {
    try {
      //only call resize function every 250ms if multiple resize events are
      //detected so that the browser doesn't freeze from overloaded event calls
      var resizeFunc = Utility.debounce(function() {
        execute();
      }, 250);

      $(window).resize(resizeFunc); //add resize handler to window

      execute();
    } catch (e) {
      Utility.error('ResponsiveBackground.init() can only be called after ' +
        'DOMContentLoaded Event is triggered. Try calling from Main.js ready ' +
        'function. Error: ' +
        e.message);
    }
  }

  /****************************************************************************
   * EXECUTE
   * Loops through the elements in the site that contain the class name of
   * 'acr-responsive-background-behavior' and runs the render() function.
   * The function expects to get 6 images from the data attributes of the
   * element in the form of 'data-img-small-1x' The size identifiers are
   * small, medium and large. The pixel dfensity identifier is 1 and 2.
   * For example you can setup this responsive background behavior like this:
     <section class="acr-responsive-background-behavior"
        data-img-xsmall-1x="../../img/awards-xsmall-1x.jpg"
        data-img-xsmall-2x="../../img/awards-xsmall-2x.jpg"
        data-img-medium-1x="../../img/awards-medium-1x.jpg"
        data-img-medium-2x="../../img/awards-medium-2x.jpg"
        data-img-large-1x="../../img/awards-large-1x.jpg"
        data-img-large-2x="../../img/awards-large-2x.jpg"
        data-img-xlarge-1x="../../img/awards-xlarge-1x.jpg"
        data-img-xlarge-2x="../../img/awards-xlarge-2x.jpg"
     </section>
   ****************************************************************************/
  function execute() {
    $('.acr-responsive-background-behavior[responsified!="true"]').
      each(function() {
        render(this);

        //$(this).attr('responsified', true);

        $(this).addClass('shown');

        if ($(this).hasClass('acr-responsive-background-setheight')) {
          setHeight(this);
        }

        if ($(this).hasClass('broadcast-image-load')) {
          broadcastImageLoad(this, $(this).data('type'));
        }
      }
    );
  }

  function render(element, attribute) {
    try {
      var size, bkg;

      var width = window.innerWidth;

      var ratio = (window.devicePixelRatio <= 1) ? 1 : 2;

      var attr = '';

      if (attribute) {
        if (Object.prototype.toString.call(attribute) === '[object String]') {
          attr = attribute;
        } else {
          Utility.error('ResponsiveBackground.apply(selector, attribute) is ' +
              'expecting a String as an attribute but received a ' +
              Object.prototype.toString.call(attribute));
        }
      } else {
        //get the size of the image
        if (width < Constants.breakpoints.sm) {
          size = 'xsmall';
        } else if (width < Constants.breakpoints.lg) {
          size = 'medium';
        } else if (width <= Constants.breakpoints.xl) {
          size = 'large';
        } else {
          size = 'xlarge';
        }

        attr = 'data-img-' + size + '-' + ratio + 'x';
      }
      //get the data attribute from the section element
      bkg = $(element).attr(attr);

      if (bkg) {
        //check to make sure the image isn't the same so we're not
        //unneccessarily calling the css() function from jQuery
        if ($(element).data('acrVarCurrentResponsiveBkg') !== bkg) {
          $(element).data('acrVarCurrentResponsiveBkg', bkg);

          $(element).css('background-image', 'url(\'' + bkg + '\')');
        }
      }
    } catch (e) {
      Utility.error(e.message);
    }
  }

  /****************************************************************************
   * SETHEIGHT
   * If the element has the class "acr-responsive-background-setheight
   * then set its height automatically remaining the image aspect ratio
     <section
     class="
       acr-responsive-background-behavior
       acr-responsive-background-setheight
       "
       ...
     </section>
   ****************************************************************************/
  function setHeight(element) {
    try {
      var width, height, widthEle, heightEle, ratio;

      var imageSrc = element.
          style.
          backgroundImage.
          replace(/url\((['"])?(.*?)\1\)/gi, '$2').
          split(',')[0];

      var image = new Image();

      var calcHeight = function() {
        width = image.width;

        height = image.height;

        ratio = width / height;

        widthEle = $(element).width();

        heightEle = Math.floor(widthEle / ratio);

        if (heightEle !== $(element).height()) {
          $(element).css({
            height: heightEle + 'px'
          });
        }
      };

      image.onload = calcHeight;

      image.src = imageSrc;
    } catch (e) {
      Utility.error(e.message);
    }
  }

  function broadcastImageLoad(element, type) {
    try {
      var image = new Image();
      var imageSrc = element.
          style.
          backgroundImage.
          replace(/url\((['"])?(.*?)\1\)/gi, '$2').
          split(',')[0];

      image.onload = function() {
        $(document).trigger(type, imageSrc);
      };

      image.src = imageSrc;

    } catch (e) {
      Utility.error(e.message);
    }
  }

  //Expose the following variables and functions
  return {
    execute: execute,
    render: render,
    setHeight: setHeight,
    init: init
  };
})();

'use strict';

var WayPoints = (function() {
  function init() {
    $(document).ready(function() {
      // Basic Animation directions

      $(' .acr-fdown').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-down');
        }, {
          offset: '100%'
        });
      });

      $(' .acr-ftop ').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-top');
        }, {
          offset: '100%'
        });
      });

      $(' .acr-fbottom-scatter').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-up-scatter');
        }, {
          offset: '100%'
        });
      });

      $(' .acr-fbottom-scatter-short').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-up-scatter-short');
        }, {
          offset: '100%'
        });
      });

      $(' .acr-fbottom ').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-up');
        }, {
          offset: '100%'
        });
      });


      $('.acr-fleft').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-left');
        }, {
          offset: '100%'
        });
      });

      $('.acr-fright').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-right');
        }, {
          offset: '100%'
        });
      });


      // special to underline in headdings
      $(' .acr-underheading.acr-fcenter').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('acr-fill-from-center');
        }, {
          offset: '100%'
        });
      });

      $(' .acr-fcenter-is-grey').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('acr-fill-from-center-is-grey');
        }, {
          offset: '100%'
        });
      });

      //Use of stagger (ie: Headings - staggering header + underline
      $(' .acr-fbottom-scatter .acr-stagger').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-up-scatter');
        }, {
          offset: '100%'
        });
      });

      $(' .acr-ftop .acr-stagger').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-top');
        }, {
          offset: '100%'
        });
      });

      $('.acr-fbottom .acr-stagger').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-up');
        }, {
          offset: '100%'
        });
      });

      $('.acr-fleft .acr-stagger').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-left');
        }, {
          offset: '100%'
        });
      });

      $('.acr-fright .acr-stagger').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-right');
        }, {
          offset: '100%'
        });
      });

      // Vehicle Line Up gallery specific
      $('.acr-scattered .acr-lineup').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in');
        }, {
          offset: '100%'
        });
      });

      // Vehicle Line Up gallery *DIRECTIONAL
      $('.acr-scattered .acr-lineup.ftop').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-top');
        }, {
          offset: '100%'
        });
      });

      // Vehicle Line Up gallery specific
      $('.acr-scattered .acr-lineup.fbottom').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-in-bottom');
        }, {
          offset: '100%'
        });
      });

      // shopiing tools
      $('.acr-fade-zoom').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('acr-fade-in');
        }, {
          offset: '100%'
        });
      });

      //Keystory trigger Zoomit
      $('.key-image').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('zoomit');
        }, {
          offset: '70%'
        });
      });

      $('.key-headline').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('zoom-it-2');
        }, {
          offset: '100%'
        });
      });

      $('.acr-fade-scale').each(function() {
        $(this).waypoint(function() {
          $(this.element).addClass('animated acr-fade-scale-up');
        }, {
          offset: '100%'
        });
      });


    });
  }

  return {
    init: init
  };
})();

var YouTubeManager = (function() {

  Utility.log('YouTubeManager.js loaded');

    var playerManager = $.noop;
    var options = {
        bladeContainerSelector: '[video-blade]',
        triggerSelector: '[video-trigger]',
        instanceIdAttribute: 'video-id',
        instanceSourceAttribute: 'video-source',
        targetAreaSelector: '[video-target]',
        targetAreaWrapperSelector: '[video-target-container]',
        targetAreaCloseSelector: '[video-action-close]'
    };

    playerManager.players = [];

    loadedAPI = false;

    function init() {
      playerManager.init();
    }

    playerManager.loadAPI = function() {
      if (!loadedAPI) {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        loadedAPI = true;
        console.log('Player API (YouTube) loaded');
      }
    };

    playerManager.initializePlayers = function() {
        for (var p = 0; p < playerManager.players.length; p++) {
            //console.log('Initializing player
            //from saved player object', playerManager.players[p]);
            playerManager.players[p].init();
        }
    };

    playerManager.init = function() {
        //console.log('Manager init');
        var playerElements = $(options.bladeContainerSelector);
        if (playerElements.length) {
            for (var i = 0; i < playerElements.length; i++) {

                var blade = $(playerElements[i]),
                   trigger = blade.find(options.triggerSelector),
                   close = blade.find(options.targetAreaCloseSelector),
                   target = blade.find(options.targetAreaSelector),
                   container = blade.find(options.targetAreaWrapperSelector);

                var thisPlayer = new YouTubePlayerObject(
                                  trigger.attr(options.instanceSourceAttribute),
                                  trigger,
                                  close,
                                  target,
                                  container,
                                  0);
                playerManager.players.push(thisPlayer);

            }
            playerManager.loadAPI();
        }
    };

    function YouTubePlayerObject(sourceId,
                                  triggerButton,
                                  closeButton,
                                  componentTarget,
                                  componentContainer,
                                  autoplay) {
        this.id = 'youTubeEmbed_' + sourceId;
        this.sourceId = sourceId;
        this.autoplay = autoplay;

        this.$triggerButton = triggerButton;
        this.$closeButton = closeButton;
        this.$componentTarget = componentTarget;
        this.$componentContainer = componentContainer;

        this.playerObject = null;
        this.initialized = false;
        this.options = { videoOpenClass: 'video-open' };

        var self = this;
        this.init = function() {
            if (!self.initialized) {
                //console.log('Current player initialization', self.id);
                // Append dummy div and assign ID
                var videoDomElement = $('<div>', { id: self.id });
                self.$componentContainer.append(videoDomElement);
console.log(self.autoplay);
                // Initialize IFRAME Embedding using YT API
                self.playerObject = new YT.Player(self.id, {
                    videoId: self.sourceId,
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        'modestbranding': 1,
                        'rel': 0,
                        'showinfo': 0,
                        'wmode': 'opaque',
                        'iv_load_policy': 3,
                        'autoplay': self.autoplay
                    },
                    events: {
                        'onReady': self.onPlayerReady,
                        'onStateChange': self.onPlayerStateChange
                    }
                });
                self.initialized = true;
            }
        };

        this.onPlayerReady = function() {
            //console.log('Binding events for ', self.id);
            self.bindEvents();
        };

        this.onPlayerStateChange = function() { };

        this.bindEvents = function() {/*
            self.$triggerButton.on('click', function(event) {

                self.$componentTarget.addClass(self.options.videoOpenClass);
                self.play();
            });*/
            self.$closeButton.on('click', function(event) {

                self.$componentTarget.removeClass(self.options.videoOpenClass);
                self.stop();
            });
        };

        this.play = function() {
            //console.log('Playback of video', self.playerObject);
            // Force user to click YouTube videos
            //self.playerObject.playVideo();
        };

        this.stop = function() {
            self.playerObject.pauseVideo();
        };
    };


    // Global callback YouTube API function
    window.onYouTubeIframeAPIReady = function() {
        playerManager.initializePlayers();
    };

    return {
      init: init,
      playerManager: playerManager,
      YouTubePlayerObject: YouTubePlayerObject
    };
})();

var Accessories = (function() {
  'use strict';

  var currentBreakpoint;
  var $accessoriesSliders;

  function init() {
    attachResize();
    resize();
  }

  function initSlick() {
    $accessoriesSliders = $('.accessories-slick').slick({
      dots: true,
      prevArrow: '<svg class="acr-icon slick-prev slick-arrow"' +
                ' viewBox="0 0 26 26">' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
                ' xlink:href="#arrow-left">' +
                ' </use></svg>',
      nextArrow: '<svg class="acr-icon slick-next slick-arrow"' +
                ' viewBox="0 0 26 26">' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
                ' xlink:href="#arrow-right">' +
                '</use></svg>',
      useTransform: true
    });
  }

  function removeSlick() {
    if ($accessoriesSliders) {
      $('.accessories-slick').slick('unslick');
    }
  }

  function attachResize() {
    $(window).off('resize', resize);
    $(window).resize(resize);
  }

  function resize() {
    var width = window.innerWidth;

    if (width < Constants.breakpoints.lg && currentBreakpoint !== 'small') {
      currentBreakpoint = 'small';
      initSlick();
    } else if (width >= Constants.breakpoints.lg &&
        currentBreakpoint !== 'large') {
      currentBreakpoint = 'large';
      removeSlick();
    }
  }

  return {
    init: init
  };
})();

// [AR-2908] PL: Create JS Behaviors [Promo Tiles - Type 1]

var BladePromoTiles1 = (function($window) {
    Utility.log('BladePromoTiles1.js loaded');

    var promoTiles = {};

    //PromoTiles Basic Constructor
    function PromoTiles() {
        this.$el = $('.promo-tiles-1');
        this.$expandButton = this.$el.find('[aria-haspopup]');
        this.$tiles = this.$el.find('a');
        this.$shoppingTools = $('.shoping-tools-component');
        this.$hero = $('.acr-hero');
        this.screenWidth = 0;
        this.animationFrame = 0;

        return this;
    }

    //Global-er Functions
    // function togglePromoTiles() {
    //     promoTiles.$tiles.toggle();
    //     promoTiles.$expandButton
    //         .toggleClass('acr-icon-button-collapse acr-icon-button-expand');
    // }

    function updatePromoTiles() {
        //Since iOS likes to trigger resize events on scroll...
        if (promoTiles.screenWidth === $window.width()) {
            cancelAnimationFrame(promoTiles.animationFrame);
            return false;
        }

        //If not, update the value in promoTiles
        promoTiles.screenWidth = $window.width();

        //Mobile
        if (promoTiles.screenWidth < Constants.breakpoints.sm) {
            promoTiles.$el.insertAfter(promoTiles.$shoppingTools);
        } else {
            //Not Mobile
            promoTiles.$tiles.show();
            promoTiles.$el.insertAfter(promoTiles.$hero);
        }

        promoTiles.animationFrame = requestAnimationFrame(updatePromoTiles);
    }

    function init() {

        //Bail if this element DNE
        if ($('.promo-tiles-1').length === 0) return null;

        //Otherwise initialize the constructor
        promoTiles = new PromoTiles();

        //Init with Clean Slate
        updatePromoTiles();

        //(Delegated) Event Handlers
        // promoTiles.$el
        //     .on('click.promoTiles', promoTiles.$expandButton,
        //     togglePromoTiles);

        $(window)
            .on('resize.promoTiles orientationchange.promoTiles', function() {
            promoTiles.animationFrame = requestAnimationFrame(updatePromoTiles);
        });

        return this;
    }

    return {
        init: init
    };
})($(window));

(function(window, $) {
  'use strict';
  var Acr = window.Acr = window.Acr || {};
  var Ut = window.Utility;

  Acr.boxParallax = (function($) {
    var parallaxSelector = '[data-box-parallax]',
    pElSel = '[data-box-content]',
    pElDOMRefI = {},
    parallaxElements = [],
    registeredAnimationFrames = [],
    goParallax = (Ut.isMobile() || Ut.isIE() || Ut.isTablet()) ? false : true;

    var initialWidth;

    var init = function() {
      initialWidth = window.innerWidth || document.documentElement.clientWidth;
      var cssSelector = parallaxSelector;

      clearAnimationFrames();
      $(window).off('scroll', addAnimationFrame);

      if ($(cssSelector).length) {
        var wProps = getwProps();
        pElDOMRefI = {};

        $(cssSelector).each(function(index, el) {
          var parallaxElement = {};
          parallaxElement.element = $(el);
          parallaxElements.push(parallaxElement);

          var $pEl = parallaxElement.element;

          $pEl
          .addClass('acr-box-parallax')
          .children(pElSel).addClass('acr-box-parallax-element');

          pElDOMRefI[index] = $pEl.find(pElSel);

          if (goParallax) {
            moveElement(pElDOMRefI[index], wProps.wTop, wProps.wHeight);
          }
        });

        $(window).resize(function(event) {
          var cW = window.innerWidth || document.documentElement.clientWidth;
          if (initialWidth !== cW) {
            initialWidth = cW;
            goParallax = true;
            var wProps = getwProps();
            $.each(parallaxElements, function(index, parallaxElement) {
              if (goParallax) {
                var $pEl = parallaxElement.element;
                moveElement(pElDOMRefI[index], wProps.wTop, wProps.wHeight);
              }
            });
          }
        });

        if (goParallax) {
          $(window).scroll(addAnimationFrame);
        }
      }
    };

    var getElementBoundingRect = function(Ele) {
      var rect = Ele[0].getBoundingClientRect(),
          win = window,
          doc = document;
      var results = {
        rect: rect,
        inViewport: false
      };
      if (rect.bottom >= 0 &&
        rect.top <= (win.innerHeight || doc.documentElement.clientHeight)) {
        results.inViewport = true;
      }
      return results;
    };

    var moveElement = function($pEl, wTop, wHeight) {
      var elementRect = getElementBoundingRect($pEl);
      if (elementRect.inViewport) {
        var bgBladeTopPos = $pEl.offset().top,
        slashHeight = elementRect.rect.height,
        bghHeight = slashHeight * 1.2,
        maxOffset = (slashHeight - bghHeight) + 2,
        bgSpeed = $pEl.data('box-speed') ? $pEl.data('box-speed') : 30;
        var doReverse = $pEl.data('box-reverse') ? true : false;
        bgSpeed = -Math.abs(bgSpeed);
        var offset = ((wTop - bgBladeTopPos) / slashHeight) * bgSpeed;
        offset = Math.max(offset, maxOffset);
        if (doReverse) {
          offset = offset * -1;
        }

        $pEl.css({ 'transform': 'translate3d(0px,' + offset + 'px, 0px)' });
      }
    };

    var sHandler = function() {
      var wProps = getwProps();
      $.each(parallaxElements, function(index, parallaxElement) {
        if (goParallax) {
          moveElement(pElDOMRefI[index], wProps.wTop, wProps.wHeight);
        }
      });
    };

    var addAnimationFrame = function() {
      registeredAnimationFrames.push(window.requestAnimationFrame(sHandler));
    };

    var getwProps = function() {
      return {
        wTop: $(window).scrollTop(),
        wHeight: $(window).height()
      };
    };

    var clearAnimationFrames = function() {
      $.each(registeredAnimationFrames, function(index, requestID) {
        window.cancelAnimationFrame(requestID);
      });
      registeredAnimationFrames = [];
    };

    var destroy = function() {
      parallaxElements = [];
      $(window).off('scroll', addAnimationFrame);
      clearAnimationFrames();
      if (pElDOMRefI) {
        $.each(pElDOMRefI, function(k, v) {
          pElDOMRefI[k] = null;
        });
        pElDOMRefI = null;
      }
    };

    return {
      init: init
    };
  })($);

})(window, jQuery);

var ButtonLine = (function() {
  'use strict';

  var $buttonLines;

  var $line;

  var defaultScrollFactor;

  var defaultColor = 'white';

  function init() {
    $buttonLines = $('[data-acr-button-line]');

    defaultScrollFactor = 0.7;

    createLine();

    attachScroll();

    attachResize();

    scroll();
  }

  function createLine() {
    $line = $('<div/>', {
      'class': 'acr-button-line'
    });

    $('body').prepend($line);
  }

  function attachScroll() {
    $(window).off('scroll', scroll)
             .on('scroll', scroll);
  }

  function attachResize() {
    $(window).off('resize', scroll)
             .on('resize', scroll);
  }

  function drawLine($anchor, $window, elHeight, scrollFactor, color) {
    var winTop = $window.scrollTop();

    var winBottom = winTop + $window.height();

    var elTop = $anchor.offset().top;

    var elBottom = elTop + $anchor.outerHeight();

    if ((elTop < winBottom)) {
      var height = (winBottom - elTop) * scrollFactor;

      if (elHeight > height) {
        $line.height(height);
      } else {
        $line.height(elHeight);
      }

      $line.css({
        'top': elBottom,
        'background-color': color
      });
    }
  }

  function scroll() {
    var $window = $(window);

    if ($window.innerWidth() < Constants.breakpoints.sm) {
      return;
    }

    $buttonLines.each(function(i, lineAnchor) {
      var elHeight;

      var $lineAnchor = $(lineAnchor);

      if ($lineAnchor.attr('data-enable') === undefined) {
        return;
      }

      var scrollFactor = $lineAnchor.data('scrollFactor') ||
        defaultScrollFactor;

      var color = $lineAnchor.data('color') ||
        defaultColor;

      if ($window.innerWidth() < Constants.breakpoints.sm) {
        elHeight = $lineAnchor.data('smHeight');
      } else if ($window.innerWidth() < Constants.breakpoints.lg) {
        elHeight = $lineAnchor.data('mdHeight');
      } else if ($window.innerWidth() < Constants.breakpoints.xl) {
        elHeight = $lineAnchor.data('lgHeight');
      } else {
        elHeight = $lineAnchor.data('xlHeight');
      }

      drawLine($lineAnchor, $window, elHeight, scrollFactor, color);
    });
  }

  return {
    init: init
  };
})();

var Chart = (function() {
  'use strict';

  var $packages;

  function init() {
    attachClick();
    layout();
  }

  function attachClick() {
    $packages = $('.acr-chart .package');
    $packages.on('click', clickHandler);
    $packages.find('.acr-cta-text').on('click', readMoreHandler);
  }

  function clickHandler() {
    var $this = $(this);
    var relatedPackages = $this.data('relatedPackages');

    $('.acr-chart .package').removeClass('active related');

    if (relatedPackages) {
      relatedPackages = relatedPackages.split(',');

      $.each(relatedPackages, function(i, id) {
        $('#' + id).addClass('related');
      });
    }

    $this.addClass('active');
  }

  function readMoreHandler(e) {
    e.preventDefault();

    var id = e.currentTarget.href.split('#')[1];
    var headerHeight = $('.acr-header').innerHeight();

    $('html, body').animate({
      scrollTop: $('#' + id).offset().top - headerHeight
    }, 1000);
  }

  function layout() {
    $('.acr-chart').each(function(i, container) {
      var $container = $(container);
      var numPackages = 0;
      var $containerDiv = $('<div class="package-container"></div>');
      var pkgs = $container.find('.package');
      var pkgDivs = [];
      var limit;

      // Each row should have between 3 and 5 packages
      if (pkgs.length <= 5) {
        limit = pkgs.length;
      } else if (pkgs.length > 5 && pkgs.length <= 8) {
        limit = pkgs.length - 3;
      } else {
        limit = 5;
      }

      while (pkgs.length > 0) {
        var pkg = pkgs.splice(0, 1);
        numPackages += 1;

        $containerDiv.append(pkg);

        if (numPackages === limit) {
          pkgDivs.push($containerDiv);
          numPackages = 0;
          $containerDiv = $('<div class="package-container"></div>');
        }
      }

      if (!$containerDiv.is(':empty')) {
        pkgDivs.push($containerDiv);
      }

      pkgDivs.reverse();

      for (var j = 0; j < pkgDivs.length; j++) {
        pkgDivs[j].prependTo($container);
      }
    });
  }

  return {
    init: init
  };
})();

var Constants = (function() {
  'use strict';

  var breakpoints = {
    xs: 320,
    sm: 550,
    md: 768,
    lg: 1024,
    lgxl: 1200,
    xl: 1400,
    mega: 1920
  };

  var grid = {
    one36th: 0.0277778,
    two36th: 0.0555556,
    three36th: 0.0833333,
    four36th: 0.1111111,
    five36th: 0.1388889,
    six36th: 0.1666667,
    seven36th: 0.1944444,
    eight36th: 0.2222222,
    nine36th: 0.25,
    ten36th: 0.2777778,
    eleven36th: 0.3055556,
    twelve36th: 0.3333333,
    thirteen36th: 0.3611111,
    fourteen36th: 0.3888889,
    fifteen36th: 0.4166667,
    sixteen36th: 0.4444444,
    seventeen36th: 0.4722222,
    eighteen36th: 0.50,
    nineteen36th: 0.5277778,
    twenty36th: 0.5555556,
    twentyOne36th: 0.5833333,
    twentyTwo36th: 0.6111111,
    twentyThree36th: 0.6388889,
    twentyFour36th: 0.6666667,
    twentyFive36th: 0.6944444,
    twentySix36th: 0.7222222,
    twentySeven36th: 0.75,
    twentyEight36th: 0.7777778,
    twentyNine36th: 0.8055556,
    thirty36th: 0.8333333,
    thirtyOne36th: 0.8611111,
    thirtyTwo36th: 0.8888889,
    thirtyThree36th: 0.9166667,
    thirtyFour36th: 0.9444444,
    thirtyFive36th: 0.9722222,
    thirtySix36th: 0.100
  };

  return {
    breakpoints: breakpoints,
    grid: grid
  };
})();

var Culture = (function() {
  'use strict';

  Utility.log('Culture.js loaded');

  var size = $.noop;
  var $cultureSlick = $.noop;
  var imgs = [];
  var debounce = $.noop;

  function init() {
    resize();
    setOnResize();
    onResize();
  }

  function setOnResize() {
    window.addEventListener('resize', onResize);

  }

  function onResize() {
    clearTimeout(debounce);
    debounce = setTimeout(resize, 250);
  }

  function resize() {
    var width = window.innerWidth;
    var socialBox = $('.social-container').parent().parent();

    if (width < Constants.breakpoints.sm && size !== 'xs') {
      size = 'xs';
      setSlick();

    } else if (width >= Constants.breakpoints.sm && size !== 'sm') {
      size = 'sm';

      removeSlick();
    }

    if (width < Constants.breakpoints.lg && width >= Constants.breakpoints.sm) {
      $(socialBox).addClass('add-social-margin');
    } else {
      $(socialBox).removeClass('add-social-margin');
    }

    if (width < Constants.breakpoints.sm) {
      $('.social-container')
      .attr('style', 'width:' + $(document).width() + 'px');
      $('.btn-wrapper').removeClass('text-left');
    } else {
      $('.btn-wrapper').addClass('text-left');
    }

    if (width > Constants.breakpoints.lg) {
      $(socialBox).addClass('add-social-margin-xl');
    } else {
      $(socialBox).removeClass('add-social-margin-xl');
    }

    var DPR = window.devicePixelRatio;
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      if (DPR <= 0.999 || DPR >= 1.001) {
        var images = $('.component-slick').find('img');

        images.each(function(i) {
          var nwidth = images[i];
          $(images[i]).parent().parent().css('width', $(nwidth).width() + 'px');
        });
      }
    }
  }

  function setSlick() {
    $cultureSlick = $('.component-slick').slick({
      dots: true,
      variableWidth: true,
      centerMode: true,
      infinite: true,
      useTransform: true
    });

    $('.component-slick').on('beforeChange',
      function(event, slick, currentSlide, nextSlide) {
    });

    $('.component-slick').slick('slickFilter', '.hidden-sm');
    addArrowsStyle();
  }

  function removeSlick() {
    if ($cultureSlick.length) {

      $('.component-slick').slick('slickUnfilter');
      $('.component-slick').slick('unslick');
      if ($('.component-slick article').attr('style') === '') {
        $('.component-slick article').each(function() {
          var bkg = $(this).data('acrVarCurrentResponsiveBkg');
          $(this).css('background-image', 'url(' + bkg + ')');
        });
      }
    }
  }

  function addArrowsStyle() {
    $('.slick-next', $cultureSlick)
    .addClass('acr-icon-arrow-large-right acr-f2 acr-black').text('');
    $('.slick-prev', $cultureSlick)
    .addClass('acr-icon-arrow-large-left acr-f2 acr-black').text('');
  }

  return {
    init: init
  };
})();

var Disclaimer = (function() {
  'use strict';

  Utility.log('Disclaimer.js loaded');

  var disclaimer = $('.acr-disclaimer');

  function init() {
    $('.acr-sup').on('click', function(e) {
      e.stopPropagation();

      e.preventDefault();

      var target = $(this).data('target');

      var title = '<sup>' + $(this).data('number') + '</sup>' +
          $(this).data('title');

      $('h4', target).html(title);

      $('p', target).html($(this).data('copy'));

      disclaimer.hide();

      if (disclaimer.height() > $(window).height()) {
        disclaimer.addClass('acr-disclaimer-big');
      }

      $(target).show();
    });

    $('body').on('click', function() {
      disclaimer.hide();

      $('body').off('click');
    });

    $('.acr-icon-button-close', '.acr-disclaimer').on('click', function(e) {
      e.stopPropagation();

      $(this).parents('.acr-disclaimer').hide();
    });

    disclaimer.on('click', function(e) {
      e.stopPropagation();
    });
  }

  return {
    init: init
  };
})();

var FeatureModal = (function() {
  'use strict';

  var $featureModal;

  var $body;

  var interval;

  var spinner;

  var debounce;

  function init() {
    $body = $('body');
    $featureModal = $('.acr-feature-modal');
    spinner = $('<div class="animated-spinner-container">' +
      '<div class="animated-spinner"></div></div>');

    attachFetch();
    attachClicks();
    attachKeyboardInput();
    attachResize();
  }

  function attachFetch() {
    $featureModal = $('.acr-feature-modal');
    var $modalAnchors = $('[data-acr-feature-modal]');

    $modalAnchors.off('click', fetch)
                 .on('click', fetch);
  }

  function fetch(e) {
    e.preventDefault();

    $featureModal.find('.feature-modal-window').html(spinner);
    $featureModal.addClass('visible');

    $.get($(this).attr('href') + '?stub=1', function(data) {

      $featureModal.find('.animated-spinner').removeClass('visible');

      $featureModal.find('.feature-modal-window').html(
        data);

      $featureModal.addClass('visible');

      if ($('html').hasClass('ie')) {

        setTimeout(waitImage, 400);

      } else {

        layout();
        Disclaimer.init();

      }




    });
  }

  function attachClicks() {
    $(document).off('click',
      '.acr-feature-modal .acr-icon.feature-modal-close', closeHandler);
    $(document).on('click',
      '.acr-feature-modal .acr-icon.feature-modal-close', closeHandler);

    $(document).off('click',
      '.acr-feature-modal use', closeHandler);
    $(document).on('click',
      '.acr-feature-modal use', closeHandler);

    $featureModal.off('click', closeHandler)
                 .on('click', closeHandler);

    $featureModal.find('.feature-modal-window')
                 .off('click', stopPropagation)
                 .on('click', stopPropagation);
  }

  function attachKeyboardInput() {
    $(document).off('keyup', keyboardHandler)
               .on('keyup', keyboardHandler);
  }

  function attachResize() {
    $(window).off('resize', layout);
    $(window).resize(layout);
  }

  function onResize() {
    clearTimeout(debounce);
    debounce = setTimeout(layout, 250);
  }

  function openHandler(e) {
    e.preventDefault();

    var $anchor = $(this);
    var $sources = $featureModal.find('source');

    $($sources[0]).attr('srcset', $anchor.attr('data-img-xlarge-1x') +
      ', ' + $anchor.attr('data-img-xlarge-2x') + ' 2x');
    $($sources[1]).attr('srcset', $anchor.attr('data-img-large-1x') +
      ', ' + $anchor.data('data-img-large-2x') + ' 2x');
    $($sources[2]).attr('srcset', $anchor.attr('data-img-medium-1x') +
      ', ' + $anchor.attr('data-img-medium-2x') + ' 2x');

    $featureModal.find('img').attr('srcset',
      $anchor.attr('data-img-xsmall-1x') +
      ', ' + $anchor.attr('data-img-xsmall-2x') + ' 2x');

    $featureModal.find('.content-name').text($anchor.data('name'));
    $featureModal.find('.header-name').text($anchor.data('name'));
    $featureModal.find('.description').html($anchor.data('description'));

    $featureModal.addClass('visible');

    layout();

    $body.addClass('modal-open');
  }

  function closeHandler() {
    $featureModal.removeClass('visible');
    $body.removeClass('modal-open');
  }

  function stopPropagation(e) {
    var $target = $(e.target);
    if (!$target.is('svg') && !$target.is('use')) {
      e.stopPropagation();
    }
  }

  function keyboardHandler(e) {
    if (e.which == 27) { // esc key
      if ($featureModal.hasClass('visible')) {
        closeHandler();
      }
    }
  }

  function layout() {
    var $featureModal = $('.acr-feature-modal');

    if (!$featureModal.hasClass('visible')) {
      return;
    }

    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    if (windowWidth < Constants.breakpoints.sm) {
      picturefill();

      var headerHeight = $featureModal.find('.header').height();
      var imgHeight = $featureModal.find('img').height();

      if (imgHeight === 0) {
        clearInterval(interval);
        interval = setInterval(layout, 100);
      } else {
        clearInterval(interval);
      }

      $featureModal.find('.content').innerHeight(
        windowHeight - headerHeight - imgHeight);
    } else {
      var imgHeight = $featureModal.find('img').height();
      var $content = $featureModal.find('.content');

      if (imgHeight === 0) {
        clearInterval(interval);
        interval = setInterval(layout, 100);
      } else {
        clearInterval(interval);
      }

      $featureModal.find('.content').innerHeight('auto');

      if (imgHeight > 0 && $content.height() > imgHeight * 1.5) {
        $content.height(imgHeight * 1.5);
      }
    }

    $body.addClass('modal-open');
  }

  function waitImage() {
    if ($featureModal.find('img').length) {

      var src = $featureModal.find('img').attr('src');
      var srcset = $featureModal.find('img').attr('srcset');

      if (src === undefined) {console.log('undefined');
        src = srcset.split(',');
        src = src[0];
      }

      var image = new Image();

      image.onload = function() {
        layout();
        Disclaimer.init();
      };

      image.src = src;
    }
  }

  return {
    init: init
  };
})();

var FSB = (function() {
  'use strict';

  Utility.log('FeatureScondaryBlade---.js loaded');

  var size = $.noop;
  var $featuresSlick = $.noop;
  var imgs = [];
  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  function init() {
    setOnResize();
    findImages();
    resize();
  }

  function setOnResize() {
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', findImages);
  }

  function findImages() {
    imgs = [];
    imgs = $('.features-secondary').find('img');
    if (iOS) {
      $.each(imgs, function(index, value) {
        var url = $(imgs[index]).attr('data-pfsrc');
        $(imgs[index]).removeAttr('src');

        var timer = setTimeout(imageChanger($(imgs[index]), url), 3000);
      });
    }
  }

  function resize() {
    var width = window.innerWidth;
    var tileWidth = $('.features-secondary').find('.tile').width();
    var margin = (width - tileWidth) / 2;

    if (width < Constants.breakpoints.lg) {
      size = 'xs';

      var tiles = $('.features-secondary').find('.tile');
      $.each(tiles, function(index, value) {
        $(tiles[index]).removeClass('tab-pane').removeClass('fade');
      });

      setSlick();

    } else {
      size = 'sm';

      var tiles = $('.features-secondary').find('.tile');
      $.each(tiles, function(index, value) {
        $(tiles[index]).addClass('tab-pane')
        .addClass('fade')
        .removeAttr('style');
      });

      removeSlick();
    }

    findImages();
  }

  function imageChanger(_obj, _url) {
    $(_obj).removeAttr('src').attr('src', _url);
  }

  function setSlick() {
    $featuresSlick = $('.component-featured-slick').slick({
      dots: true,
      useTransform: true
    });
    addArrowsStyle();
  }

  function removeSlick() {
    if ($featuresSlick.length) {
      $('.component-featured-slick').slick('unslick');
      if ($('.component-featured-slick article').attr('style') === '') {
        $('.component-featured-slick article').each(function() {
          var bkg = $(this).data('acrVarCurrentResponsiveBkg');
          $(this).css('background-image', 'url(' + bkg + ')');
        });
      }
    }
  }

  function addArrowsStyle() {
    $('.slick-next', $featuresSlick)
    .addClass('acr-icon-arrow-large-right acr-f2 acr-black').text('');
    $('.slick-prev', $featuresSlick)
    .addClass('acr-icon-arrow-large-left acr-f2 acr-black').text('');
  }

  return {
    init: init
  };
})();

var FindADealer = (function() {
  var $form = $('.find-a-dealer-form'),
    $submitButton = $('.submit', $form),
    $zipInput = $('.zip-input', $form),
    $placeHoldText = '';

  function init() {
    $placeHoldText = $zipInput.attr('placeholder');

    $zipInput.on('focus', function() {
      clearError($(this).closest('.input-wrapper'));
      $(this).attr('placeholder', '');
    });

    $zipInput.on('blur', function() {
      if ($zipInput.val() == '') {
        $(this).attr('placeholder', $placeHoldText);
      }
    });
    //restricts users to only entering numeric values
    $zipInput.on('input', zipInput);

    $submitButton.on('click', function(e) {
      var form = $(this).closest('.find-a-dealer-form');
      e.preventDefault();

      if (validateZip(form)) {
        form.submit();
      }
    });
  }

  function validateZip($form) {
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

  return {
    init: init
  };
})();


var Gallery = (function() {
  'use strict';

  var $galleries;
  var $hoverTriggers;
  var $tabs;
  var $grids;
  var maxFirstRowThumbs;
  var maxSecondRowThumbs;
  var maxThirdRowThumbs;
  var isLazyLoading;
  var debounce;

  var batchSize = 10;
  var maxColumns = 36;
  var aspectRatio = 16 / 9;
  var pendingImages = 0;
  var currentBatchSize = 0;
  var layingOut = false;

  function init(options) {
    if (options && options.batchSize) {
      batchSize = options.batchSize;
    }

    if ($('.acr-gallery').length) {
      $('.acr-gallery').css('visibility', 'hidden');
      layout();
      attachHover();
      attachResize();
      attachCloseModal();
      attachClick();
      attachTransitionEnd();
    }
  }

  function layout() {
    if (layingOut) {
      return;
    }

    pendingImages = 0;
    layingOut = true;
    $galleries = $('.acr-gallery');

    if (window.innerWidth < Constants.breakpoints.sm) {
      maxFirstRowThumbs = 2;
      maxSecondRowThumbs = 1;
      isLazyLoading = true;
    } else {
      maxFirstRowThumbs = 3;
      maxSecondRowThumbs = 2;
      maxThirdRowThumbs = 1;
      isLazyLoading = false;
    }


    $galleries.each(function(i, gallery) {
      var currentThumbs;
      var $gallery = $(gallery);
      var filters = $gallery.data('filter') || '';
      var thumbs = [];
      var thumbImages = [];

      filters = filters.split('|');

      $.each(filters, function(i, filter) {
        filter = filter ? '*=' + filter : '';

        var partialThumbs = $gallery.find(
          '.thumb:has(".thumb-content[data-type' +
          filter + ']")');
        var partialThumbImages = $gallery.find('.thumb-content[data-type' +
          filter + ']');
        $.merge(thumbs, partialThumbs);
        $.merge(thumbImages, partialThumbImages);
      });

      var rowType = 1;
      var animDelay = 0;
      var galleryWidth = $gallery.width();

      while (thumbs.length > 0) {
        if (rowType === 1 && thumbs.length >= maxFirstRowThumbs) {
          currentThumbs = thumbs.splice(0, maxFirstRowThumbs);
        } else if (rowType === 2 && thumbs.length >= maxSecondRowThumbs) {
          currentThumbs = thumbs.splice(0, maxSecondRowThumbs);
        } else if (rowType === 3 && thumbs.length >= maxThirdRowThumbs) {
          currentThumbs = thumbs.splice(0, maxThirdRowThumbs);
        } else {
          currentThumbs = thumbs;
          thumbs = [];
        }

        var height = 0;
        var width = 0;

        $.each(currentThumbs, function(i, thumb) {
          var numCols = maxColumns / currentThumbs.length;
          var $thumb = $(thumb);
          var anims = ' acr-stagger';
          animDelay += 0.1;

          $thumb.removeClass();
          $thumb.addClass('thumb visible col-xs-' + numCols + anims);
          $thumb.css({
            'animation-delay': animDelay + 's'
          });

          $thumb.waypoint(function() {
            $(this.element).addClass('animated acr-fade-in-up-scatter-short');
          }, {
            offset: '100%'
          });

          if (width === 0) {
            width = Math.floor(galleryWidth / currentThumbs.length);
          }

          if (height === 0) {
            height = Math.round(width / aspectRatio);
          }

          $thumb.find('.thumb-content').height(height);
          $thumb.width(width);
        });

        if (window.innerWidth < Constants.breakpoints.sm) {
          rowType = (rowType === 1) ? 2 : 1;
        } else {
          rowType = (rowType === 3) ? 1 : rowType + 1;
        }
      }

      pendingImages += thumbImages.length;
    });

    loadImages(isLazyLoading);
    layingOut = false;
  }

  function loadImages() {
    var thumbs = $('.acr-gallery .thumb-content:not(.shown)');

    if (isLazyLoading && pendingImages > 0 && currentBatchSize === 0) {
      currentBatchSize = (batchSize <= pendingImages) ?
          batchSize : pendingImages;
    } else if (!isLazyLoading) {
      currentBatchSize = thumbs.length;
      pendingImages = 0;
    }

    for (var i = 0; i < currentBatchSize; i++) {
      $(thumbs[i]).addClass('acr-responsive-background-behavior')
                  .addClass('broadcast-image-load')
                  .data('type', 'Gallery/imageLoad');
    }

    ResponsiveBackground.execute();
  }

  function attachHover() {
    $hoverTriggers = $('.acr-gallery .play,' +
      '.acr-gallery .rollover-bg,' +
      '.acr-gallery .acr-icon-direction-45');

    $hoverTriggers.off('hover');

    $hoverTriggers.hover(function() {
      $(this).siblings('.thumb-content')
             .addClass('hover');
    }, function() {
      $(this).siblings('.thumb-content')
             .removeClass('hover');
    });
  }

  function attachResize() {
    $(window).off('resize', onResize);
    $(window).resize(onResize);

    setTimeout(function() {
      layout();
      $('.acr-gallery').css('visibility', 'visible');
    }, 250);
  }

  function onResize() {
    clearTimeout(debounce);
    debounce = setTimeout(layout, 250);
  }

  function attachCloseModal() {
    $(window).on('ar.closemodal', layout);
  }

  function attachClick() {
    $tabs = $('.acr-gallery .tab a');

    $tabs.on('click', function() {
      var left;
      var $this = $(this);
      var $container = $this.parents('.tabs');
      var $gallery = $this.parents('.acr-gallery');

      var type = $this.data('type');
      var filter = (type === 'all') ? '' : type;

      $gallery.data('filter', filter);

      $container.find('.tab-content').removeClass('active');
      $gallery.css('visibility', 'hidden');
      $gallery.find('.grid').addClass('fade-out').
        trigger('webkitTransitionEnd');

      $this.parent().addClass('active');
      setTimeout(function() {
        layout();
        $gallery.css('visibility', 'visible');
      }, 250);
    });
  }

  function attachTransitionEnd() {
    $grids = $('.acr-gallery .grid');

    $grids.each(function(i, grid) {
      var event = 'webkitTransitionEnd otransitionend oTransitionEnd ' +
          'msTransitionEnd transitionend';
      $(grid).on(event, function() {
        var $this = $(this);

        if ($this.hasClass('fade-out') && $this.hasClass('grid')) {
          $this.parents('.acr-gallery').find('.thumb').removeClass()
               .addClass('thumb');
          pendingImages = 0;
          currentBatchSize = 0;

          layout();

          $this.removeClass('fade-out');
        }
      });
    });
  }

  $(document).off('Gallery/imageLoad')
      .on('Gallery/imageLoad', function(e, imageSrc) {
        if (isLazyLoading) {
          currentBatchSize -= 1;
          pendingImages -= 1;

          if (currentBatchSize === 0) {
            loadImages();
          }
        }
      });

  return {
    init: init
  };
})();

var GalleryModal = (function() {
  'use strict';

  var $galleryModal;

  var $picture;

  var $body;

  var interval;

  var debounce;

  var imgContainerAspectRatio = 46 / 30;

  var videoContainerAspectRatio = 16 / 9;

  var player;

  var playerReady = false;

  var swipeStartX;

  var swipeEndX;

  var swipeThreshold = 20;

  var maxTries = 50;

  var tries = 0;

  var picture = document.createElement('picture');

  var img = document.createElement('img');

  var sourceM = document.createElement('source');

  var sourceL = document.createElement('source');

  var sourceXL = document.createElement('source');

  function init() {
    $body = $('body');

    $galleryModal = $('.acr-gallery-modal');

    $picture = $galleryModal.find('picture');

    createPicture();

    attachClicks();

    attachKeyboardInput();

    attachResize();

    attachLoad();

    attachTouch();

    layout();
  }

  function attachClicks() {
    var $modalAnchors = $('[data-acr-gallery-modal]');

    var $modalAnchorIcons = $('.grid .acr-icon-direction-45');

    $modalAnchors.off('click', openHandler)
                 .on('click', openHandler);

    $modalAnchorIcons.off('click', openHandler)
                 .on('click', openHandler);

    $galleryModal.find('.acr-icon.gallery-modal-close')
                 .off('click', closeHandler)
                 .on('click', closeHandler);

    $galleryModal.find('.acr-icon.gallery-modal-close use')
                 .off('click', closeHandler)
                 .on('click', closeHandler);

    $galleryModal.off('click', closeHandler)
                 .on('click', closeHandler);

    $galleryModal.find('.gallery-modal-window')
                 .off('click', stopPropagation)
                 .on('click', stopPropagation);

    $galleryModal.find('.next-container')
                 .off('click', next)
                 .on('click', next);

    $galleryModal.find('.prev-container')
                 .off('click', prev)
                 .on('click', prev);
  }

  function attachKeyboardInput() {
    $(document).off('keyup', keyboardHandler)
               .on('keyup', keyboardHandler);
  }

  function attachResize() {
    $(window).off('resize', layout);

    $(window).resize(onResize);
  }

  function onResize() {
    clearTimeout(debounce);
    debounce = setTimeout(layout, 250);
  }

  function attachLoad() {
    $('.acr-gallery-modal img').one('load', function() {
      layout();
    }).each(function() {
      if (this.complete) {
        $(this).load();
      }
    });
  }

  function attachTouch() {
    var $gallerySlider = $galleryModal.find('.gallery-slider');

    $gallerySlider.off('touchstart', touchStartHandler)
                  .on('touchstart', touchStartHandler);

    $gallerySlider.off('touchmove', touchMoveHandler)
                  .on('touchmove', touchMoveHandler);

    $gallerySlider.off('touchend', touchEndHandler)
                  .on('touchend', touchEndHandler);
  }

  function touchStartHandler(e) {
    swipeStartX = e.originalEvent.touches[0].clientX;
  }

  function touchMoveHandler(e) {
    swipeEndX = e.originalEvent.touches[0].clientX;
  }

  function touchEndHandler() {
    var dX = swipeStartX - swipeEndX;

    if (!swipeStartX || !swipeEndX ||
      Math.abs(dX) < swipeThreshold) {
      return;
    }

    if (dX > 0) {
      next();
    } else {
      prev();
    }

    swipeStartX = null;

    swipeEndX = null;
  }

  function openHandler(e) {
    e.preventDefault();

    var $anchor = $(this);

    if (typeof $anchor.data('acrGalleryModal') === 'undefined') {
      $anchor = $anchor.siblings('[data-acr-gallery-modal]');
    }

    populateModal($anchor);

    ImageChanger.init();

    $('body').bind('touchmove', function(e) {
      e.preventDefault();
    });
  }

  function populateModal($anchor) {
    var $parent = $anchor.parents('.grid');

    var $siblings = $parent.find('[data-acr-gallery-modal]:visible');

    $galleryModal.find('#gallery-modal-youtube').remove();

    tries = 0;

    $parent.addClass('current-gallery');

    $parent.data('currentIndex', $siblings.index($anchor));

    if ($anchor.data('type') === 'image') {
      sourceXL.setAttribute('srcset', $anchor.attr('data-img-xlarge-1x') +
      ', ' + $anchor.attr('data-img-xlarge-2x') + ' 2x');
      sourceL.setAttribute('srcset', $anchor.attr('data-img-large-1x') +
      ', ' + $anchor.attr('data-img-large-2x') + ' 2x');
      sourceM.setAttribute('srcset', $anchor.attr('data-img-medium-1x') +
      ', ' + $anchor.attr('data-img-medium-2x') + ' 2x');
      img.setAttribute('srcset',
        $anchor.attr('data-img-xsmall-1x') +
        ', ' + $anchor.attr('data-img-xsmall-2x') + ' 2x');

      $picture.addClass('visible');

      $galleryModal.find('iframe').removeClass('visible');

      picturefill({reevaluate: true});
    } else {
      $('<div id="gallery-modal-youtube"></div>').
          insertAfter($galleryModal.find('picture'));

      playerReady = false;

      player = new YT.Player('gallery-modal-youtube', {

      videoId: $anchor.data('videoUrl'),
        events: {
          'onReady': onPlayerReady
        },
        playerVars: {
          showinfo: 0,
          theme: 'light',
          color: 'white'
        }
      });

      $picture.removeClass('visible');

      $galleryModal.find('iframe').addClass('visible');
    }

    $galleryModal.find('.content-name').text($anchor.data('name'));

    $galleryModal.find('.header-name').text($anchor.data('name'));

    $galleryModal.find('.description').html($anchor.data('description'));

    $galleryModal.find('.cta-text').text($anchor.data('ctaText'));

    $galleryModal.find('.cta-anchor').attr('href', $anchor.data('ctaUrl'));

    if ($anchor.data('ctaUrl') && $anchor.data('ctaText')) {
      $galleryModal.find('.cta-anchor').addClass('visible');
    } else {
      $galleryModal.find('.cta-anchor').removeClass('visible');
    }

    $galleryModal.addClass('visible');

    layout();

    $body.addClass('modal-open');
  }

  function closeHandler() {
    $galleryModal.removeClass('visible');

    $body.removeClass('modal-open');

    if (player && playerReady && player.getPlayerState() === 1) {
      player.stopVideo();
    }

    $('body').unbind('touchmove');

    //$('picture', $galleryModal).remove();

    $(window).trigger('ar.closemodal');
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  function keyboardHandler(e) {
    var galleryIsVisible = $galleryModal.hasClass('visible');

    if (e.which === 27) { // esc key
      closeHandler();
    } else if (e.which === 37 && galleryIsVisible) { // left arrow
      prev();
    } else if (e.which === 39 && galleryIsVisible) { // right arrow
      next();
    }
  }

  function layout() {
    var $galleryModal = $('.acr-gallery-modal');

    if (!$galleryModal.hasClass('visible')) {
      return;
    }

    var $image = $galleryModal.find('img');

    $image.removeClass('visible');

    var windowHeight = $(window).height();

    var windowWidth = $(window).width();

    var imgHeight = $image.height();

    var $iframe = $galleryModal.find('iframe');

    if ((!$image[0].currentSrc) &&
      $picture.hasClass('visible') && tries < maxTries) {
      interval = setInterval(layout, 250);

      tries++;

      return;
    } else {
      clearInterval(interval);
    }

    var imageAspectRatio = $image[0].naturalWidth / $image[0].naturalHeight;

    if (windowWidth < Constants.breakpoints.sm) {
      var headerHeight = $galleryModal.find('.header').height();

      var sliderHeight = $galleryModal.find('.gallery-slider').height();

      if ($picture.hasClass('visible')) {
        $picture.innerHeight(windowWidth / imgContainerAspectRatio);

        if (imgContainerAspectRatio > imageAspectRatio) {
          $image.height(windowWidth / imgContainerAspectRatio);

          $image.width(windowWidth / imgContainerAspectRatio *
              imageAspectRatio);
        } else {
          $image.width(windowWidth);

          $image.height(windowWidth / imageAspectRatio);
        }

        $image.addClass('visible');
      } else {
        $iframe.innerHeight(windowWidth / imgContainerAspectRatio);

        $iframe.width(windowWidth);
      }

      $galleryModal.find('.content').innerHeight(
        windowHeight - headerHeight - sliderHeight);
    } else {
      // if the modal height is bigger than 625 the content should be 40%
      // otherwise it should be 150px
      var contentHeight = (windowHeight > 625) ? 150 : windowHeight * .4;

      var containerAspectRatio = windowWidth / (windowHeight - contentHeight);

      if ($picture.hasClass('visible')) {
        $picture.innerHeight(windowHeight - contentHeight);

        if (containerAspectRatio > imageAspectRatio) {
          $image.height(windowHeight - contentHeight);

          $image.width((windowHeight - contentHeight) * imageAspectRatio);
        } else {
          $image.width(windowWidth);

          $image.height(windowWidth / imageAspectRatio);
        }

        $image.addClass('visible');
      } else {
        if (containerAspectRatio > videoContainerAspectRatio) {
          $iframe.innerHeight(windowHeight - contentHeight);

          $iframe.width((windowHeight - contentHeight) *
            videoContainerAspectRatio);
        } else {
          $iframe.width(windowWidth);

          $iframe.height(windowHeight - contentHeight);
        }
      }

      $galleryModal.find('.content').innerHeight(contentHeight);

      $body.addClass('modal-open');
    }
  }

  function prev() {
    var $parent = $('.grid.current-gallery');

    var thumbs = $parent.find('[data-acr-gallery-modal]:visible');

    var currentIndex = $parent.data('currentIndex');

    currentIndex = (currentIndex === 0) ?
      thumbs.length - 1 : currentIndex - 1;

    populateModal($(thumbs[currentIndex]));

    if (player && playerReady && player.getPlayerState() === 1) {
      player.stopVideo();
    }
  }

  function next() {
    var $parent = $('.grid.current-gallery');

    var thumbs = $parent.find('[data-acr-gallery-modal]:visible');

    var currentIndex = $parent.data('currentIndex');

    currentIndex = (currentIndex + 1) % thumbs.length;

    populateModal($(thumbs[currentIndex]));

    if (player && playerReady && player.getPlayerState() === 1) {
      player.stopVideo();
    }
  }

  function onPlayerReady() {
    playerReady = true;

    layout();
  }

  function createPicture() {
    sourceXL.setAttribute('media', '(min-width: 1400px)');

    sourceL.setAttribute('media', '(min-width: 1024px)');

    sourceM.setAttribute('media', '(min-width: 550px)');

    img.setAttribute('class', 'visible');

    picture.appendChild(sourceXL);

    picture.appendChild(sourceL);

    picture.appendChild(sourceM);

    picture.appendChild(img);

    $picture = $(picture);

    $($picture).insertBefore('.next-container', $galleryModal);
  }

  return {
    init: init
  };
})();

var GlobalFooter = (function() {
  'use strict';

  Utility.log('GlobalFooter.js loaded');

  var $elements = $.noop;

  function init() {
    $elements = $('li', '.acr-footer');
    setOnResize();
    resize();
    addPadding();
  }

  function addPadding() {
    $('.acr-footer.secondary li').not(':has(a)').css('padding-left', '1.5rem');
  }

  function setOnResize() {
    window.addEventListener('resize', resize);
  }

  function resize() {
    var width = window.innerWidth;

    if (width < Constants.breakpoints.lg) {
      setTimeout(noBorder, 100);
    }
  }

  function noBorder() {
    var $prev = $elements.eq(0);

    $elements.removeClass('no-border');

    $elements.slice(1).each(function() {
      if ($(this).position().top > $prev.position().top) {
        $(this).addClass('no-border');
      }
      $prev = $(this);
    });
  }

  return {
    init: init
  };
})();

var GlobalNav = (function() {
  'use strict';

  var Modernizr = window.Modernizr || {};

  var Utility = window.Utility || {};

  var Constants = window.Constants || {};

  var header;

  var $wrapper = $('.wrapper');

  var $mlpNav = $('.mlp-nav');

  var $bapNav = $('.bap-header');

  var inputs;

  var flyOuts;

  var hamburger;

  var $window = $(window);

  var $domiciles = $('html, body');

  var lastScrollTop = 0;

  var doNotHideGlobalNav = false;

  var currentHashNavigation;

  // Should set the prototype chain on other constructors through generic
  // constructor using prototypical inheritance for global functions new keyword
  // creates instance of constructor add methods to instance created add
  // overflow container scrollbar on flyOuts

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // Generic Constructor
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function Header() {
    this.$el = $('.acr-header');

    this.$menubar = this.$el.find('[role=menubar]');

    this.$mbPrimaryUl = this.$menubar.find('ul.primary');

    this.$mbSecondaryUl = this.$menubar.find('ul.secondary');

    this.$mbPrimaryLi = this.$mbPrimaryUl.children('li');

    this.$mbSecondaryLi = this.$mbSecondaryUl.children('li');

    this.pageYOffset = 0;

    this.animationFrame = 0;

    return this;
  }

  function setDefaultHeader() {
    // Reset header back to default state
    header.$menubar
        .add(header.$mbSecondaryLi)
        .removeClass('expanded');
  }

  function toggleFormAnimation(off) {
    if (off) {
      return inputs.$ctaForms.removeClass('acr-in');
    }

    return inputs.$ctaForms.addClass('acr-in');
  }

  function resetHeaderState() {
    toggleFormAnimation(true);

    setDefaultHeader();
  }

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // Nav Inputs Constructor
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function Inputs() {
    this.$ctaButtons = header.$mbSecondaryUl
        .find('.dealers-btn, .search-link');

    this.$ctaElements = this.$ctaButtons.siblings('.search');

    this.$ctaForms = this.$ctaElements.find('.form');

    this.$ctaAnchor = this.$ctaElements.find('a');

    this.$ctaInputs = this.$ctaElements.find('input');

    this.$ctaCloseBtns = this.$ctaElements
        .find('.acr-icon-button-close');

    this.getThisAnchor = function(ctaInput) {
      return $(ctaInput)
        .closest(this.$ctaElements)
        .find(this.$ctaAnchor);
    };

    return this;
  }

  Inputs.prototype.enterPress = function(event) {
    // this = the input element with focus
    if (event.which === 13) {
      inputs.getThisAnchor(this).click();
    }

    return false;
  };

  function showCtaInput() {
    var $this = $(this);

    // parent is .site-search or .dealer-locator
    $this.parent()
        .add(header.$menubar)
        .addClass('expanded');

    setTimeout(function() {
      toggleFormAnimation();
    }, 0);
  }

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // FlyOuts Constructor
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function FlyOuts() {
    this.$el = header.$el.children('.flyout');

    this.$mbFlyOutBtns = header.$mbPrimaryLi.filter('[data-flyout]');

    this.$vfLinks = this.$el
        .filter('[data-flyout=vehicles-flyout]').find('a');

    this.$vfHeadings = this.$el
        .filter('[data-flyout=vehicles-flyout]').find('h3');

    this.$vfHoverText = this.$el
        .filter('[data-flyout=vehicles-flyout]').find('span.hidden');

    this.animationFrame = 0;

    return this;
  }

  ////////////////////////////////////
  // Non-prototype functions for FlyOut
  ////////////////////////////////////
  function leaveFlyOutHandler(event) {
    var $el = $(event.target);

    if ($el.is(flyOuts.$el)) {
      flyOuts.hideFlyOut();

      $domiciles.removeClass('acr-no-overflow');
    }
  }

  FlyOuts.prototype.showFlyOut = function(el) {
    if (!$(el).hasClass('expanded')) {
      $(document).on('click.nav', leaveFlyOutHandler);
    }

    $('[data-flyout=' + $(el).data('flyout') + ']').
        addClass('expanded').
        siblings('li, .flyout').
        removeClass('expanded');

    header.$el.css('position', 'fixed');

    return this;
  };

  FlyOuts.prototype.hideFlyOut = function() {
    this.$el
        .removeClass('expanded')
        .height(0);

    this.$mbFlyOutBtns.removeClass('expanded');

    $(document).off('click.nav');

    return this;
  };

  function toggleFlyOuts(event) {
    // If flyOut isn't shown yet show else conditionally hide
    if (!$(event.currentTarget).hasClass('expanded')) {
      flyOuts.showFlyOut(this);
    } else {
      flyOuts.hideFlyOut();
    }

    // handleFlyOutOverflow (goes along with orientationchange, resize)
    $window.trigger('dropdown');
    // Prevents page jumps
    return false;
  }

  function handleFlyOutOverflow() {
    var $this = flyOuts.$el.filter('.expanded');

    // Window height < height of flyOut, toggle overflow class on el -50 for
    // header offset
    if ($this.children('aside').height() > $window.height() - 50) {
      $this
          .height($window.height() - 50)
          .addClass('overflowable');

      $domiciles.addClass('acr-no-overflow');
    } else {
      $this
          .height('100%')
          .removeClass('overflowable');

      $domiciles.removeClass('acr-no-overflow');
    }

    if ($window.width() < Constants.breakpoints.sm) {
      flyOuts.hideFlyOut();
    }
  }

  function toggleLinkHover(event) {
    var $el = $(event.currentTarget);

    if ($el.closest('.flyout.no-touch').length === 0) {
      return null;
    }

    // Flip flop span element shown
    $el.find(flyOuts.$vfHoverText)
        .siblings('span')
        .addBack()
        .toggleClass('hidden');

    flyOuts.$vfLinks
        .not($el)
        .add(flyOuts.$vfHeadings)
        // Don't dim closest sibling heading
        .not($el.prevAll('h3:first'))
        .toggleClass('acr-inactive');

    return this;
  }

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // Hamburger Constructor
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function Hamburger() {
    this.$el = header.$el.children('.acr-hamburger-nav');

    this.$mbMenuBtns = header.$menubar.find('.menu');

    this.$hbCloseBtn = header.$menubar.children('.acr-icon-button-close');

    this.$vehicleLineupLink = this.$el.find('.scroll-anchor');

    this.$vehicleLineup = $('.vehicle-lineup');

    this.screenWidth = 0;

    this.animationFrame = 0;

    return this;
  }

  function hamburgerHideCheck() {
    // Since iOS likes to trigger resize events on scroll...
    if (hamburger.screenWidth === $window.width()) {
      cancelAnimationFrame(hamburger.animationFrame);

      return false;
    }

    // If not, update the value in hamburger
    hamburger.screenWidth = $window.width();

    // Moved into desktop view - hide hamburger menu
    if (hamburger.screenWidth > Constants.breakpoints.lg) {
      toggleHamburger();
    }

    hamburger.animationFrame = requestAnimationFrame(hamburgerHideCheck);
  }

  function toggleHamburger() {
    hamburger.$el.toggleClass('expanded');

    // Fixed expanded changes the header when hamburger is open
    header.$el.toggleClass('fixed-expanded');

    // Since don't want to toggle this while hamburger is open while resizing
    if (hamburger.$el.hasClass('expanded')) {
      $domiciles.addClass('acr-no-overflow');
    } else {
      $domiciles.removeClass('acr-no-overflow');
    }

    // Intensive polling so event handler only applies when hamburger menu is
    // open
    if (hamburger.$el.hasClass('expanded')) {
      $window.on('resize.nav orientationchange.nav', hamburgerHideCheck);
    } else {
      $window.off('resize.nav orientationchange.nav', hamburgerHideCheck);
    }
  }

  function scrollToVehicleLineup(event) {
    // Stop the click action
    event.preventDefault();

    // Close the menu
    toggleHamburger();

    // The -20 is for padding
    var vehicleLineupOffset = hamburger.$vehicleLineup
        .offset().top - header.$menubar.height() - 20;
    // Should always close the hamburger menu since the link is inside the
    // hamburger menu

    $domiciles.animate({
      scrollTop: vehicleLineupOffset
    }, 300);
  }

  function peekABoo() {
    var st = $window.scrollTop();

    if (st < lastScrollTop || st <= 0 || doNotHideGlobalNav) {
      if ($wrapper.hasClass('collapsed-nav')) {
        $wrapper.removeClass('collapsed-nav');
      }

      if (!$wrapper.hasClass('expanded-nav')) {
        $wrapper.addClass('expanded-nav');
      }
    } else {
      if ($wrapper.hasClass('expanded-nav')) {
        $wrapper.removeClass('expanded-nav');
      }

      if (!$wrapper.hasClass('collapsed-nav')) {
        $wrapper.addClass('collapsed-nav');
      }
    }

    lastScrollTop = st;
    if (!$domiciles.hasClass('acr-no-overflow')) {
      flyOuts.hideFlyOut();
    }
  }

  function doScrollTo(target, navOffset) {
    var targetOffset = target.offset().top;

    $domiciles.animate({
      scrollTop: targetOffset - navOffset
    }, 350, function() {
      setTimeout(function() {
        doNotHideGlobalNav = false;
      }, 500);
    });
  }

  function scrollTo(target, extraOffset) {
    if (target.length > 0) {
      var navOffset = 0;

      var waitForGlobalNav = $wrapper.hasClass('collapsed-nav');

      // By default we keep the global nav showing while scrolling
      doNotHideGlobalNav = true;

      peekABoo();

      if ($mlpNav.length > 0) {
        navOffset += parseInt($mlpNav.css('height'), 10);
      }

      if ($bapNav.length > 0) {
        navOffset += parseInt($bapNav.css('height'), 10);
      }

      navOffset += parseInt($('header.acr-header').css('height'), 10);

      if (extraOffset && extraOffset > 0) {
        navOffset += extraOffset;
      }

      if (!waitForGlobalNav) {
        doScrollTo(target, navOffset);
      } else {
        $wrapper.one('webkitTransitionEnd otransitionend oTransitionEnd ' +
            'msTransitionEnd transitionend',
          function() {
            doScrollTo(target, navOffset);
          });
      }
    }
  }

  function checkHashNavigation() {
    if (window.location.hash !== currentHashNavigation) {
      currentHashNavigation = window.location.hash;

      scrollTo($(currentHashNavigation));
    }
  }

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // Initializer
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function init() {
    try {
      header = new Header();

      inputs = new Inputs();

      flyOuts = new FlyOuts();

      hamburger = new Hamburger();

      // Opening the Locator and Search Boxes
      inputs.$ctaButtons
          .on('click.nav', showCtaInput);

      // Closing the Locator and Search Boxes
      inputs.$ctaCloseBtns
          .on('click.nav', resetHeaderState);

      // Make sure enter key submits
      inputs.$ctaInputs
          .on('keyup.nav', inputs.enterPress);

      // Hamburger Menu
      hamburger.$hbCloseBtn
          .add(hamburger.$mbMenuBtns)
          .on('click.nav', toggleHamburger);

      // Vehicle Lineup Link Click (on mobile)
      hamburger.$vehicleLineupLink.parent().
          on('click.nav', scrollToVehicleLineup);

      // Show/hide flyOuts according to specs
      flyOuts.$mbFlyOutBtns.on('click.nav', toggleFlyOuts);

      // Vehicle FlyOut Hover Text
      flyOuts.$vfLinks.hover(toggleLinkHover, toggleLinkHover);

      // Add scroll if window smaller than flyOut
      $window
          .on('resize.nav orientationchange.nav dropdown.nav',
              handleFlyOutOverflow);

      // Applying hover effect on non mobile/tablet devices
      if (!Modernizr.android && !Modernizr.iphone && !Modernizr.ipad) {
        flyOuts.$mbFlyOutBtns
            .add(flyOuts.$el)
            .addClass('no-touch');
      }

      // Peekaboo will only be initialized if there is a secondary navigation
      // such as MLP Navigation or the BaP Navigation
      if ($mlpNav.length > 0 || $bapNav.length > 0) {
        $window.on('scroll orientationchange', $.throttle(250, peekABoo));

        $wrapper.addClass('expanded-nav');

        setTimeout(function() {
          $wrapper.css({
            'transition': 'margin .4s ease-in-out 0s'
          });
        }, 100);
      }

      setTimeout(function() {
        checkHashNavigation();

        // "hijacking" the hash navigation
        $window.on('hashchange', function(e) {
          e.preventDefault();

          checkHashNavigation();
        });
      }, 450);
    } catch (e) {
      Utility.error(e);
    }
  }

  // Expose the following variables and functions
  return {
    init: init,
    scrollTo: scrollTo
  };
}());

var Grid = (function() {
  'use strict';

  var $grids = $('.hmc-grid-100');

  var $items = $('.hmc-grid-item');

  var debounce;

  var viewports = {
    xs: {
      min: 320,
      max: 550
    },
    sm: {
      min: 550,
      max: 1024
    },
    lg: {
      min: 1024,
      max: 1400
    },
    xl: {
      min: 1400,
      max: Infinity
    }
  };

  function init() {
    if ($grids.length) {
      copyTiles();

      resize();

      attachResize();

      _changeId('hidden-' + _getBootstrapBreakpoint());
    }
  }

  function attachResize() {
    $(window).off('resize', layout);

    $(window).on('resize', onResize);

    $(window).on('ar.closemodal', layout);
  }

  function onResize() {
    clearTimeout(debounce);
    debounce = setTimeout(resize, 400);
  }

  function resize() {
    layout();
  }

  function getBreakpoint(wW) {
    var breakpoint;

    if (wW < viewports.xs.max) {
      breakpoint = 'xs';
    } else {
      if (wW < viewports.sm.max) {
        breakpoint = 'sm';
      } else {
        if (wW < viewports.lg.max) {
          breakpoint = 'lg';
        } else {
          breakpoint = 'xl';
        }
      }
    }

    return breakpoint;
  }

  function _getBootstrapBreakpoint() {
    var breakpoint = getBreakpoint(window.innerWidth);

    if (breakpoint === 'lg') {
      breakpoint = 'md';
    } else if (breakpoint === 'xl') {
      breakpoint = 'lg';
    } else if (window.innerWidth >= viewports.xl.min) {
      breakpoint = 'xl';
    }

    return breakpoint;
  }

  function layout() {
    $grids.each(function(i, grid) {
      var $grid = $(grid);

      var classes = $grid.attr('class').split(/\s+/);

      var wWidth = window.innerWidth;

      var breakpoint = getBreakpoint(wWidth);

      var gridHeight = $grid.height();

      // Any grid data attributes
      if ($grid.data('height-' + breakpoint)) {
        if ($grid.data('height-' + breakpoint) != $grid.height()) {
          $grid.css('height', $grid.data('height-' + breakpoint) + 'px');
        }
      } else {
        ResponsiveBackground.setHeight($grid.get(0));
      }

      // For Carousels
      if ($grid.filter('[class*="hmc-carousel-"]').length > 0) {
        var carouselBreakpoints = classes.filter(function(c) {
          if (c.indexOf('hmc-carousel-') === 0) {
            return true;
          }
        });

        $.each(carouselBreakpoints, function(i, carouselBreakpoint) {
          var viewport = carouselBreakpoint.split('hmc-carousel-')[1];
          var $carousel = $grid.find('.hmc-grid-carousel');
          var $originalTiles = $grid.find('.hmc-carousel-slide');

          if (wWidth > viewports[viewport].min &&
              wWidth < viewports[viewport].max) {
            $originalTiles.css({
              display: 'none'
            });

            $carousel.find('.hmc-carousel-slide').css({
              display: 'block'
            });

            $carousel.addClass('visible');

            return false;
          } else {
            $originalTiles.css({
              display: ''
            });

            $carousel.removeClass('visible');
          }
        });
      }
    });
  }


  function copyTiles() {
    $grids.each(function(i, grid) {
      var $grid = $(grid);

      // For Carousels
      if ($grid.filter('[class*="hmc-carousel-"]')) {
        var $originalTiles = $grid.find('.hmc-carousel-slide');

        if ($originalTiles.length > 1) {
          var $tiles = $originalTiles.clone();
          var $carousel = $grid.find('.hmc-grid-carousel');

          $carousel.html($tiles);

          $carousel.slick({
            dots: true,
            prevArrow: '<button type="button"' +
              'class="acr-icon-arrow-large-left acr-f2 acr-mid-grey ' +
              'slick-prev slick-arrow"></button>',
            nextArrow: '<button type="button"' +
              'class="acr-icon-arrow-large-right acr-f2 acr-mid-grey ' +
              'slick-next slick-arrow"></button>',
            useTransform: true
          });
        }
      }
    });
  }

function _changeId(className) {
  var $visibleItems = $('.hmc-grid-item:not(.' + className + ')');
  var length = $visibleItems.length;
  var hash = location.hash;

  length--;

  $items.attr('id', '');

  $visibleItems.each(function(i, el) {

    if (!$(el).hasClass('slick-slide')) {
      $(el).attr('id', $(el).data('id'));
    }

    if (i === length) {

      GlobalNav.scrollTo($(hash));

    }
  });
}
  return {
    init: init
  };
})();

var GridVideo = (function() {
  'use strict';

  var $grids = $('.hmc-grid-100');
  var $videoPreview = $('.video-preview', $grids);

  function init() {
    if (!$('html').hasClass('appleios') && !$('html').hasClass('android')) {

      playLoop();
      playHover();
      setTimeout(playOnce, 1000);
    }
  }

  function playLoop() {
    $('.acr-grid-video[data-play=loop]', $videoPreview).each(function() {
      var parent = $(this).parent();

      $(this).attr('loop', 'loop');
      play($(this)[0], parent);

    });
  }

  function playHover() {
    $('.video-preview', $grids).on('mouseenter', onMouseenter);
  }

  function playOnce() {

    $('.video-preview', $grids).waypoint(function() {
      var $video = $('.acr-grid-video[data-play=once]', $(this.element));
      var parent = $video.parent();

      if ($video.data('play') === 'once') {
        $video[0].addEventListener('ended', onEnd);
        play($video[0], parent);
        $video.data('play', '');
      }
    }, {
      offset: '100%'
    });
  }

  function onMouseenter(e) {
    var $video = $('.acr-grid-video[data-play=hover]', this);

    if (typeof $video[0] !== 'undefined') {

      $video[0].addEventListener('ended', onEnd);
      play($video[0], this);

    }

  }

  function play(video, parent) {
    $('picture', parent).hide();
    video.play();
    $(video).css('display', 'block');
  }

  function onEnd(e) {
    var $parent = $(this).parent();

    $('video', $parent).hide();
    $('picture', $parent).show();

    $(this)[0].currentTime = 0;
  }

  return {
    init: init
  };
})();

var Hero = (function() {
  'use strict';
  var Acr = window.Acr = window.Acr || {};

  Utility.log('Hero.js loaded');

  var $hero = $('.acr-hero');

  var changeSlide = $.noop;

  var circles = {};

  var canPlayVideo = true;

  var size = $.noop;

  var triggerPos = $.noop;

  var breakpoint = $.noop;

  var $media = $('.hero-media');

  var ratioWidth = 16,
      ratioHeight = 9;

    var ratioWidthSM = 1100,
      ratioHeightSM = 756;

  var $slickDots = $.noop;

  var slickTime = 0;

  var $arrows = $.noop;

  var isLast = false;

  var autoplay = true;

  function init() {
    checkIOS();
    setSlick();
    resize();
    createMobileCTAs();
    setOnResize();
    onModal();
    onHeroLoad();
    //Hero parallax animations
    Acr.heroParallax.init();
  }

  function afterInit() {

  }

  function setSlick() {
    var $video;

    $hero.slick({
      autoplay: false,
      dots: true,
      infinite: false,
      lazyLoad: 'progressive',
      useTransform: true,
      nextArrow: '<button type="button" data-role="button"' +
        'class="slick-next acr-white col-sm-2"' +
        'aria-label="Next" tabindex="0" role="button">' +
        '<svg class="acr-icon">' +
        '<use xlink:href="#arrow-right"></use></svg>' +
        '</button>',
      prevArrow: '<button type="button" data-role="button"' +
        'class="slick-prev acr-white col-sm-2"' +
        'aria-label="Previous" tabindex="0" role="button">' +
        '<svg class="acr-icon">' +
        '<use xlink:href="#arrow-left"></use></svg>' +
        '</button>',
      speed: 250,
      swipe: true
    });

    slickTime = $('.slick-active', $hero).data('time');
    $slickDots = $('.slick-dots', $hero);
    $slickDots.css('z-index', '-1');
    $arrows = $('.slick-arrows', $hero);
    $arrows.css('z-index', '-1');

    $hero.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      clearTimeout(changeSlide);
    });

    $hero.on('afterChange', function(event, slick, currentSlide) {
      playVideo($(slick.$slides[currentSlide]));
      slickTime = $(slick.$slides[currentSlide]).data('time');
      nextSlide(slickTime);

      triggerDTM($(slick.$slides[currentSlide]).data('title'));

      if (slick.slideCount === (currentSlide + 1)) {
        isLast = true;
      } else {
        isLast = false;
      }
    });

    $hero.on('edge', function(event, slick, direction) {
      clearTimeout(changeSlide);

      if (direction === 'left') {
        $hero.slick('slickGoTo', 0);
      } else if (direction === 'right') {
        $hero.slick('slickGoTo', slick.slideCount - 1);
      }
    });

    $('.slick-arrow', $hero).on('click', function(event) {

      if ($hero[0].slick.slideCount ===
        ($hero[0].slick.currentSlide + 1) &&
        $(this).hasClass('slick-next')) {

        clearTimeout(changeSlide);
        $hero.slick('slickGoTo', 0);

      } else if ($hero[0].slick.currentSlide === 0 &&
        $(this).hasClass('slick-prev')) {

        clearTimeout(changeSlide);
        $hero.slick('slickGoTo', $hero[0].slick.slideCount - 1);

      }
    });

    $('button, .slick-arrow', $hero).on('click', function(e) {
      autoplay = false;
    });

    playVideo($('.slick-active', $hero));
  }

  function nextSlide(time) {

    if (!autoplay) {
      return;
    }

    changeSlide = setTimeout(function() {
      if (isLast) {
        $hero.slick('slickGoTo', 0);
      } else {
        $hero.slick('slickNext');
      }

    }, time);
  }

  function playVideo($video) {
    pauseVideo();
    var findVideo = $video.find('video');

    if (findVideo.length && canPlayVideo) {
      findVideo.get(0).play();
    }
  }

 function pauseVideo() {
    $('video', $hero).each(function() {
      if (canPlayVideo) {
        this.pause();
      }
    });
  }

  function checkIOS() {
    if ($('html').hasClass('appleios')) {
      canPlayVideo = false;
    }
  }

  function createMobileCTAs() {
    var $cloneModal = '';
    var $modal = '';

    $('.hero-slide', $hero).each(function() {
      $modal = $('.hero-modal', this).get(0);

      if ($modal !== 'undefined') {
        $cloneModal = $($modal).clone();
        $cloneModal.text('');

        $cloneModal.attr('class', 'hero-mobile hero-modal').
          html('<svg class="acr-icon"><use xlink:href="#play"></use></svg>');
        $('.hero-media', this).prepend($cloneModal);
      }

    });

  }

  function setOnResize() {
    window.addEventListener('resize', function() {
      clearTimeout(triggerPos);
      triggerPos = setTimeout(resize, 500);
    });
  }

  function resize() {
    var width = window.innerWidth;

    resizeMedia(width);

    if (width < Constants.breakpoints.sm) {

      $slickDots.hide();
      setDotsMobilePos();

      if (breakpoint !== 'xs') {

        $hero.removeClass('hero-desktop').
          addClass('hero-mobile');

        $('.hero-cta', $hero).removeClass('hero-desktop')
        .addClass('acr-cta-r-w-b hero-mobile');

        $hero.height('auto');

        $('.hero-ctas').each(function() {
          var links = $('.hero-link', this);
          var lastLink = $(links).get(1);

          if (lastLink !== 'undefined') {
            $(lastLink).removeClass('acr-cta-r-w-b')
            .addClass('acr-cta-text is-black');
          }
        });

        breakpoint = 'xs';
      }

     } else if (breakpoint !== 'sm') {
      $hero.removeClass('hero-mobile').
        addClass('hero-desktop');

      $('.hero-cta', $hero)
        .removeClass('acr-cta-r-w-b hero-mobile acr-cta-text is-black')
        .addClass('hero-desktop');

      clearTimeout(triggerPos);
      $slickDots.css('top', 'auto');
      $slickDots.show();

      breakpoint = 'sm';
     }

  }

  function setDotsMobilePos() {
    var height = $('.hero-media', $hero).height() - 55;
      $slickDots.css('top', height + 'px');
      $slickDots.show();
  }

  function onModal() {
    var findVideo;

    $('.acr-modal').on('show.bs.modal', function() {
      findVideo = $(this).find('video');

      if (findVideo.length && canPlayVideo) {
        findVideo.get(0).play();
      }

      $hero.slick('slickPause');
      clearTimeout(changeSlide);
    });

    $('.acr-modal').on('hidden.bs.modal', function() {
      findVideo = $(this).find('video');

      if (findVideo.length && canPlayVideo) {
        findVideo.get(0).pause();
      }

      $hero.slick('slickNext');
    });
  }

  function resizeMedia(width) {
    var heightMedia = 0;
    var innerWidth = 0;

    if (hasScroll()) {
      innerWidth = width - 15;
    }

    if (width > 2000) {
      innerWidth = 2000;
    }

    if (width >= Constants.breakpoints.sm &&
        width < Constants.breakpoints.lg) {
      heightMedia = innerWidth / (ratioWidthSM / ratioHeightSM);
    } else {
      heightMedia = innerWidth / (ratioWidth / ratioHeight);
    }

    $media.height(heightMedia + 'px');

    if (width >= Constants.breakpoints.sm) {
      $hero.height(heightMedia + 'px');
    }
  }

  function hasScroll() {
    var $html = document.querySelector('html');

    return ($html.scrollHeight > $html.clientHeight);
  }

  function triggerDTM(title) {

    if (typeof _satellite !== 'undefined') {
      _satellite.setVar('slideRotate', title);
      _satellite.track('slideViewed');
    }
  }

  function onHeroLoad() {
    var $images = $('img', $hero);
    var totalImages = $images.length;
    var count = 0;

    $images.on('load', function() {

      if (++count === totalImages) {

        $hero.slick(
            'slickSetOption',
            'swipe',
            true,
            false);

        $slickDots.css('z-index', '1');
        $arrows.css('z-index', '1');

        nextSlide(slickTime);

        if (window.innerWidth < Constants.breakpoints.sm) {
          setDotsMobilePos();
        }

      }
    });
  }

  function onVideoReady() {
    var validVideo = 0;
    var readyVideo = 0;

    if ($('video', $hero).length === 0) {
      afterInit();
      return;
    }

    $('video', $hero).each(function() {
      if ($(this)[0].currentSrc !== '') {
        validVideo++;
      }
    });

    if (validVideo === 0) {
      afterInit();
      return;
    }

    $('video', $hero).on('loadeddata', function() {
      if ($(this)[0].readyState > 2) {
        readyVideo++;
      }
      if (validVideo === readyVideo) {
        afterInit();
      }

    });
  }
  //Expose the following variables and functions
  return {
    //variables
    //state: state,

    //methods
    init: init
  };
})();

(function(window, $) {
  'use strict';
  var Acr = window.Acr = window.Acr || {};
  var Ut = window.Utility;

  Acr.heroParallax = (function($) {
    var parallaxSelector = '[data-hero-parallax]',
    mainClass = 'acr-hero-parallax',
    elClass = 'acr-hero-parallax-element',
    pElSel = '.slick-list', //Element to apply translate3d
    fadedClass = 'is-faded',
    pElDOMRefI = {},
    doReverse = true, //Making element go in reverse direction
    halfOutVal = 0.01, //Percentage of element out of viewport to trigger fading
    parallaxElements = [],
    registeredAnimationFrames = [],
    goParallax = (Ut.isMobile() || Ut.isIE() || Ut.isTablet()) ? false : true;

    var initialWidth;

    var init = function() {
      initialWidth = window.innerWidth || document.documentElement.clientWidth;
      var cssSelector = parallaxSelector;

      clearAnimationFrames();
      $(window).off('scroll', addAnimationFrame);

      if ($(cssSelector).length) {
        var wProps = getwProps();
        pElDOMRefI = {};

        $(cssSelector).each(function(index, el) {
          var parallaxElement = {};
          parallaxElement.element = $(el);
          parallaxElements.push(parallaxElement);

          var $pEl = parallaxElement.element;

          $pEl
          .addClass(mainClass)
          .children(pElSel).addClass(elClass);

          pElDOMRefI[index] = $pEl.find(pElSel);

          if (goParallax) {
            moveElement(pElDOMRefI[index], wProps.wTop, wProps.wHeight);
          }
        });

        $(window).resize(function(event) {
          var cW = window.innerWidth || document.documentElement.clientWidth;
          if (initialWidth !== cW) {
            initialWidth = cW;
            goParallax = true;
            var wProps = getwProps();
            $.each(parallaxElements, function(index, parallaxElement) {
              if (goParallax) {
                var $pEl = parallaxElement.element;
                moveElement(pElDOMRefI[index], wProps.wTop, wProps.wHeight);
              }
            });
          }
        });

        if (goParallax) {
          $(window).scroll(addAnimationFrame);
        }
      }
    };

    var getElementBoundingRect = function(Ele) {
      var rect = Ele[0].getBoundingClientRect(),
          win = window,
          doc = document;
      var results = {
        rect: rect,
        inViewport: false,
        halfOutside: false
      };
      if (rect.bottom >= 0 &&
        rect.top <= (win.innerHeight || doc.documentElement.clientHeight)) {
        results.inViewport = true;
        if (rect.top < -Math.abs(rect.height * halfOutVal)) {
          results.halfOutside = true;
        }
      }
      return results;
    };

    var moveElement = function($pEl, wTop, wHeight) {
      var elementRect = getElementBoundingRect($pEl);
      if (elementRect.inViewport) {
        var bgBladeTopPos = $pEl.offset().top,
        slashHeight = elementRect.rect.height,
        bghHeight = slashHeight * 2,
        maxOffset = (slashHeight - bghHeight) + 2,
        bgSpeed = $pEl.data('box-speed') ? $pEl.data('box-speed') : 500;
        bgSpeed = -Math.abs(bgSpeed);
        var offset = ((wTop - bgBladeTopPos) / slashHeight) * bgSpeed;
        offset = Math.max(offset, maxOffset);
        if (doReverse) {
          offset = offset * -1;
        }
        if (offset < 0) {
          offset = 0;
        }

        $pEl.css({ 'transform': 'translate3d(0px,' + offset + 'px, 0px)' });

        if (elementRect.halfOutside) {
          $pEl.parents('.' + mainClass).addClass(fadedClass);
        }else {
          $pEl.parents('.' + mainClass).removeClass(fadedClass);
        }
      }
    };

    var sHandler = function() {
      var wProps = getwProps();
      $.each(parallaxElements, function(index, parallaxElement) {
        if (goParallax) {
          moveElement(pElDOMRefI[index], wProps.wTop, wProps.wHeight);
        }
      });
    };

    var addAnimationFrame = function() {
      registeredAnimationFrames.push(window.requestAnimationFrame(sHandler));
    };

    var getwProps = function() {
      return {
        wTop: $(window).scrollTop(),
        wHeight: $(window).height()
      };
    };

    var clearAnimationFrames = function() {
      $.each(registeredAnimationFrames, function(index, requestID) {
        window.cancelAnimationFrame(requestID);
      });
      registeredAnimationFrames = [];
    };

    var destroy = function() {
      parallaxElements = [];
      $(window).off('scroll', addAnimationFrame);
      clearAnimationFrames();
      if (pElDOMRefI) {
        $.each(pElDOMRefI, function(k, v) {
          pElDOMRefI[k] = null;
        });
        pElDOMRefI = null;
      }
    };

    return {
      init: init
    };
  })($);

})(window, jQuery);

var ImageChanger = (function() {
'use strict';

Utility.log('ImageChanger.js loaded');

  var debounceResize = $.noop;

  function init() {
    setOnResize();
    onResize();
  }

  function setOnResize() {
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
  }

  function onResize() {

    clearTimeout(debounceResize);
    debounceResize = setTimeout(findImages, 250);
  }

  function findImages() {
    if (window.devicePixelRatio > 1) {
      var breakPImages;
      var lowresImages = $('picture');
      var bpCurrent = getCurrentBreakpoint();

      lowresImages.each(function(i) {
        switch (bpCurrent) {
          case 'sm': breakPImages =
          $(lowresImages[i]).find('source[media|="(min-width: 550px)"]');
                   break;
          case 'lg': breakPImages =
          $(lowresImages[i]).find('source[media|="(min-width: 1024px)"]');
                   break;
          case 'xl': breakPImages =
          $(lowresImages[i]).find('source[media|="(min-width: 1400px)"]');
                   break;
          default: breakPImages = $(lowresImages[i]).find('img');
                   break;
        }

        var lowres = $(breakPImages).attr('data-attribute-image1x');
        var imageToChange = $(this).find('img');
        $(imageToChange).attr('src', lowres);
      });
    }
  }

  function getCurrentBreakpoint() {
    var size = 'xs';
    var width = window.innerWidth;

    if (width < Constants.breakpoints.sm) {
      size = 'xs';
    } else if (width < Constants.breakpoints.lg) {
      size = 'sm';
    } else if (width < Constants.breakpoints.xl) {
      size = 'lg';
    } else {
      size = 'xl';
    }

    return size;
  }

  return {
    init: init
  };
})();

var MiniGallery = (function() {
  'use strict';

  var $galleries;
  var $hoverTriggers;
  var maxEvenRowThumbs;
  var maxOddRowThumbs;
  var isLazyLoading;

  var batchSize = 10;
  var maxColumns = 36;
  var aspectRatio = 16 / 9;
  var pendingImages = 0;
  var currentBatchSize = 0;
  var layingOut = false;
  var debounce;

  function init(options) {
    if (options && options.batchSize) {
      batchSize = options.batchSize;
    }

    if ($('.acr-mini-gallery').length) {
      $('.acr-mini-gallery').css('visibility', 'hidden');
      layout();
      attachHover();
      attachResize();
      attachCloseModal();
    }
  }

  function layout() {
    if (layingOut) {
      return;
    }

    layingOut = true;
    $galleries = $('.acr-mini-gallery');

    if (window.innerWidth < Constants.breakpoints.sm) {
      maxEvenRowThumbs = 2;
      maxOddRowThumbs = 1;
      isLazyLoading = true;
    } else {
      maxEvenRowThumbs = 3;
      maxOddRowThumbs = 2;
      isLazyLoading = false;
    }

    $galleries.each(function(i, gallery) {
      var currentThumbs;
      var $gallery = $(gallery);
      var thumbs = $gallery.find('.thumb');
      var thumbImages = $gallery.find('.thumb-content');

      var evenRow = true;
      var animDelay = 0;
      var galleryWidth = $gallery.width();

      while (thumbs.length > 0) {
        if (evenRow && thumbs.length >= maxEvenRowThumbs) {
          currentThumbs = thumbs.splice(0, maxEvenRowThumbs);
        } else if (!evenRow && thumbs.length >= maxOddRowThumbs) {
          currentThumbs = thumbs.splice(0, maxOddRowThumbs);
        } else {
          currentThumbs = thumbs;
          thumbs = [];
        }

        var height = 0;
        var width = 0;

        $.each(currentThumbs, function(i, thumb) {
          var numCols = maxColumns / currentThumbs.length;
          var $thumb = $(thumb);
          var anims = ' acr-stagger';
          animDelay += 0.1;

          $thumb.removeClass();
          $thumb.addClass('thumb col-xs-' + numCols + anims);
          $thumb.css({
            'animation-delay': animDelay + 's'
          });

          $thumb.waypoint(function() {
            $(this.element).addClass('animated acr-fade-in-up-scatter-short');
          }, {
            offset: '100%'
          });

          if (height === 0) {
            height = Math.round($thumb.width() / aspectRatio);
          }

          if (width === 0) {
            width = Math.floor(galleryWidth / currentThumbs.length);
          }

          $thumb.find('.thumb-content').height(height);
          $thumb.width(width);
        });

        evenRow = !evenRow;
      }

      pendingImages += thumbImages.length;
    });

    loadImages();
    layingOut = false;
  }

  function loadImages() {
    var thumbs = $('.acr-mini-gallery .thumb-content:not(.shown)');

    if (isLazyLoading && pendingImages > 0 && currentBatchSize === 0) {
      currentBatchSize = (batchSize <= pendingImages) ?
          batchSize : pendingImages;
    } else if (!isLazyLoading) {
      currentBatchSize = thumbs.length;
      pendingImages = 0;
    }

    for (var i = 0; i < currentBatchSize; i++) {
      $(thumbs[i]).addClass('acr-responsive-background-behavior')
                  .addClass('broadcast-image-load')
                  .data('type', 'MiniGallery/imageLoad');
    }

    ResponsiveBackground.execute();
  }

  function attachHover() {
    $hoverTriggers = $('.acr-mini-gallery .play,' +
      '.acr-mini-gallery .rollover-bg,' +
      '.acr-mini-gallery .acr-icon-direction-45');

    $hoverTriggers.off('hover');

    $hoverTriggers.hover(function() {
      $(this).siblings('.thumb-content')
             .addClass('hover');
    }, function() {
      $(this).siblings('.thumb-content')
             .removeClass('hover');
    });
  }

  function attachResize() {
    $(window).off('resize', onResize);
    $(window).resize(onResize);

    setTimeout(function() {
      layout();
      $('.acr-mini-gallery').css('visibility', 'visible');
    }, 250);
  }

  function onResize() {
    clearTimeout(debounce);
    debounce = setTimeout(layout, 250);
  }

  function attachCloseModal() {
    $(window).on('ar.closemodal', layout);
  }

  $(document).off('MiniGallery/imageLoad')
      .on('MiniGallery/imageLoad', function(e, imageSrc) {
        if (isLazyLoading) {
          currentBatchSize -= 1;
          pendingImages -= 1;

          if (currentBatchSize === 0) {
            loadImages();
          }
        }
      });

  return {
    init: init
  };
})();

var MLPilxPackages = (function() {
  'use strict';

  var Utility = window.Utility || {};

  var $sliders = $.noop;

  var $tabs = $.noop;

  var debounceResize = $.noop;

  var api;

  function slickAfterChange(e, slick, currentSlide) {
    var $parent = $(e.target).parents('.acr-multi-features');

    $('.acr-mlp-tab', $parent).removeClass('acr-mlp-active');

    $('.acr-mlp-tab:eq(' + currentSlide + ')', $parent).
        addClass('acr-mlp-active');
  }

  function setSlick() {
    $sliders = $('.acr-multi-features-slick');

    var xLink = {
      left: 'xlink:href="#arrow-left"',
      right: 'xlink:href="#arrow-right"'
    };

    $sliders.slick({
      arrows: false,
      useTransform: true,
      infinite: false,
      centerPadding: '10px',
      responsive: [{
        breakpoint: 1024,
        settings: {
          arrows: true,
          dots: true,
          infinite: true,
          centerPadding: '0px',
          prevArrow: '<button type="button" data-role="none" ' +
                'class="slick-prev col-xs-4" aria-label="Previous" ' +
                'tabindex="0" role="button">' +
              '<svg class="acr-icon">' +
                '<use ' + xLink.left + '></use>' +
              '</svg>' +
            '</button>',
          nextArrow: '<button type="button" data-role="none" ' +
                'class="slick-next col-xs-4" aria-label="Next" ' +
                'tabindex="0" role="button">' +
              '<svg class="acr-icon">' +
                '<use ' + xLink.right + '></use>' +
              '</svg>' +
            '</button>'
        }
      }]
    });

    $sliders.on('afterChange', slickAfterChange);
  }

  function changeSlide(e) {
    var $packages = $(e.target).parents('.acr-multi-features');

    var $slider = $packages.children('.acr-multi-features-slick');

    var $parent = $(e.target).parents('.acr-mlp-tabs');

    var position = $('button', $parent).index(e.target);

    $('.acr-mlp-tab', $parent).removeClass('acr-mlp-active');

    $(e.target).addClass('acr-mlp-active');

    $slider.slick('slickGoTo', position);
  }

  function setTabs() {
    $tabs = $('.acr-mlp-tab');

    $tabs.on('click', changeSlide);
  }

  function heightRegularCalculation() {
    var $parent = $('.acr-mlp-features-container').
        parents('.acr-mlp-all-features');

    var heightParent = $parent.innerHeight();

    var heightSibling = $('.acr-mlp-features-heading', $parent).outerHeight();

    return heightParent - heightSibling;
  }

  function heightAllFeaturesCalculation() {
    return $('.slick-list').height();
  }

  function featuresHeight() {
    $('.acr-mlp-features-container').height(heightRegularCalculation);
  }

  function allFeaturesHeight() {
    $('.acr-mlp-all-features').height(heightAllFeaturesCalculation);
  }

  function resize() {
    allFeaturesHeight();

    featuresHeight();

    if (api) {
      api.reinitialise();
    }
  }

  function resizeCallback() {
    clearTimeout(debounceResize);

    debounceResize = setTimeout(resize, 700);
  }

  function onResize() {
    $(window).on('resize', resizeCallback);
  }

  function setScrollbar() {
    var element = $('.acr-mlp-features-container').jScrollPane({
      autoReinitialise: true
    });

    api = $(element).data('jsp');
  }

  function imagesReady() {
    resize();
  }

  function init() {
    setSlick();

    setTabs();

    onResize();

    setScrollbar();

    Utility.imagesReady($sliders, imagesReady);
  }

  return {
    init: init
  };
}());

// [AR-3715] PL: Create HTML/CSS/JS structure [MLP: Vehicle Level Navigation]
var MLPNav = (function($el) {
  Utility.log('MLPNav.js loaded');

  var mlpNav = {};

  var $window = $(window);

  var swipeStartY;

  var swipeEndY;

  var translate = 0;

  var maxTranslate = 0;

  var debounce;

  //MLP Nav Basic Constructor
  function MLPNav($el) {
    this.$el = $el;

    this.$section = this.$el.children('section');

    this.$yearSelector = this.$section.find('div[role=presentation]');

    this.$yearOptions = this.$yearSelector.find('a');

    this.$lis = this.$section.find('li');

    this.$button = this.$section.children('button');

    this.$buttonSVG = this.$button.children('svg');

    this.$hamburger = this.$el.children('aside[role=menu]');

    return this;
  }

  function _toggleHamburger() {
    mlpNav.$hamburger.slideToggle(function() {
      _setMaxTranslate();
    });

    //Flip flop the arrow icon
    mlpNav.$buttonSVG.each(function() {
      if ($(this).attr('class').indexOf('hidden') !== -1) {
        $(this).attr('class', 'acr-icon');
      } else {
        $(this).attr('class', 'acr-icon hidden');
      }
    });

    // if (mlpNav.$hamburger.css('display') === 'flex') {
    //   $window
    //     .on('resize.mlpnav orientationchange.mlpnav',
    //     _eatHamburger);
    // }
  }

  // function _eatHamburger() {
  //   if ($window.width() >= Constants.breakpoints.lg) {
  //     mlpNav.$hamburger.hide();

  //     $window.off('.mlpnav');
  //   }
  // }

  // function switchActiveLink() {
  //   switch (location.pathname.split('/').slice(-1)[0]) {
  //     case 'features':
  //       mlpNav.$lis.filter('.mlp-features').addClass('active');
  //       break;
  //     case 'gallery':
  //       mlpNav.$lis.filter('.mlp-gallery').addClass('active');
  //       break;
  //     case 'packages':
  //       mlpNav.$lis.filter('.mlp-packages').addClass('active');
  //       break;
  //     case 'specs':
  //       mlpNav.$lis.filter('.mlp-specs').addClass('active');
  //       break;
  //     default:
  //       mlpNav.$lis.filter('.mlp-overview').addClass('active');
  //   }
  // }

  function _expandYearSelector() {
    $(this).toggleClass('expanded');
  }

  function _selectYearOption() {
    $(this).addClass('selected').siblings('a').removeClass('selected');
  }

  function init() {
    //Bail if this element DNE
    if ($el.length === 0) {
      return null;
    }

    //Otherwise initialize the constructor
    mlpNav = new MLPNav($el);

    //Adjust which link is active
    //switchActiveLink();

    //Set Overview button up arrow to hidden on mobile
    $('.mlp-nav > section > button > svg:nth-child(2)')
        .attr('class', 'acr-icon hidden');

    $('.acr-header > div').css('position', 'relative');

    mlpNav.$button.on('click.mlpNav', _toggleHamburger);

    mlpNav.$yearSelector.on('click.mlpNav', _expandYearSelector);

    mlpNav.$yearOptions.on('click.mlpNav', _selectYearOption);

    $window.on('resize', _attachResize);

    _attachTouch();

    return this;
  }

  function _attachTouch() {
    mlpNav.$hamburger.off('touchstart', _touchStartHandler)
        .on('touchstart', _touchStartHandler);

    mlpNav.$hamburger.off('touchmove', _touchMoveHandler)
        .on('touchmove', _touchMoveHandler);

    mlpNav.$hamburger.off('touchend', _touchEndHandler)
        .on('touchend', _touchEndHandler);
  }

  function _touchStartHandler(e) {
    swipeStartY = e.originalEvent.touches[0].clientY;

    translate = parseInt(mlpNav.$hamburger.css('top'));

    mlpNav.$hamburger.removeClass('acr-animation');
  }

  function _touchMoveHandler(e) {
    var dY;

    var top;

    swipeEndY = e.originalEvent.touches[0].clientY;

    dY = swipeStartY - swipeEndY;

    dY = dY * -1;

    top = translate + dY;

    if (top > 0) {
      top = 0;
    } else if (top * -1 > maxTranslate) {
      top = maxTranslate * -1;
    }

    mlpNav.$hamburger.css('top', top.toString() + 'px');

    mlpNav.$hamburger.addClass('acr-animation');
  }

  function _touchEndHandler() {
    swipeStartY = null;

    swipeEndY = null;
  }

  function _setMaxTranslate() {
    var menuBarHeight = mlpNav.$section.height();

    var viewPortHeight = window.innerHeight;

    var hamburgerViewPortH = viewPortHeight - menuBarHeight;

    maxTranslate = Math.abs(mlpNav.$hamburger.height() - hamburgerViewPortH);
  }

  function _attachResize() {
    clearTimeout(debounce);

    debounce = setTimeout(_onResize, 250);
  }

  function _onResize() {
    if (window.innerWidth < Constants.breakpoints.lg &&
        mlpNav.$yearSelector.hasClass('expanded')) {

      mlpNav.$yearSelector.removeClass('expanded');

    }
  }

  return {
    init: init
  };

})($('.mlp-nav'));

var Modals = (function() {
  'use strict';

  Utility.log('Modals.js loaded');

  function init() {
    YouTubeManager.playerManager.loadAPI();
    $('.acr-modal').on('show.bs.modal', show);
    $('.acr-modal').on('shown.bs.modal', shown);
    $('.acr-modal').on('hide.bs.modal', hide);
    $('.acr-modal').on('hidden.bs.modal', hidden);
    $('.acr-modal').on('hidden.bs.loaded', loaded);
  }

  function show(event) {

    var button = $(event.relatedTarget);
    var isYoutybe = button.data('videoYoutube');
    var videoID = button.data('videoId');
    var container = $('.modal-body');
    var close = $('.acr-modal-close');
    var trigger = $('m');
    var autoplay = (window.innerWidth < 550) ? 0 : 1;
    var player = new YouTubeManager.
                     YouTubePlayerObject(
                                  videoID,
                                  trigger,
                                  close,
                                  container,
                                  container,
                                  autoplay);
    player.init();
  }

  function shown(event) {

  }

  function hide(event) {

  }

  function hidden(event) {
    $('.modal-body').html('');
    $(window).trigger('ar.closemodal');
  }

  function loaded(event) {

  }

  return {
    init: init
  };
})();

var ModelSlider = (function() {
  'use strict';

  var $sliders = $('.acr-model-slick');

  function init() {
    setSlick();
  }

  function setSlick() {
    $sliders.slick({
      autoplay: true,
      autoplaySpeed: 6000,
      dots: true,
      speed: 1200,
      useTransform: true,
      nextArrow: '<svg class="acr-icon slick-next slick-arrow"' +
                ' viewBox="0 0 26 26">' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
                ' xlink:href="#arrow-right">' +
                ' </use></svg>',
      prevArrow: '<svg class="acr-icon slick-prev slick-arrow"' +
                ' viewBox="0 0 26 26">' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
                ' xlink:href="#arrow-left">' +
                '</use></svg>',
    });

  }

  return {
    init: init
  };
})();

Modernizr.addTest('ipad', function() {
    return !!navigator.userAgent.match(/iPad/i);
});

Modernizr.addTest('iphone', function() {
    return !!navigator.userAgent.match(/iPhone/i);
});

Modernizr.addTest('ipod', function() {
    return !!navigator.userAgent.match(/iPod/i);
});

Modernizr.addTest('android', function() {
    return !!navigator.userAgent.match(/android/i);
});

Modernizr.addTest('mac', function() {
    return !!navigator.userAgent.match(/Mac/i);
});

Modernizr.addTest('appleios', function() {
    return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
});

var ie = (function() {
    var undef, rv = null; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rvNum = ua.indexOf('rv:');
        rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return rv;
}());

Modernizr.addTest('ie', function() {
  return !!ie;
});

Modernizr.addTest('ie8', function() {
  return (Modernizr.ie && ie === 8);
});

Modernizr.addTest('ie9', function() {
  return (Modernizr.ie && ie === 9);
});

Modernizr.addTest('ie10', function() {
  return (Modernizr.ie && ie === 10);
});

Modernizr.addTest('ie11', function() {
  return (Modernizr.ie && ie === 11);
});

var isObjectFitSupported = (function() {
    var isSupported = true;
    if ('objectFit' in document.documentElement.style === false) {
        isSupported = false;
    }
    return isSupported;
})();

Modernizr.addTest('objectfit', function() {
    return !!isObjectFitSupported;
});

Modernizr.addTest('firefox', function() {
    return !!navigator.userAgent.match(/Firefox/i);
});

var MultiCol = (function() {
  'use strict';

  Utility.log('MultiCol.js loaded');

  var colWrapper = $('.col-wrapper');
  var article = $('.col-wrapper article');
  var articleImg = $('.col-wrapper article img');
  var articleHeader = $('.col-wrapper article h6');
  var articleSubCopy = $('.col-wrapper article .sub-copy');
  var articleFirst = $('.col-wrapper article:first-child');
  var articleLast = $('.col-wrapper article:last-child');
  var multiColTitle01 = $('.multi-col-tile-01');

  function init() {
    multiColWidth();
    emptyContent();
  }

  function multiColWidth() {

    if (colWrapper.hasClass('cols-2')) {
        article.addClass('col-md-18');

    } else if (colWrapper.hasClass('cols-2-25-75')) {
        articleFirst.addClass('col-md-9');
        articleLast.addClass('col-md-27');

    } else if (colWrapper.hasClass('cols-2-75-25')) {
        articleFirst.addClass('col-md-27');
        articleLast.addClass('col-md-9');

    } else if (colWrapper.hasClass('cols-2-33-66')) {
        articleFirst.addClass('col-md-12');
        articleLast.addClass('col-md-24');

    } else if (colWrapper.hasClass('cols-2-66-33')) {
        articleFirst.addClass('col-md-24');
        articleLast.addClass('col-md-12');

    } else if (colWrapper.hasClass('cols-3')) {
        article.addClass('col-md-12');

    } else if (colWrapper.hasClass('cols-4')) {
        article.addClass('col-md-9');
    }
  }

  function emptyContent() {

    $('.col-wrapper article header').each(function() {
      if ($.trim($(this).text()) == '') {
        $(this).hide();
      }
    });

    $(articleHeader).each(function() {
      if ($.trim($(this).text()) == '') {
        $(this).next('div').hide();
      }
    });

    $(articleSubCopy).each(function() {
      if ($.trim($(this).text()) == '') {
        $(this).remove();
      }
    });

    $('.acr-cta-text').each(function() {
      if ($.trim($(this).text()) == '') {
        $(this).remove();
      }
    });

    $('img').error(function() {
        $(this).hide();
        $(this).parent().closest(multiColTitle01).css('min-height', '17rem');
    });
  }

  return {
    init: init
  };
})();

var MultiTabNavigation = (function() {
  'use strict';

  var $multiTabNavigation = $('.acr-multi-tab-navigation');
  var $multiTabSlick = $('.acr-multi-tab-navigation-slick');
  var $navList = document.createElement('ul');
  var $list = document.createElement('li');
  var $button = document.createElement('button');

  function init() {

    $navList.className = 'acr-multi-tab-list';
    $button.className = 'acr-multi-tab-button';
    $button.dataset.toggle = 'tab';
    _createNavigation();
    _attachClick();
    _setSlick();
  }

  function _setSlick() {

    $multiTabSlick.slick({
      arrows: false,
      autoplay: false,
      fade: true,
      speed: 250,
      swipe: true,
      useTransform: true,
      responsive: [{
        breakpoint: 550,
        settings: {
          arrows: true,
          dots: true,
          fade: false,
          nextArrow: '<button type="button" data-role="button"' +
            'class="slick-next acr-white col-sm-2"' +
            'aria-label="Next" tabindex="0" role="button">' +
            '<svg class="acr-icon">' +
            '<use xlink:href="#arrow-right"></use></svg>' +
            '</button>',
          prevArrow: '<button type="button" data-role="button"' +
            'class="slick-prev acr-white col-sm-2"' +
            'aria-label="Previous" tabindex="0" role="button">' +
            '<svg class="acr-icon">' +
            '<use xlink:href="#arrow-left"></use></svg>' +
            '</button>',
        }
      }]
    });

    $multiTabSlick.on('afterChange', _afterChange);

    $multiTabNavigation.each(function(index, element) {
      var $firstMultiTab = $('.acr-multi-tab-content', $(element))[0];
      var theme = $firstMultiTab.dataset.theme;
      var $cta = $('.acr-cta-text', $($firstMultiTab));

      _changeTheme(theme, $cta, $(element));
    });



  }

  function _afterChange(event, slick, currentSlide) {
    var theme = $('.acr-multi-tab-content', $(slick.$slides[currentSlide])).
      data('theme');
    var $cta = $('.acr-cta-text', $(slick.$slides[currentSlide]));

    var $parent = $(slick.$slides[currentSlide]).
      parents('.acr-multi-tab-navigation');

    _changeTheme(theme, $cta, $parent);
  }

  function _changeTheme(theme, $cta, $parent) {
    $parent.removeClass('dark-theme light-theme');

    $parent.addClass(theme);

    $cta.removeClass('is-black is-white');

    if (theme === 'dark-theme') {
      $cta.addClass('is-white');
    } else {
      $cta.addClass('is-black');
    }
  }

  function _createNavigation() {
    var $navListClone;
    var $listClone;
    var $buttonClone;
    var $label;
    var maxTabs;

    $multiTabNavigation.each(function(index, element) {

      maxTabs = $(element).data('maxTabs');
      maxTabs--;

      $navListClone = $navList.cloneNode();

      if ($('[data-navigation-label]', $(element)).length > 1) {

        $('[data-navigation-label]', $(element)).each(function(i, el) {

          if (i > maxTabs) {
            return false;
          }

          $listClone = $list.cloneNode();
          $buttonClone = $button.cloneNode();
          $label = document.createTextNode(el.dataset.navigationLabel);

          if (i === 0) {
            $listClone.className = 'active';
          }

          $buttonClone.appendChild($label);
          $listClone.appendChild($buttonClone);
          $navListClone.appendChild($listClone);

        });
      }

      $('.tabbed-menu', $(element)).append($($navListClone));

    });
  }

  function _attachClick() {
    $('.acr-multi-tab-button').on('click', _changeSlide);
  }

  function _changeSlide(e) {
    var $multiTab = $(e.target).parents('.acr-multi-tab-navigation');

    var $slider = $multiTab.children('.acr-multi-tab-navigation-slick');

    var $parent = $(e.target).parents('ul');

    var position = $('button', $parent).index(e.target);

    $(e.target).addClass('acr-multi-tab-active');

    $slider.slick('slickGoTo', position);
  }

  return {
    init: init
  };

})();

var PackagesSlider = (function(window) {
  'use strict';

  var $sliders = $.noop;

  var Breakpoints = Constants.breakpoints;

  var Grid = Constants.grid;

  function init() {
    setSlick();
  }

  function isEditingMode() {
    return $sliders.parent('.acr-packages-slider').hasClass('editing-mode');
  }

  function setEditingModeScreenWidth() {
    var width = 0;

    var packages = $('.acr-packages-slick .package');

    packages.each(function(i) {
      width += this.offsetWidth;
    });

    $('.acr-packages-slick').width(width);
  }

  function setSlick() {
    $sliders = $('.acr-packages-slick');

    if (isEditingMode()) {
      return;
    }

    $sliders.slick({
      infinite: false,
      dots: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      prevArrow: '<button type="button" data-role="none"' +
          'class="slick-prev acr-icon-arrow-large-left acr-f4 acr-mid-grey"' +
          'aria-label="Previous" tabindex="0" role="button"></button>',
      nextArrow: '<button type="button" data-role="none"' +
          'class="slick-next acr-icon-arrow-large-right acr-f4 acr-mid-grey"' +
          'aria-label="Next" tabindex="0" role="button"></button>',
      useTransform: true,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: true
        }
      }, {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });

    $sliders.on('afterChange', function(event, slick, currentSlide) {
      var $this = $(this);

      if (currentSlide >= getNumberOfDots(this, slick)) {
        setTimeout(function() {
          $this.slick('slickGoTo', getNumberOfDots(this, slick) - 1, true);
        }, 10);
      }
    });

    $sliders.on('setPosition', function(event, slick) {
        var dots = slick.$dots ? slick.$dots.find('li') : [];

        var numberOfDots = getNumberOfDots(this, slick);

        if (dots.length > numberOfDots) {
          for (var i = numberOfDots; i < dots.length; i++) {
            dots[i].remove();
          }
        }
    });
  }

  function getNumberOfDots(el, slick) {
    var slidesToShow = slick.options.slidesToShow;

    if (slidesToShow < slick.$slides.length) {
      return (slick.$slides.length - slidesToShow) + 1;
    }

    return 0;
  }

  $(window).on('resize', $.throttle(250, function() {
    if (!$('.acr-packages-slick').hasClass('slick-initialized')) {
      setSlick();
    }

    setTimeout(function() {
      if (isEditingMode()) {
        setEditingModeScreenWidth();
      }
    }, 200);
  }));

  return {
    init: init
  };
})(window);

var Promotions = (function() {
  'use strict';

  Utility.log('Promotions.js loaded');

  var size = $.noop;
  var $promotionsSlick = $.noop;

  function init() {
    setOnResize();
    resize();
  }

  function setOnResize() {
    window.addEventListener('resize', resize);
  }

  function resize() {

    var width = window.innerWidth;

    if (width < Constants.breakpoints.sm && size !== 'xs') {
      size = 'xs';
      setSlick();
    } else if (width >= Constants.breakpoints.sm && size !== 'sm') {
      size = 'sm';
      removeSlick();
    }
  }

  function setSlick() {
    $promotionsSlick = $('.promotions-slick').slick({
      dots: true,
      useTransform: true
    });
    addArrowsStyle();
  }

  function removeSlick() {
    if ($promotionsSlick.length) {
      $('.promotions-slick').slick('unslick');
    }
  }

  function addArrowsStyle() {
    $('.slick-next', $promotionsSlick)
    .addClass('acr-icon-arrow-large-right acr-f2 acr-black').text('');
    $('.slick-prev', $promotionsSlick)
    .addClass('acr-icon-arrow-large-left acr-f2 acr-black').text('');
  }

  return {
    init: init
  };
})();

'use strict';

var ResponsiveTable = (function($) {
  var flag = false;

  var delay = 400;

  var $tableRow = $('.responsive-table tbody tr');

  var $tableMobileHeader = $('.responsive-table-header-mobile ul li');

  var $tableCol = $('.responsive-table tbody > ' +
      'tr.responsive-table-body:nth-child(2) td');

  var widhtFirstColumnBody = $('.responsive-table-static tbody > ' +
      '.responsive-table-body:visible .responsive-table-fixed-column').
      width() - 8;

  function init() {
    flag = false;

    delay = 400;

    $tableRow = $('.responsive-table tbody tr');

    $tableMobileHeader = $('.responsive-table-header-mobile ul li');

    $tableCol = $('.responsive-table tbody > ' +
        'tr.responsive-table-body:nth-child(2) td');

    widhtFirstColumnBody = $('.responsive-table-static tbody > ' +
        '.responsive-table-body:visible .responsive-table-fixed-column').
        width() - 8;

    $('.responsive-table-info').each(function() {
      $(this).on('click', function(e) {
        var anchor = this;

        e.preventDefault();

        $(this).attr('href', '#');

        $.get($(this).data('href') + '?stub=1', function(data) {
          $('#' + $(anchor).attr('aria-controls') + ' .collapse-content').
              get(0).innerHTML = data;

          setTimeout(function() {
            $('#' + $(anchor).attr('aria-controls')).collapse('toggle');
            Disclaimer.init();
          }, 200);
        });
      });

      $(this).on('mousedown', function(e) {
        var href = $(this).data('href');

        if (e.which == 3) {
          $(this).attr('href', href);
        }
      });
    });

    $tableRow.find('td.col-1').show().addClass('active');

    $tableMobileHeader.eq(0).addClass('active');

    $tableMobileHeader.on('click', function(event) {
      if (!flag && !$(this).hasClass('active')) {
        $('li').removeClass('active');

        $(this).addClass('active');

        toggleColumn($(this).index());

        flag = true;
      }

      if ($('.responsive-table-detail .collapse.in')) {
        $('.responsive-table-detail .collapse').collapse('hide');
      }
    });

    var resizeFunc = Utility.debounce(function() {
      widhtFirstColumnBody = $('.responsive-table-static tbody > ' +
          '.responsive-table-body:visible .responsive-table-fixed-column').
          width() - 8;

      removeAttrStyle();
      // scrollTitleSticky();
      widthFirstColumnSubcategory();
    }, 10);

    $(window).resize(resizeFunc);

    $(window).scroll($.throttle(100, function() {
      Utility.log('SCROLLING: throttle(250) from ResponsiveTable (window)');
      scrollHeaderSticky();
      // scrollTitleSticky();
    }));

    $('.modal-body').scroll($.throttle(100, function() {
      Utility.log('SCROLLING: throttle(250) from ResponsiveTable (modal-body)');
      scrollHeaderSticky();
    }));

    countCol();

    closeDetails();

    toggleAccordion();
  } //init END

  function countCol() {
    var colCount = 0;

    $tableCol.each(function() {
      colCount++;
    });

    $('.responsive-table-colspan').attr('colspan', colCount);
  }

  function closeDetails() {
    $tableRow.find('.responsive-table-detail-close').on('click', function(e) {
      e.preventDefault();

      var $this = $(this);

      var $collapse = $this.closest('.collapse');

      $collapse.collapse('toggle');
    });
  }

  function hideCol(target) {
    $(target).removeClass('active');

    $(target).fadeOut(delay);
  }

  function removeAttrStyle() {
    if ($(window).width() > 550) {
      $tableRow.find('td').removeAttr('style');
    }
  }

  function scrollHeaderSticky() {
    var itIsPresent = $(document).find('.responsive-table-static thead');

    if (itIsPresent.length > 0) {
      var headerHeight = $('.responsive-table-static thead').height();

      var headerPosition = $('.responsive-table-static thead').position().top;

      var scrollWindowTop = $(window).scrollTop();

      var headerPositionWithoutModal = $('.responsive-table-static thead').
          offset().top - scrollWindowTop;

      var mlpNavHeight = $(document).find('.mlp-nav').outerHeight() - 1 || 0;

      var modalHeaderHeight = $('.modal-header').outerHeight();

      var negativeValueHeight = (modalHeaderHeight) ? -(headerHeight) :
                                -(headerPositionWithoutModal + mlpNavHeight);

      var iOS = /iPad|iPhone|iPod|Safari/.test(navigator.userAgent) &&
          /Apple Computer/.test(navigator.vendor) && !window.MSStream;

      if (($('.responsive-table-static tbody > ' +
          '.responsive-table-body:visible').length) > 0) {
        if ($('.modal-body .responsive-table').length > 0) {
          if (headerPosition < negativeValueHeight) {
            if (iOS) {
              var stickyHeader = $('.responsive-table-header-sticky-container');

              $('.modal-content').append(stickyHeader);

              $('.responsive-table-header-sticky-container').css({
                'display': 'block',
                'position': 'fixed',
                'left': 0,
                'max-height': '100px',
                'top': modalHeaderHeight
              });
            } else {
              $('.responsive-table-header-sticky-container').css({
                display: 'block',
                left: 0,
                top: modalHeaderHeight
              });
            }

            widthFirstColumnSubcategory();
          } else {
            $('.responsive-table-header-sticky-container').
                css('display', 'none');
          }
        } else {

          if (headerPositionWithoutModal <= negativeValueHeight) {
            $('.responsive-table-header-sticky-container').css({
              display: 'block',
              top: mlpNavHeight
            });

            widthFirstColumnSubcategory();
          } else {
            $('.responsive-table-header-sticky-container').
                css('display', 'none');
          }
        }
      } else {
        $('.responsive-table-header-sticky-container').css('display', 'none');
      }
    }
  }

  function scrollTitleSticky() {
    var scrollWindowTop = $(window).scrollTop(),
        buttonData = $('.responsive-table-title-accordion h4.active'),
        elementPosition = 0,
        subtraction = 0,
        $grandparentElement = '',
        stickyHeaderHeight = $('.responsive-table-header-sticky-container')
                              .outerHeight(),
        headerHeight = $('.responsive-table-static thead').height(),
        negativeValueHeight = -(headerHeight);

    $.each(buttonData, function(k, v) {
      elementPosition = $(v).position().top;
      subtraction = elementPosition - scrollWindowTop;
      $grandparentElement = $(v).parents('.responsive-table-title-accordion');

      if (subtraction <= 0 && !$grandparentElement.hasClass('fixed')) {
        $('.responsive-table-title-accordion').removeClass('fixed');
        $grandparentElement.addClass('fixed').css('top', stickyHeaderHeight);
      } else if (subtraction >= negativeValueHeight &&
                  $grandparentElement.hasClass('fixed')) {
        $grandparentElement.removeClass('fixed');
      }
    });
  }

  function showCol(target) {
    $(target).addClass('active');

    $(target).css({
      opacity: 0,
      display: 'table-cell'
    });

    $(target).animate({
      opacity: 1
    }, delay);

    setTimeout(function() {
      flag = false;
    }, delay + 1);
  }

  function toggleAccordion() {
    var $button = $('.responsive-table-title-accordion-link');

    var buttonData = '';

    var $firstAnchor = $('.responsive-table-title-accordion').eq(0).find('h4');

    $('.responsive-table-body, .responsive-table-detail').hide();

    if ($firstAnchor.hasClass('expanded')) {
      $firstAnchor.addClass('active');

      buttonData = $firstAnchor.data('section');

      $('.' + buttonData).removeAttr('style');
    }

    $button.
      off('click').
      on('click', function(e) {
        buttonData = $(this).find('h4').data('section');

        if ($(e.target).closest('.disclaimer-callout').length === 0) {
          if ($('tr.' + buttonData).is(':visible')) {
            $('tr.' + buttonData).hide();

            $(this).find('h4').removeClass('active');
          } else {
            $(this).find('h4').addClass('active');

            $('.' + buttonData).removeAttr('style');
          }
        }
      });

      $button.eq(0).trigger('click');
  }

  function toggleColumn(index) {
    var indexCol = index + 1;

    var targetCol = $tableRow.find('td.active');

    var target = $tableRow.find('td.col-' + indexCol);

    hideCol(targetCol);

    setTimeout(function() {
      showCol(target);
    }, delay);
  }

  function widthFirstColumnSubcategory() {
    var widhtFirstColumnBody = $('.responsive-table-static tbody > ' +
        '.responsive-table-body:visible .responsive-table-fixed-column').
        width();

    var widthTable = $('.responsive-table-static').width();

    $('.responsive-table-header-sticky').width(widthTable);

    $('.responsive-table-header-sticky thead tr ' +
        'th.responsive-table-fixed-column').width(widhtFirstColumnBody);
  }

  return {
    init: init
  };
})(jQuery);

var ShopingTools = (function() {
    'use strict';
    Utility.log('ShopingTools.js loaded');
    function init() {
        checkHover();
        $(window).resize(function() {
            checkHover();
        });
    }
    function checkHover() {
        var aShopButtons = $('.acr-shopping-tools').find('a');
        try {
            if (isMobile()) {
                $.each(aShopButtons, function(index, value) {
                    $(aShopButtons[index]).removeClass('acr-tools')
                    .addClass('acr-tools-mobile');
                });
            } else {
                $.each(aShopButtons, function(index, value) {
                    $(aShopButtons[index]).removeClass('acr-tools-mobile')
                    .addClass('acr-tools');
                });
            }
        } catch (err) {
         return false;
        }
    }
    function isMobile() {
        try {
            document.createEvent('TouchEvent');
            return true;
        } catch (e) {
            return false;
        }
    }
    return {
        init: init
    };
})();

var SignUpForEmails = (function() {
  'use strict';

  var $context = $('.acr-sign-up-form-emails');
  var $form = $('form', $context);

  function init() {
    attachEvents();
  }

  function attachEvents() {
    $form.on('submit', onSubmit);

    $('input', $form)
      .on('keypress', Validation.onKeypress);
    $('input', $form)
      .on('keyup', Validation.onKeyup);
    $('input', $form)
      .on('focus', Validation.onFocus);
    $('input', $form)
      .on('blur', Validation.onBlur);

    $('.acr-show-form', $context).
      on('click', showForm);
  }

  function onSubmit(e) {

    var success = Validation.validateForm(e);

    if (success) {
      send(e.target);
    }

    e.preventDefault();
  }

  function send(form) {
    var data = $(form).serialize();
    var method = form.getAttribute('method');
    var action = form.getAttribute('action');

    $.ajax({
      beforeSend: function(jqXHR, settings) {
        $('.acr-sign-up-form-emails-content', $context).
          addClass('acr-hidden');
        $('.acr-sign-up-form-emails-processing', $context).
          css('display', 'block');
      },
      data: data,
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error', jqXHR, textStatus, errorThrown);
      },
      method: method,
      success: function(data, textStatus, jqXHR) {
        var message = $('<div>').html(data.Message).text();

        $('.acr-sign-up-form-emails-processing', $context).
          css('display', 'none');
        $('.acr-sign-up-form-emails-message', $context).
          html(message);
        $('.acr-sign-up-form-emails-response', $context).
          css('display', 'block');

        if (data.Status === 'success') {

        } else {

        }

      },
      url: action

    });
  }

  function showForm() {
    $('.acr-sign-up-form-emails-messges', $context).
      css('display', 'none');

    $('.acr-sign-up-form-emails-content', $context).
      removeClass('acr-hidden');

    $('input', $form).removeClass('acr-not-empty');

    $('form', $context)[0].
      reset();
  }

  return {
    init: init
  };
})();

var SlickOverride = (function() {

    $.fn.slick.stopAuto = function() {

      var _ = this;
      $(this).on('click', '.slick-arrow, .slick-dots button', function(e) {
        var $slider = $(this).parents('.slick-initialized');
        $slider.slick(
            'slickSetOption',
            'autoplay',
            false,
            false);
      });
    };

    function init() {
      $.fn.slick.stopAuto();
    }

    return {
      init: init
    };
})();

var StyleGuide = (function() {
  'use strict';

  Utility.log('styleGuideSlider js loaded');

  var $styleguideSlick = $.noop;

  function init() {
    setSlick();
  }

  function setSlick() {

    $styleguideSlick = $('.styleguide-slider').slick({
      autoplay: true,
      cssEase: 'linear',
      dots: true,
      infinite: true,
      nextArrow: '<svg class="acr-icon slick-prev slick-arrow"' +
                ' viewBox="0 0 26 26">' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
                ' xlink:href="#arrow-left">' +
                ' </use></svg>',
      prevArrow: '<svg class="acr-icon slick-next slick-arrow"' +
                ' viewBox="0 0 26 26">' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
                ' xlink:href="#arrow-right">' +
                '</use></svg>',
      speed: 200,
      useTransform: true,
      variableWidth: true
    });
  }

  return {
    init: init
  };
})();

  var SubHeroPage = (function() {
  'use strict';

  var $stackedHeroes;

  function init() {
    $stackedHeroes = $('.acr-sub-page-hero-stacked');

    $(document).off('SubHeroPage/imageLoad', imageLoad)
      .on('SubHeroPage/imageLoad', imageLoad);

    // Unfortunately, the image sometimes don't get the resize instruction
    // so we need to call this every so often
    setInterval(imageLoad, 1000);
  }

  function imageLoad() {
    var width = window.innerWidth;

    if (width < Constants.breakpoints.sm) {
      $stackedHeroes.each(function(i, hero) {
        $(hero).css({
          'zoom': '1',
          'background-image': '',
          'height': 'auto'
        });
      });
    }
  }

  return {
    init: init
  };
})();

(function(window, $) {
  'use strict';
  var Acr = window.Acr = window.Acr || {};

  Acr.threeSixty = (function($) {
    var mainContainer = '.arc-threesixty';

    var displayItem = mainContainer + ' .item';

    var dWrapper = '.display-wrapper';

    var dButtons = '.btn-display-selector';

    var threeSel = '.threesixty';

    var threeIcon = '.threesixty-icon';

    var imageContainer = '.threesixty-images';

    var spinner = '.spinner';

    var currentClass = 'current-image';

    var pClass = 'previous-image';

    var buttonContainer = '.color-selector';

    var btnClass = 'btn-color-select';

    var colorName = 'color-name';

    var isActive = 'is-active';

    var isReady = 'is-ready';

    var intDiv = mainContainer + ' ' + dWrapper + ' .interior.item';

    var intId = 'iframeSpin';

    //To save current frame before changing color to avoid blinking
    var prevCur = 'arc-threesixty-prev-current';

    var prevCurSel = '.' + prevCur;

    var ext = '.jpg';

    var ready = false;

    var firstLoad = true;

    var dragging = false;

    var pointerStartPosX = 0;

    var pointerEndPosX = 0;

    var pDist = 0;

    var lWinW = 0; //Last window width

    var aspectW = 16;

    var aspectH = 9;

    var monitorStartTime = 0;

    var monitorInt = 10;

    var ticker = 0;

    var sPd = 10; //Speed

    var tFra; //Total Frames

    var defaultTotalFrames = 72;

    var cFrame = 0;

    var selectedFrame = 0;

    var frames = null;

    var eFrame = 0;

    var ldImages = 0;

    function init() {
      if ($(mainContainer).length) {
        var data = null;

        var jsonEle = document.createElement('div');

        var dataStr = $(mainContainer).data('json').toString(),

        totalFrames = $(mainContainer).data('frames');

        jsonEle.innerText = dataStr.replace(/[']/g, '"');

        try {
          data = $.parseJSON(jsonEle.innerText);
        } catch (e) {
          console.log('Invalid JSON Format');

          console.log('Provided value: ', dataStr);
        }

        if (!data || !data.exterior || !data.interior) {
          console.log('No/Wrong 360 Data: Plese provide data-json');

          $(spinner).html('No Data');

          return false;
        } else {
          $(window).off('resize', resizeHandler);

          tFra = !totalFrames ? defaultTotalFrames : totalFrames;

          frames = [];

          eFrame = 0;

          ldImages = 0;

          buildThreesixty(data.exterior, data.exteriorDisclaimer);

          buildInterior(data.interior, data.interiorDisclaimer);
        }
      }
    }

    //Interior
    function loadInterior(data, index) {
      $(intDiv).append('<iframe id="' + intId + '" />');

      $('#' + intId).attr({
        'src': data[index].baseUrl
      });

      setColorName(data, index, ' .interior');

      attachIntListeners(data);
    }

    function updateInterior(data, index) {
      $('#' + intId).attr('src', data[index].baseUrl);
    }

    function buildInterior(data, disclaimer) {
      var buttons = '<div class="interior item color-swatches">';

      if (disclaimer) {
        buttons += '<div class="threesixty-disclaimer">' +
            disclaimer + '</div>';
      }

      if (colorName) {
        buttons += '<div class="interior ' + colorName + ' acr-avenir-light">' +
            '  <strong class="text"></strong>' +
            '</div>';
      }

      buttons += '<div class="color-buttons">';

      $.each(data, function(index) {
        var t = this;

        var c = btnClass;

        buttons += '<a href="#" class="' + c;
        buttons += '" title="' + t.colorName;
        buttons += '" data-item="' + index;
        buttons += '" style="background-color: ' + this.colorSwatch + '">';
        buttons += '<svg viewBox="0 0 200 200">';
        buttons += '<use xmlns:xlink="http://www.w3.org/1999/xlink"';
        buttons += ' xlink:href="#checkmark"></use></svg></a>';
      });

      buttons += '</div></div>';

      $(buttonContainer).append(buttons);

      loadInterior(data, 0);
    }

    function attachIntListeners(data) {
      $(mainContainer).on('click', '.interior .btn-color-select', function(e) {
        e.preventDefault();

        var selected = $(this).data('item');

        updateInterior(data, selected);

        setColorName(data, selected, ' .interior');
      });

      $(window).on('resize', resizeHandler);
    }

    //Exterior
    function buildThreesixty(data, disclaimer) {
      var buttons = '<div class="exterior item color-swatches is-active">';

      if (disclaimer) {
        buttons += '<div class="threesixty-disclaimer">' +
            disclaimer + '</div>';
      }

      buttons += '<div class="exterior ' + colorName + ' acr-avenir-light">' +
          '  <strong class="text"></strong>' +
          '</div>' +
          '<div class="color-buttons">';

      $.each(data, function(index) {
        var t = this;

        var c = btnClass;

        buttons += '<a href="#" class="' + c;
        buttons += '" title="' + t.colorName;
        buttons += '" data-item="' + index;
        buttons += '" style="background-color: ' + this.colorSwatch + '">';
        buttons += '<svg viewBox="0 0 200 200">';
        buttons += '<use xmlns:xlink="http://www.w3.org/1999/xlink"';
        buttons += ' xlink:href="#checkmark"></use></svg></a>';
      });

      buttons += '</div></div>';

      $(buttonContainer).append(buttons);

      loadImage(data, 0);

      attachListeners(data);

      externalListeners();
    }

    function attachListeners(data) {
      $(threeSel).mousedown(function(event) {
        event.preventDefault();

        pointerStartPosX = getPointerEvent(event).pageX;

        dragging = true;

        hideIcon();
      });

      $(threeSel).mouseup(function(event) {
        event.preventDefault();

        dragging = false;
      });

      $(threeSel).mousemove(function(event) {
        event.preventDefault();

        trackPointer(event);
      });

      $(threeSel).on('touchstart', function(event) {
        pointerStartPosX = getPointerEvent(event).pageX;

        dragging = true;

        hideIcon();
      });

      $(threeSel).on('touchmove', function(event) {
        trackPointer(event);
      });

      $(threeSel).on('touchend', function(event) {
        event.preventDefault();

        dragging = false;
      });

      $(mainContainer).on('click', '.exterior .btn-color-select', function(e) {
        e.preventDefault();

        var selected = $(this).data('item');

        frames = [];

        eFrame = 0;

        ldImages = 0;

        clearContainer();

        loadImage(data, selected);

        setColorName(data, selected, ' .exterior');
      });

      $(window).on('resize', resizeHandler);
    }

    function hideIcon() {
      $(threeIcon).fadeOut(500, function() {
        $(threeSel).removeClass(isReady);
      });
    }

    //Adding listeners for Interior/Exterior toggle
    function externalListeners() {
      var toggleTimeout;

      $(buttonContainer).on('click', dButtons, function(event) {
        event.preventDefault();

        clearTimeout(toggleTimeout);

        var target = $(this).data('target');

        $(dButtons).removeClass(isActive);

        $(this).addClass(isActive);

        $(displayItem).removeClass(isActive);

        $(displayItem + '.' + target).addClass(isActive);

        toggleTimeout = setTimeout(function() {
          resizeHandler();
        },500);
      });
    }

    //Handling window resize event
    function resizeHandler() {
      setSizes();
    }

    // Cleaning DOM elements when changing colors
    function clearContainer() {
      $(spinner).fadeIn();

      var $current = $(imageContainer + ' li .current-image').parent('li');

      $current.addClass(prevCur);

      $(imageContainer + ' li:not(.' + prevCur + ')').remove();
    }

    //Adding + Loading images based on proided DATA
    function loadImage(data, index) {
      var li = document.createElement('li');

      var imageN = data[index].baseUrl + ('0' + (ldImages + 1)).slice(-2) + ext;

      var image = $('<img>').attr({
        src: imageN,
        alt: data[index].colorName
      }).addClass(pClass).appendTo(li);

      frames.push(image);

      $(imageContainer).append(li);

      $(image).load(function() {
        if (ldImages == 0) {
          setSizes();
        }

        imageLoaded(data, index);
      });
    }

    //Checking loaded images againts total images to start 360
    function imageLoaded(data, index) {
      ldImages++;

      if (ldImages == tFra) {
        frames[selectedFrame].removeClass(pClass).addClass(currentClass);

        setColorName(data, index, ' .exterior');

        $(spinner).fadeOut(500, function() {
          showThreeSixty();
        });
      } else {
        loadImage(data, index);
      }
    }

    //Showing 360 when all is ready
    function showThreeSixty() {
      $(imageContainer).fadeIn('slow', function() {
        $(prevCurSel).remove();

        if (firstLoad) {
          $(imageContainer).parent(threeSel).addClass(isReady);

          firstLoad = false;
        }
      });

      ready = true;
    }

    //Resize 360 container based on img size
    function setSizes() {
      if (window.innerWidth !== lWinW) {
        lWinW = window.innerWidth;

        var containerWidth = $(displayItem + '.' + isActive).width(),

        newHeight = aspectH / aspectW * containerWidth;

        $(mainContainer + ' ' + dWrapper + ' .item').height(newHeight);
      }
    }

    //Updating color name text based on selection
    function setColorName(data, i, btnContainer) {
      var ct = btnContainer;

      var mC = mainContainer;

      $(mC + ct + ' .' + colorName + ' .text').text(data[i].colorName);

      var btn = $(mC + ct + ' .' + btnClass + '[data-item="' + i + '"]');

      setActiveButton(btn, btnContainer);
    }

    //Updating active color button based on selection
    function setActiveButton(btn, btnContainer) {
      var $btn = btn;

      var ct = btnContainer;

      $(mainContainer + ct + ' .' + btnClass).removeClass(isActive);

      $btn.addClass(isActive);
    }

    function renderFrame() {
      if (cFrame !== eFrame) {
        var deft = Math.ceil((eFrame - cFrame) * 0.1);

        var ease = eFrame < cFrame ? Math.floor((eFrame - cFrame) * 0.1) : deft;

        hidePreviousFrame();

        cFrame += ease;

        showCFrame();

        selectedFrame = getCurrFrame();
      } else {
        window.clearInterval(ticker);

        ticker = 0;
      }
    }

    function refresh() {
      if (ticker === 0) {
        ticker = self.setInterval(renderFrame, Math.round(1000 / 60));
      }
    }

    function hidePreviousFrame() {
      frames[getCurrFrame()].removeClass(currentClass).addClass(pClass);
    }

    function selectFrame(index) {
      frames[index].removeClass(currentClass).addClass(pClass);
    }

    function showCFrame() {
      frames[getCurrFrame()].removeClass(pClass).addClass(currentClass);
    }

    function getCurrFrame() {
      var c = -Math.ceil(cFrame % tFra);

      if (c < 0) {
        c += (tFra - 1);
      }

      return c;
    }

    function getPointerEvent(event) {
      var e = event;

      var oE = e.originalEvent;

      return oE.targetTouches ? oE.targetTouches[0] : e;
    }

    function trackPointer(event) {
      if (ready && dragging) {
        pointerEndPosX = getPointerEvent(event).pageX;

        if (monitorStartTime < new Date().getTime() - monitorInt) {
          pDist = pointerEndPosX - pointerStartPosX;

          var cLc = Math.ceil((tFra - 1) * sPd * (pDist / $(threeSel).width()));

          eFrame = cFrame + cLc;

          refresh();

          monitorStartTime = new Date().getTime();

          pointerStartPosX = getPointerEvent(event).pageX;
        }
      }
    }

    return {
      init: init
    };
  })($);
})(window, jQuery);

var Validation = (function() {
  'use strict';

  Utility.log('Validation.js loaded');

  var invalidValueText = 'Please enter a valid ';
  var errorsCount = 0;
  var numberPattern = '[0-9]';
  var a = [];
  var valueMissingMessage = 'Please fill out this field';

  function init() {
    validateForms();
    ios();
    //firefox();
    //ie();
  }

  function validateForms() {
    $('.acr-form-validate').on('submit', validateForm);
    $('.acr-form-validate input').on('keypress', onKeypress);
    $('.acr-form-validate input').on('keyup', onKeyup);
    $('.acr-form-validate input').on('focus', onFocus);
    $('.acr-form-validate input').on('blur', onBlur);
  }

  function validateForm(e) {

    errorsCount = 0;

    $('input, select', e.target).each(validateField);

    if (errorsCount > 0) {

      $(this).addClass('acr-form-error');
      e.preventDefault();

      return false;

    } else {

      $(this).removeClass('acr-form-error');

    }

    return true;
  }

  function validateField(index, element) {

    var pattern = element.getAttribute('pattern');
    var modifier = element.dataset.patternModifier;
    var regExp = new RegExp(pattern, modifier);

    if (element.required || element.value.replace(/\s+/g, '').length > 0) {

      if (pattern && regExp.test(element.value) === false) {

        setError(element);

      } else if (!pattern && !element.validity.valid) {

        setError(element);

      } else {
        $(element)
        .parents('.acr-form-element')
        .removeClass('acr-form-element-error')
        .children('.acr-error')
        .text('');

      }
    }
  }

  function setError(element) {

    var errorText;

    if (element.validity.valueMissing) {

       errorText = (element.dataset.missingText) ?
                    element.dataset.missingText :
                    valueMissingMessage;
    }

    if (!errorText) {
      errorText = element.dataset.errorText;
    }

    if (!errorText) {
      errorText = invalidValueText;
      errorText += $(element)
      .parents('.acr-form-element')
      .children('label')
      .text();
    }

    $(element)
      .parents('.acr-form-element')
      .addClass('acr-form-element-error')
      .children('.acr-error')
      .text('*' + errorText);

    errorsCount++;
  }

  function onKeypress(e) {
    var type = this.getAttribute('type');
    var maxlength = this.getAttribute('maxlength');
    var keyCode = e.keyCode ? e.keyCode : e.which;
    var char = String.fromCharCode(keyCode);
    var regExp;

    if (keyCode !== 8 && keyCode !== 13) {
      if (type === 'number') {
        regExp = new RegExp(numberPattern);

        if ((maxlength && this.value.length > (maxlength - 1)) ||
          e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {

          e.preventDefault();
        }
      }

      if ((regExp && !regExp.test(char))) {

        e.stopPropagation();
        e.preventDefault();

        if ($('html').hasClass('ie')) {
          var _this = this;
          setTimeout(function() {
            $(_this).val('');
          }, 300);
        }
      }
    }
  }

  function onKeyup(e) {
    var type = this.getAttribute('type');
    var maxlength = this.getAttribute('maxlength');
    var char = String.fromCharCode(e.keyCode);
    var regExp;

    if (e.keyCode !== 8 && e.keyCode !== 13) {
      if (type === 'number') {
        regExp = new RegExp(numberPattern);

        if ($('html').hasClass('appleios') && this.value === '') {
          this.value = '';
        }
      }
    }
  }

  function onFocus(e) {
    $(this).addClass('acr-not-empty');
  }

  function onBlur(e) {
    if (this.value.length === 0) {
      $(this).removeClass('acr-not-empty');
    }
  }

  function ios() {
    if ($('html').hasClass('appleios')) {
      $('input[type=number]').attr('pattern', '[0-9]*');
    }
  }

  function firefox() {
    if ($('html').hasClass('firefox')) {
      setTimeout(checkEmpty, 100);
    }
  }

  function ie() {
    if ($('html').hasClass('ie')) {
      setTimeout(checkEmpty, 100);
    }
  }

  function checkEmpty() {
    $('.acr-error~input').trigger('focus');
    $('.acr-error~input').trigger('blur');
    $('html').scrollTop(0);
  }


  return {
    init: init,
    invalidValueText: invalidValueText,
    validateForm: validateForm,
    onKeypress: onKeypress,
    onKeyup: onKeyup,
    onFocus: onFocus,
    onBlur: onBlur
  };
})();

var Vlineup = (function() {
  'use strict';
  Utility.log('Vehicle-lineup component loaded');

  function init() {
    doSetEvents();
  }

  function doSetEvents() {
    Utility.log('doSetevents');

    var isTouchDevice;
    $('.tile a').hover(function() {
      isTouchDevice = ($(window).width() < 550) || isMobile();
      if (!isTouchDevice) {
        $(this).find('.normalcar').css('display', 'none');
        $(this).find('.overcar').css('display', 'block');

        $(this).find('span').css('display', 'block');
        $(this).parent().addClass('active').addClass('acr-shadow-6');
      }
    }, function() {
      isTouchDevice = ($(window).width() < 550) || isMobile();
      if (!isTouchDevice) {
        $(this).find('.normalcar').css('display', 'block');
        $(this).find('.overcar').css('display', 'none');

        $(this).find('span').css('display', 'none');
        $(this).parent().removeClass('active').removeClass('acr-shadow-6');
      }
    });
  }

  function isMobile() {
    try { document.createEvent('TouchEvent'); return true; }
    catch (e) { return false; }
  }

  return {
    init: init
  };
})();

var Main = (function() {
  console.log('Main.js loaded');
  var Acr = window.Acr = window.Acr || {};

  document.addEventListener('DOMContentLoaded', function(event) {
    Utility.log('DOMContentLoaded event fired fired fired');

    SlickOverride.init();

    Utility.enableActive();

    YouTubeManager.init();

    WayPoints.init();

    GlobalNav.init();

    BladePromoTiles1.init();

    MLPNav.init();

    Hero.init();

    ShopingTools.init();

    Promotions.init();

    Culture.init();

    //AR-4193 Converting hover animations to css only
    Vlineup.init();

    ResponsiveBackground.init();

    GlobalFooter.init();

    ModelSlider.init();

    Validation.init();

    Acr.threeSixty.init();

    MiniGallery.init();

    Gallery.init();

    PackagesSlider.init();

    Modals.init();

    FindADealer.init();	
	
    Accessories.init();

    Chart.init();

    FeatureModal.init();

    GalleryModal.init();

    Acr.boxParallax.init();

    SignUpForEmails.init();

    ButtonLine.init();

    MLPilxPackages.init();

    FSB.init();

    SubHeroPage.init();

    ImageChanger.init();

    Grid.init();

    GridVideo.init();

    MultiTabNavigation.init();

    Disclaimer.init();

    StyleGuide.init();

    MultiCol.init();
		
	//DealerLocator.init();
	
  });

  //Expose the following variables and functions
  return {
    //variables
    //state: state,
    //methods
    //init: init
  };
})();
