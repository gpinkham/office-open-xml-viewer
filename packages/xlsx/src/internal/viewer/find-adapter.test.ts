import { describe, expect, it } from 'vitest';
import type { Worksheet } from '../../types.js';
import type { XlsxWorkbook } from '../../workbook.js';
import type { SheetOverlayHost } from '../sheet-surface.js';
import { FindAdapter, type FindAdapterHost } from './find-adapter.js';

function adapterFor(cells: { row: number; col: number; text: string }[]) {
  const ws = {
    name: 'S', rows: [{ index: 1, cells }], colWidths: {}, rowHeights: {},
    defaultColWidth: 8.43, defaultRowHeight: 15, mergeCells: [], freezeRows: 0, freezeCols: 0,
    conditionalFormats: [], images: [], charts: [],
  } as unknown as Worksheet;
  const workbook = {
    sheetNames: ['S'],
    acquireWorksheetLease: async () => ({ worksheet: ws, release: () => undefined }),
    cellText: (_ws: Worksheet, cell: { text: string }) => cell.text,
  } as unknown as XlsxWorkbook;
  const boxes: string[] = [];
  const host: FindAdapterHost = {
    ownerDocument: { createElement: () => ({ style: { cssText: '' } }) } as unknown as Document,
    overlayHost: {
      clearFind: () => { boxes.length = 0; },
      appendFind: (box: HTMLElement) => { boxes.push(box.style.cssText); },
    } as unknown as SheetOverlayHost,
    workbook: () => workbook,
    sheetCount: () => 1,
    worksheet: () => ws,
    currentSheet: () => 0,
    scale: () => 1,
    highlightColors: () => undefined,
    cellRect: (row) => ({ x: 100, y: row * 100, w: 50, h: 20 }),
    screenX: (x) => x,
    goToSheet: async () => undefined,
    scrollCellIntoView: () => undefined,
  };
  return { adapter: new FindAdapter(host), boxes };
}

describe('FindAdapter overlay', () => {
  it("paints a matched cell in its term's colour, but the active match in the active colour", async () => {
    const { adapter, boxes } = adapterFor([
      { row: 1, col: 1, text: 'cat' },
      { row: 2, col: 1, text: 'dog' },
    ]);
    await adapter.find([{ text: 'dog', color: 'red' }, 'cat']);
    const borderOf = (row: number) => /border:([^;]+);/.exec(boxes.find((css) => css.includes(`top:${row * 100}px`))!)![1];
    expect(borderOf(1)).toBe('2px solid #ffb300');
    expect(borderOf(2)).toBe('2px solid red');

    await adapter.next();
    await adapter.next();
    expect(borderOf(2)).toBe('2px solid #fb8c00');
  });
});
