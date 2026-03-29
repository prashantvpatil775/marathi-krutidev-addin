import { unicodeToKrutidev } from "./converter";

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("convertBtn").onclick = run;
  }
});

async function run() {
  const status = document.getElementById("status");
  status.className = "";
  status.innerText = "Converting…";

  try {
    await Word.run(async (ctx) => {
      const sel = ctx.document.getSelection();
      sel.load("text");
      await ctx.sync();

      const src = sel.text;
      if (!src || !src.trim()) {
        status.className = "error";
        status.innerText = "⚠ Please select some Marathi text first.";
        return;
      }

      const converted = unicodeToKrutidev(src);
      sel.insertText(converted, Word.InsertLocation.replace);
      sel.font.name = "Kruti Dev 010";
      await ctx.sync();

      status.className = "success";
      status.innerText = "✓ Converted successfully!";
    });
  } catch (err) {
    console.error(err);
    status.className = "error";
    status.innerText = "Error: " + err.message;
  }
}
