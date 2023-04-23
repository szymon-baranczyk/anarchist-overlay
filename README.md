# Anarchist Overlay

Example usage:

```js

const overlayConfig = {
  positionX: 'start',
  positionY: 'center'
}

const textConfig = {
  offsetX: '20px',
  offsetY: '0',
  typingTime: 2,
  delay: 1,
  blackBars: true,
  lines: [{
      text: 'MISSION 1: BUG HUNT',
      fontSize: '52px',
    },
    {
      text: 'COMBAT: TRAPDOOR SPIDER',
      fontSize: '38px',
    },
    {
      text: 'OBJECTIVE: SEARCH AND DESTROY',
      fontSize: '34px'
    },
    {
      text: 'EARLY SPRING, 5014U | HERCYNIA',
      fontSize: '20px'
    },
    {
      text: 'FOREST NEAR EVERGREEN | WEATHER: EXTREME HUMIDITY',
      fontSize: '20px'
    },
  ]
}


const anarchistOverlay = game.modules.get('anarchist-overlay');
textHtml = await anarchistOverlay.createTextCrawlHtml(textConfig);


anarchistOverlay.createOverlay(overlayConfig, textHtml);

```
Effect:

![Animation](https://user-images.githubusercontent.com/10486394/233835406-5a02eaf6-3374-491b-97ba-813512fab075.gif)
