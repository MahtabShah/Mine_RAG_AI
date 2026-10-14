import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_URL = import.meta.env.VITE_API_URL;

const suggestedQuestions = [
  {
    title: "Accident analysis",
    question:
      "Analyze the causes and safety violations in the Jamadoba  mine inundation accident.",
  },
  {
    title: "Historical disasters",
    question:
      "What were the five deadliest mine inundation disasters in India according to the indexed notes?",
  },
  {
    title: "Prevention methods",
    question:
      "Explain the key DGMS safety measures for preventing mine inundation.",
  },
];

export default function AskModel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e) {
    e.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const updatedMessages = [...messages, { role: "user", content: text }];

    setMessages([...updatedMessages, { role: "assistant", content: "" }]);

    setInput("");
    setLoading(true);
    setError("");

    try {
      console.log("API_URL =", import.meta.env.VITE_API_URL);
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Request failed");
      }

      if (!response.body) {
        throw new Error("Streaming is not supported by this browser.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (chunk) {
          setMessages((prev) => {
            const next = [...prev];
            const last = next.length - 1;

            if (last >= 0 && next[last].role === "assistant") {
              next[last] = {
                ...next[last],
                content: next[last].content + chunk,
              };
            }

            return next;
          });
        }
      }

      const remaining = decoder.decode();

      if (remaining) {
        setMessages((prev) => {
          const next = [...prev];
          const last = next.length - 1;

          if (last >= 0 && next[last].role === "assistant") {
            next[last] = {
              ...next[last],
              content: next[last].content + remaining,
            };
          }

          return next;
        });
      }
    } catch (err) {
      setError(err.message || "Could not connect to InunBrain.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-4 w-[100%] pb-[200px] flex flex-col overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 w-[100%] max-w-3xl mx-auto space-y-6 chat_section p-4 sm:p-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
              ✦
            </div>
            <h2 className="text-xl font-semibold text-slate-900">
              Ask InunBrain
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Ask questions about your indexed mining safety records.
            </p>

            <section className="suggested-questions">
              <p className="suggested-heading">Suggested questions</p>

              <div className="suggested-list">
                {suggestedQuestions.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    className="suggested-card"
                    onClick={() => {
                      setInput(item.question);
                    }}>
                    <span>{item.title}</span>
                    <span className="suggested-question">{item.question}</span>
                    <span aria-hidden="true" className="suggested-arrow">
                      ↗
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}>
            {message.role === "user" ? (
              <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-6 text-white">
                {message.content}
              </div>
            ) : (
              <div className="w-full min-w-0 text-sm leading-7 text-slate-700">
                {message.content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mb-3 mt-5 text-2xl font-bold tracking-tight text-slate-800">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mb-2 mt-5 text-xl font-semibold text-slate-800">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-4 text-lg font-semibold text-slate-800">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="mb-3 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-4 list-disc space-y-1 pl-6">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-4 list-decimal space-y-1 pl-6">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="pl-1">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-slate-800">
                          {children}
                        </strong>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-3 border-l-4 border-blue-300 pl-4 text-slate-600">
                          {children}
                        </blockquote>
                      ),
                      pre: ({ children }) => (
                        <pre className="my-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm leading-6 text-slate-100">
                          {children}
                        </pre>
                      ),
                      code: ({ children, className }) => (
                        <code
                          className={
                            className
                              ? `${className} font-mono`
                              : "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-blue-700"
                          }>
                          {children}
                        </code>
                      ),
                      table: ({ children }) => (
                        <div className="my-4 overflow-x-auto rounded-lg border border-slate-200">
                          <table className="w-full border-collapse text-left text-sm">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border-b border-slate-200 bg-slate-50 px-3 py-2 font-semibold">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border-b border-slate-100 px-3 py-2">
                          {children}
                        </td>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline underline-offset-2">
                          {children}
                        </a>
                      ),
                    }}>
                    {message.content}
                  </ReactMarkdown>
                ) : loading && index === messages.length - 1 ? (
                  <span className="inline-flex items-center gap-2 text-slate-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                    Thinking...
                  </span>
                ) : null}

                {loading &&
                  index === messages.length - 1 &&
                  message.content && (
                    <span className="ml-1 inline-block h-4 w-1 animate-pulse rounded-full bg-blue-500 align-middle" />
                  )}
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      <div className="fixed mx-2 pt-4 w-[calc(100% - 10px)] bg-slate-50 left-0 right-0 bottom-0">
        <form onSubmit={sendMessage} className="">
          {error && (
            <p
              role="alert"
              className="mx-auto mb-3 max-w-3xl rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="mx-auto max-w-3xl">
            <div
              className="group relative flex items-end gap-2 rounded-[14px] border border-slate-200 bg-white p-2 shadow-sm transition-all duration-200
      focus-within:border-blue-300
      hover:border-slate-300">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Ask anything..."
                disabled={loading}
                className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-[15px] leading-6 text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none">
                {loading ? (
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                      opacity=".25"
                    />
                    <path
                      d="M21 12a9 9 0 0 0-9-9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M12 19V5" />
                    <path d="m5 12 7-7 7 7" />
                  </svg>
                )}
              </button>
            </div>

            <p className="my-3 text-center text-[11px] font-medium tracking-wide text-slate-400">
              InunBrain can make mistakes. Verify important information.
              <span className="mx-1.5 text-slate-300">·</span>
              Enter to send
              <span className="mx-1 text-slate-300">·</span>
              Shift + Enter for a new line
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
