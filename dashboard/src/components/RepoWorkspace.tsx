"use client";
import { useState } from "react";
import { ChatClient } from "./ChatClient";
import { FileCode2 } from "lucide-react";

export function RepoWorkspace({ owner, repo, defaultBranch, treeData }: { owner: string; repo: string; defaultBranch: string; treeData: any[] }) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Interactive Sidebar */}
      <div className="w-64 border-r border-white/10 bg-slate-900/50 overflow-y-auto p-4 hidden md:block shrink-0">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Repository Files</h2>
        {treeData.length === 0 ? <p className="text-sm text-slate-600">Failed to load or empty repo.</p> : (
          <ul className="space-y-1">
            {treeData.slice(0, 150).map((file, i) => (
              <li 
                key={i} 
                onClick={() => setSelectedFile(file.path)}
                className={`flex items-start gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer transition-all ${
                  selectedFile === file.path 
                    ? "bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
                title={file.path}
              >
                <FileCode2 className={`w-4 h-4 shrink-0 mt-0.5 ${selectedFile === file.path ? "text-indigo-400" : "text-slate-500"}`} />
                <span className="break-all">{file.path.split('/').pop()}</span>
              </li>
            ))}
            {treeData.length > 150 && <li className="text-xs text-indigo-400 italic mt-2 px-2">...and {treeData.length - 150} more files</li>}
          </ul>
        )}
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col bg-slate-950/50 relative">
         {treeData && owner && repo ? (
            <ChatClient 
               owner={owner} 
               repo={repo} 
               defaultBranch={defaultBranch} 
               selectedFile={selectedFile} 
               onClearFile={() => setSelectedFile(null)}
            />
         ) : <div className="p-8 text-slate-400">Loading Workspace...</div>}
      </div>
    </div>
  );
}
