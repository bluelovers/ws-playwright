import * as playwright from 'playwright';
import { LaunchOptions, BrowserContext, BrowserContextOptions, BrowserType } from 'playwright/types/types';
import { IBrowser, EnumPlaywrightBrowserType } from './types';

export class PlaywrightBrowser<BT extends EnumPlaywrightBrowserType = EnumPlaywrightBrowserType.webkit>
{
	browser: IBrowser<BT>;

	defaultContext: BrowserContext;
	currentContext: BrowserContext;

	#_launched: boolean;

	constructor(protected options?: {
		browserType?: BT
	})
	{
		this.options ??= {};
		this._init()
	}

	protected _init()
	{
		// @ts-ignore
		this.options.browserType ??= EnumPlaywrightBrowserType.webkit;
	}

	get context()
	{
		return this.currentContext ?? this.defaultContext
	}

	set context(context: BrowserContext)
	{
		this._context(context)
	}

	protected _class(): BrowserType<IBrowser<BT>>
	{
		if (typeof this.options.browserType !== 'string' || !(this.options.browserType in playwright))
		{
			throw new TypeError(`unknown browser type: ${this.options.browserType}`)
		}

		return playwright[this.options.browserType] as any
	}

	executablePath()
	{
		return this._class().executablePath()
	}

	async launch(launchOptions?: LaunchOptions, contextOptions?: BrowserContextOptions)
	{
		if (!this.#_launched || !this.browser)
		{
			await this.browser?.close?.();

			this.browser = await this._class()
				.launch(launchOptions)
			;

			await this._launch(contextOptions);
		}

		return this
	}

	async connect(connectOptions?: Parameters<BrowserType<any>["connect"]>[0], contextOptions?: BrowserContextOptions)
	{
		if (!this.#_launched || !this.browser)
		{
			await this.browser?.close?.();

			this.browser = await this._class()
				.connect(connectOptions)
			;

			await this._launch(contextOptions);
		}

		return this
	}

	protected async _launch(contextOptions: BrowserContextOptions)
	{
		this.#_launched = true

		this.currentContext = void 0;
		this.defaultContext = await this.newContext(contextOptions);
	}

	protected _context(context: BrowserContext)
	{
		this.defaultContext ??= context;
		this.currentContext = context;

		return this.currentContext
	}

	async launchPersistentContext(...options: Parameters<BrowserType<any>["launchPersistentContext"]>)
	{
		let context = await this._class()
			.launchPersistentContext(...options)
		;

		return this._context(context)
	}

	async launchServer(...options: Parameters<BrowserType<any>["launchServer"]>)
	{
		return this._class()
			.launchServer(...options)
		;
	}

	get name(): BT
	{
		return this._class().name()  as any
	}

	get browserType()
	{
		return this.options.browserType
	}

	async newContext(contextOptions?: BrowserContextOptions, launchOptions?: LaunchOptions)
	{
		let context: BrowserContext;

		if (!this.#_launched)
		{
			await this.launch(launchOptions, contextOptions);

			context = this.context;
		}
		else
		{
			context = await this.browser.newContext(contextOptions);
		}

		return this._context(context)
	}

	async newPage()
	{
		if (!this.#_launched)
		{
			await this.launch();
		}

		return this.context.newPage()
	}

	async close()
	{
		await this.browser?.close?.();

		this.browser = void 0;
		this.#_launched = void 0;

		return this
	}

}

export default PlaywrightBrowser
