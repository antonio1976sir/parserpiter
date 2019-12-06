// ==UserScript==
// @name         parser
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Fixed some bugs for comfortable work
// @author       antoniosir
// @grant        GM_getResourceText
// @resource     jQuery https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @resource     idb http://nparashuram.com/jquery-indexeddb/dist/jquery.indexeddb.js
// @resource     parser file:///c:/js/parser-piter.user.js
//https://github.com/antonio1976sir/parserpiter/raw/master/parser-piter.user.js
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

//  var script_inserted = document.getElementById('parser');
    $(document).ready(function(){start();})
 //if (script_inserted != null) {
 //   var $ = unsafeWindow.$;
 //   console.log(script_inserted)
 //   start();
 // }
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
      $.indexedDB("parserpiter").objectStore("paramslist").get("searchrn").done(function (item) {
      if (item.valparam > -1 ) {
    search();
      }
      })
  }

  $.indexedDB("parserpiter").objectStore("paramslist").get("searchrn").done(function (item) {
    if (item.valparam >= -1 ) {
      parsing_page();
    }
  })
  //search();

  if (location.href.indexOf('internet-piter.ru') > -1 && jQuery(".head_lnk4").length > 0) {
      //td .head_lnk4
//заготовка для openbox
      //var arr_param=jQuery("div[id=div-parameters] input[type=radio]").map(function(ir,rn){return(jQuery(rn).attr("id")+'-'+jQuery("div[id=txt_"+jQuery(rn).attr("id")+"] input:checked").map(function(im,metro){return(jQuery(metro).attr("id"))}).get())})
    jQuery("table .panel_menu:first").before('<style type="text/css">\
                                              .tabs { width: 100%; padding: 0px; margin: 0 auto; }\
                                              .tabs>input { display: none; }\
                                              .tabs>div {\
                                                  display: none;\
                                                  padding: 12px;\
                                                  border: 1px solid #C0C0C0;\
                                                  background: #FFFFFF;}\
                                              .tabs>label {\
                                                  display: inline-block;\
                                                  padding: 7px;\
                                                  margin: 0 -5px -1px 0;\
                                                  text-align: center;\
                                                  color: #666666;\
                                                  border: 1px solid #C0C0C0;\
                                                  background: #E0E0E0;\
                                                  cursor: pointer;}\
                                             .tabs>input:checked + label {\
                                                      color: #000000;\
                                                      border: 1px solid #C0C0C0;\
                                                      border-bottom: 1px solid #FFFFFF;\
                                                      background: #FFFFFF;}\
                                                  #УправлениеБД:checked ~ #txt_УправлениеБД,\
                                                  #Фрунзенский:checked ~ #txt_Фрунзенский,\
                                                  #Василеостровский:checked ~ #txt_Василеостровский,\
                                                  #Выборгский:checked ~ #txt_Выборгский,\
                                                  #Приморский:checked ~ #txt_Приморский,\
                                                  #Калининский:checked ~ #txt_Калининский,\
                                                  #Красногвардейский:checked ~ #txt_Красногвардейский,\
                                                  #Московский:checked ~ #txt_Московский,\
                                                  #Петроградский:checked ~ #txt_Петроградский { display: block; }\
                                                  </style>\
<div id="div-parametersbd" class="tabs" style="display:none">\
<input type="radio" name="insetbd" value="" id="УправлениеБД" checked>\
    <label for="УправлениеБД">Управление БД</label>\
<div id="txt_УправлениеБД">\
<input type="button" id="recreatebd" value="Пересоздать базу данных" name="recreatebd" OnClick="recreate_bd();">\
</div>\
</div>\
<div id="div-parameters" class="tabs" style="display:none">\
    <input type="radio" name="inset" value="" id="Фрунзенский" checked>\
    <label for="Фрунзенский">Фрунзенский</label>\
    <input type="radio" name="inset" value="" id="Василеостровский">\
    <label for="Василеостровский">Василеостровский</label>\
    <input type="radio" name="inset" value="" id="Выборгский">\
    <label for="Выборгский">Выборгский</label>\
    <input type="radio" name="inset" value="" id="Приморский">\
    <label for="Приморский">Приморский</label>\
    <input type="radio" name="inset" value="" id="Калининский">\
    <label for="Калининский">Калининский</label>\
    <input type="radio" name="inset" value="" id="Красногвардейский">\
    <label for="Красногвардейский">Красногвардейский</label>\
    <input type="radio" name="inset" value="" id="Московский">\
    <label for="Московский">Московский</label>\
    <input type="radio" name="inset" value="" id="Петроградский">\
    <label for="Петроградский">Петроградский</label>\
<div id="txt_Фрунзенский">\
     <input type="checkbox" name="insetmetro" value="" id="Бухарестская" checked>\
    <label for="Бухарестская">Бухарестская</label><br>\
      <input type="checkbox" name="insetmetro" value="" id="Волковская" checked>\
    <label for="Волковская">Волковская</label><br>\
     <input type="checkbox" name="insetmetro" value="" id="Международная" checked>\
    <label for="Международная">Международная</label><br>\
     <input type="checkbox" name="insetmetro" value="" id="Парк Победы" checked>\
    <label for="Парк Победы">Парк Победы</label><br>\
     <input type="checkbox" name="insetmetro" value="" id="Проспект Славы" checked>\
    <label for="Проспект Славы">Проспект Славы</label>\
    </div>\
    <div id="txt_Василеостровский">\
         <input type="checkbox" name="insetmetro" value="1" id="Василеостровская" checked>\
    <label for="Василеостровская">Василеостровская</label><br>\
      <input type="checkbox" name="insetmetro" value="2" id="Приморская" checked>\
    <label for="Приморская">Приморская</label><br>\
    </div>\
    <div id="txt_Выборгский">  \
     <input type="checkbox" name="insetmetro" value="" id="Выборгская" checked>\
    <label for="Выборгская">Выборгская</label><br>\
      <input type="checkbox" name="insetmetro" value="" id="Лесная" checked>\
    <label for="Лесная">Лесная</label><br>\
     <input type="checkbox" name="insetmetro" value="" id="Озерки" checked>\
    <label for="Озерки">Озерки</label><br>\
     <input type="checkbox" name="insetmetro" value="" id="пл.Ленина" checked>\
    <label for="пл.Ленина">пл.Ленина</label><br>\
     <input type="checkbox" name="insetmetro" value="" id="пл.Мужества" checked>\
    <label for="пл.Мужества">пл.Мужества</label><br>\
    <input type="checkbox" name="insetmetro" value="" id="Политехническая" checked>\
    <label for="Политехническая">Политехническая</label><br>\
     <input type="checkbox" name="insetmetro" value="" id="пр.Просвещения" checked>\
    <label for="пр.Просвещения">пр.Просвещения</label><br>\
     <input type="checkbox" name="insetmetro" value="" id="Удельная" checked>\
    <label for="Удельная">Удельная</label>\
    </div>\
    <div id="txt_Приморский">\
        <img src="image/logo.png" width="533" height="77" alt="!!!">\
    </div></div>\
<script type="text/javascript">\
function openbox(id){\
    display = document.getElementById(id).style.display;\
    if(display=="none"){\
       document.getElementById(id).style.display="block";\
       document.getElementById("initparambtn").value="Сохранить настройки"\
    }else{\
       document.getElementById(id).style.display="none";\
       document.getElementById("initparambtn").value="Настройки поиска"\
       \
    }\
} \
</script>\
<script type="text/javascript">\
function preview(){\
mywindow=open("","preview","width=700,height=700,status=1,menubar=1");\
mywindow.document.open();\
mywindow.document.write("<html><head><title>Предварительный просмотр данных отобранных для фида");\
mywindow.document.write("</title></head><body>");\
var ttxText="<table width=\'100%\' border=\'1\' cellspacing=\'1\' cellpadding=\'1\'>";\
$.indexedDB("parserpiter").objectStore("arenda_records").each(function(item)\
                                             {ttxText=ttxText+(JSON.stringify(item.value)+" ").replace(/({\"id\":\"?)(.+)(\"?})/g,(match,p1,p2,p3)=>"<tr><td>"+p2+"</td></tr>").replace(/\"?,\"[a-z0-9-_]+\":\"?/g,"</td><td>");}).then(function(){console.dir(ttxText);\
ttxText=ttxText+"</table>";\
mywindow.document.write(ttxText);\
mywindow.document.write("Это статичный текст");\
mywindow.document.write("</body></html>");\
mywindow.document.close();})\
}\
</script>\
<style type="text/css">.mydivcontainer {display: grid;grid-template-columns: 1fr 1fr 1fr;grid-template-rows: auto auto auto;</style>\
                                          <div class="mydivcontainer">\
                                          <div><input type="button" id="initparambtn" value="Настройки поиска" name="initparam" OnClick="openbox(\'div-parameters\');">\
                                               <input type="button" id="initparambtnbd" value="Управление базой данных" name="initparambd" OnClick="openbox(\'div-parametersbd\');">   </div>\
                                          <div><input type="button" value="Автоматический сбор данных " name="getdata" OnClick="init_parsing();"></div>\
                                          <div><input type="button" value="Собрать картинки и проверить актуальность" name="getimg" OnClick="getimg();"></div>\
                                          <div><input type="button" value="Предварительный просмотр" name="preview" OnClick="preview();"></div>\
                                          <div><input type="button" value="Создать фид для циан" name="formfid" OnClick="formfid();"></div>\
                                          <div><input type="button" value="Создать фид для yandex" name="yandexfid" OnClick="formyandexfid();"></div>\
                                          <div><input type="button" value="перейти к записи №" name="gotorec" OnClick="gotorec(jQuery(\'[name=keyidvalue]\')[0].value)"><input type="text" name="keyidvalue" width="50px"></div>\
                                          </div>');

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
    jQuery('.link_block .tbl04 .st03').before('<br><input type="button" value="Записать в БД" name="getonerecord"  style="display:inline-block;padding: 10px 20px;border:2px solid #f00;color:#f00;background:#fff;border-radius:5px;margin: 20px;font-size: 15px;" onclick="parsing_one_rec()">');
    jQuery('.link_block .tbl04 .st03').before('<br><a style="display:inline-block;padding: 10px 20px;border:2px solid #f00;color:#f00;background:#fff;border-radius:5px;margin: 20px;font-size: 15px;" onclick="jQuery(this).attr(\'style\',jQuery(this).attr(\'style\') + \'opacity:0.5;\').text(\'Ожидайте...\');" href="https://vspb.pro/download.php?id=' + id + '&date=' + date + '&images=' + imgs.join(',') + '" download>Скачать фото архивом</a>');
  };
}
