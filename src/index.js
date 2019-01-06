(function(win) {
  const OKCHART = () => {
    const _init = () => {
      console.log("Hi, I am okchart");
    };

    return {
      init: _init
    };
  };
  win.okchart = OKCHART();
})(window);
