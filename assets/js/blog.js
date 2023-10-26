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

    function fetchData() {
        $.ajax({
          url: `${egsApiLink}/blog/show`,
          type: "POST",
          data: JSON.stringify(filterDataByCurrentLanguage(language).data),
          contentType: "application/json",
          success: function (record) {
            // Code to handle the response
            if (record === "No record found.") {
              // if response is "no record found"
              const newsletterContents = $("#newsletter-content");
              const noResultDiv = $("<div>")
                .addClass(
                  "fw-bold text-uppercase text-center text-danger text-break px-5"
                )
                .text(filterDataByCurrentLanguage(language).text.noResult);
    
              newsletterContents.empty();
              newsletterContents.append(noResultDiv);
            } else {
              // if response is object
              addToBody(record);
            }
          },
          error: function (errorThrown) {
            // Code to handle the error
            console.error(errorThrown, "Error fetching");
          },
        });
      }
    
      function fetchDataCategory() {
        $.ajax({
          url: `${egsApiLink}/category`,
          type: "GET",
          dataType: "json",
          success: function (record) {
            const select = $("#optionCategory");
    
            if (record !== "No record found.") {
              $.each(record, function (index, value) {
                if (language === "en") {
                  if (value.Name_EN === "") {
                    select.append(
                      `<option value="${value.Id}">${
                        filterDataByCurrentLanguage(language).text.showAll
                      }</option>`
                    );
                  } else {
                    select.append(
                      `<option value="${value.Id}">${value.Name_EN}</option>`
                    );
                  }
                } else if (language === "fr") {
                  if (value.Name_FR === "") {
                    select.append(
                      `<option value="${value.Id}">${
                        filterDataByCurrentLanguage(language).text.showAll
                      }</option>`
                    );
                  } else {
                    select.append(
                      `<option value="${value.Id}">${value.Name_FR}</option>`
                    );
                  }
                } else if (language === "de") {
                  if (value.Name_DE === "") {
                    select.append(
                      `<option value="${value.Id}">${
                        filterDataByCurrentLanguage(language).text.showAll
                      }</option>`
                    );
                  } else {
                    select.append(
                      `<option value="${value.Id}">${value.Name_DE}</option>`
                    );
                  }
                } else if (language === "it") {
                  if (value.Name_IT === "") {
                    select.append(
                      `<option value="${value.Id}">${
                        filterDataByCurrentLanguage(language).text.showAll
                      }</option>`
                    );
                  } else {
                    select.append(
                      `<option value="${value.Id}">${value.Name_IT}</option>`
                    );
                  }
                }
              });
            }
          },
          error: function (errorThrown) {
            console.error(errorThrown, "Error fetching");
          },
        });
      }
    
      function fetchDataByKeyTitle(keytitle) {
        const data = {
          keytitle: keytitle,
          codelang: filterDataByCurrentLanguage(language).data.codelang,
          param: 2,
        };
    
        // make the API request
        $.ajax({
          url: `${egsApiLink}/blog/show/details`,
          type: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          success: function (result) {
            addToBodybyId(result[0]);
          },
          error: function (errorThrown) {
            console.error(errorThrown, "Error fetching");
          },
        });
      }
    
      // add the data to the body
      function addToBody(data) {
        // get the div where the iframe will be inserted and an h1 for the title
        const newsletterContents = $("#newsletter-content");
        const latestPostTitle = $("<h1>")
          .addClass("fw-bold text-uppercase newsletter-header")
          .attr("id", "newsletter-latestposts-title")
          .text(filterDataByCurrentLanguage(language).text.heading);
    
        newsletterContents.empty();
        newsletterContents.append(latestPostTitle);
    
        const month =
          (new Date().getMonth() + 1).toString().length === 1
            ? `0${new Date().getMonth() + 1}`
            : new Date().getMonth() + 1;
    
        // loop through the newsletter contents
        $.each(data, function (index, item) {
          const monthOnItem = item.Dates.slice(0, item.Dates.indexOf("/"));
          const dateOnItem = item.Dates.slice(
            item.Dates.indexOf("/") + 1,
            item.Dates.lastIndexOf("/")
          );
          const duration = 3;
          let displayStyle = "display:none";
    
          // if (monthOnItem === month) {
          //   if (
          //     dateOnItem >= new Date().getDate() - duration &&
          //     dateOnItem <= new Date().getDate()
          //   ) {
          //     displayStyle = "display:block";
          //   } else {
          //     displayStyle = "display:none";
          //   }
          // } else {
          //   displayStyle = "display:none";
          // }
    
          const newsletterComponent = `
          <div style="display:none">
            <div class="new-tag" style="${displayStyle}">new</div>
            <p>${item.Dates}</p>
          </div>
          
          <h4>
              <a href="/${
                filterDataByCurrentLanguage(language).text.path
              }blog.html?keytitle=${item.KeyTitle}" target="_blank">
                ${item.Title}
              </a>
          </h4>
          
          <p>${item.Description}</p>
          <p>${item.Dates}</p>`;
    
          const div = $("<div>")
            .addClass("col-md-12 newsletter-component")
            .html(newsletterComponent);
    
          $(newsletterContents).append(div);
        });
      }
    
      // add the data to the body
      function addToBodybyId(newsletter) {
        const newsletterContents = $("#newsletter-content");
        const breadcrumbActive = $(".breadcrumb-item.active");
        const newsletterTitle = $(".newsletter-title");
        const iFrame = $("#newsletter");
        
        const title = newsletter.Title;
        breadcrumbActive.text(title);
        newsletterTitle.text(title);
    
        // // loop through the newsletter contents
        // $.each(data, function (index, item) {
        //   let MessageHTML = "";
        //   MessageHTML = item.Message;
    
        //   if (language === "en") {
        //     MessageHTML = MessageHTML.replace(/View in Browser/g, "");
        //   } else if (language === "fr") {
        //     MessageHTML = MessageHTML.replace(
        //       /Voir cet email dans votre navigateur/g,
        //       ""
        //     );
        //     MessageHTML = MessageHTML.replace(
        //       /Diese Email in Ihrem Browser anzeigen/g,
        //       ""
        //     );
        //   } else if (language === "de") {
        //     MessageHTML = MessageHTML.replace(
        //       /Voir cet email dans votre navigateur/g,
        //       ""
        //     );
        //   } else if (language === "it") {
        //     MessageHTML = MessageHTML.replace(
        //       /Vedi questa mail nel tuo browser/g,
        //       ""
        //     );
        //   }
    
        //   const newsletter = new Blob([MessageHTML], { type: "text/html" });
    
        //   // create and setup the iframe element
        //   const newsletterWrapper = $("<iframe>")
        //     .attr("id", "iframe_id_newsletter")
        //     .css({
        //       width: "100%",
        //       height: "100px",
        //       "margin-block": "10px",
        //       border: "none",
        //     })
        //     .prop("scrolling", "no")
        //     .appendTo("body")[0];
    
        //   $(newsletterWrapper).attr("src", URL.createObjectURL(newsletter));
    
        //   // append the created iframe to the div
        //   newsletterContents.append(newsletterWrapper);
    
        //   // resize the iframe after the html has been inserted
        //   $(newsletterWrapper.contentWindow).on("load", function () {
        //     const height = `${$(newsletterWrapper.contentDocument.body).prop(
        //       "scrollHeight"
        //     )}px`;
        //     $(newsletterWrapper).css("height", height);
        //   });
    
        //   //reserved code dont delete or else use other way
        //   //add dynamic meta content to individual page
        //   // const meta = document.createElement('meta');
        //   // meta.name = "title";
        //   // meta.content = item.MetaTitle;
        //   // document.getElementsByTagName('head')[0].prepend(meta);
    
        //   // fetchDataMetatagsFromXML();
    
        //   const metaData = {
        //     title: item.MetaTitle,
        //     description: item.MetaDescription,
        //     keywords: item.MetaKeywords,
        //   };
    
        //   document.title = `Blog | ${item.Title}`;
    
        //   const metaTitle = document.createElement("meta");
        //   metaTitle.name = "title";
        //   metaTitle.content = metaData.title;
        //   document.getElementsByTagName("head")[0].prepend(metaTitle);
    
        //   const metaDescription = document.createElement("meta");
        //   metaDescription.name = "description";
        //   metaDescription.content = metaData.description;
        //   document.getElementsByTagName("head")[0].prepend(metaDescription);
    
        //   const metaKeywords = document.createElement("meta");
        //   metaKeywords.name = "keywords";
        //   metaKeywords.content = metaData.keywords;
        //   document.getElementsByTagName("head")[0].prepend(metaKeywords);
        // });

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

        if (language === "en") {
          MessageHTML = MessageHTML.replace(/View in Browser/g, "");
        } else if (language === "fr") {
          MessageHTML = MessageHTML.replace(
            /Voir cet email dans votre navigateur/g,
            ""
          );
        } else if (language === "de") {
          MessageHTML = MessageHTML.replace(
            /Voir cet email dans votre navigateur/g,
            ""
          );
        } else if (language === "it") {
          MessageHTML = MessageHTML.replace(
            /Vedi questa mail nel tuo browser/g,
            ""
          );
        }

        const newsletterFile = new Blob([MessageHTML], { type: "text/html" });

        iFrame.attr("src", URL.createObjectURL(newsletterFile));

        iFrame.on("load", function () {
          let win_width = window.innerWidth;


          var l = iFrame.contents().find("img").length;

          if(win_width > 1000){
            iFrame.contents().find("table").width(900);
            if(l == 15){
            iFrame.contents().find("img").slice(0,8).width(900);
            }else if(l == 14){
              iFrame.contents().find("img").slice(0,7).width(900);
            }else if(l == 13){
              iFrame.contents().find("img").slice(0,6).width(900);
            }else if(l == 12){
              iFrame.contents().find("img").slice(0,5).width(900);
            }else if(l == 11){
              iFrame.contents().find("img").slice(0,4).width(900);
            }else if(l == 10){
              iFrame.contents().find("img").slice(0,3).width(900);
            }else if(l == 9){
              iFrame.contents().find("img").slice(0,2).width(900);
            }else if(l == 8){
              iFrame.contents().find("img").slice(0,1).width(900);
            }else{
              iFrame.contents().find("img").width(900);
            }
          }else if(win_width > 800){
            iFrame.contents().find("table").width(250);
            if(l == 15){
            iFrame.contents().find("img").slice(0,8).width(250);
            }else if(l == 14){
              iFrame.contents().find("img").slice(0,7).width(250);
            }else if(l == 13){
              iFrame.contents().find("img").slice(0,6).width(250);
            }else if(l == 12){
              iFrame.contents().find("img").slice(0,5).width(250);
            }else if(l == 11){
              iFrame.contents().find("img").slice(0,4).width(250);
            }else if(l == 10){
              iFrame.contents().find("img").slice(0,3).width(250);
            }else if(l == 9){
              iFrame.contents().find("img").slice(0,2).width(250);
            }else if(l == 8){
              iFrame.contents().find("img").slice(0,1).width(250);
            }else{
              iFrame.contents().find("img").width(250);
            }
          }
        else if(win_width > 500){
          iFrame.contents().find("table").width(300);
          if(l == 15){
            iFrame.contents().find("img").slice(0,8).width(300);
            }else if(l == 14){
            iFrame.contents().find("img").slice(0,7).width(300);
          }else if(l == 13){
            iFrame.contents().find("img").slice(0,6).width(300);
          }else if(l == 12){
            iFrame.contents().find("img").slice(0,5).width(300);
          }else if(l == 11){
            iFrame.contents().find("img").slice(0,4).width(300);
          }else if(l == 10){
            iFrame.contents().find("img").slice(0,3).width(300);
          }else if(l == 9){
            iFrame.contents().find("img").slice(0,2).width(300);
          }else if(l == 8){
            iFrame.contents().find("img").slice(0,1).width(300);
          }else{
            iFrame.contents().find("img").width(300);
          }
        }else{
          iFrame.contents().find("table").width(230);
            iFrame.contents().find("img").slice(0,3).width(230);
            if(l == 15){
              iFrame.contents().find("img").slice(0,8).width(230);
              }else if(l == 14){
              iFrame.contents().find("img").slice(0,7).width(230);
            }else if(l == 13){
              iFrame.contents().find("img").slice(0,6).width(230);
            }else if(l == 12){
              iFrame.contents().find("img").slice(0,5).width(230);
            }else if(l == 11){
              iFrame.contents().find("img").slice(0,4).width(230);
            }else if(l == 10){
              iFrame.contents().find("img").slice(0,3).width(230);
            }else if(l == 9){
              iFrame.contents().find("img").slice(0,2).width(230);
            }else if(l == 8){
              iFrame.contents().find("img").slice(0,1).width(230);
            }else{
              iFrame.contents().find("img").width(230);
            }
        }
        const height = iFrame.contents().height();
          iFrame.height(height);
          
        });
      }
  
    fetchDataCategory();

    if (paramkeytitle) {
      $("#main").hide();
      $("#sub").show();

        $("#newsletter-latestposts-title").hide();
        $("#banner").hide();
    
        // call the fetch function
        fetchDataByKeyTitle(paramkeytitle);
      } else {
        $("#main").show();
      $("#sub").hide();

        $("#newsletter-latestposts-title").show();
        $("#banner").show();
    
        // call the fetch function
        fetchData();
      }

    function removeUrlParam() {
        // Remove the 'id' parameter from the URL
        const urlWithoutQueryParam = new URL(window.location.href);
        urlWithoutQueryParam.searchParams.delete("keytitle");
    
        // Update the URL in the browser without reloading the page
        history.replaceState(null, "", urlWithoutQueryParam);
    
        $("#newsletter-latestposts-title").show();
        $("#banner").show();
        $("#linkbacktolatestpost").hide();
        document.title = "Blog";
      }
    
      // bind an event handler to the select element using the change() method
      $("#optionCategory").change(function () {
        fetchData();
        removeUrlParam();
      });
    
      $("#searh-input").on("input", function () {
        fetchData();
        removeUrlParam();
      });
});