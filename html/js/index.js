$(function() {
  console.log('Ajax测试工具（服务器端需要允许跨域）');

  var app = new Vue({
    el: '#app',
    data: {
      welcome: 'Ajax测试工具（服务器端需要允许跨域）',
      server: 'http://127.0.0.1:14000',
      path: '',
      sendinfo: '{}',
      result: '',
      fresult: '',
      geturl: '',
      imageCodeUrl: '',
      ts: '',
      token: '',
      upfileurl: ''
    },
    methods: {
      send: function() {
        dataService.setBaseUrl(app.$data.server);
        try {
          var url = dataService.getBaseUrl() + this.path;
          var sendData = JSON.parse(this.sendinfo);
          this.geturl =
            'get提交的url：' + (url + '?' + myjson.parseParam(sendData));
          dataService.send(this.path, sendData, function(data) {
            app.$data.result = data;
            app.$data.fresult = myjson.formatJson(JSON.stringify(data));
            app.$data.token = dataService.loadToken();
          });
        } catch (error) {
          app.$data.result = '处理发生错误：' + error;
        }
      },
      getImage: function() {
        app.$data.ts = new Date().getTime();
      },
      upload: function() {
        dataService.setBaseUrl(app.$data.server);
        var sendData = JSON.parse(this.sendinfo);
        dataService.saveFile(this.upfileurl, $('#upfile'), sendData, function(
          data
        ) {
          app.$data.result = data;
          app.$data.fresult = myjson.formatJson(JSON.stringify(data));
          app.$data.token = dataService.loadToken();
        });
      }
    }
  });

  app.$data.token = dataService.loadToken();
});
