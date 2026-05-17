// Pure canvas draw functions for pixel icons — no React imports
// Each function receives a canvas context, the rendered size (W), and a timestamp (t)

// ── Pixel grids ───────────────────────────────────────────────────────────────

const HUMANOID_FRAMES: number[][][] = [
  // Frame 0 — stand
  [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
  ],
  // Frame 1 — step
  [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
  ],
];

const EYE_SHAPE = [
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
];

const FLASK_SHAPE = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const WHISTLE_SHAPE = [
  [1, 1, 1, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 0, 0],
];

const MOUNTAIN_SHAPE = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const GAMEPAD_SHAPE = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 0, 0, 1, 1, 0],
];

const BOOK_SHAPE = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const CHART_SHAPE = [
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0],
];

const GEAR_SHAPE = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
];

// ── Draw functions ────────────────────────────────────────────────────────────

function drawGrid(ctx: CanvasRenderingContext2D, W: number, t: number, shape: number[][], bob: boolean = false) {
  const rows = shape.length;
  const cols = shape[0].length;
  const ps = Math.floor(W / (Math.max(rows, cols) + 2));
  const offX = Math.floor((W - cols * ps) / 2);
  const offY = Math.floor((W - rows * ps) / 2);
  const bobY = bob ? Math.sin(t * 0.008) * ps * 0.3 : 0;

  shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (!cell) return;
      const opacity = 0.6 + 0.4 * Math.sin(t * 0.002 + (r + c) * 0.5);
      ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
      ctx.fillRect(offX + c * ps, offY + r * ps + bobY, ps - 1, ps - 1);
    });
  });
}

export function drawAbout(ctx: CanvasRenderingContext2D, W: number, t: number) {
  const fps = 6;
  const frameIdx = Math.floor(t / (1000 / fps)) % HUMANOID_FRAMES.length;
  drawGrid(ctx, W, t, HUMANOID_FRAMES[frameIdx], true);
}

export function drawInsights(ctx: CanvasRenderingContext2D, W: number, t: number) {
  drawGrid(ctx, W, t, EYE_SHAPE, true);
}

export function drawLab(ctx: CanvasRenderingContext2D, W: number, t: number) {
  drawGrid(ctx, W, t, FLASK_SHAPE, true);
}

export function drawCoach(ctx: CanvasRenderingContext2D, W: number, t: number) {
  drawGrid(ctx, W, t, WHISTLE_SHAPE, true);
}

export function drawJourney(ctx: CanvasRenderingContext2D, W: number, t: number) {
  drawGrid(ctx, W, t, MOUNTAIN_SHAPE, true);
}

export function drawPlay(ctx: CanvasRenderingContext2D, W: number, t: number) {
  drawGrid(ctx, W, t, GAMEPAD_SHAPE, true);
}

export function drawAcademy(ctx: CanvasRenderingContext2D, W: number, t: number) {
  drawGrid(ctx, W, t, BOOK_SHAPE, true);
}

export function drawImpact(ctx: CanvasRenderingContext2D, W: number, t: number) {
  drawGrid(ctx, W, t, CHART_SHAPE, true);
}

export function drawWorks(ctx: CanvasRenderingContext2D, W: number, t: number) {
  drawGrid(ctx, W, t, GEAR_SHAPE, true);
}

export function drawCoreValues(ctx: CanvasRenderingContext2D, W: number, t: number) {
  const ps = Math.floor(W / 12);
  const cx = W / 2, cy = W / 2;
  const wave = t * 0.003;
  for (let r = -4; r <= 4; r++) {
    for (let c = -4; c <= 4; c++) {
      if (Math.abs(r) + Math.abs(c) > 4) continue;
      const d = Math.sqrt(r * r + c * c);
      const alpha = 0.2 + 0.8 * ((Math.sin(wave - d * 0.8) + 1) / 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
      ctx.fillRect(cx + c * ps - ps / 2, cy + r * ps - ps / 2, ps - 1, ps - 1);
    }
  }
}

export function drawEcosystem(ctx: CanvasRenderingContext2D, W: number, t: number) {
  const cx = W / 2, cy = W / 2;
  const r = W * 0.36;
  const ps = W / 12;
  const pulse = 0.5 + 0.4 * Math.sin(t * 0.003);
  ctx.fillStyle = `rgba(212, 175, 55, ${pulse})`;
  ctx.fillRect(cx - ps / 2, cy - ps / 2, ps, ps);
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + t * 0.0015;
    const nx = cx + Math.cos(angle) * r;
    const ny = cy + Math.sin(angle) * r;
    ctx.fillStyle = `rgba(212, 175, 55, ${0.3 + 0.5 * Math.sin(t * 0.002 + i)})`;
    ctx.fillRect(nx - ps / 2, ny - ps / 2, ps, ps);
  }
}

export function drawMethodology(ctx: CanvasRenderingContext2D, W: number, t: number) {
  const ps = Math.floor(W / 10);
  const cx = W / 2, cy = W / 2;
  const wave = t * 0.003;
  for (let r = 0; r < 5; r++) {
    for (let c = -r; c <= r; c++) {
      const alpha = 0.15 + 0.7 * ((Math.sin(wave - r * 0.8) + 1) / 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
      ctx.fillRect(cx + c * ps - ps / 2, cy + r * ps - W / 4, ps - 1.5, ps - 1.5);
    }
  }
}

export function drawWorkflow(ctx: CanvasRenderingContext2D, W: number, t: number) {
  const ps = Math.floor(W / 12);
  const cx = W / 2, cy = W / 2;
  const period = 2400;
  const fill = (t % period) / period;
  for (let r = -4; r <= 4; r++) {
    const lim = 4 - Math.abs(r);
    for (let c = -lim; c <= lim; c++) {
      const isTop = r < 0;
      const sand = isTop ? (1 - fill > (r + 4) / 4) : (fill > (r) / 4);
      const alpha = sand ? 0.8 : 0.15;
      ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
      ctx.fillRect(cx + c * ps - ps / 2, cy + r * ps - ps / 2, ps - 1, ps - 1);
    }
  }
}

