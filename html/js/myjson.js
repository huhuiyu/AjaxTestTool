$(function() {
  var myjson = {};

  // 格式化json
  myjson.formatJson = function(json) {
    // 缩进显示json字符串
    var result = JSON.stringify(JSON.parse(json), undefined, 4);
    return myjson.syntaxHighlight(result);
  };

  // json语法高亮
  myjson.syntaxHighlight = function(json) {
    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  };

  //转换json到querystring
  myjson.parseParam = function(param, key) {
    var paramStr = '';
    if (
      param instanceof String ||
      param instanceof Number ||
      param instanceof Boolean
    ) {
      paramStr += '&' + key + '=' + encodeURIComponent(param);
    } else {
      $.each(param, function(i) {
        var k =
          key == null
            ? i
            : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += '&' + myjson.parseParam(this, k);
      });
    }
    return paramStr.substr(1);
  };

  window.myjson = myjson;
});
