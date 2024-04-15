"use server";

import fs from "fs";
import { join } from "path";
const DOCS_PATH = "../documents";

export async function rebuildTheme(themename: string) {
  const xmlPath = join(DOCS_PATH, "clips", "themes", themename, "theme.xml");
  let themeXML = fs.readFileSync(xmlPath, "utf8");

  const imagePath = join(
    DOCS_PATH,
    "clips",
    "themes",
    themename,
    "theme-logo.png"
  );

  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");
    themeXML = themeXML.replace(
      /<previewImage  imageType=".png">(.*?)<\/previewImage>/,
      `<previewImage  imageType=".png">${imageBase64}</previewImage>`
    );
  }
  const cssPath = join(DOCS_PATH, "clips", "themes", themename, "theme.css");
  const css = fs.readFileSync(cssPath, "utf8");
  themeXML = themeXML.replace(/CSS_REMOVED/, css);
  return themeXML;
}
