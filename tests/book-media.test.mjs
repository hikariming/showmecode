import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";

const bookDir = new URL("../data/book/", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);
const videoPattern = /\.(mp4|webm)$/i;
const missingVideoPlaceholderPattern = /\*\*\[[^\]]+\.(?:mp4|mov|webm)\]\*\*/i;

test("book markdown does not contain unresolved video placeholders", () => {
  for (const file of readdirSync(bookDir).filter((name) => name.endsWith(".md"))) {
    const markdown = readFileSync(new URL(file, bookDir), "utf8");
    assert.doesNotMatch(markdown, missingVideoPlaceholderPattern, file);
  }
});

test("book video embeds point to existing public files", () => {
  for (const file of readdirSync(bookDir).filter((name) => name.endsWith(".md"))) {
    const markdown = readFileSync(new URL(file, bookDir), "utf8");
    const refs = markdown.matchAll(/!\[[^\]]*\]\((\/[^)\s]+\.(?:mp4|webm))\)/gi);

    for (const ref of refs) {
      const urlPath = ref[1];
      assert.match(urlPath, videoPattern, `${file}: ${urlPath}`);
      assert.ok(existsSync(new URL(`.${urlPath}`, publicDir)), `${file}: ${urlPath}`);
    }
  }
});
