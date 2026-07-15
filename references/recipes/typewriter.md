# 01 Typewriter

## Canonical profile

~~~json recipe-profile
{
  "id": "typewriter",
  "durationModel": "content-length",
  "durationMs": 1900,
  "unitMs": 52,
  "easing": "steps",
  "caretPeriodMs": 760,
  "completionDelayMs": 3200
}
~~~

## Why it fits

Use the arrival of text only when generation or response is part of the meaning. Preserve a measured cadence; do not type essential instructions or long paragraphs.

## Reference implementation

~~~js
function typeText(node, text, {unitMs = 52, signal} = {}) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    node.textContent = text;
    return Promise.resolve();
  }
  node.textContent = '';
  return new Promise((resolve) => {
    let index = 0;
    const step = () => {
      if (signal?.aborted) return resolve();
      node.textContent = text.slice(0, ++index);
      if (index < text.length) setTimeout(step, unitMs);
      else resolve();
    };
    step();
  });
}
~~~

Use a CSS caret with a 760ms blink cycle. Abort the previous run before replaying or replacing the text.

## Reduced motion

Render the complete text immediately. The caret may remain static or be omitted.

## Verification

- Final text matches the source exactly.
- Replay cancels the previous timer.
- Mixed Chinese and Latin text remains readable.
- Long text falls back to a static result.
