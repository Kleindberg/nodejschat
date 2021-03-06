/*! EmojioneArea v3.1.8 | MIT license */
window = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {},
document = window.document || {},
function(a, b) {
    "function" == typeof require && "object" == typeof exports && "object" == typeof module ? a(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], a) : a(b.jQuery)
}(function(a) {
    "use strict";
    var b = 0
      , c = {}
      , d = {}
      , e = window.emojione
      , f = [];
    function g(a) {
        e ? a() : f.push(a)
    }
    var h = "data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=="
      , i = [].slice
      , j = "emojionearea"
      , k = 0
      , l = "&#8203;";
    function m(b, d, e) {
        var f = !0
          , g = 1;
        if (d) {
            d = d.toLowerCase();
            do {
                var h = 1 == g ? "@" + d : d;
                c[b.id][h] && c[b.id][h].length && a.each(c[b.id][h], function(a, c) {
                    return f = c.apply(b, e || []) !== !1
                })
            } while (f && g--)
        }
        return f
    }
    function n(b, c, e, f) {
        f = f || function(b, c) {
            return a(c.currentTarget)
        }
        ,
        a.each(e, function(g, h) {
            g = a.isArray(e) ? h : g,
            (d[b.id][h] || (d[b.id][h] = [])).push([c, g, f])
        })
    }
    function o(a, b, c) {
        var d = e.imageType, f;
        f = "svg" == d ? e.imagePathSVG : e.imagePathPNG;
        var g = "";
        return c && (g = c.substr(1, c.length - 2).replace(/_/g, " ").replace(/\w\S*/g, function(a) {
            return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
        })),
        a.replace("{name}", c || "").replace("{friendlyName}", g).replace("{img}", f + (k < 2 ? b.toUpperCase() : b) + "." + d).replace("{uni}", b).replace("{alt}", e.convert(b))
    }
    function p(a, b, c) {
        return a.replace(/:?\+?[\w_\-]+:?/g, function(a) {
            a = ":" + a.replace(/:$/, "").replace(/^:/, "") + ":";
            var d = e.emojioneList[a];
            return d ? (k > 3 && (d = d.unicode),
            o(b, d[d.length - 1], a)) : c ? "" : a
        })
    }
    function q(a) {
        var b, c;
        if (window.getSelection) {
            if (b = window.getSelection(),
            b.getRangeAt && b.rangeCount) {
                c = b.getRangeAt(0),
                c.deleteContents();
                var d = document.createElement("div");
                d.innerHTML = a;
                var e = document.createDocumentFragment(), f, g;
                while (f = d.firstChild)
                    g = e.appendChild(f);
                c.insertNode(e),
                g && (c = c.cloneRange(),
                c.setStartAfter(g),
                c.collapse(!0),
                b.removeAllRanges(),
                b.addRange(c))
            }
        } else
            document.selection && "Control" != document.selection.type && document.selection.createRange().pasteHTML(a)
    }
    var r = function() {
        return a.fn.emojioneArea && a.fn.emojioneArea.defaults ? a.fn.emojioneArea.defaults : {
            attributes: {
                dir: "ltr",
                spellcheck: !1,
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off"
            },
            placeholder: null,
            emojiPlaceholder: ":smiley:",
            container: null,
            hideSource: !0,
            shortnames: !0,
            sprite: !0,
            pickerPosition: "top",
            filtersPosition: "top",
            hidePickerOnBlur: !0,
            buttonTitle: "Используйте клавишу TAB для вставки смайликов",
            tones: !0,
            tonesStyle: "bullet",
            inline: null,
            saveEmojisAs: "unicode",
            shortcuts: !0,
            autocomplete: !0,
            autocompleteTones: !1,
            standalone: !1,
            useInternalCDN: !0,
            imageType: "png",
            recentEmojis: !0,
            textcomplete: {
                maxCount: 15,
                placement: null
            },
            filters: {
                tones: {
                    title: "Diversity",
                    emoji: "santa runner surfer swimmer lifter ear nose point_up_2 point_down point_left point_right punch wave ok_hand thumbsup thumbsdown clap open_hands boy girl man woman cop bride_with_veil person_with_blond_hair man_with_gua_pi_mao man_with_turban older_man grandma baby construction_worker princess angel information_desk_person guardsman dancer nail_care massage haircut muscle spy hand_splayed middle_finger vulcan no_good ok_woman bow raising_hand raised_hands person_frowning person_with_pouting_face pray rowboat bicyclist mountain_bicyclist walking bath metal point_up basketball_player fist raised_hand v writing_hand"
                },
                recent: {
                    icon: "clock3",
                    title: "Недавние",
                    emoji: ""
                },
                smileys_people: {
                    icon: "yum",
                    title: "Люди",
                    emoji: "grinning grimacing grin joy smiley smile sweat_smile laughing innocent wink blush slight_smile upside_down relaxed yum relieved heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth nerd sunglasses hugging smirk no_mouth neutral_face expressionless unamused rolling_eyes thinking flushed disappointed worried angry rage pensive confused slight_frown frowning2 persevere confounded tired_face weary triumph open_mouth scream fearful cold_sweat hushed frowning anguished cry disappointed_relieved sleepy sweat sob dizzy_face astonished zipper_mouth mask thermometer_face head_bandage sleeping zzz poop smiling_imp imp japanese_ogre japanese_goblin skull ghost alien robot smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face pouting_cat raised_hands clap wave thumbsup thumbsdown punch fist v ok_hand raised_hand open_hands muscle pray point_up point_up_2 point_down point_left point_right middle_finger hand_splayed metal vulcan writing_hand nail_care lips tongue ear nose eye eyes bust_in_silhouette busts_in_silhouette speaking_head baby boy girl man woman person_with_blond_hair older_man older_woman man_with_gua_pi_mao man_with_turban cop construction_worker guardsman spy santa angel princess bride_with_veil walking runner dancer dancers couple two_men_holding_hands two_women_holding_hands bow information_desk_person no_good ok_woman raising_hand person_with_pouting_face person_frowning haircut massage couple_with_heart couple_ww couple_mm couplekiss kiss_ww kiss_mm family family_mwg family_mwgb family_mwbb family_mwgg family_wwb family_wwg family_wwgb family_wwbb family_wwgg family_mmb family_mmg family_mmgb family_mmbb family_mmgg womans_clothes shirt jeans necktie dress bikini kimono lipstick kiss footprints high_heel sandal boot mans_shoe athletic_shoe womans_hat tophat helmet_with_cross mortar_board crown school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses ring closed_umbrella"
                },
                animals_nature: {
                    icon: "hamster",
                    title: "Животные",
                    emoji: "dog cat mouse hamster rabbit bear panda_face koala tiger lion_face cow pig pig_nose frog octopus monkey_face see_no_evil hear_no_evil speak_no_evil monkey chicken penguin bird baby_chick hatching_chick hatched_chick wolf boar horse unicorn bee bug snail beetle ant spider scorpion crab snake turtle tropical_fish fish blowfish dolphin whale whale2 crocodile leopard tiger2 water_buffalo ox cow2 dromedary_camel camel elephant goat ram sheep racehorse pig2 rat mouse2 rooster turkey dove dog2 poodle cat2 rabbit2 chipmunk feet dragon dragon_face cactus christmas_tree evergreen_tree deciduous_tree palm_tree seedling herb shamrock four_leaf_clover bamboo tanabata_tree leaves fallen_leaf maple_leaf ear_of_rice hibiscus sunflower rose tulip blossom cherry_blossom bouquet mushroom chestnut jack_o_lantern shell spider_web earth_americas earth_africa earth_asia full_moon waning_gibbous_moon last_quarter_moon waning_crescent_moon new_moon waxing_crescent_moon first_quarter_moon waxing_gibbous_moon new_moon_with_face full_moon_with_face first_quarter_moon_with_face last_quarter_moon_with_face sun_with_face crescent_moon star star2 dizzy sparkles comet sunny white_sun_small_cloud partly_sunny white_sun_cloud white_sun_rain_cloud cloud cloud_rain thunder_cloud_rain cloud_lightning zap fire boom snowflake cloud_snow snowman2 snowman wind_blowing_face dash cloud_tornado fog umbrella2 umbrella droplet sweat_drops ocean"
                },
                food_drink: {
                    icon: "pizza",
                    title: "Еда и напитки",
                    emoji: "green_apple apple pear tangerine lemon banana watermelon grapes strawberry melon cherries peach pineapple tomato eggplant hot_pepper corn sweet_potato honey_pot bread cheese poultry_leg meat_on_bone fried_shrimp egg hamburger fries hotdog pizza spaghetti taco burrito ramen stew fish_cake sushi bento curry rice_ball rice rice_cracker oden dango shaved_ice ice_cream icecream cake birthday custard candy lollipop chocolate_bar popcorn doughnut cookie beer beers wine_glass cocktail tropical_drink champagne sake tea coffee baby_bottle fork_and_knife fork_knife_plate"
                },
                activity: {
                    icon: "basketball",
                    title: "Активный отдых",
                    emoji: "soccer basketball football baseball tennis volleyball rugby_football 8ball golf golfer ping_pong badminton hockey field_hockey cricket ski skier snowboarder ice_skate bow_and_arrow fishing_pole_and_fish rowboat swimmer surfer bath basketball_player lifter bicyclist mountain_bicyclist horse_racing levitate trophy running_shirt_with_sash medal military_medal reminder_ribbon rosette ticket tickets performing_arts art circus_tent microphone headphones musical_score musical_keyboard saxophone trumpet guitar violin clapper video_game space_invader dart game_die slot_machine bowling"
                },
                travel_places: {
                    icon: "rocket",
                    title: "Путешествия",
                    emoji: "red_car taxi blue_car bus trolleybus race_car police_car ambulance fire_engine minibus truck articulated_lorry tractor motorcycle bike rotating_light oncoming_police_car oncoming_bus oncoming_automobile oncoming_taxi aerial_tramway mountain_cableway suspension_railway railway_car train monorail bullettrain_side bullettrain_front light_rail mountain_railway steam_locomotive train2 metro tram station helicopter airplane_small airplane airplane_departure airplane_arriving sailboat motorboat speedboat ferry cruise_ship rocket satellite_orbital seat anchor construction fuelpump busstop vertical_traffic_light traffic_light checkered_flag ship ferris_wheel roller_coaster carousel_horse construction_site foggy tokyo_tower factory fountain rice_scene mountain mountain_snow mount_fuji volcano japan camping tent park motorway railway_track sunrise sunrise_over_mountains desert beach island city_sunset city_dusk cityscape night_with_stars bridge_at_night milky_way stars sparkler fireworks rainbow homes european_castle japanese_castle stadium statue_of_liberty house house_with_garden house_abandoned office department_store post_office european_post_office hospital bank hotel convenience_store school love_hotel wedding classical_building church mosque synagogue kaaba shinto_shrine"
                },
                objects: {
                    icon: "bulb",
                    title: "Объекты",
                    emoji: "watch iphone calling computer keyboard desktop printer mouse_three_button trackball joystick compression minidisc floppy_disk cd dvd vhs camera camera_with_flash video_camera movie_camera projector film_frames telephone_receiver telephone pager fax tv radio microphone2 level_slider control_knobs stopwatch timer alarm_clock clock hourglass_flowing_sand hourglass satellite battery electric_plug bulb flashlight candle wastebasket oil money_with_wings dollar yen euro pound moneybag credit_card gem scales wrench hammer hammer_pick tools pick nut_and_bolt gear chains gun bomb knife dagger crossed_swords shield smoking skull_crossbones coffin urn amphora crystal_ball prayer_beads barber alembic telescope microscope hole pill syringe thermometer label bookmark toilet shower bathtub key key2 couch sleeping_accommodation bed door bellhop frame_photo map beach_umbrella moyai shopping_bags balloon flags ribbon gift confetti_ball tada dolls wind_chime crossed_flags izakaya_lantern envelope envelope_with_arrow incoming_envelope e-mail love_letter postbox mailbox_closed mailbox mailbox_with_mail mailbox_with_no_mail package postal_horn inbox_tray outbox_tray scroll page_with_curl bookmark_tabs bar_chart chart_with_upwards_trend chart_with_downwards_trend page_facing_up date calendar calendar_spiral card_index card_box ballot_box file_cabinet clipboard notepad_spiral file_folder open_file_folder dividers newspaper2 newspaper notebook closed_book green_book blue_book orange_book notebook_with_decorative_cover ledger books book link paperclip paperclips scissors triangular_ruler straight_ruler pushpin round_pushpin triangular_flag_on_post flag_white flag_black closed_lock_with_key lock unlock lock_with_ink_pen pen_ballpoint pen_fountain black_nib pencil pencil2 crayon paintbrush mag mag_right"
                },
                symbols: {
                    icon: "heartpulse",
                    title: "Символы",
                    emoji: "heart yellow_heart green_heart blue_heart purple_heart broken_heart heart_exclamation two_hearts revolving_hearts heartbeat heartpulse sparkling_heart cupid gift_heart heart_decoration peace cross star_and_crescent om_symbol wheel_of_dharma star_of_david six_pointed_star menorah yin_yang orthodox_cross place_of_worship ophiuchus aries taurus gemini cancer leo virgo libra scorpius sagittarius capricorn aquarius pisces id atom u7a7a u5272 radioactive biohazard mobile_phone_off vibration_mode u6709 u7121 u7533 u55b6 u6708 eight_pointed_black_star vs accept white_flower ideograph_advantage secret congratulations u5408 u6e80 u7981 a b ab cl o2 sos no_entry name_badge no_entry_sign x o anger hotsprings no_pedestrians do_not_litter no_bicycles non-potable_water underage no_mobile_phones exclamation grey_exclamation question grey_question bangbang interrobang 100 low_brightness high_brightness trident fleur-de-lis part_alternation_mark warning children_crossing beginner recycle u6307 chart sparkle eight_spoked_asterisk negative_squared_cross_mark white_check_mark diamond_shape_with_a_dot_inside cyclone loop globe_with_meridians m atm sa passport_control customs baggage_claim left_luggage wheelchair no_smoking wc parking potable_water mens womens baby_symbol restroom put_litter_in_its_place cinema signal_strength koko ng ok up cool new free zero one two three four five six seven eight nine ten 1234 arrow_forward pause_button play_pause stop_button record_button track_next track_previous fast_forward rewind twisted_rightwards_arrows repeat repeat_one arrow_backward arrow_up_small arrow_down_small arrow_double_up arrow_double_down arrow_right arrow_left arrow_up arrow_down arrow_upper_right arrow_lower_right arrow_lower_left arrow_upper_left arrow_up_down left_right_arrow arrows_counterclockwise arrow_right_hook leftwards_arrow_with_hook arrow_heading_up arrow_heading_down hash asterisk information_source abc abcd capital_abcd symbols musical_note notes wavy_dash curly_loop heavy_check_mark arrows_clockwise heavy_plus_sign heavy_minus_sign heavy_division_sign heavy_multiplication_x heavy_dollar_sign currency_exchange copyright registered tm end back on top soon ballot_box_with_check radio_button white_circle black_circle red_circle large_blue_circle small_orange_diamond small_blue_diamond large_orange_diamond large_blue_diamond small_red_triangle black_small_square white_small_square black_large_square white_large_square small_red_triangle_down black_medium_square white_medium_square black_medium_small_square white_medium_small_square black_square_button white_square_button speaker sound loud_sound mute mega loudspeaker bell no_bell black_joker mahjong spades clubs hearts diamonds flower_playing_cards thought_balloon anger_right speech_balloon clock1 clock2 clock3 clock4 clock5 clock6 clock7 clock8 clock9 clock10 clock11 clock12 clock130 clock230 clock330 clock430 clock530 clock630 clock730 clock830 clock930 clock1030 clock1130 clock1230 eye_in_speech_bubble"
                },
                flags: {
                    icon: "flag_gb",
                    title: "Флаги",
                    emoji: "ac af al dz ad ao ai ag ar am aw au at az bs bh bd bb by be bz bj bm bt bo ba bw br bn bg bf bi cv kh cm ca ky cf td flag_cl cn co km cg flag_cd cr hr cu cy cz dk dj dm do ec eg sv gq er ee et fk fo fj fi fr pf ga gm ge de gh gi gr gl gd gu gt gn gw gy ht hn hk hu is in flag_id ir iq ie il it ci jm jp je jo kz ke ki xk kw kg la lv lb ls lr ly li lt lu mo mk mg mw my mv ml mt mh mr mu mx fm md mc mn me ms ma mz mm na nr np nl nc nz ni ne flag_ng nu kp no om pk pw ps pa pg py pe ph pl pt pr qa ro ru rw sh kn lc vc ws sm st flag_sa sn rs sc sl sg sk si sb so za kr es lk sd sr sz se ch sy tw tj tz th tl tg to tt tn tr flag_tm flag_tm ug ua ae gb us vi uy uz vu va ve vn wf eh ye zm zw re ax ta io bq cx cc gg im yt nf pn bl pm gs tk bv hm sj um ic ea cp dg as aq vg ck cw eu gf tf gp mq mp sx ss tc "
                }
            }
        }
    };
    function s(a) {
        return "object" == typeof a
    }
    function t(b) {
        var c = r();
        if (b && b.filters) {
            var d = c.filters;
            a.each(b.filters, function(b, c) {
                return !s(c) || a.isEmptyObject(c) ? void delete d[b] : void a.each(c, function(a, c) {
                    d[b][a] = c
                })
            }),
            b.filters = d
        }
        return a.extend({}, c, b)
    }
    var u, v;
    window.getSelection && document.createRange ? (u = function(a) {
        var b = window.getSelection && window.getSelection();
        if (b && b.rangeCount > 0)
            return b.getRangeAt(0)
    }
    ,
    v = function(a, b) {
        var c = document.createRange();
        c.setStart(b.startContainer, b.startOffset),
        c.setEnd(b.endContainer, b.endOffset),
        b = window.getSelection(),
        b.removeAllRanges(),
        b.addRange(c)
    }
    ) : document.selection && document.body.createTextRange && (u = function(a) {
        return document.selection.createRange()
    }
    ,
    v = function(a, b) {
        var c = document.body.createTextRange();
        c.moveToElementText(a),
        c.setStart(b.startContanier, b.startOffset),
        c.setEnd(b.endContainer, b.endOffset),
        c.select()
    }
    );
    var w;
    function x(a, b) {
        return a.replace(w, function(a) {
            var c = e[0 === k ? "jsecapeMap" : "jsEscapeMap"];
            return "undefined" != typeof a && a in c ? o(b, c[a]) : a
        })
    }
    function y(a, b) {
        return a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/`/g, "&#x60;").replace(/(?:\r\n|\r|\n)/g, "\n").replace(/(\n+)/g, "<div>$1</div>").replace(/\n/g, "<br/>").replace(/<br\/><\/div>/g, "</div>"),
        b.shortnames && (a = e.shortnameToUnicode(a)),
        x(a, b.emojiTemplate).replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/  /g, "&nbsp;&nbsp;")
    }
    function z(a, b) {
        switch (a = a.replace(/<img[^>]*alt="([^"]+)"[^>]*>/gi, "$1").replace(/\n|\r/g, "").replace(/<br[^>]*>/gi, "\n").replace(/(?:<(?:div|p|ol|ul|li|pre|code|object)[^>]*>)+/gi, "<div>").replace(/(?:<\/(?:div|p|ol|ul|li|pre|code|object)>)+/gi, "</div>").replace(/\n<div><\/div>/gi, "\n").replace(/<div><\/div>\n/gi, "\n").replace(/(?:<div>)+<\/div>/gi, "\n").replace(/([^\n])<\/div><div>/gi, "$1\n").replace(/(?:<\/div>)+/gi, "</div>").replace(/([^\n])<\/div>([^\n])/gi, "$1\n$2").replace(/<\/div>/gi, "").replace(/([^\n])<div>/gi, "$1\n").replace(/\n<div>/gi, "\n").replace(/<div>\n/gi, "\n\n").replace(/<(?:[^>]+)?>/g, "").replace(new RegExp(l,"g"), "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x60;/g, "`").replace(/&amp;/g, "&"),
        b.saveEmojisAs) {
        case "image":
            a = x(a, b.emojiTemplate);
            break;
        case "shortname":
            a = e.toShort(a)
        }
        return a
    }
    function A() {
        var a = this
          , b = a.editor[0].offsetWidth - a.editor[0].clientWidth
          , c = parseInt(a.button.css("marginRight"));
        c !== b && (a.button.css({
            marginRight: b
        }),
        a.floatingPicker && a.picker.css({
            right: parseInt(a.picker.css("right")) - c + b
        }))
    }
    function B() {
        var b = this;
        if (!b.sprite && b.lasyEmoji[0]) {
            var c = b.picker.offset().top
              , d = c + b.picker.height() + 20;
            b.lasyEmoji.each(function() {
                var b = a(this)
                  , e = b.offset().top;
                e > c && e < d && b.attr("src", b.data("src")).removeClass("lazy-emoji")
            }),
            b.lasyEmoji = b.lasyEmoji.filter(".lazy-emoji")
        }
    }
    function C(a, b) {
        return (b ? "" : ".") + j + (a ? "-" + a : "")
    }
    function D(b) {
        var c = a("<div/>", s(b) ? b : {
            "class": C(b, !0)
        });
        return a.each(i.call(arguments).slice(1), function(b, d) {
            a.isFunction(d) && (d = d.call(c)),
            d && a(d).appendTo(c)
        }),
        c
    }
    function E() {
        return localStorage.getItem("recent_emojis") || ""
    }
    function F(b) {
        var c = E();
        if (!b.recent || b.recent !== c) {
            if (c.length) {
                var d = b.scrollArea.is(".skinnable"), e, f;
                d || (e = b.scrollArea.scrollTop(),
                f = b.recentCategory.is(":visible") ? b.recentCategory.height() : 0);
                var g = p(c, b.emojiBtnTemplate, !0).split("|").join("");
                if (b.recentCategory.children(".emojibtn").remove(),
                a(g).insertAfter(b.recentCategory.children("h1")),
                b.recentCategory.children(".emojibtn").on("click", function() {
                    b.trigger("emojibtn.click", a(this))
                }),
                b.recentFilter.show(),
                !d) {
                    b.recentCategory.show();
                    var h = b.recentCategory.height();
                    f !== h && b.scrollArea.scrollTop(e + h - f)
                }
            } else
                b.recentFilter.hasClass("active") && b.recentFilter.removeClass("active").next().addClass("active"),
                b.recentCategory.hide(),
                b.recentFilter.hide();
            b.recent = c
        }
    }
    function G(a, b) {
        var c = E()
          , d = c.split("|")
          , e = d.indexOf(b);
        e !== -1 && d.splice(e, 1),
        d.unshift(b),
        d.length > 9 && d.pop(),
        localStorage.setItem("recent_emojis", d.join("|")),
        F(a)
    }
    function H() {
        var a = "test";
        try {
            return localStorage.setItem(a, a),
            localStorage.removeItem(a),
            !0
        } catch (b) {
            return !1
        }
    }
    function I(b, c, d) {
        d = t(d),
        b.sprite = d.sprite && k < 3,
        b.inline = null === d.inline ? c.is("INPUT") : d.inline,
        b.shortnames = d.shortnames,
        b.saveEmojisAs = d.saveEmojisAs,
        b.standalone = d.standalone,
        b.emojiTemplate = '<img alt="{alt}" class="emojione' + (b.sprite ? '-{uni}" src="' + h + '"/>' : 'emoji" src="{img}"/>'),
        b.emojiTemplateAlt = b.sprite ? '<i class="emojione-{uni}"/>' : '<img class="emojioneemoji" src="{img}"/>',
        b.emojiBtnTemplate = '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}">' + b.emojiTemplateAlt + "</i>",
        b.recentEmojis = d.recentEmojis && H();
        var f = d.pickerPosition;
        b.floatingPicker = "top" === f || "bottom" === f;
        var g = c.is("TEXTAREA") || c.is("INPUT") ? "val" : "text", i, o, r, w, x, I, J, K, L, M, N = D({
            "class": j + (b.standalone ? " " + j + "-standalone " : " ") + (c.attr("class") || ""),
            role: "application"
        }, i = b.editor = D("editor").attr({
            contenteditable: !b.standalone,
            placeholder: d.placeholder || c.data("placeholder") || c.attr("placeholder") || "",
            tabindex: 0
        }), o = b.button = D("button", D("button-open"), D("button-close")).attr("title", d.buttonTitle), r = b.picker = D("picker", D("wrapper", x = D("filters"), J = D("search", function() {
            b.search = a("<input/>", {
                placeholder: "Быстрый поиск...",
                type: "text",
                "class": "search"
            }),
            this.append(b.search)
        }), w = D("tones", function() {
            if (d.tones) {
                this.addClass(C("tones-" + d.tonesStyle, !0));
                for (var b = 0; b <= 5; b++)
                    this.append(a("<i/>", {
                        "class": "btn-tone btn-tone-" + b + (b ? "" : " active"),
                        "data-skin": b,
                        role: "button"
                    }))
            }
        }), M = D("scroll-area", K = D("emojis-list")))).addClass(C("picker-position-" + d.pickerPosition, !0)).addClass(C("filters-position-" + d.filtersPosition, !0)).addClass("hidden"));
        if (b.searchSel = null,
        i.data(c.data()),
        a.each(d.attributes, function(a, b) {
            i.attr(a, b)
        }),
        a.each(d.filters, function(c, e) {
            var f = 0;
            if ("recent" !== c || b.recentEmojis) {
                if ("tones" !== c)
                    a("<i/>", {
                        "class": C("filter", !0) + " " + C("filter-" + c, !0),
                        "data-filter": c,
                        title: e.title
                    }).wrapInner(p(e.icon, b.emojiTemplateAlt)).appendTo(x);
                else {
                    if (!d.tones)
                        return;
                    f = 5
                }
                do {
                    var g = D("category").attr({
                        name: c,
                        "data-tone": f
                    }).appendTo(K)
                      , h = e.emoji.replace(/[\s,;]+/g, "|");
                    f > 0 && (g.hide(),
                    h = h.split("|").join("_tone" + f + "|") + "_tone" + f),
                    "recent" === c && (h = E()),
                    h = p(h, b.sprite ? '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}"><i class="emojione-{uni}"></i></i>' : '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}"><img class="emojioneemoji lazy-emoji" data-src="{img}"/></i>', !0).split("|").join(""),
                    g.html(h),
                    a("<h1/>").text(e.title).prependTo(g)
                } while (--f > 0)
            }
        }),
        d.filters = null,
        b.sprite || (b.lasyEmoji = K.find(".lazy-emoji")),
        I = x.find(C("filter")),
        I.eq(0).addClass("active"),
        L = K.find(C("category")),
        b.recentFilter = I.filter('[data-filter="recent"]'),
        b.recentCategory = L.filter("[name=recent]"),
        b.scrollArea = M,
        d.container ? a(d.container).wrapInner(N) : N.insertAfter(c),
        d.hideSource && c.hide(),
        b.setText(c[g]()),
        c[g](b.getText()),
        A.apply(b),
        b.standalone && !b.getText().length) {
            var O = a(c).data("emoji-placeholder") || d.emojiPlaceholder;
            b.setText(O),
            i.addClass("has-placeholder")
        }
        n(b, K.find(".emojibtn"), {
            click: "emojibtn.click"
        }),
        n(b, window, {
            resize: "!resize"
        }),
        n(b, w.children(), {
            click: "tone.click"
        }),
        n(b, [r, o], {
            mousedown: "!mousedown"
        }, i),
        n(b, o, {
            click: "button.click"
        }),
        n(b, i, {
            paste: "!paste"
        }, i),
        n(b, i, ["focus", "blur"], function() {
            return !b.stayFocused && i
        }),
        n(b, r, {
            mousedown: "picker.mousedown",
            mouseup: "picker.mouseup",
            click: "picker.click",
            keyup: "picker.keyup",
            keydown: "picker.keydown",
            keypress: "picker.keypress"
        }),
        n(b, i, ["mousedown", "mouseup", "click", "keyup", "keydown", "keypress"]),
        n(b, r.find(".emojionearea-filter"), {
            click: "filter.click"
        }),
        n(b, b.search, {
            keyup: "search.keypress",
            focus: "search.focus",
            blur: "search.blur"
        });
        var P = !1;
        if (M.on("scroll", function() {
            if (!P && (B.call(b),
            M.is(":not(.skinnable)"))) {
                var c = L.eq(0)
                  , d = M.offset().top;
                L.each(function(b, e) {
                    return !(a(e).offset().top - d >= 10) && void (c = a(e))
                });
                var e = I.filter('[data-filter="' + c.attr("name") + '"]');
                e[0] && !e.is(".active") && (I.removeClass("active"),
                e.addClass("active"))
            }
        }),
        b.on("@filter.click", function(a) {
            var c = a.is(".active");
            if (M.is(".skinnable")) {
                if (c)
                    return;
                w.children().eq(0).click()
            }
            P = !0,
            c || (I.filter(".active").removeClass("active"),
            a.addClass("active"));
            var d = L.filter('[name="' + a.data("filter") + '"]').offset().top
              , e = M.scrollTop()
              , f = M.offset().top;
            M.stop().animate({
                scrollTop: d + e - f - 2
            }, 200, "swing", function() {
                B.call(b),
                P = !1
            })
        }).on("@picker.show", function() {
            b.recentEmojis && F(b),
            B.call(b)
        }).on("@tone.click", function(a) {
            w.children().removeClass("active");
            var c = a.addClass("active").data("skin");
            c ? (M.addClass("skinnable"),
            L.hide().filter("[data-tone=" + c + "]").show(),
            I.eq(0).is('.active[data-filter="recent"]') && I.eq(0).removeClass("active").next().addClass("active")) : (M.removeClass("skinnable"),
            L.hide().filter("[data-tone=0]").show(),
            I.eq(0).click()),
            B.call(b)
        }).on("@button.click", function(a) {
            a.is(".active") ? b.hidePicker() : (b.showPicker(),
            b.searchSel = null)
        }).on("@!paste", function(c, d) {
            var e = function(d) {
                var e = "caret-" + (new Date).getTime()
                  , f = y(d, b);
                q(f),
                q('<i id="' + e + '"></i>'),
                c.scrollTop(h);
                var g = a("#" + e)
                  , i = g.offset().top - c.offset().top
                  , j = c.height();
                (h + i >= j || h > i) && c.scrollTop(h + i - 2 * j / 3),
                g.remove(),
                b.stayFocused = !1,
                A.apply(b),
                m(b, "paste", [c, d, f])
            };
            if (d.originalEvent.clipboardData) {
                var f = d.originalEvent.clipboardData.getData("text/plain");
                return e(f),
                d.preventDefault ? d.preventDefault() : d.stop(),
                d.returnValue = !1,
                d.stopPropagation(),
                !1
            }
            b.stayFocused = !0,
            q("<span>" + l + "</span>");
            var g = u(c[0])
              , h = c.scrollTop()
              , i = a("<div/>", {
                contenteditable: !0
            }).css({
                position: "fixed",
                left: "-999px",
                width: "1px",
                height: "1px",
                top: "20px",
                overflow: "hidden"
            }).appendTo(a("BODY")).focus();
            window.setTimeout(function() {
                c.focus(),
                v(c[0], g);
                var a = z(i.html().replace(/\r\n|\n|\r/g, "<br>"), b);
                i.remove(),
                e(a)
            }, 200)
        }).on("@emojibtn.click", function(a) {
            i.removeClass("has-placeholder"),
            null !== b.searchSel && (i.focus(),
            v(i[0], b.searchSel),
            b.searchSel = null),
            b.standalone ? (i.html(p(a.data("name"), b.emojiTemplate)),
            b.trigger("blur")) : (u(i[0]),
            q(p(a.data("name"), b.emojiTemplate))),
            b.recentEmojis && G(b, a.data("name")),
            b.search.val(""),
            b.trigger("search.keypress")
        }).on("@!resize @keyup @emojibtn.click", A).on("@!mousedown", function(c, d) {
            return a(d.target).hasClass("search") ? (b.stayFocused = !0,
            null == b.searchSel && (b.searchSel = u(c[0]))) : (N.is(".focused") || c.focus(),
            d.preventDefault()),
            !1
        }).on("@change", function() {
            var a = b.editor.html().replace(/<\/?(?:div|span|p)[^>]*>/gi, "");
            a.length && !/^<br[^>]*>$/i.test(a) || b.editor.html(b.content = ""),
            c[g](b.getText())
        }).on("@focus", function() {
            N.addClass("focused")
        }).on("@blur", function() {
            N.removeClass("focused"),
            d.hidePickerOnBlur && b.hidePicker();
            var a = b.editor.html();
            b.content !== a ? (b.content = a,
            m(b, "change", [b.editor]),
            c.blur().trigger("change")) : c.blur(),
            b.search.val(""),
            b.trigger("search.keypress")
        }).on("@search.focus", function() {
            b.stayFocused = !0,
            b.search.addClass("focused")
        }).on("@search.keypress", function() {
            var c = r.find(".emojionearea-filter")
              , d = b.search.val().replace(/ /g, "_").replace(/"/g, '\\"');
            "" !== d ? (L.filter('[data-tone="' + w.find("i.active").data("skin") + '"]:not([name="recent"])').each(function() {
                var b = a(this)
                  , e = b.find('.emojibtn[data-name*="' + d + '"]');
                if (0 === e.length)
                    b.hide(),
                    c.filter('[data-filter="' + b.attr("name") + '"]').hide();
                else {
                    var f = b.find('.emojibtn:not([data-name*="' + d + '"])');
                    f.hide(),
                    e.show(),
                    b.show(),
                    c.filter('[data-filter="' + b.attr("name") + '"]').show()
                }
            }),
            P ? B.call(b) : M.trigger("scroll")) : (L.filter('[data-tone="' + w.find("i.active").data("skin") + '"]:not([name="recent"])').show(),
            a(".emojibtn", L).show(),
            c.show())
        }).on("@search.blur", function() {
            b.stayFocused = !1,
            b.search.removeClass("focused"),
            b.trigger("blur")
        }),
        d.shortcuts && b.on("@keydown", function(a, c) {
            c.ctrlKey || (9 == c.which ? (c.preventDefault(),
            o.click()) : 27 == c.which && (c.preventDefault(),
            o.is(".active") && b.hidePicker()))
        }),
        s(d.events) && !a.isEmptyObject(d.events) && a.each(d.events, function(a, c) {
            b.on(a.replace(/_/g, "."), c)
        }),
        d.autocomplete) {
            var Q = function() {
                var c = {
                    maxCount: d.textcomplete.maxCount,
                    placement: d.textcomplete.placement
                };
                d.shortcuts && (c.onKeydown = function(a, b) {
                    if (!a.ctrlKey && 13 == a.which)
                        return b.KEY_ENTER
                }
                );
                var f = a.map(e.emojioneList, function(a, b) {
                    return d.autocompleteTones ? b : /_tone[12345]/.test(b) ? null : b
                });
                f.sort(),
                i.textcomplete([{
                    id: j,
                    match: /\B(:[\-+\w]*)$/,
                    search: function(b, c) {
                        c(a.map(f, function(a) {
                            return 0 === a.indexOf(b) ? a : null
                        }))
                    },
                    template: function(a) {
                        return p(a, b.emojiTemplate) + " " + a.replace(/:/g, "")
                    },
                    replace: function(a) {
                        return p(a, b.emojiTemplate)
                    },
                    cache: !0,
                    index: 1
                }], c),
                d.textcomplete.placement && "static" == a(i.data("textComplete").option.appendTo).css("position") && a(i.data("textComplete").option.appendTo).css("position", "relative")
            };
            a.fn.textcomplete ? Q() : a.getScript("https://cdn.rawgit.com/yuku-t/jquery-textcomplete/v1.3.4/dist/jquery.textcomplete.js", Q)
        }
        b.inline && (N.addClass(C("inline", !0)),
        b.on("@keydown", function(a, b) {
            13 == b.which && b.preventDefault()
        })),
        /firefox/i.test(navigator.userAgent) && document.execCommand("enableObjectResizing", !1, !1)
    }
    var J = window.emojioneVersion || "2.1.4"
      , K = {
        defaultBase: "https://cdnjs.cloudflare.com/ajax/libs/emojione/",
        base: null,
        isLoading: !1
    };
    function L(b) {
        function c(a) {
            var b = a.cacheBustParam;
            return s(a.jsEscapeMap) ? "?v=1.2.4" === b ? "2.0.0" : "?v=2.0.1" === b ? "2.1.0" : "?v=2.1.1" === b ? "2.1.1" : "?v=2.1.2" === b ? "2.1.2" : "?v=2.1.3" === b ? "2.1.3" : "?v=2.1.4" === b ? "2.1.4" : "2.2.7" : "1.5.2"
        }
        function d(a) {
            switch (a) {
            case "1.5.2":
                return 0;
            case "2.0.0":
                return 1;
            case "2.1.0":
            case "2.1.1":
                return 2;
            case "2.1.2":
                return 3;
            case "2.1.3":
            case "2.1.4":
            case "2.2.7":
            default:
                return 4
            }
        }
        b = t(b),
        K.isLoading || (!e || d(c(e)) < 2 ? (K.isLoading = !0,
        a.getScript(K.defaultBase + J + "/lib/js/emojione.min.js", function() {
            if (e = window.emojione,
            J = c(e),
            k = d(J),
            K.base = K.defaultBase + J + "/assets",
            b.sprite) {
                var g = K.base + "/sprites/emojione.sprites.css";
                document.createStyleSheet ? document.createStyleSheet(g) : a("<link/>", {
                    rel: "stylesheet",
                    href: g
                }).appendTo("head")
            }
            while (f.length)
                f.shift().call();
            K.isLoading = !1
        })) : (J = c(e),
        k = d(J),
        K.base = K.defaultBase + J + "/assets")),
        g(function() {
            b.useInternalCDN && (e.imagePathPNG = K.base + "/png/",
            e.imagePathSVG = K.base + "/svg/",
            e.imagePathSVGSprites = K.base + "/sprites/emojione.sprites.svg",
            e.imageType = b.imageType),
            w = new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" + e.unicodeRegexp + ")","gi")
        })
    }
    var M = function(a, e) {
        var f = this;
        L(e),
        c[f.id = ++b] = {},
        d[f.id] = {},
        g(function() {
            I(f, a, e)
        })
    };
    function N(b, c) {
        c = c.replace(/^@/, "");
        var e = b.id;
        d[e][c] && (a.each(d[e][c], function(d, e) {
            a.each(a.isArray(e[0]) ? e[0] : [e[0]], function(d, f) {
                a(f).on(e[1], function() {
                    var d = i.call(arguments)
                      , f = a.isFunction(e[2]) ? e[2].apply(b, [c].concat(d)) : e[2];
                    f && m(b, c, [f].concat(d))
                })
            })
        }),
        d[e][c] = null)
    }
    M.prototype.on = function(b, d) {
        if (b && a.isFunction(d)) {
            var e = this;
            a.each(b.toLowerCase().split(" "), function(a, b) {
                N(e, b),
                (c[e.id][b] || (c[e.id][b] = [])).push(d)
            })
        }
        return this
    }
    ,
    M.prototype.off = function(b, d) {
        if (b) {
            var e = this.id;
            a.each(b.toLowerCase().replace(/_/g, ".").split(" "), function(b, f) {
                c[e][f] && !/^@/.test(f) && (d ? a.each(c[e][f], function(a, b) {
                    b === d && (c[e][f] = c[e][f].splice(a, 1))
                }) : c[e][f] = [])
            })
        }
        return this
    }
    ,
    M.prototype.trigger = function() {
        var a = i.call(arguments)
          , b = [this].concat(a.slice(0, 1));
        return b.push(a.slice(1)),
        m.apply(this, b)
    }
    ,
    M.prototype.setFocus = function() {
        var a = this;
        return g(function() {
            a.editor.focus()
        }),
        a
    }
    ,
    M.prototype.setText = function(a) {
        var b = this;
        return g(function() {
            b.editor.html(y(a, b)),
            b.content = b.editor.html(),
            m(b, "change", [b.editor]),
            A.apply(b)
        }),
        b
    }
    ,
    M.prototype.getText = function() {
        return z(this.editor.html(), this)
    }
    ,
    M.prototype.showPicker = function() {
        var a = this;
        return a._sh_timer && window.clearTimeout(a._sh_timer),
        a.picker.removeClass("hidden"),
        a._sh_timer = window.setTimeout(function() {
            a.button.addClass("active")
        }, 50),
        m(a, "picker.show", [a.picker]),
        a
    }
    ,
    M.prototype.hidePicker = function() {
        var a = this;
        return a._sh_timer && window.clearTimeout(a._sh_timer),
        a.button.removeClass("active"),
        a._sh_timer = window.setTimeout(function() {
            a.picker.addClass("hidden")
        }, 500),
        m(a, "picker.hide", [a.picker]),
        a
    }
    ,
    M.prototype.enable = function() {
        var a = this;
        return g(function() {
            a.editor.prop("contenteditable", !0),
            a.button.show()
        }),
        a
    }
    ,
    M.prototype.disable = function() {
        var a = this;
        return g(function() {
            a.editor.prop("contenteditable", !1),
            a.hidePicker(),
            a.button.hide()
        }),
        a
    }
    ,
    a.fn.emojioneArea = function(b) {
        return this.each(function() {
            return this.emojioneArea ? this.emojioneArea : (a.data(this, "emojioneArea", this.emojioneArea = new M(a(this),b)),
            this.emojioneArea)
        })
    }
    ,
    a.fn.emojioneArea.defaults = r(),
    a.fn.emojioneAreaText = function(b) {
        var c = this
          , d = {
            shortnames: !b || "undefined" == typeof b.shortnames || b.shortnames,
            emojiTemplate: '<img alt="{alt}" class="emojione' + (b && b.sprite && k < 3 ? '-{uni}" src="' + h : 'emoji" src="{img}') + '"/>'
        };
        return L(b),
        g(function() {
            c.each(function() {
                var b = a(this);
                return b.hasClass("emojionearea-text") || b.addClass("emojionearea-text").html(y(b.is("TEXTAREA") || b.is("INPUT") ? b.val() : b.text(), d)),
                b
            })
        }),
        this
    }
}, window);
//# sourceMappingURL=emojionearea.min.map
