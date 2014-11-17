/* release date : 2013-10-08 */
(function (a) {
    var b = document.getElementsByTagName("script"), c = b[b.length - 1];
    c && /[\?&]jindo=([^&]+)/.test(c.src) && (a = RegExp.$1);
    var d = window[a];
    d.Component = d.$Class({
        _htEventHandler: null, _htOption: null, $init: function () {
            var a = this.constructor.getInstance();
            a.push(this), this._htEventHandler = {}, this._htOption = {}, this._htOption._htSetter = {}
        }, option: function (a, b) {
            switch (typeof a) {
                case"undefined":
                    var c = {};
                    for (var d in this._htOption)d != "htCustomEventHandler" && d != "_htSetter" && (c[d] = this._htOption[d]);
                    return c;
                case"string":
                    if (typeof b == "undefined")return this._htOption[a];
                    if (a == "htCustomEventHandler")if (typeof this._htOption[a] == "undefined")this.attach(b); else return this;
                    this._htOption[a] = b, typeof this._htOption._htSetter[a] == "function" && this._htOption._htSetter[a](b);
                    break;
                case"object":
                    for (var e in a) {
                        if (e == "htCustomEventHandler")if (typeof this._htOption[e] == "undefined")this.attach(a[e]); else continue;
                        e !== "_htSetter" && (this._htOption[e] = a[e]), typeof this._htOption._htSetter[e] == "function" && this._htOption._htSetter[e](a[e])
                    }
            }
            return this
        }, optionSetter: function (a, b) {
            switch (typeof a) {
                case"undefined":
                    return this._htOption._htSetter;
                case"string":
                    if (typeof b != "undefined")this._htOption._htSetter[a] = d.$Fn(b, this).bind(); else return this._htOption._htSetter[a];
                    break;
                case"object":
                    for (var c in a)this._htOption._htSetter[c] = d.$Fn(a[c], this).bind()
            }
            return this
        }, fireEvent: function (a, b) {
            b = b || {};
            var c = this["on" + a], d = this._htEventHandler[a] || [], e = typeof c == "function", f = d.length > 0;
            if (!e && !f)return !0;
            d = d.concat(), b.sType = a, typeof b._aExtend == "undefined" && (b._aExtend = [], b.stop = function () {
                b._aExtend.length > 0 && (b._aExtend[b._aExtend.length - 1].bCanceled = !0)
            }), b._aExtend.push({sType: a, bCanceled: !1});
            var g = [b], h, i;
            for (h = 2, i = arguments.length; h < i; h++)g.push(arguments[h]);
            e && c.apply(this, g);
            if (f) {
                var j;
                for (h = 0, j; j = d[h]; h++)j.apply(this, g)
            }
            return !b._aExtend.pop().bCanceled
        }, attach: function (a, b) {
            if (arguments.length == 1)return d.$H(arguments[0]).forEach(d.$Fn(function (a, b) {
                this.attach(b, a)
            }, this).bind()), this;
            var c = this._htEventHandler[a];
            return typeof c == "undefined" && (c = this._htEventHandler[a] = []), c.push(b), this
        }, detach: function (a, b) {
            if (arguments.length == 1)return d.$H(arguments[0]).forEach(d.$Fn(function (a, b) {
                this.detach(b, a)
            }, this).bind()), this;
            var c = this._htEventHandler[a];
            if (c)for (var e = 0, f; f = c[e]; e++)if (f === b) {
                c = c.splice(e, 1);
                break
            }
            return this
        }, detachAll: function (a) {
            var b = this._htEventHandler;
            if (arguments.length)return typeof b[a] == "undefined" ? this : (delete b[a], this);
            for (var c in b)delete b[c];
            return this
        }
    }), d.Component.factory = function (a, b) {
        var c = [], d;
        typeof b == "undefined" && (b = {});
        for (var e = 0, f; f = a[e]; e++)d = new this(f, b), c[c.length] = d;
        return c
    }, d.Component.getInstance = function () {
        return typeof this._aInstance == "undefined" && (this._aInstance = []), this._aInstance
    }, d.Component.VERSION = "1.4.0", d.UIComponent = d.$Class({
        $init: function () {
            this._bIsActivating = !1
        }, isActivating: function () {
            return this._bIsActivating
        }, activate: function () {
            return this.isActivating() ? this : (this._bIsActivating = !0, arguments.length > 0 ? this._onActivate.apply(this, arguments) : this._onActivate(), this)
        }, deactivate: function () {
            return this.isActivating() ? (this._bIsActivating = !1, arguments.length > 0 ? this._onDeactivate.apply(this, arguments) : this._onDeactivate(), this) : this
        }
    }).extend(d.Component), d.TextRange = d.$Class({
        $init: function (a, b) {
            this.option({bActivateOnload: !0}), this.option(b || {}), this._el = d.$(a), this._bFocused = !1, this._wfFocus = d.$Fn(function () {
                this._bFocused = !0
            }, this), this._wfBlur = d.$Fn(function () {
                this._bFocused = !1
            }, this), this.option("bActivateOnload") && this.activate()
        }, _onActivate: function () {
            this._wfFocus.attach(this._el, "focus").attach(this._el, "keydown"), this._wfBlur.attach(this._el, "blur")
        }, _onDeactivate: function () {
            this._wfFocus.detach(this._el, "focus").detach(this._el, "keydown"), this._wfBlur.detach(this._el, "blur")
        }, hasFocus: function () {
            return this._bFocused
        }, getSelection: function () {
            var a = this._el, b = [-1, -1], c, d, e, f, g, h;
            if (isNaN(this._el.selectionStart)) {
                var i = document.selection.createRange();
                i && i.parentElement() == a && (h = a.value.length, c = a.value.replace(/\r\n/g, "\n"), d = a.createTextRange(), d.moveToBookmark(i.getBookmark()), e = a.createTextRange(), e.collapse(!1), d.compareEndPoints("StartToEnd", e) > -1 ? f = g = h : (f = -d.moveStart("character", -h), f += c.slice(0, f).split("\n").length - 1, d.compareEndPoints("EndToEnd", e) > -1 ? g = h : (g = -d.moveEnd("character", -h), g += c.slice(0, g).split("\n").length - 1)))
            } else f = a.selectionStart, g = a.selectionEnd;
            return [f, g]
        }, setSelection: function (a, b) {
            var c = this._el;
            typeof b == "undefined" && (b = a);
            if (c.setSelectionRange)c.setSelectionRange(a, b); else if (c.createTextRange) {
                var d = c.createTextRange();
                d.collapse(!0), d.moveStart("character", a), d.moveEnd("character", b - a), d.select()
            }
        }, copy: function () {
            this._bFocused || this._el.focus();
            var a = this.getSelection();
            return this._el.value.substring(a[0], a[1])
        }, paste: function (a) {
            this._bFocused || this._el.focus();
            var b = this._el, c = this.getSelection(), d = b.value, e = d.substr(0, c[0]), f = d.substr(c[1]);
            d = e + a + f, b.value = d, this.setSelection(c[0] + a.length)
        }, cut: function () {
            var a = this.copy();
            return this.paste(""), a
        }
    }).extend(d.UIComponent), d.Timer = d.$Class({
        $init: function () {
            this._nTimer = null, this._nLatest = null, this._nRemained = 0, this._nDelay = null, this._fRun = null, this._bIsRunning = !1
        }, start: function (a, b) {
            return this.abort(), this._nRemained = 0, this._nDelay = b, this._fRun = a, this._bIsRunning = !0, this._nLatest = this._getTime(), this.fireEvent("wait"), this._excute(this._nDelay, !1), !0
        }, isRunning: function () {
            return this._bIsRunning
        }, _getTime: function () {
            return (new Date).getTime()
        }, _clearTimer: function () {
            var a = !1;
            return this._nTimer && (clearTimeout(this._nTimer), this._bIsRunning = !1, a = !0), this._nTimer = null, a
        }, abort: function () {
            return this._clearTimer(), this._fRun ? (this.fireEvent("abort"), this._fRun = null, !0) : !1
        }, pause: function () {
            var a = this._getTime() - this._nLatest;
            return this._nRemained = Math.max(this._nDelay - a, 0), this._clearTimer()
        }, _excute: function (a, b) {
            var c = this;
            this._clearTimer(), this._bIsRunning = !0;
            var d = function (a) {
                if (!c._fRun)return;
                if (c._nTimer || a) {
                    c.fireEvent("run");
                    var b = c._fRun();
                    c._nLatest = c._getTime();
                    if (!b) {
                        a || clearTimeout(c._nTimer), c._nTimer = null, c._bIsRunning = !1, c.fireEvent("end");
                        return
                    }
                    c.fireEvent("wait"), c._excute(c._nDelay, !1)
                }
            };
            a > -1 ? this._nTimer = setTimeout(d, a) : d(!0)
        }, resume: function () {
            return !this._fRun || this.isRunning() ? !1 : (this._bIsRunning = !0, this.fireEvent("wait"), this._excute(this._nRemained, !0), this._nRemained = 0, !0)
        }
    }).extend(d.Component), d.WatchInput = d.$Class({
        _bTimerRunning: !1,
        _bFocused: !1,
        _sPrevValue: "",
        $init: function (a, b) {
            var c = {nInterval: 100, bUseTimerOnIE: !1, sKeyEvent: "keyup", bPermanent: !1, bActivateOnload: !0};
            this.option(c), this.option(b || {}), this._elInput = d.$(a), this._oTimer = new d.Timer, this._bIE = d.$Agent().navigator().ie, this._wfFocus = d.$Fn(this._onFocus, this), this._wfBlur = d.$Fn(this._onBlur, this), this._wfKeyEvent = d.$Fn(this._onKeyEvent, this), this._wfStartTimer = d.$Fn(this._startTimer, this), this._wfStopTimer = d.$Fn(this._stopTimer, this), this.option("bActivateOnload") && this.activate(!0)
        },
        getInput: function () {
            return this._elInput
        },
        setInputValue: function (a) {
            return this.getInput().value = a, this.setCompareValue(a), this
        },
        getCompareValue: function () {
            return this._sPrevValue
        },
        setCompareValue: function (a) {
            return this._sPrevValue = a, this
        },
        fireChangeEvent: function () {
            var a = this.getInput(), b = a.value;
            return this.setCompareValue(b), this.fireEvent("change", {elInput: a, sText: b}), this
        },
        start: function (a) {
            return this.activate(a || !1)
        },
        stop: function () {
            return this.deactivate()
        },
        _onActivate: function (a) {
            this.setCompareValue("");
            var b = this.getInput();
            this._wfFocus.attach(b, "focus");
            if (this._bIE && !this.option("bUseTimerOnIE"))this.fireEvent("start"), this._wfKeyEvent.attach(b, this.option("sKeyEvent")); else {
                if (this._isTimerRunning())return;
                this.fireEvent("start"), this.option("bPermanent") ? this._startTimer() : (this._wfStartTimer.attach(b, "focus"), this._wfStopTimer.attach(b, "blur"))
            }
            this._wfBlur.attach(b, "blur"), (a || !1) && this.compare()
        },
        _onDeactivate: function () {
            var a = this.getInput();
            this._wfFocus.detach(a, "focus"), this._wfKeyEvent.detach(a, this.option("sKeyEvent")), this._stopTimer(), this._wfStartTimer.detach(a, "focus"), this._wfStopTimer.detach(a, "blur"), this._wfBlur.detach(a, "blur"), this.fireEvent("stop")
        },
        getInterval: function () {
            return this.option("nInterval")
        },
        setInterval: function (a) {
            return this.option("nInterval", a), this
        },
        _isTimerRunning: function () {
            return this._bTimerRunning
        },
        _startTimer: function () {
            if (this._isTimerRunning())return;
            this._bTimerRunning = !0, this.fireEvent("timerStart"), this.compare();
            var a = this;
            this._oTimer.start(function () {
                return a.compare(), !0
            }, this.getInterval())
        },
        _stopTimer: function () {
            this._isTimerRunning() && (this._oTimer.abort(), this._bTimerRunning = !1, this.compare(), this.fireEvent("timerStop"))
        },
        _onKeyEvent: function () {
            this.compare()
        },
        _onFocus: function () {
            this._bFocused = !0, this.fireEvent("focus")
        },
        _onBlur: function () {
            this._bFocused = !1, this.fireEvent("blur")
        },
        compare: function () {
            return this.getInput().value != this.getCompareValue() && this.fireChangeEvent(), this
        }
    }).extend(d.UIComponent), d.Formatter = d.$Class({
        _aMarks: ["\0", "￿"],
        _sPrevValue: null,
        _oTextRange: null,
        _bFakeFocus: !1,
        $init: function (a, b) {
            this._el = d.$(a), this.option({
                bPaintOnload: !0,
                bActivateOnload: !0,
                WatchInput: {nInterval: 100, bPermanent: !0, bActivateOnload: !1}
            }), this.option(b || {}), this.isOpera = d.$Agent().navigator.opera;
            var c = this;
            this._wfRealBlur = d.$Fn(this._realBlur, this), this._wfRealFocus = d.$Fn(this._realFocus, this), this._oTextRange = new d.TextRange(a), this._oWatchInput = (new d.WatchInput(a, this.option("WatchInput"))).attach({
                change: function (a) {
                    setTimeout(function () {
                        c.paint()
                    }, 1)
                }
            }), this.option("bPaintOnload") && setTimeout(function () {
                c.paint()
            }, 1), this.option("bActivateOnload") && this.activate()
        },
        getWatchInput: function () {
            return this._oWatchInput
        },
        _splice: function (a, b, c, d) {
            return a.slice(0, b) + d + a.slice(b + c)
        },
        setValue: function (a) {
            return this._el.value = a, this.paint(), this
        },
        paint: function () {
            var a = this._el, b = this._oTextRange, c = this._aMarks, d = a.value.toString(), e = b.hasFocus(), f, g;
            if (e) {
                f = [-1, -1];
                try {
                    f = b.getSelection()
                } catch (h) {
                }
                d = this._splice(this._splice(d, f[1], 0, c[1]), f[0], 0, c[0])
            }
            g = {elInput: a, sText: d, sStartMark: c[0], sEndMark: c[1]};
            if (this.fireEvent("beforeChange", g)) {
                var i = g.sText;
                if (e) {
                    var j = i.indexOf(c[0]);
                    j > -1 && (i = this._splice(i, j, 1, "")), f = [j], f[1] = i.indexOf(c[1]), f[1] > -1 && (i = this._splice(i, f[1], 1, ""));
                    var k = this;
                    setTimeout(function () {
                        k._bFakeFocus = !0, !this.isOpera || a.blur()
                    }, 1), setTimeout(function () {
                        k._oWatchInput.setInputValue(i), a.focus();
                        try {
                            b.setSelection(f[0], f[1])
                        } catch (c) {
                        }
                        k.fireEvent("change", {elInput: a})
                    }, 2), setTimeout(function () {
                        k._bFakeFocus = !1
                    }, 20)
                } else this._oWatchInput.setInputValue(i), this.fireEvent("change", {elInput: a})
            }
            return this
        },
        _realBlur: function () {
            this._bFakeFocus || (this.getWatchInput().stop(), this.fireEvent("blur", {elInput: this._el}))
        },
        _realFocus: function () {
            this._bFakeFocus || (this.getWatchInput().start(!0), this.fireEvent("focus", {elInput: this._el}))
        },
        _onActivate: function () {
            this._wfRealBlur.attach(this._el, "blur"), this._wfRealFocus.attach(this._el, "focus")
        },
        _onDeactivate: function () {
            this._wfRealBlur.detach(this._el, "blur"), this._wfRealFocus.detach(this._el, "focus")
        }
    }).extend(d.UIComponent), d.NumberFormatter = d.$Class({
        $init: function (a, b) {
            this.option({nDecimalPoint: 0}), this.option(b || {}), this.attach("beforeChange", function (a) {
                var b = a.sText, c = "", d = this.option("nDecimalPoint");
                d === 0 ? (b = b.replace(new RegExp("[^0-9" + a.sStartMark + a.sEndMark + "]", "g"), ""), b = b.replace(/^0+/, ""), b = b.replace(new RegExp("^0*" + a.sStartMark + "0*" + a.sEndMark + "0*"), a.startMark + a.endMark)) : (b = b.replace(new RegExp("[^0-9." + a.sStartMark + a.sEndMark + "]", "g"), ""), b = b.replace(/\.{2,}/g, "."), b = b.replace(/^\.+/, ""), b = b.replace(/(\.[^.]*?)(\.)/g, function () {
                    return arguments[1]
                }), b = b.replace(/^0+/, ""), b = b.replace(new RegExp("^0*" + a.sStartMark + "0*" + a.sEndMark + "0*"), a.startMark + a.endMark), b = b.replace(new RegExp("^0([^." + a.sStartMark + a.sEndMark + "]+?)", "g"), function () {
                    return arguments[1]
                })), c = this._convertCurrency(b), d > 0 && (c = this._limitDecimalPoint(c, d)), a.sText = c
            })
        }, getValue: function () {
            return this._el.value.replace(new RegExp("[," + this._aMarks[0] + this._aMarks[1] + "]+?", "g"), "")
        }, _convertCurrency: function (a) {
            var b = 0, c = "", d = a.indexOf("."), e = a.length;
            d > -1 && (e = d - 1);
            for (var f = a.length; f >= 0; f--) {
                var g = a.charAt(f);
                if (f > e) {
                    c = g + c;
                    continue
                }
                if (/[0-9]/.test(g))b >= 3 && (c = "," + c, b = 0), b++, c = g + c; else if (g == this._aMarks[0] || g == this._aMarks[1])c = g + c
            }
            return c
        }, _limitDecimalPoint: function (a, b) {
            var c = "", d = a.indexOf("."), e = a.length;
            d > -1 && (e = d - 1), d = a.indexOf(".");
            if (d > -1 && b > 0) {
                var f = 0;
                for (var g = 0; g < a.length; g++) {
                    var h = a.charAt(g), i = /[0-9]/.test(h);
                    if (i) {
                        if (f == b)continue;
                        g > d && f++
                    }
                    c += h
                }
            } else c = a;
            return c
        }
    }).extend(d.Formatter)
})("jindo"), typeof nhn == "undefined" && (nhn = {}), nhn.mobile = nhn.mobile || {}, nhn.mobile.search = nhn.mobile.search || {}, nhn.mobile.search.Exchange = $Class({
    _oKoreanCurrency: null,
    $init: function (a, b) {
        this._defineMemberProperty(b), this._assignMemberProperty(a), this._attachEvent(), this._inputExchangedValue(this._getInputValue(this._welLeftInput), this._welRightInput), this._inputFormmatedValueToBaseElement(this._welLeftInput), this._createUnit(a), this._initializeUnit(b)
    },
    _defineMemberProperty: function (a) {
        this._elRoot = null, this._welLeftInput = null, this._welRightInput = null, this._welKeyDownedInput = null, this._welLeftSpan = null, this._welRightSpan = null, this._oTRLeftInput = null, this._oTRRightInput = null, this._htCurrency = a, this._welLeftUnitSpan = null, this._welRightUnitSpan = null
    },
    _assignMemberProperty: function (a) {
        var b = $$("._exchr_cal_inp", a), c = b[0], d = b[1];
        this._welLeftInput = $Element($$.getSingle("input", c)), this._welRightInput = $Element($$.getSingle("input", d)), this._welKeyDownedInput = this._welLeftInput;
        var e = $$("span", c);
        this._welLeftSpan = $Element(e[0]), this._welLeftUnitSpan = $Element(e[1]);
        var f = $$("span", d);
        this._welRightSpan = $Element(f[0]), this._welRightUnitSpan = $Element(f[1]), this._welLeftSelect = $Element($$.getSingle("select", c)), this._welRightSelect = $Element($$.getSingle("select", d)), this._oTRLeftInput = new jindo.TextRange(this._welLeftInput.$value()), this._oTRRightInput = new jindo.TextRange(this._welRightInput.$value())
    },
    _attachEvent: function () {
        var a = [this._welLeftInput, this._welRightInput], b = [this._welLeftSelect, this._welRightSelect], c = $$.getSingle("select#ecg_ifmt3");
        $Fn(this._onInputKeyDown, this).attach(a, "keydown"), $Fn(this._onInputKeyUp, this).attach(a, "keyup"), $Fn(this._onInputClick, this).attach(a, "click"), this._isLessThanAndroid4_1_2() && $Fn(this._onInputBlur, this).attach(a, "blur"), $Fn(this._onSelectFocus, this).attach(b, "focus").attach(c, "focus"), $Fn(this._onSelectBlur, this).attach(b, "blur").attach(c, "blur"), $Fn(this._onSelectChange, this).attach(b, "change")
    },
    _inputExchangedValue: function (a, b) {
        var c = b.$value() == this._welRightInput.$value(), d = isNaN(parseFloat(a)) ? 0 : parseFloat(a), e = this._getExchangedValue(d, c), f = this._format("#,##0.00", e);
        b.text(f)
    },
    _getInputValue: function (a) {
        var b = a.text().replace(/[,\!@#$%\^&\*()]/g, "");
        return b == "." ? b = "0." : b == "" && (b = "0"), b
    },
    _inputFormmatedValueToBaseElement: function (a) {
        var b = this._getInputValue(a), c = b.indexOf(".") >= 1, d = b.split(".")[0], e = c ? "." + b.split(".")[1] : "", f = this._format("#,##0.00", parseFloat(d)), g = f.split(".")[0], h = e;
        a.text(g + h)
    },
    _getExchangedValue: function (a, b) {
        var c = this._welLeftSelect.$value(), d = this._welRightSelect.$value(), e = parseFloat(c.options[c.selectedIndex].value.replace(/,/g, "")), f = parseFloat(d.options[d.selectedIndex].value.replace(/,/g, "")), g = b ? f / e : e / f, h = a / g;
        return h
    },
    _format: function (a, b) {
        if (!a || isNaN(+b))return b;
        var b = a.charAt(0) == "-" ? -b : +b, c = b < 0 ? b = -b : 0, d = a.match(/[^\d\-\+#]/g), e = d && d[d.length - 1] || ".", d = d && d[1] && d[0] || ",", a = a.split(e), b = b.toFixed(a[1] && a[1].length), b = +b + "", f = a[1] && a[1].lastIndexOf("0"), g = b.split(".");
        if (!g[1] || g[1] && g[1].length <= f)b = (+b).toFixed(f + 1);
        f = a[0].split(d), a[0] = f.join("");
        var h = a[0] && a[0].indexOf("0");
        if (h > -1)for (; g[0].length < a[0].length - h;)g[0] = "0" + g[0]; else+g[0] == 0 && (g[0] = "");
        b = b.split("."), b[0] = g[0];
        if (g = f[1] && f[f.length - 1].length) {
            for (var f = b[0], h = "", i = f.length % g, j = 0, k = f.length; j < k; j++)h += f.charAt(j), !((j - i + 1) % g) && j < k - g && (h += d);
            b[0] = h
        }
        return b[1] = a[1] && b[1] ? e + b[1] : "", (c ? "-" : "") + b[0] + b[1]
    },
    _isLessThanAndroid4_1_2: function () {
        var a = window.navigator.userAgent, b = a.match(/Android ([\d|\.]+)/), c = !1, d;
        return b != null && b[1] != undefined && (d = b[1], c = d < "4.1.2"), c
    },
    _onInputKeyDown: function (a) {
        var b = a.$value().keyCode, c = a.$value().shiftKey, d = 48, e = 57, f = 96, g = 105, h = b == 190 || b == 110, i = b == 8, j = b == 46, k = b >= d && b <= e || b >= f && b <= g, l = a.element.value, m = !!l.match(/\./g) && h, n = l.replace(/,/g, "").length >= 13 && !i && !j;
        this._welKeyDownedInput = a.element == this._welLeftInput.$value() ? this._welLeftInput : this._welRightInput, (c || m || n || !i && !j && !h && !k) && a.stopDefault()
    },
    _onInputKeyUp: function (a) {
        var b = a.element == this._welLeftInput.$value(), c = b ? this._welLeftInput : this._welRightInput, d = b ? this._welRightInput : this._welLeftInput;
        this._inputExchangedValue(this._getInputValue(c), d), this._isLessThanAndroid4_1_2() || this._inputFormmatedValueToBaseElement(c), this._initializeUnit(this._htCurrency)
    },
    _onInputBlur: function (a) {
        this._inputFormmatedValueToBaseElement($Element(a.element))
    },
    _onInputClick: function (a) {
        var b = a.element, c = b.value.length, d = b == this._welLeftInput.$value() ? this._oTRLeftInput : this._oTRRightInput;
        d.setSelection(c, c)
    },
    _onSelectFocus: function (a) {
        $Element(a.element).addClass("cmm_slc_on")
    },
    _onSelectBlur: function (a) {
        $Element(a.element).removeClass("cmm_slc_on")
    },
    _onSelectChange: function (a) {
        var b = a.element, c = $Element(b.options[b.selectedIndex]).attr("data-unit");
        bIsKeyDownedAtLeftInput = this._welKeyDownedInput.$value() == this._welLeftInput.$value(), bIsLeftSelect = b == this._welLeftSelect.$value(), welFlagSpan = bIsLeftSelect ? this._welLeftSpan : this._welRightSpan, welUnitSpan = bIsLeftSelect ? this._welLeftUnitSpan : this._welRightUnitSpan, welBaseInput = bIsKeyDownedAtLeftInput ? this._welLeftInput : this._welRightInput, welTargetInput = bIsKeyDownedAtLeftInput ? this._welRightInput : this._welLeftInput, welFlagSpan.className("flag " + c.toLowerCase()), welUnitSpan.text(c), this._inputExchangedValue(this._getInputValue(welBaseInput), welTargetInput), this._inputFormmatedValueToBaseElement(welBaseInput), this._initializeUnit(this._htCurrency)
    },
    _createUnit: function (a) {
        this._oUnit = new nhn.mobile.search.Exchange.Unit(this, a)
    },
    _initializeUnit: function (a) {
        var b = this._getUnitOption(this._welLeftSelect, this._welLeftInput), c = this._getUnitOption(this._welRightSelect, this._welRightInput), d = this._getNationUnitName(b, c), e = this._getNationUnitValue(b, c), f = this._oUnit;
        f.setValue(this._getConverInteger(e.sLeft), this._getConverInteger(e.sRight)), f.setName(a[d.sLeft], a[d.sRight]), f.show()
    },
    _getConverInteger: function (a) {
        var b = a.replace(/[,\!@#$%\^&\*()]/g, "").split(".");
        return b
    },
    _getUnitOption: function (a, b) {
        var c = a.$value(), d = c.options[c.selectedIndex], e = b.$value();
        return {value: d.value, text: d.text, input: e.value, code: $Element(d).attr("data-unit")}
    },
    _getNationUnitName: function (a, b) {
        var c = a.code, d = b.code;
        return {sLeft: c, sRight: d}
    },
    _getNationUnitValue: function (a, b) {
        return {sLeft: a.input, sRight: b.input}
    }
}), nhn.mobile.search.Exchange.Unit = $Class({
    $init: function (a, b) {
        this._oCaller = a, this._sUnit = "경조억만", this._elLefUnit = $$.getSingle("._l_unit", b), this._elRgtUnit = $$.getSingle("._r_unit", b), this._elUnitTpl = $$.getSingle("._unitTpl", b)
    }, _getUnit: function (a, b) {
        var c = this._convertUnitValue(a.toString()), d = [], e = [], f = 0, g = c.length;
        if (g <= 1 && c[0] == 0)return b !== "undefined" && (a += "." + b), a;
        for (; f < g; f++) {
            var h = c[f];
            if (typeof h == "string") {
                var i = this._convertFormat(parseInt(d.join(""), 10));
                i != 0 && e.push(i + h), d = []
            } else d.push(h)
        }
        return oResult = e.join(""), d = this._convertFormat(parseInt(d.join(""), 10)), d !== "0" ? (b !== "undefined" && parseInt(b, 10) != 0 && (d += "." + b), oResult + d) : oResult
    }, _convertFormat: function (a) {
        return this._oCaller._format("#,##0.#", a)
    }, _getHtml: function (a) {
        return $Template(this._elUnitTpl).process({num: a})
    }, _convertUnitValue: function (a) {
        var a = a.split(""), b = this._sUnit.split(""), c = [], d = 0;
        while (a != "")d++, d % 4 == 1 ? (d != 1 && c.push(b.pop()), c.push(parseInt(a.pop(), 10))) : c.push(parseInt(a.pop(), 10));
        return c.reverse()
    }, setValue: function (a, b) {
        this._sLeftUnitValue = a[0], this._sRightUnitValue = b[0], this._sLeftUnitPointValue = a[1], this._sRightUnitPointValue = b[1]
    }, setName: function (a, b) {
        this._sLeftUnitName = a, this._sRightUnitName = b
    }, show: function () {
        $Element(this._elLefUnit).html(this._getUnit(this._sLeftUnitValue, this._sLeftUnitPointValue + "") + " " + this._sLeftUnitName), $Element(this._elRgtUnit).html(this._getUnit(this._sRightUnitValue, this._sRightUnitPointValue + "") + " " + this._sRightUnitName)
    }
})