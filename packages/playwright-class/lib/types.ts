import { WebKitBrowser, ChromiumBrowser, FirefoxBrowser } from 'playwright/types/types';

export const enum EnumPlaywrightBrowserType
{
	webkit = 'webkit',
	chromium = 'chromium',
	firefox = 'firefox',
}

export type IBrowser<T extends EnumPlaywrightBrowserType> = T extends EnumPlaywrightBrowserType.webkit
	? WebKitBrowser
	: T extends EnumPlaywrightBrowserType.chromium
		? ChromiumBrowser
		: T extends EnumPlaywrightBrowserType.firefox
			? FirefoxBrowser
			: never
	;
