$(function () {

  //////////////////////////////////////////////////
  // Fixed Menu

  // $(window).on('scroll', function() {
  //     var scrollTop = $(window).scrollTop();
  //     if (scrollTop > 48) {
  //         $('.mdtc__global-nav').addClass('mdtc__global-nav--transformed')
  //     } else {
  //         $('.mdtc__global-nav').removeClass('mdtc__global-nav--transformed')
  //     }
  // });

  //////////////////////////////////////////////////
  // Mobile Menu

  $('.mdtc__mobile-menu__hamburger').on('click', function () {
    $('.mdtc__mobile-menu').addClass('mdtc__mobile-menu--active')
  })

  $('.mdtc__mobile-menu__cross').on('click', function () {
    $('.mdtc__mobile-menu').removeClass('mdtc__mobile-menu--active')
  })

  $(document).mouseup(function (e) {
    var mobileMenu = $('.mdtc__mobile-menu')
    if (!mobileMenu.is(e.target) && mobileMenu.has(e.target).length === 0) {
      mobileMenu.removeClass('mdtc__mobile-menu--active')
    }
  })

  $(function () {
    $('.block-title__inf').popover({
      trigger: 'hover'
    })
  })
})

//////////////////////////////////////////////////
// Header Menu

function globalNavDropdowns (e) {
  var t = this
  this.container = document.querySelector(e),
  this.root = this.container.querySelector('.mdtc__nav-root'),
  this.primaryNav = this.root.querySelector('.mdtc__menu__list'),
  this.primaryNavItem = this.root.querySelector('.mdtc__menu__list .mdtc__menu__item:last-child'),
  this.container.classList.add('mdtc__global-nav--nodropdowntransition'),
  this.dropdownBackground = this.container.querySelector('.mdtc__menu__dropdown-background'),
  this.dropdownBackgroundAlt = this.container.querySelector('.mdtc__menu__alternate-background'),
  this.dropdownContainer = this.container.querySelector('.mdtc__menu__dropdown-container'),
  this.dropdownArrow = this.container.querySelector('.mdtc__menu__dropdown-arrow'),
  this.dropdownRoots = Strut.queryArray('.mdtc__menu__item--has-dropdown', this.root),
  this.dropdownSections = Strut.queryArray('.mdtc__menu__dropdown-section', this.container).map(function (e) {
    return {
      el: e,
      name: e.getAttribute('data-dropdown'),
      content: e.querySelector('.mdtc__menu__dropdown-content')
    }
  })

  var n = window.PointerEvent ? {
    end: 'pointerup',
    enter: 'pointerenter',
    leave: 'pointerleave'
  } : {
    end: 'touchend',
    enter: 'mouseenter',
    leave: 'mouseleave'
  }
  this.dropdownRoots.forEach(function (e, r) {
    e.addEventListener(n.end, function (n) {
      n.preventDefault(),
      n.stopPropagation(),
      t.toggleDropdown(e)
    }),
    e.addEventListener(n.enter, function (n) {
      if (n.pointerType == 'touch')
        return
      t.stopCloseTimeout(),
      t.openDropdown(e)
    }),
    e.addEventListener(n.leave, function (e) {
      if (e.pointerType == 'touch')
        return
      t.startCloseTimeout()
    })
  }),
  this.dropdownContainer.addEventListener(n.end, function (e) {
    e.stopPropagation()
  }),
  this.dropdownContainer.addEventListener(n.enter, function (e) {
    if (e.pointerType == 'touch')
      return
    t.stopCloseTimeout()
  }),
  this.dropdownContainer.addEventListener(n.leave, function (e) {
    if (e.pointerType == 'touch')
      return
    t.startCloseTimeout()
  })
}

var Strut = {
  random: function (e, t) {
    return Math.random() * (t - e) + e
  },
  arrayRandom: function (e) {
    return e[Math.floor(Math.random() * e.length)]
  },
  interpolate: function (e, t, n) {
    return e * (1 - n) + t * n
  },
  rangePosition: function (e, t, n) {
    return (n - e) / (t - e)
  },
  clamp: function (e, t, n) {
    return Math.max(Math.min(e, n), t)
  },
  queryArray: function (e, t) {
    return t || (t = document.body),
    Array.prototype.slice.call(t.querySelectorAll(e))
  },
  ready: function (e) {
    document.readyState !== 'loading' ? e() : document.addEventListener('DOMContentLoaded', e)
  }
}

globalNavDropdowns.prototype.openDropdown = function (e) {
  var t = this
  if (this.activeDropdown === e)
    return
  this.container.classList.add('mdtc__global-nav--dropdown-active'),
  this.activeDropdown = e,
  this.dropdownRoots.forEach(function (e, t) {
    e.classList.remove('active')
  }),
  e.classList.add('active')
  var n = e.getAttribute('data-dropdown'), r = 'left', i, s, o
  this.dropdownSections.forEach(function (e) {
    e.el.classList.remove('active'),
    e.el.classList.remove('left'),
    e.el.classList.remove('right'),
    e.name == n ? (e.el.classList.add('active'),
      r = 'right',
      i = e.content.offsetWidth,
      s = e.content.offsetHeight,
      e.content.getAttribute('data-fixed') ? e.content.setAttribute('data-fixed', !0) : (e.content.style.width = i + 'px',
        e.content.style.height = s + 'px'),
      o = e.content) : e.el.classList.add(r)
  })

  var u = 380
  , a = 400
  , f = i / u
  , l = s / a
  , c = e.getBoundingClientRect()
  , h = c.left + c.width / 2 - i / 2
  h = Math.round(Math.max(h, 10)),
  clearTimeout(this.disableTransitionTimeout),
  this.enableTransitionTimeout = setTimeout(function () {
    t.container.classList.remove('mdtc__global-nav--nodropdowntransition')
  }, 50),
  this.dropdownBackground.style.transform = 'translateX(' + h + 'px) scaleX(' + f + ') scaleY(' + l + ')',
  this.dropdownContainer.style.transform = 'translateX(' + h + 'px)',
  this.dropdownContainer.style.width = i + 'px',
  this.dropdownContainer.style.height = s + 'px'
  var p = Math.round(c.left + c.width / 2)
  this.dropdownArrow.style.transform = 'translateX(' + p + 'px) rotate(45deg)'
  var d = o.children[0].offsetHeight / l
  this.dropdownBackgroundAlt.style.transform = 'translateY(' + d + 'px)'
},

globalNavDropdowns.prototype.closeDropdown = function () {
  var e = this
  if (!this.activeDropdown)
    return
  this.dropdownRoots.forEach(function (e, t) {
    e.classList.remove('active')
  }),
  clearTimeout(this.enableTransitionTimeout),
  this.disableTransitionTimeout = setTimeout(function () {
    e.container.classList.add('mdtc__global-nav--nodropdowntransition')
  }, 50),
  this.container.classList.remove('mdtc__global-nav--dropdown-active'),
  this.activeDropdown = undefined
},

globalNavDropdowns.prototype.toggleDropdown = function (e) {
  this.activeDropdown === e ? this.closeDropdown() : this.openDropdown(e)
},

globalNavDropdowns.prototype.startCloseTimeout = function () {
  var e = this
  e.closeDropdownTimeout = setTimeout(function () {
    e.closeDropdown()
  }, 50)
},

globalNavDropdowns.prototype.stopCloseTimeout = function () {
  var e = this
  clearTimeout(e.closeDropdownTimeout)
},

Strut.ready(function () {
  new globalNavDropdowns('.mdtc__global-nav')
})

var spikes = [
{
  height: 32.8,
  name: 'btg',
  percents: 280
},
{
  height: 41.5,
  name: 'emc2',
  percents: 640
},
{
  height: 69.4,
  name: 'powr',
  percents: 970
},
{
  height: 61.9,
  name: 'iota',
  percents: 830
},
{
  height: 55.4,
  name: 'xmr',
  percents: 720
},
{
  height: 99.3,
  name: 'eos',
  percents: 1860
},
{
  height: 70.0,
  name: 'neo',
  percents: 940
},
{
  height: 51.4,
  name: 'nxt',
  percents: 670
},
{
  height: 91.3,
  name: 'xpr',
  percents: 1460
}
]

$(document).ready(function () {

  function getRandomArbitrary (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  (function generateSpikes () {
    spikes.forEach(function (item, index) {
      var element = '<span class="pageHeader__statsItem pageHeader__statsItem--' + item.name + ' index-' + index + '"><span class="pageHeader__statsItemName">' + item.name + '</span><span class="pageHeader__statsItemPercents"></span></span>'
      $(element).appendTo('.pageHeader__stats')
    })
  })();

  (function animateSpikes () {
    var indexBuffer = []
    setInterval(function() {
      var spikeIndex = getRandomArbitrary(0, spikes.length)
      var spike = spikes[spikeIndex]
      var element = $('.pageHeader__statsItem.index-' + spikeIndex)
      var percents = $('.pageHeader__statsItem.index-' + spikeIndex + ' .pageHeader__statsItemPercents')
      if (indexBuffer.indexOf(spikeIndex) >= 0) {
        return;
      }
      indexBuffer.push(spikeIndex)
      element.velocity({
        top: 100 - spike.height + '%',
        tween: spike.percents
      }, {
        easing: 'ease-in-out',
        duration: 1500,
        progress: function (elements, complete, remaining, start, tweenValue) {
          percents.text('+' + Math.round(tweenValue) + '%')
        },
        complete: function () {
          indexBuffer = indexBuffer.splice(indexBuffer.indexOf(spikeIndex), 1)
          setTimeout(function() {
            element.css({top: '100%'})
          }, 2000)
        }
      })
    }, 750)
  })()

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('click')
  });

  $('.features__item').map(function (index, element) {
    var item = element
    var itemDistance = $(item).offset().top
    var viewportHeight = $(window).height()
    var startAnimationPoint = itemDistance - viewportHeight / 2
    $(window).resize(function () {
      itemDistance = $(item).offset().top
      viewportHeight = $(window).height()
      startAnimationPoint = itemDistance - viewportHeight / 2
    })
    $(window).scroll(function () {
      var docScroll = $(window).scrollTop()
      if (docScroll > startAnimationPoint) {
        $(item).addClass('animate')
      }
    })
  });

  $('.roadmap__item').map(function (index, element) {
    var item = element
    var itemDistance = $(item).offset().top
    var viewportHeight = $(window).height()
    var startAnimationPoint = itemDistance - viewportHeight / 2
    $(window).resize(function () {
      itemDistance = $(item).offset().top
      viewportHeight = $(window).height()
      startAnimationPoint = itemDistance - viewportHeight / 2
    })

    $(window).scroll(function () {
      var docScroll = $(window).scrollTop()

      if (docScroll > startAnimationPoint) {
        $(item).addClass('animate')
      }
    })
  });

  $('#smartwizard').smartWizard({
    theme: 'arrows',
    useURLhash: false,
    showStepURLhash: false,
    transitionEffect: 'fade', // Effect on navigation, none/slide/fade
    transitionSpeed: '300',
    autoAdjustHeight: true,
  });



  $('.sw-btn-next').text('Continue');

  var deadline = 'Jul 25 2019 18:40:18 GMT-0400';

  function time_remaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
  };

  function run_clock(id,endtime) {
    var clock = document.getElementById(id);
    var days_span = clock.querySelector('.counter__valueText--days');
    var hours_span = clock.querySelector('.counter__valueText--hours');
    var minutes_span = clock.querySelector('.counter__valueText--minutes');
    var seconds_span = clock.querySelector('.counter__valueText--seconds');

    function update_clock() {
      var t = time_remaining(endtime);
      days_span.innerHTML = t.days;
      hours_span.innerHTML = ('0' + t.hours).slice(-2);
      minutes_span.innerHTML = ('0' + t.minutes).slice(-2);
      seconds_span.innerHTML = ('0' + t.seconds).slice(-2);
      if(t.total<=0){ clearInterval(timeinterval); }
    };

    update_clock();
    var timeinterval = setInterval(update_clock,1000);
  };

  run_clock('counter',deadline);

  $(window).resize(function() {
    $('.registration__stepContentWrapper').each(function(i) {
      var elem = $('.registration__stepContentWrapper').eq(i);
      if( $(elem).is(':visible') ) {
        var elemHeight = $(elem).innerHeight();
        $('.registration__stepsData').height(elemHeight);
      }
    });
  });

  $('[data-toggle="datepicker"]').datepicker({
    autoHide: true,
    weekStart: 1
  });
})