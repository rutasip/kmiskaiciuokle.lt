import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-HFP1146P1S");
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};