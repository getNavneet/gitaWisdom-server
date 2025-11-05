import Visitor from "../models/visitor.model.js";
import { UAParser } from "ua-parser-js";

export const trackVisit = async (req, res) => {
  try {
    const { visitorId, userAgent, utm, page, timestamp, screenWidth, screenHeight, innerWidth, innerHeight } = req.body;
    // TODO validate and also
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    // Parse OS & browser
    const parser = new UAParser(userAgent);
    const device = parser.getResult();

    // Check existing visitor
    let visitor = await Visitor.findOne({ visitorId });

    if (visitor) {
      visitor.visitCount += 1;
      visitor.lastVisitedAt = timestamp || new Date();
      visitor.lastPage = page;
      visitor.ip = ip;

      // Optional: update UTM if new campaign
      if (utm && Object.keys(utm).length > 0) {
        visitor.utmHistory.push({
          ...utm,
          visitedAt: new Date(),
        });
      }

      await visitor.save();
    } else {
      // New visitor
      visitor = new Visitor({
        visitorId,
        ip,
        os: device.os.name + " " + (device.os.version || ""),
        browser: device.browser.name + " " + (device.browser.version || ""),
        utm_source: utm?.utm_source,
        page,
        screenWidth,
        screenHeight,
        innerWidth,
        innerHeight,
        visitCount: 1,
        firstVisitedAt: timestamp || new Date(),
        lastVisitedAt: timestamp || new Date(),
        utmHistory: utm ? [{ ...utm, visitedAt: new Date() }] : [],
      });

      await visitor.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error tracking visit:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
