$(function () {
  const BaseUrl = "https://qa.calcmenu.com"; // qa/staging
  // const BaseUrl = "https://www.eg-software.com";   //prod/live
  // const BaseUrl = "http://127.0.0.1:5500"; //localhost

  const href = window.location.href;
  const language = document.querySelector("html")?.getAttribute("lang");

  // const queryParams = new URLSearchParams(new URL(href).search);
  // const paramSource = queryParams.get("utm_source");
  // const paramMedium = queryParams.get("utm_medium");
  // const paramCampaign = queryParams.get("utm_campaign");

  // let infoRequestUrl = `https://info.eg-software.com/#/?culture=${language}`;

  // const validateParams = (paramSource, paramMedium, paramCampaign) =>
  //   !!(paramSource && paramMedium && paramCampaign);

  const currentHtml = {
    url: {
      href,
      //hasQueries: validateParams(paramSource, paramMedium, paramCampaign),
      //queryString: queryParams.toString(),
      // params: {
      //   source: paramSource,
      //   medium: paramMedium,
      //   campaign: paramCampaign,
      // },
      // infoRequestUrl: infoRequestUrl,
    },
    language,
  };

  const Links = {
    home: `${BaseUrl}/index`,
    ourstory: `${BaseUrl}/en/our-story`,
    resources: `${BaseUrl}/en/resources`,
    suppliers: `${BaseUrl}/en/suppliers`,
    school: `${BaseUrl}/en/industry/school`,
    restaurant: `${BaseUrl}/en/industry/restaurants-hotels-bakery-catering`,
    chains: `${BaseUrl}/en/industry/restaurants-hotels-chains-catering`,
    airline: `${BaseUrl}/en/industry/airlines-and-cruiselines`,
    individual: `${BaseUrl}/en/industry/individual-chef`,
    hospital: `${BaseUrl}/en/industry/hospitals`,
    nursing: `${BaseUrl}/en/industry/nursing-home`,
    consumer: `${BaseUrl}/en/industry/consumer-and-professional-brands`,
    blog: `${BaseUrl}/blog`,
  };

  if (currentHtml.url.hasQueries === true) {
    infoRequestUrl += `&${currentHtml.url.queryString}`;

    Links.home += `?${currentHtml.url.queryString}`;
    Links.ourstory += `?${currentHtml.url.queryString}`;
    Links.resources += `?${currentHtml.url.queryString}`;
    Links.suppliers += `?${currentHtml.url.queryString}`;
    Links.school += `?${currentHtml.url.queryString}`;
    Links.restaurant += `?${currentHtml.url.queryString}`;
    Links.chains += `?${currentHtml.url.queryString}`;
    Links.airline += `?${currentHtml.url.queryString}`;
    Links.individual += `?${currentHtml.url.queryString}`;
    Links.hospital += `?${currentHtml.url.queryString}`;
    Links.nursing += `?${currentHtml.url.queryString}`;
    Links.consumer += `?${currentHtml.url.queryString}`;
    Links.blog += `?${currentHtml.url.queryString}`;
    Links.video += `?${currentHtml.url.queryString}`;

    // $(".testimonial-item a").attr("href", infoRequestUrl);
    // $(".btn-get-started").attr("href", infoRequestUrl);
  } else {
    // $(".testimonial-item a").attr("href", infoRequestUrl);
    // $(".btn-get-started").attr("href", infoRequestUrl);
  }

  const currentLink = currentHtml.url.href;
  const menuLinks = Object.keys(Links);

  $("#menu").append(`<li><a href="${Links.home}">Home</a></li>`);
  $("#menu").append(`<li><a href="${Links.ourstory}">Our Story</a></li>`);
  $("#menu").append(`<li><a href="${Links.resources}">Resources</a></li>`);
  $("#menu").append(`<li><a href="${Links.suppliers}">Suppliers</a></li>`);
  $("#menu").append(
    `<li id="ddIndustries" class="dropdown">
      <a style="cursor: pointer;">
        <span>Industries</span>
        <i class="bi bi-chevron-down"></i>
      </a>
      <ul id="submenuIndustries"></ul>
    </li>`
  );
  $("#submenuIndustries").append(
    `<li><a href="${Links.school}">Schools</a></li>`
  );
  $("#submenuIndustries").append(
    `<li><a href="${Links.restaurant}">Restaurants, Hotels, & Catering</a></li>`
  );
  $("#submenuIndustries").append(
    `<li><a href="${Links.chains}">Chains</a></li>`
  );
  $("#submenuIndustries").append(
    `<li><a href="${Links.airline}">Airline and Cruise Lines</a></li>`
  );
  $("#submenuIndustries").append(
    `<li><a href="${Links.individual}">Individual Chefs</a></li>`
  );
  $("#submenuIndustries").append(
    `<li><a href="${Links.hospital}">Hospitals</a></li>`
  );
  $("#submenuIndustries").append(
    `<li><a href="${Links.nursing}">Nursing Home</a></li>`
  );
  $("#submenuIndustries").append(
    `<li><a href="${Links.consumer}">Consumer Brand</a></li>`
  );
  $("#menu").append(`<li><a href="${Links.blog}">Blog</a></li>`);
  // $("#menu").append(`<li><a href="${Links.video}">Videos</a></li>`);
  // $("#menu").append(
  //   `<li><a href="${Links.try}" target="_blank">Try/Buy</a></li>`
  // );

  var subFolderIndex = href.indexOf(`/${language}/`);

  let AssetsPrefix = { 
    value: "assets" 
  };

  if (subFolderIndex !== -1) {
    AssetsPrefix.value = "../assets";
  } else {
    AssetsPrefix.value = "assets";
  }

  $("#menu").append(
    `<li id="ddTranslation" class="dropdown">
      <a style="cursor: pointer;" id="en" href="" class="translate">
        <span><img src="${AssetsPrefix.value}/img/eng.jpg" class="pe-2">English</span>
        <i class="bi bi-chevron-down"></i>
      </a>
      <ul id="submenuTranslation"></ul>
    </li>`
  );

  $("#submenuTranslation").append(
    `<li><a style="cursor: pointer;" id="fr" class="translate d-inline"><span><img src="${AssetsPrefix.value}/img/fr.jpg" class="pe-2"></span> Français</a></li>`
  );
  $("#submenuTranslation").append(
    `<li><a style="cursor: pointer;" id="de" class="translate d-inline"><span><img src="${AssetsPrefix.value}/img/de.jpg" class="pe-2"></span> Deutsch</a></li>`
  );
  $("#submenuTranslation").append(
    `<li><a style="cursor: pointer;" id="it" class="translate d-inline"><span><img src="${AssetsPrefix.value}/img/it.jpg" class="pe-2"></span> Italiano</a></li>`
  );


  $("#ddIndustries").click(function () {
    $("#submenuIndustries").toggleClass("dropdown-active");
  });

  $("#ddTranslation").click(function () {
    $("#submenuTranslation").toggleClass("dropdown-active");
  });

  
  var baseLink = window.location.origin;

  $("#submenuTranslation").on("click", ".translate", function() {
    var translate = $(this).attr("id");
    if (currentHtml.url.hasQueries === true) {
      if (translate === "en") {
        window.open(`${baseLink}/?${currentHtml.url.queryString}`, "_self");
      } else {
        window.open(
          `${baseLink}/${translate}/?${currentHtml.url.queryString}`,
          "_self"
        );
      }
    } else {
      if (translate === "en") {
        window.open(`${baseLink}/`, "_self");
      } else {
        window.location.replace(`${baseLink}/${translate}/`);
      }
    }
  });

  function checkLinkInList(currentLink, links) {
    return Object.values(links).includes(currentLink);
  }

  function addAriaCurrentAttribute(currentLink, links) {
    const menuLink = menuLinks.find((link) => links[link] === currentLink);
    if (menuLink) {
      $(`#menu li a[href="${links[menuLink]}"]`)
        .attr("aria-current", "page")
        .css("font-weight", "bolder");
    }
  }

  addAriaCurrentAttribute(currentLink, Links);

  $(".notyetavailable").on("click", function() {
    alert("Not yet available.");
    return false;
  });
});
