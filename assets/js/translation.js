const href = window.location.href;
const queryParams = new URLSearchParams(new URL(href).search);
const paramSource = queryParams.get("utm_source");
const paramMedium = queryParams.get("utm_medium");
const paramCampaign = queryParams.get("utm_campaign");

const validateParams = (paramSource, paramMedium, paramCampaign) =>
  !!(paramSource && paramMedium && paramCampaign);

const currentHtml = {
  url: {
    href,
    hasQueries: validateParams(paramSource, paramMedium, paramCampaign),
    queryString: queryParams.toString(),
    params: {
      source: paramSource,
      medium: paramMedium,
      campaign: paramCampaign,
    },
  },
};

var baseLink = window.location.origin;

$(".translate").click(function () {
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
        window.open(`${baseLink}/${translate}/`, "_self");
      }
    }
  });