const COLOR = {
    RED: 0,
    YELLOW : 1,
    GREEN : 2,
  }
  
  const APP_TEXTS = {
    RED_ACTION_DESCRIPTION:"Stop",
    YELLOW_ACTION_DESCRIPTION:"Prepare",
    GREEN_ACTION_DESCRIPTION:"Drive",
    DEFAULT:"Right of way rule"
  }
  
  const light = COLOR.RED;
  
  if (light == COLOR.RED) {
    console.log(APP_TEXTS.RED_ACTION_DESCRIPTION);
  } else if (light == COLOR.YELLOW) {
    console.log(APP_TEXTS.YELLOW_ACTION_DESCRIPTION);
  } else if (light == COLOR.GREEN) {
    console.log(APP_TEXTS.GREEN_ACTION_DESCRIPTION);
  } else{
    console.log(APP_TEXTS.DEFAULT);
  }