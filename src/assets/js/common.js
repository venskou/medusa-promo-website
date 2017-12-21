$(function () {

	//////////////////////////////////////////////////
    // Fixed Menu

    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 48) {
            $('.mdtc__global-nav').addClass('mdtc__global-nav--transformed')
        } else {
            $('.mdtc__global-nav').removeClass('mdtc__global-nav--transformed')
        }
    });

    //////////////////////////////////////////////////
    // Mobile Menu

    $('.mdtc__mobile-menu__hamburger').on('click', function() {
        $('.mdtc__mobile-menu').addClass('mdtc__mobile-menu--active');
    });

    $('.mdtc__mobile-menu__cross').on('click', function() {
        $('.mdtc__mobile-menu').removeClass('mdtc__mobile-menu--active');
    });

    $(document).mouseup(function (e){
        var mobileMenu = $('.mdtc__mobile-menu');
        if (!mobileMenu.is(e.target) && mobileMenu.has(e.target).length === 0) {
            mobileMenu.removeClass('mdtc__mobile-menu--active');
        }
    });

    $(function () {
        $('.block-title__inf').popover({
            trigger: 'hover'
        })
    });
});

//////////////////////////////////////////////////
// Header Menu

function globalNavDropdowns(e) {
    var t = this;
    this.container = document.querySelector(e),
    this.root = this.container.querySelector(".mdtc__nav-root"),
    this.primaryNav = this.root.querySelector(".mdtc__menu__list"),
    this.primaryNavItem = this.root.querySelector(".mdtc__menu__list .mdtc__menu__item:last-child"),
    this.container.classList.add("mdtc__global-nav--nodropdowntransition"),
    this.dropdownBackground = this.container.querySelector(".mdtc__menu__dropdown-background"),
    this.dropdownBackgroundAlt = this.container.querySelector(".mdtc__menu__alternate-background"),
    this.dropdownContainer = this.container.querySelector(".mdtc__menu__dropdown-container"),
    this.dropdownArrow = this.container.querySelector(".mdtc__menu__dropdown-arrow"),
    this.dropdownRoots = Strut.queryArray(".mdtc__menu__item--has-dropdown", this.root),
    this.dropdownSections = Strut.queryArray(".mdtc__menu__dropdown-section", this.container).map(function(e) {
        return {
            el: e,
            name: e.getAttribute("data-dropdown"),
            content: e.querySelector(".mdtc__menu__dropdown-content")
        }
    });

    var n = window.PointerEvent ? {
        end: "pointerup",
        enter: "pointerenter",
        leave: "pointerleave"
    } : {
        end: "touchend",
        enter: "mouseenter",
        leave: "mouseleave"
    };
    this.dropdownRoots.forEach(function(e, r) {
        e.addEventListener(n.end, function(n) {
            n.preventDefault(),
            n.stopPropagation(),
            t.toggleDropdown(e)
        }),
        e.addEventListener(n.enter, function(n) {
            if (n.pointerType == "touch")
                return;
            t.stopCloseTimeout(),
            t.openDropdown(e)
        }),
        e.addEventListener(n.leave, function(e) {
            if (e.pointerType == "touch")
                return;
            t.startCloseTimeout()
        })
    }),
    this.dropdownContainer.addEventListener(n.end, function(e) {
        e.stopPropagation()
    }),
    this.dropdownContainer.addEventListener(n.enter, function(e) {
        if (e.pointerType == "touch")
            return;
        t.stopCloseTimeout()
    }),
    this.dropdownContainer.addEventListener(n.leave, function(e) {
        if (e.pointerType == "touch")
            return;
        t.startCloseTimeout()
    })
}

var Strut = {
    random: function(e, t) {
        return Math.random() * (t - e) + e
    },
    arrayRandom: function(e) {
        return e[Math.floor(Math.random() * e.length)]
    },
    interpolate: function(e, t, n) {
        return e * (1 - n) + t * n
    },
    rangePosition: function(e, t, n) {
        return (n - e) / (t - e)
    },
    clamp: function(e, t, n) {
        return Math.max(Math.min(e, n), t)
    },
    queryArray: function(e, t) {
        return t || (t = document.body),
        Array.prototype.slice.call(t.querySelectorAll(e))
    },
    ready: function(e) {
        document.readyState !== "loading" ? e() : document.addEventListener("DOMContentLoaded", e)
    }
};

globalNavDropdowns.prototype.openDropdown = function(e) {
    var t = this;
    if (this.activeDropdown === e)
        return;
    this.container.classList.add("mdtc__global-nav--dropdown-active"),
    this.activeDropdown = e,
    this.dropdownRoots.forEach(function(e, t) {
        e.classList.remove("active")
    }),
    e.classList.add("active");
    var n = e.getAttribute("data-dropdown"), r = "left", i, s, o;
    this.dropdownSections.forEach(function(e) {
        e.el.classList.remove("active"),
        e.el.classList.remove("left"),
        e.el.classList.remove("right"),
        e.name == n ? (e.el.classList.add("active"),
            r = "right",
            i = e.content.offsetWidth,
            s = e.content.offsetHeight,
            e.content.getAttribute("data-fixed") ? e.content.setAttribute("data-fixed", !0) : (e.content.style.width = i + "px",
                e.content.style.height = s + "px"),
            o = e.content) : e.el.classList.add(r)
    });

    var u = 380
    , a = 400
    , f = i / u
    , l = s / a
    , c = e.getBoundingClientRect()
    , h = c.left + c.width / 2 - i / 2;
    h = Math.round(Math.max(h, 10)),
    clearTimeout(this.disableTransitionTimeout),
    this.enableTransitionTimeout = setTimeout(function() {
        t.container.classList.remove("mdtc__global-nav--nodropdowntransition")
    }, 50),
    this.dropdownBackground.style.transform = "translateX(" + h + "px) scaleX(" + f + ") scaleY(" + l + ")",
    this.dropdownContainer.style.transform = "translateX(" + h + "px)",
    this.dropdownContainer.style.width = i + "px",
    this.dropdownContainer.style.height = s + "px";
    var p = Math.round(c.left + c.width / 2);
    this.dropdownArrow.style.transform = "translateX(" + p + "px) rotate(45deg)";
    var d = o.children[0].offsetHeight / l;
    this.dropdownBackgroundAlt.style.transform = "translateY(" + d + "px)"
},

globalNavDropdowns.prototype.closeDropdown = function() {
    var e = this;
    if (!this.activeDropdown)
        return;
    this.dropdownRoots.forEach(function(e, t) {
        e.classList.remove("active")
    }),
    clearTimeout(this.enableTransitionTimeout),
    this.disableTransitionTimeout = setTimeout(function() {
        e.container.classList.add("mdtc__global-nav--nodropdowntransition")
    }, 50),
    this.container.classList.remove("mdtc__global-nav--dropdown-active"),
    this.activeDropdown = undefined
},

globalNavDropdowns.prototype.toggleDropdown = function(e) {
    this.activeDropdown === e ? this.closeDropdown() : this.openDropdown(e)
},

globalNavDropdowns.prototype.startCloseTimeout = function() {
    var e = this;
    e.closeDropdownTimeout = setTimeout(function() {
        e.closeDropdown()
    }, 50)
},

globalNavDropdowns.prototype.stopCloseTimeout = function() {
    var e = this;
    clearTimeout(e.closeDropdownTimeout)
},

Strut.ready(function() {
    new globalNavDropdowns(".mdtc__global-nav")
});


var duration = 3000;
var one_tenth_time = (duration / 100) / 10;

var columns = [
{
    height: 22.8,
    name: 'btg',
    percents: 280,
},
{
    height: 31.5,
    name: 'emc2',
    percents: 640,
},
{
    height: 64.4,
    name: 'powr',
    percents: 970,
},
{
    height: 53.9,
    name: 'iota',
    percents: 830,
},
{
    height: 44.4,
    name: 'xmr',
    percents: 720,
},
{
    height: 99.3,
    name: 'eos',
    percents: 1860,
},
{
    height: 60.0,
    name: 'neo',
    percents: 940,
},
{
    height: 31.4,
    name: 'nxt',
    percents: 670,
},
{
    height: 91.3,
    name: 'xpr',
    percents: 1460,
}
]

function startAnimation() {
    var maxColumnPercents = 0;
    for(var i = 0; i < columns.length; i++) {
        if(columns[i].percents > maxColumnPercents) {
            maxColumnPercents = columns[i].percents;
        }
    }
    console.log(maxColumnPercents);

    columns.forEach(function(column) {
        var columnElem = '.page-header__stats-item--' + column.name;
        var columnCssTop = 100 - column.height + '%'
        var columnDuration = (column.height / 0.1) * one_tenth_time;
        var columnTextOpacity = ((1 / maxColumnPercents) * column.percents).toFixed(1) + '';
        if(columnTextOpacity < 0.2) {
            columnTextOpacity = 0.2
        }
        console.log(columnTextOpacity)
        $(columnElem).velocity({
            top: columnCssTop,
            tween: column.percents
        }, {
            easing: 'ease-in-out',
            duration: columnDuration,
            progress: function(elements, complete, remaining, start, tweenValue) {
                var percents = $(columnElem + ' .page-header__stats-item-percents')
                .text('+' + Math.round(tweenValue) + '%');
                return percents;
            }
        });

        $(columnElem + ' .page-header__stats-item-name').velocity({
            opacity: columnTextOpacity
        }, {
            easing: 'easeInSine',
            duration: columnDuration,
            queue: false,
        });

        $(columnElem + ' .page-header__stats-item-percents').velocity({
            opacity: columnTextOpacity
        }, {
            easing: 'easeInSine',
            duration: columnDuration,
            queue: false,
        });
    });
};

$(document).ready(function() {
    startAnimation();

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('click')
  })
});
