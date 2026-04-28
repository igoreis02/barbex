'use client';
import { useState } from 'react';
import { useBarberX } from '../hooks/useBarberX';

// ---------------------------------------------
// 1. ÍCONES (Isolados fora do componente principal)
// ---------------------------------------------
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
  ChevronDown: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  Home: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  CheckCircle: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Star: () => <svg className="w-3 h-3 text-brand-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  MapPin: () => <svg className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Search: () => <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Filter: () => <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  Bell: () => <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  HeartOutline: () => <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
};

// ---------------------------------------------
// 2. NAVEGAÇÃO
// ---------------------------------------------
interface BottomNavProps {
  currentView: string;
  setCurrentView: (view: any) => void;
}

const BottomNav = ({ currentView, setCurrentView }: BottomNavProps) => (
  <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-zinc-900 pb-6 pt-3 px-6 flex justify-between items-center z-50">
    <button onClick={() => setCurrentView('shops')} className={`flex flex-col items-center gap-1 ${currentView === 'shops' ? 'text-brand-accent opacity-100' : 'text-zinc-500'}`}>
      <Icons.Home />
      <span className="text-[9px] tracking-widest uppercase font-bold">Início</span>
    </button>
    
    <button onClick={() => setCurrentView('book')} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl ${currentView === 'book' || currentView === 'calendar' ? 'bg-[#1a1410] text-brand-accent' : 'text-zinc-500'}`}>
      <Icons.Calendar />
      <span className="text-[9px] tracking-widest uppercase font-bold">Agenda</span>
    </button>

    <button onClick={() => setCurrentView('barbers')} className={`flex flex-col items-center gap-1 ${currentView === 'barbers' ? 'text-brand-accent opacity-100' : 'text-zinc-500'}`}>
      <Icons.Scissors />
      <span className="text-[9px] tracking-widest uppercase font-bold">Barbeiros</span>
    </button>

    <button onClick={() => setCurrentView('profile')} className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-brand-accent opacity-100' : 'text-zinc-500'}`}>
      <Icons.User />
      <span className="text-[9px] tracking-widest uppercase font-bold">Perfil</span>
    </button>
  </div>
);


// ---------------------------------------------
// 3. COMPONENTE PRINCIPAL (HOME)
// ---------------------------------------------
export default function Home() {
  const { user, appointments, login, logout, createAppointment, cancelAppointment } = useBarberX();
  
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'shops' | 'book' | 'services' | 'barbers' | 'calendar' | 'profile'>('landing');
  
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const [selectedShopName, setSelectedShopName] = useState('Barber X');
  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); 
  
  const [selectedDay, setSelectedDay] = useState<number | null>(16);
  const [selectedTime, setSelectedTime] = useState<string | null>('15:30');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailInput, 'Membro BarberX');
    setCurrentView('shops');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailInput, nameInput || 'Novo Membro');
    setCurrentView('shops');
  };

  const handleConfirmAppointment = () => {
    createAppointment({
      service: `${selectedService} (${selectedShopName})`,
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

  const handleConfirmDateTime = () => {
    if (selectedDay && selectedTime) {
      setSelectedDate(`${selectedDay} Out 2026 - ${selectedTime}`);
      setCurrentView('book');
    }
  };

  // ---------------------------------------------
  // TELA 0: LANDING PAGE (TELA INICIAL)
  // ---------------------------------------------
  if (currentView === 'landing') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop" 
            alt="Barbearia Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60"></div>
        </div>

        <div className="z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-5xl font-light tracking-[0.2em] text-brand-accent mb-2">
            BARBER<span className="font-bold">X</span>
          </h1>
          <p className="text-zinc-400 tracking-widest uppercase text-[10px] mb-12">
            Estilo e Confiança em cada corte.
          </p>

          <button 
            onClick={() => setCurrentView(user ? 'shops' : 'login')}
            className="group relative px-12 py-4 bg-brand-accent text-[#3b2a1a] font-bold text-sm tracking-[0.2em] uppercase rounded-full hover:bg-brand-accentHover transition-all shadow-[0_0_30px_rgba(209,167,126,0.2)]"
          >
            Agendar Horário
          </button>
        </div>

        <div className="z-10 p-10 flex flex-col items-center gap-4">
           <p className="text-[9px] text-zinc-500 tracking-[0.3em] uppercase font-bold">Siga-nos: @barberx</p>
        </div>
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 1: LOGIN
  // ---------------------------------------------
  if (currentView === 'login') {
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
              <label className="text-xs tracking-wider text-brand-textMuted font-medium block mb-2">E-MAIL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400"><Icons.Mail /></div>
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="seu@email.com" 
                  className="w-full py-4 pl-12 pr-4 rounded-xl bg-white text-zinc-900 border-none outline-none focus:ring-2 focus:ring-brand-accent placeholder:text-zinc-400 font-medium" 
                  required 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs tracking-wider text-brand-textMuted font-medium">SENHA</label>
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
          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">NOME COMPLETO</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.User /></div>
              <input 
                type="text" 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Seu nome e sobrenome" 
                className="w-full py-4 pl-12 pr-4 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">E-MAIL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.Mail /></div>
              <input 
                type="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="exemplo@email.com" 
                className="w-full py-4 pl-12 pr-4 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">TELEFONE / WHATSAPP</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.Phone /></div>
              <input type="tel" placeholder="(00) 00000-0000" className="w-full py-4 pl-12 pr-4 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" required />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block mb-2">SENHA</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50"><Icons.Lock /></div>
              <input type="password" placeholder="••••••••" className="w-full py-4 pl-12 pr-12 rounded-xl bg-[#141414] text-white border border-transparent outline-none focus:border-brand-accent/30 placeholder:text-zinc-600 text-sm" required />
              <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-accent/50 hover:text-brand-accent"><Icons.Eye /></button>
            </div>
          </div>

          <button type="submit" className="w-full py-4 mt-6 rounded-xl bg-brand-accent text-[#3b2a1a] font-bold text-sm tracking-wide hover:bg-brand-accentHover transition-colors uppercase">
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
  // TELA HOME: LISTA DE BARBEARIAS (NOVO DESIGN DA IMAGEM 1 e 2)
  // NOTA: A BottomNav FOI REMOVIDA desta tela conforme solicitado.
  // ---------------------------------------------
  if (currentView === 'shops') {
    const featuredShops = [
      { id: 1, name: 'The Midnight Atelier', category: 'Barbearia Clássica', distance: '2.5 km', promo: '20% OFF', rating: 5.0, image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80' },
      { id: 2, name: 'Barber Classic', category: 'Estilo Moderno', distance: '3.1 km', promo: 'Cerveja Grátis', rating: 4.8, image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80' }
    ];

    const nearbyShops = [
      { id: 3, name: 'Barbearia do Zé', address: 'Av. Igualdade, 120', category: 'Barba e Cabelo', distance: '1.2 km', rating: 4.8, image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=150&h=150&fit=crop' },
      { id: 4, name: 'Corte Rápido', address: 'Rua das Flores, 45', category: 'Degradê Especial', distance: '3.5 km', rating: 4.5, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=150&h=150&fit=crop' },
      { id: 5, name: 'Estilo Jovem', address: 'Shopping Centro', category: 'Cortes Modernos', distance: '5.0 km', rating: 4.9, image: 'https://images.unsplash.com/photo-1622288111516-f59bc213b3ce?w=150&h=150&fit=crop' },
    ];

    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white pb-10 flex flex-col">
        {/* CABEÇALHO */}
        <header className="flex items-center justify-between p-6 pt-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
              <Icons.MapPin />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Sua localização</p>
              <h2 className="text-sm font-bold flex items-center gap-1 cursor-pointer text-white">
                Aparecida de Goiânia <Icons.ChevronDown />
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-white hover:text-brand-accent transition-colors">
              <Icons.Bell />
              <span className="absolute 0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div 
              onClick={() => setCurrentView('profile')}
              className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-brand-accent overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-full h-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-xs">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* BARRA DE PESQUISA */}
        <div className="px-6 mb-8 flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icons.Search />
            </div>
            <input 
              type="text" 
              placeholder="Buscar barbearias..." 
              className="w-full py-3.5 pl-12 pr-4 rounded-xl bg-[#141414] text-white outline-none focus:ring-1 focus:ring-brand-accent placeholder:text-zinc-500 text-sm"
            />
          </div>
          <button className="w-12 h-12 rounded-xl bg-[#141414] flex items-center justify-center flex-shrink-0 hover:bg-zinc-800 border border-transparent hover:border-brand-accent/30 transition-colors">
            <Icons.Filter />
          </button>
        </div>

        {/* DESTAQUES (Carrossel Horizontal - Estilo Foto 1) */}
        <div className="pl-6 mb-8">
          <div className="flex items-center justify-between pr-6 mb-4">
            <h2 className="text-xl font-bold text-white">Destaques</h2>
            <button className="text-xs text-brand-accent font-bold hover:underline">Ver todos</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 pr-6">
            {featuredShops.map(shop => (
              <div 
                key={shop.id} 
                onClick={() => { setSelectedShopName(shop.name); setCurrentView('book'); }}
                className="min-w-[260px] flex-shrink-0 cursor-pointer group"
              >
                {/* Imagem em cima */}
                <div className="relative h-40 rounded-2xl overflow-hidden mb-3 border border-zinc-800/50">
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  {/* Coração no canto superior direito */}
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-red-500 transition-colors">
                    <Icons.HeartOutline />
                  </button>

                  {/* Tag de Promoção */}
                  {shop.promo && (
                    <div className="absolute bottom-3 left-3 bg-brand-accent text-[#3b2a1a] px-2 py-1 rounded text-[10px] font-bold uppercase shadow-lg">
                      {shop.promo}
                    </div>
                  )}
                </div>
                
                {/* Textos embaixo */}
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-bold text-white leading-tight">{shop.name}</h3>
                    <span className="flex items-center gap-1 text-xs text-white font-bold bg-[#141414] px-1.5 py-0.5 rounded-md">
                      <Icons.Star /> {shop.rating}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    {shop.category} <span className="mx-1">•</span> {shop.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIS PRÓXIMOS DE VOCÊ (Estilo Foto 2 com botão "Agendar") */}
        <div className="px-6 mb-4">
          <h2 className="text-xl font-bold text-white mb-4">Mais próximos de você</h2>
          <div className="space-y-4">
            {nearbyShops.map(shop => (
              <div 
                key={shop.id} 
                className="flex items-center gap-4 p-2 rounded-2xl hover:bg-[#141414] transition-colors border border-transparent hover:border-zinc-800 group"
              >
                {/* Foto Quadrada na Esquerda */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-zinc-800/50">
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                
                {/* Textos e Botão na Direita */}
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-sm leading-tight">{shop.name}</h3>
                    <button className="text-zinc-500 hover:text-red-500 transition-colors">
                      <Icons.HeartOutline />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="flex items-center gap-1 text-xs text-white font-bold">
                      <Icons.Star /> {shop.rating}
                    </span>
                    <span className="text-xs text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400">{shop.category}</span>
                  </div>
                  
                  <p className="text-xs text-zinc-500 flex items-center gap-1 mb-2">
                    <Icons.MapPin /> {shop.distance} - {shop.address}
                  </p>
                  
                  {/* Botão de Agendar */}
                  <button 
                    onClick={() => { setSelectedShopName(shop.name); setCurrentView('book'); }}
                    className="bg-brand-accent text-[#3b2a1a] px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity inline-block"
                  >
                    Agendar Horário
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NOTE: Sem BottomNav nesta tela */}
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 3: BOOK (HUB CENTRAL DA BARBEARIA) - COM BOTTOM NAV
  // ---------------------------------------------
  if (currentView === 'book') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] p-6 text-white pb-28 relative">
        <header className="flex items-center justify-between mb-8 pt-2">
          <button onClick={() => setCurrentView('shops')} className="text-brand-accent"><Icons.ChevronLeft /></button>
          <h1 className="text-sm font-bold tracking-widest text-brand-accent uppercase">{selectedShopName}</h1>
          <div className="w-6"></div> {/* Espaçador */}
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

          <button onClick={() => setCurrentView('calendar')} className="w-full bg-[#141414] p-4 rounded-3xl flex items-center gap-4 text-left hover:bg-[#1a1a1a] transition-colors border border-transparent focus:border-brand-accent/30">
            <div className="w-14 h-14 rounded-2xl bg-[#1f1a14] flex items-center justify-center text-brand-accent flex-shrink-0"><Icons.Calendar /></div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-1">Passo 03</p>
              <p className="text-base font-medium text-white">{selectedDate || 'Selecione a data/hora'}</p>
            </div>
            <div className="text-zinc-600"><Icons.ChevronRight /></div>
          </button>
        </div>

        <button 
          onClick={handleConfirmAppointment}
          disabled={!selectedService || !selectedBarber || !selectedDate}
          className="w-full py-4 rounded-full bg-brand-accent text-[#3b2a1a] font-bold text-sm tracking-wide flex justify-center items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          CONFIRMAR AGENDAMENTO <Icons.CheckCircle />
        </button>

        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
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
          <h2 className="text-sm tracking-widest uppercase">{selectedShopName}</h2>
          <div className="w-8 h-8 rounded-full bg-[#141414] border border-brand-accent overflow-hidden">
            <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop" className="opacity-50" alt="logo" />
          </div>
        </header>
        <h1 className="text-3xl mb-2">Escolha sua<br/>Experiência</h1>
        
        <div className="space-y-4 mt-8">
          {['Corte Signature', 'Barba Terapia', 'Combo Completo'].map(srv => (
            <div key={srv} 
                 onClick={() => setSelectedService(srv)}
                 className={`p-5 rounded-xl border cursor-pointer transition-all ${selectedService === srv ? 'border-brand-accent bg-[#141414]' : 'border-zinc-800 bg-transparent hover:border-zinc-600'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{srv}</h3>
                {selectedService === srv && <span className="w-4 h-4 rounded-full bg-brand-accent flex-shrink-0"></span>}
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
            className="w-full py-4 rounded-full bg-brand-accent text-[#3b2a1a] font-bold disabled:opacity-50 tracking-wider">
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
          <h2 className="text-sm tracking-widest uppercase">{selectedShopName}</h2>
        </header>
        <h1 className="text-3xl mb-2">Escolha seu<br/>Especialista</h1>
        <p className="text-brand-textMuted text-sm mb-8">Selecione o profissional que cuidará do seu estilo hoje.</p>

        <div className="space-y-4">
          {['Julian "Vibe"', 'Ricardo Silva', 'Ana Luiza'].map(barber => (
            <div key={barber} 
                 onClick={() => setSelectedBarber(barber)}
                 className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${selectedBarber === barber ? 'border-brand-accent bg-[#141414]' : 'border-zinc-800 bg-transparent'}`}>
              <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-brand-accent flex-shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=100&h=100&fit=crop" className="opacity-70 object-cover w-full h-full" alt="barbeiro" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{barber}</h3>
                <p className="text-xs text-brand-textMuted">Mestre em Degradê e Barboterapia</p>
                <p className="text-xs text-brand-accent mt-1 flex items-center gap-1"><Icons.Star /> 4.9 (120+ avaliações)</p>
              </div>
              {selectedBarber === barber && <div className="w-4 h-4 rounded-full bg-brand-accent flex-shrink-0"></div>}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] to-transparent">
          <button 
            disabled={!selectedBarber}
            onClick={() => setCurrentView('book')}
            className="w-full py-4 rounded-full bg-brand-accent text-[#3b2a1a] font-bold disabled:opacity-50 tracking-wider">
            CONTINUAR →
          </button>
        </div>
      </main>
    );
  }

  // ---------------------------------------------
  // TELA 6: CALENDÁRIO
  // ---------------------------------------------
  if (currentView === 'calendar') {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const times = ['09:00', '10:00', '11:00', '14:00', '15:30', '17:00', '18:30'];

    return (
      <main className="min-h-screen bg-[#0a0a0a] p-6 text-white pb-28">
        <header className="flex items-center justify-between mb-8 pt-2">
          <button onClick={() => setCurrentView('book')} className="text-brand-accent">
            <Icons.ChevronLeft />
          </button>
          <h2 className="text-sm tracking-widest font-bold uppercase">{selectedShopName}</h2>
          <div className="w-6"></div>
        </header>

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

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Selecione seu<br /><span className="text-brand-accent">momento</span></h1>
          <p className="text-sm text-brand-textMuted">Agendamentos limitados para preservar a arte.</p>
        </div>

        <div className="bg-[#100d0b] border border-brand-accent/20 rounded-3xl p-5 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button className="w-8 h-8 rounded-full bg-[#1a1410] flex items-center justify-center text-brand-accent">
              <span className="text-sm">{'<'}</span>
            </button>
            <h3 className="text-sm tracking-widest uppercase font-bold text-white">OUTUBRO 2026</h3>
            <button className="w-8 h-8 rounded-full bg-[#1a1410] flex items-center justify-center text-brand-accent">
              <span className="text-sm">{'>'}</span>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map(day => (
              <div key={day} className="text-[9px] text-center text-zinc-500 font-bold tracking-wider">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-3 gap-x-1 justify-items-center">
            <div></div><div></div>
            {days.map(day => {
              const isSelected = selectedDay === day;
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

          <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-zinc-800/50">
            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span> Selecionado
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-[#1a1a1a]"></span> Disponível
            </div>
          </div>
        </div>

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
          <h2 className="text-sm tracking-widest text-brand-accent font-bold">MEU PERFIL</h2>
          <button onClick={() => { logout(); setCurrentView('landing'); }} className="text-xs text-red-400 font-bold uppercase tracking-widest">Sair</button>
        </header>

        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-[#141414] border-2 border-brand-accent mb-4 flex items-center justify-center text-3xl font-bold text-brand-accent">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-brand-textMuted text-sm">{user?.email}</p>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-medium text-brand-accent">Seus Agendamentos</h3>
            <button onClick={() => setCurrentView('shops')} className="text-[10px] uppercase font-bold border border-brand-accent px-4 py-1.5 rounded-full text-brand-accent hover:bg-brand-accent hover:text-[#3b2a1a]">
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
                <div key={app.id} className="p-4 bg-[#141414] rounded-xl border border-zinc-800 flex justify-between items-start">
                  <div>
                    <p className="font-bold text-white mb-1">{app.service}</p>
                    <p className="text-xs text-zinc-400 flex items-center gap-1"><Icons.User /> com {app.barber}</p>
                    <p className="text-xs text-brand-accent mt-2 flex items-center gap-1 font-bold"><Icons.Calendar /> {app.date}</p>
                  </div>
                  <button 
                    onClick={() => cancelAppointment(app.id)}
                    className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-400/10 px-3 py-2 rounded-lg hover:bg-red-400/20">
                    Cancelar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </main>
    );
  }
}