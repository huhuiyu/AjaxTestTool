$(function() {
  var emptyfn = function() {};
  var tokenKey = 'sessiontoken';

  var dataService = {
    baseurl: ''
  };
  window.dataService = dataService;

  function saveToken(token) {
    sessionStorage.setItem(tokenKey, token);
  }

  function loadToken() {
    var t = sessionStorage.getItem(tokenKey);
    t = t ? t : '';
    return t;
  }

  function removeToken() {
    sessionStorage.removeItem(tokenKey);
  }

  dataService.loadToken = loadToken;

  dataService.setBaseUrl = function(url) {
    dataService.baseurl = url;
  };

  dataService.getBaseUrl = function() {
    return dataService.baseurl;
  };

  dataService.send = function(url, params, cb) {
    if (!params) {
      params = {};
    }
    params.token = loadToken();

    if (!cb) {
      cb = emptyfn;
    }
    console.log('dataService.send', params);
    $.ajax({
      url: dataService.baseurl + url,
      data: params,
      type: 'POST',
      dataType: 'json',
      success: function(data) {
        if (data && data.token) {
          saveToken(data.token);
        }
        cb(data);
      },
      error: function(xhr, status, errorThrown) {
        console.log(xhr, status, errorThrown);
        cb({
          success: false,
          code: 500,
          message: '处理数据发生错误，请检查服务器是否正常连接'
        });
      }
    });
  };

  dataService.saveFile = function(url, file, params, cb) {
    if (!params) {
      params = {};
    }
    params.token = loadToken();
    if (!cb) {
      cb = emptyfn;
    }

    var formData = new FormData();
    formData.append('file', file[0].files[0]);
    for (var p in params) {
      formData.append('' + p, params[p]);
    }
    console.log('dataService.send', params);
    $.ajax({
      url: dataService.baseurl + url,
      type: 'POST',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        if (data && data.token) {
          saveToken(data.token);
        }
        cb(data);
      },
      error: function(data) {
        cb({
          success: false,
          code: 500,
          message: '处理数据发生错误:' + JSON.stringify(data)
        });
      }
    });
  };
});
