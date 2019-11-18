var raions = ["Фрунзенский район", "Василеостровский район", "Выборгский район", "Приморский район", "Калининский район", "Красногвардейский район", "Московский район", "Петроградский район"];
var metro = new Map([["Фрунзенский район", "Бухарестская;Волковская;Международная;Парк Победы;Проспект Славы"], ["Василеостровский район", "Василеостровская;Приморская"], ["Выборгский район", "Выборгская;Лесная;Озерки;пл.Ленина;пл.Мужества;Политехническая;пр.Просвещения;Удельная"], ["Приморский район", "Беговая;Комендантский пр.;Пионерская;Старая Деревня;Черная речка"], ["Калининский район", "Академическая;Выборгская;Гражданский пр.;Лесная;пл.Ленина;пл.Мужества;Политехническая"], ["Красногвардейский район", "Невский пр.;Большевиков пр.;Дыбенко ул.;Елизаровская;Ладожская;Новочеркасская;Пролетарская;Рыбацкое"], ["Московский район", "Звездная;Московская;Московские ворота;Парк Победы;Фрунзенская;Электросила"], ["Петроградский район", "Горьковская;Петроградская;Спортивная;Черная речка;Чкаловская"]])
var cian_metro = '<metro><location id="167">Девяткино</location><location id="168">Гражданский проспект</location><location id="169">Академическая</location><location id="170">Политехническая</location><location id="171">Площадь Мужества</location><location id="172">Лесная</location><location id="173">Выборгская</location><location id="174">Площадь Ленина</location><location id="175">Чернышевская</location><location id="176">Площадь Восстания</location><location id="177">Владимирская</location><location id="178">Пушкинская</location><location id="179">Технологический институт</location><location id="180">Балтийская</location><location id="181">Нарвская</location><location id="182">Кировский завод</location><location id="183">Автово</location><location id="184">Ленинский проспект</location><location id="185">Проспект Ветеранов</location><location id="186">Парнас</location><location id="187">Проспект Просвещения</location><location id="188">Озерки</location><location id="189">Удельная</location><location id="190">Пионерская</location><location id="191">Черная речка</location><location id="192">Петроградская</location><location id="193">Горьковская</location><location id="194">Невский проспект</location><location id="195">Сенная площадь</location><location id="197">Фрунзенская</location><location id="198">Московские ворота</location><location id="199">Электросила</location><location id="200">Парк Победы</location><location id="201">Московская</location><location id="202">Звездная</location><location id="203">Купчино</location><location id="204">Приморская</location><location id="205">Василеостровская</location><location id="206">Гостиный двор</location><location id="207">Маяковская</location><location id="208">Площадь Александра Невского</location><location id="210">Елизаровская</location><location id="211">Ломоносовская</location><location id="212">Пролетарская</location><location id="213">Обухово</location><location id="214">Рыбацкое</location><location id="215">Комендантский проспект</location><location id="216">Старая Деревня</location><location id="217">Крестовский остров</location><location id="218">Чкаловская</location><location id="219">Спортивная</location><location id="220">Садовая</location><location id="221">Достоевская</location><location id="222">Лиговский проспект</location><location id="224">Новочеркасская</location><location id="225">Ладожская</location><location id="226">Проспект Большевиков</location><location id="227">Улица Дыбенко</location><location id="230">Волковская</location><location id="231">Звенигородская</location><location id="232">Спасская</location><location id="241">Обводный канал</location><location id="242">Адмиралтейская</location><location id="246">Международная</location><location id="247">Бухарестская</location><location id="355">Беговая</location><location id="356">Новокрестовская</location><location id="357">Проспект Славы</location><location id="358">Дунайская</location><location id="359">Шушары</location><location id="382">Горный институт</location></metro>';
var phone = "9216322696";
var flag_iframe_loaded = false;
var flag_iframe_created = false;
var item_for_iframe = {};
var key_for_iframe = 0;
var getparambyname;

function formfid() {
    var res = "<feed>\n";
    res = res + "<feed_version>2</feed_version>\n";
    $.indexedDB("parserpiter").objectStore("arenda_records").each(function(item) {
        var rec = item.value;
        res = res + "<object>\n";
        res = res + "<Category>flatRent</Category>\n";
        res = res + "<ExternalId>" + rec.id + "</ExternalId>\n"
        //Текст объявления
        res = res + "<Description>Сдается в аренду " + rec.flat.replace(/1к.кв.|2к.кв.|3к.кв./g, m=>({
            "1к.кв.": "1но",
            "2к.кв.": "2х",
            "3к.кв.": "3х"
        })[m]) + " комнатная квартира в "+        
        rec.district.replace('р-н','районе').replace(/(ий)/,'ом')+
        " по адресу: "+rec.street_house+"</Description>";
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
        if (rec.total_square=='?') {
            res=res+'<TotalArea>'+eval(rec.using_square)+'</TotalArea>'
        } else {
        res=res+'<TotalArea>'+rec.total_square+'</TotalArea>'}
        res=res+'<FloorNumber>'+rec.floor.split("/")[0]+'</FloorNumber>';
        res=res+'<Building><FloorsCount>'+rec.floor.split("/")[1]+'</FloorsCount></Building>';
        res=res+'<BargainTerms><Price>'+rec.price.replace('.','')*1.1+'</Price><UtilitiesTerms><IncludedInPrice>true</IncludedInPrice><Price>'+rec.price.replace('.','')*0.1+'</Price></UtilitiesTerms></BargainTerms>';
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

        res=res+"</object>\n";

    }).then(function() {
        res = res + "</feed>";
        console.log(res);
        var blob = new Blob([res], {'type':'application/xml'})
        //var a1 = document.createElement('a');
        jQuery("td .head_lnk4:first").before("<a href='#' download='cian.xml' name='linktofile'>скачать файл</a>");
        //data:application/xml;charset=utf-8
        jQuery("[name='linktofile']")[0].href=URL.createObjectURL(blob);
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
    $.indexedDB("parserpiter").objectStore("arenda_records").count().done(function(result){
                cnt=result;
                j=0;})
    
    $.indexedDB("parserpiter").objectStore("arenda_records").each(function(item) {

        var newitem = item.value;
        var newitemkey = item.key;
        if (item.value.imgs_link !== undefined //&& item.value.list_imgs === undefined
           ) {
            //img present
            $.get('https://internet-piter.ru' + item.value.imgs_link, function(data) {
                imgs = [];
                var brg = $(data).find(".link_block .swiper-wrapper img").length;
                if (brg > 0) {
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
                    newitem.deleted = false;
                } else {
                    //сделка завершена
                    newitem.deleted = true;
                    // alert("end bargain");     
                }

            })
            .done(function() {
                console.log("success" + '-' + newitemkey + ' ' + newitem.imgs_link);
            })
            .fail(function(errorThrown) {
                console.log(errorThrown);
                console.log("error" + '-' + newitemkey + ' ' + newitem.imgs_link);
            })
            .always(function() {
                j=j+1;
                $.indexedDB("parserpiter").objectStore("arenda_records").put(newitem, newitemkey).then(function() {
                    
                    console.log(j + '-' + '(https://ap78.ru' + newitem.imgs_link + ') ' + newitemkey + ' ' + newitem.list_imgs);
           // jQuery("[name='getimg']").attr("value","Процесс сбора запущен "+j+" из "+cnt);                
           // if (j>=cnt) { 
           //      jQuery("[name='getimg']").attr("value", "Картинки собраны. The end!!!");
           //             }
                    

                });
                jQuery("[name='getimg']").attr("value","Процесс сбора запущен "+j+" из "+cnt);                
            if (j>=cnt) { 
                 jQuery("[name='getimg']").attr("value", "Картинки собраны. The end!!!");
                        }

            }) //always
            
            //get

        } else {j=j+1;
        jQuery("[name='getimg']").attr("value","Процесс сбора запущен "+j+" из "+cnt);                
            if (j>=cnt) { 
                 jQuery("[name='getimg']").attr("value", "Картинки собраны. The end!!!");
                        }
                }
        //if img present

    }) 
      //each 
     .done(function() {
        jQuery("[name='getimg']").attr("value", "Картинки собраны. The end!!!");
     })
    //$.indexedDB("parserpiter").objectStore("arenda_records").each

}

function init_parsing() {
    console.log("start initialize bd");
    $.indexedDB("parserpiter", {
        "schema": {
            "1": function(versionTransaction) {
                versionTransaction.createObjectStore("paramslist");
                versionTransaction.createObjectStore("arenda_records");
            },
            "2": function(versionTransaction) {
                versionTransaction.createObjectStore("paramslist");
                versionTransaction.createObjectStore("arenda_records");
            }
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
                if (j.attr('id') !== undefined /*&& j.find("[title='Страница риэлтора']").text() != "" && j.find("[title='Страница фирмы']").text() != ""*/) {

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
                        geo1:j.find(".td-nakarte-color").attr("href").match(/(geo(1||2)=[\d.]*)/g)[0],
                        geo2:j.find(".td-nakarte-color").attr("href").match(/(geo(1||2)=[\d.]*)/g)[1],
                        metro: j.find(".tdm_03").text().trim(),
                        total_square: j.find(".tdm_041").text().trim(),
                        using_square: j.find(".tdm_042").text().trim(),
                        kitchen_square: j.find(".tdm_043").text().trim(),
                        floor: j.find(".tdm_044").text().trim(),
                        sanuzel:j.find(".tdm_045").text().trim(),
                        type_building:j.find(".td-tipdom").text().trim(),   
                        dopsboolean:j.find(".tdm_08").find("tr [align='center']").text().replace(/[\n\s]/g,''),
                        price: j.find(".tdm_05").html().split('<br>')[0].trim(),
                        currency: j.find(".tdm_05").html().split('<br>')[1].trim(),
                        rieltor: j.find("[title='Страница риэлтора']").text(),
                        rieltor_firm: j.find("[title='Страница фирмы']").text(),
                        imgs_link: j.find(".td-nalfoto a").attr("href"),
                        dops: j.find("[id*='dop_']").text().trim()
                    }
                    console.log(j.find("div [id*='dop_']").text());
                    recs.push(record01);

                    $.indexedDB("parserpiter").objectStore("arenda_records").put(arecord, keyid).then(function(result, event) {
                        console.log(i + ' ' + result + ' ' + event);
                        i = i - 1;
                        if (i == 0) {
                            if (a.length == 0 || location.href.split("numpage=")[1] == 11) {
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
                                console.log("click_next "+i);
                                a[0].click(function(e) {
                                    e.preventDefault();
                                });
                            }
                        }
                    } //then
                    , function(error, event) {
                        console.log(error + ' ' + event)
                    }
                    );// arenda_records put

                } //j.attr('id') !== undefined
                else {i=i-1;}

            }) //trm each

            console.log(recs);

        } //location.href.split("numpage=")[1] < 12
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
        } //end else

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
        jQuery("[id='id-search-type-1']")[0].checked = "checked";

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
        jQuery("[for='id-select-object-2']")[0].click();
        jQuery("[for='id-select-object-3']")[0].click();
        jQuery("[for='id-select-object-4']")[0].click();
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
                    valparam: i_rn - 1
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
            console.log("done" + i_rn);
            a[0].click(function(e) {
                e.preventDefault();
            })
        })

    }

}
//end search
