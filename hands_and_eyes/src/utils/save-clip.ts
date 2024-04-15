"use server";
import fs from "fs-extra";
import {
  XMLParser,
  XMLBuilder,
  X2jOptions,
  XmlBuilderOptions,
} from "fast-xml-parser";
import css from "css";
import { join } from "path";

const DOCS_PATH = "../documents";

export async function saveThemeClip(xml: string, clipName: string) {
  const jsonObj = parseXML(xml);
  const cssObj = parseThemeCSS(jsonObj);

  const xmlPretty = prettyPrintXML(jsonObj);
  const cssPretty = css.stringify(cssObj, { compress: false });

  const { imageBuffer, imageFileName } = parseThePreviewImage(jsonObj);

  //write files
  const clipFolder = join(DOCS_PATH, "clips", "themes", clipName);
  fs.ensureDirSync(clipFolder);

  const xmlPath = join(clipFolder, `theme.xml`);
  fs.writeFileSync(xmlPath, xmlPretty);

  const cssPath = join(clipFolder, `theme.css`);
  fs.writeFileSync(cssPath, cssPretty);

  const imagePath = join(clipFolder, imageFileName);
  fs.writeFileSync(imagePath, imageBuffer);
}

/**
 *
 * @param jsonObj parse the themeCSS
 * @returns css object
 */
function parseThemeCSS(jsonObj: any) {
  const cssString = jsonObj[0].fmxmlsnippet[0].Theme[0].CSS[0]["#text"];
  jsonObj[0].fmxmlsnippet[0].Theme[0].CSS[0]["#text"] = "CSS_REMOVED";
  const fixed = cssString.replace(/&#10;/g, "\n").replace(/&#09;/g, "\t");
  const cssObj = css.parse(fixed);
  return cssObj;
}

function prettyPrintXML(jsonObj: any) {
  const builderOptions: XmlBuilderOptions = {
    format: true,
    indentBy: "  ",
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    preserveOrder: true,
    cdataPropName: "#cdata",
  };
  const builder = new XMLBuilder({ ...builderOptions });
  const xmlContent = builder.build(jsonObj);
  return xmlContent;
}

function parseThePreviewImage(jsonObj: any) {
  const previewImageBase64 =
    jsonObj[0].fmxmlsnippet[0].Theme[2].previewImage[0]["#text"];

  const imageType = ".png";
  const imageBuffer = Buffer.from(previewImageBase64, "base64");
  const imageFileName = `preview${imageType}`;
  return { imageBuffer, imageFileName };
}

function parseXML(xml: string) {
  const options: X2jOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    ignoreDeclaration: true,
    preserveOrder: true,
    cdataPropName: "#cdata",
  };
  const parser = new XMLParser(options);
  const jsonObj = parser.parse(xml);
  return jsonObj;
}
