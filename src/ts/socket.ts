import {moduleId} from "./constants";
import {Socketlib} from "./types";




declare const socketlib: Socketlib;
export const setupSocket = () => {
  return socketlib.registerModule(moduleId);
}