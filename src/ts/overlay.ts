import { ModuleSocket } from './types';
import {moduleId} from "./constants";

export type OverlayConfig = {
  positionX?: string;
  positionY?: string;
  offsetX?: string;
  offsetY?: string;

}
export const createOverlay = (socket: ModuleSocket) => (config: OverlayConfig, html: string) => {
  if(!(game as Game).user?.isGM) {
    throw new Error('Only GM can create overlays.')
  }
  return socket.executeForEveryone('createOverlay', config, html);
}
export const setupOverlaySocket = (socket: ModuleSocket) => {
  socket.register('createOverlay', handleOverlayCreation);
}

const handleOverlayCreation = async (config: OverlayConfig) => {
  let template = await renderTemplate(`modules/${moduleId}/templates/overlay.hbs`, config);
  const overlay = $(template).get()[0];
  document.body.append(overlay)
  return overlay;
};
