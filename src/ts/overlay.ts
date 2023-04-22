import { ModuleSocket } from './types';
import {moduleId} from "./constants";

export type OverlayConfig = {
  positionX?: string;
  positionY?: string;
  offsetX?: string;
  offsetY?: string;
}

type NormalizedOverlayConfig = Required<OverlayConfig>;

export const createOverlay = (socket: ModuleSocket) => (config: OverlayConfig, html: string) => {
  if(!(game as Game).user?.isGM) {
    throw new Error('Only GM can create overlays.')
  }
  return socket.executeForEveryone('createOverlay', config, html);
}
export const setupOverlaySocket = (socket: ModuleSocket) => {
  socket.register('createOverlay', handleOverlayCreation);
}

const handleOverlayCreation = async (config: OverlayConfig, html: string) => {
  const normalizedConfig = normalizeConfig(config);
  let template = await renderTemplate(`modules/${moduleId}/templates/overlay.hbs`, normalizedConfig);
  const overlay = $(template).get()[0];
  overlay.innerHTML = html;
  document.body.append(overlay);
  return overlay;
};

const normalizeConfig = (config: OverlayConfig): NormalizedOverlayConfig => {
  return {
    positionX: config.positionX || 'start',
    positionY: config.positionY || 'start',
    offsetX: config.offsetX || '0px',
    offsetY: config.offsetY || '0px'
  }
}
