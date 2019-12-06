var raions = ["Фрунзенский район", "Василеостровский район", "Выборгский район", "Приморский район", "Калининский район", "Красногвардейский район", "Московский район", "Петроградский район"];
var metro = new Map([["Фрунзенский район", "Бухарестская;Волковская;Международная;Парк Победы;Проспект Славы"], ["Василеостровский район", "Василеостровская;Приморская"], ["Выборгский район", "Выборгская;Лесная;Озерки;пл.Ленина;пл.Мужества;Политехническая;пр.Просвещения;Удельная"], ["Приморский район", "Беговая;Комендантский пр.;Пионерская;Старая Деревня;Черная речка"], ["Калининский район", "Академическая;Выборгская;Гражданский пр.;Лесная;пл.Ленина;пл.Мужества;Политехническая"], ["Красногвардейский район", "Невский пр.;Большевиков пр.;Дыбенко ул.;Елизаровская;Ладожская;Новочеркасская;Пролетарская;Рыбацкое"], ["Московский район", "Звездная;Московская;Московские ворота;Парк Победы;Фрунзенская;Электросила"], ["Петроградский район", "Горьковская;Петроградская;Спортивная;Черная речка;Чкаловская"]])
var r_tags = new Map([["Меб", "room-furniture"], ["Тв", "television"], ["Тел", "phone"], ["Инт", "internet"], ["СтМ", "washing-machine"], ["Хол", "refrigerator"]]);
var cian_metro = '<metro><location id="167">Девяткино</location><location id="168">Гражданский проспект</location><location id="169">Академическая</location><location id="170">Политехническая</location><location id="171">Площадь Мужества</location><location id="172">Лесная</location><location id="173">Выборгская</location><location id="174">Площадь Ленина</location><location id="175">Чернышевская</location><location id="176">Площадь Восстания</location><location id="177">Владимирская</location><location id="178">Пушкинская</location><location id="179">Технологический институт</location><location id="180">Балтийская</location><location id="181">Нарвская</location><location id="182">Кировский завод</location><location id="183">Автово</location><location id="184">Ленинский проспект</location><location id="185">Проспект Ветеранов</location><location id="186">Парнас</location><location id="187">Проспект Просвещения</location><location id="188">Озерки</location><location id="189">Удельная</location><location id="190">Пионерская</location><location id="191">Черная речка</location><location id="192">Петроградская</location><location id="193">Горьковская</location><location id="194">Невский проспект</location><location id="195">Сенная площадь</location><location id="197">Фрунзенская</location><location id="198">Московские ворота</location><location id="199">Электросила</location><location id="200">Парк Победы</location><location id="201">Московская</location><location id="202">Звездная</location><location id="203">Купчино</location><location id="204">Приморская</location><location id="205">Василеостровская</location><location id="206">Гостиный двор</location><location id="207">Маяковская</location><location id="208">Площадь Александра Невского</location><location id="210">Елизаровская</location><location id="211">Ломоносовская</location><location id="212">Пролетарская</location><location id="213">Обухово</location><location id="214">Рыбацкое</location><location id="215">Комендантский проспект</location><location id="216">Старая Деревня</location><location id="217">Крестовский остров</location><location id="218">Чкаловская</location><location id="219">Спортивная</location><location id="220">Садовая</location><location id="221">Достоевская</location><location id="222">Лиговский проспект</location><location id="224">Новочеркасская</location><location id="225">Ладожская</location><location id="226">Проспект Большевиков</location><location id="227">Улица Дыбенко</location><location id="230">Волковская</location><location id="231">Звенигородская</location><location id="232">Спасская</location><location id="241">Обводный канал</location><location id="242">Адмиралтейская</location><location id="246">Международная</location><location id="247">Бухарестская</location><location id="355">Беговая</location><location id="356">Новокрестовская</location><location id="357">Проспект Славы</location><location id="358">Дунайская</location><location id="359">Шушары</location><location id="382">Горный институт</location></metro>';
var phone = "+79216322696";
var agentname = "Андрей";
var flag_iframe_loaded = false;
var flag_iframe_created = false;
var item_for_iframe = {};
var key_for_iframe = 0;
var getparambyname;
var first50 = true;
//собирать только первую страницу в выдаче поиска
var storage_time = 3600;
//время хранения записи в БД в секундах

function gotorec(keyid) {
    $.indexedDB("parserpiter").objectStore("arenda_records").get(keyid).then(function(result) {
       document.location.href =location.href.match(/.*ru/) + result.imgs_link;
    })
}

function formyandexfid() {
    var ku = '';
    var res = '<?xml version="1.0" encoding="UTF-8"?>\n';
    res = res + '<realty-feed xmlns="http://webmaster.yandex.ru/schemas/feed/realty/2010-06">\n';
    res = res + '<generation-date>' + Date() + '</generation-date>'
    $.indexedDB("parserpiter").objectStore("arenda_records").each(function(item) {
        res = res + '<offer internal-id="' + item.key + '">\n';
        res = res + '<type>аренда</type>\n';
        res = res + '<property-type>жилая</property-type>\n';
        res = res + '<category>квартира</category>\n';
        res = res + '<creation-date>' + Date() + '</creation-date>\n';
        res = res + '<location>\n';
        res = res + '<country>Россия</country>\n';
        res = res + '<locality-name>Санкт-Петербург</locality-name>\n';
        res = res + '<address>' + item.value.street_house + '</address>\n';
        res = res + '<latitude>' + item.value.geo2 + '</latitude>\n'
        res = res + '<longitude>' + item.value.geo1 + '</longitude>\n'
        var a = item.value.metro.split(",");
        a.forEach(function(current_value) {
            var offset = current_value.search(/(\d+\s((м\.тр\.)+|(м\.п\.)+))$/);
            var distancemetro = '10 м.п.';
            if (offset != -1) {
                distancemetro = current_value.substr(offset);
            }
            var metroid = current_value.match(/[а-яА-Я\s\.]+/)[0].trim();

            res = res + '<metro>\n'
            res = res + '<name>' + metroid + '</name>\n';

            if (distancemetro.split(" ")[1].includes('м.п.')) {
                res = res + '<time-on-foot>' + distancemetro.split(" ")[0] + '</time-on-foot>\n'
            }
            if (distancemetro.split(" ")[1].includes('м.тр.')) {
                res = res + '<time-on-transport>' + distancemetro.split(" ")[0] + '</time-on-transport>\n'
            }
            res = res + '</metro>\n';
            //$(jQuery.parseXML(cian - metro)).find("location:contains('" + metroid + "')").attr("id");
        })

        res = res + '</location>\n';
        res = res + '<sales-agent>\n';
        res = res + '<category>agency</category>\n';
        res = res + '<name>' + agentname + '</name>\n';
        res = res + '<phone>' + phone + '</phone>\n';
        res = res + '</sales-agent>\n';
        res = res + '<price>\n';
        //КУ в доп описании

        if (item.value.dops !== undefined && item.value.dops.match(/КУ\s+\d*/) != null) {
            //КУ указано в доп описании 
            res = res + '<value>' + eval(item.value.price + item.value.dops.match(/КУ\s+\d*/)[0].replace('КУ ', '')) + '</value>\n>';
            ku = '<utilities-included>да</utilities-included>\n';
        } else {
            //КУ не указаны, по умолчанию 10% от месячной стоимости аренды и округление вверх до тысяч    
            res = res + '<value>' + Math.ceil((item.value.price*1.1) / 1000) * 1000 + '</value>\n>';
            ku = '<utilities-included>да</utilities-included>\n';
        }
        res = res + '<currency>RUR</currency>\n';
        res = res + '<period>месяц</period>\n';
        res = res + '</price>\n';
        if (item.value.dops !== undefined && item.value.dops.match(/залог/i) != null) {
            res = res + '<rent-pledge>да</rent-pledge>\n';
        }
        if (true) {
            res = res + '<agent-fee>100</agent-fee>\n';
        }
        res = res + '<not-for-agents>да</not-for-agents>\n';
        res = res + ku;
        res = res + '<area>\n';
        if (item.value.total_square == '?') {
            console.log(item.key + '-' + item.value.using_square + ' - ' + item.value.kitchen_square);
            res = res + '<value>' + eval((item.value.using_square + item.value.kitchen_square.replace(/([\d])/, '+$1')).replace(/([\(\)])/g, '')) + '</value>'
        } else {
            res = res + '<value>' + item.value.total_square + '</value>'
        }
        res = res + '<unit>кв.м</unit>\n';
        res = res + '</area>\n';
        if (item.value.using_square.match(/\d/) != null) {
            res = res + '<living-space>\n';
            res = res + '<value>' + eval(item.value.using_square.replace(/([\(\)])/g, '')) + '</value>\n';
            res = res + '<unit>кв.м</unit>\n';
            res = res + '</living-space>\n';
        }
        if (item.value.kitchen_square.match(/\d/) != null) {
            res = res + '<kitchen-space>\n';
            res = res + '<value>' + eval(item.value.kitchen_square) + '</value>\n';
            res = res + '<unit>кв.м</unit>\n';
            res = res + '</kitchen-space>\n';
        }
        //image
        res = res + '<image>' + item.value.list_imgs.replace(/,/g, '</image>\n<image>') + '</image>\n'
        //renovation Ремонт. значения:«евроремонт»«косметический»«дизайнерский»«требует ремонта».        
        if (item.value.dops.match(/евро\/рем/i) != null) {
            res = res + '<renovation>евроремонт</renovation>\n';
        }
        if (item.value.dops.match(/косм\/рем/i) != null) {
            res = res + '<renovation>косметический</renovation>\n';
        }
        if (item.value.dops.match(/хор\/сост/i) != null) {
            res = res + '<quality>хорошее</quality>\n';
        }
        if (item.value.dops.match(/отл\/сост/i) != null) {
            res = res + '<quality>отличное</quality>\n';
        }
        res = res + '<rooms>' + item.value.flat.replace("к.кв.", "") + '</rooms>\n'
        res = res + '<floor>' + item.value.floor.split("/")[0] + '</floor>\n'
        if (item.value.dops.match(/лдж/i) != null) {
            res = res + '<balcony>Лоджия</balcony>\n';
        }
        if (item.value.sanuzel.match(/разд/i) != null) {
            res = res + '<bathroom-unit>раздельный</bathroom-unit>\n';
        }

        res = res + item.value.dopsboolean.replace(/([а-я]+)(\+|-)?/gi, (match,p1,p2)=>'<' + r_tags.get(p1) + '>' + p2 + '</' + r_tags.get(p1) + '>\n');

        res = res + '<floors-total>' + item.value.floor.split("/")[1] + '</floors-total>\n'

        res = res + '</offer>\n';
    }).then(function() {
        res = res + "</realty-feed>";
        console.log(res);
        var blob = new Blob([res],{
            'type': 'application/xml'
        })
        //var a1 = document.createElement('a');
        jQuery("td .head_lnk4:first").before("<a href='#' download='yandex.xml' name='linktofileya'>скачать фид яндекс</a>");
        //data:application/xml;charset=utf-8
        jQuery("[name='linktofileya']")[0].href = URL.createObjectURL(blob);
        // a1.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(res);
        //supported by chrome 14+ and firefox 20+
        //a1.download = 'data.csv';
        //needed for firefox
        //document.getElementsByTagName('body')[0].appendChild(a);
        //supported by chrome 20+ and firefox 5+
        //a1.click();
    });
    //each indexeddb
}

function formfid() {
    var res = "<feed>\n";
    res = res + "<feed_version>2</feed_version>\n";
    $.indexedDB("parserpiter").objectStore("arenda_records").each(function(item) {
        var rec = item.value;
        var photo_default = true;
        res = res + "<object>\n";
        res = res + "<Category>flatRent</Category>\n";
        res = res + "<ExternalId>" + rec.id + "</ExternalId>\n"
        //Текст объявления
        res = res + "<Description>Сдается в аренду " + rec.flat.replace(/1к.кв.|2к.кв.|3к.кв./g, m=>({
            "1к.кв.": "1но",
            "2к.кв.": "2х",
            "3к.кв.": "3х"
        })[m]) + " комнатная квартира в " + rec.district.replace('р-н', 'районе').replace(/(ий)/, 'ом') + " по адресу: " + rec.street_house + "</Description>";
        //<Address>Адрес</Address>
        res = res + "<Address>Санкт-Петербург " + rec.district + " " + rec.street_house + "</Address>";
        //<FlatRoomsCount>2</FlatRoomsCount>
        res = res + "<FlatRoomsCount>" + rec.flat.replace("к.кв.", "") + "</FlatRoomsCount>";
        //телефон для связи
        res = res + "<Phones>";
        res = res + "<PhoneSchema>";
        res = res + "<CountryCode>+7</CountryCode>";
        res = res + "<Number>" + phone + "</Number>";
        res = res + "</PhoneSchema>";
        res = res + "</Phones>";
        //var s="Комендантский пр. 1.7 км,Пионерская 1.8 км10 м.тр."; 
        res = res + '<Undegrounds>';
        var a = rec.metro.split(",");
        a.forEach(function(current_value) {
            var offset = current_value.search(/(\d+\s((м\.тр\.)+|(м\.п\.)+))$/);
            var distancemetro = '10 м.п.';
            if (offset != -1) {
                distancemetro = current_value.substr(offset);
            }
            var metroid = current_value.replace(/(проспект\s)|(институт)/i, '').replace(/([а-яА-Я]+)[\s\.]*([а-яА-Я]*).*/, function(match, p1, p2) {
                return (p1.length > p2.length) ? p1 : p2;

            })

            res = res + '<UndergroundInfoSchema><Id>' + $(jQuery.parseXML(cian_metro)).find("location:contains('" + metroid + "')").attr("id") + '</Id><Time>' + distancemetro.split(" ")[0] + '</Time>' + '<TransportType>' + distancemetro.split(" ")[1].replace('м.п.', 'walk').replace('м.тр.', 'transport') + '</TransportType>' + '</UndergroundInfoSchema>';
            //$(jQuery.parseXML(cian - metro)).find("location:contains('" + metroid + "')").attr("id");

        })
        res = res + '</Undegrounds>';
        if (rec.total_square == '?') {
            res = res + '<TotalArea>' + eval(rec.using_square) + '</TotalArea>'
        } else {
            res = res + '<TotalArea>' + rec.total_square + '</TotalArea>'
        }

        res = res + '<FloorNumber>' + rec.floor.split("/")[0] + '</FloorNumber>';

        if (rec.list_imgs !== undefined && rec.list_imgs.length > 0) {
            res = res + '<Photos>';
            var arr = rec.list_imgs.split(",");
            arr.forEach(function(item) {
                console.log(item);
                res = res + '<PhotoSchema>';
                res = res + '<FullUrl>' + item + '</FullUrl>';
                res = res + '<IsDefault>' + photo_default + '</IsDefault>';
                res = res + '</PhotoSchema>';
                photo_default = false;
            })
            res = res + '</Photos>';
        }
        var arr_dops = rec.dopsboolean.match(/[\+-]+/gi);
        res = res + '<HasInternet>' + arr_dops[5].replace('+', 'true').replace('-', 'false') + '</HasInternet>';
        res = res + '<HasFurniture>' + arr_dops[0].replace('+', 'true').replace('-', 'false') + '</HasFurniture>';
        res = res + '<HasPhone>' + arr_dops[4].replace('+', 'true').replace('-', 'false') + '</HasPhone>';
        //<HasKitchenFurniture>true</HasKitchenFurniture>?????    
        res = res + '<HasTv>' + arr_dops[1].replace('+', 'true').replace('-', 'false') + '</HasTv>';
        res = res + '<HasWasher>' + arr_dops[3].replace('+', 'true').replace('-', 'false') + '</HasWasher>';
        res = res + '<HasFridge>' + arr_dops[2].replace('+', 'true').replace('-', 'false') + '</HasFridge>';

        /*
    <HasConditioner>true</HasConditioner>
    <HasRamp>true</HasRamp>
    <HasBathtub>true</HasBathtub>
   ??? <IsInHiddenBase>true</IsInHiddenBase>
    <HasShower>true</HasShower>
    <HasDishwasher>true</HasDishwasher>
    <PetsAllowed>true</PetsAllowed>
    <ChildrenAllowed>true</ChildrenAllowed>
    */
        res = res + '<Building><FloorsCount>' + rec.floor.split("/")[1] + '</FloorsCount></Building>';
        //КУ в доп описании
        if (rec.dops !== undefined && rec.dops.match(/КУ\s+\d*/)!=null) {
            //КУ указано в доп описании 
            res = res + '<BargainTerms><Price>' + rec.price + '</Price>\n';
            res = res + '<UtilitiesTerms><IncludedInPrice>false</IncludedInPrice>\n'
            res = res + '<Price>' + rec.dops.match(/КУ\s+\d*/)[0].replace('КУ ', '') + '</Price>\n'
            res = res + '</UtilitiesTerms></BargainTerms>\n';
        } else {
            //КУ не указаны, по умолчанию 10% от месячной стоимости аренды    
            res = res + '<BargainTerms><Price>' + Math.ceil((rec.price * 1.1) / 1000) * 1000 + '</Price><UtilitiesTerms><IncludedInPrice>true</IncludedInPrice></UtilitiesTerms></BargainTerms>';
        }
        //each
        //Undergrounds	Список метро (не более 3-х)
        //UndergroundInfoSchema	
        //TransportType	Способ передвижения до метро: 
        //transport — На транспорте 
        //walk — Пешком
        //Time	Время в пути в минутах до метро, мин (Int32)
        //Id
        //<RoomType>both</RoomType>
        //RoomType	Тип комнаты (комната): 
        //both — Оба варианта 
        //combined — Совмещенная 
        //separate — Изолированная

        res = res + "</object>\n";

    }).then(function() {
        res = res + "</feed>";
        console.log(res);
        var blob = new Blob([res],{
            'type': 'application/xml'
        })
        //var a1 = document.createElement('a');
        jQuery("td .head_lnk4:first").before("<a href='#' download='cian.xml' name='linktofile'>скачать файл</a>");
        //data:application/xml;charset=utf-8
        jQuery("[name='linktofile']")[0].href = URL.createObjectURL(blob);
        // a1.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(res);
        //supported by chrome 14+ and firefox 20+
        //a1.download = 'data.csv';
        //needed for firefox
        //document.getElementsByTagName('body')[0].appendChild(a);
        //supported by chrome 20+ and firefox 5+
        //a1.click();
    });

}

function getimg() {

    var imgs = [];
    var j
    var cnt;
    $.indexedDB("parserpiter").objectStore("arenda_records").count().done(function(result) {
        cnt = result;
        j = 0;
    })

    $.indexedDB("parserpiter").objectStore("arenda_records").each(function(item) {

        var newitem = item.value;
        var newitemkey = item.key;

        if (item.value.imgs_link !== undefined //&& item.value.list_imgs === undefined
        ) {
            //img present        

            $.get('https://internet-piter.ru' + item.value.imgs_link, function(data) {
                imgs = [];
                //console.log(data);
                if (!data.includes("По данному предложению сделка завершена!")) {
                    var brg = $(data).find(".link_block .swiper-wrapper img").length;
                    if (brg > 0 && brg !== undefined) {
                        //open bargain
                        $(data).find(".link_block .swiper-wrapper img").each(function() {
                            var j1 = jQuery(this);

                            if (j1.attr('data-src') !== undefined)
                                var img = j1.attr('data-src').split("&");
                            else
                                var img = j1.attr('src').split("&");

                            var file = "ap78.ru/photos/" + img[1].replace("ff=", "") + img[0].replace("lupa_min.php?fn=", "");

                            imgs.push(file);
                        })
                        //find each get imgs links
                        newitem.list_imgs = imgs.toString();
                        newitem.geo1 = $(data).find(".td-nakarte-color").attr("href").match(/geo(1|2)=([\d.]+)/g)[0].replace(/geo(1|2)=/, ''),
                        newitem.geo2 = $(data).find(".td-nakarte-color").attr("href").match(/geo(1|2)=([\d.]+)/g)[1].replace(/geo(1|2)=/, ''),

                        newitem.deleted = false;
                    } else {
                        //сделка завершена
                        newitem.deleted = true;
                        // alert("end bargain");     
                    }
                } else {
                    //сделка завершена
                    newitem.deleted = true;
                }
            }).done(function() {
                console.log("success" + '-' + newitemkey + ' ' + newitem.imgs_link);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                alert(errorThrown);
                console.log("error" + '-' + newitemkey + ' ' + newitem.imgs_link);
            }).always(function() {

                $.indexedDB("parserpiter").objectStore("arenda_records").put(newitem, newitemkey).then(function() {
                    j = j + 1;
                    console.log(j + '-' + '(https://ap78.ru' + newitem.imgs_link + ') ' + newitemkey + ' ' + newitem.list_imgs);
                    // jQuery("[name='getimg']").attr("value","Процесс сбора запущен "+j+" из "+cnt);                
                    // if (j>=cnt) { 
                    //      jQuery("[name='getimg']").attr("value", "Картинки собраны. The end!!!");
                    //             }
                    jQuery("[name='getimg']").attr("value", "Процесс сбора запущен " + j + " из " + cnt);
                    if (j >= cnt) {
                        jQuery("[name='getimg']").attr("value", "Картинки собраны. The end!!!");
                    }

                });

            })
            //always

            //get

        } else {
            j = j + 1;
            jQuery("[name='getimg']").attr("value", "Процесс сбора запущен " + j + " из " + cnt);
            if (j >= cnt) {
                jQuery("[name='getimg']").attr("value", "Картинки собраны. The end!!!");
            }
        }
        //if img present

    })//each 
    .done(function() {
        jQuery("[name='getimg']").attr("value", "Картинки собраны. The end!!!");
        clear_storage_by_time();
    })
    //$.indexedDB("parserpiter").objectStore("arenda_records").each

}

function clear_storage_by_time() {
    //$.indexedDB("parserpiter").objectStore("arenda_records").index("datetime").each(function(result){console.log(result)},IDBKeyRange.bound(new Date("12.02.2019"),new Date("12.04.2019")))
    //$.indexedDB("parserpiter").objectStore("arenda_records").index("datetime").each(function(result){console.log(result)},IDBKeyRange.bound(Date("01.12.2019"),Date("03.12.2019")))
    $.indexedDB("parserpiter").objectStore("arenda_records").index("deleted").each(function(item) {
        if (item.value.deleted) {
            $.indexedDB("parserpiter").objectStore("arenda_records").delete(item.key);
        }
    })
}

function recreate_bd() {
    console.log("start initialize bd");
    $.indexedDB("parserpiter").deleteDatabase().then(function(){
    $.indexedDB("parserpiter", {
        "schema": {
            "1": function(versionTransaction) {
                versionTransaction.createObjectStore("paramslist");
                var ar_rec=versionTransaction.createObjectStore("arenda_records");
                ar_rec.createIndex("deleted");
                ar_rec.createIndex("dattime");
                ar_rec.createIndex("datetime");
                ar_rec.createIndex("district");
                ar_rec.createIndex("price");
                ar_rec.createIndex("manual");
            }
            //,
            //"2": function(versionTransaction) {
            //    versionTransaction.createObjectStore("paramslist");
            //    versionTransaction.createObjectStore("arenda_records");
           // }
        }
    }).transaction(["paramslist", "arenda_records"]).then(function() {
        console.log("Transaction completed");
    }, function() {
        console.log("Transaction aborted");
    }, function(t) {
        console.log("Transaction in progress");
        t.objectStore("paramslist").put({
            nameparam: "parsercnt",
            valparam: 0
        }, "parsercnt").then(function() {
            console.log("parcercnt added");
        }, function() {
            console.log("error adding parcercnt");
        });
        t.objectStore("paramslist").put({
            nameparam: "searchrn",
            valparam:-1
        }, "searchrn").then(function() {
            console.log("searchrn added");
 //           search();
        }, function() {
            console.log("error adding searchrn");
        });

    })
})
  //  clear_storage_by_time();

}

function init_parsing() {
    console.log("start initialize bd");
    $.indexedDB("parserpiter", {
        "schema": {
            "1": function(versionTransaction) {
                versionTransaction.createObjectStore("paramslist");
                var ar_rec=versionTransaction.createObjectStore("arenda_records");
                ar_rec.createIndex("deleted");
                ar_rec.createIndex("dattime");
                ar_rec.createIndex("datetime");
                ar_rec.createIndex("district");
                ar_rec.createIndex("price");
                ar_rec.createIndex("manual");
            }
            //,
            //"2": function(versionTransaction) {
            //    versionTransaction.createObjectStore("paramslist");
            //    versionTransaction.createObjectStore("arenda_records");
           // }
        }
    }).transaction(["paramslist", "arenda_records"]).then(function() {
        console.log("Transaction completed");
    }, function() {
        console.log("Transaction aborted");
    }, function(t) {
        console.log("Transaction in progress");
        t.objectStore("paramslist").put({
            nameparam: "parsercnt",
            valparam: 0
        }, "parsercnt").then(function() {
            console.log("parcercnt added");
        }, function() {
            console.log("error adding parcercnt");
        });
        t.objectStore("paramslist").put({
            nameparam: "searchrn",
            valparam: raions.length - 1
        }, "searchrn").then(function() {
            console.log("searchrn added");
            search();
        }, function() {
            console.log("error adding searchrn");
        });

    })

  //  clear_storage_by_time();

}

function parsing_one_rec() {
    var j = jQuery(".trm_01,.trm_02");
    var arecord;
    var keyid;
    var imgs = '';
    //var record01 = "\"" + j.attr('id').replace('idtr', '').trim() + "\";" + "\"" + j.find(".tdm_01").html().split('<br>')[0].trim() + "\";" + "\"" + j.find(".td-date-color").html().split('<br>')[1].trim() + ' ' + jQuery(this).find(".td-date-color").html().split('<br>')[0].trim() + "\";" + "\"" + j.find(".tdm_rn").text().trim() + "\";" + "\"" + j.find(".tdm_02").html().split('<br>')[1].trim() + "\";" + "\"" + j.find(".tdm_03").text().trim() + "\";" + "\"" + j.find(".tdm_041").text().trim() + "\";" + "\"" + j.find(".tdm_042").text().trim() + "\";" + "\"" + j.find(".tdm_043").text().trim() + "\";" + "\"" + j.find(".tdm_044").text().trim() + "\";" + "\"" + j.find(".tdm_05").html().split('<br>')[0].trim() + "\";" + "\"" + j.find(".tdm_05").html().split('<br>')[1].trim() + "\";" + "\"" + j.find("[title='Страница риэлтора']").text() + "\";" + "\"" + j.find("[title='Страница фирмы']").text() + "\";" + "\"" + j.find(".td-nalfoto a").attr("href") + "\";";
    keyid = j.attr('id').replace('idtr', '').trim();
    jQuery(".link_block .swiper-wrapper img").each(function() {
        var j1 = jQuery(this);
        if (j1.attr('data-src') !== undefined)
            var img = j1.attr('data-src').split("&");
        else
            var img = j1.attr('src').split("&");
        imgs = imgs + "ap78.ru/photos/" + img[1].replace("ff=", "") + img[0].replace("lupa_min.php?fn=", "") + ",";

    })
    //find each get imgs links
    arecord = {
        id: j.attr('id').replace('idtr', '').trim(),
        flat: j.find(".tdm_01").html().split('<br>')[0].trim(),
        deleted: false,
        manual: true,
        dattime: j.find(".td-date-color").html().split('<br>')[1].trim() + ' ' + j.find(".td-date-color").html().split('<br>')[0].trim(),
        district: j.find(".tdm_rn").text().trim(),
        street_house: j.find(".tdm_02").html().split('<br>')[1].trim(),
        geo1: j.find(".td-nakarte-color").attr("href").match(/geo(1|2)=([\d.]+)/g)[0].replace(/geo(1|2)=/, ''),
        geo2: j.find(".td-nakarte-color").attr("href").match(/geo(1|2)=([\d.]+)/g)[1].replace(/geo(1|2)=/, ''),
        metro: j.find(".tdm_03").text().trim(),
        total_square: j.find(".tdm_041").text().trim(),
        using_square: j.find(".tdm_042").text().trim(),
        kitchen_square: j.find(".tdm_043").text().trim(),
        floor: j.find(".tdm_044").text().trim(),
        sanuzel: j.find(".tdm_045").text().trim(),
        type_building: j.find(".td-tipdom").text().trim(),
        dopsboolean: j.find(".tdm_08").find("tr [align='center']").text().replace(/[\n\s]/g, ''),
        price: Number(j.find(".tdm_05").html().split('<br>')[0].trim().replace('.','')),
        currency: j.find(".tdm_05").html().split('<br>')[1].trim(),
        rieltor: j.find("[title='Страница риэлтора']").text(),
        rieltor_firm: j.find("[title='Страница фирмы']").text(),
        imgs_link: j.find(".td-nalfoto a").attr("href"),
        list_imgs: imgs.slice(0, -1),
        dops: j.find("[id*='dop_']").text().trim(),
        datetime: new Date()
    }
    console.log(j.find("div [id*='dop_']").text());

    $.indexedDB("parserpiter").objectStore("arenda_records").put(arecord, keyid).then(function(result, event) {
        console.log(keyid + ' ' + result + ' ' + event);
    }//then
    , function(error, event) {
        console.log(error + ' ' + event)
    });
    // arenda_records put

}

function parsing_page() {

    var recs = [];
    var cnt_rec = 1;

    recs.push("\"id\";" + "\"flat\";" + "\"dattime\";" + "\"district\";" + "\"street_house\";" + "\"metro\";" + "\"total_square\";" + "\"using_square\";" + "\"kitchen_square\";" + "\"floor\";" + "\"price\";" + "\"currency\";" + "\"rieltor\";" + "\"rieltor_firm\";" + "\"imgs_link\";");

    if (location.href.indexOf('internet-piter.ru') > -1 && jQuery(".trm_01").length > 0) {
        var a = jQuery(".tb_navi,.tb_02").find("a:contains('»')");
        if //(a.length>0 && a.attr("href").split("numpage=")[1]<=12) ||
        (location.href.split("numpage=")[1] < 12 || location.href.split("=")[1] == "search") {
            console.log("1");
            var i = jQuery(".trm_01,.trm_02").length - 1;
            jQuery(".trm_01,.trm_02").each(function() {
                var j = jQuery(this);
                if (j.attr('id') !== undefined /*&& j.find("[title='Страница риэлтора']").text() != "" && j.find("[title='Страница фирмы']").text() != ""*/
                ) {

                    var arecord;
                    var keyid;
                    var record01 = "\"" + j.attr('id').replace('idtr', '').trim() + "\";" + "\"" + j.find(".tdm_01").html().split('<br>')[0].trim() + "\";" + "\"" + j.find(".td-date-color").html().split('<br>')[1].trim() + ' ' + jQuery(this).find(".td-date-color").html().split('<br>')[0].trim() + "\";" + "\"" + j.find(".tdm_rn").text().trim() + "\";" + "\"" + j.find(".tdm_02").html().split('<br>')[1].trim() + "\";" + "\"" + j.find(".tdm_03").text().trim() + "\";" + "\"" + j.find(".tdm_041").text().trim() + "\";" + "\"" + j.find(".tdm_042").text().trim() + "\";" + "\"" + j.find(".tdm_043").text().trim() + "\";" + "\"" + j.find(".tdm_044").text().trim() + "\";" + "\"" + j.find(".tdm_05").html().split('<br>')[0].trim() + "\";" + "\"" + j.find(".tdm_05").html().split('<br>')[1].trim() + "\";" + "\"" + j.find("[title='Страница риэлтора']").text() + "\";" + "\"" + j.find("[title='Страница фирмы']").text() + "\";" + "\"" + j.find(".td-nalfoto a").attr("href") + "\";";
                    keyid = j.attr('id').replace('idtr', '').trim();

                    arecord = {
                        id: j.attr('id').replace('idtr', '').trim(),
                        flat: j.find(".tdm_01").html().split('<br>')[0].trim(),
                        dattime: j.find(".td-date-color").html().split('<br>')[1].trim() + ' ' + j.find(".td-date-color").html().split('<br>')[0].trim(),
                        district: j.find(".tdm_rn").text().trim(),
                        street_house: j.find(".tdm_02").html().split('<br>')[1].trim(),
                        geo1: j.find(".td-nakarte-color").attr("href").match(/geo(1|2)=([\d.]+)/g)[0].replace(/geo(1|2)=/, ''),
                        geo2: j.find(".td-nakarte-color").attr("href").match(/geo(1|2)=([\d.]+)/g)[1].replace(/geo(1|2)=/, ''),
                        metro: j.find(".tdm_03").text().trim(),
                        manual: false,
                        total_square: j.find(".tdm_041").text().trim(),
                        using_square: j.find(".tdm_042").text().trim(),
                        kitchen_square: j.find(".tdm_043").text().trim(),
                        floor: j.find(".tdm_044").text().trim(),
                        sanuzel: j.find(".tdm_045").text().trim(),
                        type_building: j.find(".td-tipdom").text().trim(),
                        dopsboolean: j.find(".tdm_08").find("tr [align='center']").text().replace(/[\n\s]/g, ''),
                        price: Number(j.find(".tdm_05").html().split('<br>')[0].trim().replace('.','')),
                        currency: j.find(".tdm_05").html().split('<br>')[1].trim(),
                        rieltor: j.find("[title='Страница риэлтора']").text(),
                        rieltor_firm: j.find("[title='Страница фирмы']").text(),
                        imgs_link: j.find(".td-nalfoto a").attr("href"),
                        dops: j.find("[id*='dop_']").text().trim(),
                        datetime: new Date(),
                        deleted: false,
                        list_imgs:""
                    }
                    console.log(j.find("div [id*='dop_']").text());
                    recs.push(record01);

                    $.indexedDB("parserpiter").objectStore("arenda_records").put(arecord, keyid).then(function(result, event) {
                        console.log(i + ' ' + result + ' ' + event);
                        i = i - 1;
                        if (i == 0) {
                            if (a.length == 0 || location.href.split("numpage=")[1] == 11 || first50) {
                                $.indexedDB("parserpiter").objectStore("paramslist").put({
                                    nameparam: "parsercnt",
                                    valparam: 0
                                }, "parsercnt").done(function() {
                                    $.indexedDB("parserpiter").objectStore("paramslist").get("searchrn").done(function(item) {
                                        if (item.valparam >= 0) {
                                            search();
                                        }
                                    })
                                })
                            } else {
                                console.log("click_next " + i);
                                a[0].click(function(e) {
                                    e.preventDefault();
                                });
                            }
                        }
                    }//then
                    , function(error, event) {
                        console.log(error + ' ' + event)
                    });
                    // arenda_records put

                }//j.attr('id') !== undefined
                else {
                    i = i - 1;
                }

            })
            //trm each

            console.log(recs);

        }//location.href.split("numpage=")[1] < 12
        else {
            $.indexedDB("parserpiter").objectStore("paramslist").put({
                nameparam: "parsercnt",
                valparam: 0
            }, "parsercnt").done(function() {
                $.indexedDB("parserpiter").objectStore("paramslist").get("searchrn").done(function(item) {
                    if (item.valparam >= 0) {
                        search();
                    }
                })
            })
        }
        //end else

    }
}

function search() {
    // var rn=["Адмиралтейский район","Василеостровский район","Выборгский район"];
    if (location.href.indexOf('internet-piter.ru') > -1 && jQuery("[href='/master_search/']").length > 0) {
        var a = jQuery("[title='Выбрать предложения из Базы']");
        a[0].click(function(e) {
            e.preventDefault();
        });
    }
    //if 1

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("[for='id-search-completed-1']").length > 0) {
        var a = jQuery("[for='id-search-completed-1']");
        a[0].click(function(e) {
            e.preventDefault();
        });
    }
    //if 2 предыдущий поиск или новый выбрать новый

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("[id='id-search-type-1']").length > 0) {
        var a = jQuery(".next-btn");
        console.log("по параметрам");
        if (jQuery("[id='id-search-type-1']:checked").length==0) {jQuery("[id='id-search-type-1']")[0].checked = "checked";}

        a[0].click(function(e) {
            e.preventDefault();
        });
    }
    //if 3  по параметрам 

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("[id='id-select-origin-1']").length > 0) {
        var a = jQuery(".next-btn");
        console.log("Питер");
        jQuery("[id='id-select-origin-1']")[0].checked = "checked";
        a[0].click(function(e) {
            e.preventDefault();
        });

    }
    //if 3     где искать в питере

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("[id='id-select-sdelka-3']").length > 0) {
        var a = jQuery(".next-btn");
        console.log("сдают");
        jQuery("[id='id-select-sdelka-3']")[0].checked = "checked";
        a[0].click(function(e) {
            e.preventDefault();
        });
    }
    //if 3     сдают

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("[id='id-select-long-rent-period']").length > 0) {
        var a = jQuery(".next-btn");
        console.log("11 мес");
        jQuery("[id='id-select-long-rent-period']")[0].checked = "checked";
        a[0].click(function(e) {
            e.preventDefault();
        });
    }
    //if 3     11 мес и более

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("[for='id-select-object-2']").length > 0) {
        var a = jQuery(".next-btn");
        console.log("1,2,3 квартиры");
        if (jQuery("input[id='id-select-object-2']:checked").length==0) {jQuery("[for='id-select-object-2']")[0].click();}
        if (jQuery("input[id='id-select-object-3']:checked").length==0) {jQuery("[for='id-select-object-3']")[0].click();}
        if (jQuery("input[id='id-select-object-4']:checked").length==0) {jQuery("[for='id-select-object-4']")[0].click();}
        a[0].click(function(e) {
            e.preventDefault();
        });

    }
    //if 3     1-3 комн квартиры

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("[id='id-select-how-to-search-5']").length > 0) {
        var a = jQuery(".next-btn");
        console.log("по районам");
        jQuery("[id='id-select-how-to-search-5']")[0].checked = "checked";
        a[0].click(function(e) {
            e.preventDefault();
        });
    }
    //if 3    по районам и метро

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("label:contains('Адмиралтейский район')").length > 0) {
        var a = jQuery(".next-btn");
        var i_rn
        $.indexedDB("parserpiter").objectStore("paramslist").get("searchrn").done(function(item) {
            i_rn = item.valparam;
            console.log(item);
            if (i_rn === undefined) {
                i_rn = 0;
            }
            if (i_rn < raions.length) {
                jQuery("label:contains('не важно')")[0].click();
                jQuery("label:contains('" + raions[i_rn] + "')")[0].click();
                //$.indexedDB("parserpiter").objectStore("paramslist").put({nameparam:"searchrn",valparam:i_rn}).done(function(){
                console.log("done" + i_rn);
                a[0].click(function(e) {
                    e.preventDefault();
                })
                //  }) //put 
            } else {
                console.log("stop_search");
            }
            //if (i_rn<raions.length)   
        })
        //get 
    }
    // if районы        

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery(".show-list").length > 0) {
        var a = jQuery(".next-btn");
        var i_rn;
        jQuery(".show-list").click();
        console.log("метро");

        $.indexedDB("parserpiter").objectStore("paramslist").get("searchrn").done(function(item) {
            i_rn = item.valparam;
            console.log(item);
            console.log("get_item" + i_rn);
            if (i_rn === undefined) {
                i_rn = 0;
            }
            if (i_rn >= 0) {
                jQuery("label:contains('не важно')")[0].click();
                metro.get(raions[i_rn]).split(";").forEach(function(item) {
                    console.log(item);
                    jQuery("label:contains('" + item + "')")[0].click();
                })

                // metro[raions[i_rn]].split.foreach
                //  jQuery("label:contains('"+raions[i_rn]+"')")[0].click();
                $.indexedDB("parserpiter").objectStore("paramslist").put({
                    nameparam: "searchrn",
                    valparam: i_rn 
                }, "searchrn").then(function() {
                    console.log("done" + i_rn);
                    a[0].click(function(e) {
                        e.preventDefault();
                    })
                }, function(error) {
                    console.log("error metro " + error);
                })
                //put 
            } else {
                console.log("stop_search");
            }
            //if (i_rn<raions.length)   
        })
        //get        
    }
    //if метро

    if (location.href.indexOf('internet-piter.ru/master_search/') > -1 && jQuery("[name='price_bottom']").length > 0) {
        var a = jQuery(".next-btn");

        console.log("price");
        //   console.log("done"+i_rn);
        jQuery("label:contains('не важно')")[0].click();
        jQuery("label:contains('только с фотографиями')")[0].click();
        jQuery("[name='price_bottom']")[0].value = 20000;
        jQuery("[name='price_top']")[0].value = 60000;
        $.indexedDB("parserpiter").objectStore("paramslist").put({
            nameparam: "parsercnt",
            valparam: 1
        }, "parsercnt").done(function() {
            $.indexedDB("parserpiter").objectStore("paramslist").get("searchrn").done(function(item) {
            i_rn = item.valparam;
            $.indexedDB("parserpiter").objectStore("paramslist").put({
                    nameparam: "searchrn",
                    valparam: i_rn - 1
                }, "searchrn").then(function() {
                    console.log("done" + i_rn);
                    a[0].click(function(e) {
                        e.preventDefault();
                    })
                }, function(error) {
                    console.log("error metro " + error);
                })
            console.log("done" + i_rn);
            })
        })

    }

}
//end search
