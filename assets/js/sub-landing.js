$(function () {
    // EGS Newsletter API Link
    const egsApiLink = "https://www.eg-software.com/api_egsdb/api";

    const language = document.querySelector("html")?.getAttribute("lang");
    const strhref = window.location.href;
    const strqueryParams = new URLSearchParams(new URL(strhref).search);
    const paramkeytitle = strqueryParams.get("keytitle");

    function filterDataByCurrentLanguage(language) {
        let currentLangCode = 1;
        let noResultText = "No result found for ";
        let headingText = "Latest Posts";
        let showAllText = "Show All";
        let pathText = "";

        if (language === "en") {
        currentLangCode = 1;
        noResultText = "No result found for ";
        headingText = "Latest Posts";
        showAllText = "Show All";
        pathText = "";
        } else if (language === "de") {
        currentLangCode = 2;
        noResultText = "Keine Ergebnisse gefunden für ";
        headingText = "Neueste Beiträge";
        showAllText = "Alle anzeigen";
        pathText = "de/";
        } else if (language === "fr") {
        currentLangCode = 3;
        noResultText = "Aucun résultat trouvé pour ";
        headingText = "Derniers Posts";
        showAllText = "Tout afficher";
        pathText = "fr/";
        } else if (language === "it") {
        currentLangCode = 4;
        noResultText = "Nessun risultato trovato per ";
        headingText = "Ultimi Post";
        showAllText = "Mostra Tutto";
        pathText = "it/";
        }
        const selectedCategory = $("#optionCategory").val() || 0;
        const enteredText = $("#searh-input").val() || "";
        const enteredTextInUri = encodeURIComponent(enteredText);

        const output = {
        data: {
            codelang: currentLangCode,
            category: selectedCategory,
            title: enteredTextInUri,
            param: 2,
        },
        text: {
            noResult: noResultText + enteredText,
            heading: headingText,
            showAll: showAllText,
            path: pathText,
        },
        };

        return output;
    }

    var newsletter1 = [];

    
    function fetchDataByKeyTitle(keytitle) {
        console.log(keytitle);
        const data = {
            keytitle: keytitle,
            codelang: filterDataByCurrentLanguage(language).data.codelang,
            param: 2,
        };
        // make the API request
        $.ajax({
            url: `${egsApiLink}/landing/show/details`,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (result) {
            newsletter1 = result[0];
            addToBodybyId(result[0]);
            },
            error: function (errorThrown) {
            console.error(errorThrown, "Error fetching");
            },
        });
        // $.ajax({
        //     url: `${egsApiLink}/logvisit/2`,
        //     type: "POST",
        //     data: JSON.stringify(data),
        //     contentType: "application/json",
        //     success: function (result) {
        //         //console.log(result);
        //     },
        //     error: function (errorThrown) {
        //     console.error(errorThrown, "Error fetching");
        //     },
        // });
    }

    $(window).resize(function() {
      addToBodybyId(newsletter1);
    });
    
    // add the data to the body
    function addToBodybyId(newsletter) {
        const newsletterContents = $("#newsletter-content");
        const breadcrumbActive = $(".breadcrumb-item.active");
        const newsletterTitle = $(".newsletter-title");
        const iFrame = $("#newsletter");
        
        const title = newsletter.Title;
        breadcrumbActive.text(title);
        newsletterTitle.text(title);

        iFrame
          .css({
            width: "100%",
            height: "100px",
            "margin-block": "10px",
            border: "none;",
          })
          .prop("scrolling", "no");

        let win_width = window.innerWidth;
        let MessageHTML = "";

        if(win_width > 800){
          MessageHTML = newsletter.Message;
        }else if(win_width> 500){
          MessageHTML = newsletter.MessageTablet;
          if(MessageHTML.length == 0){
            MessageHTML = newsletter.Message;
          }
        }else{
          MessageHTML = newsletter.MessageMobile;
          if(MessageHTML.length == 0){
            MessageHTML = newsletter.Message;
          }
        }

        // Change the href attribute
        var logoLink = document.querySelector('h1.logo a');
        
        if (language === "en") {
          MessageHTML = MessageHTML.replace(/View in Browser/g, "");
          logoLink.href = '/';
        } else if (language === "fr") {
          MessageHTML = MessageHTML.replace(
            /Voir cet email dans votre navigateur/g,
            ""
          );
          logoLink.href = '/fr/';
        } else if (language === "de") {
          MessageHTML = MessageHTML.replace(/Voir cet email dans votre navigateur/g,"");
          MessageHTML = MessageHTML.replace(/Diese Email in Ihrem Browser anzeigen/g,"");
          logoLink.href = '/de/';
        } else if (language === "it") {
          MessageHTML = MessageHTML.replace(
            /Vedi questa mail nel tuo browser/g,
            ""
          );
          logoLink.href = '/it/';
        }

        //new added
        // Get all elements with the class name "newsletter-title"
        var elements = document.getElementsByClassName('newsletter-title');
        // Loop through each element
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            // Create a new <h1> element
            var h1Element = document.createElement('h1');
            // Copy the content of the element to the <h1> element
            h1Element.innerHTML = element.innerHTML;
            // Add the "newsletter-title" class to the new <h1> element
            h1Element.classList.add('fw-bold');
            h1Element.classList.add('fs-1');
            h1Element.classList.add('newsletter-title');
            // Replace the element with the new <h1> element
            element.parentNode.replaceChild(h1Element, element);
         }

        const newsletterFile = new Blob([MessageHTML], { type: "text/html" });

        iFrame.attr("src", URL.createObjectURL(newsletterFile));

        iFrame.on("load", function () {
          let win_width = window.innerWidth;

          var excludedAltValues = ["Register Today", "Upgrade Now", "email","website", "Youtube", "Facebook", "Twitter", "LinkedIn", "Instagram"];

          var l = iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").length;

          if(win_width > 1000){
            iFrame.contents().find("table").width(900);
            if(l == 15){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,8).width(900);
            }else if(l == 14){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,7).width(900);
            }else if(l == 13){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,6).width(900);
            }else if(l == 12){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,5).width(900);
            }else if(l == 11){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,4).width(900);
            }else if(l == 10){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,3).width(900);
            }else if(l == 9){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,2).width(900);
            }else if(l == 8){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,1).width(900);
            }else{
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").width(900);
            }
          }else if(win_width > 800){
            iFrame.contents().find("table").width(650);
            if(l == 15){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,8).width(650);
            }else if(l == 14){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,7).width(650);
            }else if(l == 13){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,6).width(650);
            }else if(l == 12){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,5).width(650);
            }else if(l == 11){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,4).width(650);
            }else if(l == 10){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,3).width(650);
            }else if(l == 9){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,2).width(650);
            }else if(l == 8){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,1).width(650);
            }else{
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").width(650);
            }
          }else if(win_width > 500){
          iFrame.contents().find("table").width(450);
          if(l == 15){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,8).width(450);
            }else if(l == 14){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,7).width(450);
          }else if(l == 13){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,6).width(450);
          }else if(l == 12){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,5).width(450);
          }else if(l == 11){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,4).width(450);
          }else if(l == 10){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,3).width(450);
          }else if(l == 9){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,2).width(450);
          }else if(l == 8){
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,1).width(450);
          }else{
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").width(450);
          }
        }else{
          iFrame.contents().find("table").width(300);
            iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,3).width(300);
            if(l == 15){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,8).width(300);
              }else if(l == 14){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,7).width(300);
            }else if(l == 13){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,6).width(300);
            }else if(l == 12){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,5).width(300);
            }else if(l == 11){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,4).width(300);
            }else if(l == 10){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,3).width(300);
            }else if(l == 9){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,2).width(300);
            }else if(l == 8){
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").slice(0,1).width(300);
            }else{
              iFrame.contents().find("img").not("[alt='" + excludedAltValues.join("'], [alt='") + "']").width(300);
            }
        }
        const height = iFrame.contents().height();
          iFrame.height(height);

        // $("iframe").contents().find("a").css("width", "170px").css("background-color","#ce2d45").css("border-color","#ce2d45");
        $("iframe").contents().find(".btn.rounded-pill").css({
          width: '170px',
          padding: '14px 0',
          color: 'white',
          'background-color': '#ce2d45',
          'border-color': '#ce2d45'
        });
        $("iframe").contents().find(".watch-btn").css({
          width: '170px',
          padding: '14px 0',
          color: '#ce2d45',
          'background-color': '#white',
          'border-color': '#ce2d45'
        });
        $("iframe").contents().find(".watch-btn").css({
          'text-transform': 'capitalize'
        });
        $("iframe").contents().find(".watch-btn > img").css({
          display: 'none'
        });
        $("iframe").contents().find(".right-img > img").css({
          width: '115%'
        });
          
        });
    }

    var val = 0;

    function setCookie(name, value){
      const date = new Date();
      date.setTime(date.getTime() +  (1 * 24 * 60 * 60 * 1000));
      let expires = "expires=" + date.toUTCString();
      document.cookie = `${name}=${value}; ${expires}; path=/`
    }

    function deleteCookie(name){
        setCookie(name, null, null);
    }

    function getCookie(name){
        const cDecoded = decodeURIComponent(document.cookie);
        const cArray = cDecoded.split("; ");
        let result = null;
        
        cArray.forEach(element => {
            if(element.indexOf(name) == 0){
                result = element.substring(name.length + 1)
            }
        })
        return result;
    }

    $(':radio').click(function(r){
      val = this.value;

      $.ajax({
        url: `https://ipapi.co/json`,
        type: "POST",
        contentType: "application/json",
        success: function (result) {
          addRating(result.ip);
        },
        error: function (errorThrown) {
          console.error(errorThrown, "Error fetching");
        },
      });
    })

    function addRating(ip_add){
      $.ajax({
        url: `${egsApiLink}/lograting/2/${val}/${ip_add}`,
        type: "POST",
        success: function (result) {
        //console.log(result);
        },
        error: function (errorThrown) {
        console.error(errorThrown, "Error fetching");
        },
    });

      document.getElementById("inlineRadio1").disabled = true;  
      document.getElementById("inlineRadio2").disabled = true;  
      document.getElementById("inlineRadio3").disabled = true;
      document.getElementById("inlineRadio4").disabled = true;  
      document.getElementById("inlineRadio5").disabled = true;

      /*deleteCookie("alreadyRated");*/ //for debugging purposes
      setCookie("alreadyRated", "true"); //creates cookie
    }

    function ratingsdiv(){
      if(getCookie("alreadyRated") == "true"){
        $('#ratings').hide();
      }else{
        $('#ratings').show();
      }
    }




    var urlString = window.location.pathname;
    var stringArray = urlString.split("/");

    $("#main").hide();
    $("#sub").show();

    $("#newsletter-latestposts-title").hide();
    $("#banner").hide();

    var strkeytitle = stringArray[3];
    strkeytitle = strkeytitle.replace(/%C3%BC/g, "ü")

    // call the fetch function
    fetchDataByKeyTitle(strkeytitle);
    //ratingsdiv();


});