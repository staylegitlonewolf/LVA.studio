"use client";
import { useState, useRef } from "react";
import { Copy, Check, Upload, X, Info, FileArchive, Sparkles, MessageSquare, Plus } from "lucide-react";
import JSZip from "jszip";

export function ImportContextModal({ 
  isOpen, 
  onCloseAction, 
  onImportMemoryAction 
}: { 
  isOpen: boolean; 
  onCloseAction: () => void; 
  onImportMemoryAction: (memory: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [pastedContext, setPastedContext] = useState("");
  const [isProcessingZip, setIsProcessingZip] = useState(false);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const exportPrompt = `You are helping me import context from one AI assistant to another. Your job is to go through our past conversations and sum up what you know about me. 

In the output, please provide a dense, factual summary of the core knowledge, preferences, and workspace settings we have discussed. Avoid using any first-person pronouns (I, my, me, mine) and any second-person pronouns (you, your). 

Format the output as a clean, structured intelligence report.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingZip(true);
    const zip = new JSZip();
    try {
      const contents = await zip.loadAsync(file);
      let aggregatedText = "";
      
      // Look for .json or .markdown files in common exports (e.g. ChatGPT)
      for (const [filename, fileData] of Object.entries(contents.files)) {
        if (fileData.dir) continue;
        if (filename.endsWith(".json") || filename.endsWith(".md") || filename.endsWith(".txt")) {
           const text = await fileData.async("text");
           aggregatedText += `\n--- SOURCE: ${filename} ---\n${text}\n`;
        }
      }

      if (aggregatedText) {
         setPastedContext(prev => prev + "\n" + aggregatedText.slice(0, 5000)); // Limit for now
         alert("Chat history processed! Review the aggregated data in the field below.");
      } else {
         alert("No compatible JSON or Markdown files found in the ZIP archive.");
      }
    } catch (err) {
      console.error("Zip Error:", err);
      alert("Failed to process ZIP file. Please ensure it's a valid chat export.");
    } finally {
      setIsProcessingZip(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseAction} />
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <header className="p-8 pb-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                 <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                 <h2 className="text-2xl font-black text-white tracking-tight">Sync Team Matrix Memory</h2>
                 <p className="text-sm text-slate-500">Import context from ChatGPT, Claude, or any other AI teammate.</p>
              </div>
           </div>
           <button onClick={onCloseAction} className="p-2 hover:bg-white/10 rounded-full transition text-slate-500">
              <X className="w-6 h-6" />
           </button>
        </header>

        <div className="p-8 pt-4 space-y-8 max-h-[70vh] overflow-y-auto custom-scroller">
           {/* Step 1: Copy Prompt */}
           <section className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-7 h-7 bg-white text-black font-black text-xs rounded-full flex items-center justify-center">1</div>
                 <h3 className="font-bold text-white">Copy Intelligence Export Prompt</h3>
              </div>
              <div className="p-5 bg-black/40 border border-white/5 rounded-2xl relative group">
                 <p className="text-xs text-slate-400 leading-relaxed italic">{exportPrompt}</p>
                 <button 
                   onClick={copyToClipboard}
                   className="absolute bottom-4 right-4 bg-white/10 hover:bg-white text-slate-100 hover:text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                 >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied Prompt" : "Copy Export Prompt"}
                 </button>
              </div>
           </section>

           {/* Step 2: Paste Response */}
           <section className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-7 h-7 bg-white text-black font-black text-xs rounded-full flex items-center justify-center">2</div>
                 <h3 className="font-bold text-white">Paste External Context & Summary</h3>
              </div>
              <div className="space-y-2">
                 <textarea 
                   value={pastedContext}
                   onChange={(e) => setPastedContext(e.target.value)}
                   placeholder="Paste the intelligence report or summary here..." 
                   className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all resize-none"
                 />
                 <button 
                   onClick={() => onImportMemoryAction(pastedContext)}
                   disabled={!pastedContext.trim()}
                   className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-black py-4 rounded-xl shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-[0.2em] text-xs"
                 >
                    <Plus className="w-4 h-4" /> Add Memory to Team Matrix
                 </button>
              </div>
           </section>

           <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.4em] font-black text-slate-700">
                 <span className="bg-slate-900 px-4">OR</span>
              </div>
           </div>

           {/* Import Chats */}
           <section className="space-y-4">
              <div className="flex items-center gap-3">
                 <MessageSquare className="w-5 h-5 text-indigo-400" />
                 <h3 className="font-bold text-white">Import Entire Chat Archives</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                 Export your chat data from ChatGPT (JSON) or Claude (Markdown) and upload the `.zip` archive here. We will prioritize and index the most relevant context for your current operation.
              </p>
              <button 
                onClick={() => zipInputRef.current?.click()}
                disabled={isProcessingZip}
                className="w-full border border-dashed border-white/20 hover:border-indigo-500 hover:bg-indigo-500/5 py-8 rounded-3xl transition-all flex flex-col items-center justify-center gap-4 text-slate-500 hover:text-indigo-400 group"
              >
                 <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-indigo-500/10 transition-colors">
                    {isProcessingZip ? <Zap className="w-8 h-8 animate-spin" /> : <FileArchive className="w-8 h-8" />}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest">{isProcessingZip ? "Processing Archive..." : "Upload .ZIP Chat History"}</span>
              </button>
              <input type="file" ref={zipInputRef} className="hidden" accept=".zip" onChange={handleZipUpload} />
           </section>
        </div>

        <footer className="p-8 bg-black/40 flex items-center justify-center gap-4 border-t border-white/5">
           <Info className="w-4 h-4 text-slate-600" />
           <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest leading-none">Your imported memories are stored locally in this browser session.</p>
        </footer>
      </div>
    </div>
  );
}

function Zap(props: any) {
   return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.71 13 3l-1.5 8.24h8l-9 11.71L12 14.71z"/></svg>
   )
}
