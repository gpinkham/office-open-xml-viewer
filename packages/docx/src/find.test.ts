import { expect, it } from 'vitest';
import { DocxFindController } from './find.js';
import type { DocxTextRunInfo } from './renderer';

it('maps shared search results and highlight geometry to DOCX pages', async () => {
  const run = (text: string): DocxTextRunInfo => ({
    text, x: 0, y: 0, w: text.length, h: 10, fontSize: 10, font: '10px monospace',
  });
  const pages = [[run('Hel'), run('lo')], [run('hello')]];
  const find = new DocxFindController(() => pages.length, async (page) => pages[page]);
  expect((await find.find('hello')).map((match) => match.location)).toEqual([{ page: 0 }, { page: 1 }]);
  find.next();
  expect(find.activePage()).toBe(0);
  expect(find.pageHighlights(0)[0].slices).toHaveLength(2);
  expect(find.pageRuns(1)).toEqual(pages[1]);
});

it('searches several terms at once, with whole words, and an all-empty list clears', async () => {
  const run = (text: string): DocxTextRunInfo => ({
    text, x: 0, y: 0, w: text.length, h: 10, fontSize: 10, font: '10px monospace',
  });
  const pages = [[run('the cat sat')], [run('a concatenated dog')]];
  const find = new DocxFindController(() => pages.length, async (page) => pages[page]);
  const matches = await find.find(['dog', 'cat'], { wholeWord: true });
  expect(matches.map((m) => [m.location.page, m.text])).toEqual([[0, 'cat'], [1, 'dog']]);
  expect(await find.find([''])).toEqual([]);
  expect(find.matches()).toEqual([]);
});

it("carries each term's colour into the matches and the highlights", async () => {
  const run = (text: string): DocxTextRunInfo => ({
    text, x: 0, y: 0, w: text.length, h: 10, fontSize: 10, font: '10px monospace',
  });
  const pages = [[run('the cat and the dog')]];
  const find = new DocxFindController(() => pages.length, async (page) => pages[page]);
  const matches = await find.find([{ text: 'dog', color: 'red' }, 'cat']);
  expect(matches.map((m) => [m.text, m.color])).toEqual([['cat', undefined], ['dog', 'red']]);
  expect(find.pageHighlights(0).map((h) => h.color)).toEqual([undefined, 'red']);
  expect(find.next()?.color).toBeUndefined();
  expect(find.next()?.color).toBe('red');
});
