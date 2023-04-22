import { ModuleSocket } from './types';
import {moduleId} from "./constants";

export type OverlayConfig = {
  positionX?: string;
  positionY?: string;
  offsetX?: string;
  offsetY?: string;
  fadeOnClose?: boolean;
  closeTime?: number;
  closeAllWindows?: boolean;
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

  if(config.closeAllWindows) {
    closeAllWindows();
  }

  if(normalizedConfig.closeTime > 0) {
    await handleClosingOverlay(overlay, normalizedConfig);
  }

  return overlay;
};
const handleClosingOverlay = async (overlay: HTMLElement, config: NormalizedOverlayConfig) => {
  await sleeper(config.closeTime * 1000);
  if(config.fadeOnClose) {
    overlay.classList.add('fade-out');
    await sleeper(2000);
  }
  overlay.remove();
};

const normalizeConfig = (config: OverlayConfig): NormalizedOverlayConfig => {
  return {
    positionX: config.positionX || 'center',
    positionY: config.positionY || 'center',
    offsetX: config.offsetX || '0px',
    offsetY: config.offsetY || '0px',
    fadeOnClose: config.fadeOnClose || true,
    closeTime: config.closeTime || 15,
    closeAllWindows: config.closeAllWindows || true
  }
}

const sleeper = (time: number) => new Promise(resolve => setTimeout(resolve, time))

const closeAllWindows = () => {
  document.querySelectorAll('.header-button.close').forEach(button => (button as HTMLElement).click());
};
