import { readFile } from "node:fs/promises";
import path from "node:path";

export default async function loadTranslations(locale: string) {
  try {
    const filePath = path.join(process.cwd(), "public", "_gt", `${locale}.json`);
    const file = await readFile(filePath, "utf8");
    return JSON.parse(file);
  } catch {
    return {};
  }
}
