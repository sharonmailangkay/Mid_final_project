import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Consultation, mockConsultations } from '../constants/data';

interface ConsultationContextType {
    consultations: Consultation[];
    addConsultation: (consultation: Consultation) => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export const ConsultationProvider = ({ children }: { children: ReactNode }) => {
    const [consultations, setConsultations] = useState<Consultation[]>(mockConsultations);

    const addConsultation = (newConsultation: Consultation) => {
        // Add to the beginning of the list to show newest first
        setConsultations(prev => [newConsultation, ...prev]);
    };

    return (
        <ConsultationContext.Provider value={{ consultations, addConsultation }}>
            {children}
        </ConsultationContext.Provider>
    );
};

export const useConsultations = () => {
    const context = useContext(ConsultationContext);
    if (context === undefined) {
        throw new Error('useConsultations must be used within a ConsultationProvider');
    }
    return context;
};
