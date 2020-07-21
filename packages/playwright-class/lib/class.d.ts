import * as playwright from 'playwright';
import { LaunchOptions, BrowserContext, BrowserContextOptions, BrowserType } from 'playwright/types/types';
import { IBrowser, EnumPlaywrightBrowserType } from './types';
export declare class PlaywrightBrowser<BT extends EnumPlaywrightBrowserType = EnumPlaywrightBrowserType.webkit> {
    #private;
    protected options?: {
        browserType?: BT;
    };
    browser: IBrowser<BT>;
    defaultContext: BrowserContext;
    currentContext: BrowserContext;
    constructor(options?: {
        browserType?: BT;
    });
    protected _init(): void;
    get context(): BrowserContext;
    set context(context: BrowserContext);
    protected _class(): BrowserType<IBrowser<BT>>;
    executablePath(): string;
    launch(launchOptions?: LaunchOptions, contextOptions?: BrowserContextOptions): Promise<this>;
    connect(connectOptions?: Parameters<BrowserType<any>["connect"]>[0], contextOptions?: BrowserContextOptions): Promise<this>;
    protected _launch(contextOptions: BrowserContextOptions): Promise<void>;
    protected _context(context: BrowserContext): playwright.BrowserContext;
    launchPersistentContext(...options: Parameters<BrowserType<any>["launchPersistentContext"]>): Promise<playwright.BrowserContext>;
    launchServer(...options: Parameters<BrowserType<any>["launchServer"]>): Promise<playwright.BrowserServer>;
    get name(): BT;
    get browserType(): BT;
    newContext(contextOptions?: BrowserContextOptions, launchOptions?: LaunchOptions): Promise<playwright.BrowserContext>;
    newPage(): Promise<playwright.Page>;
    close(): Promise<this>;
}
export default PlaywrightBrowser;
