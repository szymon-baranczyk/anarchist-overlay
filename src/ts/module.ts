// Do not remove this import. If you do Vite will think your styles are dead
// code and not include them in the build output.
import '../styles/style.scss';
import { moduleId } from './constants';
import { AnarchistOverlayModule } from './types';
import { setupSocket } from './socket';
import { createOverlay, setupOverlaySocket } from './overlay';

let module: AnarchistOverlayModule;

Hooks.once('init', () => {
  console.log(`Initializing ${moduleId}`);

  module = (game as Game).modules.get(moduleId) as AnarchistOverlayModule;
});

Hooks.once('socketlib.ready', () => {
  const socket = setupSocket();
  setupOverlaySocket(socket);
  module.createOverlay = createOverlay(socket);
});
