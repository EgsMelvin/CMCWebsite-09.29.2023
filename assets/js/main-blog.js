$(function () {
    // EGS Newsletter API Link
    const egsApiLink = "https://www.eg-software.com/api_egsdb/api";

    const language = document.querySelector("html")?.getAttribute("lang");
    const strhref = window.location.href;
    const strqueryParams = new URLSearchParams(new URL(strhref).search);
    const paramkeytitle = strqueryParams.get("keytitle");

    var langurl = "en";
    var blogurl = "blog-en";

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

        if(currentLangCode == 1){
          langurl = "en";
          blogurl = "blog-en";
        }else if(currentLangCode == 2){
          langurl = "de";
          blogurl = "blog-de";
        }else if(currentLangCode == 3){
          langurl = "fr";
          blogurl = "blog-fr";
        }else{
          langurl = "it";
          blogurl = "blog-it";
        }

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
    
          const newsletterComponent = `
          <div style="display:none">
            <div class="new-tag" style="${displayStyle}">new</div>
            <p>${item.Dates}</p>
          </div>
          
          <h4>
              <a href="/${langurl}/${blogurl}/${item.KeyTitle}/" target="_blank">
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
  
    fetchDataCategory();
    // call the fetch function
    fetchData();

    // bind an event handler to the select element using the change() method
    $("#optionCategory").change(function () {
      fetchData();
    });
  
    $("#searh-input").on("input", function () {
      fetchData();
    });

});