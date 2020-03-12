new Vue({
  el: '#app',
  data: {
    // 現在時刻
    current: new Date(),
    startTime: new Date()
  },
  // 起動時にタイマーを設定
  created() {
    let that = this;
    // 1000ミリ秒スパンでcurrentプロパティを更新
    this.timer = setInterval(() => {
      that.current = new Date();
    }, 1000);
  },
  computed: {
    calTime() {
      let sec = this.current - this.startTime;
      const hour = Math.floor(sec / 3600000);
      const minute = Math.floor((sec - 3600000 * hour) / 60000);
      const hh = ('00' + hour).slice(-2);
      const mm = ('00' + minute).slice(-2);
      const ms = ('00000' + (sec % 60000)).slice(-5);

      const time = `${hh}:${mm}:${ms.slice(0, 2)}`;
      return time;
    }
  },
  // 終了後にタイマーを破棄
  beforeDestroy() {
    clearInterval(this.timer);
  },
});