"use client";

import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

interface FileTreeProps {
  files: FileNode[];
  selectedId?: string;
  onSelect?: (file: FileNode) => void;
  className?: string;
  defaultExpanded?: string[];
}

export function FileTree({
  files,
  selectedId,
  onSelect,
  className,
  defaultExpanded = [],
}: FileTreeProps) {
  return (
    <div className={cn("font-mono text-sm", className)}>
      {files.map((file) => (
        <FileTreeNode
          key={file.id}
          node={file}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
          defaultExpanded={defaultExpanded}
        />
      ))}
    </div>
  );
}

interface FileTreeNodeProps {
  node: FileNode;
  level: number;
  selectedId?: string;
  onSelect?: (file: FileNode) => void;
  defaultExpanded: string[];
}

function FileTreeNode({
  node,
  level,
  selectedId,
  onSelect,
  defaultExpanded,
}: FileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(
    defaultExpanded.includes(node.id)
  );
  const isFolder = node.type === "folder";
  const isSelected = selectedId === node.id;

  const handleClick = () => {
    if (isFolder) {
      setIsExpanded(!isExpanded);
    } else {
      onSelect?.(node);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center gap-1.5 w-full px-2 py-1 rounded hover:bg-muted/50 transition-colors text-left",
          isSelected && "bg-primary/10 text-primary"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {isFolder ? (
          <>
            <ChevronRight
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isExpanded && "rotate-90"
              )}
            />
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-primary" />
            ) : (
              <Folder className="w-4 h-4 text-primary" />
            )}
          </>
        ) : (
          <>
            <span className="w-4" />
            <File className="w-4 h-4 text-muted-foreground" />
          </>
        )}
        <span className={cn(isFolder && "font-medium")}>{node.name}</span>
      </button>

      <AnimatePresence>
        {isFolder && isExpanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children.map((child) => (
              <FileTreeNode
                key={child.id}
                node={child}
                level={level + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                defaultExpanded={defaultExpanded}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
