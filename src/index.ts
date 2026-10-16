import { version } from "../package.json";
import "./card";

console.info(
  `%c CALENDAR-CARD-PLUS %c v${version} `,
  "color: steelblue; background: black; font-weight: bold;",
  "color: white ; background: dimgray; font-weight: bold;"
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "calendar-card-plus",
  name: "Dynamic Calendar Card Plus",
  preview: true,
  description: "A standalone calendar card with dynamic grid styling",
});
