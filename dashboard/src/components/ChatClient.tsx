"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, ListChecks, Check, GitCommit, X, FileCode2, Ban, Trash2, PlusCircle, ExternalLink, MessageSquare, Terminal, Paperclip, Sparkles, Image as ImageIcon, Database } from "lucide-react";
import { LearnData } from "./LearnSidebar";
import { ImportContextModal } from "./ImportContextModal";

type MessageNode = {
  role: string;
  content: string;
  plan?: {
     id: string;
     tasks: { id: number; title: string; completed: boolean }[];
  }
};

export function ChatClient({ 
  owner, 
  repo, 
  defaultBranch, 
  selectedFile, 
  onClearFileAction, 
  userImage, 
  tokensUsed, 
  maxTokens, 
  onDeductTokensAction,
  onOpenLearnAction,
  onOpenIssuesAction
}: { 
  owner: string; 
  repo: string; 
  defaultBranch: string; 
  selectedFile: string | null; 
  onClearFileAction: () => void; 
  userImage: string | null; 
  tokensUsed: number; 
  maxTokens: number; 
  onDeductTokensAction: (n: number) => void; 
  onOpenLearnAction: (data: LearnData) => void;
  onOpenIssuesAction: () => void;
}) {
  const STORAGE_KEY = `agent_chat_${owner}_${repo}`;
  const MEMORY_KEY = `agent_memory_${owner}_${repo}`;
  
  const [messages, setMessages] = useState<MessageNode[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [globalMemory, setGlobalMemory] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
     const saved = localStorage.getItem(STORAGE_KEY);
     if (saved) {
        try {
           setMessages(JSON.parse(saved));
        } catch(e) {}
     } else {
        setMessages([{ role: "assistant", content: `Agent Neo Matrix Mode activated for ${repo} 🕶️✨\n\nWhat would you like to update and change today?` }]);
     }
     
     const savedMemory = localStorage.getItem(MEMORY_KEY);
     if (savedMemory) setGlobalMemory(savedMemory);
     
     setHasLoaded(true);
  }, [STORAGE_KEY, MEMORY_KEY, repo]);

  useEffect(() => {
     if (hasLoaded) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
     }
  }, [messages, hasLoaded, STORAGE_KEY]);

  const isLocked = tokensUsed >= maxTokens;

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || isLocked) return;

    let finalInput = input;
    if (selectedFile) {
       finalInput = `[Target File: ${selectedFile}]\n${input}`;
    }
    
    // Inject global memory context
    if (globalMemory) {
       finalInput = `[IMPORTED MEMORY: ${globalMemory.slice(0, 500)}...]\n${finalInput}`;
    }

    const newMsgs = [...messages, { role: "user", content: input }]; // show original input to user
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ owner, repo, branch: defaultBranch, prompt: finalInput })
      });

      const data = await resp.json();
      setMessages([...newMsgs, { role: "assistant", content: data.reply || "I was unable to generate a response.", plan: data.plan }]);
      onDeductTokensAction(15);
    } catch (err: any) {
       console.error("Agent API Error:", err);
       setMessages([...newMsgs, { role: "assistant", content: "Error connecting to Agent API. " + (err.message || "") }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
     const defaultMsg = { role: "assistant", content: `Agent Neo Matrix Mode activated for ${repo} 🕶️✨\n\nWhat would you like to update and change today?` };
     setMessages([defaultMsg]);
     localStorage.removeItem(STORAGE_KEY);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       setMessages([...messages, { role: "assistant", content: `📁 **FILE UPLOADED**: \`${file.name}\`\n\nSystem analyzing contents for contextual integration...` }]);
       onDeductTokensAction(5);
    }
  };

  const handleImportMemory = (memory: string) => {
     setGlobalMemory(memory);
     localStorage.setItem(MEMORY_KEY, memory);
     setMessages([...messages, { role: "assistant", content: `🔮 **UNIVERSAL MEMORY SYNCED**\n\nThe Matrix has been updated with external intelligence summaries and chat archives (Length: ${memory.length} Chars).` }]);
     onDeductTokensAction(10);
     setIsMemoryModalOpen(false);
  };

  const executeFakeCommit = () => {
     if (isLocked) return;
     setMessages([...messages, { role: "assistant", content: "⚡ **COMMIT SUCCESSFUL**\n\nThe mock code has been dynamically committed and pushed to the repository securely.\n\n*(This was a local test because the actual OpenAI API was not triggered - you saved $0.05!)*"}]);
     onDeductTokensAction(45);
  };

  const handleAddToDo = (msgContent: string) => {
     const mockLearn: LearnData = {
        version: "v1.1",
        target: selectedFile || "General Task",
        purpose: "Implement advanced interface changes and logic for the current session.",
        action: "Automated analysis of the selected context and generation of an action plan.",
        problems: "Detected a request that requires advanced backend integration or custom infrastructure updates.",
        plan: "Log the request into the central Project Management board for manual developer review.",
        fix: "Injected a tracking tag into the repository history to flag this task for the next CI/CD cycle.",
        warnings: "Do not attempt to bypass backend security layers without direct authorization.",
        neoMessage: "This is a message from the dev himself: You are trying to do something which requires contacting your dev to do backend work. For now you can ADD-TO-DO in Client Request: https://github.com/users/staylegitlonewolf/projects/5"
     };
     onOpenLearnAction(mockLearn);
  };

  if (!hasLoaded) return null;

  return (
    <div className="flex flex-1 flex-col h-full relative">
       {/* Chat Controls */}
       <div className="px-4 py-2 border-b border-white/10 bg-black/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <button onClick={clearChat} className="text-[10px] font-bold text-slate-500 hover:text-red-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Clear Logs
             </button>
             <button onClick={onOpenIssuesAction} className="text-[10px] font-bold text-slate-500 hover:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                <MessageSquare className="w-3.5 h-3.5" /> Workspace Logs
             </button>
          </div>
          <div className="flex items-center gap-4">
             {globalMemory && (
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                   <Database className="w-3 h-3 text-emerald-400" />
                   <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none">Context Sync Active</span>
                </div>
             )}
             <div className={`text-[10px] font-bold uppercase tracking-widest ${isLocked ? 'text-red-500 animate-pulse' : 'text-slate-600'}`}>
                {isLocked ? "System Locked" : "Neo Sync: Online"}
             </div>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scroller">
         {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
               <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${m.role === "assistant" ? "bg-indigo-500/20 text-indigo-400" : "bg-white/10 text-white border border-white/20"}`}>
                 {m.role === "assistant" ? <Bot className="w-5 h-5"/> : (userImage ? <img src={userImage} className="w-full h-full object-cover" alt="User" /> : <User className="w-5 h-5" />)}
               </div>
               <div className={`max-w-3xl flex flex-col gap-3 ${m.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`px-5 py-4 rounded-2xl whitespace-pre-wrap ${m.role === "assistant" ? "bg-white/5 border border-white/5 text-slate-300 shadow-xl" : "bg-indigo-600 text-white shadow-lg"}`}>
                    {m.content}
                    {m.role === "assistant" && idx > 0 && (
                       <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                          <button 
                            onClick={() => handleAddToDo(m.content)}
                            className="text-[10px] font-bold text-indigo-400 hover:text-white uppercase tracking-widest bg-indigo-500/10 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 border border-indigo-500/20"
                          >
                             <PlusCircle className="w-3 h-3" /> Add to Do List
                          </button>
                       </div>
                    )}
                  </div>
                  
                  {m.plan && (
                     <div className="w-full max-w-[450px] bg-slate-900 border border-indigo-500/30 rounded-xl p-5 shadow-[0_10px_30px_rgba(99,102,241,0.1)]">
                        <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2"><ListChecks className="w-5 h-5 text-indigo-400"/> Proposed Agent Execution Plan</h4>
                        <div className="space-y-2 mb-6">
                          {m.plan.tasks.map(t => (
                             <div key={t.id} className="flex gap-3 items-start text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center mt-0.5 ${t.completed ? "bg-indigo-500 border-indigo-500" : "border-slate-500 bg-slate-800"}`}>
                                   {t.completed && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={t.completed ? "line-through opacity-50" : ""}>{t.title}</span>
                             </div>
                          ))}
                        </div>
                        <button 
                           onClick={executeFakeCommit}
                           disabled={isLocked}
                           className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:grayscale text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                           <GitCommit className="w-5 h-5" />
                           Execute Commit & Push
                        </button>
                     </div>
                  )}
               </div>
            </div>
         ))}
         {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-indigo-500/20 text-indigo-400">
                 <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/5 text-slate-400 animate-pulse">
                 Agent is analyzing the workspace...
              </div>
            </div>
         )}
       </div>

       <div className="p-4 bg-slate-900 border-t border-white/10 flex flex-col gap-2 relative z-20">
          {selectedFile && !isLocked && (
             <div className="flex flex-col gap-1 max-w-4xl mx-auto w-full px-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-indigo-400" /> Current Target Context
                   </span>
                   <button onClick={onClearFileAction} className="text-[10px] text-slate-500 hover:text-white transition uppercase font-bold tracking-widest flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Clear <X className="w-2.5 h-2.5" />
                   </button>
                </div>
                <div className="p-4 bg-black/60 border border-indigo-500/40 rounded-2xl relative overflow-hidden group shadow-[0_0_30px_rgba(99,102,241,0.15)] ring-1 ring-white/5">
                   <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center ring-1 ring-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                         <FileCode2 className="w-7 h-7 text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <h4 className="text-white font-black text-sm truncate uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{selectedFile.split('/').pop()}</h4>
                         <p className="text-[10px] text-slate-500 font-mono truncate opacity-60 group-hover:opacity-100 transition-opacity">{selectedFile}</p>
                      </div>
                   </div>
                </div>
             </div>
          )}
          
          <form className="max-w-4xl mx-auto w-full relative flex flex-col" onSubmit={sendMessage}>
             <div className="relative flex items-center">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLocked ? "Daily Quota Exceeded. Please upgrade your plan." : (selectedFile ? `Ask the Agent to edit ${selectedFile.split('/').pop()}...` : "Select a file or type a command...")}
                  disabled={loading || isLocked}
                  className={`w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-24 text-white placeholder-slate-500 focus:outline-none ${isLocked ? "opacity-50 cursor-not-allowed border-red-500/50" : "focus:ring-2 focus:ring-indigo-500/50"}`}
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute left-4 p-2 text-slate-500 hover:text-indigo-400 transition"
                  title="Upload Documentation"
                >
                   <Paperclip className="w-5 h-5" />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   <button 
                     type="button" 
                     onClick={() => setIsMemoryModalOpen(true)}
                     className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-400 transition"
                     title="Sync Intelligence Memory"
                   >
                      <Sparkles className="w-5 h-5" />
                   </button>
                   <button type="submit" disabled={!input.trim() || loading || isLocked} className={`p-2.5 rounded-xl transition shadow-lg flex items-center justify-center ${isLocked ? "bg-red-500/20 text-red-400" : "bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white"}`}>
                      {isLocked ? <Ban className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                   </button>
                </div>
             </div>
             
             {/* Dynamic Utility Strip */}
             <div className="flex gap-4 px-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setInput("")} 
                  className="text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition"
                >
                   <X className="w-3.5 h-3.5" /> Clear Message
                </button>
             </div>
          </form>
       </div>

       <ImportContextModal 
          isOpen={isMemoryModalOpen} 
          onCloseAction={() => setIsMemoryModalOpen(false)}
          onImportMemoryAction={handleImportMemory}
       />
    </div>
  );
}
