import React, { useState, useEffect, useRef } from "react";
import { FaTerminal, FaTimes, FaMinus } from "react-icons/fa";

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome to my interactive terminal! Type 'help' to get started." }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  const commands = {
    help: {
      description: "List all available commands",
      output: [
        "Available commands:",
        "  help     - Show this help message",
        "  whoami   - About me",
        "  skills   - List my technical skills",
        "  projects - View my projects",
        "  contact  - Contact information",
        "  clear    - Clear terminal",
        "  date     - Current date and time"
      ]
    },
    whoami: {
      description: "About Shashank",
      output: [
        "┌─────────────────────────────────────────┐",
        "│  Shashank Pandya                        │",
        "│  ─────────────────────────────────────  │",
        "│  🎓 B.Tech @ IIT Kharagpur              │",
        "│  💻 Full-Stack Developer                 │",
        "│  🤖 AI/ML Enthusiast                    │",
        "│  ☁️  AWS Cloud Practitioner              │",
        "│  ─────────────────────────────────────  │",
        "│  Building impactful solutions with      │",
        "│  React, Node.js, Python & AI            │",
        "└─────────────────────────────────────────┘"
      ]
    },
    skills: {
      description: "Technical skills",
      output: [
        "Frontend:    React, Next.js, TypeScript, Tailwind",
        "Backend:     Node.js, Express, Python, REST APIs",
        "Database:    MongoDB, MySQL, DynamoDB",
        "Cloud:       AWS Lambda, Docker, GitHub Actions",
        "AI/ML:       Gemini API, HuggingFace, Polly",
        "Blockchain:  Solidity, Smart Contracts"
      ]
    },
    projects: {
      description: "Featured projects",
      output: [
        "1. Aira         - AI Interview Coach (WhatsApp + AWS)",
        "2. Empathy Engine - Emotion-aware TTS (Python + HF)",
        "3. Crypto Portfolio - Full-stack + Blockchain",
        "4. TriaAssignment - React Contact Manager",
        "",
        "Run 'contact' for links to view code"
      ]
    },
    contact: {
      description: "Contact information",
      output: [
        "📧 Email:    pandyashashank1@gmail.com",
        "💼 LinkedIn: linkedin.com/in/shashank-pandya",
        "🐙 GitHub:   github.com/shashankpandya",
        "📍 Location: IIT Kharagpur, India"
      ]
    },
    date: {
      description: "Current date and time",
      output: []
    },
    clear: {
      description: "Clear terminal",
      output: []
    }
  };

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    const newHistory = [...history];

    // Add command to history
    newHistory.push({ type: "command", text: `$ ${cmd}` });

    if (command === "clear") {
      setHistory([{ type: "system", text: "Terminal cleared. Type 'help' for commands." }]);
      return;
    }

    if (command === "date") {
      newHistory.push({
        type: "output",
        text: new Date().toLocaleString()
      });
      setHistory(newHistory);
      return;
    }

    if (commands[command]) {
      commands[command].output.forEach(line => {
        newHistory.push({ type: "output", text: line });
      });
    } else if (command) {
      newHistory.push({ type: "error", text: `Command not found: ${command}. Type 'help' for available commands.` });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        handleCommand(input);
        setCommandHistory([...commandHistory, input]);
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Terminal Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        aria-label="Open terminal"
      >
        <FaTerminal className="text-white text-xl" />
      </button>

      {/* Terminal Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        <div className="bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">~/portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Minimize"
              >
                <FaMinus />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          {!isMinimized && (
            <div className="p-4 max-h-80 overflow-y-auto" ref={historyRef}>
              {/* History */}
              <div className="space-y-2 mb-4">
                {history.map((item, index) => (
                  <div key={index} className={`font-mono text-sm ${
                    item.type === "command" ? "text-cyan-400" :
                    item.type === "error" ? "text-red-400" :
                    item.type === "output" ? "text-green-400" :
                    "text-gray-500"
                  }`}>
                    <pre className="whitespace-pre-wrap">{item.text}</pre>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder:text-gray-600"
                  autoComplete="off"
                />
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {!isMinimized && (
            <div className="flex gap-2 px-4 py-3 bg-gray-800/50 border-t border-gray-700">
              {['help', 'whoami', 'skills'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    handleCommand(cmd);
                    setInput("");
                  }}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-mono text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Terminal;