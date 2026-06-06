'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const BOT_RESPONSES = {
  hello: "Hello! 👋 I'm your CRM assistant. Type 'help' to see what I can do.",
  hi: "Hi there! 👋 Type 'help' for available commands.",
  help: `📋 **Available Commands:**
• customers — View customer list
• add customer — Go to add customer
• invoices — Go to invoices
• stats — Show system stats
• active — Show active customers
• leads — Show lead customers
• hello / hi — Greet me`,
  customers: null, // handled dynamically
  'customer list': null,
  'show customers': null,
  'add customer': '__NAV_ADD__',
  'new customer': '__NAV_ADD__',
  invoices: '__NAV_INVOICES__',
  'show invoices': '__NAV_INVOICES__',
  stats: null,
  active: null,
  leads: null,
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm your CRM assistant. Type 'help' for commands." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);
  const router = useRouter();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMsg = (from, text) => setMessages(prev => [...prev, { from, text }]);

  const handleSend = async () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    addMsg('user', input.trim());
    setInput('');
    setLoading(true);

    try {
      // Navigation commands
      if (cmd === 'add customer' || cmd === 'new customer') {
        addMsg('bot', '➕ Navigating to Add Customer page...');
        setTimeout(() => router.push('/customers/add'), 600);
        setLoading(false);
        return;
      }
      if (cmd === 'invoices' || cmd === 'show invoices') {
        addMsg('bot', '🧾 Opening Invoices module...');
        setTimeout(() => router.push('/invoices'), 600);
        setLoading(false);
        return;
      }
      if (cmd === 'dashboard') {
        addMsg('bot', '⊞ Going to Dashboard...');
        setTimeout(() => router.push('/dashboard'), 600);
        setLoading(false);
        return;
      }

      // Customer list
      if (cmd === 'customers' || cmd === 'customer list' || cmd === 'show customers') {
        const res = await api.get('/customers?limit=5');
        const list = res.data.data.map((c, i) => `${i+1}. **${c.name}** — ${c.company} (${c.status})`).join('\n');
        addMsg('bot', `👥 **Recent Customers (${res.data.total} total):**\n${list}\n\nType 'customers page' to see all.`);
        setLoading(false);
        return;
      }

      // Stats
      if (cmd === 'stats' || cmd === 'statistics') {
        const res = await api.get('/customers/stats');
        const d = res.data.data;
        addMsg('bot', `📊 **CRM Statistics:**\n• Total Customers: ${d.total}\n• Active: ${d.active}\n• Leads: ${d.leads}\n• Inactive: ${d.inactive}\n• Total Revenue: PKR ${d.revenue.toLocaleString()}`);
        setLoading(false);
        return;
      }

      // Active customers
      if (cmd === 'active') {
        const res = await api.get('/customers?status=Active&limit=5');
        const list = res.data.data.map((c, i) => `${i+1}. ${c.name} — ${c.company}`).join('\n');
        addMsg('bot', `✅ **Active Customers (${res.data.total}):**\n${list}`);
        setLoading(false);
        return;
      }

      // Leads
      if (cmd === 'leads') {
        const res = await api.get('/customers?status=Lead&limit=5');
        const list = res.data.data.map((c, i) => `${i+1}. ${c.name} — ${c.company}`).join('\n');
        addMsg('bot', `🔵 **Lead Customers (${res.data.total}):**\n${list}`);
        setLoading(false);
        return;
      }

      // Help/hello
      if (cmd === 'help') {
        addMsg('bot', BOT_RESPONSES.help);
      } else if (cmd === 'hello' || cmd === 'hi') {
        addMsg('bot', BOT_RESPONSES.hello);
      } else {
        addMsg('bot', `❓ I don't understand "${input.trim()}". Type 'help' to see available commands.`);
      }
    } catch {
      addMsg('bot', '⚠️ Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000,
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(59,130,246,0.4)',
          fontSize: '22px', transition: 'all 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white'
        }}
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '92px', right: '24px', zIndex: 999,
          width: '340px', height: '480px',
          background: '#0f172a', border: '1px solid #1e293b',
          borderRadius: '20px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          animation: 'fadeUp 0.3s ease forwards',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderBottom: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>CRM Assistant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ color: '#64748b', fontSize: '11px' }}>Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%', padding: '10px 14px', borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.from === 'user' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : '#1e293b',
                  color: 'white', fontSize: '13px', lineHeight: '1.5',
                  border: msg.from === 'bot' ? '1px solid #334155' : 'none',
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: '4px', padding: '8px 14px', background: '#1e293b', borderRadius: '16px', width: 'fit-content', border: '1px solid #334155' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', animation: `bounce 0.8s ${i * 0.15}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #1e293b', display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a command..."
              style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '13px', outline: 'none', fontFamily: 'Outfit, sans-serif' }}
            />
            <button onClick={handleSend} style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', border: 'none', cursor: 'pointer', fontSize: '14px', color: 'white' }}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
