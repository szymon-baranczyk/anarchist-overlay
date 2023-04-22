import {moduleId} from "./constants";

export type TextCrawlConfig = {
  offsetX?: string;
  offsetY?: string;
  typingTime?: number,
  delay?: number,
  blackBars?: true,
  lines: { text: string, fontSize?: string }[]
};

type NormalizedConfig = Required<TextCrawlConfig>;

export const createTextCrawlHtml = async (config: TextCrawlConfig) => {
  const normalizedConfig = normalizeConfig(config);
  return await renderTemplate(`modules/${moduleId}/templates/text-crawl.hbs`, {
    ...normalizedConfig,
    lines: normalizedConfig.lines.map((line, index) => ({
      ...line,
      typingTime: normalizedConfig.typingTime,
      textLength: line.text.length,
      cursorDelay: (normalizedConfig.typingTime + normalizedConfig.delay) * 2,
      startDelay: (normalizedConfig.delay + normalizedConfig.typingTime) * index
    }))
  });
}


const normalizeConfig = (config: TextCrawlConfig): NormalizedConfig => {
  return {
    offsetX: config.offsetX || '0',
    offsetY: config.offsetY || '0',
    typingTime: config.typingTime || 2,
    delay: config.delay || 1,
    blackBars: config.blackBars || true,
    lines: config.lines.map(lines => ({text: lines.text, fontSize: lines.fontSize || '32px'}))
  };
}