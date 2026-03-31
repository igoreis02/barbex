'use client';
import { useState } from 'react';
import { useBarberX } from '../hooks/useBarberX';

export default function Home() {
  const { user, appointments, login, logout, createAppointment, cancelAppointment } = useBarberX();
  
  // 1. ATUALIZADO: Adicionamos a view 'calendar'
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'book' | 'services' | 'barbers' | 'calendar' | 'profile'>('login');
  
  // Estados temporários do fluxo
  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); 
  
  // Estados específicos para o Calendário
  const [selectedDay, setSelectedDay] = useState<number | null>(16);
  const [selectedTime, setSelectedTime] = useState<string | null>('15:30');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login('cliente@email.com', 'Membro BarberX');
    setCurrentView('book');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login('novo@email.com', 'Novo Membro');
    setCurrentView('book');
  };

  const handleConfirmAppointment = () => {
    createAppointment({
      service: selectedService,
      barber: selectedBarber,
      date: selectedDate,
      price: 120.00
    });
    setCurrentView('profile');
    setSelectedService('');
    setSelectedBarber('');
    setSelectedDate('');
    setSelectedDay(null);
    setSelectedTime(null);
  };

  // Função para confirmar a data e hora no calendário
  const handleConfirmDateTime = () => {
    if (selectedDay && selectedTime) {
      setSelectedDate(`${selectedDay} Out 2026 - ${selectedTime}`);
      setCurrentView('book');
    }
  };

  // Ícones reutilizáveis
  const Icons = {
    Mail: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Lock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    Eye: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    Phone: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    LockCheck: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    Scissors: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>,
    ChevronRight: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    ChevronLeft: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    Home: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    CheckCircle: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  };

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-zinc-900 pb-6 pt-3 px-6 flex justify-between items-center z-50">
      <button className={`flex flex-col items-center gap-1 ${currentView === 'book' ? 'text-brand-accent opacity-50' : 'text-zinc-500'}`}>
        <Icons.Home />
        <span className="text-[9px] tracking-widest uppercase">Home</span>
      </button>
      
      <button onClick={() => setCurrentView('book')} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl ${currentView === 'book' ? 'bg-[#1a1410] text-brand-accent' : 'text-zinc-500'}`}>
        <Icons.Calendar />
        <span className="text-[9px] tracking-widest uppercase font-bold">Book</span>
      </button>

      <button onClick={() => setCurrentView('barbers')} className={`flex flex-col items-center gap-1 ${currentView === 'barbers' ? 'text-brand-accent opacity-50' : 'text-zinc-500'}`}>
        <Icons.Scissors />
        <span className="text-[9px] tracking-widest uppercase">Barbers</span>
      </button>

      <button onClick={() => setCurrentView('profile')} className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-brand-accent opacity-50' : 'text-zinc-500'}`}>
        <Icons.User />
        <span className="text-[9px] tracking-widest uppercase">Profile</span>
      </button>
    </div>
  );

  // ---------------------------------------------
  // TELA 2: CADASTRO
  // ---------------------------------------------
  if (currentView === 'register') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] p-6 text-white pb-12 flex flex-col relative overflow-x-hidden">
        <header className="flex items-center justify-between mb-8 z-10 pt-4">
          <button onClick={() => setCurrentView('login')} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-zinc-800 transition-colors">
            <span className="text-brand-accent"><Icons.ChevronLeft /></span>
          </button>
          <h1 className="text-2xl font-light tracking-widest text-brand-accent flex items-center gap-1">
            BARBER<span className="text-3xl font-bold">X</span>
          </h1>
          <div className="w-10"></div>
        </header>

        <div className="z-10 mb-8">
          <h1 className="text-3xl font-bold mb-3">Crie sua conta</h1>
          <p className="text-sm text-brand-textMuted leading-relaxed pr-4">
            Junte-se à nossa experiência exclusiva de cuidados masculinos.
          </p>
        </div>

        <form onSubmit={handleRegister} className="z-10 flex-1 space-y-5">
          {/* NOME */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">NOME COMPLETO</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.User /></div>
              <input type="text" placeholder="Seu nome e sobrenome" className="w-full py-4 pl-12 pr-4 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" required />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">EMAIL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.Mail /></div>
              <input type="email" placeholder="exemplo@email.com" className="w-full py-4 pl-12 pr-4 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" required />
            </div>
          </div>

          {/* TELEFONE */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">TELEFONE / WHATSAPP</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.Phone /></div>
              <input type="tel" placeholder="(00) 00000-0000" className="w-full py-4 pl-12 pr-4 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" required />
            </div>
          </div>

          {/* DATA DE NASCIMENTO */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">DATA DE NASCIMENTO</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.Calendar /></div>
              <input type="text" placeholder="mm/dd/yyyy" className="w-full py-4 pl-12 pr-4 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" required />
            </div>
          </div>

          {/* SENHA */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">SENHA</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.Lock /></div>
              <input type="password" placeholder="••••••••" className="w-full py-4 pl-12 pr-12 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" required />
              <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-accent/50 hover:text-brand-accent"><Icons.Eye /></button>
            </div>
          </div>

          {/* CONFIRMAR SENHA */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">CONFIRMAR SENHA</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.LockCheck /></div>
              <input type="password" placeholder="••••••••" className="w-full py-4 pl-12 pr-4 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" required />
            </div>
          </div>

          {/* TERMOS */}
          <div className="flex items-start gap-3 mt-6 mb-8">
            <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-zinc-700 bg-[#141414] accent-brand-accent" required />
            <label htmlFor="terms" className="text-xs text-brand-textMuted leading-relaxed">
              Eu aceito os <span className="text-brand-accent">Termos de Uso</span> e a <span className="text-brand-accent">Política de Privacidade</span> da Barber X.
            </label>
          </div>

          <button type="submit" className="w-full py-4 rounded-xl bg-brand-accent text-[#3b2a1a] font-bold text-sm tracking-wide hover:bg-brand-accentHover transition-colors uppercase">
            Finalizar Cadastro
          </button>
        </form>

        <p className="mt-8 text-sm text-brand-textMuted text-center z-10">
          Já possui uma conta? <button onClick={() => setCurrentView('login')} className="text-brand-accent font-bold ml-1">Faça login</button>
        </p>
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 1: LOGIN
  // ---------------------------------------------
  if (!user || currentView === 'login') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-white font-sans relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 z-0"></div>
        
        <div className="w-full max-w-md flex flex-col z-10 mt-10">
          <div className="flex flex-col items-center mb-16">
            <h1 className="text-4xl font-light tracking-widest text-brand-accent flex items-center gap-2">
              BARBER<span className="text-5xl font-bold">X</span>
            </h1>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div>
              <label className="text-xs tracking-wider text-brand-textMuted font-medium block mb-2">EMAIL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400"><Icons.Mail /></div>
                <input type="email" placeholder="seu@email.com" className="w-full py-4 pl-12 pr-4 rounded-xl bg-white text-zinc-900 border-none outline-none focus:ring-2 focus:ring-brand-accent placeholder:text-zinc-400 font-medium" required />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs tracking-wider text-brand-textMuted font-medium">PASSWORD</label>
                <a href="#" className="text-xs text-brand-accent hover:underline">Esqueci a senha</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400"><Icons.Lock /></div>
                <input type="password" placeholder="••••••••" className="w-full py-4 pl-12 pr-12 rounded-xl bg-white text-zinc-900 border-none outline-none focus:ring-2 focus:ring-brand-accent placeholder:text-zinc-400 font-medium" required />
                <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600"><Icons.Eye /></button>
              </div>
            </div>

            <button type="submit" className="w-full py-4 mt-8 rounded-full bg-brand-accent text-[#3b2a1a] font-bold text-sm tracking-wide hover:bg-brand-accentHover transition-colors flex justify-center items-center gap-2">
              ENTRAR NA BARBEARIA <span className="text-lg">→</span>
            </button>
          </form>

          <p className="mt-12 text-sm text-brand-textMuted text-center">
            Ainda não é membro? <button onClick={() => setCurrentView('register')} className="text-brand-accent font-medium hover:underline ml-1">Cadastre-se</button>
          </p>
        </div>
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 3: BOOK (HUB CENTRAL)
  // ---------------------------------------------
  if (currentView === 'book') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] p-6 text-white pb-28 relative">
        <header className="flex items-center justify-between mb-8 pt-2">
          <button className="text-brand-accent"><Icons.Menu /></button>
          <h1 className="text-lg font-bold tracking-widest text-brand-accent">BARBER X</h1>
          <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-brand-accent overflow-hidden">
            <div className="w-full h-full bg-brand-accent/20 flex items-center justify-center text-brand-accent text-xs">Me</div>
          </div>
        </header>

        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">Agende seu horário!</h2>
          <p className="text-sm text-brand-textMuted leading-relaxed pr-6">
            Escolha o serviço que deseja e o melhor horário com o melhor barbeiro!
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <button onClick={() => setCurrentView('services')} className="w-full bg-[#141414] p-4 rounded-3xl flex items-center gap-4 text-left hover:bg-[#1a1a1a] transition-colors border border-transparent focus:border-brand-accent/30">
            <div className="w-14 h-14 rounded-2xl bg-[#1f1a14] flex items-center justify-center text-brand-accent flex-shrink-0"><Icons.Scissors /></div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-1">Passo 01</p>
              <p className="text-base font-medium text-white">{selectedService || 'Selecione o serviço'}</p>
            </div>
            <div className="text-zinc-600"><Icons.ChevronRight /></div>
          </button>

          <button onClick={() => setCurrentView('barbers')} className="w-full bg-[#141414] p-4 rounded-3xl flex items-center gap-4 text-left hover:bg-[#1a1a1a] transition-colors border border-transparent focus:border-brand-accent/30">
            <div className="w-14 h-14 rounded-2xl bg-[#1f1a14] flex items-center justify-center text-brand-accent flex-shrink-0"><Icons.User /></div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-1">Passo 02</p>
              <p className="text-base font-medium text-white">{selectedBarber || 'Selecione o barbeiro'}</p>
            </div>
            <div className="text-zinc-600"><Icons.ChevronRight /></div>
          </button>

          {/* ATUALIZADO: Botão do Passo 03 agora abre o calendário */}
          <button onClick={() => setCurrentView('calendar')} className="w-full bg-[#141414] p-4 rounded-3xl flex items-center gap-4 text-left hover:bg-[#1a1a1a] transition-colors border border-transparent focus:border-brand-accent/30">
            <div className="w-14 h-14 rounded-2xl bg-[#1f1a14] flex items-center justify-center text-brand-accent flex-shrink-0"><Icons.Calendar /></div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-1">Passo 03</p>
              <p className="text-base font-medium text-white">{selectedDate || 'Selecione a data/hora'}</p>
            </div>
            <div className="text-zinc-600"><Icons.ChevronRight /></div>
          </button>
        </div>

        <div className="relative w-full h-40 rounded-3xl overflow-hidden mb-8 bg-zinc-900">
          <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop" alt="Barbearia" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-1">Vibe Exclusiva</p>
            <p className="text-lg font-bold text-white">O cuidado que você merece.</p>
          </div>
        </div>

        <button 
          onClick={handleConfirmAppointment}
          disabled={!selectedService || !selectedBarber || !selectedDate} // Exige que a data seja escolhida também
          className="w-full py-4 rounded-full bg-brand-accent text-[#3b2a1a] font-bold text-sm tracking-wide flex justify-center items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          CONFIRMAR AGENDAMENTO <Icons.CheckCircle />
        </button>

        <BottomNav />
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 4: SERVIÇOS
  // ---------------------------------------------
  if (currentView === 'services') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] p-6 text-white pb-24">
        <header className="flex items-center justify-between mb-8 pt-2">
          <button onClick={() => setCurrentView('book')} className="text-brand-accent">← Voltar</button>
          <h2 className="text-sm tracking-widest">SERVIÇOS</h2>
          <div className="w-8 h-8 rounded-full bg-[#141414] border border-brand-accent"></div>
        </header>
        <h1 className="text-3xl mb-2">Escolha sua<br/>Experiência</h1>
        
        <div className="space-y-4 mt-8">
          {['Corte Signature', 'Barba Terapia', 'Combo Midnight'].map(srv => (
            <div key={srv} 
                 onClick={() => setSelectedService(srv)}
                 className={`p-5 rounded-xl border cursor-pointer transition-all ${selectedService === srv ? 'border-brand-accent bg-[#141414]' : 'border-zinc-800 bg-transparent hover:border-zinc-600'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{srv}</h3>
                {selectedService === srv && <span className="w-4 h-4 rounded-full bg-brand-accent"></span>}
              </div>
              <p className="text-xs text-brand-textMuted mb-4">Experiência completa com toalha quente, massagem facial e finalização premium.</p>
              <div className="flex items-center gap-4 text-xs text-brand-accent">
                <span>⏱ 45 min</span>
                <span>R$ 80,00</span>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] to-transparent">
          <button 
            disabled={!selectedService}
            onClick={() => setCurrentView('book')}
            className="w-full py-4 rounded-full bg-brand-accent text-[#3b2a1a] font-bold disabled:opacity-50">
            CONTINUAR →
          </button>
        </div>
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 5: ESPECIALISTAS (Barbeiros)
  // ---------------------------------------------
  if (currentView === 'barbers') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] p-6 text-white pb-24">
        <header className="flex items-center mb-8 pt-2">
          <button onClick={() => setCurrentView('book')} className="text-brand-accent mr-4">←</button>
          <h2 className="text-sm tracking-widest">BARBER X</h2>
        </header>
        <h1 className="text-3xl mb-2">Escolha seu<br/>Especialista</h1>
        <p className="text-brand-textMuted text-sm mb-8">Selecione o barbeiro que cuidará do seu estilo hoje.</p>

        <div className="space-y-4">
          {['Julian "Vibe"', 'Ricardo Silva', 'Ana Luiza'].map(barber => (
            <div key={barber} 
                 onClick={() => setSelectedBarber(barber)}
                 className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${selectedBarber === barber ? 'border-brand-accent bg-[#141414]' : 'border-zinc-800 bg-transparent'}`}>
              <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-brand-accent flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{barber}</h3>
                <p className="text-xs text-brand-textMuted">Mestre em Degradê e Barboterapia</p>
                <p className="text-xs text-brand-accent mt-1">★ 4.9 (120+ avaliações)</p>
              </div>
              {selectedBarber === barber && <div className="w-4 h-4 rounded-full bg-brand-accent"></div>}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] to-transparent">
          <button 
            disabled={!selectedBarber}
            onClick={() => setCurrentView('book')}
            className="w-full py-4 rounded-full bg-brand-accent text-[#3b2a1a] font-bold disabled:opacity-50">
            CONTINUAR →
          </button>
        </div>
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 6: CALENDÁRIO (NOVA TELA DA IMAGEM)
  // ---------------------------------------------
  if (currentView === 'calendar') {
    // Array para gerar os dias do mês (mock simplificado de 1 a 31)
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const times = ['09:00', '10:00', '11:00', '14:00', '15:30', '17:00', '18:30'];

    return (
      <main className="min-h-screen bg-[#0a0a0a] p-6 text-white pb-28">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 pt-2">
          <button onClick={() => setCurrentView('book')} className="text-brand-accent">
            <Icons.ChevronLeft />
          </button>
          <h2 className="text-sm tracking-widest font-bold">BARBER X</h2>
          <div className="w-6"></div> {/* Espaçador */}
        </header>

        {/* Card do Barbeiro Selecionado */}
        <div className="bg-[#141414] p-4 rounded-2xl flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-brand-accent relative">
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-accent rounded-full border border-[#141414] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#141414] rounded-full"></span>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-lg text-white">{selectedBarber || 'Qualquer Especialista'}</h3>
            <p className="text-xs text-brand-textMuted">Mestre Artesão & Escultor</p>
          </div>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Selecione seu<br /><span className="text-brand-accent">momento</span></h1>
          <p className="text-sm text-brand-textMuted">Agendamentos limitados para preservar a arte.</p>
        </div>

        {/* Container do Calendário */}
        <div className="bg-[#100d0b] border border-brand-accent/20 rounded-3xl p-5 mb-8">
          {/* Seletor de Mês */}
          <div className="flex items-center justify-between mb-6">
            <button className="w-8 h-8 rounded-full bg-[#1a1410] flex items-center justify-center text-brand-accent">
              <span className="text-sm">{'<'}</span>
            </button>
            <h3 className="text-sm tracking-widest uppercase font-bold text-white">OUTUBRO 2026</h3>
            <button className="w-8 h-8 rounded-full bg-[#1a1410] flex items-center justify-center text-brand-accent">
              <span className="text-sm">{'>'}</span>
            </button>
          </div>

          {/* Dias da Semana */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map(day => (
              <div key={day} className="text-[9px] text-center text-zinc-500 font-bold tracking-wider">{day}</div>
            ))}
          </div>

          {/* Grid de Dias */}
          <div className="grid grid-cols-7 gap-y-3 gap-x-1 justify-items-center">
            {/* Espaços vazios para simular o início do mês (ex: começa na Terça) */}
            <div></div><div></div>
            {days.map(day => {
              const isSelected = selectedDay === day;
              // Simulando alguns dias indisponíveis (passados) para igual a foto
              const isUnavailable = day < 4; 
              
              return (
                <button 
                  key={day}
                  disabled={isUnavailable}
                  onClick={() => setSelectedDay(day)}
                  className={`w-9 h-11 rounded-full flex items-center justify-center text-sm transition-all
                    ${isSelected ? 'bg-brand-accent text-[#3b2a1a] font-bold shadow-[0_0_15px_rgba(209,167,126,0.3)]' : 
                      isUnavailable ? 'text-zinc-600' : 'bg-[#1a1a1a] text-zinc-300 hover:border hover:border-brand-accent/50'
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legenda */}
          <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-zinc-800/50">
            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span> Selecionado
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-[#1a1a1a]"></span> Disponível
            </div>
          </div>
        </div>

        {/* Seleção de Horários (Aparece apenas quando um dia for selecionado) */}
        {selectedDay && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-brand-accent mb-4 tracking-widest">HORÁRIOS DISPONÍVEIS</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {times.map(time => (
                <button 
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap text-sm font-medium transition-colors
                    ${selectedTime === time ? 'bg-brand-accent text-[#3b2a1a]' : 'bg-[#141414] text-white border border-transparent hover:border-brand-accent/30'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
          <button 
            disabled={!selectedDay || !selectedTime}
            onClick={handleConfirmDateTime}
            className="w-full py-4 rounded-full bg-brand-accent text-[#3b2a1a] font-bold text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed">
            CONFIRMAR HORÁRIO
          </button>
        </div>
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 7: DASHBOARD / PERFIL
  // ---------------------------------------------
  if (currentView === 'profile') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] p-6 text-white flex flex-col pb-28">
        <header className="flex justify-between items-center mb-10 pt-2">
          <h2 className="text-sm tracking-widest text-brand-accent">THE MIDNIGHT ATELIER</h2>
          <button onClick={() => { logout(); setCurrentView('login'); }} className="text-xs text-red-400">Sair</button>
        </header>

        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-[#141414] border-2 border-brand-accent mb-4 flex items-center justify-center text-3xl">
            👨‍💼
          </div>
          <h1 className="text-2xl">{user?.name}</h1>
          <p className="text-brand-textMuted text-sm">Membro</p>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-medium text-brand-accent">Seus Agendamentos</h3>
            <button onClick={() => setCurrentView('book')} className="text-sm border border-brand-accent px-4 py-1 rounded-full text-brand-accent">
              + Novo
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="p-6 bg-[#141414] rounded-xl border border-zinc-800 text-center">
              <p className="text-brand-textMuted text-sm">Nenhum agendamento encontrado.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map(app => (
                <div key={app.id} className="p-4 bg-[#141414] rounded-xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <p className="font-bold">{app.service}</p>
                    <p className="text-sm text-brand-textMuted">com {app.barber}</p>
                    <p className="text-xs text-brand-accent mt-2">{app.date}</p>
                  </div>
                  <button 
                    onClick={() => cancelAppointment(app.id)}
                    className="text-xs text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">
                    Cancelar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <BottomNav />
      </main>
    );
  }
}