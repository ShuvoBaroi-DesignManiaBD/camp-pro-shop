import { Helmet } from "react-helmet-async";

type TSEO = {
  siteTitle: string;
  tagLine: string;
};

const SiteMeta = ({ siteTitle, tagLine }:Partial<TSEO>) => {
  return (
    <div>
      <Helmet>
        <title className="capitalize">
          {siteTitle ? siteTitle : "CampProShop"} {tagLine ? `|` : ""}{" "}
          {tagLine ? tagLine : ""}
        </title>
      </Helmet>
    </div>
  );
};

export default SiteMeta;
