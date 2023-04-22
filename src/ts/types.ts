import { ModuleData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/packages.mjs';
import { createOverlay } from './overlay';
import { createTextCrawlHtml } from "./textCrawl";

export interface AnarchistOverlayModule extends Game.ModuleData<ModuleData> {
  createOverlay: ReturnType<typeof createOverlay>;
  createTextCrawlHtml: typeof createTextCrawlHtml;
}


export type Socketlib = {
  registerModule: (id: string) => ModuleSocket
}

export type ModuleSocket = {
  register: (method: string, handler: Function) => any;
  executeForEveryone: (method: string, ...args: any[]) => Promise<any>;
};