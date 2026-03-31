'use client';
import { useState, useEffect } from 'react';

export type User = { id: string; name: string; email: string };
export type Appointment = {
  id: string;
  userId: string;
  service: string;
  barber: string;
  date: string;
  price: number;
};

export function useBarberX() {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Carregar dados do LocalStorage ao iniciar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('@BarberX:user');
      const storedAppointments = localStorage.getItem('@BarberX:appointments');
      
      // A trava de segurança: só tenta ler se não for "undefined" nem "null"
      if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
        setUser(JSON.parse(storedUser));
      }
      
      if (storedAppointments && storedAppointments !== 'undefined' && storedAppointments !== 'null') {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error("Erro ao ler dados, resetando...", error);
      localStorage.removeItem('@BarberX:user');
      localStorage.removeItem('@BarberX:appointments');
    }
  }, []);

  // CRUD: Criar / Logar Usuário
  const login = (email: string, name: string = 'Cliente') => {
    const newUser = { id: Date.now().toString(), name, email };
    setUser(newUser);
    localStorage.setItem('@BarberX:user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@BarberX:user');
  };

  // CRUD: Criar Agendamento
  const createAppointment = (appointmentData: Omit<Appointment, 'id' | 'userId'>) => {
    if (!user) return;
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      userId: user.id,
    };
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem('@BarberX:appointments', JSON.stringify(updated));
  };

  // CRUD: Deletar Agendamento
  const cancelAppointment = (id: string) => {
    const updated = appointments.filter(app => app.id !== id);
    setAppointments(updated);
    localStorage.setItem('@BarberX:appointments', JSON.stringify(updated));
  };

  return { user, appointments, login, logout, createAppointment, cancelAppointment };
}