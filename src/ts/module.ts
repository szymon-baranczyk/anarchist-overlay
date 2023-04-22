// Do not remove this import. If you do Vite will think your styles are dead
// code and not include them in the build output.
import '../styles/overlay.scss';
import '../styles/text-crawl.scss';

import { AnarchistOverlayModule } from './types';
import { setupSocket } from './socket';
import { createOverlay, setupOverlaySocket } from './overlay';
import { moduleId } from "./constants";
import {createTextCrawlHtml} from "./textCrawl";

Hooks.once('socketlib.ready', () => {
  const module = (game as Game).modules.get(moduleId) as AnarchistOverlayModule;

  const socket = setupSocket();
  setupOverlaySocket(socket);
  module.createOverlay = createOverlay(socket);
  module.createTextCrawlHtml = createTextCrawlHtml;
});
