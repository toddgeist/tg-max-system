import fs from "fs-extra";
import { join } from "path";

const HANDS_AND_EYES = "../prod/hands_and_eyes/";

if (fs.existsSync(HANDS_AND_EYES)) {
  fs.rmSync(HANDS_AND_EYES, { recursive: true });
  console.log("Deleted existing hands_and_eyes folder");
}

//make sure the folder exists
fs.ensureDirSync(HANDS_AND_EYES);

// move .next/standalone folder to HANDS_AND_EYES
console.log("Copying .next/standalone to hands_and_eyes");
fs.copySync(".next/standalone/", HANDS_AND_EYES);

//copy public folder to HANDS_AND_EYES
console.log("Copying public folder to hands_and_eyes");
fs.copySync("public", join(HANDS_AND_EYES, "public"));

//copy .next/standalone/static folder to HANDS_AND_EYES/public/_next/static
console.log(
  "Copying .next/standalone/static to hands_and_eyes/public/_next/static"
);
fs.copySync(".next/static", join(HANDS_AND_EYES, "public/_next/static"));
console.log("Done!");
