"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __launched;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaywrightBrowser = void 0;
const playwright = __importStar(require("playwright"));
class PlaywrightBrowser {
    constructor(options) {
        var _a;
        this.options = options;
        __launched.set(this, void 0);
        (_a = this.options) !== null && _a !== void 0 ? _a : (this.options = {});
        this._init();
    }
    _init() {
        var _a;
        var _b;
        // @ts-ignore
        (_a = (_b = this.options).browserType) !== null && _a !== void 0 ? _a : (_b.browserType = "webkit" /* webkit */);
    }
    get context() {
        var _a;
        return (_a = this.currentContext) !== null && _a !== void 0 ? _a : this.defaultContext;
    }
    set context(context) {
        this._context(context);
    }
    _class() {
        if (typeof this.options.browserType !== 'string' || !(this.options.browserType in playwright)) {
            throw new TypeError(`unknown browser type: ${this.options.browserType}`);
        }
        return playwright[this.options.browserType];
    }
    executablePath() {
        return this._class().executablePath();
    }
    async launch(launchOptions, contextOptions) {
        var _a, _b;
        if (!__classPrivateFieldGet(this, __launched) || !this.browser) {
            await ((_b = (_a = this.browser) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a));
            this.browser = await this._class()
                .launch(launchOptions);
            await this._launch(contextOptions);
        }
        return this;
    }
    async connect(connectOptions, contextOptions) {
        var _a, _b;
        if (!__classPrivateFieldGet(this, __launched) || !this.browser) {
            await ((_b = (_a = this.browser) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a));
            this.browser = await this._class()
                .connect(connectOptions);
            await this._launch(contextOptions);
        }
        return this;
    }
    async _launch(contextOptions) {
        __classPrivateFieldSet(this, __launched, true);
        this.currentContext = void 0;
        this.defaultContext = await this.newContext(contextOptions);
    }
    _context(context) {
        var _a;
        (_a = this.defaultContext) !== null && _a !== void 0 ? _a : (this.defaultContext = context);
        this.currentContext = context;
        return this.currentContext;
    }
    async launchPersistentContext(...options) {
        let context = await this._class()
            .launchPersistentContext(...options);
        return this._context(context);
    }
    async launchServer(...options) {
        return this._class()
            .launchServer(...options);
    }
    get name() {
        return this._class().name();
    }
    get browserType() {
        return this.options.browserType;
    }
    async newContext(contextOptions, launchOptions) {
        let context;
        if (!__classPrivateFieldGet(this, __launched)) {
            await this.launch(launchOptions, contextOptions);
            context = this.context;
        }
        else {
            context = await this.browser.newContext(contextOptions);
        }
        return this._context(context);
    }
    async newPage() {
        if (!__classPrivateFieldGet(this, __launched)) {
            await this.launch();
        }
        return this.context.newPage();
    }
    async close() {
        var _a, _b;
        await ((_b = (_a = this.browser) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a));
        this.browser = void 0;
        __classPrivateFieldSet(this, __launched, void 0);
        return this;
    }
}
exports.PlaywrightBrowser = PlaywrightBrowser;
__launched = new WeakMap();
exports.default = PlaywrightBrowser;
//# sourceMappingURL=class.js.map