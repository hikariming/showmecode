import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cognition = readFileSync(new URL("../data/book/cognition.md", import.meta.url), "utf8");

test("cognition opening uses the original tweet screenshot block", () => {
  const openingBlock = cognition.split("据他父亲讲述")[0];

  assert.match(
    openingBlock,
    /在新加坡，有一个8岁的小男孩。他没有任何编程经验，却用 Three\.js 搭建出了一个有趣的网页小游戏。\s+!\[image\]\(\/book\/cognition\/387b46bdcfeb\.jpg\)\s*$/s,
  );
  assert.doesNotMatch(openingBlock, /MengTo @MengTo/);
  assert.doesNotMatch(openingBlock, /My 8yo son built a Three\.js site with zero coding experience/);
  assert.doesNotMatch(openingBlock, /6ec4e728cb95\.jpg/);
  assert.doesNotMatch(openingBlock, /e8dc001adbc4\.jpg/);
});
