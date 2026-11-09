"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiTrash2,
  FiRefreshCw,
  FiPlus,
  FiSearch,
  FiDatabase,
  FiCopy,
  FiCheck,
  FiRotateCcw,
  FiCode,
} from "react-icons/fi";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function LocalStoragePage() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [lastDeleted, setLastDeleted] = useState(null);

  // Load items from localStorage
  const loadLocalStorage = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const loaded = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key !== null) {
          const value = window.localStorage.getItem(key) ?? "";
          loaded.push({ key, value });
        }
      }
      // Sort alphabetically by key
      loaded.sort((a, b) => a.key.localeCompare(b.key));
      setItems(loaded);
    } catch (err) {
      console.error("Error reading from localStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Read on mount asynchronously to prevent cascading renders
    const timer = setTimeout(() => {
      loadLocalStorage();
    }, 0);

    // Listen to changes made in other tabs/windows or local dispatch
    const handleStorageEvent = () => loadLocalStorage();
    window.addEventListener("storage", handleStorageEvent);
    window.addEventListener("local-storage-change", handleStorageEvent);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageEvent);
      window.removeEventListener("local-storage-change", handleStorageEvent);
    };
  }, [loadLocalStorage]);

  const showStatus = (text, type = "success", undoData = null) => {
    setStatusMessage({ text, type, undoData });
    setTimeout(() => {
      setStatusMessage((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  };

  // Delete specific item immediately when clicked
  const handleDelete = (key) => {
    if (typeof window === "undefined") return;

    try {
      const existingValue = window.localStorage.getItem(key);
      window.localStorage.removeItem(key);
      setItems((prev) => prev.filter((item) => item.key !== key));
      setLastDeleted({ key, value: existingValue });
      showStatus(`Deleted "${key}"`, "success", { key, value: existingValue });
    } catch (err) {
      console.error("Error deleting key:", err);
      showStatus(`Failed to delete "${key}".`, "error");
    }
  };

  // Undo delete
  const handleUndo = () => {
    if (!lastDeleted || typeof window === "undefined") return;

    try {
      window.localStorage.setItem(lastDeleted.key, lastDeleted.value ?? "");
      setLastDeleted(null);
      setStatusMessage(null);
      loadLocalStorage();
      showStatus(`Restored "${lastDeleted.key}"`);
    } catch (err) {
      console.error("Error restoring key:", err);
    }
  };

  // Clear all items
  const handleClearAll = () => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.clear();
      setItems([]);
      showStatus("All localStorage items cleared.");
    } catch (err) {
      console.error("Error clearing localStorage:", err);
      showStatus("Failed to clear localStorage.", "error");
    }
  };

  // Add new item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newKey.trim()) return;

    try {
      window.localStorage.setItem(newKey.trim(), newValue);
      setNewKey("");
      setNewValue("");
      setIsAdding(false);
      loadLocalStorage();
      showStatus(`Added "${newKey.trim()}" to localStorage.`);
    } catch (err) {
      console.error("Error adding item:", err);
      showStatus("Failed to store item in localStorage.", "error");
    }
  };

  // Insert sample items for testing
  const handleInsertSampleData = () => {
    try {
      const sampleData = {
        theme_preference: "dark",
        user_session: JSON.stringify({
          id: "usr_9428",
          role: "developer",
          lastActive: new Date().toISOString(),
        }),
        portfolio_visited: "true",
        recent_tags: JSON.stringify(["react", "nextjs", "tailwind"]),
      };

      Object.entries(sampleData).forEach(([k, v]) => {
        window.localStorage.setItem(k, v);
      });

      loadLocalStorage();
      showStatus("Sample data inserted into localStorage.");
    } catch (err) {
      console.error("Error setting sample data:", err);
      showStatus("Failed to insert sample data.", "error");
    }
  };

  // Copy to clipboard
  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Format value display (pretty JSON if applicable)
  const formatValue = (val) => {
    try {
      const parsed = JSON.parse(val);
      if (typeof parsed === "object" && parsed !== null) {
        return JSON.stringify(parsed, null, 2);
      }
    } catch {
      // not JSON
    }
    return val;
  };

  const filteredItems = items.filter(
    (item) =>
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBytes = items.reduce(
    (acc, curr) => acc + (curr.key.length + curr.value.length) * 2,
    0
  );

  return (
    <div className="relative min-h-screen text-foreground selection:bg-indigo-500/30 selection:text-white">
      {/* Background Graphic */}
      <InteractiveBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-grow pt-28 sm:pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            {/* Top Navigation / Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400 hover:text-white transition-colors group px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/40"
              >
                <FiArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Back to Home</span>
              </Link>

              {/* Status Toast with Undo */}
              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono border flex items-center gap-2.5 shadow-lg ${
                      statusMessage.type === "error"
                        ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    }`}
                  >
                    <span>{statusMessage.text}</span>
                    {statusMessage.undoData && (
                      <button
                        onClick={handleUndo}
                        className="inline-flex items-center gap-1 underline underline-offset-2 text-emerald-400 hover:text-white ml-1 cursor-pointer font-semibold"
                      >
                        <FiRotateCcw size={11} />
                        <span>Undo</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Header section */}
            <div className="mb-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
                <FiDatabase size={13} />
                <span>Browser Storage Explorer</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                Local Storage <span className="text-indigo-400">Viewer</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Inspect, add, and delete key-value pairs stored in your browser&apos;s
                <code className="mx-1 px-1.5 py-0.5 rounded bg-white/10 text-indigo-300 font-mono text-xs">
                  localStorage
                </code>
                for this domain in real-time.
              </p>
            </div>

            {/* Storage Summary & Action Controls */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl mb-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Metrics */}
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                      Stored Keys
                    </span>
                    <span className="text-2xl font-bold text-white font-mono">
                      {items.length}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                      Est. Size
                    </span>
                    <span className="text-2xl font-bold text-indigo-400 font-mono">
                      {totalBytes < 1024
                        ? `${totalBytes} B`
                        : `${(totalBytes / 1024).toFixed(2)} KB`}
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <FiPlus size={15} />
                    <span>{isAdding ? "Close Form" : "Add Item"}</span>
                  </button>

                  <button
                    onClick={loadLocalStorage}
                    title="Reload from localStorage"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <FiRefreshCw size={14} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  {items.length > 0 ? (
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete ALL items from localStorage?"
                          )
                        ) {
                          handleClearAll();
                        }
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <FiTrash2 size={14} />
                      <span>Clear All</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleInsertSampleData}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <FiDatabase size={14} />
                      <span>Insert Sample Data</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible Add New Item Form */}
              <AnimatePresence>
                {isAdding && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddItem}
                    className="overflow-hidden mt-6 pt-6 border-t border-white/10"
                  >
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <FiPlus className="text-indigo-400" />
                      <span>Store New Key & Value</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Key Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newKey}
                          onChange={(e) => setNewKey(e.target.value)}
                          placeholder="e.g. user_id or theme"
                          className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm font-mono placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Value
                        </label>
                        <input
                          type="text"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          placeholder="e.g. 12345 or JSON string"
                          className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm font-mono placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
                      >
                        Save to Storage
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Search Filter Bar (if items exist) */}
            {items.length > 0 && (
              <div className="mb-6 relative">
                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by key or value..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/40 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 backdrop-blur-md font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* List of Keys and Values */}
            {!isLoaded ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/5">
                <FiRefreshCw
                  className="animate-spin mx-auto text-indigo-400 mb-3"
                  size={24}
                />
                <p className="text-slate-400 text-sm font-mono">Reading localStorage...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md">
                <FiDatabase className="mx-auto text-slate-500 mb-3" size={36} />
                <h3 className="text-lg font-bold text-white mb-1">
                  {items.length === 0
                    ? "No items in localStorage"
                    : "No matching items found"}
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                  {items.length === 0
                    ? "Your browser's localStorage for this site is currently empty. You can add a new item or insert sample test data."
                    : `No localStorage entries match "${searchQuery}".`}
                </p>
                {items.length === 0 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={handleInsertSampleData}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
                    >
                      <FiPlus size={14} />
                      <span>Add Demo Data</span>
                    </button>
                    <button
                      onClick={() => setIsAdding(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
                    >
                      <span>Create New Key</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, idx) => {
                    const formatted = formatValue(item.value);

                    return (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        className="group relative p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-indigo-500/30 transition-all shadow-lg backdrop-blur-xl"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
                          {/* Key Section */}
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold">
                              #{idx + 1}
                            </span>
                            <span className="font-mono text-sm sm:text-base font-bold text-white break-all">
                              {item.key}
                            </span>
                            <button
                              onClick={() => handleCopy(item.key, `key-${item.key}`)}
                              title="Copy Key"
                              className="text-slate-500 hover:text-slate-300 transition-colors p-1 cursor-pointer"
                            >
                              {copiedKey === `key-${item.key}` ? (
                                <FiCheck size={14} className="text-emerald-400" />
                              ) : (
                                <FiCopy size={14} />
                              )}
                            </button>
                          </div>

                          {/* Action Buttons (including the delete button near the key) */}
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline mr-2">
                              {item.value.length * 2} bytes
                            </span>

                            {/* DELETE BUTTON */}
                            <button
                              onClick={() => handleDelete(item.key)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 hover:border-rose-500/40 transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                              title={`Delete ${item.key}`}
                            >
                              <FiTrash2 size={13} className="text-rose-400" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                        {/* Value Display */}
                        <div className="relative rounded-xl bg-black/40 border border-white/5 p-3.5 group/value">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                              <FiCode size={12} className="text-indigo-400" />
                              <span>Value:</span>
                            </span>
                            <button
                              onClick={() => handleCopy(item.value, `val-${item.key}`)}
                              className="text-[11px] font-mono text-slate-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {copiedKey === `val-${item.key}` ? (
                                <>
                                  <FiCheck size={12} className="text-emerald-400" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <FiCopy size={12} />
                                  <span>Copy Value</span>
                                </>
                              )}
                            </button>
                          </div>

                          <pre className="font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-60 overflow-y-auto">
                            {formatted === "" ? (
                              <span className="text-slate-500 italic">(empty string)</span>
                            ) : (
                              formatted
                            )}
                          </pre>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
