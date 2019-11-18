// ==UserScript==
// @name         parser 
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fixed some bugs for comfortable work 
// @author       antoniosir
// @grant        GM_getResourceText
// @resource     jQuery https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @resource     idb http://nparashuram.com/jquery-indexeddb/dist/jquery.indexeddb.js
// @resource     parser https://github.com/antonio1976sir/parserpiter/blob/master/parser-piter.user.js
// @match        https://*.pin7.ru/*
// @match        https://*.arenda-piter.ru/*
// @match        https://*.internet-piter.ru/*
// @copyright 2019, antoniosir (https://openuserjs.org/users/antoniosir)
// @updateURL https://openuserjs.org/meta/antoniosir/parser.meta.js
// @license MIT
// ==/UserScript==
var recs = [];
var data = [];

(function () {
  var head = document.getElementsByTagName('head')[0];
//parser file:///c:/js/parser-piter.user.js
  var script = document.createElement('script');
  script.id = 'jquery';
  script.type = 'text/javascript';

  var jQuery = GM_getResourceText('jQuery');

  script.innerHTML = jQuery;
  head.appendChild(script);

  var idbscript = document.createElement('script');
  idbscript.id = 'idb';
  idbscript.type = 'text/javascript';

  var Idb = GM_getResourceText('idb');

  idbscript.innerHTML = Idb;
  head.appendChild(idbscript);

  var myscript = document.createElement('script');
  myscript.id = 'parser';
  myscript.type = 'text/javascript';
  var Parser = GM_getResourceText('parser');
  myscript.innerHTML = Parser;
  //myscript.src="file:///c:/js/parser-piter.user.js";
  head.appendChild(myscript);

  script_inserted = document.getElementById('jquery');
  if (script_inserted != null) {
    $ = unsafeWindow.$;

    start();

  }
})();

function loaded() {
  var imgs = [];
  jQuery(".link_block .swiper-wrapper img").each(function () {
    var j = jQuery(this);
    console.log("!!!");
    imgs.push(j.attr("src"));

  });
  console.log(imgs);
}

function start() {
  var imgs = [],
    counter = 1;
  //alert("start");
  /*if ((location.href.indexOf('internet-piter.ru')> -1 || location.href.indexOf('internet-piter.ru/master_search/')>-1) && jQuery("[name='getdata']").length>0) {
      alert("start");
  $.indexedDB("parserpiter").objectStore("paramslist").get("parsercnt").done(function(item){
           if (item.valparam==0) {search();}
                     else
                     {

                      }
   });
  }*/

  if (location.href.indexOf('internet-piter.ru/master_search/') > -1) {
    search();
  }

  $.indexedDB("parserpiter").objectStore("paramslist").get("searchrn").done(function (item) {
    if (item.valparam >= -1) {
      parsing_page();
    }
  })
  //search();

  if (location.href.indexOf('internet-piter.ru') > -1 && jQuery(".head_lnk4").length > 0) {
    jQuery("td .head_lnk4:first").before('<input type="button" value="Собрать данные" name="getdata" OnClick="init_parsing();">');
    jQuery("td .head_lnk4:first").before('<input type="button" value="Собрать картинки" name="getimg" OnClick="getimg();">');
    jQuery("td .head_lnk4:first").before('<input type="button" value="Создать фид для циан" name="formfid" OnClick="formfid();">');

  }

  if (location.href.indexOf('pin7.ru') > -1 && jQuery(".st01 .br_img img").length > 0) {
    var id = jQuery('.tdm_11 em').text(),
      date = 0;

    jQuery(".st01 .br_img img").each(function () {
      var img = jQuery(this).attr('src').split('&');
      date = img[1].replace('ff=', '').replace('20', '');
      var file = img[0].replace('lupa.php?fn=' + id + '_f', '').replace('.jpg', '');
      imgs.push(file);
    });

    jQuery('.tdm_08').append('<br><a style="display:inline-block;padding: 10px 20px;border:2px solid #f00;color:#f00;background:#fff;border-radius:5px;margin: 20px;font-size: 15px;" onclick="jQuery(this).attr(\'style\',jQuery(this).attr(\'style\') + \'opacity:0.5;\').text(\'Ожидайте...\');" href="https://vspb.pro/download.php?id=' + id + '&date=' + date + '&images=' + imgs.join(',') + '" download>Скачать фото архивом</a>');
  }

  if (location.href.indexOf('arenda-piter.ru') > -1 && jQuery(".link_block .swiper-wrapper img").length > 0) {
    var id = jQuery('.trm_01').attr('id').replace('idtr', ''),
      date = 0;

    jQuery(".link_block .swiper-wrapper img").each(function () {

      if (jQuery(this).attr('data-src') !== undefined)
        var img = jQuery(this).attr('data-src').split('&');
      else
        var img = jQuery(this).attr('src').split('&');

      date = img[1].replace('ff=', '').replace('20', '');
      var file = img[0].replace('/lupa_min.php?fn=' + id + '_f', '').replace('.jpg', '');
      imgs.push(file);
    });

    jQuery('.link_block .tbl04 .st03').before('<br><a style="display:inline-block;padding: 10px 20px;border:2px solid #f00;color:#f00;background:#fff;border-radius:5px;margin: 20px;font-size: 15px;" onclick="jQuery(this).attr(\'style\',jQuery(this).attr(\'style\') + \'opacity:0.5;\').text(\'Ожидайте...\');" href="https://vspb.pro/download.php?id=' + id + '&date=' + date + '&images=' + imgs.join(',') + '" download>Скачать фото архивом</a>');
  }

  if (location.href.indexOf('internet-piter.ru') > -1 && jQuery(".link_block .swiper-wrapper img").length > 0) {
    var id = jQuery('.trm_01').attr('id').replace('idtr', ''),
      date = 0;

    jQuery(".link_block .swiper-wrapper img").each(function () {

      if (jQuery(this).attr('data-src') !== undefined)
        var img = jQuery(this).attr('data-src').split('&');
      else
        var img = jQuery(this).attr('src').split('&');

      date = img[1].replace('ff=', '').replace('20', '');
      var file = img[0].replace('/lupa_min.php?fn=' + id + '_f', '').replace('.jpg', '');
      imgs.push(file);
    });

    jQuery('.link_block .tbl04 .st03').before('<br><a style="display:inline-block;padding: 10px 20px;border:2px solid #f00;color:#f00;background:#fff;border-radius:5px;margin: 20px;font-size: 15px;" onclick="jQuery(this).attr(\'style\',jQuery(this).attr(\'style\') + \'opacity:0.5;\').text(\'Ожидайте...\');" href="https://vspb.pro/download.php?id=' + id + '&date=' + date + '&images=' + imgs.join(',') + '" download>Скачать фото архивом</a>');
  };
}
