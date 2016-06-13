

/*!
 * VERSION: 1.7.6
 * DATE: 2015-12-10
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var a = document.documentElement,
        b = window,
        c = function(c, d) {
            var e = "x" === d ? "Width" : "Height",
                f = "scroll" + e,
                g = "client" + e,
                h = document.body;
            return c === b || c === a || c === h ? Math.max(a[f], h[f]) - (b["inner" + e] || a[g] || h[g]) : c[f] - c["offset" + e]
        },
        d = _gsScope._gsDefine.plugin({
            propName: "scrollTo",
            API: 2,
            version: "1.7.6",
            init: function(a, d, e) {
                return this._wdw = a === b, this._target = a, this._tween = e, "object" != typeof d && (d = {
                    y: d
                }), this.vars = d, this._autoKill = d.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != d.x ? (this._addTween(this, "x", this.x, "max" === d.x ? c(a, "x") : d.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != d.y ? (this._addTween(this, "y", this.y, "max" === d.y ? c(a, "y") : d.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
            },
            set: function(a) {
                this._super.setRatio.call(this, a);
                var d = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                    e = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                    f = e - this.yPrev,
                    g = d - this.xPrev;
                this.x < 0 && (this.x = 0), this.y < 0 && (this.y = 0), this._autoKill && (!this.skipX && (g > 7 || -7 > g) && d < c(this._target, "x") && (this.skipX = !0), !this.skipY && (f > 7 || -7 > f) && e < c(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? b.scrollTo(this.skipX ? d : this.x, this.skipY ? e : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
            }
        }),
        e = d.prototype;
    d.max = c, e.getX = function() {
        return this._wdw ? null != b.pageXOffset ? b.pageXOffset : null != a.scrollLeft ? a.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
    }, e.getY = function() {
        return this._wdw ? null != b.pageYOffset ? b.pageYOffset : null != a.scrollTop ? a.scrollTop : document.body.scrollTop : this._target.scrollTop
    }, e._kill = function(a) {
        return a.scrollTo_x && (this.skipX = !0), a.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, a)
    }
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();
/*!
 * VERSION: 1.18.3
 * DATE: 2016-04-19
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
                var d = function(a) {
                        var b, c = [],
                            d = a.length;
                        for (b = 0; b !== d; c.push(a[b++]));
                        return c
                    },
                    e = function(a, b, c) {
                        var d, e, f = a.cycle;
                        for (d in f) e = f[d], a[d] = "function" == typeof e ? e.call(b[c], c) : e[c % e.length];
                        delete a.cycle
                    },
                    f = function(a, b, d) {
                        c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = f.prototype.render
                    },
                    g = 1e-10,
                    h = c._internals,
                    i = h.isSelector,
                    j = h.isArray,
                    k = f.prototype = c.to({}, .1, {}),
                    l = [];
                f.version = "1.18.3", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), c.prototype.invalidate.call(this)
                }, k.updateTo = function(a, b) {
                    var d, e = this.ratio,
                        f = this.vars.immediateRender || a.immediateRender;
                    b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (d in a) this.vars[d] = a[d];
                    if (this._initted || f)
                        if (b) this._initted = !1, f && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var g = this._totalTime;
                        this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
                    } else if (this._initted = !1, this._init(), this._time > 0 || f)
                        for (var h, i = 1 / (1 - e), j = this._firstPT; j;) h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next;
                    return this
                }, k.render = function(a, b, c) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var d, e, f, i, j, k, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
                        o = this._time,
                        p = this._totalTime,
                        q = this._cycle,
                        r = this._duration,
                        s = this._rawPrevTime;
                    if (a >= n - 1e-7 ? (this._totalTime = n, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = r, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === r && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > s || 0 >= a && a >= -1e-7 || s === g && "isPause" !== this.data) && s !== a && (c = !0, s > g && (e = "onReverseComplete")), this._rawPrevTime = m = !b || a || s === a ? a : g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== p || 0 === r && s > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === r && (this._initted || !this.vars.lazy || c) && (s >= 0 && (c = !0), this._rawPrevTime = m = !b || a || s === a ? a : g)), this._initted || (c = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (i = r + this._repeatDelay, this._cycle = this._totalTime / i >> 0, 0 !== this._cycle && this._cycle === this._totalTime / i && a >= p && this._cycle--, this._time = this._totalTime - this._cycle * i, this._yoyo && 0 !== (1 & this._cycle) && (this._time = r - this._time), this._time > r ? this._time = r : this._time < 0 && (this._time = 0)), this._easeType ? (j = this._time / r, k = this._easeType, l = this._easePower, (1 === k || 3 === k && j >= .5) && (j = 1 - j), 3 === k && (j *= 2), 1 === l ? j *= j : 2 === l ? j *= j * j : 3 === l ? j *= j * j * j : 4 === l && (j *= j * j * j * j), 1 === k ? this.ratio = 1 - j : 2 === k ? this.ratio = j : this._time / r < .5 ? this.ratio = j / 2 : this.ratio = 1 - j / 2) : this.ratio = this._ease.getRatio(this._time / r)), o === this._time && !c && q === this._cycle) return void(p !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = o, this._totalTime = p, this._rawPrevTime = s, this._cycle = q, h.lazyTweens.push(this), void(this._lazy = [a, b]);
                        this._time && !d ? this.ratio = this._ease.getRatio(this._time / r) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && a >= 0 && (this._active = !0), 0 === p && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === r) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                    this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, c), b || (this._totalTime !== p || e) && this._callback("onUpdate")), this._cycle !== q && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === r && this._rawPrevTime === g && m !== g && (this._rawPrevTime = 0))
                }, f.to = function(a, b, c) {
                    return new f(a, b, c)
                }, f.from = function(a, b, c) {
                    return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c)
                }, f.fromTo = function(a, b, c, d) {
                    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d)
                }, f.staggerTo = f.allTo = function(a, b, g, h, k, m, n) {
                    h = h || 0;
                    var o, p, q, r, s = 0,
                        t = [],
                        u = function() {
                            g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l)
                        },
                        v = g.cycle,
                        w = g.startAt && g.startAt.cycle;
                    for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >= q; q++) {
                        p = {};
                        for (r in g) p[r] = g[r];
                        if (v && e(p, a, q), w) {
                            w = p.startAt = {};
                            for (r in g.startAt) w[r] = g.startAt[r];
                            e(p.startAt, a, q)
                        }
                        p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q], b, p), s += h
                    }
                    return t
                }, f.staggerFrom = f.allFrom = function(a, b, c, d, e, g, h) {
                    return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h)
                }, f.staggerFromTo = f.allFromTo = function(a, b, c, d, e, g, h, i) {
                    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i)
                }, f.delayedCall = function(a, b, c, d, e) {
                    return new f(b, 0, {
                        delay: a,
                        onComplete: b,
                        onCompleteParams: c,
                        callbackScope: d,
                        onReverseComplete: b,
                        onReverseCompleteParams: c,
                        immediateRender: !1,
                        useFrames: e,
                        overwrite: 0
                    })
                }, f.set = function(a, b) {
                    return new f(a, 0, b)
                }, f.isTweening = function(a) {
                    return c.getTweensOf(a, !0).length > 0
                };
                var m = function(a, b) {
                        for (var d = [], e = 0, f = a._first; f;) f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next;
                        return d
                    },
                    n = f.getAllTweens = function(b) {
                        return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b))
                    };
                f.killAll = function(a, c, d, e) {
                    null == c && (c = !0), null == d && (d = !0);
                    var f, g, h, i = n(0 != e),
                        j = i.length,
                        k = c && d && e;
                    for (h = 0; j > h; h++) g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
                }, f.killChildTweensOf = function(a, b) {
                    if (null != a) {
                        var e, g, k, l, m, n = h.tweenLookup;
                        if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a))
                            for (l = a.length; --l > -1;) f.killChildTweensOf(a[l], b);
                        else {
                            e = [];
                            for (k in n)
                                for (g = n[k].target.parentNode; g;) g === a && (e = e.concat(n[k].tweens)), g = g.parentNode;
                            for (m = e.length, l = 0; m > l; l++) b && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1)
                        }
                    }
                };
                var o = function(a, c, d, e) {
                    c = c !== !1, d = d !== !1, e = e !== !1;
                    for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;) g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
                };
                return f.pauseAll = function(a, b, c) {
                    o(!0, a, b, c)
                }, f.resumeAll = function(a, b, c) {
                    o(!1, a, b, c)
                }, f.globalTimeScale = function(b) {
                    var d = a._rootTimeline,
                        e = c.ticker.time;
                    return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
                }, k.progress = function(a, b) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
                }, k.totalProgress = function(a, b) {
                    return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
                }, k.time = function(a, b) {
                    return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
                }, k.duration = function(b) {
                    return arguments.length ? a.prototype.duration.call(this, b) : this._duration
                }, k.totalDuration = function(a) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, k.repeat = function(a) {
                    return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
                }, k.repeatDelay = function(a) {
                    return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
                }, k.yoyo = function(a) {
                    return arguments.length ? (this._yoyo = a, this) : this._yoyo
                }, f
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
                var d = function(a) {
                        b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var c, d, e = this.vars;
                        for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
                        i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
                    },
                    e = 1e-10,
                    f = c._internals,
                    g = d._internals = {},
                    h = f.isSelector,
                    i = f.isArray,
                    j = f.lazyTweens,
                    k = f.lazyRender,
                    l = _gsScope._gsDefine.globals,
                    m = function(a) {
                        var b, c = {};
                        for (b in a) c[b] = a[b];
                        return c
                    },
                    n = function(a, b, c) {
                        var d, e, f = a.cycle;
                        for (d in f) e = f[d], a[d] = "function" == typeof e ? e.call(b[c], c) : e[c % e.length];
                        delete a.cycle
                    },
                    o = g.pauseCallback = function() {},
                    p = function(a) {
                        var b, c = [],
                            d = a.length;
                        for (b = 0; b !== d; c.push(a[b++]));
                        return c
                    },
                    q = d.prototype = new b;
                return d.version = "1.18.3", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function(a, b, d, e) {
                    var f = d.repeat && l.TweenMax || c;
                    return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
                }, q.from = function(a, b, d, e) {
                    return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e)
                }, q.fromTo = function(a, b, d, e, f) {
                    var g = e.repeat && l.TweenMax || c;
                    return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
                }, q.staggerTo = function(a, b, e, f, g, i, j, k) {
                    var l, o, q = new d({
                            onComplete: i,
                            onCompleteParams: j,
                            callbackScope: k,
                            smoothChildTiming: this.smoothChildTiming
                        }),
                        r = e.cycle;
                    for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++) l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && n(l, a, o), q.to(a[o], b, l, o * f);
                    return this.add(q, g)
                }, q.staggerFrom = function(a, b, c, d, e, f, g, h) {
                    return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
                }, q.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
                    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
                }, q.call = function(a, b, d, e) {
                    return this.add(c.delayedCall(0, a, b, d), e)
                }, q.set = function(a, b, d) {
                    return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
                }, d.exportRoot = function(a, b) {
                    a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
                    var e, f, g = new d(a),
                        h = g._timeline;
                    for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g._time = g._totalTime = h._time, e = h._first; e;) f = e._next, b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay), e = f;
                    return h.add(g, 0), g
                }, q.add = function(e, f, g, h) {
                    var j, k, l, m, n, o;
                    if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
                        if (e instanceof Array || e && e.push && i(e)) {
                            for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) i(m = e[l]) && (m = new d({
                                tweens: m
                            })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof e) return this.addLabel(e, f);
                        if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                        e = c.delayedCall(0, e)
                    }
                    if (b.prototype.add.call(this, e, f), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
                    return this
                }, q.remove = function(b) {
                    if (b instanceof a) {
                        this._remove(b, !1);
                        var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
                        return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
                    }
                    if (b instanceof Array || b && b.push && i(b)) {
                        for (var d = b.length; --d > -1;) this.remove(b[d]);
                        return this
                    }
                    return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
                }, q._remove = function(a, c) {
                    b.prototype._remove.call(this, a, c);
                    var d = this._last;
                    return d ? this._time > d._startTime + d._totalDuration / d._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, q.append = function(a, b) {
                    return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
                }, q.insert = q.insertMultiple = function(a, b, c, d) {
                    return this.add(a, b || 0, c, d)
                }, q.appendMultiple = function(a, b, c, d) {
                    return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
                }, q.addLabel = function(a, b) {
                    return this._labels[a] = this._parseTimeOrLabel(b), this
                }, q.addPause = function(a, b, d, e) {
                    var f = c.delayedCall(0, o, d, e || this);
                    return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
                }, q.removeLabel = function(a) {
                    return delete this._labels[a], this
                }, q.getLabelTime = function(a) {
                    return null != this._labels[a] ? this._labels[a] : -1
                }, q._parseTimeOrLabel = function(b, c, d, e) {
                    var f;
                    if (e instanceof a && e.timeline === this) this.remove(e);
                    else if (e && (e instanceof Array || e.push && i(e)))
                        for (f = e.length; --f > -1;) e[f] instanceof a && e[f].timeline === this && this.remove(e[f]);
                    if ("string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
                    if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = this.duration());
                    else {
                        if (f = b.indexOf("="), -1 === f) return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
                        c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)), b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
                    }
                    return Number(b) + c
                }, q.seek = function(a, b) {
                    return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
                }, q.stop = function() {
                    return this.paused(!0)
                }, q.gotoAndPlay = function(a, b) {
                    return this.play(a, b)
                }, q.gotoAndStop = function(a, b) {
                    return this.pause(a, b)
                }, q.render = function(a, b, c) {
                    this._gc && this._enabled(!0, !1);
                    var d, f, g, h, i, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
                        o = this._time,
                        p = this._startTime,
                        q = this._timeScale,
                        r = this._paused;
                    if (a >= n - 1e-7) this._totalTime = this._time = n, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = n + 1e-4;
                    else if (1e-7 > a)
                        if (this._totalTime = this._time = 0, (0 !== o || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a;
                        else {
                            if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
                                for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
                            a = 0, this._initted || (i = !0)
                        } else {
                        if (this._hasPause && !this._forcingPlayhead && !b) {
                            if (a >= o)
                                for (d = this._first; d && d._startTime <= a && !l;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next;
                            else
                                for (d = this._last; d && d._startTime >= a && !l;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
                            l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = a
                    }
                    if (this._time !== o && this._first || c || i || l) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== o && a > 0 && (this._active = !0), 0 === o && this.vars.onStart && 0 !== this._time && (b || this._callback("onStart")), m = this._time, m >= o)
                            for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r));)(d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
                        else
                            for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r));) {
                                if (d._active || d._startTime <= o && !d._paused && !d._gc) {
                                    if (l === d) {
                                        for (l = d._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev;
                                        l = null, this.pause()
                                    }
                                    d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                                }
                                d = g
                            }
                        this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || n >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h)))
                    }
                }, q._hasPausedChild = function() {
                    for (var a = this._first; a;) {
                        if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
                        a = a._next
                    }
                    return !1
                }, q.getChildren = function(a, b, d, e) {
                    e = e || -9999999999;
                    for (var f = [], g = this._first, h = 0; g;) g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
                    return f
                }, q.getTweensOf = function(a, b) {
                    var d, e, f = this._gc,
                        g = [],
                        h = 0;
                    for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)(d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
                    return f && this._enabled(!1, !0), g
                }, q.recent = function() {
                    return this._recent
                }, q._contains = function(a) {
                    for (var b = a.timeline; b;) {
                        if (b === this) return !0;
                        b = b.timeline
                    }
                    return !1
                }, q.shiftChildren = function(a, b, c) {
                    c = c || 0;
                    for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime += a), e = e._next;
                    if (b)
                        for (d in f) f[d] >= c && (f[d] += a);
                    return this._uncache(!0)
                }, q._kill = function(a, b) {
                    if (!a && !b) return this._enabled(!1, !1);
                    for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
                    return e
                }, q.clear = function(a) {
                    var b = this.getChildren(!1, !0, !0),
                        c = b.length;
                    for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
                    return a !== !1 && (this._labels = {}), this._uncache(!0)
                }, q.invalidate = function() {
                    for (var b = this._first; b;) b.invalidate(), b = b._next;
                    return a.prototype.invalidate.call(this)
                }, q._enabled = function(a, c) {
                    if (a === this._gc)
                        for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
                    return b.prototype._enabled.call(this, a, c)
                }, q.totalTime = function(b, c, d) {
                    this._forcingPlayhead = !0;
                    var e = a.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, e
                }, q.duration = function(a) {
                    return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
                }, q.totalDuration = function(a) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
                            this._duration = this._totalDuration = d, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
                }, q.paused = function(b) {
                    if (!b)
                        for (var c = this._first, d = this._time; c;) c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
                    return a.prototype.paused.apply(this, arguments)
                }, q.usesFrames = function() {
                    for (var b = this._timeline; b._timeline;) b = b._timeline;
                    return b === a._rootFramesTimeline
                }, q.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, d
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(a, b, c) {
                var d = function(b) {
                        a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    e = 1e-10,
                    f = b._internals,
                    g = f.lazyTweens,
                    h = f.lazyRender,
                    i = new c(null, null, 1, 0),
                    j = d.prototype = new a;
                return j.constructor = d, j.kill()._gc = !1, d.version = "1.18.3", j.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
                }, j.addCallback = function(a, c, d, e) {
                    return this.add(b.delayedCall(0, a, d, e), c)
                }, j.removeCallback = function(a, b) {
                    if (a)
                        if (null == b) this._kill(null, a);
                        else
                            for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;) c[d]._startTime === e && c[d]._enabled(!1, !1);
                    return this
                }, j.removePause = function(b) {
                    return this.removeCallback(a._internals.pauseCallback, b)
                }, j.tweenTo = function(a, c) {
                    c = c || {};
                    var d, e, f, g = {
                        ease: i,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (e in c) g[e] = c[e];
                    return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new b(this, d, g), g.onStart = function() {
                        f.target.paused(!0), f.vars.time !== f.target.time() && d === f.duration() && f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale), c.onStart && f._callback("onStart")
                    }, f
                }, j.tweenFromTo = function(a, b, c) {
                    c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [a],
                        callbackScope: this
                    }, c.immediateRender = c.immediateRender !== !1;
                    var d = this.tweenTo(b, c);
                    return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
                }, j.render = function(a, b, c) {
                    this._gc && this._enabled(!0, !1);
                    var d, f, i, j, k, l, m, n, o = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._duration,
                        q = this._time,
                        r = this._totalTime,
                        s = this._startTime,
                        t = this._timeScale,
                        u = this._rawPrevTime,
                        v = this._paused,
                        w = this._cycle;
                    if (a >= o - 1e-7) this._locked || (this._totalTime = o, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (f = !0, j = "onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = p, a = p + 1e-4);
                    else if (1e-7 > a)
                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== q || 0 === p && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j = "onReverseComplete") : u >= 0 && this._first && (k = !0), this._rawPrevTime = a;
                        else {
                            if (this._rawPrevTime = p || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
                                for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
                            a = 0, this._initted || (k = !0)
                        } else if (0 === p && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (l = p + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, a = p + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b) {
                        if (a = this._time, a >= q)
                            for (d = this._first; d && d._startTime <= a && !m;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (m = d), d = d._next;
                        else
                            for (d = this._last; d && d._startTime >= a && !m;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d), d = d._prev;
                        m && (this._time = a = m._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== w && !this._locked) {
                        var x = this._yoyo && 0 !== (1 & w),
                            y = x === (this._yoyo && 0 !== (1 & this._cycle)),
                            z = this._totalTime,
                            A = this._cycle,
                            B = this._rawPrevTime,
                            C = this._time;
                        if (this._totalTime = w * p, this._cycle < w ? x = !x : this._totalTime += p, this._time = q, this._rawPrevTime = 0 === p ? u - 1e-4 : u, this._cycle = w, this._locked = !0, q = x ? 0 : p, this.render(q, b, 0 === p), b || this._gc || this.vars.onRepeat && this._callback("onRepeat"), q !== this._time) return;
                        if (y && (q = x ? p + 1e-4 : -1e-4, this.render(q, !0, !1)), this._locked = !1, this._paused && !v) return;
                        this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B
                    }
                    if (!(this._time !== q && this._first || c || k || m)) return void(r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && 0 !== this._totalTime && (b || this._callback("onStart")), n = this._time, n >= q)
                        for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = i;
                    else
                        for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused || v));) {
                            if (d._active || d._startTime <= q && !d._paused && !d._gc) {
                                if (m === d) {
                                    for (m = d._prev; m && m.endTime() > this._time;) m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c), m = m._prev;
                                    m = null, this.pause()
                                }
                                d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                            }
                            d = i
                        }
                    this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (0 === this._time || o >= this.totalDuration()) && (f && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[j] && this._callback(j)))
                }, j.getActive = function(a, b, c) {
                    null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
                    var d, e, f = [],
                        g = this.getChildren(a, b, c),
                        h = 0,
                        i = g.length;
                    for (d = 0; i > d; d++) e = g[d], e.isActive() && (f[h++] = e);
                    return f
                }, j.getLabelAfter = function(a) {
                    a || 0 !== a && (a = this._time);
                    var b, c = this.getLabelsArray(),
                        d = c.length;
                    for (b = 0; d > b; b++)
                        if (c[b].time > a) return c[b].name;
                    return null
                }, j.getLabelBefore = function(a) {
                    null == a && (a = this._time);
                    for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
                        if (b[c].time < a) return b[c].name;
                    return null
                }, j.getLabelsArray = function() {
                    var a, b = [],
                        c = 0;
                    for (a in this._labels) b[c++] = {
                        time: this._labels[a],
                        name: a
                    };
                    return b.sort(function(a, b) {
                        return a.time - b.time
                    }), b
                }, j.progress = function(a, b) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
                }, j.totalProgress = function(a, b) {
                    return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
                }, j.totalDuration = function(b) {
                    return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, j.time = function(a, b) {
                    return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
                }, j.repeat = function(a) {
                    return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
                }, j.repeatDelay = function(a) {
                    return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
                }, j.yoyo = function(a) {
                    return arguments.length ? (this._yoyo = a, this) : this._yoyo
                }, j.currentLabel = function(a) {
                    return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
                }, d
            }, !0),
            function() {
                var a = 180 / Math.PI,
                    b = [],
                    c = [],
                    d = [],
                    e = {},
                    f = _gsScope._gsDefine.globals,
                    g = function(a, b, c, d) {
                        this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
                    },
                    h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    i = function(a, b, c, d) {
                        var e = {
                                a: a
                            },
                            f = {},
                            g = {},
                            h = {
                                c: d
                            },
                            i = (a + b) / 2,
                            j = (b + c) / 2,
                            k = (c + d) / 2,
                            l = (i + j) / 2,
                            m = (j + k) / 2,
                            n = (m - l) / 8;
                        return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
                    },
                    j = function(a, e, f, g, h) {
                        var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1,
                            x = 0,
                            y = a[0].a;
                        for (j = 0; w > j; j++) n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
                        n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
                    },
                    k = function(a, d, e, f) {
                        var h, i, j, k, l, m, n = [];
                        if (f)
                            for (a = [f].concat(a), i = a.length; --i > -1;) "string" == typeof(m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
                        if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[-1 > h ? 0 : 1][d]), n;
                        for (i = 0; h > i; i++) j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
                        return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
                    },
                    l = function(a, f, g, i, l, m) {
                        var n, o, p, q, r, s, t, u, v = {},
                            w = [],
                            x = m || a[0];
                        l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
                        for (o in a[0]) w.push(o);
                        if (a.length > 1) {
                            for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)
                                if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
                                    t = !1;
                                    break
                                }
                            t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
                        }
                        for (b.length = c.length = d.length = 0, n = w.length; --n > -1;) o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
                        for (n = b.length; --n > -1;) b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
                        if (!i) {
                            for (n = w.length; --n > -1;)
                                if (e[o])
                                    for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++) r = p[q + 1].da / c[q] + p[q].da / b[q] || 0, d[q] = (d[q] || 0) + r * r;
                            for (n = d.length; --n > -1;) d[n] = Math.sqrt(d[n])
                        }
                        for (n = w.length, q = g ? 4 : 1; --n > -1;) o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q));
                        return v
                    },
                    m = function(a, b, c) {
                        b = b || "soft";
                        var d, e, f, h, i, j, k, l, m, n, o, p = {},
                            q = "cubic" === b ? 3 : 2,
                            r = "soft" === b,
                            s = [];
                        if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1) throw "invalid Bezier data";
                        for (m in a[0]) s.push(m);
                        for (j = s.length; --j > -1;) {
                            for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++) d = null == c ? a[k][m] : "string" == typeof(o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d;
                            for (l = n - q + 1, n = 0, k = 0; l > k; k += q) d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
                            i.length = n
                        }
                        return p
                    },
                    n = function(a, b, c) {
                        for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)
                            for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++) j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d
                    },
                    o = function(a, b) {
                        b = b >> 0 || 6;
                        var c, d, e, f, g = [],
                            h = [],
                            i = 0,
                            j = 0,
                            k = b - 1,
                            l = [],
                            m = [];
                        for (c in a) n(a[c], g, b);
                        for (e = g.length, d = 0; e > d; d++) i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
                        return {
                            length: j,
                            lengths: h,
                            segments: l
                        }
                    },
                    p = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.5",
                        API: 2,
                        global: !0,
                        init: function(a, b, c) {
                            this._target = a, b instanceof Array && (b = {
                                values: b
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                            var d, e, f, g, h, i = b.values || [],
                                j = {},
                                k = i[0],
                                n = b.autoRotate || c.vars.orientToBezier;
                            this._autoRotate = n ? n instanceof Array ? n : [
                                ["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]
                            ] : null;
                            for (d in k) this._props.push(d);
                            for (f = this._props.length; --f > -1;) d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j);
                            if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) {
                                var p = o(this._beziers, this._timeRes);
                                this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (n = this._autoRotate)
                                for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) {
                                    for (g = 0; 3 > g; g++) d = n[f][g], this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
                                    d = n[f][2], this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0
                                }
                            return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(b) {
                            var c, d, e, f, g, h, i, j, k, l, m = this._segCount,
                                n = this._func,
                                o = this._target,
                                p = b !== this._startRatio;
                            if (this._timeRes) {
                                if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) {
                                    for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;);
                                    this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0]
                                } else if (b < this._l1 && e > 0) {
                                    for (; e > 0 && (this._l1 = k[--e]) >= b;);
                                    0 === e && b < this._l1 ? this._l1 = 0 : e++, this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si]
                                }
                                if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) {
                                    for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;);
                                    this._s1 = l[e - 1], this._si = e
                                } else if (b < this._s1 && e > 0) {
                                    for (; e > 0 && (this._s1 = l[--e]) >= b;);
                                    0 === e && b < this._s1 ? this._s1 = 0 : e++, this._s2 = l[e], this._si = e
                                }
                                h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                            } else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;
                            for (d = 1 - h, e = this._props.length; --e > -1;) f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._round[f] && (i = Math.round(i)), n[f] ? o[f](i) : o[f] = i;
                            if (this._autoRotate) {
                                var q, r, s, t, u, v, w, x = this._autoRotate;
                                for (e = x.length; --e > -1;) f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], n[f] ? o[f](i) : o[f] = i)
                            }
                        }
                    }),
                    q = p.prototype;
                p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function(a, b, c) {
                    return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
                }, p._cssRegister = function() {
                    var a = f.CSSPlugin;
                    if (a) {
                        var b = a._internals,
                            c = b._parseToProxy,
                            d = b._setPluginRatio,
                            e = b.CSSPropTween;
                        b._registerComplexSpecialProp("bezier", {
                            parser: function(a, b, f, g, h, i) {
                                b instanceof Array && (b = {
                                    values: b
                                }), i = new p;
                                var j, k, l, m = b.values,
                                    n = m.length - 1,
                                    o = [],
                                    q = {};
                                if (0 > n) return h;
                                for (j = 0; n >= j; j++) l = c(a, m[j], g, h, i, n !== j), o[j] = l.end;
                                for (k in b) q[k] = b[k];
                                return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [
                                    ["left", "top", "rotation", j, !1]
                                ] : null != l.end.x ? [
                                    ["x", "y", "rotation", j, !1]
                                ] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform), i._onInitTween(l.proxy, q, g._tween), h
                            }
                        })
                    }
                }, q._roundProps = function(a, b) {
                    for (var c = this._overwriteProps, d = c.length; --d > -1;)(a[c[d]] || a.bezier || a.bezierThrough) && (this._round[c[d]] = b)
                }, q._kill = function(a) {
                    var b, c, d = this._props;
                    for (b in this._beziers)
                        if (b in a)
                            for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;) d[c] === b && d.splice(c, 1);
                    return this._super._kill.call(this, a)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
                var c, d, e, f, g = function() {
                        a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
                    },
                    h = _gsScope._gsDefine.globals,
                    i = {},
                    j = g.prototype = new a("css");
                j.constructor = g, g.version = "1.18.3", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
                    top: j,
                    right: j,
                    bottom: j,
                    left: j,
                    width: j,
                    height: j,
                    fontSize: j,
                    padding: j,
                    margin: j,
                    perspective: j,
                    lineHeight: ""
                };
                var k, l, m, n, o, p, q = /(?:\-|\.|\b)[\d\.e]+\b/g,
                    r = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    s = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    t = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    u = /(?:\d|\-|\+|=|#|\.)*/g,
                    v = /opacity *= *([^)]*)/i,
                    w = /opacity:([^;]*)/i,
                    x = /alpha\(opacity *=.+?\)/i,
                    y = /^(rgb|hsl)/,
                    z = /([A-Z])/g,
                    A = /-([a-z])/gi,
                    B = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    C = function(a, b) {
                        return b.toUpperCase()
                    },
                    D = /(?:Left|Right|Width)/i,
                    E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    F = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    G = /,(?=[^\)]*(?:\(|$))/gi,
                    H = /[\s,\(]/i,
                    I = Math.PI / 180,
                    J = 180 / Math.PI,
                    K = {},
                    L = document,
                    M = function(a) {
                        return L.createElementNS ? L.createElementNS("http://www.w3.org/1999/xhtml", a) : L.createElement(a)
                    },
                    N = M("div"),
                    O = M("img"),
                    P = g._internals = {
                        _specialProps: i
                    },
                    Q = navigator.userAgent,
                    R = function() {
                        var a = Q.indexOf("Android"),
                            b = M("a");
                        return m = -1 !== Q.indexOf("Safari") && -1 === Q.indexOf("Chrome") && (-1 === a || Number(Q.substr(a + 8, 1)) > 3), o = m && Number(Q.substr(Q.indexOf("Version/") + 8, 1)) < 6, n = -1 !== Q.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Q) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Q)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
                    }(),
                    S = function(a) {
                        return v.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    T = function(a) {
                        window.console && console.log(a)
                    },
                    U = "",
                    V = "",
                    W = function(a, b) {
                        b = b || N;
                        var c, d, e = b.style;
                        if (void 0 !== e[a]) return a;
                        for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
                        return d >= 0 ? (V = 3 === d ? "ms" : c[d], U = "-" + V.toLowerCase() + "-", V + a) : null
                    },
                    X = L.defaultView ? L.defaultView.getComputedStyle : function() {},
                    Y = g.getStyle = function(a, b, c, d, e) {
                        var f;
                        return R || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || X(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(z, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : S(a)
                    },
                    Z = P.convertToPixels = function(a, c, d, e, f) {
                        if ("px" === e || !e) return d;
                        if ("auto" === e || !d) return 0;
                        var h, i, j, k = D.test(c),
                            l = a,
                            m = N.style,
                            n = 0 > d;
                        if (n && (d = -d), "%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight);
                        else {
                            if (m.cssText = "border:0 solid red;position:" + Y(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                            else {
                                if (l = a.parentNode || L.body, i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;
                                m[k ? "width" : "height"] = d + e
                            }
                            l.appendChild(N), h = parseFloat(N[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(N), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = Z(a, c, d, e, !0))
                        }
                        return n ? -h : h
                    },
                    $ = P.calculateOffset = function(a, b, c) {
                        if ("absolute" !== Y(a, "position", c)) return 0;
                        var d = "left" === b ? "Left" : "Top",
                            e = Y(a, "margin" + d, c);
                        return a["offset" + d] - (Z(a, b, parseFloat(e), e.replace(u, "")) || 0)
                    },
                    _ = function(a, b) {
                        var c, d, e, f = {};
                        if (b = b || X(a, null))
                            if (c = b.length)
                                for (; --c > -1;) e = b[c], (-1 === e.indexOf("-transform") || Aa === e) && (f[e.replace(A, C)] = b.getPropertyValue(e));
                            else
                                for (c in b)(-1 === c.indexOf("Transform") || za === c) && (f[c] = b[c]);
                        else if (b = a.currentStyle || a.style)
                            for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(A, C)] = b[c]);
                        return R || (f.opacity = S(a)), d = Na(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Ca && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f
                    },
                    aa = function(a, b, c, d, e) {
                        var f, g, h, i = {},
                            j = a.style;
                        for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(t, "") ? f : 0 : $(a, g), void 0 !== j[g] && (h = new pa(j, g, j[g], h)));
                        if (d)
                            for (g in d) "className" !== g && (i[g] = d[g]);
                        return {
                            difs: i,
                            firstMPT: h
                        }
                    },
                    ba = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    ca = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    da = function(a, b, c) {
                        var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
                            e = ba[b],
                            f = e.length;
                        for (c = c || X(a, null); --f > -1;) d -= parseFloat(Y(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(Y(a, "border" + e[f] + "Width", c, !0)) || 0;
                        return d
                    },
                    ea = function(a, b) {
                        if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
                        (null == a || "" === a) && (a = "0 0");
                        var c, d = a.split(" "),
                            e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
                            f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
                        if (d.length > 3 && !b) {
                            for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) a.push(ea(d[c]));
                            return a.join(",")
                        }
                        return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(t, "")), b.oy = parseFloat(f.replace(t, "")), b.v = a), b || a
                    },
                    fa = function(a, b) {
                        return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
                    },
                    ga = function(a, b) {
                        return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
                    },
                    ha = function(a, b, c, d) {
                        var e, f, g, h, i, j = 1e-6;
                        return null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : J) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h
                    },
                    ia = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    ja = function(a, b, c) {
                        return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
                    },
                    ka = g.parseColor = function(a, b) {
                        var c, d, e, f, g, h, i, j, k, l, m;
                        if (a)
                            if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];
                            else {
                                if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), ia[a]) c = ia[a];
                                else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];
                                else if ("hsl" === a.substr(0, 3))
                                    if (c = m = a.match(q), b) {
                                        if (-1 !== a.indexOf("=")) return a.match(r)
                                    } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(a[3])), c[0] = ja(g + 1 / 3, d, e), c[1] = ja(g, d, e), c[2] = ja(g - 1 / 3, d, e);
                                else c = a.match(q) || ia.transparent;
                                c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]))
                            } else c = ia.black;
                        return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
                    },
                    la = function(a, b) {
                        var c, d, e, f = a.match(ma) || [],
                            g = 0,
                            h = f.length ? "" : a;
                        for (c = 0; c < f.length; c++) d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = ka(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
                        return h + a.substr(g)
                    },
                    ma = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (j in ia) ma += "|" + j + "\\b";
                ma = new RegExp(ma + ")", "gi"), g.colorStringFilter = function(a) {
                    var b, c = a[0] + a[1];
                    ma.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = la(a[0], b), a[1] = la(a[1], b)), ma.lastIndex = 0
                }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
                var na = function(a, b, c, d) {
                        if (null == a) return function(a) {
                            return a
                        };
                        var e, f = b ? (a.match(ma) || [""])[0] : "",
                            g = a.split(f).join("").match(s) || [],
                            h = a.substr(0, a.indexOf(g[0])),
                            i = ")" === a.charAt(a.length - 1) ? ")" : "",
                            j = -1 !== a.indexOf(" ") ? " " : ",",
                            k = g.length,
                            l = k > 0 ? g[0].replace(q, "") : "";
                        return k ? e = b ? function(a) {
                            var b, m, n, o;
                            if ("number" == typeof a) a += l;
                            else if (d && G.test(a)) {
                                for (o = a.replace(G, "|").split("|"), n = 0; n < o.length; n++) o[n] = e(o[n]);
                                return o.join(",")
                            }
                            if (b = (a.match(ma) || [f])[0], m = a.split(b).join("").match(s) || [], n = m.length, k > n--)
                                for (; ++n < k;) m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
                            return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
                        } : function(a) {
                            var b, f, m;
                            if ("number" == typeof a) a += l;
                            else if (d && G.test(a)) {
                                for (f = a.replace(G, "|").split("|"), m = 0; m < f.length; m++) f[m] = e(f[m]);
                                return f.join(",")
                            }
                            if (b = a.match(s) || [], m = b.length, k > m--)
                                for (; ++m < k;) b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
                            return h + b.join(j) + i
                        } : function(a) {
                            return a
                        }
                    },
                    oa = function(a) {
                        return a = a.split(","),
                            function(b, c, d, e, f, g, h) {
                                var i, j = (c + "").split(" ");
                                for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                                return e.parse(b, h, f, g)
                            }
                    },
                    pa = (P._setPluginRatio = function(a) {
                        this.plugin.setRatio(a);
                        for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;) b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
                        if (g.autoRotate && (g.autoRotate.rotation = h.rotation), 1 === a || 0 === a)
                            for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
                                if (c = i.t, c.type) {
                                    if (1 === c.type) {
                                        for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) e += c["xn" + d] + c["xs" + (d + 1)];
                                        c[f] = e
                                    }
                                } else c[f] = c.s + c.xs0;
                                i = i._next
                            }
                    }, function(a, b, c, d, e) {
                        this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
                    }),
                    qa = (P._parseToProxy = function(a, b, c, d, e, f) {
                        var g, h, i, j, k, l = d,
                            m = {},
                            n = {},
                            o = c._transform,
                            p = K;
                        for (c._transform = null, K = b, d = k = c.parse(a, b, d, e), K = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
                            if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new pa(d, "s", h, j, d.r), d.c = 0), 1 === d.type))
                                for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new pa(d, i, h, j, d.rxp[i]));
                            d = d._next
                        }
                        return {
                            proxy: m,
                            end: n,
                            firstMPT: j,
                            pt: k
                        }
                    }, P.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) {
                        this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof qa || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
                    }),
                    ra = function(a, b, c, d, e, f) {
                        var g = new qa(a, b, c, d - c, e, -1, f);
                        return g.b = c, g.e = g.xs0 = d, g
                    },
                    sa = g.parseComplex = function(a, b, c, d, e, f, h, i, j, l) {
                        c = c || f || "", h = new qa(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && ma.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);
                        var m, n, o, p, s, t, u, v, w, x, y, z, A, B = c.split(", ").join(",").split(" "),
                            C = d.split(", ").join(",").split(" "),
                            D = B.length,
                            E = k !== !1;
                        for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (B = B.join(" ").replace(G, ", ").split(" "), C = C.join(" ").replace(G, ", ").split(" "), D = B.length), D !== C.length && (B = (f || "").split(" "), D = B.length), h.plugin = j, h.setRatio = l, ma.lastIndex = 0, m = 0; D > m; m++)
                            if (p = B[m], s = C[m], v = parseFloat(p), v || 0 === v) h.appendXtra("", v, fa(s, v), s.replace(r, ""), E && -1 !== s.indexOf("px"), !0);
                            else if (e && ma.test(p)) z = s.indexOf(")") + 1, z = ")" + (z ? s.substr(z) : ""), A = -1 !== s.indexOf("hsl") && R, p = ka(p, A), s = ka(s, A), w = p.length + s.length > 6, w && !R && 0 === s[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(C[m]).join("transparent")) : (R || (w = !1), A ? h.appendXtra(w ? "hsla(" : "hsl(", p[0], fa(s[0], p[0]), ",", !1, !0).appendXtra("", p[1], fa(s[1], p[1]), "%,", !1).appendXtra("", p[2], fa(s[2], p[2]), w ? "%," : "%" + z, !1) : h.appendXtra(w ? "rgba(" : "rgb(", p[0], s[0] - p[0], ",", !0, !0).appendXtra("", p[1], s[1] - p[1], ",", !0).appendXtra("", p[2], s[2] - p[2], w ? "," : z, !0), w && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (s.length < 4 ? 1 : s[3]) - p, z, !1))), ma.lastIndex = 0;
                        else if (t = p.match(q)) {
                            if (u = s.match(r), !u || u.length !== t.length) return h;
                            for (o = 0, n = 0; n < t.length; n++) y = t[n], x = p.indexOf(y, o), h.appendXtra(p.substr(o, x - o), Number(y), fa(u[n], y), "", E && "px" === p.substr(x + y.length, 2), 0 === n), o = x + y.length;
                            h["xs" + h.l] += p.substr(o)
                        } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + s : s;
                        if (-1 !== d.indexOf("=") && h.data) {
                            for (z = h.xs0 + h.data.s, m = 1; m < h.l; m++) z += h["xs" + m] + h.data["xn" + m];
                            h.e = z + h["xs" + m]
                        }
                        return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
                    },
                    ta = 9;
                for (j = qa.prototype, j.l = j.pr = 0; --ta > 0;) j["xn" + ta] = 0, j["xs" + ta] = "";
                j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function(a, b, c, d, e, f) {
                    var g = this,
                        h = g.l;
                    return g["xs" + h] += f && h ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new qa(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
                        s: b + c
                    }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
                };
                var ua = function(a, b) {
                        b = b || {}, this.p = b.prefix ? W(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || na(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
                    },
                    va = P._registerComplexSpecialProp = function(a, b, c) {
                        "object" != typeof b && (b = {
                            parser: c
                        });
                        var d, e, f = a.split(","),
                            g = b.defaultValue;
                        for (c = c || [g], d = 0; d < f.length; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new ua(f[d], b)
                    },
                    wa = function(a) {
                        if (!i[a]) {
                            var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                            va(a, {
                                parser: function(a, c, d, e, f, g, j) {
                                    var k = h.com.greensock.plugins[b];
                                    return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (T("Error: " + b + " js file not loaded."), f)
                                }
                            })
                        }
                    };
                j = ua.prototype, j.parseComplex = function(a, b, c, d, e, f) {
                    var g, h, i, j, k, l, m = this.keyword;
                    if (this.multi && (G.test(c) || G.test(b) ? (h = b.replace(G, "|").split("|"), i = c.replace(G, "|").split("|")) : m && (h = [b], i = [c])), i) {
                        for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
                        b = h.join(", "), c = i.join(", ")
                    }
                    return sa(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
                }, j.parse = function(a, b, c, d, f, g, h) {
                    return this.parseComplex(a.style, this.format(Y(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
                }, g.registerSpecialProp = function(a, b, c) {
                    va(a, {
                        parser: function(a, d, e, f, g, h, i) {
                            var j = new qa(a, e, 0, 0, g, 2, e, !1, c);
                            return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
                        },
                        priority: c
                    })
                }, g.useSVGTransformAttr = m || n;
                var xa, ya = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    za = W("transform"),
                    Aa = U + "transform",
                    Ba = W("transformOrigin"),
                    Ca = null !== W("perspective"),
                    Da = P.Transform = function() {
                        this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Ca ? g.defaultForce3D || "auto" : !1
                    },
                    Ea = window.SVGElement,
                    Fa = function(a, b, c) {
                        var d, e = L.createElementNS("http://www.w3.org/2000/svg", a),
                            f = /([a-z])([A-Z])/g;
                        for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
                        return b.appendChild(e), e
                    },
                    Ga = L.documentElement,
                    Ha = function() {
                        var a, b, c, d = p || /Android/i.test(Q) && !window.chrome;
                        return L.createElementNS && !d && (a = Fa("svg", Ga), b = Fa("rect", a, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), c = b.getBoundingClientRect().width, b.style[Ba] = "50% 50%", b.style[za] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Ca), Ga.removeChild(a)), d
                    }(),
                    Ia = function(a, b, c, d, e, f) {
                        var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform,
                            w = Ma(a, !0);
                        v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), b = ea(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== La && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "))
                    },
                    Ja = function(a) {
                        try {
                            return a.getBBox()
                        } catch (a) {}
                    },
                    Ka = function(a) {
                        return !!(Ea && a.getBBox && a.getCTM && Ja(a))
                    },
                    La = [1, 0, 0, 1, 0, 0],
                    Ma = function(a, b) {
                        var c, d, e, f, g, h = a._gsTransform || new Da,
                            i = 1e5;
                        if (za ? d = Y(a, Aa, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(E), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), h.x || 0, h.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, (h.svg || a.getBBox && Ka(a)) && (c && -1 !== (a.style[za] + "").indexOf("matrix") && (d = a.style[za], c = 0), e = a.getAttribute("transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c) return La;
                        for (e = (d || "").match(q) || [], ta = e.length; --ta > -1;) f = Number(e[ta]), e[ta] = (g = f - (f |= 0)) ? (g * i + (0 > g ? -.5 : .5) | 0) / i + f : f;
                        return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
                    },
                    Na = P.getTransform = function(a, c, d, f) {
                        if (a._gsTransform && d && !f) return a._gsTransform;
                        var h, i, j, k, l, m, n = d ? a._gsTransform || new Da : new Da,
                            o = n.scaleX < 0,
                            p = 2e-5,
                            q = 1e5,
                            r = Ca ? parseFloat(Y(a, Ba, c, !1, "0 0 0").split(" ")[2]) || n.zOrigin || 0 : 0,
                            s = parseFloat(g.defaultTransformPerspective) || 0;
                        if (n.svg = !(!a.getBBox || !Ka(a)), n.svg && (Ia(a, Y(a, Ba, e, !1, "50% 50%") + "", n, a.getAttribute("data-svg-origin")), xa = g.useSVGTransformAttr || Ha), h = Ma(a), h !== La) {
                            if (16 === h.length) {
                                var t, u, v, w, x, y = h[0],
                                    z = h[1],
                                    A = h[2],
                                    B = h[3],
                                    C = h[4],
                                    D = h[5],
                                    E = h[6],
                                    F = h[7],
                                    G = h[8],
                                    H = h[9],
                                    I = h[10],
                                    K = h[12],
                                    L = h[13],
                                    M = h[14],
                                    N = h[11],
                                    O = Math.atan2(E, I);
                                n.zOrigin && (M = -n.zOrigin, K = G * M - h[12], L = H * M - h[13], M = I * M + n.zOrigin - h[14]), n.rotationX = O * J, O && (w = Math.cos(-O), x = Math.sin(-O), t = C * w + G * x, u = D * w + H * x, v = E * w + I * x, G = C * -x + G * w, H = D * -x + H * w, I = E * -x + I * w, N = F * -x + N * w, C = t, D = u, E = v), O = Math.atan2(-A, I), n.rotationY = O * J, O && (w = Math.cos(-O), x = Math.sin(-O), t = y * w - G * x, u = z * w - H * x, v = A * w - I * x, H = z * x + H * w, I = A * x + I * w, N = B * x + N * w, y = t, z = u, A = v), O = Math.atan2(z, y), n.rotation = O * J, O && (w = Math.cos(-O), x = Math.sin(-O), y = y * w + C * x, u = z * w + D * x, D = z * -x + D * w, E = A * -x + E * w, z = u), n.rotationX && Math.abs(n.rotationX) + Math.abs(n.rotation) > 359.9 && (n.rotationX = n.rotation = 0, n.rotationY = 180 - n.rotationY), n.scaleX = (Math.sqrt(y * y + z * z) * q + .5 | 0) / q, n.scaleY = (Math.sqrt(D * D + H * H) * q + .5 | 0) / q, n.scaleZ = (Math.sqrt(E * E + I * I) * q + .5 | 0) / q, n.skewX = C || D ? Math.atan2(C, D) * J + n.rotation : n.skewX || 0, Math.abs(n.skewX) > 90 && Math.abs(n.skewX) < 270 && (o ? (n.scaleX *= -1, n.skewX += n.rotation <= 0 ? 180 : -180, n.rotation += n.rotation <= 0 ? 180 : -180) : (n.scaleY *= -1, n.skewX += n.skewX <= 0 ? 180 : -180)), n.perspective = N ? 1 / (0 > N ? -N : N) : 0, n.x = K, n.y = L, n.z = M, n.svg && (n.x -= n.xOrigin - (n.xOrigin * y - n.yOrigin * C), n.y -= n.yOrigin - (n.yOrigin * z - n.xOrigin * D))
                            } else if ((!Ca || f || !h.length || n.x !== h[4] || n.y !== h[5] || !n.rotationX && !n.rotationY) && (void 0 === n.x || "none" !== Y(a, "display", c))) {
                                var P = h.length >= 6,
                                    Q = P ? h[0] : 1,
                                    R = h[1] || 0,
                                    S = h[2] || 0,
                                    T = P ? h[3] : 1;
                                n.x = h[4] || 0, n.y = h[5] || 0, j = Math.sqrt(Q * Q + R * R), k = Math.sqrt(T * T + S * S), l = Q || R ? Math.atan2(R, Q) * J : n.rotation || 0, m = S || T ? Math.atan2(S, T) * J + l : n.skewX || 0, Math.abs(m) > 90 && Math.abs(m) < 270 && (o ? (j *= -1, m += 0 >= l ? 180 : -180, l += 0 >= l ? 180 : -180) : (k *= -1, m += 0 >= m ? 180 : -180)), n.scaleX = j, n.scaleY = k, n.rotation = l, n.skewX = m, Ca && (n.rotationX = n.rotationY = n.z = 0, n.perspective = s, n.scaleZ = 1), n.svg && (n.x -= n.xOrigin - (n.xOrigin * Q + n.yOrigin * S), n.y -= n.yOrigin - (n.xOrigin * R + n.yOrigin * T))
                            }
                            n.zOrigin = r;
                            for (i in n) n[i] < p && n[i] > -p && (n[i] = 0)
                        }
                        return d && (a._gsTransform = n, n.svg && (xa && a.style[za] ? b.delayedCall(.001, function() {
                            Ra(a.style, za)
                        }) : !xa && a.getAttribute("transform") && b.delayedCall(.001, function() {
                            a.removeAttribute("transform")
                        }))), n
                    },
                    Oa = function(a) {
                        var b, c, d = this.data,
                            e = -d.rotation * I,
                            f = e + d.skewX * I,
                            g = 1e5,
                            h = (Math.cos(e) * d.scaleX * g | 0) / g,
                            i = (Math.sin(e) * d.scaleX * g | 0) / g,
                            j = (Math.sin(f) * -d.scaleY * g | 0) / g,
                            k = (Math.cos(f) * d.scaleY * g | 0) / g,
                            l = this.t.style,
                            m = this.t.currentStyle;
                        if (m) {
                            c = i, i = -j, j = -c, b = m.filter, l.filter = "";
                            var n, o, q = this.t.offsetWidth,
                                r = this.t.offsetHeight,
                                s = "absolute" !== m.position,
                                t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
                                w = d.x + q * d.xPercent / 100,
                                x = d.y + r * d.yPercent / 100;
                            if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, w += n - (n * h + o * i), x += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + w) + ", Dy=" + (o - (n * j + o * k) + x) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(F, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || v.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
                                var y, z, A, B = 8 > p ? 1 : -1;
                                for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + w), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + x), ta = 0; 4 > ta; ta++) z = ca[ta], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : Z(this.t, z, parseFloat(y), y.replace(u, "")) || 0, A = c !== d[z] ? 2 > ta ? -d.ieOffsetX : -d.ieOffsetY : 2 > ta ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === ta || 2 === ta ? 1 : B))) + "px"
                            }
                        }
                    },
                    Pa = P.set3DTransformRatio = P.setTransformRatio = function(a) {
                        var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data,
                            A = this.t.style,
                            B = z.rotation,
                            C = z.rotationX,
                            D = z.rotationY,
                            E = z.scaleX,
                            F = z.scaleY,
                            G = z.scaleZ,
                            H = z.x,
                            J = z.y,
                            K = z.z,
                            L = z.svg,
                            M = z.perspective,
                            N = z.force3D;
                        if (((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !K && !M && !D && !C && 1 === G || xa && L || !Ca) return void(B || z.skewX || L ? (B *= I, x = z.skewX * I, y = 1e5, b = Math.cos(B) * E, e = Math.sin(B) * E, c = Math.sin(B - x) * -F, f = Math.cos(B - x) * F, x && "simple" === z.skewType && (s = Math.tan(x), s = Math.sqrt(1 + s * s), c *= s, f *= s, z.skewY && (b *= s, e *= s)), L && (H += z.xOrigin - (z.xOrigin * b + z.yOrigin * c) + z.xOffset, J += z.yOrigin - (z.xOrigin * e + z.yOrigin * f) + z.yOffset, xa && (z.xPercent || z.yPercent) && (p = this.t.getBBox(), H += .01 * z.xPercent * p.width, J += .01 * z.yPercent * p.height), p = 1e-6, p > H && H > -p && (H = 0), p > J && J > -p && (J = 0)), u = (b * y | 0) / y + "," + (e * y | 0) / y + "," + (c * y | 0) / y + "," + (f * y | 0) / y + "," + H + "," + J + ")", L && xa ? this.t.setAttribute("transform", "matrix(" + u) : A[za] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[za] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + J + ")");
                        if (n && (p = 1e-4, p > E && E > -p && (E = G = 2e-5), p > F && F > -p && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || z.skewX) B *= I, q = b = Math.cos(B), r = e = Math.sin(B), z.skewX && (B -= z.skewX * I, q = Math.cos(B), r = Math.sin(B), "simple" === z.skewType && (s = Math.tan(z.skewX * I), s = Math.sqrt(1 + s * s), q *= s, r *= s, z.skewY && (b *= s, e *= s))), c = -r, f = q;
                        else {
                            if (!(D || C || 1 !== G || M || L)) return void(A[za] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + J + "px," + K + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
                            b = f = 1, c = e = 0
                        }
                        j = 1, d = g = h = i = k = l = 0, m = M ? -1 / M : 0, o = z.zOrigin, p = 1e-6, v = ",", w = "0", B = D * I, B && (q = Math.cos(B), r = Math.sin(B), h = -r, k = m * -r, d = b * r, g = e * r, j = q, m *= q, b *= q, e *= q), B = C * I, B && (q = Math.cos(B), r = Math.sin(B), s = c * q + d * r, t = f * q + g * r, i = j * r, l = m * r, d = c * -r + d * q, g = f * -r + g * q, j *= q, m *= q, c = s, f = t), 1 !== G && (d *= G, g *= G, j *= G, m *= G), 1 !== F && (c *= F, f *= F, i *= F, l *= F), 1 !== E && (b *= E, e *= E, h *= E, k *= E), (o || L) && (o && (H += d * -o, J += g * -o, K += j * -o + o), L && (H += z.xOrigin - (z.xOrigin * b + z.yOrigin * c) + z.xOffset, J += z.yOrigin - (z.xOrigin * e + z.yOrigin * f) + z.yOffset), p > H && H > -p && (H = w), p > J && J > -p && (J = w), p > K && K > -p && (K = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (p > b && b > -p ? w : b) + v + (p > e && e > -p ? w : e) + v + (p > h && h > -p ? w : h), u += v + (p > k && k > -p ? w : k) + v + (p > c && c > -p ? w : c) + v + (p > f && f > -p ? w : f), C || D || 1 !== G ? (u += v + (p > i && i > -p ? w : i) + v + (p > l && l > -p ? w : l) + v + (p > d && d > -p ? w : d), u += v + (p > g && g > -p ? w : g) + v + (p > j && j > -p ? w : j) + v + (p > m && m > -p ? w : m) + v) : u += ",0,0,0,0,1,0,", u += H + v + J + v + K + v + (M ? 1 + -K / M : 1) + ")", A[za] = u
                    };
                j = Da.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, va("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(a, b, c, d, f, h, i) {
                        if (d._lastParsedTransform === i) return f;
                        d._lastParsedTransform = i;
                        var j, k, l, m, n, o, p, q, r, s, t = a._gsTransform,
                            u = a.style,
                            v = 1e-6,
                            w = ya.length,
                            x = i,
                            y = {},
                            z = "transformOrigin";
                        if (i.display ? (l = Y(a, "display"), u.display = "block", j = Na(a, e, !0, i.parseTransform), u.display = l) : j = Na(a, e, !0, i.parseTransform), d._transform = j, "string" == typeof x.transform && za) l = N.style, l[za] = x.transform, l.display = "block", l.position = "absolute", L.body.appendChild(N), k = Na(N, null, !1), j.svg && (q = j.xOrigin, r = j.yOrigin, k.x -= j.xOffset, k.y -= j.yOffset, (x.transformOrigin || x.svgOrigin) && (m = {}, Ia(a, ea(x.transformOrigin), m, x.svgOrigin, x.smoothOrigin, !0), q = m.xOrigin, r = m.yOrigin, k.x -= m.xOffset - j.xOffset, k.y -= m.yOffset - j.yOffset), (q || r) && (s = Ma(N), k.x -= q - (q * s[0] + r * s[2]), k.y -= r - (q * s[1] + r * s[3]))), L.body.removeChild(N), k.perspective || (k.perspective = j.perspective), null != x.xPercent && (k.xPercent = ga(x.xPercent, j.xPercent)), null != x.yPercent && (k.yPercent = ga(x.yPercent, j.yPercent));
                        else if ("object" == typeof x) {
                            if (k = {
                                    scaleX: ga(null != x.scaleX ? x.scaleX : x.scale, j.scaleX),
                                    scaleY: ga(null != x.scaleY ? x.scaleY : x.scale, j.scaleY),
                                    scaleZ: ga(x.scaleZ, j.scaleZ),
                                    x: ga(x.x, j.x),
                                    y: ga(x.y, j.y),
                                    z: ga(x.z, j.z),
                                    xPercent: ga(x.xPercent, j.xPercent),
                                    yPercent: ga(x.yPercent, j.yPercent),
                                    perspective: ga(x.transformPerspective, j.perspective)
                                }, p = x.directionalRotation, null != p)
                                if ("object" == typeof p)
                                    for (l in p) x[l] = p[l];
                                else x.rotation = p;
                                "string" == typeof x.x && -1 !== x.x.indexOf("%") && (k.x = 0, k.xPercent = ga(x.x, j.xPercent)), "string" == typeof x.y && -1 !== x.y.indexOf("%") && (k.y = 0, k.yPercent = ga(x.y, j.yPercent)), k.rotation = ha("rotation" in x ? x.rotation : "shortRotation" in x ? x.shortRotation + "_short" : "rotationZ" in x ? x.rotationZ : j.rotation - j.skewY, j.rotation - j.skewY, "rotation", y), Ca && (k.rotationX = ha("rotationX" in x ? x.rotationX : "shortRotationX" in x ? x.shortRotationX + "_short" : j.rotationX || 0, j.rotationX, "rotationX", y), k.rotationY = ha("rotationY" in x ? x.rotationY : "shortRotationY" in x ? x.shortRotationY + "_short" : j.rotationY || 0, j.rotationY, "rotationY", y)), k.skewX = ha(x.skewX, j.skewX - j.skewY), (k.skewY = ha(x.skewY, j.skewY)) && (k.skewX += k.skewY, k.rotation += k.skewY)
                        }
                        for (Ca && null != x.force3D && (j.force3D = x.force3D, o = !0), j.skewType = x.skewType || j.skewType || g.defaultSkewType, n = j.force3D || j.z || j.rotationX || j.rotationY || k.z || k.rotationX || k.rotationY || k.perspective, n || null == x.scale || (k.scaleZ = 1); --w > -1;) c = ya[w], m = k[c] - j[c], (m > v || -v > m || null != x[c] || null != K[c]) && (o = !0, f = new qa(j, c, j[c], m, f), c in y && (f.e = y[c]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
                        return m = x.transformOrigin, j.svg && (m || x.svgOrigin) && (q = j.xOffset, r = j.yOffset, Ia(a, ea(m), k, x.svgOrigin, x.smoothOrigin), f = ra(j, "xOrigin", (t ? j : k).xOrigin, k.xOrigin, f, z), f = ra(j, "yOrigin", (t ? j : k).yOrigin, k.yOrigin, f, z), (q !== j.xOffset || r !== j.yOffset) && (f = ra(j, "xOffset", t ? q : j.xOffset, j.xOffset, f, z), f = ra(j, "yOffset", t ? r : j.yOffset, j.yOffset, f, z)), m = xa ? null : "0px 0px"), (m || Ca && n && j.zOrigin) && (za ? (o = !0, c = Ba, m = (m || Y(a, c, e, !1, "50% 50%")) + "", f = new qa(u, c, 0, 0, f, -1, z), f.b = u[c], f.plugin = h, Ca ? (l = j.zOrigin, m = m.split(" "), j.zOrigin = (m.length > 2 && (0 === l || "0px" !== m[2]) ? parseFloat(m[2]) : l) || 0, f.xs0 = f.e = m[0] + " " + (m[1] || "50%") + " 0px", f = new qa(j, "zOrigin", 0, 0, f, -1, f.n), f.b = l, f.xs0 = f.e = j.zOrigin) : f.xs0 = f.e = m) : ea(m + "", j)), o && (d._transformType = j.svg && xa || !n && 3 !== this._transformType ? 2 : 3), f
                    },
                    prefix: !0
                }), va("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), va("borderRadius", {
                    defaultValue: "0px",
                    parser: function(a, b, c, f, g, h) {
                        b = this.format(b);
                        var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            z = a.style;
                        for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight),
                            i = b.split(" "), j = 0; j < y.length; j++) this.p.indexOf("border") && (y[j] = W(y[j])), m = l = Y(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = Z(a, "borderLeft", o, t), w = Z(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = Z(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = sa(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
                        return g
                    },
                    prefix: !0,
                    formatter: na("0px 0px 0px 0px", !1, !0)
                }), va("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(a, b, c, d, f, g) {
                        var h, i, j, k, l, m, n = "background-position",
                            o = e || X(a, null),
                            q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                            r = this.format(b);
                        if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = Y(a, "backgroundImage").replace(B, ""), m && "none" !== m)) {
                            for (h = q.split(" "), i = r.split(" "), O.setAttribute("src", m), j = 2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - O.width : a.offsetHeight - O.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
                            q = h.join(" ")
                        }
                        return this.parseComplex(a.style, q, r, f, g)
                    },
                    formatter: ea
                }), va("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: ea
                }), va("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), va("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), va("transformStyle", {
                    prefix: !0
                }), va("backfaceVisibility", {
                    prefix: !0
                }), va("userSelect", {
                    prefix: !0
                }), va("margin", {
                    parser: oa("marginTop,marginRight,marginBottom,marginLeft")
                }), va("padding", {
                    parser: oa("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), va("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(a, b, c, d, f, g) {
                        var h, i, j;
                        return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(Y(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
                    }
                }), va("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), va("autoRound,strictUnits", {
                    parser: function(a, b, c, d, e) {
                        return e
                    }
                }), va("border", {
                    defaultValue: "0px solid #000",
                    parser: function(a, b, c, d, f, g) {
                        return this.parseComplex(a.style, this.format(Y(a, "borderTopWidth", e, !1, "0px") + " " + Y(a, "borderTopStyle", e, !1, "solid") + " " + Y(a, "borderTopColor", e, !1, "#000")), this.format(b), f, g)
                    },
                    color: !0,
                    formatter: function(a) {
                        var b = a.split(" ");
                        return b[0] + " " + (b[1] || "solid") + " " + (a.match(ma) || ["#000"])[0]
                    }
                }), va("borderWidth", {
                    parser: oa("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), va("float,cssFloat,styleFloat", {
                    parser: function(a, b, c, d, e, f) {
                        var g = a.style,
                            h = "cssFloat" in g ? "cssFloat" : "styleFloat";
                        return new qa(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
                    }
                });
                var Qa = function(a) {
                    var b, c = this.t,
                        d = c.filter || Y(this.data, "filter") || "",
                        e = this.s + this.c * a | 0;
                    100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !Y(this.data, "filter")) : (c.filter = d.replace(x, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(v, "opacity=" + e))
                };
                va("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(a, b, c, d, f, g) {
                        var h = parseFloat(Y(a, "opacity", e, !1, "1")),
                            i = a.style,
                            j = "autoAlpha" === c;
                        return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === Y(a, "visibility", e) && 0 !== b && (h = 0), R ? f = new qa(i, "opacity", h, b - h, f) : (f = new qa(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Qa), j && (f = new qa(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
                    }
                });
                var Ra = function(a, b) {
                        b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(z, "-$1").toLowerCase())) : a.removeAttribute(b))
                    },
                    Sa = function(a) {
                        if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                            this.t.setAttribute("class", 0 === a ? this.b : this.e);
                            for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Ra(c, b.p), b = b._next;
                            1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                va("className", {
                    parser: function(a, b, d, f, g, h, i) {
                        var j, k, l, m, n, o = a.getAttribute("class") || "",
                            p = a.style.cssText;
                        if (g = f._classNamePT = new qa(a, d, 0, 0, g, 2), g.setRatio = Sa, g.pr = -11, c = !0, g.b = o, k = _(a, e), l = a._gsClassPT) {
                            for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
                            l.setRatio(1)
                        }
                        return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = aa(a, k, _(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
                    }
                });
                var Ta = function(a) {
                    if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var b, c, d, e, f, g = this.t.style,
                            h = i.transform.parse;
                        if ("all" === this.e) g.cssText = "", e = !0;
                        else
                            for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ba : i[c].p), Ra(g, c);
                        e && (Ra(g, za), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                    }
                };
                for (va("clearProps", {
                        parser: function(a, b, d, e, f) {
                            return f = new qa(a, d, 0, 0, f, 2), f.setRatio = Ta, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
                        }
                    }), j = "bezier,throwProps,physicsProps,physics2D".split(","), ta = j.length; ta--;) wa(j[ta]);
                j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function(a, b, h) {
                    if (!a.nodeType) return !1;
                    this._target = a, this._tween = h, this._vars = b, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = X(a, ""), f = this._overwriteProps;
                    var j, n, p, q, r, s, t, u, v, x = a.style;
                    if (l && "" === x.zIndex && (j = Y(a, "zIndex", e), ("auto" === j || "" === j) && this._addLazySet(x, "zIndex", 0)), "string" == typeof b && (q = x.cssText, j = _(a, e), x.cssText = q + ";" + b, j = aa(a, j, _(a)).difs, !R && w.test(b) && (j.opacity = parseFloat(RegExp.$1)), b = j, x.cssText = q), b.className ? this._firstPT = n = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = n = this.parse(a, b, null), this._transformType) {
                        for (v = 3 === this._transformType, za ? m && (l = !0, "" === x.zIndex && (t = Y(a, "zIndex", e), ("auto" === t || "" === t) && this._addLazySet(x, "zIndex", 0)), o && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (v ? "visible" : "hidden"))) : x.zoom = 1, p = n; p && p._next;) p = p._next;
                        u = new qa(a, "transform", 0, 0, null, 2), this._linkCSSP(u, null, p), u.setRatio = za ? Pa : Oa, u.data = this._transform || Na(a, e, !0), u.tween = h, u.pr = -1, f.pop()
                    }
                    if (c) {
                        for (; n;) {
                            for (s = n._next, p = q; p && p.pr > n.pr;) p = p._next;
                            (n._prev = p ? p._prev : r) ? n._prev._next = n: q = n, (n._next = p) ? p._prev = n : r = n, n = s
                        }
                        this._firstPT = q
                    }
                    return !0
                }, j.parse = function(a, b, c, f) {
                    var g, h, j, l, m, n, o, p, q, r, s = a.style;
                    for (g in b) n = b[g], h = i[g], h ? c = h.parse(a, n, g, this, c, f, b) : (m = Y(a, g, e) + "", q = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || q && y.test(n) ? (q || (n = ka(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = sa(s, g, m, n, !0, "transparent", c, 0, f)) : q && H.test(n) ? c = sa(s, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = da(a, g, e), o = "px") : "left" === g || "top" === g ? (j = $(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), r = q && "=" === n.charAt(1), r ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(u, "")) : (l = parseFloat(n), p = q ? n.replace(u, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (r ? l + j : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && j && (j = Z(a, g, j, o), "%" === p ? (j /= Z(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= Z(a, g, 1, p) : "px" !== p && (l = Z(a, g, l, p), p = "px"), r && (l || 0 === l) && (n = l + j + p)), r && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== s[g] && (n || n + "" != "NaN" && null != n) ? (c = new qa(s, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : T("invalid " + g + " tween value: " + b[g]) : (c = new qa(s, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))), f && c && !c.plugin && (c.plugin = f);
                    return c
                }, j.setRatio = function(a) {
                    var b, c, d, e = this._firstPT,
                        f = 1e-6;
                    if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; e;) {
                                if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type)
                                    if (1 === e.type)
                                        if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                        else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                else {
                                    for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                    e.t[e.p] = c
                                } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                                else e.t[e.p] = b + e.xs0;
                                e = e._next
                            } else
                                for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
                        else
                            for (; e;) {
                                if (2 !== e.type)
                                    if (e.r && -1 !== e.type)
                                        if (b = Math.round(e.s + e.c), e.type) {
                                            if (1 === e.type) {
                                                for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                                e.t[e.p] = c
                                            }
                                        } else e.t[e.p] = b + e.xs0;
                                else e.t[e.p] = e.e;
                                else e.setRatio(a);
                                e = e._next
                            }
                }, j._enableTransforms = function(a) {
                    this._transform = this._transform || Na(this._target, e, !0), this._transformType = this._transform.svg && xa || !a && 3 !== this._transformType ? 2 : 3
                };
                var Ua = function(a) {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                j._addLazySet = function(a, b, c) {
                    var d = this._firstPT = new qa(a, b, 0, 0, this._firstPT, 2);
                    d.e = c, d.setRatio = Ua, d.data = this
                }, j._linkCSSP = function(a, b, c, d) {
                    return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
                }, j._kill = function(b) {
                    var c, d, e, f = b;
                    if (b.autoAlpha || b.alpha) {
                        f = {};
                        for (d in b) f[d] = b[d];
                        f.opacity = 1, f.autoAlpha && (f.visibility = 1)
                    }
                    return b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), a.prototype._kill.call(this, f)
                };
                var Va = function(a, b, c) {
                    var d, e, f, g;
                    if (a.slice)
                        for (e = a.length; --e > -1;) Va(a[e], b, c);
                    else
                        for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push(_(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Va(f, b, c)
                };
                return g.cascadeTo = function(a, c, d) {
                    var e, f, g, h, i = b.to(a, c, d),
                        j = [i],
                        k = [],
                        l = [],
                        m = [],
                        n = b._internals.reservedProps;
                    for (a = i._targets || i.target, Va(a, k, m), i.render(c, !0, !0), Va(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)
                        if (f = aa(m[e], k[e], l[e]), f.firstMPT) {
                            f = f.difs;
                            for (g in d) n[g] && (f[g] = d[g]);
                            h = {};
                            for (g in f) h[g] = k[e][g];
                            j.push(b.fromTo(m[e], c, h, f))
                        }
                    return j
                }, a.activate([g]), g
            }, !0),
            function() {
                var a = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        version: "1.5",
                        priority: -1,
                        API: 2,
                        init: function(a, b, c) {
                            return this._tween = c, !0
                        }
                    }),
                    b = function(a) {
                        for (; a;) a.f || a.blob || (a.r = 1), a = a._next
                    },
                    c = a.prototype;
                c._onInitAllProps = function() {
                    for (var a, c, d, e = this._tween, f = e.vars.roundProps.join ? e.vars.roundProps : e.vars.roundProps.split(","), g = f.length, h = {}, i = e._propLookup.roundProps; --g > -1;) h[f[g]] = 1;
                    for (g = f.length; --g > -1;)
                        for (a = f[g], c = e._firstPT; c;) d = c._next, c.pg ? c.t._roundProps(h, !0) : c.n === a && (2 === c.f && c.t ? b(c.t._firstPT) : (this._add(c.t, a, c.s, c.c), d && (d._prev = c._prev), c._prev ? c._prev._next = d : e._firstPT === c && (e._firstPT = d), c._next = c._prev = null, e._propLookup[a] = i)), c = d;
                    return !1
                }, c._add = function(a, b, c, d) {
                    this._addTween(a, b, c, c + d, b, !0), this._overwriteProps.push(b)
                }
            }(),
            function() {
                _gsScope._gsDefine.plugin({
                    propName: "attr",
                    API: 2,
                    version: "0.5.0",
                    init: function(a, b, c) {
                        var d;
                        if ("function" != typeof a.setAttribute) return !1;
                        for (d in b) this._addTween(a, "setAttribute", a.getAttribute(d) + "", b[d] + "", d, !1, d), this._overwriteProps.push(d);
                        return !0
                    }
                })
            }(), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.2.1",
                API: 2,
                init: function(a, b, c) {
                    "object" != typeof b && (b = {
                        rotation: b
                    }), this.finals = {};
                    var d, e, f, g, h, i, j = b.useRadians === !0 ? 2 * Math.PI : 360,
                        k = 1e-6;
                    for (d in b) "useRadians" !== d && (i = (b[d] + "").split("_"), e = i[0], f = parseFloat("function" != typeof a[d] ? a[d] : a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]()), g = this.finals[d] = "string" == typeof e && "=" === e.charAt(1) ? f + parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) : Number(e) || 0, h = g - f, i.length && (e = i.join("_"), -1 !== e.indexOf("short") && (h %= j, h !== h % (j / 2) && (h = 0 > h ? h + j : h - j)), -1 !== e.indexOf("_cw") && 0 > h ? h = (h + 9999999999 * j) % j - (h / j | 0) * j : -1 !== e.indexOf("ccw") && h > 0 && (h = (h - 9999999999 * j) % j - (h / j | 0) * j)), (h > k || -k > h) && (this._addTween(a, d, f, f + h, d), this._overwriteProps.push(d)));
                    return !0
                },
                set: function(a) {
                    var b;
                    if (1 !== a) this._super.setRatio.call(this, a);
                    else
                        for (b = this._firstPT; b;) b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(a) {
                var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope,
                    f = e.com.greensock,
                    g = 2 * Math.PI,
                    h = Math.PI / 2,
                    i = f._class,
                    j = function(b, c) {
                        var d = i("easing." + b, function() {}, !0),
                            e = d.prototype = new a;
                        return e.constructor = d, e.getRatio = c, d
                    },
                    k = a.register || function() {},
                    l = function(a, b, c, d, e) {
                        var f = i("easing." + a, {
                            easeOut: new b,
                            easeIn: new c,
                            easeInOut: new d
                        }, !0);
                        return k(f, a), f
                    },
                    m = function(a, b, c) {
                        this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
                    },
                    n = function(b, c) {
                        var d = i("easing." + b, function(a) {
                                this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            e = d.prototype = new a;
                        return e.constructor = d, e.getRatio = c, e.config = function(a) {
                            return new d(a)
                        }, d
                    },
                    o = l("Back", n("BackOut", function(a) {
                        return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
                    }), n("BackIn", function(a) {
                        return a * a * ((this._p1 + 1) * a - this._p1)
                    }), n("BackInOut", function(a) {
                        return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
                    })),
                    p = i("easing.SlowMo", function(a, b, c) {
                        b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
                    }, !0),
                    q = p.prototype = new a;
                return q.constructor = p, q.getRatio = function(a) {
                    var b = a + (.5 - a) * this._p;
                    return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
                }, p.ease = new p(.7, .7), q.config = p.config = function(a, b, c) {
                    return new p(a, b, c)
                }, b = i("easing.SteppedEase", function(a) {
                    a = a || 1, this._p1 = 1 / a, this._p2 = a + 1
                }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function(a) {
                    return 0 > a ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1
                }, q.config = b.config = function(a) {
                    return new b(a)
                }, c = i("easing.RoughEase", function(b) {
                    b = b || {};
                    for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;) c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
                        x: c,
                        y: d
                    };
                    for (j.sort(function(a, b) {
                            return a.x - b.x
                        }), h = new m(1, 1, null), n = l; --n > -1;) g = j[n], h = new m(g.x, g.y, h);
                    this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
                }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function(a) {
                    var b = this._prev;
                    if (a > b.t) {
                        for (; b.next && a >= b.t;) b = b.next;
                        b = b.prev
                    } else
                        for (; b.prev && a <= b.t;) b = b.prev;
                    return this._prev = b, b.v + (a - b.t) / b.gap * b.c
                }, q.config = function(a) {
                    return new c(a)
                }, c.ease = new c, l("Bounce", j("BounceOut", function(a) {
                    return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                }), j("BounceIn", function(a) {
                    return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
                }), j("BounceInOut", function(a) {
                    var b = .5 > a;
                    return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
                })), l("Circ", j("CircOut", function(a) {
                    return Math.sqrt(1 - (a -= 1) * a)
                }), j("CircIn", function(a) {
                    return -(Math.sqrt(1 - a * a) - 1)
                }), j("CircInOut", function(a) {
                    return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
                })), d = function(b, c, d) {
                    var e = i("easing." + b, function(a, b) {
                            this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2
                        }, !0),
                        f = e.prototype = new a;
                    return f.constructor = e, f.getRatio = c, f.config = function(a, b) {
                        return new e(a, b)
                    }, e
                }, l("Elastic", d("ElasticOut", function(a) {
                    return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
                }, .3), d("ElasticIn", function(a) {
                    return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
                }, .3), d("ElasticInOut", function(a) {
                    return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
                }, .45)), l("Expo", j("ExpoOut", function(a) {
                    return 1 - Math.pow(2, -10 * a)
                }), j("ExpoIn", function(a) {
                    return Math.pow(2, 10 * (a - 1)) - .001
                }), j("ExpoInOut", function(a) {
                    return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
                })), l("Sine", j("SineOut", function(a) {
                    return Math.sin(a * h)
                }), j("SineIn", function(a) {
                    return -Math.cos(a * h) + 1
                }), j("SineInOut", function(a) {
                    return -.5 * (Math.cos(Math.PI * a) - 1)
                })), i("easing.EaseLookup", {
                    find: function(b) {
                        return a.map[b]
                    }
                }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(a, b) {
        "use strict";
        var c = a.GreenSockGlobals = a.GreenSockGlobals || a;
        if (!c.TweenLite) {
            var d, e, f, g, h, i = function(a) {
                    var b, d = a.split("."),
                        e = c;
                    for (b = 0; b < d.length; b++) e[d[b]] = e = e[d[b]] || {};
                    return e
                },
                j = i("com.greensock"),
                k = 1e-10,
                l = function(a) {
                    var b, c = [],
                        d = a.length;
                    for (b = 0; b !== d; c.push(a[b++]));
                    return c
                },
                m = function() {},
                n = function() {
                    var a = Object.prototype.toString,
                        b = a.call([]);
                    return function(c) {
                        return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
                    }
                }(),
                o = {},
                p = function(d, e, f, g) {
                    this.sc = o[d] ? o[d].sc : [], o[d] = this, this.gsClass = null, this.func = f;
                    var h = [];
                    this.check = function(j) {
                        for (var k, l, m, n, q, r = e.length, s = r; --r > -1;)(k = o[e[r]] || new p(e[r], [])).gsClass ? (h[r] = k.gsClass, s--) : j && k.sc.push(this);
                        if (0 === s && f)
                            for (l = ("com.greensock." + d).split("."), m = l.pop(), n = i(l.join("."))[m] = this.gsClass = f.apply(f, h), g && (c[m] = n, q = "undefined" != typeof module && module.exports, !q && "function" == typeof define && define.amd ? define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function() {
                                    return n
                                }) : d === b && q && (module.exports = n)), r = 0; r < this.sc.length; r++) this.sc[r].check()
                    }, this.check(!0)
                },
                q = a._gsDefine = function(a, b, c, d) {
                    return new p(a, b, c, d)
                },
                r = j._class = function(a, b, c) {
                    return b = b || function() {}, q(a, [], function() {
                        return b
                    }, c), b
                };
            q.globals = c;
            var s = [0, 0, 1, 1],
                t = [],
                u = r("easing.Ease", function(a, b, c, d) {
                    this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? s.concat(b) : s
                }, !0),
                v = u.map = {},
                w = u.register = function(a, b, c, d) {
                    for (var e, f, g, h, i = b.split(","), k = i.length, l = (c || "easeIn,easeOut,easeInOut").split(","); --k > -1;)
                        for (f = i[k], e = d ? r("easing." + f, null, !0) : j.easing[f] || {}, g = l.length; --g > -1;) h = l[g], v[f + "." + h] = v[h + f] = e[h] = a.getRatio ? a : a[h] || new a
                };
            for (f = u.prototype, f._calcEnd = !1, f.getRatio = function(a) {
                    if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
                    var b = this._type,
                        c = this._power,
                        d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
                    return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
                }, d = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], e = d.length; --e > -1;) f = d[e] + ",Power" + e, w(new u(null, null, 1, e), f, "easeOut", !0), w(new u(null, null, 2, e), f, "easeIn" + (0 === e ? ",easeNone" : "")), w(new u(null, null, 3, e), f, "easeInOut");
            v.linear = j.easing.Linear.easeIn, v.swing = j.easing.Quad.easeInOut;
            var x = r("events.EventDispatcher", function(a) {
                this._listeners = {}, this._eventTarget = a || this
            });
            f = x.prototype, f.addEventListener = function(a, b, c, d, e) {
                e = e || 0;
                var f, i, j = this._listeners[a],
                    k = 0;
                for (null == j && (this._listeners[a] = j = []), i = j.length; --i > -1;) f = j[i], f.c === b && f.s === c ? j.splice(i, 1) : 0 === k && f.pr < e && (k = i + 1);
                j.splice(k, 0, {
                    c: b,
                    s: c,
                    up: d,
                    pr: e
                }), this !== g || h || g.wake()
            }, f.removeEventListener = function(a, b) {
                var c, d = this._listeners[a];
                if (d)
                    for (c = d.length; --c > -1;)
                        if (d[c].c === b) return void d.splice(c, 1)
            }, f.dispatchEvent = function(a) {
                var b, c, d, e = this._listeners[a];
                if (e)
                    for (b = e.length, c = this._eventTarget; --b > -1;) d = e[b], d && (d.up ? d.c.call(d.s || c, {
                        type: a,
                        target: c
                    }) : d.c.call(d.s || c))
            };
            var y = a.requestAnimationFrame,
                z = a.cancelAnimationFrame,
                A = Date.now || function() {
                    return (new Date).getTime()
                },
                B = A();
            for (d = ["ms", "moz", "webkit", "o"], e = d.length; --e > -1 && !y;) y = a[d[e] + "RequestAnimationFrame"], z = a[d[e] + "CancelAnimationFrame"] || a[d[e] + "CancelRequestAnimationFrame"];
            r("Ticker", function(a, b) {
                var c, d, e, f, i, j = this,
                    l = A(),
                    n = b !== !1 && y ? "auto" : !1,
                    o = 500,
                    p = 33,
                    q = "tick",
                    r = function(a) {
                        var b, g, h = A() - B;
                        h > o && (l += h - p), B += h, j.time = (B - l) / 1e3, b = j.time - i, (!c || b > 0 || a === !0) && (j.frame++, i += b + (b >= f ? .004 : f - b), g = !0), a !== !0 && (e = d(r)), g && j.dispatchEvent(q)
                    };
                x.call(j), j.time = j.frame = 0, j.tick = function() {
                    r(!0)
                }, j.lagSmoothing = function(a, b) {
                    o = a || 1 / k, p = Math.min(b, o, 0)
                }, j.sleep = function() {
                    null != e && (n && z ? z(e) : clearTimeout(e), d = m, e = null, j === g && (h = !1))
                }, j.wake = function(a) {
                    null !== e ? j.sleep() : a ? l += -B + (B = A()) : j.frame > 10 && (B = A() - o + 5), d = 0 === c ? m : n && y ? y : function(a) {
                        return setTimeout(a, 1e3 * (i - j.time) + 1 | 0)
                    }, j === g && (h = !0), r(2)
                }, j.fps = function(a) {
                    return arguments.length ? (c = a, f = 1 / (c || 60), i = this.time + f, void j.wake()) : c
                }, j.useRAF = function(a) {
                    return arguments.length ? (j.sleep(), n = a, void j.fps(c)) : n
                }, j.fps(a), setTimeout(function() {
                    "auto" === n && j.frame < 5 && "hidden" !== document.visibilityState && j.useRAF(!1)
                }, 1500)
            }), f = j.Ticker.prototype = new j.events.EventDispatcher, f.constructor = j.Ticker;
            var C = r("core.Animation", function(a, b) {
                if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, V) {
                    h || g.wake();
                    var c = this.vars.useFrames ? U : V;
                    c.add(this, c._time), this.vars.paused && this.paused(!0)
                }
            });
            g = C.ticker = new j.Ticker, f = C.prototype, f._dirty = f._gc = f._initted = f._paused = !1, f._totalTime = f._time = 0, f._rawPrevTime = -1, f._next = f._last = f._onUpdate = f._timeline = f.timeline = null, f._paused = !1;
            var D = function() {
                h && A() - B > 2e3 && g.wake(), setTimeout(D, 2e3)
            };
            D(), f.play = function(a, b) {
                return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
            }, f.pause = function(a, b) {
                return null != a && this.seek(a, b), this.paused(!0)
            }, f.resume = function(a, b) {
                return null != a && this.seek(a, b), this.paused(!1)
            }, f.seek = function(a, b) {
                return this.totalTime(Number(a), b !== !1)
            }, f.restart = function(a, b) {
                return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
            }, f.reverse = function(a, b) {
                return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
            }, f.render = function(a, b, c) {}, f.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, f.isActive = function() {
                var a, b = this._timeline,
                    c = this._startTime;
                return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >= c && a < c + this.totalDuration() / this._timeScale
            }, f._enabled = function(a, b) {
                return h || g.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
            }, f._kill = function(a, b) {
                return this._enabled(!1, !1)
            }, f.kill = function(a, b) {
                return this._kill(a, b), this
            }, f._uncache = function(a) {
                for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
                return this
            }, f._swapSelfInParams = function(a) {
                for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
                return c
            }, f._callback = function(a) {
                var b = this.vars;
                b[a].apply(b[a + "Scope"] || b.callbackScope || this, b[a + "Params"] || t)
            }, f.eventCallback = function(a, b, c, d) {
                if ("on" === (a || "").substr(0, 2)) {
                    var e = this.vars;
                    if (1 === arguments.length) return e[a];
                    null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = n(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
                }
                return this
            }, f.delay = function(a) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
            }, f.duration = function(a) {
                return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, f.totalDuration = function(a) {
                return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
            }, f.time = function(a, b) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
            }, f.totalTime = function(a, b, c) {
                if (h || g.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var d = this._totalDuration,
                            e = this._timeline;
                        if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
                            for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (I.length && X(), this.render(a, b, !1), I.length && X())
                }
                return this
            }, f.progress = f.totalProgress = function(a, b) {
                var c = this.duration();
                return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
            }, f.startTime = function(a) {
                return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
            }, f.endTime = function(a) {
                return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
            }, f.timeScale = function(a) {
                if (!arguments.length) return this._timeScale;
                if (a = a || k, this._timeline && this._timeline.smoothChildTiming) {
                    var b = this._pauseTime,
                        c = b || 0 === b ? b : this._timeline.totalTime();
                    this._startTime = c - (c - this._startTime) * this._timeScale / a
                }
                return this._timeScale = a, this._uncache(!1)
            }, f.reversed = function(a) {
                return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, f.paused = function(a) {
                if (!arguments.length) return this._paused;
                var b, c, d = this._timeline;
                return a != this._paused && d && (h || a || g.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
            };
            var E = r("core.SimpleTimeline", function(a) {
                C.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            f = E.prototype = new C, f.constructor = E, f.kill()._gc = !1, f._first = f._last = f._recent = null, f._sortChildren = !1, f.add = f.insert = function(a, b, c, d) {
                var e, f;
                if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)
                    for (f = a._startTime; e && e._startTime > f;) e = e._prev;
                return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
            }, f._remove = function(a, b) {
                return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, f.render = function(a, b, c) {
                var d, e = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
            }, f.rawTime = function() {
                return h || g.wake(), this._totalTime
            };
            var F = r("TweenLite", function(b, c, d) {
                    if (C.call(this, c, d), this.render = F.prototype.render, null == b) throw "Cannot tween a null target.";
                    this.target = b = "string" != typeof b ? b : F.selector(b) || b;
                    var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                        i = this.vars.overwrite;
                    if (this._overwrite = i = null == i ? T[F.defaultOverwrite] : "number" == typeof i ? i >> 0 : T[i], (h || b instanceof Array || b.push && n(b)) && "number" != typeof b[0])
                        for (this._targets = g = l(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(l(f))) : (this._siblings[e] = Y(f, this, !1), 1 === i && this._siblings[e].length > 1 && $(f, this, null, 1, this._siblings[e])) : (f = g[e--] = F.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
                    else this._propLookup = {}, this._siblings = Y(b, this, !1), 1 === i && this._siblings.length > 1 && $(b, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -k, this.render(Math.min(0, -this._delay)))
                }, !0),
                G = function(b) {
                    return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
                },
                H = function(a, b) {
                    var c, d = {};
                    for (c in a) S[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!P[c] || P[c] && P[c]._autoCSS) || (d[c] = a[c], delete a[c]);
                    a.css = d
                };
            f = F.prototype = new C, f.constructor = F, f.kill()._gc = !1, f.ratio = 0, f._firstPT = f._targets = f._overwrittenProps = f._startAt = null, f._notifyPluginsOfEnabled = f._lazy = !1, F.version = "1.18.3", F.defaultEase = f._ease = new u(null, null, 1, 1), F.defaultOverwrite = "auto", F.ticker = g, F.autoSleep = 120, F.lagSmoothing = function(a, b) {
                g.lagSmoothing(a, b)
            }, F.selector = a.$ || a.jQuery || function(b) {
                var c = a.$ || a.jQuery;
                return c ? (F.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
            };
            var I = [],
                J = {},
                K = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                L = function(a) {
                    for (var b, c = this._firstPT, d = 1e-6; c;) b = c.blob ? a ? this.join("") : this.start : c.c * a + c.s, c.r ? b = Math.round(b) : d > b && b > -d && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next
                },
                M = function(a, b, c, d) {
                    var e, f, g, h, i, j, k, l = [a, b],
                        m = 0,
                        n = "",
                        o = 0;
                    for (l.start = a, c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(K) || [], f = b.match(K) || [], d && (d._next = null, d.blob = 1, l._firstPT = d), i = f.length, h = 0; i > h; h++) k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
                        _next: l._firstPT,
                        t: l,
                        p: l.length - 1,
                        s: g,
                        c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
                        f: 0,
                        r: o && 4 > o
                    }), m += k.length;
                    return n += b.substr(m), n && l.push(n), l.setRatio = L, l
                },
                N = function(a, b, c, d, e, f, g, h) {
                    var i, j, k = "get" === c ? a[b] : c,
                        l = typeof a[b],
                        m = "string" == typeof d && "=" === d.charAt(1),
                        n = {
                            t: a,
                            p: b,
                            s: k,
                            f: "function" === l,
                            pg: 0,
                            n: e || b,
                            r: f,
                            pr: 0,
                            c: m ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - k || 0
                        };
                    return "number" !== l && ("function" === l && "get" === c && (j = b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3), n.s = k = g ? a[j](g) : a[j]()), "string" == typeof k && (g || isNaN(k)) ? (n.fp = g, i = M(k, d, h || F.defaultStringFilter, n), n = {
                        t: i,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: e || b,
                        pr: 0
                    }) : m || (n.s = parseFloat(k), n.c = parseFloat(d) - n.s || 0)), n.c ? ((n._next = this._firstPT) && (n._next._prev = n),
                        this._firstPT = n, n) : void 0
                },
                O = F._internals = {
                    isArray: n,
                    isSelector: G,
                    lazyTweens: I,
                    blobDif: M
                },
                P = F._plugins = {},
                Q = O.tweenLookup = {},
                R = 0,
                S = O.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1
                },
                T = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                U = C._rootFramesTimeline = new E,
                V = C._rootTimeline = new E,
                W = 30,
                X = O.lazyRender = function() {
                    var a, b = I.length;
                    for (J = {}; --b > -1;) a = I[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
                    I.length = 0
                };
            V._startTime = g.time, U._startTime = g.frame, V._active = U._active = !0, setTimeout(X, 1), C._updateRoot = F.render = function() {
                var a, b, c;
                if (I.length && X(), V.render((g.time - V._startTime) * V._timeScale, !1, !1), U.render((g.frame - U._startTime) * U._timeScale, !1, !1), I.length && X(), g.frame >= W) {
                    W = g.frame + (parseInt(F.autoSleep, 10) || 120);
                    for (c in Q) {
                        for (b = Q[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
                        0 === b.length && delete Q[c]
                    }
                    if (c = V._first, (!c || c._paused) && F.autoSleep && !U._first && 1 === g._listeners.tick.length) {
                        for (; c && c._paused;) c = c._next;
                        c || g.sleep()
                    }
                }
            }, g.addEventListener("tick", C._updateRoot);
            var Y = function(a, b, c) {
                    var d, e, f = a._gsTweenID;
                    if (Q[f || (a._gsTweenID = f = "t" + R++)] || (Q[f] = {
                            target: a,
                            tweens: []
                        }), b && (d = Q[f].tweens, d[e = d.length] = b, c))
                        for (; --e > -1;) d[e] === b && d.splice(e, 1);
                    return Q[f].tweens
                },
                Z = function(a, b, c, d) {
                    var e, f, g = a.vars.onOverwrite;
                    return g && (e = g(a, b, c, d)), g = F.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
                },
                $ = function(a, b, c, d, e) {
                    var f, g, h, i;
                    if (1 === d || d >= 4) {
                        for (i = e.length, f = 0; i > f; f++)
                            if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);
                            else if (5 === d) break;
                        return g
                    }
                    var j, l = b._startTime + k,
                        m = [],
                        n = 0,
                        o = 0 === b._duration;
                    for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || _(b, 0, o), 0 === _(h, j, o) && (m[n++] = h)) : h._startTime <= l && h._startTime + h.totalDuration() / h._timeScale > l && ((o || !h._initted) && l - h._startTime <= 2e-10 || (m[n++] = h)));
                    for (f = n; --f > -1;)
                        if (h = m[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
                            if (2 !== d && !Z(h, b)) continue;
                            h._enabled(!1, !1) && (g = !0)
                        }
                    return g
                },
                _ = function(a, b, c) {
                    for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                        if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
                        d = d._timeline
                    }
                    return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * k > f - b ? k : (f += a.totalDuration() / a._timeScale / e) > b + k ? 0 : f - b - k
                };
            f._init = function() {
                var a, b, c, d, e, f = this.vars,
                    g = this._overwrittenProps,
                    h = this._duration,
                    i = !!f.immediateRender,
                    j = f.ease;
                if (f.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
                    for (d in f.startAt) e[d] = f.startAt[d];
                    if (e.overwrite = !1, e.immediateRender = !0, e.lazy = i && f.lazy !== !1, e.startAt = e.delay = null, this._startAt = F.to(this.target, 0, e), i)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== h) return
                } else if (f.runBackwards && 0 !== h)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (i = !1), c = {};
                        for (d in f) S[d] && "autoCSS" !== d || (c[d] = f[d]);
                        if (c.overwrite = 0, c.data = "isFromStart", c.lazy = i && f.lazy !== !1, c.immediateRender = i, this._startAt = F.to(this.target, 0, c), i) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = j = j ? j instanceof u ? j : "function" == typeof j ? new u(j, f.easeParams) : v[j] || F.defaultEase : F.defaultEase, f.easeParams instanceof Array && j.config && (this._ease = j.config.apply(j, f.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (a = this._targets.length; --a > -1;) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], g ? g[a] : null) && (b = !0);
                else b = this._initProps(this.target, this._propLookup, this._siblings, g);
                if (b && F._onPluginEvent("_onInitAllProps", this), g && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), f.runBackwards)
                    for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
                this._onUpdate = f.onUpdate, this._initted = !0
            }, f._initProps = function(b, c, d, e) {
                var f, g, h, i, j, k;
                if (null == b) return !1;
                J[b._gsTweenID] && X(), this.vars.css || b.style && b !== a && b.nodeType && P.css && this.vars.autoCSS !== !1 && H(this.vars, b);
                for (f in this.vars)
                    if (k = this.vars[f], S[f]) k && (k instanceof Array || k.push && n(k)) && -1 !== k.join("").indexOf("{self}") && (this.vars[f] = k = this._swapSelfInParams(k, this));
                    else if (P[f] && (i = new P[f])._onInitTween(b, this.vars[f], this)) {
                    for (this._firstPT = j = {
                            _next: this._firstPT,
                            t: i,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: f,
                            pg: 1,
                            pr: i._priority
                        }, g = i._overwriteProps.length; --g > -1;) c[i._overwriteProps[g]] = this._firstPT;
                    (i._priority || i._onInitAllProps) && (h = !0), (i._onDisable || i._onEnable) && (this._notifyPluginsOfEnabled = !0), j._next && (j._next._prev = j)
                } else c[f] = N.call(this, b, f, "get", k, f, 0, null, this.vars.stringFilter);
                return e && this._kill(e, b) ? this._initProps(b, c, d, e) : this._overwrite > 1 && this._firstPT && d.length > 1 && $(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (J[b._gsTweenID] = !0), h)
            }, f.render = function(a, b, c) {
                var d, e, f, g, h = this._time,
                    i = this._duration,
                    j = this._rawPrevTime;
                if (a >= i - 1e-7) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === k && "isPause" !== this.data) && j !== a && (c = !0, j > k && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : k);
                else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== k || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : k)), this._initted || (c = !0);
                else if (this._totalTime = this._time = a, this._easeType) {
                    var l = a / i,
                        m = this._easeType,
                        n = this._easePower;
                    (1 === m || 3 === m && l >= .5) && (l = 1 - l), 3 === m && (l *= 2), 1 === n ? l *= l : 2 === n ? l *= l * l : 3 === n ? l *= l * l * l : 4 === n && (l *= l * l * l * l), 1 === m ? this.ratio = 1 - l : 2 === m ? this.ratio = l : .5 > a / i ? this.ratio = l / 2 : this.ratio = 1 - l / 2
                } else this.ratio = this._ease.getRatio(a / i);
                if (this._time !== h || c) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, I.push(this), void(this._lazy = [a, b]);
                        this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                    this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === k && g !== k && (this._rawPrevTime = 0))
                }
            }, f._kill = function(a, b, c) {
                if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                b = "string" != typeof b ? b || this._targets || this.target : F.selector(b) || b;
                var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
                if ((n(b) || G(b)) && "number" != typeof b[0])
                    for (d = b.length; --d > -1;) this._kill(a, b[d], c) && (i = !0);
                else {
                    if (this._targets) {
                        for (d = this._targets.length; --d > -1;)
                            if (b === this._targets[d]) {
                                h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                                break
                            }
                    } else {
                        if (b !== this.target) return !1;
                        h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                    }
                    if (h) {
                        if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (F.onOverwrite || this.vars.onOverwrite)) {
                            for (f in j) h[f] && (l || (l = []), l.push(f));
                            if ((l || !a) && !Z(this, c, b, l)) return !1
                        }
                        for (f in j)(g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return i
            }, f.invalidate = function() {
                return this._notifyPluginsOfEnabled && F._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -k, this.render(Math.min(0, -this._delay))), this
            }, f._enabled = function(a, b) {
                if (h || g.wake(), a && this._gc) {
                    var c, d = this._targets;
                    if (d)
                        for (c = d.length; --c > -1;) this._siblings[c] = Y(d[c], this, !0);
                    else this._siblings = Y(this.target, this, !0)
                }
                return C.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? F._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
            }, F.to = function(a, b, c) {
                return new F(a, b, c)
            }, F.from = function(a, b, c) {
                return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new F(a, b, c)
            }, F.fromTo = function(a, b, c, d) {
                return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new F(a, b, d)
            }, F.delayedCall = function(a, b, c, d, e) {
                return new F(b, 0, {
                    delay: a,
                    onComplete: b,
                    onCompleteParams: c,
                    callbackScope: d,
                    onReverseComplete: b,
                    onReverseCompleteParams: c,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: e,
                    overwrite: 0
                })
            }, F.set = function(a, b) {
                return new F(a, 0, b)
            }, F.getTweensOf = function(a, b) {
                if (null == a) return [];
                a = "string" != typeof a ? a : F.selector(a) || a;
                var c, d, e, f;
                if ((n(a) || G(a)) && "number" != typeof a[0]) {
                    for (c = a.length, d = []; --c > -1;) d = d.concat(F.getTweensOf(a[c], b));
                    for (c = d.length; --c > -1;)
                        for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
                } else
                    for (d = Y(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
                return d
            }, F.killTweensOf = F.killDelayedCallsTo = function(a, b, c) {
                "object" == typeof b && (c = b, b = !1);
                for (var d = F.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
            };
            var aa = r("plugins.TweenPlugin", function(a, b) {
                this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = aa.prototype
            }, !0);
            if (f = aa.prototype, aa.version = "1.18.0", aa.API = 2, f._firstPT = null, f._addTween = N, f.setRatio = L, f._kill = function(a) {
                    var b, c = this._overwriteProps,
                        d = this._firstPT;
                    if (null != a[this._propName]) this._overwriteProps = [];
                    else
                        for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
                    for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
                    return !1
                }, f._roundProps = function(a, b) {
                    for (var c = this._firstPT; c;)(a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")]) && (c.r = b), c = c._next
                }, F._onPluginEvent = function(a, b) {
                    var c, d, e, f, g, h = b._firstPT;
                    if ("_onInitAllProps" === a) {
                        for (; h;) {
                            for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
                            (h._prev = d ? d._prev : f) ? h._prev._next = h: e = h, (h._next = d) ? d._prev = h : f = h, h = g
                        }
                        h = b._firstPT = e
                    }
                    for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
                    return c
                }, aa.activate = function(a) {
                    for (var b = a.length; --b > -1;) a[b].API === aa.API && (P[(new a[b])._propName] = a[b]);
                    return !0
                }, q.plugin = function(a) {
                    if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
                    var b, c = a.propName,
                        d = a.priority || 0,
                        e = a.overwriteProps,
                        f = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        g = r("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
                            aa.call(this, c, d), this._overwriteProps = e || []
                        }, a.global === !0),
                        h = g.prototype = new aa(c);
                    h.constructor = g, g.API = a.API;
                    for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
                    return g.version = a.version, aa.activate([g]), g
                }, d = a._gsQueue) {
                for (e = 0; e < d.length; e++) d[e]();
                for (f in o) o[f].func || a.console.log("GSAP encountered missing dependency: com.greensock." + f)
            }
            h = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");

/*
jquery-circle-progress - jQuery Plugin to draw animated circular progress bars

URL: http://kottenator.github.io/jquery-circle-progress/
Author: Rostyslav Bryzgunov <kottenator@gmail.com>
Version: 1.1.3
License: MIT
*/
(function($) {
    function CircleProgress(config) {
        this.init(config);
    }

    CircleProgress.prototype = {
        //----------------------------------------------- public options -----------------------------------------------
        /**
         * This is the only required option. It should be from 0.0 to 1.0
         * @type {number}
         */
        value: 0.0,

        /**
         * Size of the circle / canvas in pixels
         * @type {number}
         */
        size: 100.0,

        /**
         * Initial angle for 0.0 value in radians
         * @type {number}
         */
        startAngle: -Math.PI,

        /**
         * Width of the arc. By default it's auto-calculated as 1/14 of size, but you may set it explicitly in pixels
         * @type {number|string}
         */
        thickness: 'auto',

        /**
         * Fill of the arc. You may set it to:
         *   - solid color:
         *     - { color: '#3aeabb' }
         *     - { color: 'rgba(255, 255, 255, .3)' }
         *   - linear gradient (left to right):
         *     - { gradient: ['#3aeabb', '#fdd250'], gradientAngle: Math.PI / 4 }
         *     - { gradient: ['red', 'green', 'blue'], gradientDirection: [x0, y0, x1, y1] }
         *   - image:
         *     - { image: 'http://i.imgur.com/pT0i89v.png' }
         *     - { image: imageObject }
         *     - { color: 'lime', image: 'http://i.imgur.com/pT0i89v.png' } - color displayed until the image is loaded
         */
        fill: {
            gradient: ['#3aeabb', '#fdd250']
        },

        /**
         * Color of the "empty" arc. Only a color fill supported by now
         * @type {string}
         */
        emptyFill: 'rgba(255, 64, 64, 1)',

        /**
         * Animation config (see jQuery animations: http://api.jquery.com/animate/)
         */
        animation: {
            duration: 1200,
            easing: 'circleProgressEasing'
        },

        /**
         * Default animation starts at 0.0 and ends at specified `value`. Let's call this direct animation.
         * If you want to make reversed animation then you should set `animationStartValue` to 1.0.
         * Also you may specify any other value from 0.0 to 1.0
         * @type {number}
         */
        animationStartValue: 0.0,

        /**
         * Reverse animation and arc draw
         * @type {boolean}
         */
        reverse: false,

        /**
         * Arc line cap ('butt', 'round' or 'square')
         * Read more: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineCap
         * @type {string}
         */
        lineCap: 'butt',

        //-------------------------------------- protected properties and methods --------------------------------------
        /**
         * @protected
         */
        constructor: CircleProgress,

        /**
         * Container element. Should be passed into constructor config
         * @protected
         * @type {jQuery}
         */
        el: null,

        /**
         * Canvas element. Automatically generated and prepended to the {@link CircleProgress.el container}
         * @protected
         * @type {HTMLCanvasElement}
         */
        canvas: null,

        /**
         * 2D-context of the {@link CircleProgress.canvas canvas}
         * @protected
         * @type {CanvasRenderingContext2D}
         */
        ctx: null,

        /**
         * Radius of the outer circle. Automatically calculated as {@link CircleProgress.size} / 2
         * @protected
         * @type {number}
         */
        radius: 0.0,

        /**
         * Fill of the main arc. Automatically calculated, depending on {@link CircleProgress.fill} option
         * @protected
         * @type {string|CanvasGradient|CanvasPattern}
         */
        arcFill: null,

        /**
         * Last rendered frame value
         * @protected
         * @type {number}
         */
        lastFrameValue: 0.0,

        /**
         * Init/re-init the widget
         * @param {object} config - Config
         */
        init: function(config) {
            $.extend(this, config);
            this.radius = this.size / 2;
            this.initWidget();
            this.initFill();
            this.draw();
        },

        /**
         * @protected
         */
        initWidget: function() {
            var canvas = this.canvas = this.canvas || $('<canvas>').prependTo(this.el)[0];
            canvas.width = this.size;
            canvas.height = this.size;
            this.ctx = canvas.getContext('2d');
        },

        /**
         * This method sets {@link CircleProgress.arcFill}
         * It could do this async (on image load)
         * @protected
         */
        initFill: function() {
            var self = this,
                fill = this.fill,
                ctx = this.ctx,
                size = this.size;

            if (!fill)
                throw Error("The fill is not specified!");

            if (fill.color)
                this.arcFill = fill.color;

            if (fill.gradient) {
                var gr = fill.gradient;

                if (gr.length == 1) {
                    this.arcFill = gr[0];
                } else if (gr.length > 1) {
                    var ga = fill.gradientAngle || 0, // gradient direction angle; 0 by default
                        gd = fill.gradientDirection || [
                            size / 2 * (1 - Math.cos(ga)), // x0
                            size / 2 * (1 + Math.sin(ga)), // y0
                            size / 2 * (1 + Math.cos(ga)), // x1
                            size / 2 * (1 - Math.sin(ga)) // y1
                        ];

                    var lg = ctx.createLinearGradient.apply(ctx, gd);

                    for (var i = 0; i < gr.length; i++) {
                        var color = gr[i],
                            pos = i / (gr.length - 1);

                        if ($.isArray(color)) {
                            pos = color[1];
                            color = color[0];
                        }

                        lg.addColorStop(pos, color);
                    }

                    this.arcFill = lg;
                }
            }

            if (fill.image) {
                var img;

                if (fill.image instanceof Image) {
                    img = fill.image;
                } else {
                    img = new Image();
                    img.src = fill.image;
                }

                if (img.complete)
                    setImageFill();
                else
                    img.onload = setImageFill;
            }

            function setImageFill() {
                var bg = $('<canvas>')[0];
                bg.width = self.size;
                bg.height = self.size;
                bg.getContext('2d').drawImage(img, 0, 0, size, size);
                self.arcFill = self.ctx.createPattern(bg, 'no-repeat');
                self.drawFrame(self.lastFrameValue);
            }
        },

        draw: function() {
            if (this.animation)
                this.drawAnimated(this.value);
            else
                this.drawFrame(this.value);
        },

        /**
         * @protected
         * @param {number} v - Frame value
         */
        drawFrame: function(v) {
            this.lastFrameValue = v;
            this.ctx.clearRect(0, 0, this.size, this.size);
            this.drawEmptyArc(v);
            this.drawArc(v);
        },

        /**
         * @protected
         * @param {number} v - Frame value
         */
        drawArc: function(v) {
            var ctx = this.ctx,
                r = this.radius,
                t = this.getThickness(),
                a = this.startAngle;

            ctx.save();
            ctx.beginPath();

            if (!this.reverse) {
                ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v);
            } else {
                ctx.arc(r, r, r - t / 2, a - Math.PI * 2 * v, a);
            }

            ctx.lineWidth = t;
            ctx.lineCap = this.lineCap;
            ctx.strokeStyle = this.arcFill;
            ctx.stroke();
            ctx.restore();
        },

        /**
         * @protected
         * @param {number} v - Frame value
         */
        drawEmptyArc: function(v) {
            var ctx = this.ctx,
                r = this.radius,
                t = this.getThickness(),
                a = this.startAngle;

            if (v < 1) {
                ctx.save();
                ctx.beginPath();

                if (v <= 0) {
                    ctx.arc(r, r, r - t / 2, 0, Math.PI * 2);
                } else {
                    if (!this.reverse) {
                        ctx.arc(r, r, r - t / 2, a + Math.PI * 2 * v, a);
                    } else {
                        ctx.arc(r, r, r - t / 2, a, a - Math.PI * 2 * v);
                    }
                }

                ctx.lineWidth = t;
                ctx.strokeStyle = this.emptyFill;
                ctx.stroke();
                ctx.restore();
            }
        },

        /**
         * @protected
         * @param {number} v - Value
         */
        drawAnimated: function(v) {
            var self = this,
                el = this.el,
                canvas = $(this.canvas);

            // stop previous animation before new "start" event is triggered
            canvas.stop(true, false);
            el.trigger('circle-animation-start');

            canvas
                .css({
                    animationProgress: 0
                })
                .animate({
                    animationProgress: 1
                }, $.extend({}, this.animation, {
                    step: function(animationProgress) {
                        var stepValue = self.animationStartValue * (1 - animationProgress) + v * animationProgress;
                        self.drawFrame(stepValue);
                        el.trigger('circle-animation-progress', [animationProgress, stepValue]);
                    }
                }))
                .promise()
                .always(function() {
                    // trigger on both successful & failure animation end
                    el.trigger('circle-animation-end');
                });
        },

        /**
         * @protected
         * @returns {number}
         */
        getThickness: function() {
            return $.isNumeric(this.thickness) ? this.thickness : this.size / 14;
        },

        getValue: function() {
            return this.value;
        },

        setValue: function(newValue) {
            if (this.animation)
                this.animationStartValue = this.lastFrameValue;
            this.value = newValue;
            this.draw();
        }
    };

    //-------------------------------------------- Initiating jQuery plugin --------------------------------------------
    $.circleProgress = {
        // Default options (you may override them)
        defaults: CircleProgress.prototype
    };

    // ease-in-out-cubic
    $.easing.circleProgressEasing = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    /**
     * Draw animated circular progress bar.
     *
     * Appends <canvas> to the element or updates already appended one.
     *
     * If animated, throws 3 events:
     *
     *   - circle-animation-start(jqEvent)
     *   - circle-animation-progress(jqEvent, animationProgress, stepValue) - multiple event;
     *                                                                        animationProgress: from 0.0 to 1.0;
     *                                                                        stepValue: from 0.0 to value
     *   - circle-animation-end(jqEvent)
     *
     * @param configOrCommand - Config object or command name
     *     Example: { value: 0.75, size: 50, animation: false };
     *     you may set any public property (see above);
     *     `animation` may be set to false;
     *     you may use .circleProgress('widget') to get the canvas
     *     you may use .circleProgress('value', newValue) to dynamically update the value
     *
     * @param commandArgument - Some commands (like 'value') may require an argument
     */
    $.fn.circleProgress = function(configOrCommand, commandArgument) {
        var dataName = 'circle-progress',
            firstInstance = this.data(dataName);

        if (configOrCommand == 'widget') {
            if (!firstInstance)
                throw Error('Calling "widget" method on not initialized instance is forbidden');
            return firstInstance.canvas;
        }

        if (configOrCommand == 'value') {
            if (!firstInstance)
                throw Error('Calling "value" method on not initialized instance is forbidden');
            if (typeof commandArgument == 'undefined') {
                return firstInstance.getValue();
            } else {
                var newValue = arguments[1];
                return this.each(function() {
                    $(this).data(dataName).setValue(newValue);
                });
            }
        }

        return this.each(function() {
            var el = $(this),
                instance = el.data(dataName),
                config = $.isPlainObject(configOrCommand) ? configOrCommand : {};

            if (instance) {
                instance.init(config);
            } else {
                var initialConfig = $.extend({}, el.data());
                if (typeof initialConfig.fill == 'string')
                    initialConfig.fill = JSON.parse(initialConfig.fill);
                if (typeof initialConfig.animation == 'string')
                    initialConfig.animation = JSON.parse(initialConfig.animation);
                config = $.extend(initialConfig, config);
                config.el = el;
                instance = new CircleProgress(config);
                el.data(dataName, instance);
            }
        });
    };
})(jQuery);

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
! function(a, b, c, d) {
    "use strict";

    function e(a, b, c) {
        return setTimeout(k(a, c), b)
    }

    function f(a, b, c) {
        return Array.isArray(a) ? (g(a, c[b], c), !0) : !1
    }

    function g(a, b, c) {
        var e;
        if (a)
            if (a.forEach) a.forEach(b, c);
            else if (a.length !== d)
            for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
        else
            for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
    }

    function h(a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
        return a
    }

    function i(a, b) {
        return h(a, b, !0)
    }

    function j(a, b, c) {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c)
    }

    function k(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }

    function l(a, b) {
        return typeof a == kb ? a.apply(b ? b[0] || d : d, b) : a
    }

    function m(a, b) {
        return a === d ? b : a
    }

    function n(a, b, c) {
        g(r(b), function(b) {
            a.addEventListener(b, c, !1)
        })
    }

    function o(a, b, c) {
        g(r(b), function(b) {
            a.removeEventListener(b, c, !1)
        })
    }

    function p(a, b) {
        for (; a;) {
            if (a == b) return !0;
            a = a.parentNode
        }
        return !1
    }

    function q(a, b) {
        return a.indexOf(b) > -1
    }

    function r(a) {
        return a.trim().split(/\s+/g)
    }

    function s(a, b, c) {
        if (a.indexOf && !c) return a.indexOf(b);
        for (var d = 0; d < a.length;) {
            if (c && a[d][c] == b || !c && a[d] === b) return d;
            d++
        }
        return -1
    }

    function t(a) {
        return Array.prototype.slice.call(a, 0)
    }

    function u(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length;) {
            var g = b ? a[f][b] : a[f];
            s(e, g) < 0 && d.push(a[f]), e[f] = g, f++
        }
        return c && (d = b ? d.sort(function(a, c) {
            return a[b] > c[b]
        }) : d.sort()), d
    }

    function v(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ib.length;) {
            if (c = ib[g], e = c ? c + f : b, e in a) return e;
            g++
        }
        return d
    }

    function w() {
        return ob++
    }

    function x(a) {
        var b = a.ownerDocument;
        return b.defaultView || b.parentWindow
    }

    function y(a, b) {
        var c = this;
        this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) {
            l(a.options.enable, [a]) && c.handler(b)
        }, this.init()
    }

    function z(a) {
        var b, c = a.options.inputClass;
        return new(b = c ? c : rb ? N : sb ? Q : qb ? S : M)(a, A)
    }

    function A(a, b, c) {
        var d = c.pointers.length,
            e = c.changedPointers.length,
            f = b & yb && d - e === 0,
            g = b & (Ab | Bb) && d - e === 0;
        c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
    }

    function B(a, b) {
        var c = a.session,
            d = b.pointers,
            e = d.length;
        c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput,
            g = c.firstMultiple,
            h = g ? g.center : f.center,
            i = b.center = F(d);
        b.timeStamp = nb(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
        var j = a.element;
        p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j
    }

    function C(a, b) {
        var c = b.center,
            d = a.offsetDelta || {},
            e = a.prevDelta || {},
            f = a.prevInput || {};
        (b.eventType === yb || f.eventType === Ab) && (e = a.prevDelta = {
            x: f.deltaX || 0,
            y: f.deltaY || 0
        }, d = a.offsetDelta = {
            x: c.x,
            y: c.y
        }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
    }

    function D(a, b) {
        var c, e, f, g, h = a.lastInterval || b,
            i = b.timeStamp - h.timeStamp;
        if (b.eventType != Bb && (i > xb || h.velocity === d)) {
            var j = h.deltaX - b.deltaX,
                k = h.deltaY - b.deltaY,
                l = G(i, j, k);
            e = l.x, f = l.y, c = mb(l.x) > mb(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b
        } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
        b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
    }

    function E(a) {
        for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
            clientX: lb(a.pointers[c].clientX),
            clientY: lb(a.pointers[c].clientY)
        }, c++;
        return {
            timeStamp: nb(),
            pointers: b,
            center: F(b),
            deltaX: a.deltaX,
            deltaY: a.deltaY
        }
    }

    function F(a) {
        var b = a.length;
        if (1 === b) return {
            x: lb(a[0].clientX),
            y: lb(a[0].clientY)
        };
        for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;
        return {
            x: lb(c / b),
            y: lb(d / b)
        }
    }

    function G(a, b, c) {
        return {
            x: b / a || 0,
            y: c / a || 0
        }
    }

    function H(a, b) {
        return a === b ? Cb : mb(a) >= mb(b) ? a > 0 ? Db : Eb : b > 0 ? Fb : Gb
    }

    function I(a, b, c) {
        c || (c = Kb);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e)
    }

    function J(a, b, c) {
        c || (c = Kb);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI
    }

    function K(a, b) {
        return J(b[1], b[0], Lb) - J(a[1], a[0], Lb)
    }

    function L(a, b) {
        return I(b[0], b[1], Lb) / I(a[0], a[1], Lb)
    }

    function M() {
        this.evEl = Nb, this.evWin = Ob, this.allow = !0, this.pressed = !1, y.apply(this, arguments)
    }

    function N() {
        this.evEl = Rb, this.evWin = Sb, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }

    function O() {
        this.evTarget = Ub, this.evWin = Vb, this.started = !1, y.apply(this, arguments)
    }

    function P(a, b) {
        var c = t(a.touches),
            d = t(a.changedTouches);
        return b & (Ab | Bb) && (c = u(c.concat(d), "identifier", !0)), [c, d]
    }

    function Q() {
        this.evTarget = Xb, this.targetIds = {}, y.apply(this, arguments)
    }

    function R(a, b) {
        var c = t(a.touches),
            d = this.targetIds;
        if (b & (yb | zb) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
        var e, f, g = t(a.changedTouches),
            h = [],
            i = this.target;
        if (f = c.filter(function(a) {
                return p(a.target, i)
            }), b === yb)
            for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
        for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ab | Bb) && delete d[g[e].identifier], e++;
        return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0
    }

    function S() {
        y.apply(this, arguments);
        var a = k(this.handler, this);
        this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a)
    }

    function T(a, b) {
        this.manager = a, this.set(b)
    }

    function U(a) {
        if (q(a, bc)) return bc;
        var b = q(a, cc),
            c = q(a, dc);
        return b && c ? cc + " " + dc : b || c ? b ? cc : dc : q(a, ac) ? ac : _b
    }

    function V(a) {
        this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), this.state = ec, this.simultaneous = {}, this.requireFail = []
    }

    function W(a) {
        return a & jc ? "cancel" : a & hc ? "end" : a & gc ? "move" : a & fc ? "start" : ""
    }

    function X(a) {
        return a == Gb ? "down" : a == Fb ? "up" : a == Db ? "left" : a == Eb ? "right" : ""
    }

    function Y(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a
    }

    function Z() {
        V.apply(this, arguments)
    }

    function $() {
        Z.apply(this, arguments), this.pX = null, this.pY = null
    }

    function _() {
        Z.apply(this, arguments)
    }

    function ab() {
        V.apply(this, arguments), this._timer = null, this._input = null
    }

    function bb() {
        Z.apply(this, arguments)
    }

    function cb() {
        Z.apply(this, arguments)
    }

    function db() {
        V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }

    function eb(a, b) {
        return b = b || {}, b.recognizers = m(b.recognizers, eb.defaults.preset), new fb(a, b)
    }

    function fb(a, b) {
        b = b || {}, this.options = i(b, eb.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = z(this), this.touchAction = new T(this, this.options.touchAction), gb(this, !0), g(b.recognizers, function(a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
        }, this)
    }

    function gb(a, b) {
        var c = a.element;
        g(a.options.cssProps, function(a, d) {
            c.style[v(c.style, d)] = b ? a : ""
        })
    }

    function hb(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
    }
    var ib = ["", "webkit", "moz", "MS", "ms", "o"],
        jb = b.createElement("div"),
        kb = "function",
        lb = Math.round,
        mb = Math.abs,
        nb = Date.now,
        ob = 1,
        pb = /mobile|tablet|ip(ad|hone|od)|android/i,
        qb = "ontouchstart" in a,
        rb = v(a, "PointerEvent") !== d,
        sb = qb && pb.test(navigator.userAgent),
        tb = "touch",
        ub = "pen",
        vb = "mouse",
        wb = "kinect",
        xb = 25,
        yb = 1,
        zb = 2,
        Ab = 4,
        Bb = 8,
        Cb = 1,
        Db = 2,
        Eb = 4,
        Fb = 8,
        Gb = 16,
        Hb = Db | Eb,
        Ib = Fb | Gb,
        Jb = Hb | Ib,
        Kb = ["x", "y"],
        Lb = ["clientX", "clientY"];
    y.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(x(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), this.evWin && o(x(this.element), this.evWin, this.domHandler)
        }
    };
    var Mb = {
            mousedown: yb,
            mousemove: zb,
            mouseup: Ab
        },
        Nb = "mousedown",
        Ob = "mousemove mouseup";
    j(M, y, {
        handler: function(a) {
            var b = Mb[a.type];
            b & yb && 0 === a.button && (this.pressed = !0), b & zb && 1 !== a.which && (b = Ab), this.pressed && this.allow && (b & Ab && (this.pressed = !1), this.callback(this.manager, b, {
                pointers: [a],
                changedPointers: [a],
                pointerType: vb,
                srcEvent: a
            }))
        }
    });
    var Pb = {
            pointerdown: yb,
            pointermove: zb,
            pointerup: Ab,
            pointercancel: Bb,
            pointerout: Bb
        },
        Qb = {
            2: tb,
            3: ub,
            4: vb,
            5: wb
        },
        Rb = "pointerdown",
        Sb = "pointermove pointerup pointercancel";
    a.MSPointerEvent && (Rb = "MSPointerDown", Sb = "MSPointerMove MSPointerUp MSPointerCancel"), j(N, y, {
        handler: function(a) {
            var b = this.store,
                c = !1,
                d = a.type.toLowerCase().replace("ms", ""),
                e = Pb[d],
                f = Qb[a.pointerType] || a.pointerType,
                g = f == tb,
                h = s(b, a.pointerId, "pointerId");
            e & yb && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ab | Bb) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [a],
                pointerType: f,
                srcEvent: a
            }), c && b.splice(h, 1))
        }
    });
    var Tb = {
            touchstart: yb,
            touchmove: zb,
            touchend: Ab,
            touchcancel: Bb
        },
        Ub = "touchstart",
        Vb = "touchstart touchmove touchend touchcancel";
    j(O, y, {
        handler: function(a) {
            var b = Tb[a.type];
            if (b === yb && (this.started = !0), this.started) {
                var c = P.call(this, a, b);
                b & (Ab | Bb) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: tb,
                    srcEvent: a
                })
            }
        }
    });
    var Wb = {
            touchstart: yb,
            touchmove: zb,
            touchend: Ab,
            touchcancel: Bb
        },
        Xb = "touchstart touchmove touchend touchcancel";
    j(Q, y, {
        handler: function(a) {
            var b = Wb[a.type],
                c = R.call(this, a, b);
            c && this.callback(this.manager, b, {
                pointers: c[0],
                changedPointers: c[1],
                pointerType: tb,
                srcEvent: a
            })
        }
    }), j(S, y, {
        handler: function(a, b, c) {
            var d = c.pointerType == tb,
                e = c.pointerType == vb;
            if (d) this.mouse.allow = !1;
            else if (e && !this.mouse.allow) return;
            b & (Ab | Bb) && (this.mouse.allow = !0), this.callback(a, b, c)
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var Yb = v(jb.style, "touchAction"),
        Zb = Yb !== d,
        $b = "compute",
        _b = "auto",
        ac = "manipulation",
        bc = "none",
        cc = "pan-x",
        dc = "pan-y";
    T.prototype = {
        set: function(a) {
            a == $b && (a = this.compute()), Zb && (this.manager.element.style[Yb] = a), this.actions = a.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var a = [];
            return g(this.manager.recognizers, function(b) {
                l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
            }), U(a.join(" "))
        },
        preventDefaults: function(a) {
            if (!Zb) {
                var b = a.srcEvent,
                    c = a.offsetDirection;
                if (this.manager.session.prevented) return void b.preventDefault();
                var d = this.actions,
                    e = q(d, bc),
                    f = q(d, dc),
                    g = q(d, cc);
                return e || f && c & Hb || g && c & Ib ? this.preventSrc(b) : void 0
            }
        },
        preventSrc: function(a) {
            this.manager.session.prevented = !0, a.preventDefault()
        }
    };
    var ec = 1,
        fc = 2,
        gc = 4,
        hc = 8,
        ic = hc,
        jc = 16,
        kc = 32;
    V.prototype = {
        defaults: {},
        set: function(a) {
            return h(this.options, a), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function(a) {
            if (f(a, "recognizeWith", this)) return this;
            var b = this.simultaneous;
            return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
        },
        dropRecognizeWith: function(a) {
            return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], this)
        },
        requireFailure: function(a) {
            if (f(a, "requireFailure", this)) return this;
            var b = this.requireFail;
            return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this
        },
        dropRequireFailure: function(a) {
            if (f(a, "dropRequireFailure", this)) return this;
            a = Y(a, this);
            var b = s(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1), this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(a) {
            return !!this.simultaneous[a.id]
        },
        emit: function(a) {
            function b(b) {
                c.manager.emit(c.options.event + (b ? W(d) : ""), a)
            }
            var c = this,
                d = this.state;
            hc > d && b(!0), b(), d >= hc && b(!0)
        },
        tryEmit: function(a) {
            return this.canEmit() ? this.emit(a) : void(this.state = kc)
        },
        canEmit: function() {
            for (var a = 0; a < this.requireFail.length;) {
                if (!(this.requireFail[a].state & (kc | ec))) return !1;
                a++
            }
            return !0
        },
        recognize: function(a) {
            var b = h({}, a);
            return l(this.options.enable, [this, b]) ? (this.state & (ic | jc | kc) && (this.state = ec), this.state = this.process(b), void(this.state & (fc | gc | hc | jc) && this.tryEmit(b))) : (this.reset(), void(this.state = kc))
        },
        process: function() {},
        getTouchAction: function() {},
        reset: function() {}
    }, j(Z, V, {
        defaults: {
            pointers: 1
        },
        attrTest: function(a) {
            var b = this.options.pointers;
            return 0 === b || a.pointers.length === b
        },
        process: function(a) {
            var b = this.state,
                c = a.eventType,
                d = b & (fc | gc),
                e = this.attrTest(a);
            return d && (c & Bb || !e) ? b | jc : d || e ? c & Ab ? b | hc : b & fc ? b | gc : fc : kc
        }
    }), j($, Z, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Jb
        },
        getTouchAction: function() {
            var a = this.options.direction,
                b = [];
            return a & Hb && b.push(dc), a & Ib && b.push(cc), b
        },
        directionTest: function(a) {
            var b = this.options,
                c = !0,
                d = a.distance,
                e = a.direction,
                f = a.deltaX,
                g = a.deltaY;
            return e & b.direction || (b.direction & Hb ? (e = 0 === f ? Cb : 0 > f ? Db : Eb, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Cb : 0 > g ? Fb : Gb, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
        },
        attrTest: function(a) {
            return Z.prototype.attrTest.call(this, a) && (this.state & fc || !(this.state & fc) && this.directionTest(a))
        },
        emit: function(a) {
            this.pX = a.deltaX, this.pY = a.deltaY;
            var b = X(a.direction);
            b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a)
        }
    }), j(_, Z, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [bc]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fc)
        },
        emit: function(a) {
            if (this._super.emit.call(this, a), 1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + b, a)
            }
        }
    }), j(ab, V, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 500,
            threshold: 5
        },
        getTouchAction: function() {
            return [_b]
        },
        process: function(a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                f = a.deltaTime > b.time;
            if (this._input = a, !d || !c || a.eventType & (Ab | Bb) && !f) this.reset();
            else if (a.eventType & yb) this.reset(), this._timer = e(function() {
                this.state = ic, this.tryEmit()
            }, b.time, this);
            else if (a.eventType & Ab) return ic;
            return kc
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(a) {
            this.state === ic && (a && a.eventType & Ab ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = nb(), this.manager.emit(this.options.event, this._input)))
        }
    }), j(bb, Z, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [bc]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fc)
        }
    }), j(cb, Z, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .65,
            direction: Hb | Ib,
            pointers: 1
        },
        getTouchAction: function() {
            return $.prototype.getTouchAction.call(this)
        },
        attrTest: function(a) {
            var b, c = this.options.direction;
            return c & (Hb | Ib) ? b = a.velocity : c & Hb ? b = a.velocityX : c & Ib && (b = a.velocityY), this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && mb(b) > this.options.velocity && a.eventType & Ab
        },
        emit: function(a) {
            var b = X(a.direction);
            b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
        }
    }), j(db, V, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 2,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [ac]
        },
        process: function(a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                f = a.deltaTime < b.time;
            if (this.reset(), a.eventType & yb && 0 === this.count) return this.failTimeout();
            if (d && f && c) {
                if (a.eventType != Ab) return this.failTimeout();
                var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                    h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                var i = this.count % b.taps;
                if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                    this.state = ic, this.tryEmit()
                }, b.interval, this), fc) : ic
            }
            return kc
        },
        failTimeout: function() {
            return this._timer = e(function() {
                this.state = kc
            }, this.options.interval, this), kc
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == ic && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), eb.VERSION = "2.0.4", eb.defaults = {
        domEvents: !1,
        touchAction: $b,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
            [bb, {
                enable: !1
            }],
            [_, {
                    enable: !1
                },
                ["rotate"]
            ],
            [cb, {
                direction: Hb
            }],
            [$, {
                    direction: Hb
                },
                ["swipe"]
            ],
            [db],
            [db, {
                    event: "doubletap",
                    taps: 2
                },
                ["tap"]
            ],
            [ab]
        ],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var lc = 1,
        mc = 2;
    fb.prototype = {
        set: function(a) {
            return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
        },
        stop: function(a) {
            this.session.stopped = a ? mc : lc
        },
        recognize: function(a) {
            var b = this.session;
            if (!b.stopped) {
                this.touchAction.preventDefaults(a);
                var c, d = this.recognizers,
                    e = b.curRecognizer;
                (!e || e && e.state & ic) && (e = b.curRecognizer = null);
                for (var f = 0; f < d.length;) c = d[f], b.stopped === mc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (fc | gc | hc) && (e = b.curRecognizer = c), f++
            }
        },
        get: function(a) {
            if (a instanceof V) return a;
            for (var b = this.recognizers, c = 0; c < b.length; c++)
                if (b[c].options.event == a) return b[c];
            return null
        },
        add: function(a) {
            if (f(a, "add", this)) return this;
            var b = this.get(a.options.event);
            return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
        },
        remove: function(a) {
            if (f(a, "remove", this)) return this;
            var b = this.recognizers;
            return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this
        },
        on: function(a, b) {
            var c = this.handlers;
            return g(r(a), function(a) {
                c[a] = c[a] || [], c[a].push(b)
            }), this
        },
        off: function(a, b) {
            var c = this.handlers;
            return g(r(a), function(a) {
                b ? c[a].splice(s(c[a], b), 1) : delete c[a]
            }), this
        },
        emit: function(a, b) {
            this.options.domEvents && hb(a, b);
            var c = this.handlers[a] && this.handlers[a].slice();
            if (c && c.length) {
                b.type = a, b.preventDefault = function() {
                    b.srcEvent.preventDefault()
                };
                for (var d = 0; d < c.length;) c[d](b), d++
            }
        },
        destroy: function() {
            this.element && gb(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, h(eb, {
        INPUT_START: yb,
        INPUT_MOVE: zb,
        INPUT_END: Ab,
        INPUT_CANCEL: Bb,
        STATE_POSSIBLE: ec,
        STATE_BEGAN: fc,
        STATE_CHANGED: gc,
        STATE_ENDED: hc,
        STATE_RECOGNIZED: ic,
        STATE_CANCELLED: jc,
        STATE_FAILED: kc,
        DIRECTION_NONE: Cb,
        DIRECTION_LEFT: Db,
        DIRECTION_RIGHT: Eb,
        DIRECTION_UP: Fb,
        DIRECTION_DOWN: Gb,
        DIRECTION_HORIZONTAL: Hb,
        DIRECTION_VERTICAL: Ib,
        DIRECTION_ALL: Jb,
        Manager: fb,
        Input: y,
        TouchAction: T,
        TouchInput: Q,
        MouseInput: M,
        PointerEventInput: N,
        TouchMouseInput: S,
        SingleTouchInput: O,
        Recognizer: V,
        AttrRecognizer: Z,
        Tap: db,
        Pan: $,
        Swipe: cb,
        Pinch: _,
        Rotate: bb,
        Press: ab,
        on: n,
        off: o,
        each: g,
        merge: i,
        extend: h,
        inherit: j,
        bindFn: k,
        prefixed: v
    }), typeof define == kb && define.amd ? define(function() {
        return eb
    }) : "undefined" != typeof module && module.exports ? module.exports = eb : a[c] = eb
}(window, document, "Hammer");
//# sourceMappingURL=hammer.min.map
/*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */

(function(e, t, n) {
    typeof define == "function" && define.amd ? define(["jquery"], function(r) {
        return n(r, e, t), r.mobile
    }) : n(e.jQuery, e, t)
})(this, document, function(e, t, n, r) {
    (function(e, t, r) {
        "$:nomunge";

        function l(e) {
            return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1")
        }
        var i = "hashchange",
            s = n,
            o, u = e.event.special,
            a = s.documentMode,
            f = "on" + i in t && (a === r || a > 7);
        e.fn[i] = function(e) {
            return e ? this.bind(i, e) : this.trigger(i)
        }, e.fn[i].delay = 50, u[i] = e.extend(u[i], {
            setup: function() {
                if (f) return !1;
                e(o.start)
            },
            teardown: function() {
                if (f) return !1;
                e(o.stop)
            }
        }), o = function() {
            function p() {
                var n = l(),
                    r = h(u);
                n !== u ? (c(u = n, r), e(t).trigger(i)) : r !== u && (location.href = location.href.replace(/#.*/, "") + r), o = setTimeout(p, e.fn[i].delay)
            }
            var n = {},
                o, u = l(),
                a = function(e) {
                    return e
                },
                c = a,
                h = a;
            return n.start = function() {
                o || p()
            }, n.stop = function() {
                o && clearTimeout(o), o = r
            }, t.attachEvent && !t.addEventListener && !f && function() {
                var t, r;
                n.start = function() {
                    t || (r = e.fn[i].src, r = r && r + l(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                        r || c(l()), p()
                    }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow, s.onpropertychange = function() {
                        try {
                            event.propertyName === "title" && (t.document.title = s.title)
                        } catch (e) {}
                    })
                }, n.stop = a, h = function() {
                    return l(t.location.href)
                }, c = function(n, r) {
                    var o = t.document,
                        u = e.fn[i].domain;
                    n !== r && (o.title = s.title, o.open(), u && o.write('<script>document.domain="' + u + '"</script>'), o.close(), t.location.hash = n)
                }
            }(), n
        }()
    })(e, this),
    function(e) {
        e.mobile = {}
    }(e),
    function(e, t, n) {
        e.extend(e.mobile, {
            version: "1.4.5",
            subPageUrlKey: "ui-page",
            hideUrlBar: !0,
            keepNative: ":jqmData(role='none'), :jqmData(role='nojs')",
            activePageClass: "ui-page-active",
            activeBtnClass: "ui-btn-active",
            focusClass: "ui-focus",
            ajaxEnabled: !0,
            hashListeningEnabled: !0,
            linkBindingEnabled: !0,
            defaultPageTransition: "fade",
            maxTransitionWidth: !1,
            minScrollBack: 0,
            defaultDialogTransition: "pop",
            pageLoadErrorMessage: "Error Loading Page",
            pageLoadErrorMessageTheme: "a",
            phonegapNavigationEnabled: !1,
            autoInitializePage: !0,
            pushStateEnabled: !0,
            ignoreContentEnabled: !1,
            buttonMarkup: {
                hoverDelay: 200
            },
            dynamicBaseEnabled: !0,
            pageContainer: e(),
            allowCrossDomainPages: !1,
            dialogHashKey: "&ui-state=dialog"
        })
    }(e, this),
    function(e, t, n) {
        var r = {},
            i = e.find,
            s = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            o = /:jqmData\(([^)]*)\)/g;
        e.extend(e.mobile, {
            ns: "",
            getAttribute: function(t, n) {
                var r;
                t = t.jquery ? t[0] : t, t && t.getAttribute && (r = t.getAttribute("data-" + e.mobile.ns + n));
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : s.test(r) ? JSON.parse(r) : r
                } catch (i) {}
                return r
            },
            nsNormalizeDict: r,
            nsNormalize: function(t) {
                return r[t] || (r[t] = e.camelCase(e.mobile.ns + t))
            },
            closestPageData: function(e) {
                return e.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")
            }
        }), e.fn.jqmData = function(t, r) {
            var i;
            return typeof t != "undefined" && (t && (t = e.mobile.nsNormalize(t)), arguments.length < 2 || r === n ? i = this.data(t) : i = this.data(t, r)), i
        }, e.jqmData = function(t, n, r) {
            var i;
            return typeof n != "undefined" && (i = e.data(t, n ? e.mobile.nsNormalize(n) : n, r)), i
        }, e.fn.jqmRemoveData = function(t) {
            return this.removeData(e.mobile.nsNormalize(t))
        }, e.jqmRemoveData = function(t, n) {
            return e.removeData(t, e.mobile.nsNormalize(n))
        }, e.find = function(t, n, r, s) {
            return t.indexOf(":jqmData") > -1 && (t = t.replace(o, "[data-" + (e.mobile.ns || "") + "$1]")), i.call(this, t, n, r, s)
        }, e.extend(e.find, i)
    }(e, this),
    function(e, t) {
        function s(t, n) {
            var r, i, s, u = t.nodeName.toLowerCase();
            return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (s = e("img[usemap=#" + i + "]")[0], !!s && o(s))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && o(t)
        }

        function o(t) {
            return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
                return e.css(this, "visibility") === "hidden"
            }).length
        }
        var r = 0,
            i = /^ui-id-\d+$/;
        e.ui = e.ui || {}, e.extend(e.ui, {
            version: "c0ab71056b936627e8a7821f03c044aec6280a40",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), e.fn.extend({
            focus: function(t) {
                return function(n, r) {
                    return typeof n == "number" ? this.each(function() {
                        var t = this;
                        setTimeout(function() {
                            e(t).focus(), r && r.call(t)
                        }, n)
                    }) : t.apply(this, arguments)
                }
            }(e.fn.focus),
            scrollParent: function() {
                var t;
                return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0) : t = this.parents().filter(function() {
                    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(this[0].ownerDocument || n) : t
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++r)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    i.test(this.id) && e(this).removeAttr("id")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
                return function(n) {
                    return !!e.data(n, t)
                }
            }) : function(t, n, r) {
                return !!e.data(t, r[3])
            },
            focusable: function(t) {
                return s(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function(t) {
                var n = e.attr(t, "tabindex"),
                    r = isNaN(n);
                return (r || n >= 0) && s(t, !r)
            }
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, r) {
            function u(t, n, r, s) {
                return e.each(i, function() {
                    n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
                }), n
            }
            var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                s = r.toLowerCase(),
                o = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            e.fn["inner" + r] = function(n) {
                return n === t ? o["inner" + r].call(this) : this.each(function() {
                    e(this).css(s, u(this, n) + "px")
                })
            }, e.fn["outer" + r] = function(t, n) {
                return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function() {
                    e(this).css(s, u(this, t, !0, n) + "px")
                })
            }
        }), e.fn.addBack || (e.fn.addBack = function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
            return function(n) {
                return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
            }
        }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in n.createElement("div"), e.fn.extend({
            disableSelection: function() {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            },
            zIndex: function(r) {
                if (r !== t) return this.css("zIndex", r);
                if (this.length) {
                    var i = e(this[0]),
                        s, o;
                    while (i.length && i[0] !== n) {
                        s = i.css("position");
                        if (s === "absolute" || s === "relative" || s === "fixed") {
                            o = parseInt(i.css("zIndex"), 10);
                            if (!isNaN(o) && o !== 0) return o
                        }
                        i = i.parent()
                    }
                }
                return 0
            }
        }), e.ui.plugin = {
            add: function(t, n, r) {
                var i, s = e.ui[t].prototype;
                for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
            },
            call: function(e, t, n, r) {
                var i, s = e.plugins[t];
                if (!s) return;
                if (!r && (!e.element[0].parentNode || e.element[0].parentNode.nodeType === 11)) return;
                for (i = 0; i < s.length; i++) e.options[s[i][0]] && s[i][1].apply(e.element, n)
            }
        }
    }(e),
    function(e, t, r) {
        var i = function(t, n) {
            var r = t.parent(),
                i = [],
                s = function() {
                    var t = e(this),
                        n = e.mobile.toolbar && t.data("mobile-toolbar") ? t.toolbar("option") : {
                            position: t.attr("data-" + e.mobile.ns + "position"),
                            updatePagePadding: t.attr("data-" + e.mobile.ns + "update-page-padding") !== !1
                        };
                    return n.position !== "fixed" || n.updatePagePadding !== !0
                },
                o = r.children(":jqmData(role='header')").filter(s),
                u = t.children(":jqmData(role='header')"),
                a = r.children(":jqmData(role='footer')").filter(s),
                f = t.children(":jqmData(role='footer')");
            return u.length === 0 && o.length > 0 && (i = i.concat(o.toArray())), f.length === 0 && a.length > 0 && (i = i.concat(a.toArray())), e.each(i, function(t, r) {
                n -= e(r).outerHeight()
            }), Math.max(0, n)
        };
        e.extend(e.mobile, {
            window: e(t),
            document: e(n),
            keyCode: e.ui.keyCode,
            behaviors: {},
            silentScroll: function(n) {
                e.type(n) !== "number" && (n = e.mobile.defaultHomeScroll), e.event.special.scrollstart.enabled = !1, setTimeout(function() {
                    t.scrollTo(0, n), e.mobile.document.trigger("silentscroll", {
                        x: 0,
                        y: n
                    })
                }, 20), setTimeout(function() {
                    e.event.special.scrollstart.enabled = !0
                }, 150)
            },
            getClosestBaseUrl: function(t) {
                var n = e(t).closest(".ui-page").jqmData("url"),
                    r = e.mobile.path.documentBase.hrefNoHash;
                if (!e.mobile.dynamicBaseEnabled || !n || !e.mobile.path.isPath(n)) n = r;
                return e.mobile.path.makeUrlAbsolute(n, r)
            },
            removeActiveLinkClass: function(t) {
                !!e.mobile.activeClickedLink && (!e.mobile.activeClickedLink.closest("." + e.mobile.activePageClass).length || t) && e.mobile.activeClickedLink.removeClass(e.mobile.activeBtnClass), e.mobile.activeClickedLink = null
            },
            getInheritedTheme: function(e, t) {
                var n = e[0],
                    r = "",
                    i = /ui-(bar|body|overlay)-([a-z])\b/,
                    s, o;
                while (n) {
                    s = n.className || "";
                    if (s && (o = i.exec(s)) && (r = o[2])) break;
                    n = n.parentNode
                }
                return r || t || "a"
            },
            enhanceable: function(e) {
                return this.haveParents(e, "enhance")
            },
            hijackable: function(e) {
                return this.haveParents(e, "ajax")
            },
            haveParents: function(t, n) {
                if (!e.mobile.ignoreContentEnabled) return t;
                var r = t.length,
                    i = e(),
                    s, o, u, a, f;
                for (a = 0; a < r; a++) {
                    o = t.eq(a), u = !1, s = t[a];
                    while (s) {
                        f = s.getAttribute ? s.getAttribute("data-" + e.mobile.ns + n) : "";
                        if (f === "false") {
                            u = !0;
                            break
                        }
                        s = s.parentNode
                    }
                    u || (i = i.add(o))
                }
                return i
            },
            getScreenHeight: function() {
                return t.innerHeight || e.mobile.window.height()
            },
            resetActivePageHeight: function(t) {
                var n = e("." + e.mobile.activePageClass),
                    r = n.height(),
                    s = n.outerHeight(!0);
                t = i(n, typeof t == "number" ? t : e.mobile.getScreenHeight()), n.css("min-height", ""), n.height() < t && n.css("min-height", t - (s - r))
            },
            loading: function() {
                var t = this.loading._widget || e(e.mobile.loader.prototype.defaultHtml).loader(),
                    n = t.loader.apply(t, arguments);
                return this.loading._widget = t, n
            }
        }), e.addDependents = function(t, n) {
            var r = e(t),
                i = r.jqmData("dependents") || e();
            r.jqmData("dependents", e(i).add(n))
        }, e.fn.extend({
            removeWithDependents: function() {
                e.removeWithDependents(this)
            },
            enhanceWithin: function() {
                var t, n = {},
                    r = e.mobile.page.prototype.keepNativeSelector(),
                    i = this;
                e.mobile.nojs && e.mobile.nojs(this), e.mobile.links && e.mobile.links(this), e.mobile.degradeInputsWithin && e.mobile.degradeInputsWithin(this), e.fn.buttonMarkup && this.find(e.fn.buttonMarkup.initSelector).not(r).jqmEnhanceable().buttonMarkup(), e.fn.fieldcontain && this.find(":jqmData(role='fieldcontain')").not(r).jqmEnhanceable().fieldcontain(), e.each(e.mobile.widgets, function(t, s) {
                    if (s.initSelector) {
                        var o = e.mobile.enhanceable(i.find(s.initSelector));
                        o.length > 0 && (o = o.not(r)), o.length > 0 && (n[s.prototype.widgetName] = o)
                    }
                });
                for (t in n) n[t][t]();
                return this
            },
            addDependents: function(t) {
                e.addDependents(this, t)
            },
            getEncodedText: function() {
                return e("<a>").text(this.text()).html()
            },
            jqmEnhanceable: function() {
                return e.mobile.enhanceable(this)
            },
            jqmHijackable: function() {
                return e.mobile.hijackable(this)
            }
        }), e.removeWithDependents = function(t) {
            var n = e(t);
            (n.jqmData("dependents") || e()).remove(), n.remove()
        }, e.addDependents = function(t, n) {
            var r = e(t),
                i = r.jqmData("dependents") || e();
            r.jqmData("dependents", e(i).add(n))
        }, e.find.matches = function(t, n) {
            return e.find(t, null, null, n)
        }, e.find.matchesSelector = function(t, n) {
            return e.find(n, null, null, [t]).length > 0
        }
    }(e, this),
    function(e, r) {
        t.matchMedia = t.matchMedia || function(e, t) {
            var n, r = e.documentElement,
                i = r.firstElementChild || r.firstChild,
                s = e.createElement("body"),
                o = e.createElement("div");
            return o.id = "mq-test-1", o.style.cssText = "position:absolute;top:-100em", s.style.background = "none", s.appendChild(o),
                function(e) {
                    return o.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', r.insertBefore(s, i), n = o.offsetWidth === 42, r.removeChild(s), {
                        matches: n,
                        media: e
                    }
                }
        }(n), e.mobile.media = function(e) {
            return t.matchMedia(e).matches
        }
    }(e),
    function(e, t) {
        var r = {
            touch: "ontouchend" in n
        };
        e.mobile.support = e.mobile.support || {}, e.extend(e.support, r), e.extend(e.mobile.support, r)
    }(e),
    function(e, n) {
        e.extend(e.support, {
            orientation: "orientation" in t && "onorientationchange" in t
        })
    }(e),
    function(e, r) {
        function i(e) {
            var t = e.charAt(0).toUpperCase() + e.substr(1),
                n = (e + " " + u.join(t + " ") + t).split(" "),
                i;
            for (i in n)
                if (o[n[i]] !== r) return !0
        }

        function h() {
            var n = t,
                r = !!n.document.createElementNS && !!n.document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect && (!n.opera || navigator.userAgent.indexOf("Chrome") !== -1),
                i = function(t) {
                    (!t || !r) && e("html").addClass("ui-nosvg")
                },
                s = new n.Image;
            s.onerror = function() {
                i(!1)
            }, s.onload = function() {
                i(s.width === 1 && s.height === 1)
            }, s.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        }

        function p() {
            var i = "transform-3d",
                o = e.mobile.media("(-" + u.join("-" + i + "),(-") + "-" + i + "),(" + i + ")"),
                a, f, l;
            if (o) return !!o;
            a = n.createElement("div"), f = {
                MozTransform: "-moz-transform",
                transform: "transform"
            }, s.append(a);
            for (l in f) a.style[l] !== r && (a.style[l] = "translate3d( 100px, 1px, 1px )", o = t.getComputedStyle(a).getPropertyValue(f[l]));
            return !!o && o !== "none"
        }

        function d() {
            var t = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
                n = e("head base"),
                r = null,
                i = "",
                o, u;
            return n.length ? i = n.attr("href") : n = r = e("<base>", {
                href: t
            }).appendTo("head"), o = e("<a href='testurl' />").prependTo(s), u = o[0].href, n[0].href = i || location.pathname, r && r.remove(), u.indexOf(t) === 0
        }

        function v() {
            var e = n.createElement("x"),
                r = n.documentElement,
                i = t.getComputedStyle,
                s;
            return "pointerEvents" in e.style ? (e.style.pointerEvents = "auto", e.style.pointerEvents = "x", r.appendChild(e), s = i && i(e, "").pointerEvents === "auto", r.removeChild(e), !!s) : !1
        }

        function m() {
            var e = n.createElement("div");
            return typeof e.getBoundingClientRect != "undefined"
        }

        function g() {
            var e = t,
                n = navigator.userAgent,
                r = navigator.platform,
                i = n.match(/AppleWebKit\/([0-9]+)/),
                s = !!i && i[1],
                o = n.match(/Fennec\/([0-9]+)/),
                u = !!o && o[1],
                a = n.match(/Opera Mobi\/([0-9]+)/),
                f = !!a && a[1];
            return (r.indexOf("iPhone") > -1 || r.indexOf("iPad") > -1 || r.indexOf("iPod") > -1) && s && s < 534 || e.operamini && {}.toString.call(e.operamini) === "[object OperaMini]" || a && f < 7458 || n.indexOf("Android") > -1 && s && s < 533 || u && u < 6 || "palmGetResource" in t && s && s < 534 || n.indexOf("MeeGo") > -1 && n.indexOf("NokiaBrowser/8.5.0") > -1 ? !1 : !0
        }
        var s = e("<body>").prependTo("html"),
            o = s[0].style,
            u = ["Webkit", "Moz", "O"],
            a = "palmGetResource" in t,
            f = t.operamini && {}.toString.call(t.operamini) === "[object OperaMini]",
            l = t.blackberry && !i("-webkit-transform"),
            c;
        e.extend(e.mobile, {
            browser: {}
        }), e.mobile.browser.oldIE = function() {
            var e = 3,
                t = n.createElement("div"),
                r = t.all || [];
            do t.innerHTML = "<!--[if gt IE " + ++e + "]><br><![endif]-->"; while (r[0]);
            return e > 4 ? e : !e
        }(), e.extend(e.support, {
            pushState: "pushState" in history && "replaceState" in history && !(t.navigator.userAgent.indexOf("Firefox") >= 0 && t.top !== t) && t.navigator.userAgent.search(/CriOS/) === -1,
            mediaquery: e.mobile.media("only all"),
            cssPseudoElement: !!i("content"),
            touchOverflow: !!i("overflowScrolling"),
            cssTransform3d: p(),
            boxShadow: !!i("boxShadow") && !l,
            fixedPosition: g(),
            scrollTop: ("pageXOffset" in t || "scrollTop" in n.documentElement || "scrollTop" in s[0]) && !a && !f,
            dynamicBaseTag: d(),
            cssPointerEvents: v(),
            boundingRect: m(),
            inlineSVG: h
        }), s.remove(), c = function() {
            var e = t.navigator.userAgent;
            return e.indexOf("Nokia") > -1 && (e.indexOf("Symbian/3") > -1 || e.indexOf("Series60/5") > -1) && e.indexOf("AppleWebKit") > -1 && e.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)
        }(), e.mobile.gradeA = function() {
            return (e.support.mediaquery && e.support.cssPseudoElement || e.mobile.browser.oldIE && e.mobile.browser.oldIE >= 8) && (e.support.boundingRect || e.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null)
        }, e.mobile.ajaxBlacklist = t.blackberry && !t.WebKitPoint || f || c, c && e(function() {
            e("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet")
        }), e.support.boxShadow || e("html").addClass("ui-noboxshadow")
    }(e),
    function(e, t) {
        var n = e.mobile.window,
            r, i = function() {};
        e.event.special.beforenavigate = {
            setup: function() {
                n.on("navigate", i)
            },
            teardown: function() {
                n.off("navigate", i)
            }
        }, e.event.special.navigate = r = {
            bound: !1,
            pushStateEnabled: !0,
            originalEventName: t,
            isPushStateEnabled: function() {
                return e.support.pushState && e.mobile.pushStateEnabled === !0 && this.isHashChangeEnabled()
            },
            isHashChangeEnabled: function() {
                return e.mobile.hashListeningEnabled === !0
            },
            popstate: function(t) {
                var r = new e.Event("navigate"),
                    i = new e.Event("beforenavigate"),
                    s = t.originalEvent.state || {};
                i.originalEvent = t, n.trigger(i);
                if (i.isDefaultPrevented()) return;
                t.historyState && e.extend(s, t.historyState), r.originalEvent = t, setTimeout(function() {
                    n.trigger(r, {
                        state: s
                    })
                }, 0)
            },
            hashchange: function(t) {
                var r = new e.Event("navigate"),
                    i = new e.Event("beforenavigate");
                i.originalEvent = t, n.trigger(i);
                if (i.isDefaultPrevented()) return;
                r.originalEvent = t, n.trigger(r, {
                    state: t.hashchangeState || {}
                })
            },
            setup: function() {
                if (r.bound) return;
                r.bound = !0, r.isPushStateEnabled() ? (r.originalEventName = "popstate", n.bind("popstate.navigate", r.popstate)) : r.isHashChangeEnabled() && (r.originalEventName = "hashchange", n.bind("hashchange.navigate", r.hashchange))
            }
        }
    }(e),
    function(e) {
        e.event.special.throttledresize = {
            setup: function() {
                e(this).bind("resize", n)
            },
            teardown: function() {
                e(this).unbind("resize", n)
            }
        };
        var t = 250,
            n = function() {
                s = (new Date).getTime(), o = s - r, o >= t ? (r = s, e(this).trigger("throttledresize")) : (i && clearTimeout(i), i = setTimeout(n, t - o))
            },
            r = 0,
            i, s, o
    }(e),
    function(e, t) {
        function p() {
            var e = s();
            e !== o && (o = e, r.trigger(i))
        }
        var r = e(t),
            i = "orientationchange",
            s, o, u, a, f = {
                0: !0,
                180: !0
            },
            l, c, h;
        if (e.support.orientation) {
            l = t.innerWidth || r.width(), c = t.innerHeight || r.height(), h = 50, u = l > c && l - c > h, a = f[t.orientation];
            if (u && a || !u && !a) f = {
                "-90": !0,
                90: !0
            }
        }
        e.event.special.orientationchange = e.extend({}, e.event.special.orientationchange, {
            setup: function() {
                if (e.support.orientation && !e.event.special.orientationchange.disabled) return !1;
                o = s(), r.bind("throttledresize", p)
            },
            teardown: function() {
                if (e.support.orientation && !e.event.special.orientationchange.disabled) return !1;
                r.unbind("throttledresize", p)
            },
            add: function(e) {
                var t = e.handler;
                e.handler = function(e) {
                    return e.orientation = s(), t.apply(this, arguments)
                }
            }
        }), e.event.special.orientationchange.orientation = s = function() {
            var r = !0,
                i = n.documentElement;
            return e.support.orientation ? r = f[t.orientation] : r = i && i.clientWidth / i.clientHeight < 1.1, r ? "portrait" : "landscape"
        }, e.fn[i] = function(e) {
            return e ? this.bind(i, e) : this.trigger(i)
        }, e.attrFn && (e.attrFn[i] = !0)
    }(e, this),
    function(e, t, n, r) {
        function T(e) {
            while (e && typeof e.originalEvent != "undefined") e = e.originalEvent;
            return e
        }

        function N(t, n) {
            var i = t.type,
                s, o, a, l, c, h, p, d, v;
            t = e.Event(t), t.type = n, s = t.originalEvent, o = e.event.props, i.search(/^(mouse|click)/) > -1 && (o = f);
            if (s)
                for (p = o.length, l; p;) l = o[--p], t[l] = s[l];
            i.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1);
            if (i.search(/^touch/) !== -1) {
                a = T(s), i = a.touches, c = a.changedTouches, h = i && i.length ? i[0] : c && c.length ? c[0] : r;
                if (h)
                    for (d = 0, v = u.length; d < v; d++) l = u[d], t[l] = h[l]
            }
            return t
        }

        function C(t) {
            var n = {},
                r, s;
            while (t) {
                r = e.data(t, i);
                for (s in r) r[s] && (n[s] = n.hasVirtualBinding = !0);
                t = t.parentNode
            }
            return n
        }

        function k(t, n) {
            var r;
            while (t) {
                r = e.data(t, i);
                if (r && (!n || r[n])) return t;
                t = t.parentNode
            }
            return null
        }

        function L() {
            g = !1
        }

        function A() {
            g = !0
        }

        function O() {
            E = 0, v.length = 0, m = !1, A()
        }

        function M() {
            L()
        }

        function _() {
            D(), c = setTimeout(function() {
                c = 0, O()
            }, e.vmouse.resetTimerDuration)
        }

        function D() {
            c && (clearTimeout(c), c = 0)
        }

        function P(t, n, r) {
            var i;
            if (r && r[t] || !r && k(n.target, t)) i = N(n, t), e(n.target).trigger(i);
            return i
        }

        function H(t) {
            var n = e.data(t.target, s),
                r;
            !m && (!E || E !== n) && (r = P("v" + t.type, t), r && (r.isDefaultPrevented() && t.preventDefault(), r.isPropagationStopped() && t.stopPropagation(), r.isImmediatePropagationStopped() && t.stopImmediatePropagation()))
        }

        function B(t) {
            var n = T(t).touches,
                r, i, o;
            n && n.length === 1 && (r = t.target, i = C(r), i.hasVirtualBinding && (E = w++, e.data(r, s, E), D(), M(), d = !1, o = T(t).touches[0], h = o.pageX, p = o.pageY, P("vmouseover", t, i), P("vmousedown", t, i)))
        }

        function j(e) {
            if (g) return;
            d || P("vmousecancel", e, C(e.target)), d = !0, _()
        }

        function F(t) {
            if (g) return;
            var n = T(t).touches[0],
                r = d,
                i = e.vmouse.moveDistanceThreshold,
                s = C(t.target);
            d = d || Math.abs(n.pageX - h) > i || Math.abs(n.pageY - p) > i, d && !r && P("vmousecancel", t, s), P("vmousemove", t, s), _()
        }

        function I(e) {
            if (g) return;
            A();
            var t = C(e.target),
                n, r;
            P("vmouseup", e, t), d || (n = P("vclick", e, t), n && n.isDefaultPrevented() && (r = T(e).changedTouches[0], v.push({
                touchID: E,
                x: r.clientX,
                y: r.clientY
            }), m = !0)), P("vmouseout", e, t), d = !1, _()
        }

        function q(t) {
            var n = e.data(t, i),
                r;
            if (n)
                for (r in n)
                    if (n[r]) return !0;
            return !1
        }

        function R() {}

        function U(t) {
            var n = t.substr(1);
            return {
                setup: function() {
                    q(this) || e.data(this, i, {});
                    var r = e.data(this, i);
                    r[t] = !0, l[t] = (l[t] || 0) + 1, l[t] === 1 && b.bind(n, H), e(this).bind(n, R), y && (l.touchstart = (l.touchstart || 0) + 1, l.touchstart === 1 && b.bind("touchstart", B).bind("touchend", I).bind("touchmove", F).bind("scroll", j))
                },
                teardown: function() {
                    --l[t], l[t] || b.unbind(n, H), y && (--l.touchstart, l.touchstart || b.unbind("touchstart", B).unbind("touchmove", F).unbind("touchend", I).unbind("scroll", j));
                    var r = e(this),
                        s = e.data(this, i);
                    s && (s[t] = !1), r.unbind(n, R), q(this) || r.removeData(i)
                }
            }
        }
        var i = "virtualMouseBindings",
            s = "virtualTouchID",
            o = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            u = "clientX clientY pageX pageY screenX screenY".split(" "),
            a = e.event.mouseHooks ? e.event.mouseHooks.props : [],
            f = e.event.props.concat(a),
            l = {},
            c = 0,
            h = 0,
            p = 0,
            d = !1,
            v = [],
            m = !1,
            g = !1,
            y = "addEventListener" in n,
            b = e(n),
            w = 1,
            E = 0,
            S, x;
        e.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        };
        for (x = 0; x < o.length; x++) e.event.special[o[x]] = U(o[x]);
        y && n.addEventListener("click", function(t) {
            var n = v.length,
                r = t.target,
                i, o, u, a, f, l;
            if (n) {
                i = t.clientX, o = t.clientY, S = e.vmouse.clickDistanceThreshold, u = r;
                while (u) {
                    for (a = 0; a < n; a++) {
                        f = v[a], l = 0;
                        if (u === r && Math.abs(f.x - i) < S && Math.abs(f.y - o) < S || e.data(u, s) === f.touchID) {
                            t.preventDefault(), t.stopPropagation();
                            return
                        }
                    }
                    u = u.parentNode
                }
            }
        }, !0)
    }(e, t, n),
    function(e, t, r) {
        function l(t, n, i, s) {
            var o = i.type;
            i.type = n, s ? e.event.trigger(i, r, t) : e.event.dispatch.call(t, i), i.type = o
        }
        var i = e(n),
            s = e.mobile.support.touch,
            o = "touchmove scroll",
            u = s ? "touchstart" : "mousedown",
            a = s ? "touchend" : "mouseup",
            f = s ? "touchmove" : "mousemove";
        e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(t, n) {
            e.fn[n] = function(e) {
                return e ? this.bind(n, e) : this.trigger(n)
            }, e.attrFn && (e.attrFn[n] = !0)
        }), e.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function s(e, n) {
                    r = n, l(t, r ? "scrollstart" : "scrollstop", e)
                }
                var t = this,
                    n = e(t),
                    r, i;
                n.bind(o, function(t) {
                    if (!e.event.special.scrollstart.enabled) return;
                    r || s(t, !0), clearTimeout(i), i = setTimeout(function() {
                        s(t, !1)
                    }, 50)
                })
            },
            teardown: function() {
                e(this).unbind(o)
            }
        }, e.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function() {
                var t = this,
                    n = e(t),
                    r = !1;
                n.bind("vmousedown", function(s) {
                    function a() {
                        clearTimeout(u)
                    }

                    function f() {
                        a(), n.unbind("vclick", c).unbind("vmouseup", a), i.unbind("vmousecancel", f)
                    }

                    function c(e) {
                        f(), !r && o === e.target ? l(t, "tap", e) : r && e.preventDefault()
                    }
                    r = !1;
                    if (s.which && s.which !== 1) return !1;
                    var o = s.target,
                        u;
                    n.bind("vmouseup", a).bind("vclick", c), i.bind("vmousecancel", f), u = setTimeout(function() {
                        e.event.special.tap.emitTapOnTaphold || (r = !0), l(t, "taphold", e.Event("taphold", {
                            target: o
                        }))
                    }, e.event.special.tap.tapholdThreshold)
                })
            },
            teardown: function() {
                e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), i.unbind("vmousecancel")
            }
        }, e.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function(e) {
                var n = t.pageXOffset,
                    r = t.pageYOffset,
                    i = e.clientX,
                    s = e.clientY;
                if (e.pageY === 0 && Math.floor(s) > Math.floor(e.pageY) || e.pageX === 0 && Math.floor(i) > Math.floor(e.pageX)) i -= n, s -= r;
                else if (s < e.pageY - r || i < e.pageX - n) i = e.pageX - n, s = e.pageY - r;
                return {
                    x: i,
                    y: s
                }
            },
            start: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                    r = e.event.special.swipe.getLocation(n);
                return {
                    time: (new Date).getTime(),
                    coords: [r.x, r.y],
                    origin: e(t.target)
                }
            },
            stop: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                    r = e.event.special.swipe.getLocation(n);
                return {
                    time: (new Date).getTime(),
                    coords: [r.x, r.y]
                }
            },
            handleSwipe: function(t, n, r, i) {
                if (n.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - n.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - n.coords[1]) < e.event.special.swipe.verticalDistanceThreshold) {
                    var s = t.coords[0] > n.coords[0] ? "swipeleft" : "swiperight";
                    return l(r, "swipe", e.Event("swipe", {
                        target: i,
                        swipestart: t,
                        swipestop: n
                    }), !0), l(r, s, e.Event(s, {
                        target: i,
                        swipestart: t,
                        swipestop: n
                    }), !0), !0
                }
                return !1
            },
            eventInProgress: !1,
            setup: function() {
                var t, n = this,
                    r = e(n),
                    s = {};
                t = e.data(this, "mobile-events"), t || (t = {
                    length: 0
                }, e.data(this, "mobile-events", t)), t.length++, t.swipe = s, s.start = function(t) {
                    if (e.event.special.swipe.eventInProgress) return;
                    e.event.special.swipe.eventInProgress = !0;
                    var r, o = e.event.special.swipe.start(t),
                        u = t.target,
                        l = !1;
                    s.move = function(t) {
                        if (!o || t.isDefaultPrevented()) return;
                        r = e.event.special.swipe.stop(t), l || (l = e.event.special.swipe.handleSwipe(o, r, n, u), l && (e.event.special.swipe.eventInProgress = !1)), Math.abs(o.coords[0] - r.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault()
                    }, s.stop = function() {
                        l = !0, e.event.special.swipe.eventInProgress = !1, i.off(f, s.move), s.move = null
                    }, i.on(f, s.move).one(a, s.stop)
                }, r.on(u, s.start)
            },
            teardown: function() {
                var t, n;
                t = e.data(this, "mobile-events"), t && (n = t.swipe, delete t.swipe, t.length--, t.length === 0 && e.removeData(this, "mobile-events")), n && (n.start && e(this).off(u, n.start), n.move && i.off(f, n.move), n.stop && i.off(a, n.stop))
            }
        }, e.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe.left",
            swiperight: "swipe.right"
        }, function(t, n) {
            e.event.special[t] = {
                setup: function() {
                    e(this).bind(n, e.noop)
                },
                teardown: function() {
                    e(this).unbind(n)
                }
            }
        })
    }(e, this)
});
/*! jQuery UI - v1.11.4 - 2016-04-25
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})(function(e) {
    function t(t, s) {
        var n, a, o, r = t.nodeName.toLowerCase();
        return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t)
    }

    function i(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        scrollParent: function(t) {
            var i = this.css("position"),
                s = "absolute" === i,
                n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                a = this.parents().filter(function() {
                    var t = e(this);
                    return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                }).eq(0);
            return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var e = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++e)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t)
            }
        }) : function(t, i, s) {
            return !!e.data(t, s[3])
        },
        focusable: function(i) {
            return t(i, !isNaN(e.attr(i, "tabindex")))
        },
        tabbable: function(i) {
            var s = e.attr(i, "tabindex"),
                n = isNaN(s);
            return (n || s >= 0) && t(i, !n)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
        function s(t, i, s, a) {
            return e.each(n, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            a = i.toLowerCase(),
            o = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
        e.fn["inner" + i] = function(t) {
            return void 0 === t ? o["inner" + i].call(this) : this.each(function() {
                e(this).css(a, s(this, t) + "px")
            })
        }, e.fn["outer" + i] = function(t, n) {
            return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function() {
                e(this).css(a, s(this, t, !0, n) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), s && s.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function() {
            var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(e + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(t) {
            if (void 0 !== t) return this.css("zIndex", t);
            if (this.length)
                for (var i, s, n = e(this[0]); n.length && n[0] !== document;) {
                    if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    n = n.parent()
                }
            return 0
        }
    }), e.ui.plugin = {
        add: function(t, i, s) {
            var n, a = e.ui[t].prototype;
            for (n in s) a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]])
        },
        call: function(e, t, i, s) {
            var n, a = e.plugins[t];
            if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (n = 0; a.length > n; n++) e.options[a[n][0]] && a[n][1].apply(e.element, i)
        }
    };
    var s = 0,
        n = Array.prototype.slice;
    e.cleanData = function(t) {
        return function(i) {
            var s, n, a;
            for (a = 0; null != (n = i[a]); a++) try {
                s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove")
            } catch (o) {}
            t(i)
        }
    }(e.cleanData), e.widget = function(t, i, s) {
        var n, a, o, r, h = {},
            l = t.split(".")[0];
        return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function(t) {
            return !!e.data(t, n)
        }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function(e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
        }, e.extend(o, a, {
            version: s.version,
            _proto: e.extend({}, s),
            _childConstructors: []
        }), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function(t, s) {
            return e.isFunction(s) ? (h[t] = function() {
                var e = function() {
                        return i.prototype[t].apply(this, arguments)
                    },
                    n = function(e) {
                        return i.prototype[t].apply(this, e)
                    };
                return function() {
                    var t, i = this._super,
                        a = this._superApply;
                    return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
                }
            }(), void 0) : (h[t] = s, void 0)
        }), o.prototype = e.widget.extend(r, {
            widgetEventPrefix: a ? r.widgetEventPrefix || t : t
        }, h, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetFullName: n
        }), a ? (e.each(a._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
    }, e.widget.extend = function(t) {
        for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++)
            for (i in a[o]) s = a[o][i], a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
        return t
    }, e.widget.bridge = function(t, i) {
        var s = i.prototype.widgetFullName || t;
        e.fn[t] = function(a) {
            var o = "string" == typeof a,
                r = n.call(arguments, 1),
                h = this;
            return o ? this.each(function() {
                var i, n = e.data(this, s);
                return "instance" === a ? (h = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + a + "'")
            }) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function() {
                var t = e.data(this, s);
                t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new i(a, this))
            })), h
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = s++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === i && this.destroy()
                }
            }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(t, i) {
            var s, n, a, o = t;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (o = {}, s = t.split("."), t = s.shift(), s.length) {
                    for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {}, n = n[s[a]];
                    if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
                    n[t] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = i
                }
            return this._setOptions(o), this
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(t, i, s) {
            var n, a = this;
            "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function(s, o) {
                function r() {
                    return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
                }
                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                var h = s.match(/^([\w:-]*)\s*(.*)$/),
                    l = h[1] + a.eventNamespace,
                    u = h[2];
                u ? n.delegate(u, l, r) : i.bind(l, r)
            })
        },
        _off: function(t, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
        },
        _delay: function(e, t) {
            function i() {
                return ("string" == typeof e ? s[e] : e).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, s) {
            var n, a, o = this.options[t];
            if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                for (n in a) n in i || (i[n] = a[n]);
            return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, n, a) {
            "string" == typeof n && (n = {
                effect: n
            });
            var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
            n = n || {}, "number" == typeof n && (n = {
                duration: n
            }), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function(i) {
                e(this)[t](), a && a.call(s[0]), i()
            })
        }
    }), e.widget;
    var a = !1;
    e(document).mouseup(function() {
        a = !1
    }), e.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (!a) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var i = this,
                    s = 1 === t.which,
                    n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                    return i._mouseMove(e)
                }, this._mouseUpDelegate = function(e) {
                    return i._mouseUp(e)
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), a = !0, !0)) : !0
            }
        },
        _mouseMove: function(t) {
            if (this._mouseMoved) {
                if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t);
                if (!t.which) return this._mouseUp(t)
            }
            return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        },
        _mouseUp: function(t) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), a = !1, !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    }), e.widget("ui.slider", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function() {
            var t, i, s = this.options,
                n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                a = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                o = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++) o.push(a);
            this.handles = n.add(e(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(t) {
                e(this).data("ui-slider-handle-index", t)
            })
        },
        _createRange: function() {
            var t = this.options,
                i = "";
            t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = e("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var i, s, n, a, o, r, h, l, u = this,
                d = this.options;
            return d.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: t.pageX,
                y: t.pageY
            }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                var i = Math.abs(s - u.values(t));
                (n > i || n === i && (t === u._lastChangedValue || u.values(t) === d.min)) && (n = i, a = e(this), o = t)
            }), r = this._start(t, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), h = a.offset(), l = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - h.left - a.width() / 2,
                top: t.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, s), this._animateOff = !0, !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(e) {
            var t = {
                    x: e.pageX,
                    y: e.pageY
                },
                i = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, i), !1
        },
        _mouseStop: function(e) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(e) {
            var t, i, s, n, a;
            return "horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / t, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a)
        },
        _start: function(e, t) {
            var i = {
                handle: this.handles[t],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i)
        },
        _slide: function(e, t, i) {
            var s, n, a;
            this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > s || 1 === t && s > i) && (i = s), i !== this.values(t) && (n = this.values(), n[t] = i, a = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i,
                values: n
            }), s = this.values(t ? 0 : 1), a !== !1 && this.values(t, i))) : i !== this.value() && (a = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i
            }), a !== !1 && this.value(i))
        },
        _stop: function(e, t) {
            var i = {
                handle: this.handles[t],
                value: this.value()
            };
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
        },
        _change: function(e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i)
            }
        },
        value: function(e) {
            return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), void 0) : this._value()
        },
        values: function(t, i) {
            var s, n, a;
            if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
            if (!arguments.length) return this._values();
            if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1) s[a] = this._trimAlignValue(n[a]), this._change(null, a);
            this._refreshValue()
        },
        _setOption: function(t, i) {
            var s, n = 0;
            switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!i), this._super(t, i), t) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function() {
            var e = this.options.value;
            return e = this._trimAlignValue(e)
        },
        _values: function(e) {
            var t, i, s;
            if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t);
            if (this.options.values && this.options.values.length) {
                for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);
                return i
            }
            return []
        },
        _trimAlignValue: function(e) {
            if (this._valueMin() >= e) return this._valueMin();
            if (e >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                i = (e - this._valueMin()) % t,
                s = e - i;
            return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5))
        },
        _calculateNewMax: function() {
            var e = this.options.max,
                t = this._valueMin(),
                i = this.options.step,
                s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
            e = s + t, this.max = parseFloat(e.toFixed(this._precision()))
        },
        _precision: function() {
            var e = this._precisionOf(this.options.step);
            return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e
        },
        _precisionOf: function(e) {
            var t = "" + e,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.max
        },
        _refreshValue: function() {
            var t, i, s, n, a, o = this.options.range,
                r = this.options,
                h = this,
                l = this._animateOff ? !1 : r.animate,
                u = {};
            this.options.values && this.options.values.length ? this.handles.each(function(s) {
                i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[l ? "animate" : "css"](u, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
                    left: i + "%"
                }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
                    width: i - t + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
                    bottom: i + "%"
                }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
                    height: i - t + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                }))), t = i
            }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                width: i + "%"
            }, r.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({
                width: 100 - i + "%"
            }, {
                queue: !1,
                duration: r.animate
            }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                height: i + "%"
            }, r.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({
                height: 100 - i + "%"
            }, {
                queue: !1,
                duration: r.animate
            }))
        },
        _handleEvents: {
            keydown: function(t) {
                var i, s, n, a, o = e(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, e(t.target).addClass("ui-state-active"), i = this._start(t, o), i === !1)) return
                }
                switch (a = this.options.step, s = n = this.options.values && this.options.values.length ? this.values(o) : this.value(), t.keyCode) {
                    case e.ui.keyCode.HOME:
                        n = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        n = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (s === this._valueMax()) return;
                        n = this._trimAlignValue(s + a);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (s === this._valueMin()) return;
                        n = this._trimAlignValue(s - a)
                }
                this._slide(t, o, n)
            },
            keyup: function(t) {
                var i = e(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"))
            }
        }
    })
});
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
! function(a) {
    function f(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0],
                d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    }
    if (a.support.touch = "ontouchend" in document, a.support.touch) {
        var e, b = a.ui.mouse.prototype,
            c = b._mouseInit,
            d = b._mouseDestroy;
        b._touchStart = function(a) {
            var b = this;
            !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"))
        }, b._touchMove = function(a) {
            e && (this._touchMoved = !0, f(a, "mousemove"))
        }, b._touchEnd = function(a) {
            e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1)
        }, b._mouseInit = function() {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), c.call(b)
        }, b._mouseDestroy = function() {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), d.call(b)
        }
    }
}(jQuery);
/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b, c) {
    var $ = b.jQuery || b.Cowboy || (b.Cowboy = {}),
        a;
    $.throttle = a = function(e, f, j, i) {
        var h, d = 0;
        if (typeof f !== "boolean") {
            i = j;
            j = f;
            f = c
        }

        function g() {
            var o = this,
                m = +new Date() - d,
                n = arguments;

            function l() {
                d = +new Date();
                j.apply(o, n)
            }

            function k() {
                h = c
            }
            if (i && !h) {
                l()
            }
            h && clearTimeout(h);
            if (i === c && m > e) {
                l()
            } else {
                if (f !== true) {
                    h = setTimeout(i ? k : l, i === c ? e - m : e)
                }
            }
        }
        if ($.guid) {
            g.guid = j.guid = j.guid || $.guid++
        }
        return g
    };
    $.debounce = function(d, e, f) {
        return f === c ? a(d, e, false) : a(d, f, e !== false)
    }
})(this);
/* jQuery.fracs 0.15.0 - http://larsjung.de/jquery-fracs/ */
! function() {
    "use strict";

    function t(t, n) {
        return typeof t === n
    }

    function n(t, n) {
        return t instanceof n
    }

    function i(t) {
        return t && t.nodeType
    }

    function e(t) {
        return i(t) ? t : n(t, g) ? t[0] : void 0
    }

    function o(t, n, i) {
        return g.each(t, function(t, e) {
            i = n.call(e, i, t, e)
        }), i
    }

    function r(t, n, i) {
        var e, o, r;
        if (t === n) return !0;
        if (!t || !n || t.constructor !== n.constructor) return !1;
        for (e = 0, o = i.length; o > e; e += 1) {
            if (r = i[e], t[r] && y(t[r].equals) && !t[r].equals(n[r])) return !1;
            if (t[r] !== n[r]) return !1
        }
        return !0
    }

    function s(t, n, i, e) {
        this.left = E(t), this.top = E(n), this.width = E(i), this.height = E(e), this.right = this.left + this.width, this.bottom = this.top + this.height
    }

    function h(t, n, i, e) {
        this.visible = t || 0, this.viewport = n || 0, this.possible = i || 0, this.rects = e && T({}, e) || null
    }

    function l(t, n) {
        this.els = t, this.viewport = n
    }

    function c(t, n, i) {
        var e;
        return g.inArray(i, q) >= 0 ? e = s.ofElement(t) : g.inArray(i, S) >= 0 && (e = h.of(t, n)), e ? e[i] : 0
    }

    function u(t, n) {
        return t.val - n.val
    }

    function a(t, n) {
        return n.val - t.val
    }

    function f(t) {
        var n = s.ofContent(t, !0),
            i = s.ofViewport(t, !0),
            e = n.width - i.width,
            o = n.height - i.height;
        this.content = n, this.viewport = i, this.width = 0 >= e ? null : i.left / e, this.height = 0 >= o ? null : i.top / o, this.left = i.left, this.top = i.top, this.right = n.right - i.right, this.bottom = n.bottom - i.bottom
    }

    function p(t) {
        this.el = t || window
    }

    function d(t, n) {
        this.context = t, this.viewport = n, this.init()
    }

    function v(t, n, i, e) {
        this.context = new l(t, n), this.property = i, this.descending = e, this.init()
    }

    function w(t) {
        t && t !== window && t !== document ? (this.context = t, this.$autoTarget = g(t)) : this.context = window, this.init()
    }
    var g = jQuery,
        m = g(window),
        b = g(document),
        T = g.extend,
        y = g.isFunction,
        k = Math.max,
        V = Math.min,
        E = Math.round,
        x = function() {
            var t = {},
                n = 1;
            return function(i) {
                return i ? (t[i] || (t[i] = n, n += 1), t[i]) : 0
            }
        }();
    T(s.prototype, {
        equals: function(t) {
            return r(this, t, ["left", "top", "width", "height"])
        },
        area: function() {
            return this.width * this.height
        },
        relativeTo: function(t) {
            return new s(this.left - t.left, this.top - t.top, this.width, this.height)
        },
        intersection: function(t) {
            if (!n(t, s)) return null;
            var i = k(this.left, t.left),
                e = V(this.right, t.right),
                o = k(this.top, t.top),
                r = V(this.bottom, t.bottom),
                h = e - i,
                l = r - o;
            return h >= 0 && l >= 0 ? new s(i, o, h, l) : null
        },
        envelope: function(t) {
            if (!n(t, s)) return this;
            var i = V(this.left, t.left),
                e = k(this.right, t.right),
                o = V(this.top, t.top),
                r = k(this.bottom, t.bottom),
                h = e - i,
                l = r - o;
            return new s(i, o, h, l)
        }
    }), T(s, {
        ofContent: function(t, n) {
            return t && t !== document && t !== window ? n ? new s(0, 0, t.scrollWidth, t.scrollHeight) : new s(t.offsetLeft - t.scrollLeft, t.offsetTop - t.scrollTop, t.scrollWidth, t.scrollHeight) : new s(0, 0, b.width(), b.height())
        },
        ofViewport: function(t, n) {
            return t && t !== document && t !== window ? n ? new s(t.scrollLeft, t.scrollTop, t.clientWidth, t.clientHeight) : new s(t.offsetLeft, t.offsetTop, t.clientWidth, t.clientHeight) : new s(m.scrollLeft(), m.scrollTop(), m.width(), m.height())
        },
        ofElement: function(t) {
            var n = g(t);
            if (!n.is(":visible")) return null;
            var i = n.offset();
            return new s(i.left, i.top, n.outerWidth(), n.outerHeight())
        }
    }), T(h.prototype, {
        equals: function(t) {
            return this.fracsEqual(t) && this.rectsEqual(t)
        },
        fracsEqual: function(t) {
            return r(this, t, ["visible", "viewport", "possible"])
        },
        rectsEqual: function(t) {
            return r(this.rects, t.rects, ["document", "element", "viewport"])
        }
    }), T(h, {
        of: function(t, n) {
            var e, o, r;
            return t = i(t) && s.ofElement(t) || t, n = i(n) && s.ofViewport(n) || n || s.ofViewport(), t instanceof s && (e = t.intersection(n)) ? (o = e.area(), r = V(t.width, n.width) * V(t.height, n.height), new h(o / t.area(), o / n.area(), o / r, {
                document: e,
                element: e.relativeTo(t),
                viewport: e.relativeTo(n)
            })) : new h
        }
    });
    var q = ["width", "height", "left", "right", "top", "bottom"],
        S = ["possible", "visible", "viewport"];
    T(l.prototype, {
        sorted: function(t, n) {
            var i = this.viewport;
            return g.map(this.els, function(n) {
                return {
                    el: n,
                    val: c(n, i, t)
                }
            }).sort(n ? a : u)
        },
        best: function(t, n) {
            return this.els.length ? this.sorted(t, n)[0] : null
        }
    }), T(f.prototype, {
        equals: function(t) {
            return r(this, t, ["width", "height", "left", "top", "right", "bottom", "content", "viewport"])
        }
    }), T(p.prototype, {
        equals: function(t) {
            return r(this, t, ["el"])
        },
        scrollState: function() {
            return new f(this.el)
        },
        scrollTo: function(t, n, i) {
            var e = g(this.el === window ? "html,body" : this.el);
            t = t || 0, n = n || 0, i = isNaN(i) ? 1e3 : i, e.stop(!0).animate({
                scrollLeft: t,
                scrollTop: n
            }, i)
        },
        scroll: function(t, n, i) {
            var e = this.el === window ? m : g(this.el);
            t = t || 0, n = n || 0, this.scrollTo(e.scrollLeft() + t, e.scrollTop() + n, i)
        },
        scrollToRect: function(t, n, i, e) {
            n = n || 0, i = i || 0, this.scrollTo(t.left - n, t.top - i, e)
        },
        scrollToElement: function(t, n, i, e) {
            var o = s.ofElement(t).relativeTo(s.ofContent(this.el));
            this.scrollToRect(o, n, i, e)
        }
    });
    var C = {
        init: function() {
            this.callbacks = g.Callbacks("memory unique"), this.currVal = null, this.prevVal = null, this.checkProxy = g.proxy(this.check, this), this.autoCheck()
        },
        bind: function(t) {
            this.callbacks.add(t)
        },
        unbind: function(t) {
            t ? this.callbacks.remove(t) : this.callbacks.empty()
        },
        trigger: function() {
            this.callbacks.fireWith(this.context, [this.currVal, this.prevVal])
        },
        check: function(t) {
            var n = this.updatedValue(t);
            return void 0 === n ? !1 : (this.prevVal = this.currVal, this.currVal = n, this.trigger(), !0)
        },
        $autoTarget: m,
        autoEvents: "load resize scroll",
        autoCheck: function(t) {
            this.$autoTarget[t === !1 ? "off" : "on"](this.autoEvents, this.checkProxy)
        }
    };
    T(d.prototype, C, {
        updatedValue: function() {
            var t = h.of(this.context, this.viewport);
            return this.currVal && this.currVal.equals(t) ? void 0 : t
        }
    }), T(v.prototype, C, {
        updatedValue: function() {
            var t = this.context.best(this.property, this.descending);
            return t && (t = t.val > 0 ? t.el : null, this.currVal !== t) ? t : void 0
        }
    }), T(w.prototype, C, {
        updatedValue: function() {
            var t = new f(this.context);
            return this.currVal && this.currVal.equals(t) ? void 0 : t
        }
    });
    var L = function(t, n) {
            var i = [].slice,
                e = jQuery,
                o = e.extend,
                r = e.isFunction,
                s = o({}, n),
                h = function(n, i, o, s) {
                    return o = r(o) ? o.apply(n, i) : o, r(s[o]) ? s[o].apply(n, i) : void e.error('Method "' + o + '" does not exist on jQuery.' + t)
                },
                l = function() {
                    return h(this, i.call(arguments), s.defaultStatic, l)
                },
                c = function(t) {
                    return r(c[t]) ? c[t].apply(this, i.call(arguments, 1)) : h(this, i.call(arguments), s.defaultMethod, c)
                },
                u = function(t) {
                    t && (o(l, t.statics), o(c, t.methods)), l.modplug = u
                };
            u.prev = {
                statics: e[t],
                methods: e.fn[t]
            }, u(n), e[t] = l, e.fn[t] = c
        },
        M = "fracs";
    L(M, {
        statics: {
            version: "0.15.0",
            Rect: s,
            Fractions: h,
            Group: l,
            ScrollState: f,
            Viewport: p,
            FracsCallbacks: d,
            GroupCallbacks: v,
            ScrollStateCallbacks: w,
            fracs: function(t, n) {
                return h.of(t, n)
            }
        },
        methods: {
            content: function(t) {
                return this.length ? s.ofContent(this[0], t) : null
            },
            envelope: function() {
                return o(this, function(t) {
                    var n = s.ofElement(this);
                    return t ? t.envelope(n) : n
                })
            },
            fracs: function(n, i, o) {
                t(n, "string") || (o = i, i = n, n = null), y(i) || (o = i, i = null), o = e(o);
                var r = M + ".fracs." + x(o);
                return "unbind" === n ? this.each(function() {
                    var t = g(this).data(r);
                    t && t.unbind(i)
                }) : "check" === n ? this.each(function() {
                    var t = g(this).data(r);
                    t && t.check()
                }) : y(i) ? this.each(function() {
                    var t = g(this),
                        n = t.data(r);
                    n || (n = new d(this, o), t.data(r, n)), n.bind(i)
                }) : this.length ? h.of(this[0], o) : null
            },
            intersection: function() {
                return o(this, function(t) {
                    var n = s.ofElement(this);
                    return t ? t.intersection(n) : n
                })
            },
            max: function(t, n, i) {
                return y(n) || (i = n, n = null), i = e(i), n ? (new v(this, i, t, !0).bind(n), this) : this.pushStack(new l(this, i).best(t, !0).el)
            },
            min: function(t, n, i) {
                return y(n) || (i = n, n = null), i = e(i), n ? (new v(this, i, t).bind(n), this) : this.pushStack(new l(this, i).best(t).el)
            },
            rect: function() {
                return this.length ? s.ofElement(this[0]) : null
            },
            scrollState: function(n, i) {
                var e = M + ".scrollState";
                return t(n, "string") || (i = n, n = null), "unbind" === n ? this.each(function() {
                    var t = g(this).data(e);
                    t && t.unbind(i)
                }) : "check" === n ? this.each(function() {
                    var t = g(this).data(e);
                    t && t.check()
                }) : y(i) ? this.each(function() {
                    var t = g(this),
                        n = t.data(e);
                    n || (n = new w(this), t.data(e, n)), n.bind(i)
                }) : this.length ? new f(this[0]) : null
            },
            scroll: function(t, n, i) {
                return this.each(function() {
                    new p(this).scroll(t, n, i)
                })
            },
            scrollTo: function(t, n, i, o) {
                return g.isNumeric(t) && (o = i, i = n, n = t, t = null), t = e(t), this.each(function() {
                    t ? new p(this).scrollToElement(t, n, i, o) : new p(this).scrollTo(n, i, o)
                })
            },
            scrollToThis: function(t, n, i, o) {
                return o = new p(e(o)), o.scrollToElement(this[0], t, n, i), this
            },
            softLink: function(t, n, i, o) {
                return o = new p(e(o)), this.filter("a[href^=#]").each(function() {
                    var e = g(this);
                    e.on("click", function() {
                        o.scrollToElement(g(e.attr("href"))[0], t, n, i)
                    })
                })
            },
            sort: function(n, i, o) {
                return t(i, "boolean") || (o = i, i = null), o = e(o), this.pushStack(g.map(new l(this, o).sorted(n, !i), function(t) {
                    return t.el
                }))
            },
            viewport: function(t) {
                return this.length ? s.ofViewport(this[0], t) : null
            }
        },
        defaultStatic: "fracs",
        defaultMethod: "fracs"
    })
}();
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
}(function($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if (!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
}));

typeof JSON != "object" && (JSON = {}),
    function() {
        "use strict";

        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap,
                u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
                case "string":
                    return quote(a);
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "boolean":
                case "null":
                    return String(a);
                case "object":
                    if (!a) return "null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else
                        for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "  ": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number")
                for (r = 0; r < n; r += 1) indent += " ";
            else typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                "": e
            });
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object")
                    for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }
            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(),
    function(e, t) {
        "use strict";
        var n = e.History = e.History || {},
            r = e.jQuery;
        if (typeof n.Adapter != "undefined") throw new Error("History.js Adapter has already been loaded...");
        n.Adapter = {
            bind: function(e, t, n) {
                r(e).bind(t, n)
            },
            trigger: function(e, t, n) {
                r(e).trigger(t, n)
            },
            extractEventData: function(e, n, r) {
                var i = n && n.originalEvent && n.originalEvent[e] || r && r[e] || t;
                return i
            },
            onDomLoad: function(e) {
                r(e)
            }
        }, typeof n.init != "undefined" && n.init()
    }(window),
    function(e, t) {
        "use strict";
        var n = e.document,
            r = e.setTimeout || r,
            i = e.clearTimeout || i,
            s = e.setInterval || s,
            o = e.History = e.History || {};
        if (typeof o.initHtml4 != "undefined") throw new Error("History.js HTML4 Support has already been loaded...");
        o.initHtml4 = function() {
            if (typeof o.initHtml4.initialized != "undefined") return !1;
            o.initHtml4.initialized = !0, o.enabled = !0, o.savedHashes = [], o.isLastHash = function(e) {
                var t = o.getHashByIndex(),
                    n;
                return n = e === t, n
            }, o.isHashEqual = function(e, t) {
                return e = encodeURIComponent(e).replace(/%25/g, "%"), t = encodeURIComponent(t).replace(/%25/g, "%"), e === t
            }, o.saveHash = function(e) {
                return o.isLastHash(e) ? !1 : (o.savedHashes.push(e), !0)
            }, o.getHashByIndex = function(e) {
                var t = null;
                return typeof e == "undefined" ? t = o.savedHashes[o.savedHashes.length - 1] : e < 0 ? t = o.savedHashes[o.savedHashes.length + e] : t = o.savedHashes[e], t
            }, o.discardedHashes = {}, o.discardedStates = {}, o.discardState = function(e, t, n) {
                var r = o.getHashByState(e),
                    i;
                return i = {
                    discardedState: e,
                    backState: n,
                    forwardState: t
                }, o.discardedStates[r] = i, !0
            }, o.discardHash = function(e, t, n) {
                var r = {
                    discardedHash: e,
                    backState: n,
                    forwardState: t
                };
                return o.discardedHashes[e] = r, !0
            }, o.discardedState = function(e) {
                var t = o.getHashByState(e),
                    n;
                return n = o.discardedStates[t] || !1, n
            }, o.discardedHash = function(e) {
                var t = o.discardedHashes[e] || !1;
                return t
            }, o.recycleState = function(e) {
                var t = o.getHashByState(e);
                return o.discardedState(e) && delete o.discardedStates[t], !0
            }, o.emulated.hashChange && (o.hashChangeInit = function() {
                o.checkerFunction = null;
                var t = "",
                    r, i, u, a, f = Boolean(o.getHash());
                return o.isInternetExplorer() ? (r = "historyjs-iframe", i = n.createElement("iframe"), i.setAttribute("id", r), i.setAttribute("src", "#"), i.style.display = "none", n.body.appendChild(i), i.contentWindow.document.open(), i.contentWindow.document.close(), u = "", a = !1, o.checkerFunction = function() {
                    if (a) return !1;
                    a = !0;
                    var n = o.getHash(),
                        r = o.getHash(i.contentWindow.document);
                    return n !== t ? (t = n, r !== n && (u = r = n, i.contentWindow.document.open(), i.contentWindow.document.close(), i.contentWindow.document.location.hash = o.escapeHash(n)), o.Adapter.trigger(e, "hashchange")) : r !== u && (u = r, f && r === "" ? o.back() : o.setHash(r, !1)), a = !1, !0
                }) : o.checkerFunction = function() {
                    var n = o.getHash() || "";
                    return n !== t && (t = n, o.Adapter.trigger(e, "hashchange")), !0
                }, o.intervalList.push(s(o.checkerFunction, o.options.hashChangeInterval)), !0
            }, o.Adapter.onDomLoad(o.hashChangeInit)), o.emulated.pushState && (o.onHashChange = function(t) {
                var n = t && t.newURL || o.getLocationHref(),
                    r = o.getHashByUrl(n),
                    i = null,
                    s = null,
                    u = null,
                    a;
                return o.isLastHash(r) ? (o.busy(!1), !1) : (o.doubleCheckComplete(), o.saveHash(r), r && o.isTraditionalAnchor(r) ? (o.Adapter.trigger(e, "anchorchange"), o.busy(!1), !1) : (i = o.extractState(o.getFullUrl(r || o.getLocationHref()), !0), o.isLastSavedState(i) ? (o.busy(!1), !1) : (s = o.getHashByState(i), a = o.discardedState(i), a ? (o.getHashByIndex(-2) === o.getHashByState(a.forwardState) ? o.back(!1) : o.forward(!1), !1) : (o.pushState(i.data, i.title, encodeURI(i.url), !1), !0))))
            }, o.Adapter.bind(e, "hashchange", o.onHashChange), o.pushState = function(t, n, r, i) {
                r = encodeURI(r).replace(/%25/g, "%");
                if (o.getHashByUrl(r)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (i !== !1 && o.busy()) return o.pushQueue({
                    scope: o,
                    callback: o.pushState,
                    args: arguments,
                    queue: i
                }), !1;
                o.busy(!0);
                var s = o.createStateObject(t, n, r),
                    u = o.getHashByState(s),
                    a = o.getState(!1),
                    f = o.getHashByState(a),
                    l = o.getHash(),
                    c = o.expectedStateId == s.id;
                return o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), u === f ? (o.busy(!1), !1) : (o.saveState(s), c || o.Adapter.trigger(e, "statechange"), !o.isHashEqual(u, l) && !o.isHashEqual(u, o.getShortUrl(o.getLocationHref())) && o.setHash(u, !1), o.busy(!1), !0)
            }, o.replaceState = function(t, n, r, i) {
                r = encodeURI(r).replace(/%25/g, "%");
                if (o.getHashByUrl(r)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (i !== !1 && o.busy()) return o.pushQueue({
                    scope: o,
                    callback: o.replaceState,
                    args: arguments,
                    queue: i
                }), !1;
                o.busy(!0);
                var s = o.createStateObject(t, n, r),
                    u = o.getHashByState(s),
                    a = o.getState(!1),
                    f = o.getHashByState(a),
                    l = o.getStateByIndex(-2);
                return o.discardState(a, s, l), u === f ? (o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), o.saveState(s), o.Adapter.trigger(e, "statechange"), o.busy(!1)) : o.pushState(s.data, s.title, s.url, !1), !0
            }), o.emulated.pushState && o.getHash() && !o.emulated.hashChange && o.Adapter.onDomLoad(function() {
                o.Adapter.trigger(e, "hashchange")
            })
        }, typeof o.init != "undefined" && o.init()
    }(window),
    function(e, t) {
        "use strict";
        var n = e.console || t,
            r = e.document,
            i = e.navigator,
            s = !1,
            o = e.setTimeout,
            u = e.clearTimeout,
            a = e.setInterval,
            f = e.clearInterval,
            l = e.JSON,
            c = e.alert,
            h = e.History = e.History || {},
            p = e.history;
        try {
            s = e.sessionStorage, s.setItem("TEST", "1"), s.removeItem("TEST")
        } catch (d) {
            s = !1
        }
        l.stringify = l.stringify || l.encode, l.parse = l.parse || l.decode;
        if (typeof h.init != "undefined") throw new Error("History.js Core has already been loaded...");
        h.init = function(e) {
            return typeof h.Adapter == "undefined" ? !1 : (typeof h.initCore != "undefined" && h.initCore(), typeof h.initHtml4 != "undefined" && h.initHtml4(), !0)
        }, h.initCore = function(d) {
            if (typeof h.initCore.initialized != "undefined") return !1;
            h.initCore.initialized = !0, h.options = h.options || {}, h.options.hashChangeInterval = h.options.hashChangeInterval || 100, h.options.safariPollInterval = h.options.safariPollInterval || 500, h.options.doubleCheckInterval = h.options.doubleCheckInterval || 500, h.options.disableSuid = h.options.disableSuid || !1, h.options.storeInterval = h.options.storeInterval || 1e3, h.options.busyDelay = h.options.busyDelay || 250, h.options.debug = h.options.debug || !1, h.options.initialTitle = h.options.initialTitle || r.title, h.options.html4Mode = h.options.html4Mode || !1, h.options.delayInit = h.options.delayInit || !1, h.intervalList = [], h.clearAllIntervals = function() {
                var e, t = h.intervalList;
                if (typeof t != "undefined" && t !== null) {
                    for (e = 0; e < t.length; e++) f(t[e]);
                    h.intervalList = null
                }
            }, h.debug = function() {
                (h.options.debug || !1) && h.log.apply(h, arguments)
            }, h.log = function() {
                var e = typeof n != "undefined" && typeof n.log != "undefined" && typeof n.log.apply != "undefined",
                    t = r.getElementById("log"),
                    i, s, o, u, a;
                e ? (u = Array.prototype.slice.call(arguments), i = u.shift(), typeof n.debug != "undefined" ? n.debug.apply(n, [i, u]) : n.log.apply(n, [i, u])) : i = "\n" + arguments[0] + "\n";
                for (s = 1, o = arguments.length; s < o; ++s) {
                    a = arguments[s];
                    if (typeof a == "object" && typeof l != "undefined") try {
                        a = l.stringify(a)
                    } catch (f) {}
                    i += "\n" + a + "\n"
                }
                return t ? (t.value += i + "\n-----\n", t.scrollTop = t.scrollHeight - t.clientHeight) : e || c(i), !0
            }, h.getInternetExplorerMajorVersion = function() {
                var e = h.getInternetExplorerMajorVersion.cached = typeof h.getInternetExplorerMajorVersion.cached != "undefined" ? h.getInternetExplorerMajorVersion.cached : function() {
                    var e = 3,
                        t = r.createElement("div"),
                        n = t.getElementsByTagName("i");
                    while ((t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && n[0]);
                    return e > 4 ? e : !1
                }();
                return e
            }, h.isInternetExplorer = function() {
                var e = h.isInternetExplorer.cached = typeof h.isInternetExplorer.cached != "undefined" ? h.isInternetExplorer.cached : Boolean(h.getInternetExplorerMajorVersion());
                return e
            }, h.options.html4Mode ? h.emulated = {
                pushState: !0,
                hashChange: !0
            } : h.emulated = {
                pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),
                hashChange: Boolean(!("onhashchange" in e || "onhashchange" in r) || h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8)
            }, h.enabled = !h.emulated.pushState, h.bugs = {
                setHash: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
                safariPoll: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
                ieDoubleCheck: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8),
                hashEscape: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 7)
            }, h.isEmptyObject = function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t)) return !1;
                return !0
            }, h.cloneObject = function(e) {
                var t, n;
                return e ? (t = l.stringify(e), n = l.parse(t)) : n = {}, n
            }, h.getRootUrl = function() {
                var e = r.location.protocol + "//" + (r.location.hostname || r.location.host);
                if (r.location.port || !1) e += ":" + r.location.port;
                return e += "/", e
            }, h.getBaseHref = function() {
                var e = r.getElementsByTagName("base"),
                    t = null,
                    n = "";
                return e.length === 1 && (t = e[0], n = t.href.replace(/[^\/]+$/, "")), n = n.replace(/\/+$/, ""), n && (n += "/"), n
            }, h.getBaseUrl = function() {
                var e = h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();
                return e
            }, h.getPageUrl = function() {
                var e = h.getState(!1, !1),
                    t = (e || {}).url || h.getLocationHref(),
                    n;
                return n = t.replace(/\/+$/, "").replace(/[^\/]+$/, function(e, t, n) {
                    return /\./.test(e) ? e : e + "/"
                }), n
            }, h.getBasePageUrl = function() {
                var e = h.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e, t, n) {
                    return /[^\/]$/.test(e) ? "" : e
                }).replace(/\/+$/, "") + "/";
                return e
            }, h.getFullUrl = function(e, t) {
                var n = e,
                    r = e.substring(0, 1);
                return t = typeof t == "undefined" ? !0 : t, /[a-z]+\:\/\//.test(e) || (r === "/" ? n = h.getRootUrl() + e.replace(/^\/+/, "") : r === "#" ? n = h.getPageUrl().replace(/#.*/, "") + e : r === "?" ? n = h.getPageUrl().replace(/[\?#].*/, "") + e : t ? n = h.getBaseUrl() + e.replace(/^(\.\/)+/, "") : n = h.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), n.replace(/\#$/, "")
            }, h.getShortUrl = function(e) {
                var t = e,
                    n = h.getBaseUrl(),
                    r = h.getRootUrl();
                return h.emulated.pushState && (t = t.replace(n, "")), t = t.replace(r, "/"), h.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), t
            }, h.getLocationHref = function(e) {
                return e = e || r, e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : e.URL.indexOf("#") == -1 && e.location.href.indexOf("#") != -1 ? e.location.href : e.URL || e.location.href
            }, h.store = {}, h.idToState = h.idToState || {}, h.stateToId = h.stateToId || {}, h.urlToId = h.urlToId || {}, h.storedStates = h.storedStates || [], h.savedStates = h.savedStates || [], h.normalizeStore = function() {
                h.store.idToState = h.store.idToState || {}, h.store.urlToId = h.store.urlToId || {}, h.store.stateToId = h.store.stateToId || {}
            }, h.getState = function(e, t) {
                typeof e == "undefined" && (e = !0), typeof t == "undefined" && (t = !0);
                var n = h.getLastSavedState();
                return !n && t && (n = h.createStateObject()), e && (n = h.cloneObject(n), n.url = n.cleanUrl || n.url), n
            }, h.getIdByState = function(e) {
                var t = h.extractId(e.url),
                    n;
                if (!t) {
                    n = h.getStateString(e);
                    if (typeof h.stateToId[n] != "undefined") t = h.stateToId[n];
                    else if (typeof h.store.stateToId[n] != "undefined") t = h.store.stateToId[n];
                    else {
                        for (;;) {
                            t = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
                            if (typeof h.idToState[t] == "undefined" && typeof h.store.idToState[t] == "undefined") break
                        }
                        h.stateToId[n] = t, h.idToState[t] = e
                    }
                }
                return t
            }, h.normalizeState = function(e) {
                var t, n;
                if (!e || typeof e != "object") e = {};
                if (typeof e.normalized != "undefined") return e;
                if (!e.data || typeof e.data != "object") e.data = {};
                return t = {}, t.normalized = !0, t.title = e.title || "", t.url = h.getFullUrl(e.url ? e.url : h.getLocationHref()), t.hash = h.getShortUrl(t.url), t.data = h.cloneObject(e.data), t.id = h.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, n = !h.isEmptyObject(t.data), (t.title || n) && h.options.disableSuid !== !0 && (t.hash = h.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = h.getFullUrl(t.hash), (h.emulated.pushState || h.bugs.safariPoll) && h.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t
            }, h.createStateObject = function(e, t, n) {
                var r = {
                    data: e,
                    title: t,
                    url: n
                };
                return r = h.normalizeState(r), r
            }, h.getStateById = function(e) {
                e = String(e);
                var n = h.idToState[e] || h.store.idToState[e] || t;
                return n
            }, h.getStateString = function(e) {
                var t, n, r;
                return t = h.normalizeState(e), n = {
                    data: t.data,
                    title: e.title,
                    url: e.url
                }, r = l.stringify(n), r
            }, h.getStateId = function(e) {
                var t, n;
                return t = h.normalizeState(e), n = t.id, n
            }, h.getHashByState = function(e) {
                var t, n;
                return t = h.normalizeState(e), n = t.hash, n
            }, h.extractId = function(e) {
                var t, n, r, i;
                return e.indexOf("#") != -1 ? i = e.split("#")[0] : i = e, n = /(.*)\&_suid=([0-9]+)$/.exec(i), r = n ? n[1] || e : e, t = n ? String(n[2] || "") : "", t || !1
            }, h.isTraditionalAnchor = function(e) {
                var t = !/[\/\?\.]/.test(e);
                return t
            }, h.extractState = function(e, t) {
                var n = null,
                    r, i;
                return t = t || !1, r = h.extractId(e), r && (n = h.getStateById(r)), n || (i = h.getFullUrl(e), r = h.getIdByUrl(i) || !1, r && (n = h.getStateById(r)), !n && t && !h.isTraditionalAnchor(e) && (n = h.createStateObject(null, null, i))), n
            }, h.getIdByUrl = function(e) {
                var n = h.urlToId[e] || h.store.urlToId[e] || t;
                return n
            }, h.getLastSavedState = function() {
                return h.savedStates[h.savedStates.length - 1] || t
            }, h.getLastStoredState = function() {
                return h.storedStates[h.storedStates.length - 1] || t
            }, h.hasUrlDuplicate = function(e) {
                var t = !1,
                    n;
                return n = h.extractState(e.url), t = n && n.id !== e.id, t
            }, h.storeState = function(e) {
                return h.urlToId[e.url] = e.id, h.storedStates.push(h.cloneObject(e)), e
            }, h.isLastSavedState = function(e) {
                var t = !1,
                    n, r, i;
                return h.savedStates.length && (n = e.id, r = h.getLastSavedState(), i = r.id, t = n === i), t
            }, h.saveState = function(e) {
                return h.isLastSavedState(e) ? !1 : (h.savedStates.push(h.cloneObject(e)), !0)
            }, h.getStateByIndex = function(e) {
                var t = null;
                return typeof e == "undefined" ? t = h.savedStates[h.savedStates.length - 1] : e < 0 ? t = h.savedStates[h.savedStates.length + e] : t = h.savedStates[e], t
            }, h.getCurrentIndex = function() {
                var e = null;
                return h.savedStates.length < 1 ? e = 0 : e = h.savedStates.length - 1, e
            }, h.getHash = function(e) {
                var t = h.getLocationHref(e),
                    n;
                return n = h.getHashByUrl(t), n
            }, h.unescapeHash = function(e) {
                var t = h.normalizeHash(e);
                return t = decodeURIComponent(t), t
            }, h.normalizeHash = function(e) {
                var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");
                return t
            }, h.setHash = function(e, t) {
                var n, i;
                return t !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.setHash,
                    args: arguments,
                    queue: t
                }), !1) : (h.busy(!0), n = h.extractState(e, !0), n && !h.emulated.pushState ? h.pushState(n.data, n.title, n.url, !1) : h.getHash() !== e && (h.bugs.setHash ? (i = h.getPageUrl(), h.pushState(null, null, i + "#" + e, !1)) : r.location.hash = e), h)
            }, h.escapeHash = function(t) {
                var n = h.normalizeHash(t);
                return n = e.encodeURIComponent(n), h.bugs.hashEscape || (n = n.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), n
            }, h.getHashByUrl = function(e) {
                var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                return t = h.unescapeHash(t), t
            }, h.setTitle = function(e) {
                var t = e.title,
                    n;
                t || (n = h.getStateByIndex(0), n && n.url === e.url && (t = n.title || h.options.initialTitle));
                try {
                    r.getElementsByTagName("title")[0].innerHTML = t.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                } catch (i) {}
                return r.title = t, h
            }, h.queues = [], h.busy = function(e) {
                typeof e != "undefined" ? h.busy.flag = e : typeof h.busy.flag == "undefined" && (h.busy.flag = !1);
                if (!h.busy.flag) {
                    u(h.busy.timeout);
                    var t = function() {
                        var e, n, r;
                        if (h.busy.flag) return;
                        for (e = h.queues.length - 1; e >= 0; --e) {
                            n = h.queues[e];
                            if (n.length === 0) continue;
                            r = n.shift(), h.fireQueueItem(r), h.busy.timeout = o(t, h.options.busyDelay)
                        }
                    };
                    h.busy.timeout = o(t, h.options.busyDelay)
                }
                return h.busy.flag
            }, h.busy.flag = !1, h.fireQueueItem = function(e) {
                return e.callback.apply(e.scope || h, e.args || [])
            }, h.pushQueue = function(e) {
                return h.queues[e.queue || 0] = h.queues[e.queue || 0] || [], h.queues[e.queue || 0].push(e), h
            }, h.queue = function(e, t) {
                return typeof e == "function" && (e = {
                    callback: e
                }), typeof t != "undefined" && (e.queue = t), h.busy() ? h.pushQueue(e) : h.fireQueueItem(e), h
            }, h.clearQueue = function() {
                return h.busy.flag = !1, h.queues = [], h
            }, h.stateChanged = !1, h.doubleChecker = !1, h.doubleCheckComplete = function() {
                return h.stateChanged = !0, h.doubleCheckClear(), h
            }, h.doubleCheckClear = function() {
                return h.doubleChecker && (u(h.doubleChecker), h.doubleChecker = !1), h
            }, h.doubleCheck = function(e) {
                return h.stateChanged = !1, h.doubleCheckClear(), h.bugs.ieDoubleCheck && (h.doubleChecker = o(function() {
                    return h.doubleCheckClear(), h.stateChanged || e(), !0
                }, h.options.doubleCheckInterval)), h
            }, h.safariStatePoll = function() {
                var t = h.extractState(h.getLocationHref()),
                    n;
                if (!h.isLastSavedState(t)) return n = t, n || (n = h.createStateObject()), h.Adapter.trigger(e, "popstate"), h;
                return
            }, h.back = function(e) {
                return e !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.back,
                    args: arguments,
                    queue: e
                }), !1) : (h.busy(!0), h.doubleCheck(function() {
                    h.back(!1)
                }), p.go(-1), !0)
            }, h.forward = function(e) {
                return e !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.forward,
                    args: arguments,
                    queue: e
                }), !1) : (h.busy(!0), h.doubleCheck(function() {
                    h.forward(!1)
                }), p.go(1), !0)
            }, h.go = function(e, t) {
                var n;
                if (e > 0)
                    for (n = 1; n <= e; ++n) h.forward(t);
                else {
                    if (!(e < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                    for (n = -1; n >= e; --n) h.back(t)
                }
                return h
            };
            if (h.emulated.pushState) {
                var v = function() {};
                h.pushState = h.pushState || v, h.replaceState = h.replaceState || v
            } else h.onPopState = function(t, n) {
                var r = !1,
                    i = !1,
                    s, o;
                return h.doubleCheckComplete(), s = h.getHash(), s ? (o = h.extractState(s || h.getLocationHref(), !0), o ? h.replaceState(o.data, o.title, o.url, !1) : (h.Adapter.trigger(e, "anchorchange"), h.busy(!1)), h.expectedStateId = !1, !1) : (r = h.Adapter.extractEventData("state", t, n) || !1, r ? i = h.getStateById(r) : h.expectedStateId ? i = h.getStateById(h.expectedStateId) : i = h.extractState(h.getLocationHref()), i || (i = h.createStateObject(null, null, h.getLocationHref())), h.expectedStateId = !1, h.isLastSavedState(i) ? (h.busy(!1), !1) : (h.storeState(i), h.saveState(i), h.setTitle(i), h.Adapter.trigger(e, "statechange"), h.busy(!1), !0))
            }, h.Adapter.bind(e, "popstate", h.onPopState), h.pushState = function(t, n, r, i) {
                if (h.getHashByUrl(r) && h.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (i !== !1 && h.busy()) return h.pushQueue({
                    scope: h,
                    callback: h.pushState,
                    args: arguments,
                    queue: i
                }), !1;
                h.busy(!0);
                var s = h.createStateObject(t, n, r);
                return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.pushState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0
            }, h.replaceState = function(t, n, r, i) {
                if (h.getHashByUrl(r) && h.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (i !== !1 && h.busy()) return h.pushQueue({
                    scope: h,
                    callback: h.replaceState,
                    args: arguments,
                    queue: i
                }), !1;
                h.busy(!0);
                var s = h.createStateObject(t, n, r);
                return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.replaceState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0
            };
            if (s) {
                try {
                    h.store = l.parse(s.getItem("History.store")) || {}
                } catch (m) {
                    h.store = {}
                }
                h.normalizeStore()
            } else h.store = {}, h.normalizeStore();
            h.Adapter.bind(e, "unload", h.clearAllIntervals), h.saveState(h.storeState(h.extractState(h.getLocationHref(), !0))), s && (h.onUnload = function() {
                var e, t, n;
                try {
                    e = l.parse(s.getItem("History.store")) || {}
                } catch (r) {
                    e = {}
                }
                e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};
                for (t in h.idToState) {
                    if (!h.idToState.hasOwnProperty(t)) continue;
                    e.idToState[t] = h.idToState[t]
                }
                for (t in h.urlToId) {
                    if (!h.urlToId.hasOwnProperty(t)) continue;
                    e.urlToId[t] = h.urlToId[t]
                }
                for (t in h.stateToId) {
                    if (!h.stateToId.hasOwnProperty(t)) continue;
                    e.stateToId[t] = h.stateToId[t]
                }
                h.store = e, h.normalizeStore(), n = l.stringify(e);
                try {
                    s.setItem("History.store", n)
                } catch (i) {
                    if (i.code !== DOMException.QUOTA_EXCEEDED_ERR) throw i;
                    s.length && (s.removeItem("History.store"), s.setItem("History.store", n))
                }
            }, h.intervalList.push(a(h.onUnload, h.options.storeInterval)), h.Adapter.bind(e, "beforeunload", h.onUnload), h.Adapter.bind(e, "unload", h.onUnload));
            if (!h.emulated.pushState) {
                h.bugs.safariPoll && h.intervalList.push(a(h.safariStatePoll, h.options.safariPollInterval));
                if (i.vendor === "Apple Computer, Inc." || (i.appCodeName || "") === "Mozilla") h.Adapter.bind(e, "hashchange", function() {
                    h.Adapter.trigger(e, "popstate")
                }), h.getHash() && h.Adapter.onDomLoad(function() {
                    h.Adapter.trigger(e, "hashchange")
                })
            }
        }, (!h.options || !h.options.delayInit) && h.init()
    }(window)
    /*!
    Waypoints - 4.0.0
    Copyright © 2011-2015 Caleb Troughton
    Licensed under the MIT license.
    https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
    */
    ! function() {
        "use strict";

        function t(o) {
            if (!o) throw new Error("No options passed to Waypoint constructor");
            if (!o.element) throw new Error("No element option passed to Waypoint constructor");
            if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
            this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis
            }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
        }
        var e = 0,
            i = {};
        t.prototype.queueTrigger = function(t) {
            this.group.queueTrigger(this, t)
        }, t.prototype.trigger = function(t) {
            this.enabled && this.callback && this.callback.apply(this, t)
        }, t.prototype.destroy = function() {
            this.context.remove(this), this.group.remove(this), delete i[this.key]
        }, t.prototype.disable = function() {
            return this.enabled = !1, this
        }, t.prototype.enable = function() {
            return this.context.refresh(), this.enabled = !0, this
        }, t.prototype.next = function() {
            return this.group.next(this)
        }, t.prototype.previous = function() {
            return this.group.previous(this)
        }, t.invokeAll = function(t) {
            var e = [];
            for (var o in i) e.push(i[o]);
            for (var n = 0, r = e.length; r > n; n++) e[n][t]()
        }, t.destroyAll = function() {
            t.invokeAll("destroy")
        }, t.disableAll = function() {
            t.invokeAll("disable")
        }, t.enableAll = function() {
            t.invokeAll("enable")
        }, t.refreshAll = function() {
            t.Context.refreshAll()
        }, t.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }, t.viewportWidth = function() {
            return document.documentElement.clientWidth
        }, t.adapters = [], t.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: "default",
            horizontal: !1,
            offset: 0
        }, t.offsetAliases = {
            "bottom-in-view": function() {
                return this.context.innerHeight() - this.adapter.outerHeight()
            },
            "right-in-view": function() {
                return this.context.innerWidth() - this.adapter.outerWidth()
            }
        }, window.Waypoint = t
    }(),
    function() {
        "use strict";

        function t(t) {
            window.setTimeout(t, 1e3 / 60)
        }

        function e(t) {
            this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }, this.waypoints = {
                vertical: {},
                horizontal: {}
            }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
        }
        var i = 0,
            o = {},
            n = window.Waypoint,
            r = window.onload;
        e.prototype.add = function(t) {
            var e = t.options.horizontal ? "horizontal" : "vertical";
            this.waypoints[e][t.key] = t, this.refresh()
        }, e.prototype.checkEmpty = function() {
            var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                e = this.Adapter.isEmptyObject(this.waypoints.vertical);
            t && e && (this.adapter.off(".waypoints"), delete o[this.key])
        }, e.prototype.createThrottledResizeHandler = function() {
            function t() {
                e.handleResize(), e.didResize = !1
            }
            var e = this;
            this.adapter.on("resize.waypoints", function() {
                e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
            })
        }, e.prototype.createThrottledScrollHandler = function() {
            function t() {
                e.handleScroll(), e.didScroll = !1
            }
            var e = this;
            this.adapter.on("scroll.waypoints", function() {
                (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
            })
        }, e.prototype.handleResize = function() {
            n.Context.refreshAll()
        }, e.prototype.handleScroll = function() {
            var t = {},
                e = {
                    horizontal: {
                        newScroll: this.adapter.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.adapter.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
            for (var i in e) {
                var o = e[i],
                    n = o.newScroll > o.oldScroll,
                    r = n ? o.forward : o.backward;
                for (var s in this.waypoints[i]) {
                    var a = this.waypoints[i][s],
                        l = o.oldScroll < a.triggerPoint,
                        h = o.newScroll >= a.triggerPoint,
                        p = l && h,
                        u = !l && !h;
                    (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
                }
            }
            for (var c in t) t[c].flushTriggers();
            this.oldScroll = {
                x: e.horizontal.newScroll,
                y: e.vertical.newScroll
            }
        }, e.prototype.innerHeight = function() {
            return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
        }, e.prototype.remove = function(t) {
            delete this.waypoints[t.axis][t.key], this.checkEmpty()
        }, e.prototype.innerWidth = function() {
            return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
        }, e.prototype.destroy = function() {
            var t = [];
            for (var e in this.waypoints)
                for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
            for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
        }, e.prototype.refresh = function() {
            var t, e = this.element == this.element.window,
                i = e ? void 0 : this.adapter.offset(),
                o = {};
            this.handleScroll(), t = {
                horizontal: {
                    contextOffset: e ? 0 : i.left,
                    contextScroll: e ? 0 : this.oldScroll.x,
                    contextDimension: this.innerWidth(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left",
                    offsetProp: "left"
                },
                vertical: {
                    contextOffset: e ? 0 : i.top,
                    contextScroll: e ? 0 : this.oldScroll.y,
                    contextDimension: this.innerHeight(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up",
                    offsetProp: "top"
                }
            };
            for (var r in t) {
                var s = t[r];
                for (var a in this.waypoints[r]) {
                    var l, h, p, u, c, d = this.waypoints[r][a],
                        f = d.options.offset,
                        w = d.triggerPoint,
                        y = 0,
                        g = null == w;
                    d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = y + l - f, h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
                }
            }
            return n.requestAnimationFrame(function() {
                for (var t in o) o[t].flushTriggers()
            }), this
        }, e.findOrCreateByElement = function(t) {
            return e.findByElement(t) || new e(t)
        }, e.refreshAll = function() {
            for (var t in o) o[t].refresh()
        }, e.findByElement = function(t) {
            return o[t.waypointContextKey]
        }, window.onload = function() {
            r && r(), e.refreshAll()
        }, n.requestAnimationFrame = function(e) {
            var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
            i.call(window, e)
        }, n.Context = e
    }(),
    function() {
        "use strict";

        function t(t, e) {
            return t.triggerPoint - e.triggerPoint
        }

        function e(t, e) {
            return e.triggerPoint - t.triggerPoint
        }

        function i(t) {
            this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
        }
        var o = {
                vertical: {},
                horizontal: {}
            },
            n = window.Waypoint;
        i.prototype.add = function(t) {
            this.waypoints.push(t)
        }, i.prototype.clearTriggerQueues = function() {
            this.triggerQueues = {
                up: [],
                down: [],
                left: [],
                right: []
            }
        }, i.prototype.flushTriggers = function() {
            for (var i in this.triggerQueues) {
                var o = this.triggerQueues[i],
                    n = "up" === i || "left" === i;
                o.sort(n ? e : t);
                for (var r = 0, s = o.length; s > r; r += 1) {
                    var a = o[r];
                    (a.options.continuous || r === o.length - 1) && a.trigger([i])
                }
            }
            this.clearTriggerQueues()
        }, i.prototype.next = function(e) {
            this.waypoints.sort(t);
            var i = n.Adapter.inArray(e, this.waypoints),
                o = i === this.waypoints.length - 1;
            return o ? null : this.waypoints[i + 1]
        }, i.prototype.previous = function(e) {
            this.waypoints.sort(t);
            var i = n.Adapter.inArray(e, this.waypoints);
            return i ? this.waypoints[i - 1] : null
        }, i.prototype.queueTrigger = function(t, e) {
            this.triggerQueues[e].push(t)
        }, i.prototype.remove = function(t) {
            var e = n.Adapter.inArray(t, this.waypoints);
            e > -1 && this.waypoints.splice(e, 1)
        }, i.prototype.first = function() {
            return this.waypoints[0]
        }, i.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1]
        }, i.findOrCreate = function(t) {
            return o[t.axis][t.name] || new i(t)
        }, n.Group = i
    }(),
    function() {
        "use strict";

        function t(t) {
            this.$element = e(t)
        }
        var e = window.jQuery,
            i = window.Waypoint;
        e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
            t.prototype[i] = function() {
                var t = Array.prototype.slice.call(arguments);
                return this.$element[i].apply(this.$element, t)
            }
        }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
            t[o] = e[o]
        }), i.adapters.push({
            name: "jquery",
            Adapter: t
        }), i.Adapter = t
    }(),
    function() {
        "use strict";

        function t(t) {
            return function() {
                var i = [],
                    o = arguments[0];
                return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
                    var n = t.extend({}, o, {
                        element: this
                    });
                    "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
                }), i
            }
        }
        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
    }();
(function(window) {
    'use strict';

    // jsmpeg by Dominic Szablewski - phoboslab.org, github.com/phoboslab
    //
    // Consider this to be under MIT license. It's largely based an an Open Source
    // Decoder for Java under GPL, while I looked at another Decoder from Nokia
    // (under no particular license?) for certain aspects.
    // I'm not sure if this work is "derivative" enough to have a different license
    // but then again, who still cares about MPEG1?
    //
    // Based on "Java MPEG-1 Video Decoder and Player" by Korandi Zoltan:
    // http://sourceforge.net/projects/javampeg1video/
    //
    // Inspired by "MPEG Decoder in Java ME" by Nokia:
    // http://www.developer.nokia.com/Community/Wiki/MPEG_decoder_in_Java_ME

    var requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var jsmpeg = window.jsmpeg = function(url, opts) {
        opts = opts || {};
        this.progressive = (opts.progressive !== false);
        this.benchmark = !!opts.benchmark;
        this.canvas = opts.canvas || document.createElement('canvas');
        this.autoplay = !!opts.autoplay;
        this.wantsToPlay = this.autoplay;
        this.loop = !!opts.loop;
        this.seekable = !!opts.seekable;
        this.externalLoadCallback = opts.onload || null;
        this.externalDecodeCallback = opts.ondecodeframe || null;
        this.externalFinishedCallback = opts.onfinished || null;
        this.externalFinishedCallbackFired = false;

        this.customIntraQuantMatrix = new Uint8Array(64);
        this.customNonIntraQuantMatrix = new Uint8Array(64);
        this.blockData = new Int32Array(64);
        this.zeroBlockData = new Int32Array(64);
        this.fillArray(this.zeroBlockData, 0);

        // use WebGL for YCbCrToRGBA conversion if possible (much faster)
        if (!opts.forceCanvas2D && this.initWebGL()) {
            this.renderFrame = this.renderFrameGL;
        } else {
            this.canvasContext = this.canvas.getContext('2d');
            this.renderFrame = this.renderFrame2D;
        }

        if (url instanceof WebSocket) {
            this.client = url;
            this.client.onopen = this.initSocketClient.bind(this);
        } else {
            this.load(url);
        }
    };

    // ----------------------------------------------------------------------------
    // Streaming over WebSockets

    jsmpeg.prototype.waitForIntraFrame = true;
    jsmpeg.prototype.socketBufferSize = 512 * 1024; // 512kb each

    jsmpeg.prototype.initSocketClient = function() {
        this.buffer = new BitReader(new ArrayBuffer(this.socketBufferSize));

        this.nextPictureBuffer = new BitReader(new ArrayBuffer(this.socketBufferSize));
        this.nextPictureBuffer.writePos = 0;
        this.nextPictureBuffer.chunkBegin = 0;
        this.nextPictureBuffer.lastWriteBeforeWrap = 0;

        this.client.binaryType = 'arraybuffer';
        this.client.onmessage = this.receiveSocketMessage.bind(this);
    };

    jsmpeg.prototype.decodeSocketHeader = function(data) {
        // Custom header sent to all newly connected clients when streaming
        // over websockets:
        // struct { char magic[4] = 'jsmp'; unsigned short width, height; };
        if (
            data[0] === SOCKET_MAGIC_BYTES.charCodeAt(0) &&
            data[1] === SOCKET_MAGIC_BYTES.charCodeAt(1) &&
            data[2] === SOCKET_MAGIC_BYTES.charCodeAt(2) &&
            data[3] === SOCKET_MAGIC_BYTES.charCodeAt(3)
        ) {
            this.width = (data[4] * 256 + data[5]);
            this.height = (data[6] * 256 + data[7]);
            this.initBuffers();
        }
    };

    jsmpeg.prototype.receiveSocketMessage = function(event) {
        var messageData = new Uint8Array(event.data);

        if (!this.sequenceStarted) {
            this.decodeSocketHeader(messageData);
        }

        var current = this.buffer;
        var next = this.nextPictureBuffer;

        if (next.writePos + messageData.length > next.length) {
            next.lastWriteBeforeWrap = next.writePos;
            next.writePos = 0;
            next.index = 0;
        }

        next.bytes.set(messageData, next.writePos);
        next.writePos += messageData.length;

        var startCode = 0;
        while (true) {
            startCode = next.findNextMPEGStartCode();
            if (
                startCode === BitReader.NOT_FOUND ||
                ((next.index >> 3) > next.writePos)
            ) {
                // We reached the end with no picture found yet; move back a few bytes
                // in case we are at the beginning of a start code and exit.
                next.index = Math.max((next.writePos - 3), 0) << 3;
                return;
            } else if (startCode === START_PICTURE) {
                break;
            }
        }

        // If we are still here, we found the next picture start code!

        // Skip picture decoding until we find the first intra frame?
        if (this.waitForIntraFrame) {
            next.advance(10); // skip temporalReference
            if (next.getBits(3) === PICTURE_TYPE_I) {
                this.waitForIntraFrame = false;
                next.chunkBegin = (next.index - 13) >> 3;
            }
            return;
        }

        // Last picture hasn't been decoded yet? Decode now but skip output
        // before scheduling the next one
        if (!this.currentPictureDecoded) {
            this.decodePicture(DECODE_SKIP_OUTPUT);
        }

        // Copy the picture chunk over to 'this.buffer' and schedule decoding.
        var chunkEnd = ((next.index) >> 3);

        if (chunkEnd > next.chunkBegin) {
            // Just copy the current picture chunk
            current.bytes.set(next.bytes.subarray(next.chunkBegin, chunkEnd));
            current.writePos = chunkEnd - next.chunkBegin;
        } else {
            // We wrapped the nextPictureBuffer around, so we have to copy the last part
            // till the end, as well as from 0 to the current writePos
            current.bytes.set(next.bytes.subarray(next.chunkBegin, next.lastWriteBeforeWrap));
            var written = next.lastWriteBeforeWrap - next.chunkBegin;
            current.bytes.set(next.bytes.subarray(0, chunkEnd), written);
            current.writePos = chunkEnd + written;
        }

        current.index = 0;
        next.chunkBegin = chunkEnd;

        // Decode!
        this.currentPictureDecoded = false;
        requestAnimFrame(this.scheduleDecoding.bind(this), this.canvas);
    };

    jsmpeg.prototype.scheduleDecoding = function() {
        this.decodePicture();
        this.currentPictureDecoded = true;
    };

    // ----------------------------------------------------------------------------
    // Recording from WebSockets

    jsmpeg.prototype.isRecording = false;
    jsmpeg.prototype.recorderWaitForIntraFrame = false;
    jsmpeg.prototype.recordedFrames = 0;
    jsmpeg.prototype.recordedSize = 0;
    jsmpeg.prototype.didStartRecordingCallback = null;

    jsmpeg.prototype.recordBuffers = [];

    jsmpeg.prototype.canRecord = function() {
        return (this.client && this.client.readyState === this.client.OPEN);
    };

    jsmpeg.prototype.startRecording = function(callback) {
        if (!this.canRecord()) {
            return;
        }

        // Discard old buffers and set for recording
        this.discardRecordBuffers();
        this.isRecording = true;
        this.recorderWaitForIntraFrame = true;
        this.didStartRecordingCallback = callback || null;

        this.recordedFrames = 0;
        this.recordedSize = 0;

        // Fudge a simple Sequence Header for the MPEG file

        // 3 bytes width & height, 12 bits each
        var wh1 = (this.width >> 4),
            wh2 = ((this.width & 0xf) << 4) | (this.height >> 8),
            wh3 = (this.height & 0xff);

        this.recordBuffers.push(new Uint8Array([
            0x00, 0x00, 0x01, 0xb3, // Sequence Start Code
            wh1, wh2, wh3, // Width & height
            0x13, // aspect ratio & framerate
            0xff, 0xff, 0xe1, 0x58, // Meh. Bitrate and other boring stuff
            0x00, 0x00, 0x01, 0xb8, 0x00, 0x08, 0x00, // GOP
            0x00, 0x00, 0x00, 0x01, 0x00 // First Picture Start Code
        ]));
    };

    jsmpeg.prototype.recordFrameFromCurrentBuffer = function() {
        if (!this.isRecording) {
            return;
        }

        if (this.recorderWaitForIntraFrame) {
            // Not an intra frame? Exit.
            if (this.pictureCodingType !== PICTURE_TYPE_I) {
                return;
            }

            // Start recording!
            this.recorderWaitForIntraFrame = false;
            if (this.didStartRecordingCallback) {
                this.didStartRecordingCallback(this);
            }
        }

        this.recordedFrames++;
        this.recordedSize += this.buffer.writePos;

        // Copy the actual subrange for the current picture into a new Buffer
        this.recordBuffers.push(new Uint8Array(this.buffer.bytes.subarray(0, this.buffer.writePos)));
    };

    jsmpeg.prototype.discardRecordBuffers = function() {
        this.recordBuffers = [];
        this.recordedFrames = 0;
    };

    jsmpeg.prototype.stopRecording = function() {
        var blob = new Blob(this.recordBuffers, {
            type: 'video/mpeg'
        });
        this.discardRecordBuffers();
        this.isRecording = false;
        return blob;
    };

    // ----------------------------------------------------------------------------
    // Loading via Ajax

    jsmpeg.prototype.intraFrames = [];
    jsmpeg.prototype.currentFrame = -1;
    jsmpeg.prototype.currentTime = 0;
    jsmpeg.prototype.frameCount = 0;
    jsmpeg.prototype.duration = 0;
    jsmpeg.prototype.progressiveMinSize = 128 * 1024;

    jsmpeg.prototype.fetchReaderPump = function(reader) {
        var that = this;
        reader.read().then(function(result) {
            that.fetchReaderReceive(reader, result);
        });
    };

    jsmpeg.prototype.fetchReaderReceive = function(reader, result) {
        if (result.done) {
            if (this.seekable) {
                var currentBufferPos = this.buffer.index;
                this.collectIntraFrames();
                this.buffer.index = currentBufferPos;
            }

            this.duration = this.frameCount / this.pictureRate;
            this.lastFrameIndex = this.buffer.writePos << 3;
            return;
        }

        this.buffer.bytes.set(result.value, this.buffer.writePos);
        this.buffer.writePos += result.value.byteLength;

        // Find the last picture start code - we have to be careful not trying
        // to decode any frames that aren't fully loaded yet.
        this.lastFrameIndex = this.findLastPictureStartCode();

        // Initialize the sequence headers and start playback if we have enough data
        // (at least 128kb)
        if (!this.sequenceStarted && this.buffer.writePos >= this.progressiveMinSize) {
            this.findStartCode(START_SEQUENCE);
            this.firstSequenceHeader = this.buffer.index;
            this.decodeSequenceHeader();

            // Load the first frame
            this.nextFrame();

            if (this.autoplay) {
                this.play();
            }

            if (this.externalLoadCallback) {
                this.externalLoadCallback(this);
            }
        }

        // If the player starved previously, restart playback now
        else if (this.sequenceStarted && this.wantsToPlay && !this.playing) {
            this.play();
        }

        // Not enough data to start playback yet - show loading progress
        else if (!this.sequenceStarted) {
            var status = {
                loaded: this.buffer.writePos,
                total: this.progressiveMinSize
            };
            if (this.gl) {
                this.updateLoaderGL(status);
            } else {
                this.updateLoader2D(status);
            }
        }

        this.fetchReaderPump(reader);
    };

    jsmpeg.prototype.findLastPictureStartCode = function() {
        var bufferBytes = this.buffer.bytes;
        for (var i = this.buffer.writePos; i > 3; i--) {
            if (
                bufferBytes[i] == START_PICTURE &&
                bufferBytes[i - 1] == 0x01 &&
                bufferBytes[i - 2] == 0x00 &&
                bufferBytes[i - 3] == 0x00
            ) {
                return (i - 3) << 3;
            }
        }
        return 0;
    };

    jsmpeg.prototype.load = function(url) {
        this.url = url;

        var that = this;
        if (
            this.progressive &&
            window.fetch &&
            window.ReadableByteStream
        ) {
            var reqHeaders = new Headers();
            reqHeaders.append('Content-Type', 'video/mpeg');
            fetch(url, {
                headers: reqHeaders
            }).then(function(res) {
                var contentLength = res.headers.get('Content-Length');
                var reader = res.body.getReader();

                that.buffer = new BitReader(new ArrayBuffer(contentLength));
                that.buffer.writePos = 0;
                that.fetchReaderPump(reader);
            });
        } else {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState === request.DONE && request.status === 200) {
                    that.loadCallback(request.response);
                }
            };

            request.onprogress = this.gl ? this.updateLoaderGL.bind(this) : this.updateLoader2D.bind(this);

            request.open('GET', url);
            request.responseType = 'arraybuffer';
            request.send();
        }
    };

    jsmpeg.prototype.updateLoader2D = function(ev) {
        var
            p = ev.loaded / ev.total,
            w = this.canvas.width,
            h = this.canvas.height,
            ctx = this.canvasContext;

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, h - h * p, w, h * p);
    };

    jsmpeg.prototype.updateLoaderGL = function(ev) {
        var gl = this.gl;
        gl.uniform1f(gl.getUniformLocation(this.loadingProgram, 'loaded'), (ev.loaded / ev.total));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    jsmpeg.prototype.loadCallback = function(file) {
        this.buffer = new BitReader(file);

        if (this.seekable) {
            this.collectIntraFrames();
            this.buffer.index = 0;
        }

        this.findStartCode(START_SEQUENCE);
        this.firstSequenceHeader = this.buffer.index;
        this.decodeSequenceHeader();

        // Calculate the duration. This only works if the video is seekable and we have a frame count
        this.duration = this.frameCount / this.pictureRate;

        // Load the first frame
        this.nextFrame();

        if (this.autoplay) {
            this.play();
        }

        if (this.externalLoadCallback) {
            this.externalLoadCallback(this);
        }
    };

    jsmpeg.prototype.collectIntraFrames = function() {
        // Loop through the whole buffer and collect all intraFrames to build our seek index.
        // We also keep track of total frame count here
        var frame;
        for (frame = 0; this.findStartCode(START_PICTURE) !== BitReader.NOT_FOUND; frame++) {

            // Check if the found picture is an intra frame and remember the position
            this.buffer.advance(10); // skip temporalReference
            if (this.buffer.getBits(3) === PICTURE_TYPE_I) {
                // Remember index 13 bits back, before temporalReference and picture type
                this.intraFrames.push({
                    frame: frame,
                    index: this.buffer.index - 13
                });
            }
        }

        this.frameCount = frame;
    };

    jsmpeg.prototype.seekToFrame = function(seekFrame, seekExact) {
        if (seekFrame < 0 || seekFrame >= this.frameCount || !this.intraFrames.length) {
            return false;
        }

        // Find the last intra frame before or equal to seek frame
        var target = null;
        for (var i = 0; i < this.intraFrames.length && this.intraFrames[i].frame <= seekFrame; i++) {
            target = this.intraFrames[i];
        }

        this.buffer.index = target.index;
        this.currentFrame = target.frame - 1;

        // If we're seeking to the exact frame, we may have to decode some more frames before
        // the one we want
        if (seekExact) {
            for (var frame = target.frame; frame < seekFrame; frame++) {
                this.decodePicture(DECODE_SKIP_OUTPUT);
                this.findStartCode(START_PICTURE);
            }
            this.currentFrame = seekFrame - 1;
        }

        // Decode and display the picture we have seeked to
        this.decodePicture();
        return true;
    };

    jsmpeg.prototype.seekToTime = function(time, seekExact) {
        this.seekToFrame((time * this.pictureRate) | 0, seekExact);
    };

    jsmpeg.prototype.play = function() {
        if (this.playing) {
            return;
        }
        this.targetTime = this.now();
        this.playing = true;
        this.wantsToPlay = true;
        this.scheduleNextFrame();
    };

    jsmpeg.prototype.pause = function() {
        this.playing = false;
        this.wantsToPlay = false;
    };

    jsmpeg.prototype.stop = function() {
        this.currentFrame = -1;
        if (this.buffer) {
            this.buffer.index = this.firstSequenceHeader;
        }
        this.playing = false;
        if (this.client) {
            this.client.close();
            this.client = null;
        }
        this.wantsToPlay = false;
    };

    // ----------------------------------------------------------------------------
    // Utilities

    jsmpeg.prototype.readCode = function(codeTable) {
        var state = 0;
        do {
            state = codeTable[state + this.buffer.getBits(1)];
        } while (state >= 0 && codeTable[state] !== 0);
        return codeTable[state + 2];
    };

    jsmpeg.prototype.findStartCode = function(code) {
        var current = 0;
        while (true) {
            current = this.buffer.findNextMPEGStartCode();
            if (current === code || current === BitReader.NOT_FOUND) {
                return current;
            }
        }
        return BitReader.NOT_FOUND;
    };

    jsmpeg.prototype.fillArray = function(a, value) {
        for (var i = 0, length = a.length; i < length; i++) {
            a[i] = value;
        }
    };

    // ----------------------------------------------------------------------------
    // Sequence Layer

    jsmpeg.prototype.pictureRate = 30;
    jsmpeg.prototype.lateTime = 0;
    jsmpeg.prototype.firstSequenceHeader = 0;
    jsmpeg.prototype.targetTime = 0;

    jsmpeg.prototype.benchmark = false;
    jsmpeg.prototype.benchFrame = 0;
    jsmpeg.prototype.benchDecodeTimes = 0;
    jsmpeg.prototype.benchAvgFrameTime = 0;

    jsmpeg.prototype.now = function() {
        return window.performance ? window.performance.now() : Date.now();
    };

    jsmpeg.prototype.nextFrame = function() {
        if (!this.buffer) {
            return;
        }

        var frameStart = this.now();
        while (true) {
            var code = this.buffer.findNextMPEGStartCode();

            if (code === START_SEQUENCE) {
                this.decodeSequenceHeader();
            } else if (code === START_PICTURE) {
                if (this.progressive && this.buffer.index >= this.lastFrameIndex) {
                    // Starved
                    this.playing = false;
                    return;
                }
                if (this.playing) {
                    this.scheduleNextFrame();
                }
                this.decodePicture();
                this.benchDecodeTimes += this.now() - frameStart;
                return this.canvas;
            } else if (code === BitReader.NOT_FOUND) {
                // REMOVING THIS TO STAY ON LAST FRAME - MARK
                // this.stop(); // Jump back to the beginning

                if (this.externalFinishedCallback && this.externalFinishedCallbackFired === false) { // added this.externalFinishedCallbackFired to trigger double fire. - MARK
                    this.externalFinishedCallbackFired = true;
                    this.externalFinishedCallback(this);
                }

                // Only loop if we found a sequence header
                if (this.loop && this.sequenceStarted) {
                    this.stop(); // ADDED THIS TO ALLOW LOOPING LOGIC - MARK
                    this.play();
                }
                return null;
            } else {
                // ignore (GROUP, USER_DATA, EXTENSION, SLICES...)
            }
        }
    };

    jsmpeg.prototype.scheduleNextFrame = function() {
        this.lateTime = this.now() - this.targetTime;
        var wait = Math.max(0, (1000 / this.pictureRate) - this.lateTime);
        this.targetTime = this.now() + wait;
        if (this.benchmark) {
            this.benchFrame++;
            if (this.benchFrame >= 120) {
                this.benchAvgFrameTime = this.benchDecodeTimes / this.benchFrame;
                this.benchFrame = 0;
                this.benchDecodeTimes = 0;
                if (window.console) {
                    console.log('Average time per frame:', this.benchAvgFrameTime, 'ms');
                }
            }
            setTimeout(this.nextFrame.bind(this), 0);
        } else if (wait < 18) {
            this.scheduleAnimation();
        } else {
            setTimeout(this.scheduleAnimation.bind(this), wait);
        }
    };

    jsmpeg.prototype.scheduleAnimation = function() {
        requestAnimFrame(this.nextFrame.bind(this), this.canvas);
    };

    jsmpeg.prototype.decodeSequenceHeader = function() {
        this.width = this.buffer.getBits(12);
        this.height = this.buffer.getBits(12);
        this.buffer.advance(4); // skip pixel aspect ratio
        this.pictureRate = PICTURE_RATE[this.buffer.getBits(4)];
        this.buffer.advance(18 + 1 + 10 + 1); // skip bitRate, marker, bufferSize and constrained bit

        this.initBuffers();

        var i;

        if (this.buffer.getBits(1)) { // load custom intra quant matrix?
            for (i = 0; i < 64; i++) {
                this.customIntraQuantMatrix[ZIG_ZAG[i]] = this.buffer.getBits(8);
            }
            this.intraQuantMatrix = this.customIntraQuantMatrix;
        }

        if (this.buffer.getBits(1)) { // load custom non intra quant matrix?
            for (i = 0; i < 64; i++) {
                this.customNonIntraQuantMatrix[ZIG_ZAG[i]] = this.buffer.getBits(8);
            }
            this.nonIntraQuantMatrix = this.customNonIntraQuantMatrix;
        }
    };

    jsmpeg.prototype.initBuffers = function() {
        this.intraQuantMatrix = DEFAULT_INTRA_QUANT_MATRIX;
        this.nonIntraQuantMatrix = DEFAULT_NON_INTRA_QUANT_MATRIX;

        this.mbWidth = (this.width + 15) >> 4;
        this.mbHeight = (this.height + 15) >> 4;
        this.mbSize = this.mbWidth * this.mbHeight;

        this.codedWidth = this.mbWidth << 4;
        this.codedHeight = this.mbHeight << 4;
        this.codedSize = this.codedWidth * this.codedHeight;

        this.halfWidth = this.mbWidth << 3;
        this.halfHeight = this.mbHeight << 3;
        this.quarterSize = this.codedSize >> 2;

        // Sequence already started? Don't allocate buffers again
        if (this.sequenceStarted) {
            return;
        }
        this.sequenceStarted = true;

        // Manually clamp values when writing macroblocks for shitty browsers
        // that don't support Uint8ClampedArray
        var MaybeClampedUint8Array = window.Uint8ClampedArray || window.Uint8Array;
        if (!window.Uint8ClampedArray) {
            this.copyBlockToDestination = this.copyBlockToDestinationClamp;
            this.addBlockToDestination = this.addBlockToDestinationClamp;
        }

        // Allocated buffers and resize the canvas
        this.currentY = new MaybeClampedUint8Array(this.codedSize);
        this.currentY32 = new Uint32Array(this.currentY.buffer);

        this.currentCr = new MaybeClampedUint8Array(this.codedSize >> 2);
        this.currentCr32 = new Uint32Array(this.currentCr.buffer);

        this.currentCb = new MaybeClampedUint8Array(this.codedSize >> 2);
        this.currentCb32 = new Uint32Array(this.currentCb.buffer);

        this.forwardY = new MaybeClampedUint8Array(this.codedSize);
        this.forwardY32 = new Uint32Array(this.forwardY.buffer);

        this.forwardCr = new MaybeClampedUint8Array(this.codedSize >> 2);
        this.forwardCr32 = new Uint32Array(this.forwardCr.buffer);

        this.forwardCb = new MaybeClampedUint8Array(this.codedSize >> 2);
        this.forwardCb32 = new Uint32Array(this.forwardCb.buffer);

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (this.gl) {
            this.gl.useProgram(this.program);
            this.gl.viewport(0, 0, this.width, this.height);
        } else {
            this.currentRGBA = this.canvasContext.getImageData(0, 0, this.width, this.height);
            this.fillArray(this.currentRGBA.data, 255);
        }
    };

    // ----------------------------------------------------------------------------
    // Picture Layer

    jsmpeg.prototype.currentY = null;
    jsmpeg.prototype.currentCr = null;
    jsmpeg.prototype.currentCb = null;

    jsmpeg.prototype.currentRGBA = null;

    jsmpeg.prototype.pictureCodingType = 0;

    // Buffers for motion compensation
    jsmpeg.prototype.forwardY = null;
    jsmpeg.prototype.forwardCr = null;
    jsmpeg.prototype.forwardCb = null;

    jsmpeg.prototype.fullPelForward = false;
    jsmpeg.prototype.forwardFCode = 0;
    jsmpeg.prototype.forwardRSize = 0;
    jsmpeg.prototype.forwardF = 0;

    jsmpeg.prototype.decodePicture = function(skipOutput) {
        this.currentFrame++;
        this.currentTime = this.currentFrame / this.pictureRate;

        this.buffer.advance(10); // skip temporalReference
        this.pictureCodingType = this.buffer.getBits(3);
        this.buffer.advance(16); // skip vbv_delay

        // Skip B and D frames or unknown coding type
        if (this.pictureCodingType <= 0 || this.pictureCodingType >= PICTURE_TYPE_B) {
            return;
        }

        // full_pel_forward, forward_f_code
        if (this.pictureCodingType === PICTURE_TYPE_P) {
            this.fullPelForward = this.buffer.getBits(1);
            this.forwardFCode = this.buffer.getBits(3);
            if (this.forwardFCode === 0) {
                // Ignore picture with zero forward_f_code
                return;
            }
            this.forwardRSize = this.forwardFCode - 1;
            this.forwardF = 1 << this.forwardRSize;
        }

        var code = 0;
        do {
            code = this.buffer.findNextMPEGStartCode();
        } while (code === START_EXTENSION || code === START_USER_DATA);

        while (code >= START_SLICE_FIRST && code <= START_SLICE_LAST) {
            this.decodeSlice((code & 0x000000FF));
            code = this.buffer.findNextMPEGStartCode();
        }

        // We found the next start code; rewind 32bits and let the main loop handle it.
        this.buffer.rewind(32);

        // Record this frame, if the recorder wants it
        this.recordFrameFromCurrentBuffer();

        if (skipOutput !== DECODE_SKIP_OUTPUT) {
            this.renderFrame();

            if (this.externalDecodeCallback) {
                this.externalDecodeCallback(this, this.canvas);
            }
        }

        // If this is a reference picutre then rotate the prediction pointers
        if (this.pictureCodingType === PICTURE_TYPE_I || this.pictureCodingType === PICTURE_TYPE_P) {
            var
                tmpY = this.forwardY,
                tmpY32 = this.forwardY32,
                tmpCr = this.forwardCr,
                tmpCr32 = this.forwardCr32,
                tmpCb = this.forwardCb,
                tmpCb32 = this.forwardCb32;

            this.forwardY = this.currentY;
            this.forwardY32 = this.currentY32;
            this.forwardCr = this.currentCr;
            this.forwardCr32 = this.currentCr32;
            this.forwardCb = this.currentCb;
            this.forwardCb32 = this.currentCb32;

            this.currentY = tmpY;
            this.currentY32 = tmpY32;
            this.currentCr = tmpCr;
            this.currentCr32 = tmpCr32;
            this.currentCb = tmpCb;
            this.currentCb32 = tmpCb32;
        }
    };

    jsmpeg.prototype.YCbCrToRGBA = function() {
        var pY = this.currentY;
        var pCb = this.currentCb;
        var pCr = this.currentCr;
        var pRGBA = this.currentRGBA.data;

        // Chroma values are the same for each block of 4 pixels, so we proccess
        // 2 lines at a time, 2 neighboring pixels each.
        // I wish we could use 32bit writes to the RGBA buffer instead of writing
        // each byte separately, but we need the automatic clamping of the RGBA
        // buffer.

        var yIndex1 = 0;
        var yIndex2 = this.codedWidth;
        var yNext2Lines = this.codedWidth + (this.codedWidth - this.width);

        var cIndex = 0;
        var cNextLine = this.halfWidth - (this.width >> 1);

        var rgbaIndex1 = 0;
        var rgbaIndex2 = this.width * 4;
        var rgbaNext2Lines = this.width * 4;

        var cols = this.width >> 1;
        var rows = this.height >> 1;

        var cb, cr, r, g, b;

        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                cb = pCb[cIndex];
                cr = pCr[cIndex];
                cIndex++;

                r = (cr + ((cr * 103) >> 8)) - 179;
                g = ((cb * 88) >> 8) - 44 + ((cr * 183) >> 8) - 91;
                b = (cb + ((cb * 198) >> 8)) - 227;

                // Line 1
                var y1 = pY[yIndex1++];
                var y2 = pY[yIndex1++];
                pRGBA[rgbaIndex1] = y1 + r;
                pRGBA[rgbaIndex1 + 1] = y1 - g;
                pRGBA[rgbaIndex1 + 2] = y1 + b;
                pRGBA[rgbaIndex1 + 4] = y2 + r;
                pRGBA[rgbaIndex1 + 5] = y2 - g;
                pRGBA[rgbaIndex1 + 6] = y2 + b;
                rgbaIndex1 += 8;

                // Line 2
                var y3 = pY[yIndex2++];
                var y4 = pY[yIndex2++];
                pRGBA[rgbaIndex2] = y3 + r;
                pRGBA[rgbaIndex2 + 1] = y3 - g;
                pRGBA[rgbaIndex2 + 2] = y3 + b;
                pRGBA[rgbaIndex2 + 4] = y4 + r;
                pRGBA[rgbaIndex2 + 5] = y4 - g;
                pRGBA[rgbaIndex2 + 6] = y4 + b;
                rgbaIndex2 += 8;
            }

            yIndex1 += yNext2Lines;
            yIndex2 += yNext2Lines;
            rgbaIndex1 += rgbaNext2Lines;
            rgbaIndex2 += rgbaNext2Lines;
            cIndex += cNextLine;
        }
    };

    jsmpeg.prototype.renderFrame2D = function() {
        this.YCbCrToRGBA();
        this.canvasContext.putImageData(this.currentRGBA, 0, 0);
    };

    // ----------------------------------------------------------------------------
    // Accelerated WebGL YCbCrToRGBA conversion

    jsmpeg.prototype.gl = null;
    jsmpeg.prototype.program = null;
    jsmpeg.prototype.YTexture = null;
    jsmpeg.prototype.CBTexture = null;
    jsmpeg.prototype.CRTexture = null;

    jsmpeg.prototype.createTexture = function(index, name) {
        var gl = this.gl;
        var texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.uniform1i(gl.getUniformLocation(this.program, name), index);

        return texture;
    };

    jsmpeg.prototype.compileShader = function(type, source) {
        var gl = this.gl;
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader));
        }

        return shader;
    };

    jsmpeg.prototype.initWebGL = function() {
        var gl;

        // attempt to get a webgl context
        try {
            gl = this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        } catch (e) {
            return false;
        }

        if (!gl) {
            return false;
        }

        // init buffers
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);

        // The main YCbCrToRGBA Shader
        this.program = gl.createProgram();
        gl.attachShader(this.program, this.compileShader(gl.VERTEX_SHADER, SHADER_VERTEX_IDENTITY));
        gl.attachShader(this.program, this.compileShader(gl.FRAGMENT_SHADER, SHADER_FRAGMENT_YCBCRTORGBA));
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(this.program));
        }

        gl.useProgram(this.program);

        // setup textures
        this.YTexture = this.createTexture(0, 'YTexture');
        this.CBTexture = this.createTexture(1, 'CBTexture');
        this.CRTexture = this.createTexture(2, 'CRTexture');

        var vertexAttr = gl.getAttribLocation(this.program, 'vertex');
        gl.enableVertexAttribArray(vertexAttr);
        gl.vertexAttribPointer(vertexAttr, 2, gl.FLOAT, false, 0, 0);

        // Shader for the loading screen
        this.loadingProgram = gl.createProgram();
        gl.attachShader(this.loadingProgram, this.compileShader(gl.VERTEX_SHADER, SHADER_VERTEX_IDENTITY));
        gl.attachShader(this.loadingProgram, this.compileShader(gl.FRAGMENT_SHADER, SHADER_FRAGMENT_LOADING));
        gl.linkProgram(this.loadingProgram);

        gl.useProgram(this.loadingProgram);

        vertexAttr = gl.getAttribLocation(this.loadingProgram, 'vertex');
        gl.enableVertexAttribArray(vertexAttr);
        gl.vertexAttribPointer(vertexAttr, 2, gl.FLOAT, false, 0, 0);

        return true;
    };

    jsmpeg.prototype.renderFrameGL = function() {
        var gl = this.gl;

        // WebGL doesn't like Uint8ClampedArrays, so we have to create a Uint8Array view for
        // each plane
        var uint8Y = new Uint8Array(this.currentY.buffer),
            uint8Cr = new Uint8Array(this.currentCr.buffer),
            uint8Cb = new Uint8Array(this.currentCb.buffer);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.YTexture);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, this.codedWidth, this.height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Y);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.CBTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, this.halfWidth, this.height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cr);

        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.CRTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, this.halfWidth, this.height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cb);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // ----------------------------------------------------------------------------
    // Slice Layer

    jsmpeg.prototype.quantizerScale = 0;
    jsmpeg.prototype.sliceBegin = false;

    jsmpeg.prototype.decodeSlice = function(slice) {
        this.sliceBegin = true;
        this.macroblockAddress = (slice - 1) * this.mbWidth - 1;

        // Reset motion vectors and DC predictors
        this.motionFwH = this.motionFwHPrev = 0;
        this.motionFwV = this.motionFwVPrev = 0;
        this.dcPredictorY = 128;
        this.dcPredictorCr = 128;
        this.dcPredictorCb = 128;

        this.quantizerScale = this.buffer.getBits(5);

        // skip extra bits
        while (this.buffer.getBits(1)) {
            this.buffer.advance(8);
        }

        do {
            this.decodeMacroblock();
            // We may have to ignore Video Stream Start Codes here (0xE0)!?
        } while (!this.buffer.nextBytesAreStartCode());
    };

    // ----------------------------------------------------------------------------
    // Macroblock Layer

    jsmpeg.prototype.macroblockAddress = 0;
    jsmpeg.prototype.mbRow = 0;
    jsmpeg.prototype.mbCol = 0;

    jsmpeg.prototype.macroblockType = 0;
    jsmpeg.prototype.macroblockIntra = false;
    jsmpeg.prototype.macroblockMotFw = false;

    jsmpeg.prototype.motionFwH = 0;
    jsmpeg.prototype.motionFwV = 0;
    jsmpeg.prototype.motionFwHPrev = 0;
    jsmpeg.prototype.motionFwVPrev = 0;

    jsmpeg.prototype.decodeMacroblock = function() {
        // Decode macroblock_address_increment
        var
            increment = 0,
            t = this.readCode(MACROBLOCK_ADDRESS_INCREMENT);

        while (t === 34) {
            // macroblock_stuffing
            t = this.readCode(MACROBLOCK_ADDRESS_INCREMENT);
        }
        while (t === 35) {
            // macroblock_escape
            increment += 33;
            t = this.readCode(MACROBLOCK_ADDRESS_INCREMENT);
        }
        increment += t;

        // Process any skipped macroblocks
        if (this.sliceBegin) {
            // The first macroblock_address_increment of each slice is relative
            // to beginning of the preverious row, not the preverious macroblock
            this.sliceBegin = false;
            this.macroblockAddress += increment;
        } else {
            if (this.macroblockAddress + increment >= this.mbSize) {
                // Illegal (too large) macroblock_address_increment
                return;
            }
            if (increment > 1) {
                // Skipped macroblocks reset DC predictors
                this.dcPredictorY = 128;
                this.dcPredictorCr = 128;
                this.dcPredictorCb = 128;

                // Skipped macroblocks in P-pictures reset motion vectors
                if (this.pictureCodingType === PICTURE_TYPE_P) {
                    this.motionFwH = this.motionFwHPrev = 0;
                    this.motionFwV = this.motionFwVPrev = 0;
                }
            }

            // Predict skipped macroblocks
            while (increment > 1) {
                this.macroblockAddress++;
                this.mbRow = (this.macroblockAddress / this.mbWidth) | 0;
                this.mbCol = this.macroblockAddress % this.mbWidth;
                this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb);
                increment--;
            }
            this.macroblockAddress++;
        }
        this.mbRow = (this.macroblockAddress / this.mbWidth) | 0;
        this.mbCol = this.macroblockAddress % this.mbWidth;

        // Process the current macroblock
        this.macroblockType = this.readCode(MACROBLOCK_TYPE_TABLES[this.pictureCodingType]);
        this.macroblockIntra = (this.macroblockType & 0x01);
        this.macroblockMotFw = (this.macroblockType & 0x08);

        // Quantizer scale
        if ((this.macroblockType & 0x10) !== 0) {
            this.quantizerScale = this.buffer.getBits(5);
        }

        if (this.macroblockIntra) {
            // Intra-coded macroblocks reset motion vectors
            this.motionFwH = this.motionFwHPrev = 0;
            this.motionFwV = this.motionFwVPrev = 0;
        } else {
            // Non-intra macroblocks reset DC predictors
            this.dcPredictorY = 128;
            this.dcPredictorCr = 128;
            this.dcPredictorCb = 128;

            this.decodeMotionVectors();
            this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb);
        }

        // Decode blocks
        var cbp = ((this.macroblockType & 0x02) !== 0) ? this.readCode(CODE_BLOCK_PATTERN) : (this.macroblockIntra ? 0x3f : 0);

        for (var block = 0, mask = 0x20; block < 6; block++) {
            if ((cbp & mask) !== 0) {
                this.decodeBlock(block);
            }
            mask >>= 1;
        }
    };

    jsmpeg.prototype.decodeMotionVectors = function() {
        var code, d, r = 0;

        // Forward
        if (this.macroblockMotFw) {
            // Horizontal forward
            code = this.readCode(MOTION);
            if ((code !== 0) && (this.forwardF !== 1)) {
                r = this.buffer.getBits(this.forwardRSize);
                d = ((Math.abs(code) - 1) << this.forwardRSize) + r + 1;
                if (code < 0) {
                    d = -d;
                }
            } else {
                d = code;
            }

            this.motionFwHPrev += d;
            if (this.motionFwHPrev > (this.forwardF << 4) - 1) {
                this.motionFwHPrev -= this.forwardF << 5;
            } else if (this.motionFwHPrev < ((-this.forwardF) << 4)) {
                this.motionFwHPrev += this.forwardF << 5;
            }

            this.motionFwH = this.motionFwHPrev;
            if (this.fullPelForward) {
                this.motionFwH <<= 1;
            }

            // Vertical forward
            code = this.readCode(MOTION);
            if ((code !== 0) && (this.forwardF !== 1)) {
                r = this.buffer.getBits(this.forwardRSize);
                d = ((Math.abs(code) - 1) << this.forwardRSize) + r + 1;
                if (code < 0) {
                    d = -d;
                }
            } else {
                d = code;
            }

            this.motionFwVPrev += d;
            if (this.motionFwVPrev > (this.forwardF << 4) - 1) {
                this.motionFwVPrev -= this.forwardF << 5;
            } else if (this.motionFwVPrev < ((-this.forwardF) << 4)) {
                this.motionFwVPrev += this.forwardF << 5;
            }

            this.motionFwV = this.motionFwVPrev;
            if (this.fullPelForward) {
                this.motionFwV <<= 1;
            }
        } else if (this.pictureCodingType === PICTURE_TYPE_P) {
            // No motion information in P-picture, reset vectors
            this.motionFwH = this.motionFwHPrev = 0;
            this.motionFwV = this.motionFwVPrev = 0;
        }
    };

    jsmpeg.prototype.copyMacroblock = function(motionH, motionV, sY, sCr, sCb) {
        var
            width, scan,
            H, V, oddH, oddV,
            src, dest, last;

        // We use 32bit writes here
        var dY = this.currentY32;
        var dCb = this.currentCb32;
        var dCr = this.currentCr32;

        // Luminance
        width = this.codedWidth;
        scan = width - 16;

        H = motionH >> 1;
        V = motionV >> 1;
        oddH = (motionH & 1) === 1;
        oddV = (motionV & 1) === 1;

        src = ((this.mbRow << 4) + V) * width + (this.mbCol << 4) + H;
        dest = (this.mbRow * width + this.mbCol) << 2;
        last = dest + (width << 2);

        var x;
        var y1, y2, y;
        if (oddH) {
            if (oddV) {
                while (dest < last) {
                    y1 = sY[src] + sY[src + width];
                    src++;
                    for (x = 0; x < 4; x++) {
                        y2 = sY[src] + sY[src + width];
                        src++;
                        y = (((y1 + y2 + 2) >> 2) & 0xff);

                        y1 = sY[src] + sY[src + width];
                        src++;
                        y |= (((y1 + y2 + 2) << 6) & 0xff00);

                        y2 = sY[src] + sY[src + width];
                        src++;
                        y |= (((y1 + y2 + 2) << 14) & 0xff0000);

                        y1 = sY[src] + sY[src + width];
                        src++;
                        y |= (((y1 + y2 + 2) << 22) & 0xff000000);

                        dY[dest++] = y;
                    }
                    dest += scan >> 2;
                    src += scan - 1;
                }
            } else {
                while (dest < last) {
                    y1 = sY[src++];
                    for (x = 0; x < 4; x++) {
                        y2 = sY[src++];
                        y = (((y1 + y2 + 1) >> 1) & 0xff);

                        y1 = sY[src++];
                        y |= (((y1 + y2 + 1) << 7) & 0xff00);

                        y2 = sY[src++];
                        y |= (((y1 + y2 + 1) << 15) & 0xff0000);

                        y1 = sY[src++];
                        y |= (((y1 + y2 + 1) << 23) & 0xff000000);

                        dY[dest++] = y;
                    }
                    dest += scan >> 2;
                    src += scan - 1;
                }
            }
        } else {
            if (oddV) {
                while (dest < last) {
                    for (x = 0; x < 4; x++) {
                        y = (((sY[src] + sY[src + width] + 1) >> 1) & 0xff);
                        src++;
                        y |= (((sY[src] + sY[src + width] + 1) << 7) & 0xff00);
                        src++;
                        y |= (((sY[src] + sY[src + width] + 1) << 15) & 0xff0000);
                        src++;
                        y |= (((sY[src] + sY[src + width] + 1) << 23) & 0xff000000);
                        src++;

                        dY[dest++] = y;
                    }
                    dest += scan >> 2;
                    src += scan;
                }
            } else {
                while (dest < last) {
                    for (x = 0; x < 4; x++) {
                        y = sY[src];
                        src++;
                        y |= sY[src] << 8;
                        src++;
                        y |= sY[src] << 16;
                        src++;
                        y |= sY[src] << 24;
                        src++;

                        dY[dest++] = y;
                    }
                    dest += scan >> 2;
                    src += scan;
                }
            }
        }

        // Chrominance

        width = this.halfWidth;
        scan = width - 8;

        H = (motionH / 2) >> 1;
        V = (motionV / 2) >> 1;
        oddH = ((motionH / 2) & 1) === 1;
        oddV = ((motionV / 2) & 1) === 1;

        src = ((this.mbRow << 3) + V) * width + (this.mbCol << 3) + H;
        dest = (this.mbRow * width + this.mbCol) << 1;
        last = dest + (width << 1);

        var cr1, cr2, cr;
        var cb1, cb2, cb;
        if (oddH) {
            if (oddV) {
                while (dest < last) {
                    cr1 = sCr[src] + sCr[src + width];
                    cb1 = sCb[src] + sCb[src + width];
                    src++;
                    for (x = 0; x < 2; x++) {
                        cr2 = sCr[src] + sCr[src + width];
                        cb2 = sCb[src] + sCb[src + width];
                        src++;
                        cr = (((cr1 + cr2 + 2) >> 2) & 0xff);
                        cb = (((cb1 + cb2 + 2) >> 2) & 0xff);

                        cr1 = sCr[src] + sCr[src + width];
                        cb1 = sCb[src] + sCb[src + width];
                        src++;
                        cr |= (((cr1 + cr2 + 2) << 6) & 0xff00);
                        cb |= (((cb1 + cb2 + 2) << 6) & 0xff00);

                        cr2 = sCr[src] + sCr[src + width];
                        cb2 = sCb[src] + sCb[src + width];
                        src++;
                        cr |= (((cr1 + cr2 + 2) << 14) & 0xff0000);
                        cb |= (((cb1 + cb2 + 2) << 14) & 0xff0000);

                        cr1 = sCr[src] + sCr[src + width];
                        cb1 = sCb[src] + sCb[src + width];
                        src++;
                        cr |= (((cr1 + cr2 + 2) << 22) & 0xff000000);
                        cb |= (((cb1 + cb2 + 2) << 22) & 0xff000000);

                        dCr[dest] = cr;
                        dCb[dest] = cb;
                        dest++;
                    }
                    dest += scan >> 2;
                    src += scan - 1;
                }
            } else {
                while (dest < last) {
                    cr1 = sCr[src];
                    cb1 = sCb[src];
                    src++;
                    for (x = 0; x < 2; x++) {
                        cr2 = sCr[src];
                        cb2 = sCb[src++];
                        cr = (((cr1 + cr2 + 1) >> 1) & 0xff);
                        cb = (((cb1 + cb2 + 1) >> 1) & 0xff);

                        cr1 = sCr[src];
                        cb1 = sCb[src++];
                        cr |= (((cr1 + cr2 + 1) << 7) & 0xff00);
                        cb |= (((cb1 + cb2 + 1) << 7) & 0xff00);

                        cr2 = sCr[src];
                        cb2 = sCb[src++];
                        cr |= (((cr1 + cr2 + 1) << 15) & 0xff0000);
                        cb |= (((cb1 + cb2 + 1) << 15) & 0xff0000);

                        cr1 = sCr[src];
                        cb1 = sCb[src++];
                        cr |= (((cr1 + cr2 + 1) << 23) & 0xff000000);
                        cb |= (((cb1 + cb2 + 1) << 23) & 0xff000000);

                        dCr[dest] = cr;
                        dCb[dest] = cb;
                        dest++;
                    }
                    dest += scan >> 2;
                    src += scan - 1;
                }
            }
        } else {
            if (oddV) {
                while (dest < last) {
                    for (x = 0; x < 2; x++) {
                        cr = (((sCr[src] + sCr[src + width] + 1) >> 1) & 0xff);
                        cb = (((sCb[src] + sCb[src + width] + 1) >> 1) & 0xff);
                        src++;

                        cr |= (((sCr[src] + sCr[src + width] + 1) << 7) & 0xff00);
                        cb |= (((sCb[src] + sCb[src + width] + 1) << 7) & 0xff00);
                        src++;

                        cr |= (((sCr[src] + sCr[src + width] + 1) << 15) & 0xff0000);
                        cb |= (((sCb[src] + sCb[src + width] + 1) << 15) & 0xff0000);
                        src++;

                        cr |= (((sCr[src] + sCr[src + width] + 1) << 23) & 0xff000000);
                        cb |= (((sCb[src] + sCb[src + width] + 1) << 23) & 0xff000000);
                        src++;

                        dCr[dest] = cr;
                        dCb[dest] = cb;
                        dest++;
                    }
                    dest += scan >> 2;
                    src += scan;
                }
            } else {
                while (dest < last) {
                    for (x = 0; x < 2; x++) {
                        cr = sCr[src];
                        cb = sCb[src];
                        src++;

                        cr |= sCr[src] << 8;
                        cb |= sCb[src] << 8;
                        src++;

                        cr |= sCr[src] << 16;
                        cb |= sCb[src] << 16;
                        src++;

                        cr |= sCr[src] << 24;
                        cb |= sCb[src] << 24;
                        src++;

                        dCr[dest] = cr;
                        dCb[dest] = cb;
                        dest++;
                    }
                    dest += scan >> 2;
                    src += scan;
                }
            }
        }
    };

    // ----------------------------------------------------------------------------
    // Block layer

    //jsmpeg.prototype.dcPredictorY;
    //jsmpeg.prototype.dcPredictorCr;
    //jsmpeg.prototype.dcPredictorCb;

    jsmpeg.prototype.blockData = null;
    jsmpeg.prototype.decodeBlock = function(block) {

        var
            n = 0,
            quantMatrix;

        // Decode DC coefficient of intra-coded blocks
        if (this.macroblockIntra) {
            var
                predictor,
                dctSize;

            // DC prediction

            if (block < 4) {
                predictor = this.dcPredictorY;
                dctSize = this.readCode(DCT_DC_SIZE_LUMINANCE);
            } else {
                predictor = (block === 4 ? this.dcPredictorCr : this.dcPredictorCb);
                dctSize = this.readCode(DCT_DC_SIZE_CHROMINANCE);
            }

            // Read DC coeff
            if (dctSize > 0) {
                var differential = this.buffer.getBits(dctSize);
                if ((differential & (1 << (dctSize - 1))) !== 0) {
                    this.blockData[0] = predictor + differential;
                } else {
                    this.blockData[0] = predictor + ((-1 << dctSize) | (differential + 1));
                }
            } else {
                this.blockData[0] = predictor;
            }

            // Save predictor value
            if (block < 4) {
                this.dcPredictorY = this.blockData[0];
            } else if (block === 4) {
                this.dcPredictorCr = this.blockData[0];
            } else {
                this.dcPredictorCb = this.blockData[0];
            }

            // Dequantize + premultiply
            this.blockData[0] <<= (3 + 5);

            quantMatrix = this.intraQuantMatrix;
            n = 1;
        } else {
            quantMatrix = this.nonIntraQuantMatrix;
        }

        // Decode AC coefficients (+DC for non-intra)
        var level = 0;
        while (true) {
            var
                run = 0,
                coeff = this.readCode(DCT_COEFF);

            if ((coeff === 0x0001) && (n > 0) && (this.buffer.getBits(1) === 0)) {
                // end_of_block
                break;
            }
            if (coeff === 0xffff) {
                // escape
                run = this.buffer.getBits(6);
                level = this.buffer.getBits(8);
                if (level === 0) {
                    level = this.buffer.getBits(8);
                } else if (level === 128) {
                    level = this.buffer.getBits(8) - 256;
                } else if (level > 128) {
                    level = level - 256;
                }
            } else {
                run = coeff >> 8;
                level = coeff & 0xff;
                if (this.buffer.getBits(1)) {
                    level = -level;
                }
            }

            n += run;
            var dezigZagged = ZIG_ZAG[n];
            n++;

            // Dequantize, oddify, clip
            level <<= 1;
            if (!this.macroblockIntra) {
                level += (level < 0 ? -1 : 1);
            }
            level = (level * this.quantizerScale * quantMatrix[dezigZagged]) >> 4;
            if ((level & 1) === 0) {
                level -= level > 0 ? 1 : -1;
            }
            if (level > 2047) {
                level = 2047;
            } else if (level < -2048) {
                level = -2048;
            }

            // Save premultiplied coefficient
            this.blockData[dezigZagged] = level * PREMULTIPLIER_MATRIX[dezigZagged];
        }

        // Move block to its place
        var
            destArray,
            destIndex,
            scan;

        if (block < 4) {
            destArray = this.currentY;
            scan = this.codedWidth - 8;
            destIndex = (this.mbRow * this.codedWidth + this.mbCol) << 4;
            if ((block & 1) !== 0) {
                destIndex += 8;
            }
            if ((block & 2) !== 0) {
                destIndex += this.codedWidth << 3;
            }
        } else {
            destArray = (block === 4) ? this.currentCb : this.currentCr;
            scan = (this.codedWidth >> 1) - 8;
            destIndex = ((this.mbRow * this.codedWidth) << 2) + (this.mbCol << 3);
        }

        if (this.macroblockIntra) {
            // Overwrite (no prediction)
            if (n === 1) {
                this.copyValueToDestination((this.blockData[0] + 128) >> 8, destArray, destIndex, scan);
                this.blockData[0] = 0;
            } else {
                this.IDCT();
                this.copyBlockToDestination(this.blockData, destArray, destIndex, scan);
                this.blockData.set(this.zeroBlockData);
            }
        } else {
            // Add data to the predicted macroblock
            if (n === 1) {
                this.addValueToDestination((this.blockData[0] + 128) >> 8, destArray, destIndex, scan);
                this.blockData[0] = 0;
            } else {
                this.IDCT();
                this.addBlockToDestination(this.blockData, destArray, destIndex, scan);
                this.blockData.set(this.zeroBlockData);
            }
        }

        n = 0;
    };

    jsmpeg.prototype.copyBlockToDestination = function(blockData, destArray, destIndex, scan) {
        for (var n = 0; n < 64; n += 8, destIndex += scan + 8) {
            destArray[destIndex + 0] = blockData[n + 0];
            destArray[destIndex + 1] = blockData[n + 1];
            destArray[destIndex + 2] = blockData[n + 2];
            destArray[destIndex + 3] = blockData[n + 3];
            destArray[destIndex + 4] = blockData[n + 4];
            destArray[destIndex + 5] = blockData[n + 5];
            destArray[destIndex + 6] = blockData[n + 6];
            destArray[destIndex + 7] = blockData[n + 7];
        }
    };

    jsmpeg.prototype.addBlockToDestination = function(blockData, destArray, destIndex, scan) {
        for (var n = 0; n < 64; n += 8, destIndex += scan + 8) {
            destArray[destIndex + 0] += blockData[n + 0];
            destArray[destIndex + 1] += blockData[n + 1];
            destArray[destIndex + 2] += blockData[n + 2];
            destArray[destIndex + 3] += blockData[n + 3];
            destArray[destIndex + 4] += blockData[n + 4];
            destArray[destIndex + 5] += blockData[n + 5];
            destArray[destIndex + 6] += blockData[n + 6];
            destArray[destIndex + 7] += blockData[n + 7];
        }
    };

    jsmpeg.prototype.copyValueToDestination = function(value, destArray, destIndex, scan) {
        for (var n = 0; n < 64; n += 8, destIndex += scan + 8) {
            destArray[destIndex + 0] = value;
            destArray[destIndex + 1] = value;
            destArray[destIndex + 2] = value;
            destArray[destIndex + 3] = value;
            destArray[destIndex + 4] = value;
            destArray[destIndex + 5] = value;
            destArray[destIndex + 6] = value;
            destArray[destIndex + 7] = value;
        }
    };

    jsmpeg.prototype.addValueToDestination = function(value, destArray, destIndex, scan) {
        for (var n = 0; n < 64; n += 8, destIndex += scan + 8) {
            destArray[destIndex + 0] += value;
            destArray[destIndex + 1] += value;
            destArray[destIndex + 2] += value;
            destArray[destIndex + 3] += value;
            destArray[destIndex + 4] += value;
            destArray[destIndex + 5] += value;
            destArray[destIndex + 6] += value;
            destArray[destIndex + 7] += value;
        }
    };

    // Clamping version for shitty browsers (IE) that don't support Uint8ClampedArray
    jsmpeg.prototype.copyBlockToDestinationClamp = function(blockData, destArray, destIndex, scan) {
        var n = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var p = blockData[n++];
                destArray[destIndex++] = p > 255 ? 255 : (p < 0 ? 0 : p);
            }
            destIndex += scan;
        }
    };

    jsmpeg.prototype.addBlockToDestinationClamp = function(blockData, destArray, destIndex, scan) {
        var n = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var p = blockData[n++] + destArray[destIndex];
                destArray[destIndex++] = p > 255 ? 255 : (p < 0 ? 0 : p);
            }
            destIndex += scan;
        }
    };

    jsmpeg.prototype.IDCT = function() {
        // See http://vsr.informatik.tu-chemnitz.de/~jan/MPEG/HTML/IDCT.html
        // for more info.

        var
            b1, b3, b4, b6, b7, tmp1, tmp2, m0,
            x0, x1, x2, x3, x4, y3, y4, y5, y6, y7,
            i,
            blockData = this.blockData;

        // Transform columns
        for (i = 0; i < 8; ++i) {
            b1 = blockData[4 * 8 + i];
            b3 = blockData[2 * 8 + i] + blockData[6 * 8 + i];
            b4 = blockData[5 * 8 + i] - blockData[3 * 8 + i];
            tmp1 = blockData[1 * 8 + i] + blockData[7 * 8 + i];
            tmp2 = blockData[3 * 8 + i] + blockData[5 * 8 + i];
            b6 = blockData[1 * 8 + i] - blockData[7 * 8 + i];
            b7 = tmp1 + tmp2;
            m0 = blockData[0 * 8 + i];
            x4 = ((b6 * 473 - b4 * 196 + 128) >> 8) - b7;
            x0 = x4 - (((tmp1 - tmp2) * 362 + 128) >> 8);
            x1 = m0 - b1;
            x2 = (((blockData[2 * 8 + i] - blockData[6 * 8 + i]) * 362 + 128) >> 8) - b3;
            x3 = m0 + b1;
            y3 = x1 + x2;
            y4 = x3 + b3;
            y5 = x1 - x2;
            y6 = x3 - b3;
            y7 = -x0 - ((b4 * 473 + b6 * 196 + 128) >> 8);
            blockData[0 * 8 + i] = b7 + y4;
            blockData[1 * 8 + i] = x4 + y3;
            blockData[2 * 8 + i] = y5 - x0;
            blockData[3 * 8 + i] = y6 - y7;
            blockData[4 * 8 + i] = y6 + y7;
            blockData[5 * 8 + i] = x0 + y5;
            blockData[6 * 8 + i] = y3 - x4;
            blockData[7 * 8 + i] = y4 - b7;
        }

        // Transform rows
        for (i = 0; i < 64; i += 8) {
            b1 = blockData[4 + i];
            b3 = blockData[2 + i] + blockData[6 + i];
            b4 = blockData[5 + i] - blockData[3 + i];
            tmp1 = blockData[1 + i] + blockData[7 + i];
            tmp2 = blockData[3 + i] + blockData[5 + i];
            b6 = blockData[1 + i] - blockData[7 + i];
            b7 = tmp1 + tmp2;
            m0 = blockData[0 + i];
            x4 = ((b6 * 473 - b4 * 196 + 128) >> 8) - b7;
            x0 = x4 - (((tmp1 - tmp2) * 362 + 128) >> 8);
            x1 = m0 - b1;
            x2 = (((blockData[2 + i] - blockData[6 + i]) * 362 + 128) >> 8) - b3;
            x3 = m0 + b1;
            y3 = x1 + x2;
            y4 = x3 + b3;
            y5 = x1 - x2;
            y6 = x3 - b3;
            y7 = -x0 - ((b4 * 473 + b6 * 196 + 128) >> 8);
            blockData[0 + i] = (b7 + y4 + 128) >> 8;
            blockData[1 + i] = (x4 + y3 + 128) >> 8;
            blockData[2 + i] = (y5 - x0 + 128) >> 8;
            blockData[3 + i] = (y6 - y7 + 128) >> 8;
            blockData[4 + i] = (y6 + y7 + 128) >> 8;
            blockData[5 + i] = (x0 + y5 + 128) >> 8;
            blockData[6 + i] = (y3 - x4 + 128) >> 8;
            blockData[7 + i] = (y4 - b7 + 128) >> 8;
        }
    };

    // ----------------------------------------------------------------------------
    // VLC Tables and Constants

    var
        SOCKET_MAGIC_BYTES = 'jsmp',
        DECODE_SKIP_OUTPUT = 1,
        PICTURE_RATE = [
            0.000, 23.976, 24.000, 25.000, 29.970, 30.000, 50.000, 59.940,
            60.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000
        ],
        ZIG_ZAG = new Uint8Array([
            0, 1, 8, 16, 9, 2, 3, 10,
            17, 24, 32, 25, 18, 11, 4, 5,
            12, 19, 26, 33, 40, 48, 41, 34,
            27, 20, 13, 6, 7, 14, 21, 28,
            35, 42, 49, 56, 57, 50, 43, 36,
            29, 22, 15, 23, 30, 37, 44, 51,
            58, 59, 52, 45, 38, 31, 39, 46,
            53, 60, 61, 54, 47, 55, 62, 63
        ]),
        DEFAULT_INTRA_QUANT_MATRIX = new Uint8Array([
            8, 16, 19, 22, 26, 27, 29, 34,
            16, 16, 22, 24, 27, 29, 34, 37,
            19, 22, 26, 27, 29, 34, 34, 38,
            22, 22, 26, 27, 29, 34, 37, 40,
            22, 26, 27, 29, 32, 35, 40, 48,
            26, 27, 29, 32, 35, 40, 48, 58,
            26, 27, 29, 34, 38, 46, 56, 69,
            27, 29, 35, 38, 46, 56, 69, 83
        ]),
        DEFAULT_NON_INTRA_QUANT_MATRIX = new Uint8Array([
            16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16
        ]),

        PREMULTIPLIER_MATRIX = new Uint8Array([
            32, 44, 42, 38, 32, 25, 17, 9,
            44, 62, 58, 52, 44, 35, 24, 12,
            42, 58, 55, 49, 42, 33, 23, 12,
            38, 52, 49, 44, 38, 30, 20, 10,
            32, 44, 42, 38, 32, 25, 17, 9,
            25, 35, 33, 30, 25, 20, 14, 7,
            17, 24, 23, 20, 17, 14, 9, 5,
            9, 12, 12, 10, 9, 7, 5, 2
        ]),

        // MPEG-1 VLC

        //  macroblock_stuffing decodes as 34.
        //  macroblock_escape decodes as 35.

        MACROBLOCK_ADDRESS_INCREMENT = new Int16Array([
            1 * 3, 2 * 3, 0, //   0
            3 * 3, 4 * 3, 0, //   1  0
            0, 0, 1, //   2  1.
            5 * 3, 6 * 3, 0, //   3  00
            7 * 3, 8 * 3, 0, //   4  01
            9 * 3, 10 * 3, 0, //   5  000
            11 * 3, 12 * 3, 0, //   6  001
            0, 0, 3, //   7  010.
            0, 0, 2, //   8  011.
            13 * 3, 14 * 3, 0, //   9  0000
            15 * 3, 16 * 3, 0, //  10  0001
            0, 0, 5, //  11  0010.
            0, 0, 4, //  12  0011.
            17 * 3, 18 * 3, 0, //  13  0000 0
            19 * 3, 20 * 3, 0, //  14  0000 1
            0, 0, 7, //  15  0001 0.
            0, 0, 6, //  16  0001 1.
            21 * 3, 22 * 3, 0, //  17  0000 00
            23 * 3, 24 * 3, 0, //  18  0000 01
            25 * 3, 26 * 3, 0, //  19  0000 10
            27 * 3, 28 * 3, 0, //  20  0000 11
            -1, 29 * 3, 0, //  21  0000 000
            -1, 30 * 3, 0, //  22  0000 001
            31 * 3, 32 * 3, 0, //  23  0000 010
            33 * 3, 34 * 3, 0, //  24  0000 011
            35 * 3, 36 * 3, 0, //  25  0000 100
            37 * 3, 38 * 3, 0, //  26  0000 101
            0, 0, 9, //  27  0000 110.
            0, 0, 8, //  28  0000 111.
            39 * 3, 40 * 3, 0, //  29  0000 0001
            41 * 3, 42 * 3, 0, //  30  0000 0011
            43 * 3, 44 * 3, 0, //  31  0000 0100
            45 * 3, 46 * 3, 0, //  32  0000 0101
            0, 0, 15, //  33  0000 0110.
            0, 0, 14, //  34  0000 0111.
            0, 0, 13, //  35  0000 1000.
            0, 0, 12, //  36  0000 1001.
            0, 0, 11, //  37  0000 1010.
            0, 0, 10, //  38  0000 1011.
            47 * 3, -1, 0, //  39  0000 0001 0
            -1, 48 * 3, 0, //  40  0000 0001 1
            49 * 3, 50 * 3, 0, //  41  0000 0011 0
            51 * 3, 52 * 3, 0, //  42  0000 0011 1
            53 * 3, 54 * 3, 0, //  43  0000 0100 0
            55 * 3, 56 * 3, 0, //  44  0000 0100 1
            57 * 3, 58 * 3, 0, //  45  0000 0101 0
            59 * 3, 60 * 3, 0, //  46  0000 0101 1
            61 * 3, -1, 0, //  47  0000 0001 00
            -1, 62 * 3, 0, //  48  0000 0001 11
            63 * 3, 64 * 3, 0, //  49  0000 0011 00
            65 * 3, 66 * 3, 0, //  50  0000 0011 01
            67 * 3, 68 * 3, 0, //  51  0000 0011 10
            69 * 3, 70 * 3, 0, //  52  0000 0011 11
            71 * 3, 72 * 3, 0, //  53  0000 0100 00
            73 * 3, 74 * 3, 0, //  54  0000 0100 01
            0, 0, 21, //  55  0000 0100 10.
            0, 0, 20, //  56  0000 0100 11.
            0, 0, 19, //  57  0000 0101 00.
            0, 0, 18, //  58  0000 0101 01.
            0, 0, 17, //  59  0000 0101 10.
            0, 0, 16, //  60  0000 0101 11.
            0, 0, 35, //  61  0000 0001 000. -- macroblock_escape
            0, 0, 34, //  62  0000 0001 111. -- macroblock_stuffing
            0, 0, 33, //  63  0000 0011 000.
            0, 0, 32, //  64  0000 0011 001.
            0, 0, 31, //  65  0000 0011 010.
            0, 0, 30, //  66  0000 0011 011.
            0, 0, 29, //  67  0000 0011 100.
            0, 0, 28, //  68  0000 0011 101.
            0, 0, 27, //  69  0000 0011 110.
            0, 0, 26, //  70  0000 0011 111.
            0, 0, 25, //  71  0000 0100 000.
            0, 0, 24, //  72  0000 0100 001.
            0, 0, 23, //  73  0000 0100 010.
            0, 0, 22 //  74  0000 0100 011.
        ]),

        //  macroblock_type bitmap:
        //    0x10  macroblock_quant
        //    0x08  macroblock_motion_forward
        //    0x04  macroblock_motion_backward
        //    0x02  macrobkock_pattern
        //    0x01  macroblock_intra
        //

        MACROBLOCK_TYPE_I = new Int8Array([
            1 * 3, 2 * 3, 0, //   0
            -1, 3 * 3, 0, //   1  0
            0, 0, 0x01, //   2  1.
            0, 0, 0x11 //   3  01.
        ]),

        MACROBLOCK_TYPE_P = new Int8Array([
            1 * 3, 2 * 3, 0, //  0
            3 * 3, 4 * 3, 0, //  1  0
            0, 0, 0x0a, //  2  1.
            5 * 3, 6 * 3, 0, //  3  00
            0, 0, 0x02, //  4  01.
            7 * 3, 8 * 3, 0, //  5  000
            0, 0, 0x08, //  6  001.
            9 * 3, 10 * 3, 0, //  7  0000
            11 * 3, 12 * 3, 0, //  8  0001
            -1, 13 * 3, 0, //  9  00000
            0, 0, 0x12, // 10  00001.
            0, 0, 0x1a, // 11  00010.
            0, 0, 0x01, // 12  00011.
            0, 0, 0x11 // 13  000001.
        ]),

        MACROBLOCK_TYPE_B = new Int8Array([
            1 * 3, 2 * 3, 0, //  0
            3 * 3, 5 * 3, 0, //  1  0
            4 * 3, 6 * 3, 0, //  2  1
            8 * 3, 7 * 3, 0, //  3  00
            0, 0, 0x0c, //  4  10.
            9 * 3, 10 * 3, 0, //  5  01
            0, 0, 0x0e, //  6  11.
            13 * 3, 14 * 3, 0, //  7  001
            12 * 3, 11 * 3, 0, //  8  000
            0, 0, 0x04, //  9  010.
            0, 0, 0x06, // 10  011.
            18 * 3, 16 * 3, 0, // 11  0001
            15 * 3, 17 * 3, 0, // 12  0000
            0, 0, 0x08, // 13  0010.
            0, 0, 0x0a, // 14  0011.
            -1, 19 * 3, 0, // 15  00000
            0, 0, 0x01, // 16  00011.
            20 * 3, 21 * 3, 0, // 17  00001
            0, 0, 0x1e, // 18  00010.
            0, 0, 0x11, // 19  000001.
            0, 0, 0x16, // 20  000010.
            0, 0, 0x1a // 21  000011.
        ]),

        CODE_BLOCK_PATTERN = new Int16Array([
            2 * 3, 1 * 3, 0, //   0
            3 * 3, 6 * 3, 0, //   1  1
            4 * 3, 5 * 3, 0, //   2  0
            8 * 3, 11 * 3, 0, //   3  10
            12 * 3, 13 * 3, 0, //   4  00
            9 * 3, 7 * 3, 0, //   5  01
            10 * 3, 14 * 3, 0, //   6  11
            20 * 3, 19 * 3, 0, //   7  011
            18 * 3, 16 * 3, 0, //   8  100
            23 * 3, 17 * 3, 0, //   9  010
            27 * 3, 25 * 3, 0, //  10  110
            21 * 3, 28 * 3, 0, //  11  101
            15 * 3, 22 * 3, 0, //  12  000
            24 * 3, 26 * 3, 0, //  13  001
            0, 0, 60, //  14  111.
            35 * 3, 40 * 3, 0, //  15  0000
            44 * 3, 48 * 3, 0, //  16  1001
            38 * 3, 36 * 3, 0, //  17  0101
            42 * 3, 47 * 3, 0, //  18  1000
            29 * 3, 31 * 3, 0, //  19  0111
            39 * 3, 32 * 3, 0, //  20  0110
            0, 0, 32, //  21  1010.
            45 * 3, 46 * 3, 0, //  22  0001
            33 * 3, 41 * 3, 0, //  23  0100
            43 * 3, 34 * 3, 0, //  24  0010
            0, 0, 4, //  25  1101.
            30 * 3, 37 * 3, 0, //  26  0011
            0, 0, 8, //  27  1100.
            0, 0, 16, //  28  1011.
            0, 0, 44, //  29  0111 0.
            50 * 3, 56 * 3, 0, //  30  0011 0
            0, 0, 28, //  31  0111 1.
            0, 0, 52, //  32  0110 1.
            0, 0, 62, //  33  0100 0.
            61 * 3, 59 * 3, 0, //  34  0010 1
            52 * 3, 60 * 3, 0, //  35  0000 0
            0, 0, 1, //  36  0101 1.
            55 * 3, 54 * 3, 0, //  37  0011 1
            0, 0, 61, //  38  0101 0.
            0, 0, 56, //  39  0110 0.
            57 * 3, 58 * 3, 0, //  40  0000 1
            0, 0, 2, //  41  0100 1.
            0, 0, 40, //  42  1000 0.
            51 * 3, 62 * 3, 0, //  43  0010 0
            0, 0, 48, //  44  1001 0.
            64 * 3, 63 * 3, 0, //  45  0001 0
            49 * 3, 53 * 3, 0, //  46  0001 1
            0, 0, 20, //  47  1000 1.
            0, 0, 12, //  48  1001 1.
            80 * 3, 83 * 3, 0, //  49  0001 10
            0, 0, 63, //  50  0011 00.
            77 * 3, 75 * 3, 0, //  51  0010 00
            65 * 3, 73 * 3, 0, //  52  0000 00
            84 * 3, 66 * 3, 0, //  53  0001 11
            0, 0, 24, //  54  0011 11.
            0, 0, 36, //  55  0011 10.
            0, 0, 3, //  56  0011 01.
            69 * 3, 87 * 3, 0, //  57  0000 10
            81 * 3, 79 * 3, 0, //  58  0000 11
            68 * 3, 71 * 3, 0, //  59  0010 11
            70 * 3, 78 * 3, 0, //  60  0000 01
            67 * 3, 76 * 3, 0, //  61  0010 10
            72 * 3, 74 * 3, 0, //  62  0010 01
            86 * 3, 85 * 3, 0, //  63  0001 01
            88 * 3, 82 * 3, 0, //  64  0001 00
            -1, 94 * 3, 0, //  65  0000 000
            95 * 3, 97 * 3, 0, //  66  0001 111
            0, 0, 33, //  67  0010 100.
            0, 0, 9, //  68  0010 110.
            106 * 3, 110 * 3, 0, //  69  0000 100
            102 * 3, 116 * 3, 0, //  70  0000 010
            0, 0, 5, //  71  0010 111.
            0, 0, 10, //  72  0010 010.
            93 * 3, 89 * 3, 0, //  73  0000 001
            0, 0, 6, //  74  0010 011.
            0, 0, 18, //  75  0010 001.
            0, 0, 17, //  76  0010 101.
            0, 0, 34, //  77  0010 000.
            113 * 3, 119 * 3, 0, //  78  0000 011
            103 * 3, 104 * 3, 0, //  79  0000 111
            90 * 3, 92 * 3, 0, //  80  0001 100
            109 * 3, 107 * 3, 0, //  81  0000 110
            117 * 3, 118 * 3, 0, //  82  0001 001
            101 * 3, 99 * 3, 0, //  83  0001 101
            98 * 3, 96 * 3, 0, //  84  0001 110
            100 * 3, 91 * 3, 0, //  85  0001 011
            114 * 3, 115 * 3, 0, //  86  0001 010
            105 * 3, 108 * 3, 0, //  87  0000 101
            112 * 3, 111 * 3, 0, //  88  0001 000
            121 * 3, 125 * 3, 0, //  89  0000 0011
            0, 0, 41, //  90  0001 1000.
            0, 0, 14, //  91  0001 0111.
            0, 0, 21, //  92  0001 1001.
            124 * 3, 122 * 3, 0, //  93  0000 0010
            120 * 3, 123 * 3, 0, //  94  0000 0001
            0, 0, 11, //  95  0001 1110.
            0, 0, 19, //  96  0001 1101.
            0, 0, 7, //  97  0001 1111.
            0, 0, 35, //  98  0001 1100.
            0, 0, 13, //  99  0001 1011.
            0, 0, 50, // 100  0001 0110.
            0, 0, 49, // 101  0001 1010.
            0, 0, 58, // 102  0000 0100.
            0, 0, 37, // 103  0000 1110.
            0, 0, 25, // 104  0000 1111.
            0, 0, 45, // 105  0000 1010.
            0, 0, 57, // 106  0000 1000.
            0, 0, 26, // 107  0000 1101.
            0, 0, 29, // 108  0000 1011.
            0, 0, 38, // 109  0000 1100.
            0, 0, 53, // 110  0000 1001.
            0, 0, 23, // 111  0001 0001.
            0, 0, 43, // 112  0001 0000.
            0, 0, 46, // 113  0000 0110.
            0, 0, 42, // 114  0001 0100.
            0, 0, 22, // 115  0001 0101.
            0, 0, 54, // 116  0000 0101.
            0, 0, 51, // 117  0001 0010.
            0, 0, 15, // 118  0001 0011.
            0, 0, 30, // 119  0000 0111.
            0, 0, 39, // 120  0000 0001 0.
            0, 0, 47, // 121  0000 0011 0.
            0, 0, 55, // 122  0000 0010 1.
            0, 0, 27, // 123  0000 0001 1.
            0, 0, 59, // 124  0000 0010 0.
            0, 0, 31 // 125  0000 0011 1.
        ]),

        MOTION = new Int16Array([
            1 * 3, 2 * 3, 0, //   0
            4 * 3, 3 * 3, 0, //   1  0
            0, 0, 0, //   2  1.
            6 * 3, 5 * 3, 0, //   3  01
            8 * 3, 7 * 3, 0, //   4  00
            0, 0, -1, //   5  011.
            0, 0, 1, //   6  010.
            9 * 3, 10 * 3, 0, //   7  001
            12 * 3, 11 * 3, 0, //   8  000
            0, 0, 2, //   9  0010.
            0, 0, -2, //  10  0011.
            14 * 3, 15 * 3, 0, //  11  0001
            16 * 3, 13 * 3, 0, //  12  0000
            20 * 3, 18 * 3, 0, //  13  0000 1
            0, 0, 3, //  14  0001 0.
            0, 0, -3, //  15  0001 1.
            17 * 3, 19 * 3, 0, //  16  0000 0
            -1, 23 * 3, 0, //  17  0000 00
            27 * 3, 25 * 3, 0, //  18  0000 11
            26 * 3, 21 * 3, 0, //  19  0000 01
            24 * 3, 22 * 3, 0, //  20  0000 10
            32 * 3, 28 * 3, 0, //  21  0000 011
            29 * 3, 31 * 3, 0, //  22  0000 101
            -1, 33 * 3, 0, //  23  0000 001
            36 * 3, 35 * 3, 0, //  24  0000 100
            0, 0, -4, //  25  0000 111.
            30 * 3, 34 * 3, 0, //  26  0000 010
            0, 0, 4, //  27  0000 110.
            0, 0, -7, //  28  0000 0111.
            0, 0, 5, //  29  0000 1010.
            37 * 3, 41 * 3, 0, //  30  0000 0100
            0, 0, -5, //  31  0000 1011.
            0, 0, 7, //  32  0000 0110.
            38 * 3, 40 * 3, 0, //  33  0000 0011
            42 * 3, 39 * 3, 0, //  34  0000 0101
            0, 0, -6, //  35  0000 1001.
            0, 0, 6, //  36  0000 1000.
            51 * 3, 54 * 3, 0, //  37  0000 0100 0
            50 * 3, 49 * 3, 0, //  38  0000 0011 0
            45 * 3, 46 * 3, 0, //  39  0000 0101 1
            52 * 3, 47 * 3, 0, //  40  0000 0011 1
            43 * 3, 53 * 3, 0, //  41  0000 0100 1
            44 * 3, 48 * 3, 0, //  42  0000 0101 0
            0, 0, 10, //  43  0000 0100 10.
            0, 0, 9, //  44  0000 0101 00.
            0, 0, 8, //  45  0000 0101 10.
            0, 0, -8, //  46  0000 0101 11.
            57 * 3, 66 * 3, 0, //  47  0000 0011 11
            0, 0, -9, //  48  0000 0101 01.
            60 * 3, 64 * 3, 0, //  49  0000 0011 01
            56 * 3, 61 * 3, 0, //  50  0000 0011 00
            55 * 3, 62 * 3, 0, //  51  0000 0100 00
            58 * 3, 63 * 3, 0, //  52  0000 0011 10
            0, 0, -10, //  53  0000 0100 11.
            59 * 3, 65 * 3, 0, //  54  0000 0100 01
            0, 0, 12, //  55  0000 0100 000.
            0, 0, 16, //  56  0000 0011 000.
            0, 0, 13, //  57  0000 0011 110.
            0, 0, 14, //  58  0000 0011 100.
            0, 0, 11, //  59  0000 0100 010.
            0, 0, 15, //  60  0000 0011 010.
            0, 0, -16, //  61  0000 0011 001.
            0, 0, -12, //  62  0000 0100 001.
            0, 0, -14, //  63  0000 0011 101.
            0, 0, -15, //  64  0000 0011 011.
            0, 0, -11, //  65  0000 0100 011.
            0, 0, -13 //  66  0000 0011 111.
        ]),

        DCT_DC_SIZE_LUMINANCE = new Int8Array([
            2 * 3, 1 * 3, 0, //   0
            6 * 3, 5 * 3, 0, //   1  1
            3 * 3, 4 * 3, 0, //   2  0
            0, 0, 1, //   3  00.
            0, 0, 2, //   4  01.
            9 * 3, 8 * 3, 0, //   5  11
            7 * 3, 10 * 3, 0, //   6  10
            0, 0, 0, //   7  100.
            12 * 3, 11 * 3, 0, //   8  111
            0, 0, 4, //   9  110.
            0, 0, 3, //  10  101.
            13 * 3, 14 * 3, 0, //  11  1111
            0, 0, 5, //  12  1110.
            0, 0, 6, //  13  1111 0.
            16 * 3, 15 * 3, 0, //  14  1111 1
            17 * 3, -1, 0, //  15  1111 11
            0, 0, 7, //  16  1111 10.
            0, 0, 8 //  17  1111 110.
        ]),

        DCT_DC_SIZE_CHROMINANCE = new Int8Array([
            2 * 3, 1 * 3, 0, //   0
            4 * 3, 3 * 3, 0, //   1  1
            6 * 3, 5 * 3, 0, //   2  0
            8 * 3, 7 * 3, 0, //   3  11
            0, 0, 2, //   4  10.
            0, 0, 1, //   5  01.
            0, 0, 0, //   6  00.
            10 * 3, 9 * 3, 0, //   7  111
            0, 0, 3, //   8  110.
            12 * 3, 11 * 3, 0, //   9  1111
            0, 0, 4, //  10  1110.
            14 * 3, 13 * 3, 0, //  11  1111 1
            0, 0, 5, //  12  1111 0.
            16 * 3, 15 * 3, 0, //  13  1111 11
            0, 0, 6, //  14  1111 10.
            17 * 3, -1, 0, //  15  1111 111
            0, 0, 7, //  16  1111 110.
            0, 0, 8 //  17  1111 1110.
        ]),

        //  dct_coeff bitmap:
        //    0xff00  run
        //    0x00ff  level

        //  Decoded values are unsigned. Sign bit follows in the stream.

        //  Interpretation of the value 0x0001
        //    for dc_coeff_first:  run=0, level=1
        //    for dc_coeff_next:   If the next bit is 1: run=0, level=1
        //                         If the next bit is 0: end_of_block

        //  escape decodes as 0xffff.

        DCT_COEFF = new Int32Array([
            1 * 3, 2 * 3, 0, //   0
            4 * 3, 3 * 3, 0, //   1  0
            0, 0, 0x0001, //   2  1.
            7 * 3, 8 * 3, 0, //   3  01
            6 * 3, 5 * 3, 0, //   4  00
            13 * 3, 9 * 3, 0, //   5  001
            11 * 3, 10 * 3, 0, //   6  000
            14 * 3, 12 * 3, 0, //   7  010
            0, 0, 0x0101, //   8  011.
            20 * 3, 22 * 3, 0, //   9  0011
            18 * 3, 21 * 3, 0, //  10  0001
            16 * 3, 19 * 3, 0, //  11  0000
            0, 0, 0x0201, //  12  0101.
            17 * 3, 15 * 3, 0, //  13  0010
            0, 0, 0x0002, //  14  0100.
            0, 0, 0x0003, //  15  0010 1.
            27 * 3, 25 * 3, 0, //  16  0000 0
            29 * 3, 31 * 3, 0, //  17  0010 0
            24 * 3, 26 * 3, 0, //  18  0001 0
            32 * 3, 30 * 3, 0, //  19  0000 1
            0, 0, 0x0401, //  20  0011 0.
            23 * 3, 28 * 3, 0, //  21  0001 1
            0, 0, 0x0301, //  22  0011 1.
            0, 0, 0x0102, //  23  0001 10.
            0, 0, 0x0701, //  24  0001 00.
            0, 0, 0xffff, //  25  0000 01. -- escape
            0, 0, 0x0601, //  26  0001 01.
            37 * 3, 36 * 3, 0, //  27  0000 00
            0, 0, 0x0501, //  28  0001 11.
            35 * 3, 34 * 3, 0, //  29  0010 00
            39 * 3, 38 * 3, 0, //  30  0000 11
            33 * 3, 42 * 3, 0, //  31  0010 01
            40 * 3, 41 * 3, 0, //  32  0000 10
            52 * 3, 50 * 3, 0, //  33  0010 010
            54 * 3, 53 * 3, 0, //  34  0010 001
            48 * 3, 49 * 3, 0, //  35  0010 000
            43 * 3, 45 * 3, 0, //  36  0000 001
            46 * 3, 44 * 3, 0, //  37  0000 000
            0, 0, 0x0801, //  38  0000 111.
            0, 0, 0x0004, //  39  0000 110.
            0, 0, 0x0202, //  40  0000 100.
            0, 0, 0x0901, //  41  0000 101.
            51 * 3, 47 * 3, 0, //  42  0010 011
            55 * 3, 57 * 3, 0, //  43  0000 0010
            60 * 3, 56 * 3, 0, //  44  0000 0001
            59 * 3, 58 * 3, 0, //  45  0000 0011
            61 * 3, 62 * 3, 0, //  46  0000 0000
            0, 0, 0x0a01, //  47  0010 0111.
            0, 0, 0x0d01, //  48  0010 0000.
            0, 0, 0x0006, //  49  0010 0001.
            0, 0, 0x0103, //  50  0010 0101.
            0, 0, 0x0005, //  51  0010 0110.
            0, 0, 0x0302, //  52  0010 0100.
            0, 0, 0x0b01, //  53  0010 0011.
            0, 0, 0x0c01, //  54  0010 0010.
            76 * 3, 75 * 3, 0, //  55  0000 0010 0
            67 * 3, 70 * 3, 0, //  56  0000 0001 1
            73 * 3, 71 * 3, 0, //  57  0000 0010 1
            78 * 3, 74 * 3, 0, //  58  0000 0011 1
            72 * 3, 77 * 3, 0, //  59  0000 0011 0
            69 * 3, 64 * 3, 0, //  60  0000 0001 0
            68 * 3, 63 * 3, 0, //  61  0000 0000 0
            66 * 3, 65 * 3, 0, //  62  0000 0000 1
            81 * 3, 87 * 3, 0, //  63  0000 0000 01
            91 * 3, 80 * 3, 0, //  64  0000 0001 01
            82 * 3, 79 * 3, 0, //  65  0000 0000 11
            83 * 3, 86 * 3, 0, //  66  0000 0000 10
            93 * 3, 92 * 3, 0, //  67  0000 0001 10
            84 * 3, 85 * 3, 0, //  68  0000 0000 00
            90 * 3, 94 * 3, 0, //  69  0000 0001 00
            88 * 3, 89 * 3, 0, //  70  0000 0001 11
            0, 0, 0x0203, //  71  0000 0010 11.
            0, 0, 0x0104, //  72  0000 0011 00.
            0, 0, 0x0007, //  73  0000 0010 10.
            0, 0, 0x0402, //  74  0000 0011 11.
            0, 0, 0x0502, //  75  0000 0010 01.
            0, 0, 0x1001, //  76  0000 0010 00.
            0, 0, 0x0f01, //  77  0000 0011 01.
            0, 0, 0x0e01, //  78  0000 0011 10.
            105 * 3, 107 * 3, 0, //  79  0000 0000 111
            111 * 3, 114 * 3, 0, //  80  0000 0001 011
            104 * 3, 97 * 3, 0, //  81  0000 0000 010
            125 * 3, 119 * 3, 0, //  82  0000 0000 110
            96 * 3, 98 * 3, 0, //  83  0000 0000 100
            -1, 123 * 3, 0, //  84  0000 0000 000
            95 * 3, 101 * 3, 0, //  85  0000 0000 001
            106 * 3, 121 * 3, 0, //  86  0000 0000 101
            99 * 3, 102 * 3, 0, //  87  0000 0000 011
            113 * 3, 103 * 3, 0, //  88  0000 0001 110
            112 * 3, 116 * 3, 0, //  89  0000 0001 111
            110 * 3, 100 * 3, 0, //  90  0000 0001 000
            124 * 3, 115 * 3, 0, //  91  0000 0001 010
            117 * 3, 122 * 3, 0, //  92  0000 0001 101
            109 * 3, 118 * 3, 0, //  93  0000 0001 100
            120 * 3, 108 * 3, 0, //  94  0000 0001 001
            127 * 3, 136 * 3, 0, //  95  0000 0000 0010
            139 * 3, 140 * 3, 0, //  96  0000 0000 1000
            130 * 3, 126 * 3, 0, //  97  0000 0000 0101
            145 * 3, 146 * 3, 0, //  98  0000 0000 1001
            128 * 3, 129 * 3, 0, //  99  0000 0000 0110
            0, 0, 0x0802, // 100  0000 0001 0001.
            132 * 3, 134 * 3, 0, // 101  0000 0000 0011
            155 * 3, 154 * 3, 0, // 102  0000 0000 0111
            0, 0, 0x0008, // 103  0000 0001 1101.
            137 * 3, 133 * 3, 0, // 104  0000 0000 0100
            143 * 3, 144 * 3, 0, // 105  0000 0000 1110
            151 * 3, 138 * 3, 0, // 106  0000 0000 1010
            142 * 3, 141 * 3, 0, // 107  0000 0000 1111
            0, 0, 0x000a, // 108  0000 0001 0011.
            0, 0, 0x0009, // 109  0000 0001 1000.
            0, 0, 0x000b, // 110  0000 0001 0000.
            0, 0, 0x1501, // 111  0000 0001 0110.
            0, 0, 0x0602, // 112  0000 0001 1110.
            0, 0, 0x0303, // 113  0000 0001 1100.
            0, 0, 0x1401, // 114  0000 0001 0111.
            0, 0, 0x0702, // 115  0000 0001 0101.
            0, 0, 0x1101, // 116  0000 0001 1111.
            0, 0, 0x1201, // 117  0000 0001 1010.
            0, 0, 0x1301, // 118  0000 0001 1001.
            148 * 3, 152 * 3, 0, // 119  0000 0000 1101
            0, 0, 0x0403, // 120  0000 0001 0010.
            153 * 3, 150 * 3, 0, // 121  0000 0000 1011
            0, 0, 0x0105, // 122  0000 0001 1011.
            131 * 3, 135 * 3, 0, // 123  0000 0000 0001
            0, 0, 0x0204, // 124  0000 0001 0100.
            149 * 3, 147 * 3, 0, // 125  0000 0000 1100
            172 * 3, 173 * 3, 0, // 126  0000 0000 0101 1
            162 * 3, 158 * 3, 0, // 127  0000 0000 0010 0
            170 * 3, 161 * 3, 0, // 128  0000 0000 0110 0
            168 * 3, 166 * 3, 0, // 129  0000 0000 0110 1
            157 * 3, 179 * 3, 0, // 130  0000 0000 0101 0
            169 * 3, 167 * 3, 0, // 131  0000 0000 0001 0
            174 * 3, 171 * 3, 0, // 132  0000 0000 0011 0
            178 * 3, 177 * 3, 0, // 133  0000 0000 0100 1
            156 * 3, 159 * 3, 0, // 134  0000 0000 0011 1
            164 * 3, 165 * 3, 0, // 135  0000 0000 0001 1
            183 * 3, 182 * 3, 0, // 136  0000 0000 0010 1
            175 * 3, 176 * 3, 0, // 137  0000 0000 0100 0
            0, 0, 0x0107, // 138  0000 0000 1010 1.
            0, 0, 0x0a02, // 139  0000 0000 1000 0.
            0, 0, 0x0902, // 140  0000 0000 1000 1.
            0, 0, 0x1601, // 141  0000 0000 1111 1.
            0, 0, 0x1701, // 142  0000 0000 1111 0.
            0, 0, 0x1901, // 143  0000 0000 1110 0.
            0, 0, 0x1801, // 144  0000 0000 1110 1.
            0, 0, 0x0503, // 145  0000 0000 1001 0.
            0, 0, 0x0304, // 146  0000 0000 1001 1.
            0, 0, 0x000d, // 147  0000 0000 1100 1.
            0, 0, 0x000c, // 148  0000 0000 1101 0.
            0, 0, 0x000e, // 149  0000 0000 1100 0.
            0, 0, 0x000f, // 150  0000 0000 1011 1.
            0, 0, 0x0205, // 151  0000 0000 1010 0.
            0, 0, 0x1a01, // 152  0000 0000 1101 1.
            0, 0, 0x0106, // 153  0000 0000 1011 0.
            180 * 3, 181 * 3, 0, // 154  0000 0000 0111 1
            160 * 3, 163 * 3, 0, // 155  0000 0000 0111 0
            196 * 3, 199 * 3, 0, // 156  0000 0000 0011 10
            0, 0, 0x001b, // 157  0000 0000 0101 00.
            203 * 3, 185 * 3, 0, // 158  0000 0000 0010 01
            202 * 3, 201 * 3, 0, // 159  0000 0000 0011 11
            0, 0, 0x0013, // 160  0000 0000 0111 00.
            0, 0, 0x0016, // 161  0000 0000 0110 01.
            197 * 3, 207 * 3, 0, // 162  0000 0000 0010 00
            0, 0, 0x0012, // 163  0000 0000 0111 01.
            191 * 3, 192 * 3, 0, // 164  0000 0000 0001 10
            188 * 3, 190 * 3, 0, // 165  0000 0000 0001 11
            0, 0, 0x0014, // 166  0000 0000 0110 11.
            184 * 3, 194 * 3, 0, // 167  0000 0000 0001 01
            0, 0, 0x0015, // 168  0000 0000 0110 10.
            186 * 3, 193 * 3, 0, // 169  0000 0000 0001 00
            0, 0, 0x0017, // 170  0000 0000 0110 00.
            204 * 3, 198 * 3, 0, // 171  0000 0000 0011 01
            0, 0, 0x0019, // 172  0000 0000 0101 10.
            0, 0, 0x0018, // 173  0000 0000 0101 11.
            200 * 3, 205 * 3, 0, // 174  0000 0000 0011 00
            0, 0, 0x001f, // 175  0000 0000 0100 00.
            0, 0, 0x001e, // 176  0000 0000 0100 01.
            0, 0, 0x001c, // 177  0000 0000 0100 11.
            0, 0, 0x001d, // 178  0000 0000 0100 10.
            0, 0, 0x001a, // 179  0000 0000 0101 01.
            0, 0, 0x0011, // 180  0000 0000 0111 10.
            0, 0, 0x0010, // 181  0000 0000 0111 11.
            189 * 3, 206 * 3, 0, // 182  0000 0000 0010 11
            187 * 3, 195 * 3, 0, // 183  0000 0000 0010 10
            218 * 3, 211 * 3, 0, // 184  0000 0000 0001 010
            0, 0, 0x0025, // 185  0000 0000 0010 011.
            215 * 3, 216 * 3, 0, // 186  0000 0000 0001 000
            0, 0, 0x0024, // 187  0000 0000 0010 100.
            210 * 3, 212 * 3, 0, // 188  0000 0000 0001 110
            0, 0, 0x0022, // 189  0000 0000 0010 110.
            213 * 3, 209 * 3, 0, // 190  0000 0000 0001 111
            221 * 3, 222 * 3, 0, // 191  0000 0000 0001 100
            219 * 3, 208 * 3, 0, // 192  0000 0000 0001 101
            217 * 3, 214 * 3, 0, // 193  0000 0000 0001 001
            223 * 3, 220 * 3, 0, // 194  0000 0000 0001 011
            0, 0, 0x0023, // 195  0000 0000 0010 101.
            0, 0, 0x010b, // 196  0000 0000 0011 100.
            0, 0, 0x0028, // 197  0000 0000 0010 000.
            0, 0, 0x010c, // 198  0000 0000 0011 011.
            0, 0, 0x010a, // 199  0000 0000 0011 101.
            0, 0, 0x0020, // 200  0000 0000 0011 000.
            0, 0, 0x0108, // 201  0000 0000 0011 111.
            0, 0, 0x0109, // 202  0000 0000 0011 110.
            0, 0, 0x0026, // 203  0000 0000 0010 010.
            0, 0, 0x010d, // 204  0000 0000 0011 010.
            0, 0, 0x010e, // 205  0000 0000 0011 001.
            0, 0, 0x0021, // 206  0000 0000 0010 111.
            0, 0, 0x0027, // 207  0000 0000 0010 001.
            0, 0, 0x1f01, // 208  0000 0000 0001 1011.
            0, 0, 0x1b01, // 209  0000 0000 0001 1111.
            0, 0, 0x1e01, // 210  0000 0000 0001 1100.
            0, 0, 0x1002, // 211  0000 0000 0001 0101.
            0, 0, 0x1d01, // 212  0000 0000 0001 1101.
            0, 0, 0x1c01, // 213  0000 0000 0001 1110.
            0, 0, 0x010f, // 214  0000 0000 0001 0011.
            0, 0, 0x0112, // 215  0000 0000 0001 0000.
            0, 0, 0x0111, // 216  0000 0000 0001 0001.
            0, 0, 0x0110, // 217  0000 0000 0001 0010.
            0, 0, 0x0603, // 218  0000 0000 0001 0100.
            0, 0, 0x0b02, // 219  0000 0000 0001 1010.
            0, 0, 0x0e02, // 220  0000 0000 0001 0111.
            0, 0, 0x0d02, // 221  0000 0000 0001 1000.
            0, 0, 0x0c02, // 222  0000 0000 0001 1001.
            0, 0, 0x0f02 // 223  0000 0000 0001 0110.
        ]),

        PICTURE_TYPE_I = 1,
        PICTURE_TYPE_P = 2,
        PICTURE_TYPE_B = 3,
        //PICTURE_TYPE_D = 4,

        START_SEQUENCE = 0xB3,
        START_SLICE_FIRST = 0x01,
        START_SLICE_LAST = 0xAF,
        START_PICTURE = 0x00,
        START_EXTENSION = 0xB5,
        START_USER_DATA = 0xB2,

        // Shaders for accelerated WebGL YCbCrToRGBA conversion
        SHADER_FRAGMENT_YCBCRTORGBA = [
            'precision mediump float;',
            'uniform sampler2D YTexture;',
            'uniform sampler2D CBTexture;',
            'uniform sampler2D CRTexture;',
            'varying vec2 texCoord;',

            'void main() {',
            'float y = texture2D(YTexture, texCoord).r;',
            'float cr = texture2D(CBTexture, texCoord).r - 0.5;',
            'float cb = texture2D(CRTexture, texCoord).r - 0.5;',

            'gl_FragColor = vec4(',
            'y + 1.4 * cr,',
            'y + -0.343 * cb - 0.711 * cr,',
            'y + 1.765 * cb,',
            '1.0',
            ');',
            '}'
        ].join('\n'),

        SHADER_FRAGMENT_LOADING = [
            'precision mediump float;',
            'uniform float loaded;',
            'varying vec2 texCoord;',

            'void main() {',
            'float c = ceil(loaded-(1.0-texCoord.y));',
            //'float c = ceil(loaded-(1.0-texCoord.y) +sin((texCoord.x+loaded)*16.0)*0.01);', // Fancy wave anim
            'gl_FragColor = vec4(c,c,c,1);',
            '}'
        ].join('\n'),

        SHADER_VERTEX_IDENTITY = [
            'attribute vec2 vertex;',
            'varying vec2 texCoord;',

            'void main() {',
            'texCoord = vertex;',
            'gl_Position = vec4((vertex * 2.0 - 1.0) * vec2(1, -1), 0.0, 1.0);',
            '}'
        ].join('\n');

    var MACROBLOCK_TYPE_TABLES = [
        null,
        MACROBLOCK_TYPE_I,
        MACROBLOCK_TYPE_P,
        MACROBLOCK_TYPE_B
    ];

    // ----------------------------------------------------------------------------
    // Bit Reader

    var BitReader = function(arrayBuffer) {
        this.bytes = new Uint8Array(arrayBuffer);
        this.length = this.bytes.length;
        this.writePos = this.bytes.length;
        this.index = 0;
    };

    BitReader.NOT_FOUND = -1;

    BitReader.prototype.findNextMPEGStartCode = function() {
        for (var i = (this.index + 7 >> 3); i < this.writePos; i++) {
            if (
                this.bytes[i] === 0x00 &&
                this.bytes[i + 1] === 0x00 &&
                this.bytes[i + 2] === 0x01
            ) {
                this.index = (i + 4) << 3;
                return this.bytes[i + 3];
            }
        }
        this.index = (this.writePos << 3);
        return BitReader.NOT_FOUND;
    };

    BitReader.prototype.nextBytesAreStartCode = function() {
        var i = (this.index + 7 >> 3);
        return (
            i >= this.writePos || (
                this.bytes[i] === 0x00 &&
                this.bytes[i + 1] === 0x00 &&
                this.bytes[i + 2] === 0x01
            )
        );
    };

    BitReader.prototype.nextBits = function(count) {
        var
            byteOffset = this.index >> 3,
            room = (8 - this.index % 8);

        if (room >= count) {
            return (this.bytes[byteOffset] >> (room - count)) & (0xff >> (8 - count));
        }

        var
            leftover = (this.index + count) % 8, // Leftover bits in last byte
            end = (this.index + count - 1) >> 3,
            value = this.bytes[byteOffset] & (0xff >> (8 - room)); // Fill out first byte

        for (byteOffset++; byteOffset < end; byteOffset++) {
            value <<= 8; // Shift and
            value |= this.bytes[byteOffset]; // Put next byte
        }

        if (leftover > 0) {
            value <<= leftover; // Make room for remaining bits
            value |= (this.bytes[byteOffset] >> (8 - leftover));
        } else {
            value <<= 8;
            value |= this.bytes[byteOffset];
        }

        return value;
    };

    BitReader.prototype.getBits = function(count) {
        var value = this.nextBits(count);
        this.index += count;
        return value;
    };

    BitReader.prototype.advance = function(count) {
        return (this.index += count);
    };

    BitReader.prototype.rewind = function(count) {
        return (this.index -= count);
    };

})(window);

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia = window.matchMedia || (function(e, f) {
    var c, a = e.documentElement,
        b = a.firstElementChild || a.firstChild,
        d = e.createElement("body"),
        g = e.createElement("div");
    g.id = "mq-test-1";
    g.style.cssText = "position:absolute;top:-100em";
    d.style.background = "none";
    d.appendChild(g);
    return function(h) {
        g.innerHTML = '&shy;<style media="' + h + '"> #mq-test-1 { width: 42px; }</style>';
        a.insertBefore(d, b);
        c = g.offsetWidth == 42;
        a.removeChild(d);
        return {
            matches: c,
            media: h
        }
    }
})(document);

/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(e) {
    e.respond = {};
    respond.update = function() {};
    respond.mediaQueriesSupported = e.matchMedia && e.matchMedia("only all").matches;
    if (respond.mediaQueriesSupported) {
        return
    }
    var w = e.document,
        s = w.documentElement,
        i = [],
        k = [],
        q = [],
        o = {},
        h = 30,
        f = w.getElementsByTagName("head")[0] || s,
        g = w.getElementsByTagName("base")[0],
        b = f.getElementsByTagName("link"),
        d = [],
        a = function() {
            var D = b,
                y = D.length,
                B = 0,
                A, z, C, x;
            for (; B < y; B++) {
                A = D[B], z = A.href, C = A.media, x = A.rel && A.rel.toLowerCase() === "stylesheet";
                if (!!z && x && !o[z]) {
                    if (A.styleSheet && A.styleSheet.rawCssText) {
                        m(A.styleSheet.rawCssText, z, C);
                        o[z] = true
                    } else {
                        if ((!/^([a-zA-Z:]*\/\/)/.test(z) && !g) || z.replace(RegExp.$1, "").split("/")[0] === e.location.host) {
                            d.push({
                                href: z,
                                media: C
                            })
                        }
                    }
                }
            }
            u()
        },
        u = function() {
            if (d.length) {
                var x = d.shift();
                n(x.href, function(y) {
                    m(y, x.href, x.media);
                    o[x.href] = true;
                    u()
                })
            }
        },
        m = function(I, x, z) {
            var G = I.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
                J = G && G.length || 0,
                x = x.substring(0, x.lastIndexOf("/")),
                y = function(K) {
                    return K.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + x + "$2$3")
                },
                A = !J && z,
                D = 0,
                C, E, F, B, H;
            if (x.length) {
                x += "/"
            }
            if (A) {
                J = 1
            }
            for (; D < J; D++) {
                C = 0;
                if (A) {
                    E = z;
                    k.push(y(I))
                } else {
                    E = G[D].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1;
                    k.push(RegExp.$2 && y(RegExp.$2))
                }
                B = E.split(",");
                H = B.length;
                for (; C < H; C++) {
                    F = B[C];
                    i.push({
                        media: F.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
                        rules: k.length - 1,
                        hasquery: F.indexOf("(") > -1,
                        minw: F.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: F.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    })
                }
            }
            j()
        },
        l, r, v = function() {
            var z, A = w.createElement("div"),
                x = w.body,
                y = false;
            A.style.cssText = "position:absolute;font-size:1em;width:1em";
            if (!x) {
                x = y = w.createElement("body");
                x.style.background = "none"
            }
            x.appendChild(A);
            s.insertBefore(x, s.firstChild);
            z = A.offsetWidth;
            if (y) {
                s.removeChild(x)
            } else {
                x.removeChild(A)
            }
            z = p = parseFloat(z);
            return z
        },
        p, j = function(I) {
            var x = "clientWidth",
                B = s[x],
                H = w.compatMode === "CSS1Compat" && B || w.body[x] || B,
                D = {},
                G = b[b.length - 1],
                z = (new Date()).getTime();
            if (I && l && z - l < h) {
                clearTimeout(r);
                r = setTimeout(j, h);
                return
            } else {
                l = z
            }
            for (var E in i) {
                var K = i[E],
                    C = K.minw,
                    J = K.maxw,
                    A = C === null,
                    L = J === null,
                    y = "em";
                if (!!C) {
                    C = parseFloat(C) * (C.indexOf(y) > -1 ? (p || v()) : 1)
                }
                if (!!J) {
                    J = parseFloat(J) * (J.indexOf(y) > -1 ? (p || v()) : 1)
                }
                if (!K.hasquery || (!A || !L) && (A || H >= C) && (L || H <= J)) {
                    if (!D[K.media]) {
                        D[K.media] = []
                    }
                    D[K.media].push(k[K.rules])
                }
            }
            for (var E in q) {
                if (q[E] && q[E].parentNode === f) {
                    f.removeChild(q[E])
                }
            }
            for (var E in D) {
                var M = w.createElement("style"),
                    F = D[E].join("\n");
                M.type = "text/css";
                M.media = E;
                f.insertBefore(M, G.nextSibling);
                if (M.styleSheet) {
                    M.styleSheet.cssText = F
                } else {
                    M.appendChild(w.createTextNode(F))
                }
                q.push(M)
            }
        },
        n = function(x, z) {
            var y = c();
            if (!y) {
                return
            }
            y.open("GET", x, true);
            y.onreadystatechange = function() {
                if (y.readyState != 4 || y.status != 200 && y.status != 304) {
                    return
                }
                z(y.responseText)
            };
            if (y.readyState == 4) {
                return
            }
            y.send(null)
        },
        c = (function() {
            var x = false;
            try {
                x = new XMLHttpRequest()
            } catch (y) {
                x = new ActiveXObject("Microsoft.XMLHTTP")
            }
            return function() {
                return x
            }
        })();
    a();
    respond.update = a;

    function t() {
        j(true)
    }
    if (e.addEventListener) {
        e.addEventListener("resize", t, false)
    } else {
        if (e.attachEvent) {
            e.attachEvent("onresize", t)
        }
    }
})(this);
/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
(function() {
    function a(a) {
        this._value = a
    }

    function b(a, b, c, d) {
        var e, f, g = Math.pow(10, b);
        return f = (c(a * g) / g).toFixed(b), d && (e = new RegExp("0{1," + d + "}$"), f = f.replace(e, "")), f
    }

    function c(a, b, c) {
        var d;
        return d = b.indexOf("$") > -1 ? e(a, b, c) : b.indexOf("%") > -1 ? f(a, b, c) : b.indexOf(":") > -1 ? g(a, b) : i(a._value, b, c)
    }

    function d(a, b) {
        var c, d, e, f, g, i = b,
            j = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            k = !1;
        if (b.indexOf(":") > -1) a._value = h(b);
        else if (b === q) a._value = 0;
        else {
            for ("." !== o[p].delimiters.decimal && (b = b.replace(/\./g, "").replace(o[p].delimiters.decimal, ".")), c = new RegExp("[^a-zA-Z]" + o[p].abbreviations.thousand + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), d = new RegExp("[^a-zA-Z]" + o[p].abbreviations.million + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), e = new RegExp("[^a-zA-Z]" + o[p].abbreviations.billion + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), f = new RegExp("[^a-zA-Z]" + o[p].abbreviations.trillion + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), g = 0; g <= j.length && !(k = b.indexOf(j[g]) > -1 ? Math.pow(1024, g + 1) : !1); g++);
            a._value = (k ? k : 1) * (i.match(c) ? Math.pow(10, 3) : 1) * (i.match(d) ? Math.pow(10, 6) : 1) * (i.match(e) ? Math.pow(10, 9) : 1) * (i.match(f) ? Math.pow(10, 12) : 1) * (b.indexOf("%") > -1 ? .01 : 1) * ((b.split("-").length + Math.min(b.split("(").length - 1, b.split(")").length - 1)) % 2 ? 1 : -1) * Number(b.replace(/[^0-9\.]+/g, "")), a._value = k ? Math.ceil(a._value) : a._value
        }
        return a._value
    }

    function e(a, b, c) {
        var d, e, f = b.indexOf("$"),
            g = b.indexOf("("),
            h = b.indexOf("-"),
            j = "";
        return b.indexOf(" $") > -1 ? (j = " ", b = b.replace(" $", "")) : b.indexOf("$ ") > -1 ? (j = " ", b = b.replace("$ ", "")) : b = b.replace("$", ""), e = i(a._value, b, c), 1 >= f ? e.indexOf("(") > -1 || e.indexOf("-") > -1 ? (e = e.split(""), d = 1, (g > f || h > f) && (d = 0), e.splice(d, 0, o[p].currency.symbol + j), e = e.join("")) : e = o[p].currency.symbol + j + e : e.indexOf(")") > -1 ? (e = e.split(""), e.splice(-1, 0, j + o[p].currency.symbol), e = e.join("")) : e = e + j + o[p].currency.symbol, e
    }

    function f(a, b, c) {
        var d, e = "",
            f = 100 * a._value;
        return b.indexOf(" %") > -1 ? (e = " ", b = b.replace(" %", "")) : b = b.replace("%", ""), d = i(f, b, c), d.indexOf(")") > -1 ? (d = d.split(""), d.splice(-1, 0, e + "%"), d = d.join("")) : d = d + e + "%", d
    }

    function g(a) {
        var b = Math.floor(a._value / 60 / 60),
            c = Math.floor((a._value - 60 * b * 60) / 60),
            d = Math.round(a._value - 60 * b * 60 - 60 * c);
        return b + ":" + (10 > c ? "0" + c : c) + ":" + (10 > d ? "0" + d : d)
    }

    function h(a) {
        var b = a.split(":"),
            c = 0;
        return 3 === b.length ? (c += 60 * Number(b[0]) * 60, c += 60 * Number(b[1]), c += Number(b[2])) : 2 === b.length && (c += 60 * Number(b[0]), c += Number(b[1])), Number(c)
    }

    function i(a, c, d) {
        var e, f, g, h, i, j, k = !1,
            l = !1,
            m = !1,
            n = "",
            r = !1,
            s = !1,
            t = !1,
            u = !1,
            v = !1,
            w = "",
            x = "",
            y = Math.abs(a),
            z = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            A = "",
            B = !1;
        if (0 === a && null !== q) return q;
        if (c.indexOf("(") > -1 ? (k = !0, c = c.slice(1, -1)) : c.indexOf("+") > -1 && (l = !0, c = c.replace(/\+/g, "")), c.indexOf("a") > -1 && (r = c.indexOf("aK") >= 0, s = c.indexOf("aM") >= 0, t = c.indexOf("aB") >= 0, u = c.indexOf("aT") >= 0, v = r || s || t || u, c.indexOf(" a") > -1 ? (n = " ", c = c.replace(" a", "")) : c = c.replace("a", ""), y >= Math.pow(10, 12) && !v || u ? (n += o[p].abbreviations.trillion, a /= Math.pow(10, 12)) : y < Math.pow(10, 12) && y >= Math.pow(10, 9) && !v || t ? (n += o[p].abbreviations.billion, a /= Math.pow(10, 9)) : y < Math.pow(10, 9) && y >= Math.pow(10, 6) && !v || s ? (n += o[p].abbreviations.million, a /= Math.pow(10, 6)) : (y < Math.pow(10, 6) && y >= Math.pow(10, 3) && !v || r) && (n += o[p].abbreviations.thousand, a /= Math.pow(10, 3))), c.indexOf("b") > -1)
            for (c.indexOf(" b") > -1 ? (w = " ", c = c.replace(" b", "")) : c = c.replace("b", ""), g = 0; g <= z.length; g++)
                if (e = Math.pow(1024, g), f = Math.pow(1024, g + 1), a >= e && f > a) {
                    w += z[g], e > 0 && (a /= e);
                    break
                }
        return c.indexOf("o") > -1 && (c.indexOf(" o") > -1 ? (x = " ", c = c.replace(" o", "")) : c = c.replace("o", ""), x += o[p].ordinal(a)), c.indexOf("[.]") > -1 && (m = !0, c = c.replace("[.]", ".")), h = a.toString().split(".")[0], i = c.split(".")[1], j = c.indexOf(","), i ? (i.indexOf("[") > -1 ? (i = i.replace("]", ""), i = i.split("["), A = b(a, i[0].length + i[1].length, d, i[1].length)) : A = b(a, i.length, d), h = A.split(".")[0], A = A.split(".")[1].length ? o[p].delimiters.decimal + A.split(".")[1] : "", m && 0 === Number(A.slice(1)) && (A = "")) : h = b(a, null, d), h.indexOf("-") > -1 && (h = h.slice(1), B = !0), j > -1 && (h = h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + o[p].delimiters.thousands)), 0 === c.indexOf(".") && (h = ""), (k && B ? "(" : "") + (!k && B ? "-" : "") + (!B && l ? "+" : "") + h + A + (x ? x : "") + (n ? n : "") + (w ? w : "") + (k && B ? ")" : "")
    }

    function j(a, b) {
        o[a] = b
    }

    function k(a) {
        var b = a.toString().split(".");
        return b.length < 2 ? 1 : Math.pow(10, b[1].length)
    }

    function l() {
        var a = Array.prototype.slice.call(arguments);
        return a.reduce(function(a, b) {
            var c = k(a),
                d = k(b);
            return c > d ? c : d
        }, -1 / 0)
    }
    var m, n = "1.5.3",
        o = {},
        p = "en",
        q = null,
        r = "0,0",
        s = "undefined" != typeof module && module.exports;
    m = function(b) {
        return m.isNumeral(b) ? b = b.value() : 0 === b || "undefined" == typeof b ? b = 0 : Number(b) || (b = m.fn.unformat(b)), new a(Number(b))
    }, m.version = n, m.isNumeral = function(b) {
        return b instanceof a
    }, m.language = function(a, b) {
        if (!a) return p;
        if (a && !b) {
            if (!o[a]) throw new Error("Unknown language : " + a);
            p = a
        }
        return (b || !o[a]) && j(a, b), m
    }, m.languageData = function(a) {
        if (!a) return o[p];
        if (!o[a]) throw new Error("Unknown language : " + a);
        return o[a]
    }, m.language("en", {
        delimiters: {
            thousands: ",",
            decimal: "."
        },
        abbreviations: {
            thousand: "k",
            million: "m",
            billion: "b",
            trillion: "t"
        },
        ordinal: function(a) {
            var b = a % 10;
            return 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th"
        },
        currency: {
            symbol: "$"
        }
    }), m.zeroFormat = function(a) {
        q = "string" == typeof a ? a : null
    }, m.defaultFormat = function(a) {
        r = "string" == typeof a ? a : "0.0"
    }, "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function(a, b) {
        "use strict";
        if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
        if ("function" != typeof a) throw new TypeError(a + " is not a function");
        var c, d, e = this.length >>> 0,
            f = !1;
        for (1 < arguments.length && (d = b, f = !0), c = 0; e > c; ++c) this.hasOwnProperty(c) && (f ? d = a(d, this[c], c, this) : (d = this[c], f = !0));
        if (!f) throw new TypeError("Reduce of empty array with no initial value");
        return d
    }), m.fn = a.prototype = {
        clone: function() {
            return m(this)
        },
        format: function(a, b) {
            return c(this, a ? a : r, void 0 !== b ? b : Math.round)
        },
        unformat: function(a) {
            return "[object Number]" === Object.prototype.toString.call(a) ? a : d(this, a ? a : r)
        },
        value: function() {
            return this._value
        },
        valueOf: function() {
            return this._value
        },
        set: function(a) {
            return this._value = Number(a), this
        },
        add: function(a) {
            function b(a, b) {
                return a + c * b
            }
            var c = l.call(null, this._value, a);
            return this._value = [this._value, a].reduce(b, 0) / c, this
        },
        subtract: function(a) {
            function b(a, b) {
                return a - c * b
            }
            var c = l.call(null, this._value, a);
            return this._value = [a].reduce(b, this._value * c) / c, this
        },
        multiply: function(a) {
            function b(a, b) {
                var c = l(a, b);
                return a * c * b * c / (c * c)
            }
            return this._value = [this._value, a].reduce(b, 1), this
        },
        divide: function(a) {
            function b(a, b) {
                var c = l(a, b);
                return a * c / (b * c)
            }
            return this._value = [this._value, a].reduce(b), this
        },
        difference: function(a) {
            return Math.abs(m(this._value).subtract(a).value())
        }
    }, s && (module.exports = m), "undefined" == typeof ender && (this.numeral = m), "function" == typeof define && define.amd && define([], function() {
        return m
    })
}).call(this);
//////////////////////////////////////////////////////////////////////
// Pano2VR pro 4.5.1/10655 HTML5/CSS3 & WebGL Panorama Player       //
// Trial License: For evaluation only!                              //
// (c) 2014, Garden Gnome Software, http://ggnome.com               //
//////////////////////////////////////////////////////////////////////

var m = !0,
    p = null,
    r = !1;

function N(k, q, h, G, B) {
    var n = this;
    n.x = k;
    n.y = q;
    n.e = h;
    n.H = G;
    n.n = B;
    n.q = function(k, h, q) {
        n.x = k;
        n.y = h;
        n.e = q;
        n.H = void 0;
        n.n = void 0
    };
    n.toString = function() {
        return "(" + n.x + "," + n.y + "," + n.e + ") - (" + n.H + "," + n.n + ")"
    };
    n.k = function(k) {
        var h = Math.sin(k),
            k = Math.cos(k),
            q = n.y,
            B = n.e;
        n.y = k * q - h * B;
        n.e = h * q + k * B
    };
    n.l = function(k) {
        var h = Math.sin(k),
            k = Math.cos(k),
            q = n.x,
            B = n.e;
        n.x = k * q + h * B;
        n.e = -h * q + k * B
    };
    n.fa = function(k) {
        var h = Math.sin(k),
            k = Math.cos(k),
            q = n.x,
            B = n.y;
        n.x = k * q - h * B;
        n.y = h * q + k * B
    };
    n.Ka = function() {
        return new N(n.x, n.y, n.e, n.H,
            n.n)
    };
    n.length = function() {
        return Math.sqrt(n.x * n.x + n.y * n.y + n.e * n.e)
    };
    n.va = function(k) {
        return n.x * k.x + n.y * k.y + n.e * k.e
    };
    n.Na = function(k, h) {
        var q;
        q = Math.cos(h * Math.PI / 180);
        n.x = q * Math.sin(k * Math.PI / 180);
        n.y = Math.sin(h * Math.PI / 180);
        n.e = q * Math.cos(k * Math.PI / 180)
    };
    n.ab = function(k, h, q) {
        n.x = k.x * q + h.x * (1 - q);
        n.y = k.y * q + h.y * (1 - q);
        n.e = k.e * q + h.e * (1 - q);
        n.H = k.H * q + h.H * (1 - q);
        n.n = k.n * q + h.n * (1 - q)
    }
}
glMatrixArrayType = "undefined" != typeof Float32Array ? Float32Array : "undefined" != typeof WebGLFloatArray ? WebGLFloatArray : Array;

function Ba(k) {
    k[0] = 1;
    k[1] = 0;
    k[2] = 0;
    k[3] = 0;
    k[4] = 0;
    k[5] = 1;
    k[6] = 0;
    k[7] = 0;
    k[8] = 0;
    k[9] = 0;
    k[10] = 1;
    k[11] = 0;
    k[12] = 0;
    k[13] = 0;
    k[14] = 0;
    k[15] = 1
}

function Gb(k, q, h) {
    var G, B = h[0],
        n = h[1],
        h = h[2],
        W = Math.sqrt(B * B + n * n + h * h);
    if (W) {
        1 != W && (W = 1 / W, B *= W, n *= W, h *= W);
        var ua = Math.sin(q),
            Ua = Math.cos(q),
            la = 1 - Ua,
            q = k[0],
            W = k[1],
            sb = k[2],
            Va = k[3],
            Ca = k[4],
            Wa = k[5],
            fa = k[6],
            Xa = k[7],
            Da = k[8],
            Ya = k[9],
            Za = k[10],
            $a = k[11],
            Ma = B * B * la + Ua,
            ab = n * B * la + h * ua,
            bb = h * B * la - n * ua,
            Na = B * n * la - h * ua,
            cb = n * n * la + Ua,
            db = h * n * la + B * ua,
            eb = B * h * la + n * ua,
            B = n * h * la - B * ua,
            n = h * h * la + Ua;
        G ? k != G && (G[12] = k[12], G[13] = k[13], G[14] = k[14], G[15] = k[15]) : G = k;
        G[0] = q * Ma + Ca * ab + Da * bb;
        G[1] = W * Ma + Wa * ab + Ya * bb;
        G[2] = sb * Ma + fa * ab + Za * bb;
        G[3] =
            Va * Ma + Xa * ab + $a * bb;
        G[4] = q * Na + Ca * cb + Da * db;
        G[5] = W * Na + Wa * cb + Ya * db;
        G[6] = sb * Na + fa * cb + Za * db;
        G[7] = Va * Na + Xa * cb + $a * db;
        G[8] = q * eb + Ca * B + Da * n;
        G[9] = W * eb + Wa * B + Ya * n;
        G[10] = sb * eb + fa * B + Za * n;
        G[11] = Va * eb + Xa * B + $a * n
    }
}

function Zb(k, q, h) {
    var k = 0.1 * Math.tan(k * Math.PI / 360),
        q = k * q,
        G = -q,
        B = -k;
    h || (h = new glMatrixArrayType(16));
    var n = q - G,
        W = k - B;
    h[0] = 0.2 / n;
    h[1] = 0;
    h[2] = 0;
    h[3] = 0;
    h[4] = 0;
    h[5] = 0.2 / W;
    h[6] = 0;
    h[7] = 0;
    h[8] = (q + G) / n;
    h[9] = (k + B) / W;
    h[10] = -100.1 / 99.9;
    h[11] = -1;
    h[12] = 0;
    h[13] = 0;
    h[14] = -20 / 99.9;
    h[15] = 0
}

function Jc() {
    var k = "perspective",
        q = ["Webkit", "Moz", "O", "ms", "Ms"],
        h;
    h = r;
    for (h = 0; h < q.length; h++) "undefined" !== typeof document.documentElement.style[q[h] + "Perspective"] && (k = q[h] + "Perspective");
    "undefined" !== typeof document.documentElement.style[k] ? "webkitPerspective" in document.documentElement.style ? (k = document.createElement("style"), q = document.createElement("div"), h = document.head || document.getElementsByTagName("head")[0], k.textContent = "@media (-webkit-transform-3d) {#ggswhtml5{height:5px}}", h.appendChild(k),
        q.id = "ggswhtml5", document.documentElement.appendChild(q), h = 5 === q.offsetHeight, k.parentNode.removeChild(k), q.parentNode.removeChild(q)) : h = m : h = r;
    return h
}

function Kc() {
    var k;
    if (k = !!window.WebGLRenderingContext) try {
        var q = document.createElement("canvas");
        q.width = 100;
        q.height = 100;
        var h = q.getContext("webgl");
        h || (h = q.getContext("experimental-webgl"));
        k = h ? m : r
    } catch (G) {
        k = r
    }
    return k
}

function pano2vrPlayer(k) {
    function q(a) {
        var e, c;
        c = [];
        e = a.getAttributeNode("title");
        c.title = e ? e.nodeValue.toString() : "";
        e = a.getAttributeNode("description");
        c.description = e ? e.nodeValue.toString() : "";
        e = a.getAttributeNode("author");
        c.author = e ? e.nodeValue.toString() : "";
        e = a.getAttributeNode("datetime");
        c.datetime = e ? e.nodeValue.toString() : "";
        e = a.getAttributeNode("copyright");
        c.copyright = e ? e.nodeValue.toString() : "";
        e = a.getAttributeNode("source");
        c.source = e ? e.nodeValue.toString() : "";
        e = a.getAttributeNode("info");
        c.information = e ? e.nodeValue.toString() : "";
        e = a.getAttributeNode("comment");
        c.comment = e ? e.nodeValue.toString() : "";
        e = a.getAttributeNode("latitude");
        c.latitude = e ? 1 * e.nodeValue : "0.0";
        e = a.getAttributeNode("longitude");
        c.longitude = e ? 1 * e.nodeValue : "0.0";
        if (e = a.getAttributeNode("tags")) {
            a = e.nodeValue.toString().split("|");
            for (e = 0; e < a.length; e++) "" == a[e] && (a.splice(e, 1), e--);
            c.tags = a
        } else c.tags = [];
        return c
    }

    function h(a) {
        Hb = "{" == a.charAt(0) ? a.substr(1, a.length - 2) : "";
        b.skinObj && b.skinObj.changeActiveNode && b.skinObj.changeActiveNode(a)
    }

    function G(a) {
        return function() {
            b.dirty = m;
            b.Ma = m;
            a.d && (a.a && a.a.complete ? (a.loaded = m, a.d.drawImage(a.a, 0, 0, a.width, a.height), a.a = p, a.D = p) : a.D && a.D.complete && !a.loaded && (a.d.drawImage(a.D, 0, 0, a.width, a.height), a.D = p))
        }
    }

    function B(a) {
        for (var e = 0; e < C.length; e++)
            if (C[e].id == a) return C[e];
        for (e = 0; e < y.length; e++)
            if (y[e].id == a) return y[e];
        for (e = 0; e < da.length; e++)
            if (da[e].id == a) return da[e];
        return p
    }

    function n(a) {
        try {
            a.obj = document.createElement("img");
            a.obj.setAttribute("style", "-webkit-user-drag:none; max-width:none;");
            a.obj.setAttribute("class", "ggmedia");
            b.W && a.obj.setAttribute("id", b.W + a.id);
            a.obj.ondragstart = function() {
                return r
            };
            if (1 == a.u || 4 == a.u) a.o = function() {
                a.V(!a.v)
            }, a.ca = function() {
                a.na = r;
                a.obj.style[va] = "none"
            }, a.V = function(c) {
                a.v = c;
                a.obj.style.zIndex = a.v ? 8E4 : 0;
                a.obj.style[va] = "all 1s ease 0s";
                a.na = m;
                $b()
            }, a.obj.addEventListener(ua(), a.ca, r), a.obj.addEventListener("transitionend", a.ca, r);
            a.obj.setAttribute("src", ma(a.url));
            a.z && (a.obj.width = a.z);
            a.B && (a.obj.height = a.B);
            da.push(a);
            a.obj.style.position =
                "absolute";
            a.o && (a.obj.onclick = a.o);
            s.appendChild(a.obj)
        } catch (e) {}
    }

    function W(a) {
        try {
            a.obj = document.createElement("video");
            a.obj.setAttribute("class", "ggmedia");
            b.W && a.obj.setAttribute("id", b.W + a.id);
            a.obj.setAttribute("style", "max-width:none;");
            if (1 == a.u || 4 == a.u) a.o = function() {
                a.V(!a.v)
            }, a.ca = function() {
                a.na = r;
                a.obj.style[va] = "none"
            }, a.V = function(c) {
                a.v = c;
                a.v ? (a.obj.style.zIndex = 8E4, a.obj.style[va] = "all 1s ease 0s", b.playSound(a.id)) : (a.obj.style.zIndex = 0, a.obj.style[va] = "all 1s ease 0s");
                a.na =
                    m;
                $b()
            }, a.obj.addEventListener(ua(), a.ca, r), a.obj.addEventListener("transitionend", a.ca, r);
            2 == a.u && (a.o = function() {
                b.playPauseSound(a.id)
            }, a.V = function(c) {
                c ? b.playSound(a.id) : b.pauseSound(a.id)
            });
            var e;
            for (e = 0; e < a.url.length; e++) {
                var c;
                c = document.createElement("source");
                c.setAttribute("src", ma(a.url[e]));
                a.obj.appendChild(c)
            }
            "" != a.poster && (a.obj.poster = ma(a.poster), 0 > a.loop && (a.obj.ib = "none"));
            a.obj.volume = a.j * X;
            0 == a.loop && (a.obj.r = 1E7);
            1 <= a.loop && (a.obj.r = a.loop - 1);
            if ((1 == a.mode || 2 == a.mode || 3 == a.mode ||
                    5 == a.mode) && 0 <= a.loop) a.obj.autoplay = m;
            y.push(a);
            a.obj.style.position = "absolute";
            a.z && (a.obj.width = a.z);
            a.B && (a.obj.height = a.B);
            s.appendChild(a.obj);
            a.o && (a.obj.onclick = a.o);
            a.Qa = m;
            a.obj.addEventListener("ended", function() {
                if (0 < this.r) return this.r--, this.currentTime = 0, this.play(), m;
                this.Qa = r
            }, r)
        } catch (g) {}
    }

    function ua() {
        var a, e = document.createElement("fakeelement"),
            c = {
                OTransition: "oTransitionEnd",
                MSTransition: "msTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionEnd"
            };
        for (a in c)
            if (void 0 !== e.style[a]) return c[a]
    }

    function Ua(a) {
        var e = -1;
        try {
            for (var c = 0; c < C.length; c++) C[c].id == a.id && C[c].obj != p && C[c].url.join() == a.url.join() && C[c].loop == a.loop && C[c].mode == a.mode && (e = c);
            if (-1 == e) {
                for (c = 0; c < C.length; c++)
                    if (C[c].id == a.id && C[c].obj != p) {
                        try {
                            C[c].obj.pause()
                        } catch (g) {}
                        try {
                            C[c].obj.parentElement.removeChild(C[c].obj), delete C[c].obj, C[c].obj = p
                        } catch (d) {}
                        e = c
                    }
                a.obj = document.createElement("audio");
                a.obj.setAttribute("class", "ggmedia");
                b.W && a.obj.setAttribute("id",
                    b.W + a.id);
                for (c = 0; c < a.url.length; c++) {
                    var f;
                    f = document.createElement("source");
                    "" != a.url[c] && "#" != a.url[c] && (f.setAttribute("src", ma(a.url[c])), a.obj.appendChild(f))
                }
                a.obj.volume = a.j * X;
                0 == a.loop && (a.obj.r = 1E7);
                1 <= a.loop && (a.obj.r = a.loop - 1);
                if ((1 == a.mode || 2 == a.mode || 3 == a.mode || 5 == a.mode) && 0 <= a.loop) a.obj.autoplay = m;
                0 <= e ? C[e] = sound : C.push(a);
                0 < a.obj.childNodes.length && (b.c.appendChild(a.obj), a.obj.addEventListener("ended", function() {
                    if (0 < this.r) return this.r--, this.currentTime = 0, this.play(), m
                }, r))
            }
        } catch (l) {}
    }

    function la() {
        var a;
        $ = document.createElement("div");
        $.innerHTML = Id("PGRpdiBzdHlsZT0icG9zaXRpb246IHJlbGF0aXZlOyBsZWZ0OiAwcHg7IHJpZ2h0OiAwcHg7IHRvcDogNDAlOyBib3R0b206IDYwJTsgbWFyZ2luOiBhdXRvOyB3aWR0aDogMThlbTsgaGVpZ2h0OiA0ZW07IGJvcmRlcjogM3B4IHNvbGlkICM1NTU7IGJveC1zaGFkb3c6IDVweCA1cHggMTBweCAjMzMzOyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgZGlzcGxheTogdGFibGU7IGZvbnQtZmFtaWx5OiBWZXJkYW5hLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDEwcHQ7IG9wYWNpdHk6IDAuOTU7IGJvcmRlci1yYWRpdXM6IDE1cHg7Ij48cCBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyBkaXNwbGF5OiB0YWJsZS1jZWxsOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyAiPkNyZWF0ZWQgd2l0aCA8YSBocmVmPSJodHRwOi8vcGFubzJ2ci5jb20vIiB0YXJnZXQ9Il9ibGFuayI+UGFubzJWUjwvYT48L3A+PC9kaXY+");
        a = "top:  0px;left: 0px;width: 100px;height: 100px;overflow: hidden;z-index: 5000;position:relative;";
        "-webkit-" == T && (a += T + "transform: translateZ(99999999999999px);");
        $.setAttribute("style", a);
        b.c.insertBefore($, b.c.firstChild);
        $.style.width = 0 + Y + ac + z + "px";
        $.style.height = 0 + aa + bc + t + "px";
        $.onclick = function() {
            $ && (b.c.removeChild($), $ = p)
        };
        $.oncontextmenu = $.onclick
    }

    function sb() {
        var a;
        a = new N;
        a.Na(x, u);
        for (var e = 0; e < C.length + y.length; e++) {
            var c;
            c = e < C.length ? C[e] : y[e - C.length];
            if (c.obj) {
                var b;
                b = c.pan - x;
                for (var d =
                        c.tilt - u; - 180 > b;) b += 360;
                for (; 180 < b;) b -= 360;
                var f = c.aa,
                    l = c.field;
                0 == l && (l = 0.01);
                0 > l && (l = A);
                c.n || (c.n = new N, c.n.Na(c.pan, c.tilt));
                if (3 == c.mode) {
                    b = Math.abs(b);
                    b = b < c.s ? 0 : b - c.s;
                    var na = c.j,
                        d = Math.abs(d),
                        d = d < c.M ? 0 : d - c.M,
                        o = 1 - d / l;
                    if (Math.abs(b) > l || 0 > o) c.obj.volume = na * f * X;
                    else {
                        var k = 1 - Math.abs(b / l);
                        c.obj.volume = na * (f + (1 - f) * o * k) * X
                    }
                }
                4 == c.mode && c.gb == p && (Math.abs(b) < c.s && Math.abs(d) < c.M ? c.ga || (c.ga = m, c.obj.play()) : c.ga = r);
                5 == c.mode && (b = 180 * Math.acos(a.va(c.n)) / Math.PI, b < c.s ? c.obj.volume = c.j * X : (b -= c.s, b < l && 0 < l ?
                    (k = 1 - Math.abs(b / l), c.obj.volume = c.j * (f + (1 - f) * k) * X) : c.obj.volume = f * X));
                6 == c.mode && (b = 180 * Math.acos(a.va(c.n)) / Math.PI, Math.abs(b) < c.s ? c.ga || (c.ga = m, c.obj.play()) : c.ga = r)
            }
        }
    }

    function Va() {
        setTimeout(function() {
            b.setFullscreen(r)
        }, 10);
        setTimeout(function() {
            b.setFullscreen(r)
        }, 100)
    }

    function Ca() {
        var a = new Date;
        cc = 0;
        dc && (b.setViewerSize(b.ba.offsetWidth, b.ba.offsetHeight), dc = r);
        0 <= O && (Oa ? (oa = 0.4 * (Ea - tb), pa = 0.4 * (Fa - ub), tb += oa, ub += pa) : (oa = 0.1 * -vb * fb / 8, pa = 0.1 * -wb * fb / 8), Lc(oa, pa), b.update());
        xb && (b.changeFov(0.4 *
            (U - A)), 0.0010 > Math.abs(U - A) / A && (xb = r), b.update());
        if (ec && (0 != oa || 0 != pa) && 0 > O) oa *= 0.9, pa *= 0.9, 0.1 > oa * oa + pa * pa ? pa = oa = 0 : (Lc(oa, pa), b.update());
        if (0 != Pa) {
            var e = fb / 8;
            switch (Pa) {
                case 37:
                    b.changePan(e * fa(), m);
                    break;
                case 38:
                    b.changeTilt(e * fa(), m);
                    break;
                case 39:
                    b.changePan(-e * fa(), m);
                    break;
                case 40:
                    b.changeTilt(-e * fa(), m);
                    break;
                case 43:
                case 107:
                case 16:
                    b.changeFovLog(-e, m);
                    break;
                case 17:
                case 18:
                case 109:
                case 45:
                case 91:
                    b.changeFovLog(e, m)
            }
            b.update()
        }
        if (!b.isLoaded && b.hasConfig) {
            var c = 0,
                g = b.checkLoaded.length;
            if (yb) g = 50, fc < g && fc++, c = fc;
            else
                for (e = 0; e < g; e++) b.checkLoaded[e].complete && "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYBgeACDAAADIAAE3iTbkAAAAAElFTkSuQmCC" != b.checkLoaded[e].src && c++;
            c == g ? (Ib = 1, b.isLoaded = m, b.divSkin && b.divSkin.ggLoaded && b.divSkin.ggLoaded(), Jb && gb && !hb && (ea = m)) : Ib = c / (1 * g)
        }
        for (; 360 < x;) x -= 360;
        for (; - 360 > x;) x += 360;
        if (hb) {
            F = gc - x;
            if (360 == ib - jb) {
                for (; - 180 > F;) F += 360;
                for (; 180 < F;) F -= 360
            }
            M = hc - u;
            L = ic - A;
            e =
                Mc * fa();
            c = Math.sqrt(F * F + M * M + L * L);
            if (10 * c < e) {
                if (hb = r, L = M = F = 0, b.onMoveComplete) b.onMoveComplete()
            } else c = c > 5 * e ? e / c : 0.2, F *= c, M *= c, L *= c;
            x += F;
            u += M;
            A += L;
            jc = a.getTime();
            b.update()
        } else if (ea)
            if (e = a.getTime() - kb, 0 < kc && b.Aa && e >= 1E3 * kc) {
                if (1 < sa.length) {
                    if (Nc) {
                        e = 1E3;
                        do c = sa[Math.floor(Math.random() * sa.length)]; while (e-- && c == Hb)
                    } else e = sa.indexOf(Hb), e++, e >= sa.length && (e = 0), c = sa[e];
                    kb = a.getTime();
                    b.openNext("{" + c + "}")
                }
            } else M = Kb * (0 - u) / 100, L = Kb * (Lb - A) / 100, F = 0.95 * F + 0.05 * -Qa * fa(), x += F, u += M, A += L, b.update();
        else {
            if (gb &&
                0 > O && a.getTime() - jc > 1E3 * lc && (Jb && b.isLoaded || !Jb)) ea = m, kb = a.getTime(), L = M = F = 0;
            if (ec && 0 == Pa && 0 > O && (0 != F || 0 != M || 0 != L)) F *= 0.9, M *= 0.9, L *= 0.9, x += F, u += M, b.changeFovLog(L), 1.0E-4 > F * F + M * M + L * L && (L = M = F = 0), b.update()
        }
        Oc && (Mb ? a.getTime() - mc >= 1E3 * Pc && (Mb = r) : (Ra += lb, 0 > Ra && (Ra = 0, lb = -lb, Mb = m, mc = a.getTime()), 1 < Ra && (Ra = 1, lb = -lb, Mb = m, mc = a.getTime()), b.setOverlayOpacity(Ra)));
        if (0 < y.length)
            for (e = 0; e < y.length; e++) y[e].Qa && y[e].Za != y[e].obj.currentTime && (y[e].Za = y[e].obj.currentTime, !y[e].Ua && 0 < y[e].obj.videoHeight && (y[e].Ua =
                y[e].obj.videoWidth / y[e].obj.videoHeight));
        if (0 < P) {
            if (2 == P)
                for (e = 0; e < H.length; e++) a = H[e], "poly" == a.type && a.A != a.p && (a.A > a.p ? (a.p += 0.05, a.A < a.p && (a.p = a.A)) : (a.p -= 0.05, a.A > a.p && (a.p = a.A)), b.update());
            3 == P && wa != ga && (wa > ga ? (ga += 0.05, wa < ga && (ga = wa)) : (ga -= 0.05, wa > ga && (ga = wa)), b.update())
        }
        sb();
        b.dirty && (0 < b.ja ? b.ja-- : (b.dirty = r, b.ja = 0), b.updatePanorama());
        Qc ? setTimeout(function() {
            Ca()
        }, 1E3 / 60) : Rc(function() {
            Ca()
        })
    }

    function Wa() {
        setTimeout(function() {
            Wa()
        }, 200);
        5 < cc && (Rc = function() {
            return function(a) {
                window.setTimeout(a,
                    10)
            }
        }, Qc = m, Ca());
        cc++
    }

    function fa() {
        return Math.min(1, 2 * Math.tan(Math.PI * A / 360))
    }

    function Xa(a) {
        b.skinObj && b.skinObj.hotspotProxyClick && b.skinObj.hotspotProxyClick(a.id);
        "" != a.url && (b.openUrl(a.url, a.target), Sc(-1, -1))
    }

    function Da() {
        b.isFullscreen && (Nb() || b.exitFullscreen(), Nb() && (b.c.style.left = "0px", b.c.style.top = "0px"))
    }

    function Ya() {
        Pa = 0
    }

    function Za(a) {
        Pa && (Pa = 0, a.preventDefault(), I())
    }

    function $a(a) {
        Ob || (b.isFullscreen && a.preventDefault(), Pa = a.keyCode, I())
    }

    function Ma(a) {
        ba || (a.preventDefault(),
            I(), Sa && Sa.reset())
    }

    function ab(a) {
        ba || (a.preventDefault(), 1 != a.scale && (xb = m, Pb *= a.scale, U = mb / Math.sqrt(Pb), U > qa && (U = qa), U < ha && (U = ha), b.update(), I()))
    }

    function bb(a) {
        !ba && Ga(a.target) && (a.preventDefault(), xb = m, U = mb / Math.sqrt(a.scale), U > qa && (U = qa), U < ha && (U = ha), b.update(), I())
    }

    function Na(a) {
        nc = m;
        Pb = 1;
        ba || (a.touches ? (b.m = a.touches.target, Ga(a.target) && (a.preventDefault(), mb = A, I())) : (a.preventDefault(), mb = A, I()))
    }

    function cb(a) {
        !Sa && window.MSGesture && (Sa = new MSGesture, Sa.target = b.control);
        Sa && Sa.addPointer(a.pointerId)
    }

    function db() {
        ba || (O = -2)
    }

    function eb(a) {
        var e;
        if (!ba) {
            0 <= O && I();
            var c = (new Date).getTime();
            e = -1;
            var g, d, f = m;
            e = Math.abs(Tc - zb) + Math.abs(Uc - Ab);
            if (0 <= e && 20 > e) {
                a.preventDefault();
                if (Ga(b.m) && (g = oc(b.mouse.x, b.mouse.y))) b.hotspot = g;
                if (b.m) {
                    e = b.m;
                    for (d = r; e && e != b.control;) e.onclick && !d && (e.onclick(), d = m, f = r), e = e.parentNode
                }
                e = Math.abs(Vc - zb) + Math.abs(Wc - Ab);
                if (700 > c - b.da && 0 <= e && 20 > e) {
                    a.preventDefault();
                    Ga(b.m) && pc && setTimeout(function() {
                        b.toggleFullscreen()
                    }, 1);
                    if (b.m) {
                        e = b.m;
                        for (d = r; e && e != b.control;) e.ondblclick &&
                            !d && (e.ondblclick(), d = m, f = r), e = e.parentNode
                    }
                    b.da = 0
                } else b.da = c;
                Vc = zb;
                Wc = Ab
            }
            if (b.m) {
                a.preventDefault();
                e = b.m;
                for (d = r; e && e != b.control;) {
                    if (e.onmouseout) e.onmouseout();
                    e.onmouseup && !d && (e.onmouseup(), d = m);
                    e = e.parentNode
                }
            }
            b.m = p;
            O = -11;
            g && f && Xa(g);
            b.hotspot = b.emptyHotspot
        }
    }

    function Jd(a) {
        a || (a = window.event);
        var e = a.touches,
            c = Bb();
        b.mouse.x = e[0].pageX - c.x;
        b.mouse.y = e[0].pageY - c.y;
        if (!ba) {
            e[0] && (zb = e[0].pageX, Ab = e[0].pageY);
            if (0 <= O) {
                a.preventDefault();
                for (c = 0; c < e.length; c++)
                    if (e[c].identifier == O) {
                        Xc(e[c].pageX,
                            e[c].pageY);
                        break
                    }
                I()
            }
            2 == e.length && e[0] && e[1] && (O = -6, nc || (Yc = Math.sqrt((e[0].pageX - e[1].pageX) * (e[0].pageX - e[1].pageX) + (e[0].pageY - e[1].pageY) * (e[0].pageY - e[1].pageY)), xb = m, U = mb * Math.sqrt(Zc / Yc), U > qa && (U = qa), U < ha && (U = ha), I(), a.preventDefault()))
        }
    }

    function Kd(a) {
        a || (a = window.event);
        var e = a.touches,
            c = Bb();
        b.mouse.x = e[0].pageX - c.x;
        b.mouse.y = e[0].pageY - c.y;
        if (!ba) {
            if (0 > O && e[0]) {
                qc = (new Date).getTime();
                Tc = e[0].pageX;
                Uc = e[0].pageY;
                zb = e[0].pageX;
                Ab = e[0].pageY;
                b.m = e[0].target;
                if (Ga(a.target)) {
                    if ((c = $c(b.mouse.x,
                            b.mouse.y)) && c.o) c.o();
                    else {
                        var c = e[0].pageX,
                            g = e[0].pageY;
                        rc = c;
                        sc = g;
                        Ea = c;
                        Fa = g;
                        tb = c;
                        ub = g;
                        O = e[0].identifier
                    }
                    a.preventDefault();
                    I()
                }
                if (b.m) {
                    c = b.m;
                    for (flag = r; c && c != b.control;) {
                        if (c.onmouseover) c.onmouseover();
                        c.onmousedown && !flag && (c.onmousedown(), flag = m);
                        c = c.parentNode
                    }
                    flag && a.preventDefault()
                }
            }
            1 < e.length && (O = -5);
            !nc && 2 == e.length && e[0] && e[1] && (Zc = Math.sqrt((e[0].pageX - e[1].pageX) * (e[0].pageX - e[1].pageX) + (e[0].pageY - e[1].pageY) * (e[0].pageY - e[1].pageY)), mb = A);
            wb = vb = 0
        }
    }

    function tc(a) {
        if (!uc && (a = a ? a : window.event,
                Ga(a.target))) {
            var e = a.detail ? -1 * a.detail : a.wheelDelta / 40;
            ad && (e = -e);
            a.axis && (-1 == Qb ? Qb = a.axis : Qb != a.axis && (e = 0));
            var c = 0 < e ? 1 : -1;
            0 != e && (b.changeFovLog(c * bd, m), b.update());
            a.preventDefault();
            I()
        }
    }

    function cd(a) {
        a = a ? a : window.event;
        Qb = -1;
        if (!ba && 0 <= O) {
            a.preventDefault();
            O = -3;
            wb = vb = 0;
            var a = (new Date).getTime(),
                e = -1,
                e = Math.abs(rc - Ea) + Math.abs(sc - Fa);
            400 > a - qc && 0 <= e && 20 > e && ((e = oc(b.mouse.x, b.mouse.y)) && Xa(e), e = Math.abs(dd - Ea) + Math.abs(ed - Fa), 700 > a - b.da && 0 <= e && 20 > e ? (pc && setTimeout(function() {
                    b.toggleFullscreen()
                },
                10), b.da = 0) : b.da = a, dd = Ea, ed = Fa);
            I()
        }
    }

    function fd(a) {
        var a = a ? a : window.event,
            e = Bb();
        Nb() ? (b.mouse.x = a.screenX - Y, b.mouse.y = a.screenY - aa) : (b.mouse.x = a.pageX - e.x, b.mouse.y = a.pageY - e.y);
        if (!ba && (0 <= O && (a.preventDefault(), (a.which || 0 == a.which || 1 == a.which) && Xc(a.pageX, a.pageY), I()), b.hotspot == b.emptyHotspot || "poly" == b.hotspot.type)) {
            var c = b.emptyHotspot;
            0 < H.length && Ga(a.target) && (c = oc(b.mouse.x, b.mouse.y));
            b.hotspot != c && (b.hotspot != b.emptyHotspot && (0 < P && (b.hotspot.A = 0), b.skinObj && b.skinObj.hotspotProxyOut &&
                b.skinObj.hotspotProxyOut(b.hotspot.id)), c ? (b.hotspot = c, b.skinObj && b.skinObj.hotspotProxyOver && b.skinObj.hotspotProxyOver(b.hotspot.id), Q.style.cursor = "pointer", 0 < P && (wa = 1, b.hotspot.A = 1)) : (b.hotspot = b.emptyHotspot, Q.style.cursor = "auto", 0 < P && (wa = 0)));
            Sc(a.pageX - e.x, a.pageY - e.y)
        }
    }

    function Sc(a, e) {
        var c = Rb;
        c.enabled && (b.hotspot != b.emptyHotspot && 0 <= a && 0 <= e && "" != b.hotspot.title ? (K.innerHTML = b.hotspot.title, K.style.color = Ha(c.Da, c.Ca), K.style.backgroundColor = c.background ? Ha(c.O, c.N) : "transparent", K.style.border =
            "solid " + Ha(c.Q, c.P) + " " + c.xa + "px", K.style.borderRadius = c.wa + "px", K.style.textAlign = "center", 0 < c.width ? (K.style.left = a - c.width / 2 + Y + "px", K.style.width = c.width + "px") : (K.style.width = "auto", K.style.left = a - K.offsetWidth / 2 + Y + "px"), K.style.height = 0 < c.height ? c.height + "px" : "auto", K.style.top = e + 25 + +aa + "px", K.style.visibility = "inherit", K.style.overflow = "hidden") : (K.style.visibility = "hidden", K.innerHTML = ""))
    }

    function gd(a) {
        var e = Bb();
        Nb() ? (b.mouse.x = a.screenX - Y, b.mouse.y = a.screenY - aa) : (b.mouse.x = a.pageX - e.x,
            b.mouse.y = a.pageY - e.y);
        if ($) $.onclick();
        if (!ba) {
            a = a ? a : window.event;
            if ((a.which || 0 == a.which || 1 == a.which) && Ga(a.target)) {
                if ((e = $c(b.mouse.x, b.mouse.y)) && e.o) e.o();
                else {
                    var e = a.pageX,
                        c = a.pageY;
                    rc = e;
                    sc = c;
                    Ea = e;
                    Fa = c;
                    tb = e;
                    ub = c;
                    O = 1;
                    qc = (new Date).getTime()
                }
                a.preventDefault();
                I()
            }
            wb = vb = 0
        }
    }

    function Nb() {
        return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement && document.msFullscreenElement != p || document.fullScreen
    }

    function $c(a, e) {
        var c = b.R(),
            g;
        for (g = 0; g < y.length + da.length; g++) {
            var d;
            d = g < y.length ? y[g] : da[g - y.length];
            if (d.v) return d
        }
        for (g = 0; g < y.length + da.length; g++) {
            d = g < y.length ? y[g] : da[g - y.length];
            var f = [],
                l = new N,
                na, o, k;
            0 < d.I && (o = Math.tan(d.I / 2 * Math.PI / 180), k = 0 < d.z ? o * d.B / d.z : o, d.K && 1 != d.K && (k *= d.K));
            for (na = 0; 4 > na; na++) {
                switch (na) {
                    case 0:
                        l.q(-o, -k, -1);
                        break;
                    case 1:
                        l.q(o, -k, -1);
                        break;
                    case 2:
                        l.q(o, k, -1);
                        break;
                    case 3:
                        l.q(-o, k, -1)
                }
                l.k(-d.tilt * Math.PI / 180);
                l.l(d.pan * Math.PI / 180);
                l.l(-x * Math.PI / 180);
                l.k(u * Math.PI / 180);
                f.push(l.Ka())
            }
            f = Sb(f);
            if (0 < f.length) {
                for (na = 0; na < f.length; na++) {
                    l =
                        f[na];
                    if (0.1 > l.e) {
                        var n = -c / l.e;
                        px = z / 2 + l.x * n;
                        py = t / 2 + l.y * n
                    } else py = px = 0;
                    l.Z = px;
                    l.F = py
                }
                if (hd(f, a, e)) return d
            }
        }
    }

    function Ga(a) {
        return a == b.control || a && a.ggType && "container" == a.ggType ? m : r
    }

    function I() {
        ea && (ea = r, L = M = F = 0);
        hb && (hb = r, L = M = F = 0);
        jc = (new Date).getTime()
    }

    function Xc(a, e) {
        vc = a;
        wc = e;
        vb = vc - Ea;
        wb = wc - Fa;
        Oa && (Ea = vc, Fa = wc, b.update())
    }

    function Lc(a, e) {
        var c = b.getVFov();
        x += a * c / t;
        u += e * c / t;
        Ta()
    }

    function id(a) {
        xc = f.createBuffer();
        f.bindBuffer(f.ARRAY_BUFFER, xc);
        var e = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
        for (i = 0; 12 >
            i; i++) 2 > i % 3 && (e[i] *= a);
        f.bufferData(f.ARRAY_BUFFER, new Float32Array(e), f.STATIC_DRAW);
        Tb = f.createBuffer();
        f.bindBuffer(f.ARRAY_BUFFER, Tb);
        f.bufferData(f.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 0, 1, 1, 1]), f.STATIC_DRAW);
        Ub = f.createBuffer();
        f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, Ub);
        f.bufferData(f.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), f.STATIC_DRAW)
    }

    function jd() {
        var a, e;
        if (ca)
            for (; 0 < ca.length;) f.deleteTexture(ca.pop());
        ca = [];
        for (var c = 0; 6 > c; c++) e = f.createTexture(), e.ua = p, e.qa = p, e.Pa = r, f.bindTexture(f.TEXTURE_2D,
            e), f.texImage2D(f.TEXTURE_2D, 0, f.RGB, 1, 1, 0, f.RGB, f.UNSIGNED_BYTE, p), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), nb[c] && (a = new Image, a.crossOrigin = "anonymous", a.src = ma(nb[c]), e.ua = a, a.addEventListener && a.addEventListener("load", yc(e), r), b.checkLoaded.push(a)), ca.push(e);
        for (c = 0; 6 > c; c++) Vb[c] && (a = new Image, a.crossOrigin = "anonymous", a.src = ma(Vb[c]), a.addEventListener ?
            a.addEventListener("load", yc(ca[c]), r) : a.onload = yc(ca[c]), ca[c].qa = a, b.checkLoaded.push(a));
        for (c = 0; c < y.length; c++) y[c].fb = f.createTexture(), f.bindTexture(f.TEXTURE_2D, y[c].fb), f.texImage2D(f.TEXTURE_2D, 0, f.RGB, 1, 1, 0, f.RGB, f.UNSIGNED_BYTE, p), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE);
        f.bindTexture(f.TEXTURE_2D, p)
    }

    function kd(a) {
        var e = curCfNr,
            c = tx,
            b = ty,
            d = D.length -
            1 - a,
            f = ld,
            l = "x";
        switch (e) {
            case 0:
                l = "f";
                break;
            case 1:
                l = "r";
                break;
            case 2:
                l = "b";
                break;
            case 3:
                l = "l";
                break;
            case 4:
                l = "u";
                break;
            case 5:
                l = "d"
        }
        for (var k = 0; 3 > k; k++) f = Ia(f, "c", e), f = Ia(f, "s", l), f = Ia(f, "r", a), f = Ia(f, "l", d), f = Ia(f, "x", c), f = Ia(f, "y", b), f = Ia(f, "v", b), f = Ia(f, "h", c);
        return ma(f)
    }

    function Ia(a, e, c) {
        var b = RegExp("%0*" + e, "i").exec(a.toString());
        if (b) {
            var b = b.toString(),
                d = c.toString();
            for (b.charAt(b.length - 1) != e && (d = (1 + c).toString()); d.length < b.length - 1;) d = "0" + d;
            a = a.replace(b, d)
        }
        return a
    }

    function ma(a) {
        return a ?
            "{" == a.charAt(0) || "/" == a.charAt(0) || 0 < a.indexOf("://") || 0 == a.indexOf("javascript:") ? a : Cb + a : Cb
    }

    function yc(a) {
        return function() {
            try {
                if (a.cb) return;
                f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, m);
                var e = r;
                a.qa != p && a.qa.complete ? a.Pa || (f.bindTexture(f.TEXTURE_2D, a), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, a.qa), e = a.Pa = m) : a.ua != p && a.ua.complete && (f.bindTexture(f.TEXTURE_2D, a), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, a.ua), e = m);
                e && (f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER,
                    f.LINEAR), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), a.loaded = m);
                f.bindTexture(f.TEXTURE_2D, p)
            } catch (c) {}
            b.update()
        }
    }

    function $b() {
        var a = Math.round(b.R()),
            e;
        for (e = 0; e < y.length + da.length; e++) {
            var c;
            c = e < y.length ? y[e] : da[e - y.length];
            ia || md(a);
            var g = "";
            ia && (g += "perspective(" + a + "px) ");
            var g = g + ("translate3d(0px,0px," + a + "px) "),
                g = g + ("rotateX(" + u.toFixed(10) + "deg) "),
                g = g + ("rotateY(" + (-x).toFixed(10) + "deg) "),
                g = g + ("rotateY(" + c.pan.toFixed(10) + "deg) "),
                g = g + ("rotateX(" + (-c.tilt).toFixed(10) + "deg) "),
                d = 1E4,
                f = c.obj.videoWidth,
                l = c.obj.videoHeight;
            if (0 == f || 0 == l) f = 640, l = 480;
            0 < c.z && (f = c.z);
            0 < c.B && (l = c.B);
            0 < f && 0 < l && (c.obj.width = f + "px", c.obj.$a = l + "px", c.obj.style.width = f + "px", c.obj.style.$a = l + "px");
            0 < c.I && (d = f / (2 * Math.tan(c.I / 2 * Math.PI / 180)));
            g += "translate3d(0px,0px," + (-d).toFixed(10) + "px) ";
            g += "rotateZ(" + c.fa.toFixed(10) + "deg) ";
            g += "rotateY(" + (-c.l).toFixed(10) + "deg) ";
            g += "rotateX(" + c.k.toFixed(10) + "deg) ";
            c.K && 1 != c.K && (g += "scaleY(" + c.K + ") ");
            g += "translate3d(" + -f / 2 + "px," + -l / 2 + "px,0px) ";
            c.obj.style[R + "Origin"] = "0% 0%";
            c.v && (g = "", 1 == c.u && (d = Math.min(z / f, t / l), g += "scale(" + d + ") "), g += "translate3d(" + -f / 2 + "px," + -l / 2 + "px,0px) ");
            c.Ya != g && (c.Ya = g, c.obj.style[R] = g, c.obj.style.left = Y + z / 2 + "px", c.obj.style.top = aa + t / 2 + "px", c.obj.style.visibility = "visible", c.na && c.Xa == c.v && (c.obj.style[va] = "all 0s linear 0s"), c.Xa = c.v)
        }
    }

    function nd() {
        for (var a = 0, e = Math.tan(b.getVFov() * Math.PI /
                360), c = t / (2 * e), c = c * (1 + e * (z / t) / 2), c = c * Math.pow(2, od); D.length >= a + 2 && !D[a + 1].Sa && D[a + 1].width > c;) a++;
        return a
    }

    function pd() {
        for (var a = 0; a < D.length; a++) {
            level = D[a];
            for (var e in level.g) level.g.hasOwnProperty(e) && (level.g[e].ia = r)
        }
    }

    function qd() {
        var a;
        for (a = 0; 6 > a; a++) {
            var e;
            e = b.f.i[a];
            if (e.C) {
                var c;
                c = [];
                c.push(new N(-1, -1, -1, 0, 0));
                c.push(new N(1, -1, -1, 1, 0));
                c.push(new N(1, 1, -1, 1, 1));
                c.push(new N(-1, 1, -1, 0, 1));
                for (var g = 0; g < c.length; g++) 4 > a ? c[g].l(a * (-Math.PI / 2)) : c[g].k((4 == a ? -1 : 1) * (Math.PI / 2)), c[g].l(-x *
                    Math.PI / 180), c[g].k(u * Math.PI / 180);
                c = Sb(c);
                for (var d = {
                        la: 1,
                        ma: 1,
                        oa: 0,
                        pa: 0
                    }, g = 0; g < c.length; g++) d.la = Math.min(d.la, c[g].H), d.oa = Math.max(d.oa, c[g].H), d.ma = Math.min(d.ma, c[g].n), d.pa = Math.max(d.pa, c[g].n);
                d.Fa = d.oa - d.la;
                d.Ja = d.pa - d.ma;
                d.scale = Math.max(d.Fa, d.Ja);
                e.sa = d
            } else e.sa = p
        }
    }

    function rd(a) {
        var e = level,
            c = {};
        c.T = a.la * (e.width / J);
        c.U = a.ma * (e.height / J);
        c.X = a.oa * (e.width / J);
        c.Y = a.pa * (e.height / J);
        c.T = Math.min(Math.max(0, Math.floor(c.T)), e.G - 1);
        c.U = Math.min(Math.max(0, Math.floor(c.U)), e.$ - 1);
        c.X = Math.min(Math.max(0,
            Math.floor(c.X)), e.G - 1);
        c.Y = Math.min(Math.max(0, Math.floor(c.Y)), e.$ - 1);
        return c
    }

    function sd(a) {
        return function() {
            b.dirty = m;
            b.S = m;
            S && S--;
            0 == S && b.divSkin && b.divSkin.ggLoadedLevels && b.divSkin.ggLoadedLevels();
            a.a = p
        }
    }

    function Ld(a) {
        return function() {
            b.dirty = m;
            b.Ma = m;
            b.S = m;
            a.loaded = m;
            a.a && !a.b && s.appendChild(a.a);
            S && S--;
            0 == S && b.divSkin && b.divSkin.ggLoadedLevels && b.divSkin.ggLoadedLevels();
            a.a && a.d && (a.d.drawImage(a.a, 0, 0), a.a = p)
        }
    }

    function td() {
        return function() {
            b.dirty = m;
            b.S = m;
            S && S--;
            0 == S && b.divSkin &&
                b.divSkin.ggLoadedLevels && b.divSkin.ggLoadedLevels()
        }
    }

    function Md(a) {
        return function() {
            b.dirty = m;
            b.Ma = m;
            b.S = m;
            a.loaded = m;
            S && S--;
            0 == S && b.divSkin && b.divSkin.ggLoadedLevels && b.divSkin.ggLoadedLevels();
            try {
                f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, m), a.a != p && a.a.complete && (a.L = f.createTexture(), f.bindTexture(f.TEXTURE_2D, a.L), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, a.a), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.LINEAR), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR),
                    f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.bindTexture(f.TEXTURE_2D, p))
            } catch (e) {}
            b.update()
        }
    }

    function Ta() {
        var a, e;
        0 < zc && (a = ob, D && 0 < D.length && (a = D[0].height), ha = 360 * Math.atan2(t / 2, a / 2 * zc) / Math.PI);
        A < ha && (A = ha);
        A > qa && (A = qa);
        e = b.getVFov() / 2;
        a = 180 * Math.atan(z / t * Math.tan(e * Math.PI / 180)) / Math.PI;
        2 * e > Ja - Ka && (e = (Ja - Ka) / 2);
        b.setVFov(2 * e);
        90 > Ja ? u + e > Ja && (u = Ja - e) : u > Ja && (u = Ja); - 90 < Ka ? u - e < Ka && (u = Ka + e) : u < Ka && (u = Ka);
        if (359.99 >
            ib - jb) {
            var c = 0;
            if (0 != u) {
                var g, d = t / 2;
                g = d * Math.tan(e * Math.PI / 180);
                d /= Math.tan(Math.abs(u) * Math.PI / 180);
                d -= g;
                0 < d && (c = 180 * Math.atan(1 / (d / g)) / Math.PI, c = c * (ib - jb) / 360)
            }
            x + (a + c) > ib && (x = ib - (a + c), ea && (Qa = -Qa, F = 0));
            x - (a + c) < jb && (x = jb + (a + c), ea && (Qa = -Qa, F = 0));
            90 < u + e && (u = 90 - e); - 90 > u - e && (u = -90 + e)
        }
    }

    function oc(a, e) {
        var c = -1;
        if (0 <= P)
            for (var b = 0; b < H.length; b++) {
                var d = H[b];
                "poly" == d.type && d.ta && 0 < d.ta.length && hd(d.ta, a, e) && (c = b)
            }
        return 0 <= c ? H[c] : r
    }

    function hd(a, e, c) {
        var b, d, f = r;
        for (b = 0, d = a.length - 1; b < a.length; d = b++) {
            var l =
                a[b];
            d = a[d];
            l.F > c != d.F > c && e < (d.Z - l.Z) * (c - l.F) / (d.F - l.F) + l.Z && (f = !f)
        }
        return f
    }

    function Ha(a, e) {
        a = Number(a);
        return "rgba(" + (a >> 16 & 255) + "," + (a >> 8 & 255) + "," + (a & 255) + "," + e + ")"
    }

    function md(a) {
        !ia && b.bb != a && (b.bb = a, Q.style[xa] = a + "px", Q.style[xa + "Origin"] = Y + z / 2 + "px " + (aa + t / 2) + "px ", s.style[xa] = a + "px", s.style[xa + "Origin"] = Y + z / 2 + "px " + (aa + t / 2) + "px ")
    }

    function Sb(a) {
        a = Db(a, ud);
        a = Db(a, vd);
        a = Db(a, wd);
        a = Db(a, xd);
        return a = Db(a, yd)
    }

    function Db(a, e) {
        if (0 == a.length) return a;
        var c, b, d, f, l, k, o, n = [];
        c = e.va(a[0]) - 0;
        for (f =
            0; f < a.length; f++) {
            k = f;
            o = f + 1;
            o == a.length && (o = 0);
            b = e.va(a[o]) - 0;
            if (0 <= c && 0 <= b) n.push(a[k]);
            else if (0 <= c || 0 <= b) d = b / (b - c), 0 > d && (d = 0), 1 < d && (d = 1), l = new N, l.ab(a[k], a[o], d), 0 > c || n.push(a[k]), n.push(l);
            c = b
        }
        return n
    }

    function Bb() {
        var a = {
                x: 0,
                y: 0
            },
            e = s;
        if (e.offsetParent) {
            do a.x += e.offsetLeft, a.y += e.offsetTop; while (e = e.offsetParent)
        }
        return a
    }

    function ya() {
        dc = m
    }

    function zd(a) {
        if (debug = document.getElementById("debug")) debug.innerHTML = a + "<br />";
        window.console && window.console.log(a)
    }
    var Rb, P, ga, wa, Ac, Bc, Cc, Dc, Ec;

    function Id(a) {
        var e = "",
            c, b, d = "",
            f, l = "",
            k = 0,
            a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), c = c << 2 | b >> 4, b = (b & 15) << 4 | f >> 2, d = (f & 3) << 6 | l, e +=
            String.fromCharCode(c), 64 != f && (e += String.fromCharCode(b)), 64 != l && (e += String.fromCharCode(d)); while (k < a.length);
        return e
    }

    function Nd(a, e) {
        var c = this;
        c.eb = a;
        c.hotspot = e;
        c.__div = document.createElement("div");
        c.a = document.createElement("img");
        var b;
        c.a.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5xJREFUeNqclmlIVFEUx997TjrplFQW2WKBBSYtRFlpWUILSSsRZRQIBdGHCFqIoKIvQRsUFRJC9LEgaSFbMMpcWi1pLzOLsjItKms0U5t5/c/wH7nc5o2jF374xrv87z33nHOPaRsRtbFgDpgJxoD+wATfwDNQDK6CyrCr5OcbhgiGIRsUAZt4QTWoIFXgp9JfAhY7rgdBl8NeBoLDYBloA+dBOagFTcDHcVEgDgwBGWA+OAcugvXgvb5wKMGJoAAMp9BpUA96EBf/Btsf8BI8AWfAErAcpHHDZeriliY2AVwDg8AucAQ0Ag+I4XhTm2Oxz8PT46KMbTx5EZjuJDgAnAVusJUm9DhYwalFcc59sIXXIaceFkowDySBPTRPL20xm+b7zYXa+N3CPrWJ6GuwGySA40HLBHc/GywFhbS5R1lEBrZy7FQwiSaX9pmnqeAYt+KUcew7BVZw/QKTq0ocpYPVvDOXItZCk2xgDIZqL8BR8Ab0VDbr4yZOgLeIwzQx6WiQxcCt1+6sld66L4yYtFSwF4yg2dU7/cEwGW9YVkAwmycp1dzdpvgm0DcCh4kHmxWzBls0uBX4qqmZJ4KzePm1IeJLgjmlC16aDKZpp5Q168B3o6wsSwTHgU+MIUs74RSj6y1d+212HKimJlUE+tFRfJpYtOKNXWmJTASqWf2Bu/R6+4TKHOrOzG4IhptjWgHbGkZvepQ6SQK7oRuCXzjX1DJavBEX1ygfT8FgBqpfm1zRDcEKbR2bsZlkJCdXieB1ZhZ5YtqVgXIPN+m9kbY6hpdb+d9fPncJRmZmqQheZkemJmgxyxykl3XWJEkcAl7N21s7PDcl5ZJ0PAa3wVwmWtVbZafPwQ7wLozYB7ATPNJO56d/LAikP9u+66KNJS1d4IOZp7wU0hfLukUyzgwm70T2N/DOxIy/eFdqawa5DL2NEGwP5k15Ja4woz9glvcomd9NzyvkFcQo5gomaLfm5c0svnKZ2k7q7+FauvR2MJKZR3+sY5WgtvkdG6JyELGhNHMTXyGfLviRJ5Tcd4Dlhle7086Sgp8CqVxDkn4OqHaqacr5ekjy3Q/W0FRNNGmoMtamdzdxsytZC0lqXKhEgWPVVgImg2NgFT1MHOoOk3yLEtgWN5TEOYvoIFI1rGM19//2wpAD7imF7lfwENwAxaASNCj90pcLLKdC2Iyw1M9gnEplMEp5kOU1f8WwKGJm8oUr9f8JMAAVMDM6HSDa9QAAAABJRU5ErkJggg%3D%3D");
        c.a.setAttribute("style", "position: absolute;top: -14px;left: -14px; " + T + "user-select: none;");
        c.a.ondragstart = function() {
            return r
        };
        c.__div.appendChild(c.a);
        b = "position:absolute;" + (T + "user-select: none;");
        c.__div.setAttribute("style", b);
        c.__div.onclick = function() {
            c.eb.openUrl(e.url, e.target)
        };
        var d = Rb;
        d.enabled && (c.text = document.createElement("div"), b = "position:absolute;" + ("left: -" + e.w / 2 + "px;"), b = b + "top:  20px;" + ("width: " + e.w + "px;"), b = 0 == e.h ? b + "height: auto;" : b + ("height: " + e.h + "px;"), e.wordwrap ?
            b = b + "white-space: pre-wrap;" + ("width: " + e.w + "px;") : (b = 0 == e.h ? b + "width: auto;" : b + ("width: " + e.w + "px;"), b += "white-space: nowrap;"), b += T + "transform-origin: 50% 50%;", c.text.setAttribute("style", b + "visibility: hidden;border: 1px solid #000000;background-color: #ffffff;text-align: center;overflow: hidden;padding: 0px 1px 0px 1px;"), c.text.style.color = Ha(d.Da, d.Ca), c.text.style.backgroundColor = d.background ? Ha(d.O, d.N) : "transparent", c.text.style.border = "solid " + Ha(d.Q, d.P) + " " + d.xa + "px", c.text.style.borderRadius =
            d.wa + "px", c.text.style.textAlign = "center", c.text.style.width = 0 < d.width ? d.width + "px" : "auto", c.text.style.height = 0 < d.height ? d.height + "px" : "auto", c.text.style.overflow = "hidden", c.text.innerHTML = e.title, c.__div.onmouseover = function() {
                0 == e.h && (w = c.text.offsetWidth, c.text.style.left = -w / 2 + "px");
                c.text.style.visibility = "inherit"
            }, c.__div.onmouseout = function() {
                c.text.style.visibility = "hidden"
            }, c.__div.appendChild(c.text))
    }
    var b = this;
    b.transitionsDisabled = r;
    var x = 0,
        Fc = 0,
        jb = 0,
        ib = 360,
        F = 0,
        Ad = 0,
        u = 0,
        Gc = 0,
        Ka = -90,
        Ja = 90,
        M = 0,
        A = 90,
        Lb = 90,
        ha = 1,
        zc = 0,
        qa = 170,
        mb = 0,
        L = 0,
        Hc = 0,
        Zc, Yc, z = 320,
        t = 480,
        rc = 0,
        sc = 0,
        Ea = 0,
        Fa = 0,
        dd = 0,
        ed = 0,
        vc = 0,
        wc = 0,
        vb = 0,
        wb = 0,
        O = -1,
        Tc = 0,
        Uc = 0,
        zb = 0,
        Ab = 0,
        Vc = 0,
        Wc = 0,
        qc, ec = m,
        tb = 0,
        ub = 0,
        oa = 0,
        pa = 0,
        xb = r,
        U = 0,
        Pa = 0,
        s = p,
        za = p,
        ja = p,
        Q = b.c = p,
        Z = p;
    b.control = p;
    b.checkLoaded = [];
    b.isFullscreen = r;
    b.dirty = r;
    b.ja = 1;
    b.divSkin = p;
    b.isLoaded = r;
    b.hasConfig = r;
    b.startNode = "";
    b.onMoveComplete = p;
    var Ib = 0,
        Vb = [],
        nb = [],
        ob = 1,
        Eb = 1,
        Fb = 1024,
        Bd = 0,
        Cd = 0,
        gb = r,
        lc = 5,
        ea = r,
        Jb = r,
        Qa = 0.4,
        Kb = 0,
        kc = 0,
        Nc = m,
        kb, hb = r,
        Mc = 0.1,
        gc = 0,
        hc = 0,
        ic, jc;
    b.skinObj = p;
    b.userdata = {};
    b.userdata.title = "";
    b.userdata.description = "";
    b.userdata.author = "";
    b.userdata.datetime = "";
    b.userdata.copyright = "";
    b.userdata.source = "";
    b.userdata.information = "";
    b.userdata.comment = "";
    b.userdata.tags = [];
    var H = [];
    b.emptyHotspot = {
        pan: 0,
        tilt: 0,
        title: "",
        url: "",
        target: "",
        id: "",
        skinid: "",
        w: 100,
        h: 20,
        wordwrap: r,
        obj: p,
        type: "empty"
    };
    var C = [],
        y = [],
        da = [],
        pb = [],
        sa = [],
        X = 1,
        D = [],
        qb = "0x000000",
        od = 0.4,
        ra, J, ld, Ra = 0,
        lb = 0.01,
        Pc = 2,
        mc = 0,
        Mb = r,
        Oc = r,
        Y = 0,
        aa = 0,
        ac = 0,
        bc = 0,
        Ob = r,
        ba = r,
        uc = r,
        Oa = m,
        ad = r,
        bd = 1,
        pc = m,
        fb = 8;
    P = 1;
    ga = 0;
    wa =
        0;
    Ac = 255;
    Bc = 1;
    Cc = 255;
    Dc = 0.3;
    Rb = {
        enabled: m,
        width: 180,
        height: 20,
        Da: 0,
        Ca: 1,
        background: m,
        O: 16777215,
        N: 1,
        Q: 0,
        P: 1,
        wa: 3,
        xa: 1,
        wordwrap: m
    };
    Ec = void 0;
    b.hotspot = b.emptyHotspot;
    var K = p;
    b.S = m;
    b.mouse = {
        x: 0,
        y: 0
    };
    var ta = r,
        Aa = r,
        yb = r,
        Wb = m,
        Dd = r,
        Ic = m,
        nc = r,
        S = 0,
        Xb = 10,
        Ed = 200,
        Cb = "",
        T = "",
        va = "transition",
        R = "transform",
        xa = "perspective",
        f, ud = new N,
        vd = new N,
        wd = new N,
        xd = new N,
        yd = new N;
    b.Aa = r;
    var Hb = "";
    unusedTileCanvas = [];
    var Od = navigator.userAgent.match(/(MSIE)/g) ? m : r,
        Fd = navigator.userAgent.match(/(Safari)/g) ? m : r;
    navigator.userAgent.match(/(Chrome)/g) &&
        (Fd = r);
    var Gd = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? m : r,
        Pd = navigator.userAgent.match(/(android)/i) ? m : r,
        Qc = r,
        Rc = function() {
            var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
            return Gd || !a ? function(a) {
                window.setTimeout(a, 10)
            } : a
        }();
    b.detectBrowser = function() {
        var a = ["Webkit", "Moz", "O", "ms", "Ms"],
            e;
        T = "";
        va = "transition";
        R = "transform";
        xa = "perspective";
        for (e = 0; e < a.length; e++) "undefined" !==
            typeof document.documentElement.style[a[e] + "Transform"] && (T = "-" + a[e].toLowerCase() + "-", va = a[e] + "Transition", R = a[e] + "Transform", xa = a[e] + "Perspective");
        Dd = Jc();
        ta = Kc();
        Aa = Jc();
        ta && (Aa = r);
        ia = m;
        rb = r;
        (Gd || Pd) && b.setMaxTileCount(80);
        zd("Pano2VR player - Prefix:" + T + ", " + (Dd ? "CSS 3D available" : "CSS 3D not available") + ", " + (ta ? "WebGL available" : "WebGL not available"))
    };
    b.setMaxTileCount = function(a) {
        Ed = a
    };
    b.f = new function() {
        var a = this;
        a.i = [];
        a.ka = [];
        for (i = 0; 6 > i; i++) a.i[i] = {
            C: m
        };
        a.ya = function(b, c) {
            for (var g =
                    0; 6 > g; g++) {
                var d;
                if (d = a.i[g]) {
                    var f;
                    f = [];
                    f.push(new N(-1, -1, -1, 0, 0));
                    f.push(new N(1, -1, -1, 1, 0));
                    f.push(new N(1, 1, -1, 1, 1));
                    f.push(new N(-1, 1, -1, 0, 1));
                    for (var l = 0; l < f.length; l++) 4 > g ? f[l].l(g * (-Math.PI / 2)) : f[l].k((4 == g ? -1 : 1) * (Math.PI / 2)), f[l].l(-b * Math.PI / 180), f[l].k(c * Math.PI / 180);
                    f = Sb(f);
                    d.C = 0 < f.length
                }
            }
        }
    };
    b.setElementIdPrefix = function(a) {
        b.W = a
    };
    b.getPercentLoaded = function() {
        return Ib
    };
    b.setBasePath = function(a) {
        Cb = a
    };
    b.R = function() {
        return 1 * t / (2 * Math.tan(Math.PI / 180 * (b.getVFov() / 2)))
    };
    b.setViewerSize =
        function(a, e) {
            b.isFullscreen && (a = window.innerWidth, e = window.innerHeight);
            var c = a - Y - ac,
                g = e - aa - bc;
            if (!(10 > c || 10 > g)) {
                s.style.width = c + "px";
                s.style.height = g + "px";
                s.style.left = Y + "px";
                s.style.top = aa + "px";
                if (ta) try {
                    za && (za.width = c, za.height = g), f && (f.Ia = c, f.Ha = g, f.viewport(0, 0, c, g))
                } catch (d) {
                    alert(d)
                }
                ja && (ja.style.width = a + "px", ja.style.height = e + "px", ja.width = a, ja.height = e);
                Q && (Q.style.width = a + "px", Q.style.height = e + "px", Z.style.width = a + "px", Z.style.height = e + "px", Z.width = a, Z.height = e, Z.style.left = Y + "px", Z.style.top =
                    aa + "px", b.divSkin && b.divSkin != Q && (b.divSkin.style.width = a + "px", b.divSkin.style.height = e + "px"));
                b.hasConfig && b.updatePanorama();
                b.divSkin && b.divSkin.ggUpdateSize && b.divSkin.ggUpdateSize(a, e)
            }
        };
    var dc = r;
    b.setMargins = function(a, b, c, g) {
        Y = a;
        aa = b;
        ac = c;
        bc = g;
        ya()
    };
    b.changeViewMode = function(a) {
        0 == a && (Oa = r);
        1 == a && (Oa = m);
        2 == a && (Oa = Oa ? r : m)
    };
    b.changePolygonMode = function(a, e) {
        P = 1 == e && 0 < P ? 0 : Math.round(a);
        b.update()
    };
    b.polygonMode = function() {
        return P
    };
    var V;
    b.getVFov = function() {
        var a;
        switch (Hc) {
            case 0:
                a = A / 2;
                break;
            case 1:
                a = 180 * Math.atan(t / z * Math.tan(A / 2 * Math.PI / 180)) / Math.PI;
                break;
            case 2:
                a = 180 * Math.atan(t / Math.sqrt(z * z + t * t) * Math.tan(A / 2 * Math.PI / 180)) / Math.PI;
                break;
            case 3:
                a = 4 * t / 3 > z ? A / 2 : 180 * Math.atan(4 * t / (3 * z) * Math.tan(A / 2 * Math.PI / 180)) / Math.PI
        }
        return 2 * a
    };
    b.setVFov = function(a) {
        var a = a / 2,
            b;
        switch (Hc) {
            case 0:
                A = 2 * a;
                break;
            case 1:
                a = 180 * Math.atan(z / t * Math.tan(a * Math.PI / 180)) / Math.PI;
                A = 2 * a;
                break;
            case 2:
                b = Math.sqrt(z * z + t * t);
                a = 180 * Math.atan(b / t * Math.tan(a * Math.PI / 180)) / Math.PI;
                A = 2 * a;
                break;
            case 3:
                4 * t / 3 > z || (a = 180 * Math.atan(3 *
                    z / (4 * t) * Math.tan(a * Math.PI / 180)) / Math.PI), A = 2 * a
        }
    };
    b.update = function(a) {
        b.dirty = m;
        a && (b.ja = a)
    };
    b.updatePanorama = function() {
        var a = b.R(),
            e = Math.atan2(z / 2 + 1, a),
            c = Math.atan2(t / 2 + 1, a),
            a = Math.sin(e),
            g = Math.sin(c),
            e = Math.cos(e),
            c = Math.cos(c);
        ud.q(0, 0, -1);
        vd.q(e, 0, -a);
        wd.q(-e, 0, -a);
        xd.q(0, c, -g);
        yd.q(0, -c, -g);
        a = new N(0, 0, -100);
        g = b.R();
        for (e = 0; e < H.length; e++) {
            var c = H[e],
                d, k;
            if ("point" == c.type) {
                a.q(0, 0, -100);
                a.k(-c.tilt * Math.PI / 180);
                a.l(c.pan * Math.PI / 180);
                a.l(-x * Math.PI / 180);
                a.k(u * Math.PI / 180);
                var l = r;
                0.01 > a.e ?
                    (k = -g / a.e, d = a.x * k, k *= a.y, Math.abs(d) < z / 2 + 500 && Math.abs(k) < t / 2 + 500 && (l = m)) : k = d = 0;
                c.obj && c.obj.__div && (c.obj.__div.style[va] = "none", c.obj.ggUse3d ? (ia || md(g), c.obj.__div.style.width = "1px", c.obj.__div.style.height = "1px", hs = "", ia && (hs += "perspective(" + g + "px) "), hs += "translate3d(0px,0px," + g + "px) ", hs += "rotateX(" + u.toFixed(10) + "deg) ", hs += "rotateY(" + (-x).toFixed(10) + "deg) ", hs += "rotateY(" + c.pan.toFixed(10) + "deg) ", hs += "rotateX(" + (-c.tilt).toFixed(10) + "deg) ", hs += "translate3d(0px,0px," + (-1 * c.obj.gg3dDistance).toFixed(10) +
                    "px) ", c.obj.__div.style[R + "Origin"] = "0% 0%", c.obj.__div.style[R] = hs, c.obj.__div.style.left = Y + z / 2 + "px", c.obj.__div.style.top = aa + t / 2 + "px") : l ? (c.obj.__div.style.left = Y + d + z / 2 + "px", c.obj.__div.style.top = aa + k + t / 2 + "px") : (c.obj.__div.style.left = "-1000px", c.obj.__div.style.top = "-1000px"))
            }
            if ("poly" == c.type) {
                for (var n = [], l = 0; l < c.ha.length; l++) d = c.ha[l], a.q(0, 0, -100), a.k(-d.tilt * Math.PI / 180), a.l(d.pan * Math.PI / 180), a.l(-x * Math.PI / 180), a.k(u * Math.PI / 180), n.push(a.Ka());
                n = Sb(n);
                if (0 < n.length)
                    for (l = 0; l < n.length; l++) a =
                        n[l], 0.1 > a.e ? (k = -g / a.e, d = z / 2 + a.x * k, k = t / 2 + a.y * k) : k = d = 0, a.Z = d, a.F = k;
                c.ta = n
            }
        }
        if (Z && (Ec != P && (Ec = P, Z.style.visibility = 0 < P ? "inherit" : "hidden"), 0 < P)) {
            V || (V = Z.getContext("2d"));
            if (V.width != z || V.height != t) V.width = z, V.height = t;
            V.clear ? V.clear() : V.clearRect(0, 0, Z.width, Z.height);
            a = 1;
            3 == P && (a = ga);
            for (g = 0; g < H.length; g++)
                if (e = H[g], "poly" == e.type && (c = e.ta, 2 == P && (a = e.p), V.fillStyle = Ha(e.O, e.N * a), V.strokeStyle = Ha(e.Q, e.P * a), 0 < c.length)) {
                    V.beginPath();
                    for (j = 0; j < c.length; j++) v = c[j], 0 == j ? V.moveTo(v.Z, v.F) : V.lineTo(v.Z,
                        v.F);
                    V.closePath();
                    V.stroke();
                    V.fill()
                }
        }
        if (ta)
            if (0 < D.length) {
                Ta();
                if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth), t = parseInt(s.offsetHeight);
                Ic && (b.initWebGL(0), ya());
                if (f) {
                    f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT);
                    Ba(La);
                    Zb(b.getVFov(), f.Ia / f.Ha, La);
                    f.uniformMatrix4fv(E.ra, r, La);
                    b.f.ya(x, u);
                    Xb = 1;
                    qd();
                    pd();
                    var o = nd(),
                        h;
                    for (h = D.length - 1; h >= o;) {
                        level = D[h];
                        a = 1;
                        h == D.length - 1 && 0 == ra && (a = J / (J - 0.5));
                        for (curCfNr = 0; 6 > curCfNr; curCfNr++)
                            if (g = b.f.i[curCfNr], e = g.sa, Ba(ka), Gb(ka, -u * Math.PI /
                                    180, [1, 0, 0]), Gb(ka, (180 - x) * Math.PI / 180, [0, 1, 0]), 4 > curCfNr ? Gb(ka, -Math.PI / 2 * curCfNr, [0, 1, 0]) : Gb(ka, Math.PI / 2 * (5 == curCfNr ? 1 : -1), [1, 0, 0]), g.C && e && 0 < e.Fa && 0 < e.Ja && 0 < e.scale || level.t) {
                                g.dirty = r;
                                level.t ? (c = {
                                    T: 0,
                                    U: 0
                                }, c.X = level.G - 1, c.Y = level.$ - 1) : c = rd(e);
                                for (ty = c.U; ty <= c.Y; ty++)
                                    for (tx = c.T; tx <= c.X; tx++) {
                                        d = tx + ty * level.G + curCfNr * level.G * level.$;
                                        (e = level.g[d]) || (e = level.g[d] = {});
                                        S < Xb && !e.a && (Cd++, e.a = new Image, e.a.onload = Md(e), e.a.onerror = td(), e.a.onabort = td(), e.a.setAttribute("src", kd(h)), level.t && b.checkLoaded.push(e.a),
                                            0 == S && b.divSkin && b.divSkin.ggReLoadedLevels && b.divSkin.ggReLoadedLevels(), S++, b.dirty = m);
                                        if (e.L) {
                                            if (e.za) f.bindBuffer(f.ARRAY_BUFFER, e.za);
                                            else {
                                                d = 2 * h + 1;
                                                e.za = f.createBuffer();
                                                f.bindBuffer(f.ARRAY_BUFFER, e.za);
                                                l = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
                                                l[0] = -2 * a * Math.min((tx + 1) * J, level.width) - ra;
                                                l[1] = -2 * a * Math.min((ty + 1) * J, level.height) - ra;
                                                l[3] = -2 * a * tx * J + ra;
                                                l[4] = l[1];
                                                l[6] = l[3];
                                                l[7] = -2 * a * ty * J + ra;
                                                l[9] = l[0];
                                                l[10] = l[7];
                                                for (i = 0; 12 > i; i++) l[i] = 0 == i % 3 ? d * (l[i] / level.width + 1) : 1 == i % 3 ? d * (l[i] / level.height + 1) : d;
                                                f.bufferData(f.ARRAY_BUFFER,
                                                    new Float32Array(l), f.STATIC_DRAW)
                                            }
                                            f.vertexAttribPointer(E.Ga, 3, f.FLOAT, r, 0, 0);
                                            f.bindBuffer(f.ARRAY_BUFFER, Tb);
                                            f.vertexAttribPointer(E.Ea, 2, f.FLOAT, r, 0, 0);
                                            f.activeTexture(f.TEXTURE0);
                                            f.bindTexture(f.TEXTURE_2D, e.L);
                                            f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.LINEAR);
                                            f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR);
                                            f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE);
                                            f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE);
                                            f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, Ub);
                                            f.uniform1i(E.Ta, 0);
                                            f.uniformMatrix4fv(E.Ra, r, ka);
                                            f.uniformMatrix4fv(E.ra, r, La);
                                            f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0)
                                        }
                                        e.ia = g.C
                                    }
                            }
                        h--
                    }
                    for (o = 0; o < D.length; o++) {
                        level = D[o];
                        for (var q in level.g) level.g.hasOwnProperty(q) && (e = level.g[q], !e.ia && !level.t && (e.L && f.deleteTexture(e.L), e.a = p, delete level.g[q]))
                    }
                    b.S = r
                }
            } else {
                Ta();
                if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth), t = parseInt(s.offsetHeight);
                Ic && (b.initWebGL(0), ya());
                if (f) {
                    f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT);
                    Ba(La);
                    Zb(b.getVFov(), f.Ia / f.Ha, La);
                    f.uniformMatrix4fv(E.ra, r, La);
                    for (v = 0; 6 > v; v++) Ba(ka), Gb(ka, -u * Math.PI / 180, [1, 0, 0]), Gb(ka, (180 - x) * Math.PI / 180, [0, 1, 0]), 4 > v ? Gb(ka, -Math.PI / 2 * v, [0, 1, 0]) : Gb(ka, Math.PI / 2 * (5 == v ? 1 : -1), [1, 0, 0]), f.bindBuffer(f.ARRAY_BUFFER, xc), f.vertexAttribPointer(E.Ga, 3, f.FLOAT, r, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, Tb), f.vertexAttribPointer(E.Ea, 2, f.FLOAT, r, 0, 0), 6 <= ca.length && ca[v].loaded && (f.activeTexture(f.TEXTURE0), f.bindTexture(f.TEXTURE_2D, ca[v]), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, Ub), f.uniform1i(E.Ta,
                        0), f.uniformMatrix4fv(E.Ra, r, ka), f.uniformMatrix4fv(E.ra, r, La), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0))
                }
            } else if (Aa)
            if (0 < D.length) {
                Ta();
                q = q = a = r;
                Hd++;
                if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth), t = parseInt(s.offsetHeight), s.style[R + "OriginX"] = z / 2 + "px", s.style[R + "OriginY"] = t / 2 + "px", a = m;
                h = Math.round(b.R());
                if (b.ea != h || a) b.ea = h, ia || (s.style[xa] = h + "px", s.style[xa + "Origin"] = "50% 50%");
                b.f.ya(x, u);
                Xb = 1;
                if (0 < D.length) {
                    qd();
                    pd();
                    g = 0;
                    l = "";
                    for (curCfNr = 0; 6 > curCfNr; curCfNr++) a = b.f.i[curCfNr],
                        a.C && (g = Math.max(g, a.sa.scale), l = l + curCfNr + ",");
                    g = nd();
                    for (e = D.length - 1; e >= g;) {
                        level = D[e];
                        c = 1;
                        e == D.length - 1 && 0 == ra && (c = J / (J - 2));
                        for (curCfNr = 0; 6 > curCfNr; curCfNr++)
                            if (a = b.f.i[curCfNr], d = a.sa, a.C && d && 0 < d.Fa && 0 < d.Ja && 0 < d.scale || level.t) {
                                a.dirty = r;
                                level.t ? (n = {
                                    T: 0,
                                    U: 0
                                }, n.X = level.G - 1, n.Y = level.$ - 1) : n = rd(d);
                                for (ty = n.U; ty <= n.Y; ty++)
                                    for (tx = n.T; tx <= n.X; tx++) {
                                        l = tx + ty * level.G + curCfNr * level.G * level.$;
                                        (d = level.g[l]) || (d = level.g[l] = {});
                                        if (!d.b && S < Xb) {
                                            if (0 < unusedTileCanvas.length) {
                                                d.b = unusedTileCanvas.shift();
                                                for (l =
                                                    s.firstChild; l && l.J && (-1 == l.J || l.J >= e);) l = l.nextSibling;
                                                s.insertBefore(d.b, l);
                                                d.d = d.b.Wa
                                            } else if (Bd < Ed) {
                                                Bd++;
                                                d.b = document.createElement("canvas");
                                                d.b.width = J + 2 * ra;
                                                d.b.height = J + 2 * ra;
                                                d.d = d.b.getContext("2d");
                                                d.b.Wa = d.d;
                                                d.b.style[R + "Origin"] = "0% 0%";
                                                d.b.style.overflow = "hidden";
                                                d.b.style.position = "absolute";
                                                for (l = s.firstChild; l && l.J && (-1 == l.J || l.J >= e);) l = l.nextSibling;
                                                s.insertBefore(d.b, l)
                                            }
                                            d.b && (Cd++, d.a = new Image, d.a.style[R + "Origin"] = "0% 0%", d.a.style.position = "absolute", d.a.style.overflow = "hidden",
                                                d.b.J = e, q && (d.b.id = "tile" + curCfNr + "_" + e + "___" + ty + "_" + tx), d.a.onload = Ld(d), d.a.onerror = sd(d), d.a.onabort = sd(d), d.a.setAttribute("src", kd(e)), level.t && b.checkLoaded.push(d.a), 0 == S && b.divSkin && b.divSkin.ggReLoadedLevels && b.divSkin.ggReLoadedLevels(), S++, b.dirty = m)
                                        }
                                        d.b && (l = "", ia ? (l += "translate3d(" + z / 2 + "px," + t / 2 + "px,0px) ", l += " perspective(" + h + "px) ", l += "translate3d(0px,0px," + h + "px) ") : l += "translate3d(" + z / 2 + "px," + t / 2 + "px," + h + "px) ", l += "rotateX(" + Number(u).toFixed(10) + "deg)  rotateY(" + Number(-x).toFixed(10) +
                                            "deg) ", l = 4 > curCfNr ? l + ("rotateY(" + -90 * curCfNr + "deg)") : l + ("rotateX(" + (4 == curCfNr ? -90 : 90) + "deg)"), k = 1, rb ? (k = (2 * e + 1) * J / level.width * (Fb / J), k = Fd ? 2 / Math.tan(A * Math.PI / 360) * k : 2 * k, l += " scale(" + k * c * c + ")") : k = 1 / (c * c), l += " translate3d(" + (1 / c * tx * J - ra - level.width / 2) + "px," + (1 / c * ty * J - ra - level.width / 2) + "px," + -level.width * k / 2 + "px)", q && (d.b.id = "rtile_" + Hd + "_" + curCfNr + "_" + e + "___" + ty + "_" + tx), a.C && (d.ia = m, d.b ? d.b.style[R] = l : d.a && (d.a.style[R] = l)))
                                    }
                            }
                        e--
                    }
                    for (h = 0; h < D.length; h++)
                        for (o in level = D[h], level.g) level.g.hasOwnProperty(o) &&
                            (d = level.g[o], !d.ia && d.b && (level.t ? (l = "translate3d(-10px,-10px,0px) scale(0.001,0.001)", d.b ? (d.b.style[R] = l, q && (d.b.id = "cache")) : d.a && (d.a.style[R] = "")) : (d.d && (d.d.clear ? d.d.clear() : d.d.clearRect(0, 0, d.d.canvas.width, d.d.canvas.height)), unusedTileCanvas.push(d.b), d.b ? (q && (d.b.id = "unused"), l = "translate3d(-10px,-10px,0px) scale(0.001,0.001)", d.b.style[R] = l, d.b.J = -1) : d.loaded && s.removeChild(d.a), d.b = p, d.a = p, d.d = p, delete level.g[o])));
                    b.S = r
                }
            } else {
                Ta();
                q = r;
                if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth),
                    t = parseInt(s.offsetHeight), s.style[R + "OriginX"] = z / 2 + "px", s.style[R + "OriginY"] = t / 2 + "px", q = m;
                o = Math.round(b.R());
                if ((b.ea != o || q) && !ia) b.ea = o, s.style[xa] = o + "px";
                b.f.ya(x, u);
                for (q = 0; 6 > q; q++)
                    if (h = b.f.i[q]) a = "", ia ? (a += "translate3d(" + z / 2 + "px," + t / 2 + "px,0px) ", a += "perspective(" + o + "px) ", a += "translate3d(0px,0px," + o + "px) ") : a += "translate3d(" + z / 2 + "px," + t / 2 + "px," + o + "px) ", a += "rotateX(" + Number(u).toFixed(10) + "deg)  rotateY(" + Number(-x).toFixed(10) + "deg) ", h.Oa && (a += h.Oa, h.C || (a = "translate3d(-10px,-10px,0px) scale(0.001,0.001)"),
                        h.style[R] = a)
            } else if (yb) {
            Ta();
            ja && (h = ja.getContext("2d"));
            if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth), t = parseInt(s.offsetHeight);
            h && (o = h.canvas.width / 2, q = h.canvas.height / 2, a = h.createRadialGradient(o, q, 5, o, q, Math.max(o, q)), a.addColorStop(0, "#333"), a.addColorStop(1, "#fff"), h.rect(0, 0, h.canvas.width, h.canvas.height), h.fillStyle = a, h.fill(), h.fillStyle = "#f00", h.font = "20px Helvetica", h.textAlign = "center", h.fillText("Pan: " + x.toFixed(1), o, q - 30), h.fillText("Tilt: " + u.toFixed(1), o, q),
                h.fillText("Fov: " + A.toFixed(1), o, q + 30))
        }
        $b()
    };
    var ia = r,
        rb = r;
    b.setRenderFlags = function(a) {
        a = Math.round(a);
        ia = a & 1;
        rb = a & 2;
        Wb = a & 4;
        4096 <= a && (Aa = a & 4096, ta = a & 8192, yb = a & 32768)
    };
    b.getRenderFlags = function() {
        var a = 0;
        ia && (a |= 1);
        rb && (a |= 2);
        Wb && (a |= 4);
        Aa && (a |= 4096);
        ta && (a |= 8192);
        yb && (a |= 32768);
        return a
    };
    var Hd = 1,
        E;
    b.initWebGL = function(a) {
        Ic = r;
        try {
            if (za = a ? a : document.createElement("canvas"), za.width = 100, za.height = 100, s.appendChild(za), (f = za.getContext("webgl")) || (f = za.getContext("experimental-webgl")), f) {
                f.Ia = 500;
                f.Ha = 500;
                f.clearColor(0, 0, 0, 0);
                if (qb && 6 < qb.length) {
                    var b = parseInt(qb);
                    f.clearColor((b >> 16 & 255) / 255, (b >> 8 & 255) / 255, (b >> 0 & 255) / 255, 1)
                }
                f.enable(f.DEPTH_TEST);
                f.viewport(0, 0, 500, 500);
                f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT);
                var c = f.createShader(f.FRAGMENT_SHADER);
                f.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main(void) {\n\tgl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n}\n");
                f.compileShader(c);
                f.getShaderParameter(c, f.COMPILE_STATUS) || (alert(f.getShaderInfoLog(c)), c = p);
                var g = f.createShader(f.VERTEX_SHADER);
                f.shaderSource(g, "attribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying vec2 vTextureCoord;\nvoid main(void) {\n\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\tvTextureCoord = aTextureCoord;\n}\n");
                f.compileShader(g);
                f.getShaderParameter(g, f.COMPILE_STATUS) || (alert(f.getShaderInfoLog(g)),
                    g = p);
                E = f.createProgram();
                f.attachShader(E, g);
                f.attachShader(E, c);
                f.linkProgram(E);
                f.getProgramParameter(E, f.LINK_STATUS) || alert("Could not initialise shaders");
                f.useProgram(E);
                E.Ga = f.getAttribLocation(E, "aVertexPosition");
                f.enableVertexAttribArray(E.Ga);
                E.Ea = f.getAttribLocation(E, "aTextureCoord");
                f.enableVertexAttribArray(E.Ea);
                E.ra = f.getUniformLocation(E, "uPMatrix");
                E.Ra = f.getUniformLocation(E, "uMVMatrix");
                E.Ta = f.getUniformLocation(E, "uSampler");
                id(Eb);
                jd()
            }
        } catch (d) {}
        f ? ta = m : alert("Could not initialise WebGL!")
    };
    var ca = [],
        ka = new glMatrixArrayType(16),
        La = new glMatrixArrayType(16),
        xc, Tb, Ub;
    b.getPan = function() {
        return x
    };
    b.getPanDest = function() {
        return gc
    };
    b.getPanN = function() {
        for (var a = x; - 180 > a;) a += 360;
        for (; 180 < a;) a -= 360;
        return a
    };
    b.getPanNorth = function() {
        for (var a = x - Ad; - 180 > a;) a += 360;
        for (; 180 < a;) a -= 360;
        return a
    };
    b.setPan = function(a) {
        I();
        isNaN(a) || (x = Number(a));
        b.update()
    };
    b.changePan = function(a, e) {
        b.setPan(b.getPan() + a);
        e && (F = a)
    };
    b.changePanLog = function(a, e) {
        b.changePan(a * fa(), e)
    };
    b.getTilt = function() {
        return u
    };
    b.getTiltDest = function() {
        return hc
    };
    b.setTilt = function(a) {
        I();
        isNaN(a) || (u = Number(a));
        b.update()
    };
    b.changeTilt = function(a, e) {
        b.setTilt(b.getTilt() + a);
        e && (M = a)
    };
    b.changeTiltLog = function(a, e) {
        b.changeTilt(a * fa(), e)
    };
    b.getFov = function() {
        return A
    };
    b.getFovDest = function() {
        return ic
    };
    b.setFov = function(a) {
        I();
        if (!isNaN(a) && 0 < a && 180 > a) {
            var e = A;
            A = Number(a);
            Ta();
            e != A && b.update()
        }
    };
    b.changeFov = function(a, e) {
        b.setFov(b.getFov() + a);
        e && (L = a)
    };
    b.changeFovLog = function(a, e) {
        if (!isNaN(a)) {
            var c;
            c = a / 90 * Math.cos(A * Math.PI /
                360);
            c = A * Math.exp(c);
            b.setFov(c);
            e && (L = a)
        }
    };
    b.setPanTilt = function(a, e) {
        I();
        isNaN(a) || (x = a);
        isNaN(e) || (u = e);
        b.update()
    };
    b.setPanTiltFov = function(a, e, c) {
        I();
        isNaN(a) || (x = a);
        isNaN(e) || (u = e);
        !isNaN(c) && 0 < c && 180 > c && (A = c);
        b.update()
    };
    b.setDefaultView = function() {
        b.setPanTiltFov(Fc, Gc, Lb)
    };
    b.setLocked = function(a) {
        b.setLockedMouse(a);
        b.setLockedWheel(a);
        b.setLockedKeyboard(a)
    };
    b.setLockedMouse = function(a) {
        ba = a
    };
    b.setLockedKeyboard = function(a) {
        Ob = a
    };
    b.setLockedWheel = function(a) {
        uc = a
    };
    b.moveTo = function(a, b,
        c, g) {
        I();
        hb = m;
        var d = a.toString().split("/");
        1 < d.length && (a = Number(d[0]), g = b, b = Number(d[1]), 2 < d.length && (c = Number(d[2])));
        gc = isNaN(a) ? x : a;
        hc = isNaN(b) ? u : b;
        ic = !isNaN(c) && 0 < c && 180 > c ? c : A;
        Mc = !isNaN(g) && 0 < g ? g : 1
    };
    b.moveToDefaultView = function(a) {
        b.moveTo(Fc, Gc, Lb, a)
    };
    var Qb = -1;
    b.isTouching = function() {
        return b.m != p || 0 <= O
    };
    var Sa, Pb = 1;
    I();
    var cc = 0,
        fc = 0,
        $;
    b.Va = function() {
        var a;
        a = Q;
        b.control = a;
        Va();
        setTimeout(function() {
            Ca()
        }, 10);
        setTimeout(function() {
            Wa()
        }, 200);
        setTimeout(function() {
                ya();
                b.updatePanorama()
            },
            10);
        a.addEventListener ? (a.addEventListener("touchstart", Kd, r), a.addEventListener("touchmove", Jd, r), a.addEventListener("touchend", eb, r), a.addEventListener("touchcancel", db, r), a.addEventListener("MSPointerDown", cb, r), a.addEventListener("MSGestureStart", Na, r), a.addEventListener("MSGestureEnd", Ma, r), a.addEventListener("MSGestureChange", ab, r), a.addEventListener("gesturestart", Na, r), a.addEventListener("gesturechange", bb, r), a.addEventListener("gestureend", Ma, r), a.addEventListener("mousedown", gd, r), a.addEventListener("mousemove",
            fd, r), document.addEventListener("mouseup", cd, r), a.addEventListener("mousedblclick", b.toggleFullscreen, r), a.addEventListener("mousewheel", tc, r), a.addEventListener("DOMMouseScroll", tc, r), document.addEventListener("keydown", $a, r), document.addEventListener("keyup", Za, r), window.addEventListener("orientationchange", Va, r), window.addEventListener("resize", ya, r), window.addEventListener("blur", Ya, r), b.c.addEventListener("webkitfullscreenchange", Da, r), document.addEventListener("mozfullscreenchange", Da, r), window.addEventListener("webkitfullscreenchange",
            Da, r), document.addEventListener("MSFullscreenChange", Da, r)) : a.attachEvent && (a.attachEvent("onmousedown", gd), a.attachEvent("onmousemove", fd), document.attachEvent("onmouseup", cd), a.attachEvent("onmousedblclick", b.toggleFullscreen), a.attachEvent("onmousewheel", tc), document.attachEvent("onkeydown", $a), document.attachEvent("onkeyup", Za), window.attachEvent("onresize", ya), window.attachEvent("onblur", Ya));
        a.oncontextmenu = function(a) {
            void 0 === a && (a = window.event);
            return !a.ctrlKey && (a = "<<U>>", "U" != a.charAt(2)) ?
                (la(), r) : m
        }
    };
    b.addHotspotElements = function() {
        for (var a = 0; a < H.length; a++)
            if ("point" == H[a].type && (H[a].obj = b.skinObj && b.skinObj.addSkinHotspot ? new b.skinObj.addSkinHotspot(H[a]) : new Nd(this, H[a]), H[a].obj.__div.style.left = "-1000px", H[a].obj.__div.style.top = "-1000px", H[a].obj && H[a].obj.__div)) {
                var e = Q.firstChild;
                e ? Q.insertBefore(H[a].obj.__div, e) : Q.appendChild(H[a].obj.__div)
            }
    };
    b.isPlaying = function(a) {
        return "_main" == a ? m : (a = B(a)) ? !a.obj.ended && !a.obj.paused : r
    };
    b.playSound = function(a, b) {
        var c = B(a);
        c &&
            (c.obj.r = b && !isNaN(Number(b)) ? Number(b) - 1 : c.loop - 1, -1 == c.obj.r && (c.obj.r = 1E7), c.obj.play())
    };
    b.playPauseSound = function(a, e) {
        b.isPlaying(a) ? b.pauseSound(a) : b.playSound(a, e)
    };
    b.pauseSound = function(a) {
        if ("_main" == a) {
            for (a = 0; a < C.length; a++) C[a].obj.pause();
            for (a = 0; a < y.length; a++) y[a].obj.pause()
        } else(a = B(a)) && a.obj.pause()
    };
    b.activateSound = function(a, b) {
        var c = B(a);
        c && (0 == b || 1 == b ? c.V && c.V(1 == b) : 2 == b && c.o && c.o())
    };
    b.stopSound = function(a) {
        if ("_main" == a) {
            for (a = 0; a < C.length; a++) C[a].obj.pause(), C[a].obj.currentTime =
                0;
            for (a = 0; a < y.length; a++) y[a].obj.pause(), y[a].obj.currentTime = 0
        } else if (a = B(a)) a.obj.pause(), a.obj.currentTime = 0
    };
    b.setVolume = function(a, b) {
        var c = Number(b);
        1 < c && (c = 1);
        0 > c && (c = 0);
        if ("_main" == a) {
            X = c;
            for (c = 0; c < C.length; c++) C[c].obj.volume = C[c].j * X;
            for (c = 0; c < y.length; c++) y[c].obj.volume = y[c].j * X
        } else {
            var g = B(a);
            g && (g.j = c, g.obj.volume = c * X)
        }
    };
    b.changeVolume = function(a, b) {
        if ("_main" == a) {
            var c = X,
                c = c + Number(b);
            1 < c && (c = 1);
            0 > c && (c = 0);
            X = c;
            for (c = 0; c < C.length; c++) C[c].obj.volume = C[c].j * X
        } else {
            var g = B(a);
            g && (c =
                g.j, c += Number(b), 1 < c && (c = 1), 0 > c && (c = 0), g.j = c, g.obj.volume = c * X)
        }
    };
    b.removeHotspots = function() {
        for (var a; 0 < H.length;) a = H.pop(), a.obj && (Q.removeChild(a.obj.__div), delete a.obj), a.obj = p
    };
    b.setFullscreen = function(a) {
        var e = b.isFullscreen != a;
        b.isFullscreen != a && (b.isFullscreen = a, b.update(100));
        if (b.isFullscreen) {
            if (Wb) try {
                b.c.webkitRequestFullScreen ? b.c.webkitRequestFullScreen() : b.c.mozRequestFullScreen ? b.c.mozRequestFullScreen() : b.c.msRequestFullscreen ? b.c.msRequestFullscreen() : b.c.requestFullScreen ? b.c.requestFullScreen() :
                    b.c.requestFullscreen && b.c.requestFullscreen()
            } catch (c) {}
            b.c.style.position = "absolute";
            a = Bb();
            b.c.style.left = window.pageXOffset - a.x + Y + "px";
            b.c.style.top = window.pageYOffset - a.y + aa + "px";
            document.body.style.overflow = "hidden";
            e && b.divSkin && b.divSkin.ggEnterFullscreen && b.divSkin.ggEnterFullscreen()
        } else {
            if (Wb) try {
                document.webkitIsFullScreen ? document.webkitCancelFullScreen() : document.mozFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.fullScreen &&
                    (document.cancelFullScreen ? document.cancelFullScreen() : document.exitFullscreen && document.exitFullscreen())
            } catch (g) {}
            b.c.style.position = "relative";
            b.c.style.left = "0px";
            b.c.style.top = "0px";
            document.body.style.overflow = "";
            e && b.divSkin && b.divSkin.ggExitFullscreen && b.divSkin.ggExitFullscreen()
        }
        ya()
    };
    b.toggleFullscreen = function() {
        b.setFullscreen(!b.isFullscreen)
    };
    b.enterFullscreen = function() {
        b.setFullscreen(m)
    };
    b.exitFullscreen = function() {
        b.setFullscreen(r)
    };
    b.startAutorotate = function(a, b, c) {
        ea = gb = m;
        kb =
            (new Date).getTime();
        a && 0 != a && (Qa = a);
        b && (lc = b);
        c && (Kb = c)
    };
    b.stopAutorotate = function() {
        gb = ea = r
    };
    b.toggleAutorotate = function() {
        (ea = gb = !ea) && (kb = (new Date).getTime())
    };
    b.createLayers = function(a) {
        var e = r,
            e = r;
        b.ba = document.getElementById(a);
        b.ba ? (b.ba.innerHTML = "", b.c = document.createElement("div"), e && b.c.setAttribute("id", "viewport"), a = "top:  0px;left: 0px;position:relative;-ms-touch-action: none;" + (T + "user-select: none;"), b.c.setAttribute("style", a), b.ba.appendChild(b.c), s = document.createElement("div"),
            a = "top:  0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;" + (T + "user-select: none;"), e && s.setAttribute("id", "viewer"), s.setAttribute("style", a), b.c.appendChild(s), Q = document.createElement("div"), e && Q.setAttribute("id", "hotspots"), a = "top:  0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;z-index: 1000;", Od && (a += "background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);"), "-webkit-" == T && (a += T + "transform: translateZ(9999999999px);"),
            a += T + "user-select: none;", Q.setAttribute("style", a), b.c.appendChild(Q), Z = document.createElement("canvas"), e && Z.setAttribute("id", "hotspotcanvas"), a = "top:  0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;z-index: 900;" + (T + "user-select: none;"), a += T + "pointer-events: none;", Z.setAttribute("style", a), b.c.appendChild(Z), K = document.createElement("div"), e && K.setAttribute("id", "hotspottext"), K.setAttribute("style", "top:  0px;left: 0px;position:absolute;padding: 3px;visibility: hidden;z-index: 1100;"),
            K.innerHTML = " Hotspot text!", b.c.appendChild(K), b.divSkin = Q) : alert("container not found!")
    };
    b.La = function(a) {
        var e, c, g, d = 128;
        qb && (s.style.backgroundColor = qb.replace("0x", "#"));
        a ? (d = Fb, Eb = 1) : ob > d && (d = ob);
        for (g = 0; 6 > g; g++) {
            a ? (c = {}, c.width = Fb, c.height = Fb) : (c = document.createElement("canvas"), c.width = ob, c.height = ob, c.d = c.getContext("2d"));
            e = "position:absolute;";
            e += "left: 0px;";
            e += "top: 0px;";
            e += "width: " + d + "px;";
            e += "height: " + d + "px;";
            a && (e += "outline: 1px solid transparent;");
            e += T + "transform-origin: 0% 0%;";
            e += "-webkit-user-select: none;";
            e += T + "transform: ";
            var f;
            f = "";
            var l = 1;
            rb && (l = 100);
            f = 4 > g ? f + ("rotateY(" + -90 * g + "deg)") : f + ("rotateX(" + (4 == g ? -90 : 90) + "deg)");
            rb && (f += " scale(" + l + ")");
            f += " translate3d(" + -d / 2 + "px," + -d / 2 + "px," + -d * l / (2 * Eb) + "px)";
            e += f + ";";
            c.Oa = f;
            a || (c.setAttribute("style", e), s.insertBefore(c, s.firstChild));
            b.f.i[g] = c
        }
        if (!a) {
            for (g = 0; 6 > g; g++) c = b.f.i[g], "" != nb[g] && (c.D = new Image, c.D.onload = G(c), c.D.setAttribute("src", ma(nb[g])), b.checkLoaded.push(c.D));
            for (g = 0; 6 > g; g++) c = b.f.i[g], c.loaded = r, c.a =
                new Image, c.a.onload = G(c), c.a.setAttribute("src", ma(Vb[g])), b.checkLoaded.push(c.a)
        }
    };
    b.setOverlayOpacity = function(a) {
        var e;
        if (Aa)
            for (e = 0; 6 > e; e++) b.f.ka[e] && b.f.ka[e].style && (b.f.ka[e].style.opacity = a)
    };
    b.removePanorama = function() {
        var a;
        if (Aa) {
            for (a = 0; a < b.f.i.length; a++) b.f.i[a].setAttribute && (b.f.i[a].setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYBgeACDAAADIAAE3iTbkAAAAAElFTkSuQmCC"), s.removeChild(b.f.i[a]));
            if (D) {
                for (a = 0; a < D.length; a++) {
                    var e = D[a],
                        c;
                    for (c in e.g)
                        if (e.g.hasOwnProperty(c)) {
                            var g = e.g[c];
                            g.ia = r;
                            g.b && (g.d && (g.d.clear ? g.d.clear() : g.d.clearRect(0, 0, g.d.canvas.width, g.d.canvas.height)), unusedTileCanvas.push(g.b));
                            g.a && delete g.a;
                            g.L && f.deleteTexture(g.L);
                            g.d = p;
                            g.b = p;
                            g.a = p
                        }
                    delete e.g
                }
                delete D;
                D = p
            }
            b.f.i = [];
            b.f.ka = []
        }
        if (f && ca)
            for (; 0 < ca.length;) c = ca.pop(), c.cb = m, f.deleteTexture(c);
        for (a = 0; a < y.length; a++) s.removeChild(y[a].obj);
        for (a = 0; a < da.length; a++) s.removeChild(da[a].obj);
        c = [];
        for (a = 0; a < C.length; a++)
            if (e =
                C[a], 0 == e.mode || 1 == e.mode || e.hb) c.push(e);
            else {
                try {
                    e.obj.pause()
                } catch (d) {}
                b.c.removeChild(e.obj)
            }
        C = c;
        y = [];
        da = []
    };
    b.getScreenResolution = function() {
        var a = 1,
            b = -1 != navigator.userAgent.indexOf("Mac");
        window.devicePixelRatio && b && (a = window.devicePixelRatio);
        return {
            w: screen.width * a,
            h: screen.height * a
        }
    };
    b.getMaxScreenResolution = function() {
        var a = b.getScreenResolution();
        return a.w > a.h ? a.w : a.h
    };
    b.readConfigString = function(a, e) {
        window.DOMParser ? (parser = new DOMParser, xmlDoc = parser.parseFromString(a, "text/xml")) :
            (xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), xmlDoc.async = "false", xmlDoc.loadXML(a));
        b.readConfigXml(xmlDoc, e)
    };
    b.readConfigUrl = function(a, e, c) {
        try {
            var f;
            f = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            f.open("GET", a, r);
            f.send(p);
            if (f.responseXML) {
                var d = a.lastIndexOf("/");
                0 <= d && (Cb = a.substr(0, d + 1));
                2 <= arguments.length && e != p && (Cb = e);
                b.readConfigString(f.responseText, c)
            } else alert("Error loading panorama XML")
        } catch (k) {
            alert("Error:" + k)
        }
    };
    var Yb = m;
    b.getCurrentNode =
        function() {
            return Hb
        };
    b.readConfigXml = function(a, e) {
        var c = a.firstChild;
        pb = [];
        sa = [];
        if ("tour" == c.nodeName) {
            var f = "",
                d;
            (d = c.getAttributeNode("start")) && (f = d.nodeValue.toString());
            "" != b.startNode && (f = b.startNode, b.startNode = "");
            for (c = c.firstChild; c;) {
                d = "";
                if ("panorama" == c.nodeName && (d = c.getAttributeNode("id"))) d = d.nodeValue.toString(), "" == f && (f = d), pb[d] = c, sa.push(d);
                c = c.nextSibling
            }
            b.Ba(pb[f], e);
            h("{" + f + "}");
            b.Aa = m
        } else b.Aa = r, b.Ba(c, e), h(""), sa.push("")
    };
    b.Ba = function(a, e) {
        b.removeHotspots();
        b.hotspot =
            b.emptyHotspot;
        b.removePanorama();
        b.ea = 0;
        for (var c = a.firstChild, g, d, k, l = 0; c;) {
            if ("view" == c.nodeName) {
                (d = c.getAttributeNode("fovmode")) && (Hc = Number(d.nodeValue));
                d = c.getAttributeNode("pannorth");
                Ad = 1 * (d ? d.nodeValue : 0);
                for (g = c.firstChild; g;) "start" == g.nodeName && (d = g.getAttributeNode("pan"), Fc = x = Number(d ? d.nodeValue : 0), d = g.getAttributeNode("tilt"), Gc = u = Number(d ? d.nodeValue : 0), d = g.getAttributeNode("fov"), Lb = A = Number(d ? d.nodeValue : 70)), "min" == g.nodeName && (d = g.getAttributeNode("pan"), jb = 1 * (d ? d.nodeValue :
                    0), d = g.getAttributeNode("tilt"), Ka = 1 * (d ? d.nodeValue : -90), d = g.getAttributeNode("fov"), ha = 1 * (d ? d.nodeValue : 5), 1.0E-20 > ha && (ha = 1.0E-20), d = g.getAttributeNode("fovpixel"), zc = 1 * (d ? d.nodeValue : 0)), "max" == g.nodeName && (d = g.getAttributeNode("pan"), ib = 1 * (d ? d.nodeValue : 0), d = g.getAttributeNode("tilt"), Ja = 1 * (d ? d.nodeValue : 90), d = g.getAttributeNode("fov"), qa = 1 * (d ? d.nodeValue : 120), 180 <= qa && (qa = 179.9)), g = g.nextSibling
            }
            if ("autorotate" == c.nodeName && ((d = c.getAttributeNode("speed")) && (Qa = 1 * d.nodeValue), (d = c.getAttributeNode("delay")) &&
                    (lc = 1 * d.nodeValue), (d = c.getAttributeNode("returntohorizon")) && (Kb = 1 * d.nodeValue), (d = c.getAttributeNode("nodedelay")) && (kc = 1 * d.nodeValue), (d = c.getAttributeNode("noderandom")) && (Nc = 1 == d.nodeValue), Yb && (ea = gb = m, kb = (new Date).getTime()), d = c.getAttributeNode("startloaded")))(Jb = 1 == d.nodeValue) && (ea = r);
            "input" == c.nodeName && (k || (k = c));
            if (k)
                for (g = 0; 6 > g; g++) d = k.getAttributeNode("prev" + g + "url"), nb[g] = d ? new String(d.nodeValue) : "";
            "altinput" == c.nodeName && (g = 0, (d = c.getAttributeNode("screensize")) && (g = 1 * d.nodeValue),
                0 < g && g <= b.getMaxScreenResolution() && g > l && (l = g, k = c));
            if ("control" == c.nodeName && Yb) {
                (d = c.getAttributeNode("simulatemass")) && (ec = 1 == d.nodeValue);
                (d = c.getAttributeNode("locked")) && (ba = 1 == d.nodeValue);
                d && (Ob = 1 == d.nodeValue);
                (d = c.getAttributeNode("lockedmouse")) && (ba = 1 == d.nodeValue);
                (d = c.getAttributeNode("lockedkeyboard")) && (Ob = 1 == d.nodeValue);
                (d = c.getAttributeNode("lockedwheel")) && (uc = 1 == d.nodeValue);
                (d = c.getAttributeNode("invertwheel")) && (ad = 1 == d.nodeValue);
                (d = c.getAttributeNode("speedwheel")) && (bd = 1 *
                    d.nodeValue);
                (d = c.getAttributeNode("invertcontrol")) && (Oa = 1 == d.nodeValue);
                if (d = c.getAttributeNode("sensitivity")) fb = 1 * d.nodeValue, 1 > fb && (fb = 1);
                (d = c.getAttributeNode("dblclickfullscreen")) && (pc = 1 == d.nodeValue)
            }
            "overlay" == c.nodeName && ((d = c.getAttributeNode("blendspeed")) && (lb = 1 * d.nodeValue), (d = c.getAttributeNode("auto")) && (Oc = 1 == d.nodeValue), (d = c.getAttributeNode("delay")) && (Pc = 1 * d.nodeValue));
            "userdata" == c.nodeName && (b.userdata = q(c));
            if ("hotspots" == c.nodeName)
                for (g = c.firstChild; g;) {
                    if ("label" == g.nodeName) {
                        var h =
                            Rb;
                        if (d = g.getAttributeNode("enabled")) h.enabled = 1 == d.nodeValue;
                        if (d = g.getAttributeNode("width")) h.width = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("height")) h.height = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("textcolor")) h.Da = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("textalpha")) h.Ca = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("background")) h.background = 1 == d.nodeValue;
                        if (d = g.getAttributeNode("backgroundalpha")) h.N = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("backgroundcolor")) h.O = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("border")) h.xa =
                            1 * d.nodeValue;
                        if (d = g.getAttributeNode("bordercolor")) h.Q = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("borderalpha")) h.P = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("borderradius")) h.wa = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("wordwrap")) h.wordwrap = 1 == d.nodeValue
                    }
                    "polystyle" == g.nodeName && ((d = g.getAttributeNode("mode")) && (P = 1 * d.nodeValue), (d = g.getAttributeNode("bordercolor")) && (Ac = 1 * d.nodeValue), (d = g.getAttributeNode("backgroundcolor")) && (Cc = 1 * d.nodeValue), (d = g.getAttributeNode("borderalpha")) && (Bc = 1 * d.nodeValue), (d = g.getAttributeNode("backgroundalpha")) && (Dc = 1 * d.nodeValue));
                    "hotspot" == g.nodeName && (h = {
                            type: "point",
                            pan: 0,
                            tilt: 0,
                            url: "",
                            target: "",
                            id: "",
                            skinid: "",
                            w: 100,
                            h: 20,
                            wordwrap: r,
                            obj: p,
                            ha: p
                        }, d = g.getAttributeNode("pan"), h.pan = 1 * (d ? d.nodeValue : 0), d = g.getAttributeNode("tilt"), h.tilt = 1 * (d ? d.nodeValue : 0), (d = g.getAttributeNode("url")) && (h.url = d.nodeValue.toString()), (d = g.getAttributeNode("target")) && (h.target = d.nodeValue.toString()), (d = g.getAttributeNode("title")) && (h.title = d.nodeValue.toString()), (d = g.getAttributeNode("id")) &&
                        (h.id = d.nodeValue.toString()), (d = g.getAttributeNode("skinid")) && (h.skinid = d.nodeValue.toString()), (d = c.getAttributeNode("width")) && (h.w = d.nodeValue.toString()), (d = c.getAttributeNode("height")) && (h.h = d.nodeValue.toString()), (d = c.getAttributeNode("wordwrap")) && (h.wordwrap = 1 == d.nodeValue), H.push(h));
                    if ("polyhotspot" == g.nodeName) {
                        h = {
                            type: "poly",
                            url: "",
                            target: "",
                            id: "",
                            skinid: "",
                            w: 100,
                            h: 20,
                            wordwrap: r,
                            obj: p,
                            ha: p,
                            p: 0,
                            A: 0
                        };
                        (d = g.getAttributeNode("url")) && (h.url = d.nodeValue.toString());
                        (d = g.getAttributeNode("target")) &&
                        (h.target = d.nodeValue.toString());
                        (d = g.getAttributeNode("title")) && (h.title = d.nodeValue.toString());
                        (d = g.getAttributeNode("id")) && (h.id = d.nodeValue.toString());
                        h.Q = Ac;
                        h.O = Cc;
                        h.P = Bc;
                        h.N = Dc;
                        if (d = g.getAttributeNode("bordercolor")) h.Q = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("backgroundcolor")) h.O = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("borderalpha")) h.P = 1 * d.nodeValue;
                        if (d = g.getAttributeNode("backgroundalpha")) h.N = 1 * d.nodeValue;
                        h.ha = [];
                        for (var o = g.firstChild; o;) {
                            if ("vertex" == o.nodeName) {
                                var t = {
                                    pan: 0,
                                    tilt: 0
                                };
                                d = o.getAttributeNode("pan");
                                t.pan = 1 * (d ? d.nodeValue : 0);
                                d = o.getAttributeNode("tilt");
                                t.tilt = 1 * (d ? d.nodeValue : 0);
                                h.ha.push(t)
                            }
                            o = o.nextSibling
                        }
                        H.push(h)
                    }
                    g = g.nextSibling
                }
            if ("sounds" == c.nodeName || "media" == c.nodeName)
                for (g = c.firstChild; g;) {
                    if ("sound" == g.nodeName) {
                        o = {
                            id: "",
                            url: "",
                            loop: 0,
                            j: 1,
                            aa: 0,
                            mode: 1,
                            field: 10,
                            pan: 0,
                            tilt: 0,
                            s: 0,
                            M: 0,
                            url: []
                        };
                        if (d = g.getAttributeNode("id")) o.id = d.nodeValue.toString();
                        (d = g.getAttributeNode("url")) && o.url.push(d.nodeValue.toString());
                        if (d = g.getAttributeNode("level")) o.j = Number(d.nodeValue);
                        if (d = g.getAttributeNode("loop")) o.loop = Number(d.nodeValue);
                        if (d = g.getAttributeNode("mode")) o.mode = Number(d.nodeValue);
                        if (d = g.getAttributeNode("field")) o.field = Number(d.nodeValue);
                        if (d = g.getAttributeNode("ambientlevel")) o.aa = Number(d.nodeValue);
                        if (d = g.getAttributeNode("pan")) o.pan = Number(d.nodeValue);
                        if (d = g.getAttributeNode("tilt")) o.tilt = Number(d.nodeValue);
                        if (d = g.getAttributeNode("pansize")) o.s = Number(d.nodeValue);
                        if (d = g.getAttributeNode("tiltsize")) o.M = Number(d.nodeValue);
                        for (h = g.firstChild; h;) "source" ==
                            h.nodeName && (d = h.getAttributeNode("url")) && o.url.push(d.nodeValue.toString()), h = h.nextSibling;
                        Ua(o)
                    }
                    if ("video" == g.nodeName) {
                        o = {
                            id: "",
                            url: "",
                            poster: "",
                            loop: 0,
                            j: 1,
                            aa: 0,
                            mode: 1,
                            field: 10,
                            pan: 0,
                            tilt: 0,
                            s: 0,
                            M: 0,
                            k: 0,
                            l: 0,
                            fa: 0,
                            I: 50,
                            u: 0,
                            url: []
                        };
                        if (d = g.getAttributeNode("id")) o.id = d.nodeValue.toString();
                        (d = g.getAttributeNode("url")) && o.url.push(d.nodeValue.toString());
                        if (d = g.getAttributeNode("poster")) o.poster = "" + d.nodeValue;
                        if (d = g.getAttributeNode("level")) o.j = Number(d.nodeValue);
                        if (d = g.getAttributeNode("loop")) o.loop =
                            Number(d.nodeValue);
                        if (d = g.getAttributeNode("mode")) o.mode = Number(d.nodeValue);
                        if (d = g.getAttributeNode("field")) o.field = Number(d.nodeValue);
                        if (d = g.getAttributeNode("ambientlevel")) o.aa = Number(d.nodeValue);
                        if (d = g.getAttributeNode("pan")) o.pan = Number(d.nodeValue);
                        if (d = g.getAttributeNode("tilt")) o.tilt = Number(d.nodeValue);
                        if (d = g.getAttributeNode("pansize")) o.s = Number(d.nodeValue);
                        if (d = g.getAttributeNode("tiltsize")) o.M = Number(d.nodeValue);
                        if (d = g.getAttributeNode("rotx")) o.k = Number(d.nodeValue);
                        if (d =
                            g.getAttributeNode("roty")) o.l = Number(d.nodeValue);
                        if (d = g.getAttributeNode("rotz")) o.fa = Number(d.nodeValue);
                        if (d = g.getAttributeNode("fov")) o.I = Number(d.nodeValue);
                        if (d = g.getAttributeNode("width")) o.z = Number(d.nodeValue);
                        if (d = g.getAttributeNode("height")) o.B = Number(d.nodeValue);
                        d = g.getAttributeNode("stretch");
                        o.K = d ? Number(d.nodeValue) : 1;
                        if (d = g.getAttributeNode("clickmode")) o.u = Number(d.nodeValue);
                        for (h = g.firstChild; h;) "source" == h.nodeName && (d = h.getAttributeNode("url")) && o.url.push(d.nodeValue.toString()),
                            h = h.nextSibling;
                        W(o)
                    }
                    if ("image" == g.nodeName) {
                        o = {
                            id: "",
                            url: "",
                            loop: 0,
                            j: 1,
                            aa: 0,
                            mode: 1,
                            field: 10,
                            pan: 0,
                            tilt: 0,
                            s: 0,
                            M: 0,
                            k: 0,
                            l: 0,
                            fa: 0,
                            I: 50,
                            u: 0
                        };
                        if (d = g.getAttributeNode("id")) o.id = d.nodeValue.toString();
                        if (d = g.getAttributeNode("url")) o.url = d.nodeValue.toString();
                        if (d = g.getAttributeNode("pan")) o.pan = Number(d.nodeValue);
                        if (d = g.getAttributeNode("tilt")) o.tilt = Number(d.nodeValue);
                        if (d = g.getAttributeNode("rotx")) o.k = Number(d.nodeValue);
                        if (d = g.getAttributeNode("roty")) o.l = Number(d.nodeValue);
                        if (d = g.getAttributeNode("rotz")) o.fa =
                            Number(d.nodeValue);
                        if (d = g.getAttributeNode("fov")) o.I = Number(d.nodeValue);
                        if (d = g.getAttributeNode("width")) o.z = Number(d.nodeValue);
                        if (d = g.getAttributeNode("height")) o.B = Number(d.nodeValue);
                        d = g.getAttributeNode("stretch");
                        o.K = d ? Number(d.nodeValue) : 1;
                        if (d = g.getAttributeNode("clickmode")) o.u = Number(d.nodeValue);
                        for (h = g.firstChild; h;) {
                            if ("source" == h.nodeName && (d = h.getAttributeNode("url"))) o.url = d.nodeValue.toString();
                            h = h.nextSibling
                        }
                        n(o)
                    }
                    g = g.nextSibling
                }
            c = c.nextSibling
        }
        e && "" != e && (d = e.toString().split("/"),
            0 < d.length && b.setPan(Number(d[0])), 1 < d.length && b.setTilt(Number(d[1])), 2 < d.length && b.setFov(Number(d[2])));
        if (k) {
            for (g = 0; 6 > g; g++)(d = k.getAttributeNode("tile" + g + "url")) && (Vb[g] = new String(d.nodeValue));
            for (g = 0; 6 > g; g++)(d = k.getAttributeNode("prev" + g + "url")) && (nb[g] = new String(d.nodeValue));
            (d = k.getAttributeNode("tilesize")) && (ob = 1 * d.nodeValue);
            (d = k.getAttributeNode("canvassize")) && (Fb = Number(d.nodeValue));
            (d = k.getAttributeNode("tilescale")) && (Eb = 1 * d.nodeValue);
            if (d = k.getAttributeNode("leveltileurl")) ld =
                d.nodeValue;
            (d = k.getAttributeNode("leveltilesize")) && (J = Number(d.nodeValue));
            (d = k.getAttributeNode("levelbias")) && (od = Number(d.nodeValue));
            (d = k.getAttributeNode("overlap")) && (ra = Number(d.nodeValue));
            D = [];
            for (g = k.firstChild; g;) {
                if ("preview" == g.nodeName && (d = g.getAttributeNode("color"))) qb = d.nodeValue;
                "level" == g.nodeName && (k = {}, d = g.getAttributeNode("width"), k.width = 1 * (d ? d.nodeValue : 1), k.height = 1 * (d ? d.nodeValue : 1), d = g.getAttributeNode("preload"), k.t = r, d && (k.t = 1 == d.nodeValue), d = g.getAttributeNode("preview"),
                    k.Sa = r, d && (k.Sa = 1 == d.nodeValue), k.G = Math.floor((k.width + J - 1) / J), k.$ = Math.floor((k.height + J - 1) / J), k.g = {}, D.push(k));
                g = g.nextSibling
            }
        }
        yb && (ta = Aa = r, ja = document.createElement("canvas"), ja.width = 100, ja.height = 100, ja.id = "dummycanvas", s.appendChild(ja), ya());
        ta && f && (id(Eb), jd());
        Aa && (0 < D.length ? b.La(m) : b.La(), b.ea = 0);
        b.addHotspotElements();
        b.update();
        Yb && b.divSkin && b.divSkin.ggViewerInit && b.divSkin.ggViewerInit();
        Yb = r;
        b.hasConfig = m;
        ya()
    };
    b.openUrl = function(a, e) {
        0 < a.length && (".xml" == a.substr(a.length - 4) ||
            ".swf" == a.substr(a.length - 4) || "{" == a.charAt(0) ? b.openNext(ma(a), e) : window.open(ma(a), e))
    };
    b.openNext = function(a, e) {
        b.isLoaded = r;
        b.hasConfig = r;
        b.checkLoaded = [];
        Ib = 0;
        b.divSkin && b.divSkin.ggReLoaded && b.divSkin.ggReLoaded();
        b.skinObj && b.skinObj.hotspotProxyOut && b.skinObj.hotspotProxyOut(b.hotspot.id);
        ".swf" == a.substr(a.length - 4) && (a = a.substr(0, a.length - 4) + ".xml");
        var c = "";
        e && (c = e.toString());
        c = c.replace("$cur", x + "/" + u + "/" + A);
        c = c.replace("$ap", x);
        c = c.replace("$an", b.getPanNorth());
        c = c.replace("$at", u);
        c = c.replace("$af", A);
        if ("" != c) {
            var f = c.split("/");
            3 < f.length && "" != f[3] && (b.startNode = f[3])
        }
        I();
        if ("{" == a.charAt(0))
            if (f = a.substr(1, a.length - 2), pb[f]) b.Ba(pb[f], c), h(a);
            else {
                zd("invalid node id: " + f);
                return
            } else b.readConfigUrl(a, p, c);
        b.update(5)
    };
    b.getNodeIds = function() {
        return sa.slice(0)
    };
    b.getNodeUserdata = function(a) {
        if (!a) return b.userdata;
        if (a = pb[a])
            for (a = a.firstChild; a;) {
                if ("userdata" == a.nodeName) return q(a);
                a = a.nextSibling
            }
        return []
    };
    b.getNodeLatLng = function(a) {
        var a = b.getNodeUserdata(a),
            e = [];
        "" != a.latitude && 0 != a.latitude && 0 != a.longitude && (e.push(a.latitude), e.push(a.longitude));
        return e
    };
    b.getNodeTitle = function(a) {
        return b.getNodeUserdata(a).title
    };
    b.detectBrowser();
    b.createLayers(k);
    b.Va()
}
window.ggHasHtml5Css3D = Jc;
window.ggHasWebGL = Kc;
window.pano2vrPlayer = pano2vrPlayer;

(function(factory) {
    "use strict";
    var interValId;
    var intervalIndex = 0;
    var run = function() {
        if (window.picturefill) {
            factory(window.picturefill);
        }
        if (window.picturefill || intervalIndex > 9999) {
            clearInterval(interValId);
        }
        intervalIndex++;
    };
    interValId = setInterval(run, 8);

    run();

}(function(picturefill) {
    "use strict";

    var document = window.document;
    var Element = window.Element;
    var MutationObserver = window.MutationObserver;
    var noop = function() {};
    var pfObserver = {
        disconnect: noop,
        take: noop,
        observe: noop,
        start: noop,
        stop: noop,
        connected: false
    };
    var isReady = /^loade|^c|^i/.test(document.readyState || "");
    var pf = picturefill._;
    pf.mutationSupport = false;
    pf.observer = pfObserver;
    if (!Object.keys || !window.HTMLSourceElement || !document.addEventListener) {
        return;
    }
    var matches, observer, allowConnect, addMutation;

    var observeProps = {
        src: 1,
        srcset: 1,
        sizes: 1,
        media: 1
    };
    var attrFilter = Object.keys(observeProps);
    var config = {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: attrFilter
    };
    var elemProto = Element && Element.prototype;
    var sup = {};
    var monkeyPatch = function(name, fn) {
        sup[name] = pf[name];
        pf[name] = fn;
    };

    if (elemProto && !elemProto.matches) {
        elemProto.matches = elemProto.matchesSelector || elemProto.mozMatchesSelector || elemProto.webkitMatchesSelector || elemProto.msMatchesSelector;
    }

    if (elemProto && elemProto.matches) {
        matches = function(elem, sel) {
            return elem.matches(sel);
        };
        pf.mutationSupport = !!(Object.create && Object.defineProperties);
    }

    if (!pf.mutationSupport) {
        return;
    }

    pfObserver.observe = function() {
        if (allowConnect) {
            pfObserver.connected = true;
            if (observer) {
                observer.observe(document.documentElement, config);
            }
        }
    };

    pfObserver.disconnect = function() {
        pfObserver.connected = false;
        if (observer) {
            observer.disconnect();
        }
    };

    pfObserver.take = function() {
        if (observer) {
            pf.onMutations(observer.takeRecords());
        } else if (addMutation) {
            addMutation.take();
        }
    };

    pfObserver.start = function() {
        allowConnect = true;
        pfObserver.observe();
    };

    pfObserver.stop = function() {
        allowConnect = false;
        pfObserver.disconnect();
    };

    monkeyPatch("setupRun", function() {
        pfObserver.disconnect();
        return sup.setupRun.apply(this, arguments);
    });

    monkeyPatch("teardownRun", function() {
        var ret = sup.setupRun.apply(this, arguments);
        pfObserver.observe();
        return ret;
    });

    monkeyPatch("setSrc", function() {
        var ret;
        var wasConnected = pfObserver.connected;
        pfObserver.disconnect();
        ret = sup.setSrc.apply(this, arguments);
        if (wasConnected) {
            pfObserver.observe();
        }
        return ret;
    });

    pf.onMutations = function(mutations) {
        var i, len;
        var modifiedImgs = [];

        for (i = 0, len = mutations.length; i < len; i++) {
            if (isReady && mutations[i].type === "childList") {
                pf.onSubtreeChange(mutations[i], modifiedImgs);
            } else if (mutations[i].type === "attributes") {
                pf.onAttrChange(mutations[i], modifiedImgs);
            }
        }

        if (modifiedImgs.length) {

            pf.fillImgs({
                elements: modifiedImgs,
                reevaluate: true
            });
        }
    };

    pf.onSubtreeChange = function(mutations, imgs) {
        pf.findAddedMutations(mutations.addedNodes, imgs);
        pf.findRemovedMutations(mutations.removedNodes, mutations.target, imgs);
    };

    pf.findAddedMutations = function(nodes, imgs) {
        var i, len, node, nodeName;
        for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            if (node.nodeType !== 1) {
                continue;
            }

            nodeName = node.nodeName.toUpperCase();

            if (nodeName === "PICTURE") {
                pf.addToElements(node.getElementsByTagName("img")[0], imgs);
            } else if (nodeName === "IMG" && matches(node, pf.selShort)) {
                pf.addToElements(node, imgs);
            } else if (nodeName === "SOURCE") {
                pf.addImgForSource(node, node.parentNode, imgs);
            } else {
                pf.addToElements(pf.qsa(node, pf.selShort), imgs);
            }
        }
    };

    pf.findRemovedMutations = function(nodes, target, imgs) {
        var i, len, node;
        for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            if (node.nodeType !== 1) {
                continue;
            }
            if (node.nodeName.toUpperCase() === "SOURCE") {
                pf.addImgForSource(node, target, imgs);
            }
        }
    };

    pf.addImgForSource = function(node, parent, imgs) {
        if (parent && (parent.nodeName || "").toUpperCase() !== "PICTURE") {
            parent = parent.parentNode;

            if (!parent || (parent.nodeName || "").toUpperCase() !== "PICTURE") {
                parent = null;
            }
        }

        if (parent) {
            pf.addToElements(parent.getElementsByTagName("img")[0], imgs);
        }
    };

    pf.addToElements = function(img, imgs) {
        var i, len;
        if (img) {
            if (("length" in img) && !img.nodeType) {
                for (i = 0, len = img.length; i < len; i++) {
                    pf.addToElements(img[i], imgs);
                }
            } else if (img.parentNode && imgs.indexOf(img) === -1) {
                imgs.push(img);
            }
        }
    };

    pf.onAttrChange = function(mutation, modifiedImgs) {
        var nodeName;
        var riData = mutation.target[pf.ns];

        if (!riData &&
            mutation.attributeName === "srcset" &&
            (nodeName = mutation.target.nodeName.toUpperCase()) === "IMG") {
            pf.addToElements(mutation.target, modifiedImgs);
        } else if (riData) {
            if (!nodeName) {
                nodeName = mutation.target.nodeName.toUpperCase();
            }

            if (nodeName === "IMG") {
                if (mutation.attributeName in riData) {
                    riData[mutation.attributeName] = undefined;
                }
                pf.addToElements(mutation.target, modifiedImgs);
            } else if (nodeName === "SOURCE") {
                pf.addImgForSource(mutation.target, mutation.target.parentNode, modifiedImgs);
            }
        }
    };

    if (!pf.supPicture) {

        if (MutationObserver && !pf.testMutationEvents) {
            observer = new MutationObserver(pf.onMutations);
        } else {

            addMutation = (function() {
                var running = false;
                var mutations = [];
                var setImmediate = window.setImmediate || window.setTimeout;
                return function(mutation) {
                    if (!running) {
                        running = true;
                        if (!addMutation.take) {
                            addMutation.take = function() {
                                if (mutations.length) {
                                    pf.onMutations(mutations);
                                    mutations = [];
                                }
                                running = false;
                            };
                        }
                        setImmediate(addMutation.take);
                    }
                    mutations.push(mutation);
                };
            })();

            document.documentElement.addEventListener("DOMNodeInserted", function(e) {
                if (pfObserver.connected && isReady) {
                    addMutation({
                        type: "childList",
                        addedNodes: [e.target],
                        removedNodes: []
                    });
                }
            }, true);

            document.documentElement.addEventListener("DOMNodeRemoved", function(e) {

                if (pfObserver.connected && isReady && (e.target || {}).nodeName === "SOURCE") {
                    addMutation({
                        type: "childList",
                        addedNodes: [],
                        removedNodes: [e.target],
                        target: e.target.parentNode
                    });
                }
            }, true);

            document.documentElement.addEventListener("DOMAttrModified", function(e) {
                if (pfObserver.connected && observeProps[e.attrName]) {
                    addMutation({
                        type: "attributes",
                        target: e.target,
                        attributeName: e.attrName
                    });
                }
            }, true);
        }

        if (window.HTMLImageElement && Object.defineProperties) {

            (function() {

                var image = document.createElement("img");
                var imgIdls = [];
                var getImgAttr = image.getAttribute;
                var setImgAttr = image.setAttribute;
                var GETIMGATTRS = {
                    src: 1
                };

                if (pf.supSrcset && !pf.supSizes) {
                    GETIMGATTRS.srcset = 1;
                }

                Object.defineProperties(HTMLImageElement.prototype, {
                    getAttribute: {
                        value: function(attr) {
                            var internal;
                            if (GETIMGATTRS[attr] && (internal = this[pf.ns]) && (internal[attr] !== undefined)) {
                                return internal[attr];
                            }
                            return getImgAttr.apply(this, arguments);
                        },
                        writeable: true,
                        enumerable: true,
                        configurable: true
                    }
                });

                if (!pf.supSrcset) {
                    imgIdls.push("srcset");
                }

                if (!pf.supSizes) {
                    imgIdls.push("sizes");
                }

                imgIdls.forEach(function(idl) {
                    Object.defineProperty(HTMLImageElement.prototype, idl, {
                        set: function(value) {
                            setImgAttr.call(this, idl, value);
                        },
                        get: function() {
                            return getImgAttr.call(this, idl) || "";
                        },
                        enumerable: true,
                        configurable: true
                    });
                });

                if (!("currentSrc" in image)) {
                    (function() {
                        var ascendingSort;
                        var updateCurSrc = function(elem, src) {
                            if (src == null) {
                                src = elem.src || "";
                            }

                            Object.defineProperty(elem, "pfCurrentSrc", {
                                value: src,
                                writable: true
                            });
                        };
                        var baseUpdateCurSrc = updateCurSrc;

                        if (pf.supSrcset && window.devicePixelRatio) {
                            ascendingSort = function(a, b) {
                                var aRes = a.d || a.w || a.res;
                                var bRes = b.d || b.w || b.res;
                                return aRes - bRes;
                            };

                            updateCurSrc = function(elem) {
                                var i, cands, length, ret;
                                var imageData = elem[pf.ns];

                                if (imageData && imageData.supported && imageData.srcset && imageData.sets && (cands = pf.parseSet(imageData.sets[0])) && cands.sort) {

                                    cands.sort(ascendingSort);
                                    length = cands.length;
                                    ret = cands[length - 1];

                                    for (i = 0; i < length; i++) {
                                        if (cands[i].d >= window.devicePixelRatio) {
                                            ret = cands[i];
                                            break;
                                        }
                                    }

                                    if (ret) {
                                        ret = pf.makeUrl(ret.url);
                                    }
                                }
                                baseUpdateCurSrc(elem, ret);
                            };
                        }

                        document.addEventListener("load", function(e) {
                            if (e.target.nodeName.toUpperCase() === "IMG") {
                                updateCurSrc(e.target);
                            }
                        }, true);

                        Object.defineProperty(HTMLImageElement.prototype, "currentSrc", {
                            set: function() {
                                if (window.console && console.warn) {
                                    console.warn("currentSrc can't be set on img element");
                                }
                            },
                            get: function() {
                                if (this.complete) {
                                    updateCurSrc(this);
                                }
                                //IE is never complete if no src/srcset available
                                return (!this.src && !this.srcset) ? "" : this.pfCurrentSrc || "";
                            },
                            enumerable: true,
                            configurable: true
                        });
                    })();
                }

                if (window.HTMLSourceElement && !("srcset" in document.createElement("source"))) {

                    ["srcset", "sizes"].forEach(function(idl) {
                        Object.defineProperty(window.HTMLSourceElement.prototype, idl, {
                            set: function(value) {
                                this.setAttribute(idl, value);
                            },
                            get: function() {
                                return this.getAttribute(idl) || "";
                            },
                            enumerable: true,
                            configurable: true
                        });
                    });
                }

            })();
        }

        pfObserver.start();
    }
    if (!isReady) {
        document.addEventListener("DOMContentLoaded", function() {
            isReady = true;
        });
    }
}));

/*  SWFObject v2.2 <http://code.google.com/p/swfobject/> 
  is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject = function() {
    var D = "undefined",
        r = "object",
        S = "Shockwave Flash",
        W = "ShockwaveFlash.ShockwaveFlash",
        q = "application/x-shockwave-flash",
        R = "SWFObjectExprInst",
        x = "onreadystatechange",
        O = window,
        j = document,
        t = navigator,
        T = false,
        U = [h],
        o = [],
        N = [],
        I = [],
        l, Q, E, B, J = false,
        a = false,
        n, G, m = true,
        M = function() {
            var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                ah = t.userAgent.toLowerCase(),
                Y = t.platform.toLowerCase(),
                ae = Y ? /win/.test(Y) : /win/.test(ah),
                ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                X = !+"\v1",
                ag = [0, 0, 0],
                ab = null;
            if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                ab = t.plugins[S].description;
                if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                    T = true;
                    X = false;
                    ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                    ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof O.ActiveXObject != D) {
                    try {
                        var ad = new ActiveXObject(W);
                        if (ad) {
                            ab = ad.GetVariable("$version");
                            if (ab) {
                                X = true;
                                ab = ab.split(" ")[1].split(",");
                                ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                            }
                        }
                    } catch (Z) {}
                }
            }
            return {
                w3: aa,
                pv: ag,
                wk: af,
                ie: X,
                win: ae,
                mac: ac
            }
        }(),
        k = function() {
            if (!M.w3) {
                return
            }
            if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
                f()
            }
            if (!J) {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("DOMContentLoaded", f, false)
                }
                if (M.ie && M.win) {
                    j.attachEvent(x, function() {
                        if (j.readyState == "complete") {
                            j.detachEvent(x, arguments.callee);
                            f()
                        }
                    });
                    if (O == top) {
                        (function() {
                            if (J) {
                                return
                            }
                            try {
                                j.documentElement.doScroll("left")
                            } catch (X) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            f()
                        })()
                    }
                }
                if (M.wk) {
                    (function() {
                        if (J) {
                            return
                        }
                        if (!/loaded|complete/.test(j.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
                s(f)
            }
        }();

    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }

    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }

    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function() {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }

    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }

    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function() {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }

    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }

    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }

    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }

    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
                ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function() {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }

    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function() {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }

    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }

    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }

    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }

    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function() {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }

    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }

    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch (Y) {}
        return X
    }

    function C(X) {
        return j.createElement(X)
    }

    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }

    function F(Z) {
        var Y = M.pv,
            X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }

    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }

    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }

    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }
    var d = function() {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function() {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function(ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    })
                }
            }
        },
        getObjectById: function(X) {
            if (M.w3) {
                return z(X)
            }
        },
        embedSWF: function(ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function() {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        },
        switchOffAutoHideShow: function() {
            m = false
        },
        ua: M,
        getFlashPlayerVersion: function() {
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function(Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        },
        showExpressInstall: function(Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        },
        removeSWF: function(X) {
            if (M.w3) {
                y(X)
            }
        },
        createCSS: function(aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function(aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function() {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();